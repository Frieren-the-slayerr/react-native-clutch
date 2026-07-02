import { router, type Href } from "expo-router";
import { useState } from "react";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [verifying, setVerifying] = useState(false);

  function handleSubmit() {
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
    setTimeout(() => {
      setSubmitting(false);
      setVerifying(true);
    }, 600);
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

          <View className="mt-[18px]">
            <CutCornerButton onPress={handleSubmit} disabled={submitting} loading={submitting}>
              <Text className="font-body-bold text-[16px] text-clutch-ink">{ctaLabel}</Text>
            </CutCornerButton>
          </View>

          <View className="mb-4 mt-[20px] flex-row items-center gap-[10px]">
            <View className="h-px flex-1 bg-clutch-border" />
            <Text className="font-mono text-[10px] uppercase tracking-[0.06em] text-clutch-text-3">or continue with</Text>
            <View className="h-px flex-1 bg-clutch-border" />
          </View>

          <SocialAuthButtons disabled={submitting} onApplePress={() => {}} onGooglePress={() => {}} />

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

      <VerificationModal visible={verifying} email={email} onClose={() => setVerifying(false)} />
    </View>
  );
}
