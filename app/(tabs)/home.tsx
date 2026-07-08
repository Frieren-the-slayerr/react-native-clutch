import AsyncStorage from "@react-native-async-storage/async-storage";
import { useClerk, useUser } from "@clerk/expo";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BrandMark } from "@/components/BrandMark";
import { languages } from "@/data/languages";
import { LANGUAGE_STORAGE_KEY, useLanguageStore } from "@/store/language";
import { colors } from "@/theme";

// Placeholder home screen — the real home feed is built in a later lesson.
// This just proves the signed-in gate and tab navigation work end to end.
export default function HomeScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const clearLanguage = useLanguageStore((state) => state.clearLanguage);

  const currentLanguage = languages.find((language) => language.code === selectedLanguage);

  // Testing helper — wipes the persisted language selection so the
  // language-select gate can be re-triggered without reinstalling the app.
  async function handleClearLanguageStorage() {
    await AsyncStorage.removeItem(LANGUAGE_STORAGE_KEY);
    clearLanguage();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View className="flex-1 items-center justify-center gap-4 px-6">
        <BrandMark size={46} />
        <Text className="text-center font-display text-[22px] uppercase leading-[28px] text-clutch-text-1">
          {"Welcome back,\n" + (user?.firstName ?? user?.primaryEmailAddress?.emailAddress ?? "there")}
        </Text>
        <Text className="text-center font-body text-[14px] leading-[20px] text-clutch-text-2">
          The home feed is coming in the next lesson. You&apos;re signed in and ready to go.
        </Text>
        <View className="flex-row items-center gap-2 rounded-clutch-sm border border-clutch-border bg-clutch-surface px-4 py-2">
          <Text className="font-body text-[16px]">{currentLanguage?.flag}</Text>
          <Text className="font-body-semibold text-[14px] text-clutch-text-1">
            {currentLanguage?.name ?? selectedLanguage}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/language-select")}
          activeOpacity={0.85}
          className="mt-4 rounded-clutch-sm border border-clutch-border bg-clutch-surface px-5 py-[13px]"
        >
          <Text className="font-body-bold text-[14px] text-clutch-text-1">Change language</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => signOut()}
          activeOpacity={0.85}
          className="mt-3 rounded-clutch-sm bg-clutch-blue px-5 py-[13px]"
        >
          <Text className="font-body-bold text-[14px] text-clutch-ink">Sign out</Text>
        </TouchableOpacity>
        {__DEV__ && (
          <TouchableOpacity
            onPress={handleClearLanguageStorage}
            activeOpacity={0.85}
            className="mt-3 rounded-clutch-sm border border-clutch-border px-5 py-[13px]"
          >
            <Text className="font-body-bold text-[14px] text-clutch-text-3">Clear language storage (test)</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
