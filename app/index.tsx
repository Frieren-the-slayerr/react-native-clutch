import { router } from "expo-router";
import { useRef, useState } from "react";
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BrandMark } from "@/components/BrandMark";
import { OnboardingSlide, type OnboardingIcon } from "@/components/OnboardingSlide";
import { colors } from "@/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SLIDES: { icon: OnboardingIcon; iconColor: string; title: string; body: string }[] = [
  {
    icon: "car",
    iconColor: colors.blue,
    title: "Car trouble?\nHelp is close.",
    body: "Post what's wrong and get matched with a nearby mechanic in minutes — no shop, no towing, no waiting.",
  },
  {
    icon: "wrench",
    iconColor: colors.teal,
    title: "Mechanics you\ncan trust.",
    body: "Every mechanic grades up from Apprentice to Chief through completed jobs — reputation you can actually see.",
  },
];

export default function Onboarding() {
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);
  const isLastSlide = index === SLIDES.length - 1;

  function handleScrollEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
    setIndex(Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH));
  }

  function handleNext() {
    if (isLastSlide) {
      router.push("/sign-up");
      return;
    }
    const nextIndex = index + 1;
    scrollRef.current?.scrollTo({ x: nextIndex * SCREEN_WIDTH, animated: true });
    setIndex(nextIndex);
  }

  function handleSkip() {
    router.push("/design-system");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View className="flex-row items-center gap-2 px-6 pb-2 pt-2">
        <BrandMark size={28} />
        <Text className="font-display text-lg uppercase tracking-[0.2em] text-clutch-text-1">Clutch</Text>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        className="flex-1"
      >
        {SLIDES.map((slide) => (
          <OnboardingSlide key={slide.title} width={SCREEN_WIDTH} {...slide} />
        ))}
      </ScrollView>

      <View className="flex-row items-center justify-between px-6 pb-4 pt-2">
        <TouchableOpacity onPress={handleSkip} hitSlop={8}>
          <Text className="font-body text-[13px] text-clutch-text-3">Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} activeOpacity={0.85} className="rounded-clutch-sm bg-clutch-blue px-4 py-[9px]">
          <Text className="font-body-semibold text-[13px] text-clutch-ink">{isLastSlide ? "Get Started" : "Next"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
