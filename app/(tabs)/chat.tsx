import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/theme";

// Placeholder screen — chat with your mechanic is built in a later lesson.
export default function ChatScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View className="flex-1 items-center justify-center gap-2 px-6">
        <Text className="text-center font-display text-[22px] uppercase text-clutch-text-1">Chat</Text>
        <Text className="text-center font-body text-[14px] leading-[20px] text-clutch-text-2">
          Messages with your mechanic are coming in a later lesson.
        </Text>
      </View>
    </SafeAreaView>
  );
}
