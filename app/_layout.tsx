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
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

SplashScreen.preventAutoHideAsync();

// Completes a pending browser-based OAuth session when the app regains focus
// after the user finishes signing in with Google/Apple in the system browser.
WebBrowser.maybeCompleteAuthSession();

if (!process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

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

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <Stack screenOptions={{ headerShown: false }} />
    </ClerkProvider>
  );
}
