import { router } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";

import { CutCornerButton } from "@/components/CutCornerButton";
import { languages } from "@/data/languages";
import { colors } from "@/theme";
import type { LanguageCode } from "@/types/learning";

// Globe glyph, drawn to match the app's other custom icons (BrandMark, OnboardingSlide):
// 1.7pt stroke, round joins, 24x24 grid — no earth/globe image ships in assets/, so this
// stands in for the "earth image" called for by the design.
function GlobeIcon({ color, size = 24 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx={12} cy={12} r={9} />
      <Path d="M3 12h18" />
      <Path d="M12 3a13 13 0 0 1 3.5 9 13 13 0 0 1-3.5 9 13 13 0 0 1-3.5-9A13 13 0 0 1 12 3z" />
    </Svg>
  );
}

function SearchIcon() {
  return (
    <Svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke={colors.text3} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx={11} cy={11} r={7} />
      <Path d="M21 21l-4.3-4.3" />
    </Svg>
  );
}

function CheckIcon() {
  return (
    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={colors.ink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M5 13l4 4L19 7" />
    </Svg>
  );
}

export default function LanguageSelect() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<LanguageCode>(languages[0].code);
  const [searchFocused, setSearchFocused] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return languages;
    return languages.filter(
      (language) =>
        language.name.toLowerCase().includes(q) ||
        language.nativeName.toLowerCase().includes(q) ||
        language.code.toLowerCase().includes(q),
    );
  }, [query]);

  const selectedLanguage = languages.find((language) => language.code === selected);

  function handleConfirm() {
    // Selection is local for now — persisting it globally (Zustand + AsyncStorage
    // per AGENTS.md) is a later lesson once a store/ folder exists.
    router.back();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View className="flex-row items-center px-[18px] pt-1">
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="h-[38px] w-[38px] items-center justify-center rounded-[11px] border border-clutch-border bg-clutch-surface"
        >
          <Svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke={colors.text1} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M15 5l-7 7 7 7" />
          </Svg>
        </TouchableOpacity>
      </View>

      <View className="items-center pt-4">
        <View className="h-14 w-14 items-center justify-center rounded-clutch-md border border-clutch-border bg-clutch-surface-raised">
          <GlobeIcon color={colors.blue} size={26} />
        </View>
      </View>

      <View className="px-6 pb-3 pt-4">
        <Text className="text-center font-display text-[28px] uppercase leading-[30px] text-clutch-text-1">
          {"Choose your\nlanguage"}
        </Text>
        <Text className="mt-[10px] text-center font-body text-[14.5px] leading-[21px] text-clutch-text-2">
          Set the language for the whole Clutch app. You can change it anytime in Settings.
        </Text>
      </View>

      <View className="px-5 pb-3">
        <View className="justify-center">
          <View className="absolute left-[14px] z-10">
            <SearchIcon />
          </View>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search languages"
            placeholderTextColor={colors.text3}
            autoCapitalize="none"
            autoCorrect={false}
            className="rounded-clutch-md border py-[11px] pl-[42px] pr-[14px] font-body text-[15px] text-clutch-text-1"
            style={{
              backgroundColor: colors.surfaceSunk,
              borderColor: searchFocused ? colors.blue : colors.border,
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {filtered.map((language) => {
          const isSelected = language.code === selected;
          return (
            <TouchableOpacity
              key={language.code}
              onPress={() => setSelected(language.code)}
              activeOpacity={0.75}
              className="mb-2 flex-row items-center gap-3 rounded-clutch-md border p-3"
              style={{
                borderColor: isSelected ? colors.blue : colors.border,
                backgroundColor: isSelected ? colors.blueWash : colors.surface,
              }}
            >
              <View
                className="h-8 w-[42px] items-center justify-center rounded-[7px] border"
                style={{ borderColor: colors.border, backgroundColor: colors.surface }}
              >
                <Text className="font-mono-semibold text-[12px]" style={{ color: isSelected ? colors.blue : colors.text2 }}>
                  {language.code.toUpperCase()}
                </Text>
              </View>

              <View className="flex-1">
                <Text className="font-body-semibold text-[15px] text-clutch-text-1">{language.name}</Text>
                <Text className="mt-[1px] font-body text-[13px] text-clutch-text-2">{language.nativeName}</Text>
              </View>

              <View
                className="h-[22px] w-[22px] items-center justify-center rounded-full border-2"
                style={{
                  borderColor: isSelected ? colors.blue : "#3A4658",
                  backgroundColor: isSelected ? colors.blue : "transparent",
                }}
              >
                {isSelected && <CheckIcon />}
              </View>
            </TouchableOpacity>
          );
        })}

        {filtered.length === 0 && (
          <Text className="px-5 pt-8 text-center font-body text-[14px] text-clutch-text-3">
            No languages match &quot;{query}&quot;.
          </Text>
        )}
      </ScrollView>

      <View className="px-[22px] pb-6 pt-3">
        <CutCornerButton
          onPress={handleConfirm}
          accessibilityLabel={selectedLanguage ? `Continue in ${selectedLanguage.name}` : "Continue"}
        >
          <Text className="font-body-bold text-[16px] text-clutch-ink">
            {selectedLanguage ? `Continue in ${selectedLanguage.name}` : "Continue"}
          </Text>
        </CutCornerButton>
      </View>
    </SafeAreaView>
  );
}
