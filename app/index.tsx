import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { useAuthGate } from "@/hooks/useAuthGate";
import { colors } from "@/theme";

// Entry route — decides where to send the user (onboarding, language
// selection, or the tab navigator) based on auth and language state.
export default function Index() {
  const gate = useAuthGate();

  if (gate.status === "loading") {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }

  if (gate.status === "redirect") {
    return <Redirect href={gate.href} />;
  }

  return <Redirect href="/(tabs)/home" />;
}
