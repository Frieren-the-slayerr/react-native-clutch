import { AuthScreen } from "@/components/auth/AuthScreen";

export default function SignIn() {
  return (
    <AuthScreen
      mode="sign-in"
      heading={"Welcome\nback"}
      subtext="Sign in to get back on the road."
      ctaLabel="Sign In"
      togglePrompt="New to Clutch?"
      toggleAction="Create one"
      toggleHref="/sign-up"
      includePassword
    />
  );
}
