import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";

import { colors } from "@/theme";

type PasswordFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export function PasswordField({ value, onChangeText }: PasswordFieldProps) {
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Text className="mb-[7px] font-body-semibold text-[11px] uppercase tracking-[0.08em] text-clutch-blue">Password</Text>
      <View style={{ position: "relative" }}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="••••••••"
          placeholderTextColor={colors.text3}
          secureTextEntry={!visible}
          autoCapitalize="none"
          autoCorrect={false}
          className="rounded-[12px] border py-[13px] pl-[14px] font-mono text-[15px] text-clutch-text-1"
          style={{
            backgroundColor: colors.surfaceSunk,
            borderColor: focused ? colors.blue : colors.border,
            paddingRight: 46,
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <Pressable
          onPress={() => setVisible((v) => !v)}
          hitSlop={8}
          style={{ position: "absolute", right: 6, top: 0, bottom: 0, width: 34, alignItems: "center", justifyContent: "center" }}
        >
          <Svg width={19} height={19} viewBox="0 0 24 24" fill="none" stroke={colors.text2} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
            <Circle cx={12} cy={12} r={3} />
            {visible && <Line x1={4} y1={4} x2={20} y2={20} />}
          </Svg>
        </Pressable>
      </View>
    </View>
  );
}
