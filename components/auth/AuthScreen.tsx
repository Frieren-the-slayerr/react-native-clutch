import { useSignIn, useSignUp, useSSO } from "@clerk/expo";
import { makeRedirectUri } from "expo-auth-session";
import { router, type Href } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle, Defs, Path, RadialGradient, Rect, Stop } from "react-native-svg";

import { BrandMark } from "@/components/BrandMark";
import { CutCornerButton } from "@/components/CutCornerButton";
import { AuthField } from "@/components/auth/AuthField";
import { PasswordField } from "@/components/auth/PasswordField";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { VerificationModal } from "@/components/auth/VerificationModal";
import { colors } from "@/theme";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type AuthMode = "sign-up" | "sign-in";
type SocialStrategy = "oauth_google" | "oauth_apple";

type AuthScreenProps = {
  mode: AuthMode;
  heading: string;
  subtext: string;
  ctaLabel: string;
  togglePrompt: string;
  toggleAction: string;
  toggleHref: Href;
  includePassword?: boolean;
};

// Every Clerk future-API call resolves to `{ error: ClerkError | null }` — this
// pulls out the user-facing message so it can drop straight into the ErrorRow.
function errorMessage(error: unknown, fallback: string) {
  if (error && typeof error === "object") {
    const { longMessage, message } = error as { longMessage?: string; message?: string };
    if (longMessage) return longMessage;
    if (message) return message;
  }
  return fallback;
}

// Shared by password sign-up/sign-in and OAuth: once Clerk has an active
// session, send the user to the home route unless a session task is pending.
function navigateHome({ session, decorateUrl }: { session?: { currentTask?: unknown } | null; decorateUrl: (path: string) => string }) {
  if (session?.currentTask) return;
  const url = decorateUrl("/");
  if (!url.startsWith("http")) {
    router.replace(url as Href);
  }
}

function AuthGlow() {
  return (
    <Svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }} pointerEvents="none">
      <Defs>
        <RadialGradient id="glowTop" cx="50%" cy="0%" r="55%">
          <Stop offset="0" stopColor={colors.blue} stopOpacity={0.16} />
          <Stop offset="1" stopColor={colors.blue} stopOpacity={0} />
        </RadialGradient>
        <RadialGradient id="glowBottom" cx="92%" cy="100%" r="42%">
          <Stop offset="0" stopColor={colors.cyan} stopOpacity={0.12} />
          <Stop offset="1" stopColor={colors.cyan} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#glowTop)" />
      <Rect width="100%" height="100%" fill="url(#glowBottom)" />
    </Svg>
  );
}

function ErrorRow({ message }: { message: string }) {
  return (
    <View className="mt-[14px] flex-row items-center gap-2">
      <Svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke={colors.red} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Circle cx={12} cy={12} r={9} />
        <Path d="M12 8v5M12 16.5v.01" />
      </Svg>
      <Text className="text-[13px] text-clutch-red">{message}</Text>
    </View>
  );
}

export function AuthScreen({
  mode,
  heading,
  subtext,
  ctaLabel,
  togglePrompt,
  toggleAction,
  toggleHref,
  includePassword = false,
}: AuthScreenProps) {
  const isSignup = mode === "sign-up";
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();
  const { startSSOFlow } = useSSO();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  // Guards against a code being verified twice in the same tick (duplicate
  // onChangeText events, autofill, or a fast extra keystroke). setState-based
  // guards aren't enough here since React batches updates, so a ref is used.
  const verifyLockRef = useRef(false);

  // Android needs the in-app browser "warmed up" before it can open an OAuth
  // session without a visible delay; iOS ignores this.
  useEffect(() => {
    if (Platform.OS !== "android") return;
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);

  async function handleSubmit() {
    if (isSignup && !name.trim()) {
      setError("Enter your name to continue.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    if (includePassword && password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    setSubmitting(true);

    if (isSignup) {
      const [firstName, ...rest] = name.trim().split(/\s+/);
      const { error: signUpError } = await signUp.password({
        emailAddress: email.trim(),
        password,
        firstName,
        lastName: rest.length ? rest.join(" ") : undefined,
      });
      if (signUpError) {
        setSubmitting(false);
        setError(errorMessage(signUpError, "Couldn't create your account. Try again."));
        return;
      }

      const { error: codeError } = await signUp.verifications.sendEmailCode();
      setSubmitting(false);
      if (codeError) {
        setError(errorMessage(codeError, "Couldn't send a verification code. Try again."));
        return;
      }
      setVerifyError("");
      setVerifying(true);
      return;
    }

    const { error: signInError } = await signIn.password({
      identifier: email.trim(),
      password,
    });
    if (signInError) {
      setSubmitting(false);
      setError(errorMessage(signInError, "Couldn't sign you in. Check your details and try again."));
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({ navigate: navigateHome });
      setSubmitting(false);
      return;
    }

    if (signIn.status === "needs_second_factor" || signIn.status === "needs_client_trust") {
      const { error: mfaError } = await signIn.mfa.sendEmailCode();
      setSubmitting(false);
      if (mfaError) {
        setError(errorMessage(mfaError, "Couldn't send a verification code. Try again."));
        return;
      }
      setVerifyError("");
      setVerifying(true);
      return;
    }

    setSubmitting(false);
    setError("Couldn't sign you in. Try again.");
  }

  async function handleVerifyCode(code: string) {
    if (verifyLockRef.current) return;
    verifyLockRef.current = true;
    setVerifyingCode(true);
    setVerifyError("");

    if (isSignup) {
      const { error: codeError } = await signUp.verifications.verifyEmailCode({ code });
      if (codeError || signUp.status !== "complete") {
        verifyLockRef.current = false;
        setVerifyingCode(false);
        setVerifyError(errorMessage(codeError, "That code didn't work. Try again."));
        return;
      }
      await signUp.finalize({ navigate: navigateHome });
    } else {
      const { error: codeError } = await signIn.mfa.verifyEmailCode({ code });
      if (codeError || signIn.status !== "complete") {
        verifyLockRef.current = false;
        setVerifyingCode(false);
        setVerifyError(errorMessage(codeError, "That code didn't work. Try again."));
        return;
      }
      await signIn.finalize({ navigate: navigateHome });
    }

    verifyLockRef.current = false;
    setVerifyingCode(false);
    setVerifying(false);
  }

  async function handleOAuth(strategy: SocialStrategy) {
    setError("");
    setSubmitting(true);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl: makeRedirectUri({ scheme: "app", path: "/sso-callback" }),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId, navigate: navigateHome });
      }
      // No session and no error means the user closed the browser before
      // finishing — nothing to show them.
    } catch (err) {
      setError(errorMessage(err, "Couldn't complete sign in. Try again."));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View className="flex-1 bg-clutch-bg">
      <AuthGlow />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 14, paddingBottom: 22 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="mb-[26px] flex-row items-center gap-[11px]">
            <BrandMark size={46} />
            <Text className="font-display-bold text-[26px] uppercase tracking-[0.06em] text-clutch-text-1">Clutch</Text>
          </View>

          <Text className="font-display text-[28px] uppercase leading-[29px] text-clutch-text-1">{heading}</Text>
          <Text className="mb-6 mt-[11px] font-body text-[15px] leading-[22px] text-clutch-text-2">{subtext}</Text>

          <View className="gap-[14px]">
            {isSignup && (
              <AuthField
                label="Full name"
                value={name}
                onChangeText={(t) => {
                  setName(t);
                  setError("");
                }}
                placeholder="Jordan Ellis"
              />
            )}
            <AuthField
              label="Email"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                setError("");
              }}
              placeholder="you@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {includePassword && (
              <PasswordField
                value={password}
                onChangeText={(t) => {
                  setPassword(t);
                  setError("");
                }}
              />
            )}
          </View>

          {!!error && <ErrorRow message={error} />}

          {/* Invisible — required by Clerk's bot sign-up protection, see clerk.com/docs/guides/development/custom-flows/authentication/bot-sign-up-protection */}
          {isSignup && <View nativeID="clerk-captcha" />}

          <View className="mt-[18px]">
            <CutCornerButton onPress={() => void handleSubmit()} disabled={submitting} loading={submitting}>
              <Text className="font-body-bold text-[16px] text-clutch-ink">{ctaLabel}</Text>
            </CutCornerButton>
          </View>

          <View className="mb-4 mt-[20px] flex-row items-center gap-[10px]">
            <View className="h-px flex-1 bg-clutch-border" />
            <Text className="font-mono text-[10px] uppercase tracking-[0.06em] text-clutch-text-3">or continue with</Text>
            <View className="h-px flex-1 bg-clutch-border" />
          </View>

          <SocialAuthButtons
            disabled={submitting}
            onApplePress={() => void handleOAuth("oauth_apple")}
            onGooglePress={() => void handleOAuth("oauth_google")}
          />

          <View className="mt-[22px] flex-row justify-center">
            <Text className="text-[14px] text-clutch-text-2">{togglePrompt} </Text>
            <TouchableOpacity onPress={() => router.replace(toggleHref)} hitSlop={8}>
              <Text className="font-body-semibold text-[14px] text-clutch-blue">{toggleAction}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }} />

          <Text className="mt-[18px] text-center text-[11px] leading-[16px] text-clutch-text-3">
            By continuing you agree to the Terms and Privacy Policy.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={verifying}
        email={email}
        error={verifyError}
        verifying={verifyingCode}
        onClose={() => setVerifying(false)}
        onCodeComplete={(code) => void handleVerifyCode(code)}
      />
    </View>
  );
}
