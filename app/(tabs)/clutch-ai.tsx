import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/theme";

// Placeholder screen — Clutch AI, which explains inspection results and bill
// line items in plain language, is built in a later lesson.
export default function ClutchAiScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View className="flex-1 items-center justify-center gap-2 px-6">
        <Text className="text-center font-display text-[22px] uppercase text-clutch-text-1">Clutch AI</Text>
        <Text className="text-center font-body text-[14px] leading-[20px] text-clutch-text-2">
          Ask about your inspection results or any charge on your bill — coming in a later lesson.
        </Text>
      </View>
    </SafeAreaView>
  );
}
