import { ReactNode } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import Svg, { Polygon } from "react-native-svg";

import { colors } from "@/theme";

// Signature "cut corner" CTA — mirrors the brand mark's clipped-corner shape.
// CSS clip-path isn't supported on native, so the cut is faked with a small
// bg-colored triangle over a squared top-right corner (see BrandMark for the
// same technique applied to the logo badge).
const CUT = 14;

type CutCornerButtonProps = {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: ReactNode;
  accessibilityLabel?: string;
};

export function CutCornerButton({ onPress, disabled, loading, children, accessibilityLabel }: CutCornerButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled, busy: loading }}
      className="flex-row items-center justify-center gap-x-[9px] bg-clutch-blue rounded-tl-[11px] rounded-bl-[11px] rounded-br-[11px] py-[15px]"
      style={{ opacity: disabled ? 0.7 : 1 }}
    >
      {loading && <ActivityIndicator size="small" color={colors.ink} />}
      {children}
      <Svg width={CUT} height={CUT} style={{ position: "absolute", top: 0, right: 0 }}>
        <Polygon points={`0,0 ${CUT},0 ${CUT},${CUT}`} fill={colors.bg} />
      </Svg>
    </TouchableOpacity>
  );
}
