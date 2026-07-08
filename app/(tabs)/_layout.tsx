import { Redirect, Tabs } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { CustomTabBar } from "@/components/tabs/CustomTabBar";
import { useAuthGate } from "@/hooks/useAuthGate";
import { colors } from "@/theme";

export default function TabsLayout() {
  const gate = useAuthGate();

  if (gate.status === "loading") {
    return (
      <View className="flex-1 items-center justify-center" style={{ backgroundColor: colors.bg }}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }

  if (gate.status === "redirect") {
    return <Redirect href={gate.href} />;
  }

  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="jobs" options={{ title: "Jobs" }} />
      <Tabs.Screen name="clutch-ai" options={{ title: "Clutch AI" }} />
      <Tabs.Screen name="chat" options={{ title: "Chat" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
