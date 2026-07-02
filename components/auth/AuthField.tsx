import { useState } from "react";
import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";

import { colors } from "@/theme";

type AuthFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

export function AuthField({ label, value, onChangeText, placeholder, keyboardType, autoCapitalize = "words" }: AuthFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View>
      <Text className="mb-[7px] font-body-semibold text-[11px] uppercase tracking-[0.08em] text-clutch-blue">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text3}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        className="rounded-[12px] border px-[14px] py-[13px] font-body text-[15px] text-clutch-text-1"
        style={{
          backgroundColor: colors.surfaceSunk,
          borderColor: focused ? colors.blue : colors.border,
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}
