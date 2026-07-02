import { Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

type SocialAuthButtonsProps = {
  onApplePress: () => void;
  onGooglePress: () => void;
  disabled?: boolean;
};

function AppleIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="#000">
      <Path d="M16.5 1.5c.1 1.1-.3 2.2-1 3-.7.8-1.9 1.5-3 1.4-.1-1 .4-2.2 1-2.9.8-.9 2-1.5 3-1.5zM20.8 17c-.5 1.2-.8 1.7-1.5 2.7-1 1.4-2.3 3.2-4 3.2-1.5 0-1.9-1-3.9-1s-2.5 1-4 1c-1.7 0-3-1.6-4-3-2.7-4-3-8.6-1.3-11 1.2-1.7 3-2.7 4.7-2.7 1.7 0 2.8 1 4.2 1 1.4 0 2.2-1 4.2-1 1.5 0 3.1.8 4.2 2.2-3.7 2-3.1 7.3 1.4 8.6z" />
    </Svg>
  );
}

function GoogleIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24">
      <Path fill="#4285F4" d="M22.5 12.2c0-.7-.06-1.4-.18-2.06H12v3.9h5.9a5.04 5.04 0 0 1-2.19 3.31v2.74h3.54c2.07-1.9 3.25-4.71 3.25-7.89z" />
      <Path fill="#34A853" d="M12 23c2.95 0 5.43-.98 7.24-2.65l-3.54-2.74c-.98.66-2.24 1.05-3.7 1.05-2.85 0-5.26-1.92-6.12-4.5H2.23v2.83A11 11 0 0 0 12 23z" />
      <Path fill="#FBBC05" d="M5.88 14.16a6.6 6.6 0 0 1 0-4.32V7.01H2.23a11 11 0 0 0 0 9.98l3.65-2.83z" />
      <Path fill="#EA4335" d="M12 5.18c1.6 0 3.05.55 4.19 1.64l3.14-3.14C17.43 1.98 14.95 1 12 1A11 11 0 0 0 2.23 7.01l3.65 2.83C6.74 7.26 9.15 5.18 12 5.18z" />
    </Svg>
  );
}

export function SocialAuthButtons({ onApplePress, onGooglePress, disabled }: SocialAuthButtonsProps) {
  return (
    <View className="flex-row gap-[11px]">
      <TouchableOpacity
        onPress={onApplePress}
        disabled={disabled}
        activeOpacity={0.85}
        className="flex-1 flex-row items-center justify-center gap-2 rounded-[10px] bg-white px-3 py-[13px]"
        style={{ opacity: disabled ? 0.6 : 1 }}
      >
        <AppleIcon />
        <Text className="font-body-semibold text-[14px] text-black">Apple</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onGooglePress}
        disabled={disabled}
        activeOpacity={0.85}
        className="flex-1 flex-row items-center justify-center gap-2 rounded-[10px] border border-clutch-border bg-clutch-surface-raised px-3 py-[13px]"
        style={{ opacity: disabled ? 0.6 : 1 }}
      >
        <GoogleIcon />
        <Text className="font-body-semibold text-[14px] text-clutch-text-1">Google</Text>
      </TouchableOpacity>
    </View>
  );
}
