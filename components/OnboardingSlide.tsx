import { Text, View } from "react-native";
import Svg, { Circle, Defs, Path, Pattern, RadialGradient, Rect, Stop } from "react-native-svg";

import { colors } from "@/theme";

export type OnboardingIcon = "car" | "wrench";

function CarIcon({ color }: { color: string }) {
  return (
    <Svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M5 16V11l2-5h10l2 5v5" />
      <Circle cx={7.5} cy={16.5} r={1.6} />
      <Circle cx={16.5} cy={16.5} r={1.6} />
      <Path d="M5 13h14" />
    </Svg>
  );
}

function WrenchIcon({ color }: { color: string }) {
  return (
    <Svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M14.5 6.5a3.5 3.5 0 1 0-4.8 4.8L4 17l3 3 5.7-5.7a3.5 3.5 0 0 0 4.8-4.8l-2 2-2-2z" />
    </Svg>
  );
}

const ICONS: Record<OnboardingIcon, typeof CarIcon> = {
  car: CarIcon,
  wrench: WrenchIcon,
};

function IllusCard({ icon, iconColor }: { icon: OnboardingIcon; iconColor: string }) {
  const Icon = ICONS[icon];

  return (
    <View className="h-[150px] overflow-hidden rounded-clutch-md border border-clutch-border">
      <Svg width="100%" height="100%" style={{ position: "absolute" }}>
        <Defs>
          <Pattern id="grid" width={18} height={18} patternUnits="userSpaceOnUse">
            <Path d="M18 0H0V18" stroke={colors.borderSoft} strokeWidth={1} fill="none" />
          </Pattern>
          <RadialGradient id="wash" cx="70%" cy="28%" r="60%">
            <Stop offset="0" stopColor={colors.blue} stopOpacity={0.16} />
            <Stop offset="1" stopColor={colors.blue} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="100%" fill={colors.surfaceSunk} />
        <Rect width="100%" height="100%" fill="url(#grid)" />
        <Rect width="100%" height="100%" fill="url(#wash)" />
      </Svg>
      <View className="flex-1 items-center justify-center">
        <View className="h-14 w-14 items-center justify-center rounded-clutch-md border border-clutch-border bg-clutch-surface-raised">
          <Icon color={iconColor} />
        </View>
      </View>
    </View>
  );
}

type OnboardingSlideProps = {
  width: number;
  icon: OnboardingIcon;
  iconColor: string;
  title: string;
  body: string;
};

export function OnboardingSlide({ width, icon, iconColor, title, body }: OnboardingSlideProps) {
  return (
    <View style={{ width }} className="px-6 pt-6">
      <IllusCard icon={icon} iconColor={iconColor} />
      <View className="mt-5">
        <Text className="font-display-medium text-[22px] uppercase leading-[26px] tracking-[0.02em] text-clutch-text-1">{title}</Text>
        <Text className="mt-2 font-body text-[15px] leading-[21px] text-clutch-text-2">{body}</Text>
      </View>
    </View>
  );
}
