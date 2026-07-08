import { useAuth } from "@clerk/expo";

import { useLanguageStore } from "@/store/language";

type AuthGateResult =
  | { status: "loading" }
  | { status: "redirect"; href: "/onboarding" | "/language-select" }
  | { status: "ready" };

export function useAuthGate(): AuthGateResult {
  const { isLoaded, isSignedIn } = useAuth();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const hasHydrated = useLanguageStore((state) => state.hasHydrated);

  if (!isLoaded || !hasHydrated) {
    return { status: "loading" };
  }

  if (!isSignedIn) {
    return { status: "redirect", href: "/onboarding" };
  }

  if (!selectedLanguage) {
    return { status: "redirect", href: "/language-select" };
  }

  return { status: "ready" };
}
