import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { LanguageCode } from "@/types/learning";

export const LANGUAGE_STORAGE_KEY = "clutch-language-storage";

interface LanguageState {
  selectedLanguage: LanguageCode | null;
  hasHydrated: boolean;
  setLanguage: (language: LanguageCode) => void;
  clearLanguage: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguage: null,
      hasHydrated: false,
      setLanguage: (language) => set({ selectedLanguage: language }),
      clearLanguage: () => set({ selectedLanguage: null }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: LANGUAGE_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ selectedLanguage: state.selectedLanguage }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Failed to rehydrate language store", error);
        }
        state?.setHasHydrated(true);
      },
    },
  ),
);
