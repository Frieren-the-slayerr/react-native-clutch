import "../global.css";

import {
  IBMPlexMono_500Medium,
  IBMPlexMono_600SemiBold,
  useFonts as useIBMFont,
} from "@expo-google-fonts/ibm-plex-mono";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts as useInterFont,
} from "@expo-google-fonts/inter";
import {
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
  useFonts as useOswaldFont,
} from "@expo-google-fonts/oswald";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, interError] = useInterFont({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const [oswaldLoaded, oswaldError] = useOswaldFont({
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold,
  });
  const [ibmLoaded, ibmError] = useIBMFont({
    IBMPlexMono_500Medium,
    IBMPlexMono_600SemiBold,
  });

  const fontsLoaded = interLoaded && oswaldLoaded && ibmLoaded;
  const fontError = interError || oswaldError || ibmError;

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <View className="flex-1 items-center justify-center bg-clutch-bg">
        <ActivityIndicator size="large" color="#33A1FF" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
