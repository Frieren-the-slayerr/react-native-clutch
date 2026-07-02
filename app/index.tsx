import { useAuth, useClerk, useUser } from "@clerk/expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BrandMark } from "@/components/BrandMark";
import { colors } from "@/theme";

// Placeholder home screen — the real home feed is built in a later lesson.
// This just proves the signed-in gate works end to end.
export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
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
        <TouchableOpacity
          onPress={() => signOut()}
          activeOpacity={0.85}
          className="mt-4 rounded-clutch-sm bg-clutch-blue px-5 py-[13px]"
        >
          <Text className="font-body-bold text-[14px] text-clutch-ink">Sign out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
