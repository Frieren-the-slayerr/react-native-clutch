import { AuthScreen } from "@/components/auth/AuthScreen";

export default function SignUp() {
  return (
    <AuthScreen
      mode="sign-up"
      heading={"Create your\naccount"}
      subtext="Your roadside crew, one tap away."
      ctaLabel="Create Account"
      togglePrompt="Already have an account?"
      toggleAction="Sign in"
      toggleHref="/sign-in"
      includePassword
    />
  );
}
