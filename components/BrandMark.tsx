import { View } from "react-native";
import Svg, { Path, Polygon } from "react-native-svg";

import { colors } from "@/theme";

type BrandMarkProps = {
  size?: number;
};

// Cut-corner brand mark: CSS clip-path polygon(0 0,70% 0,100% 30%,100% 100%,30% 100%,0 70%)
// re-drawn as an SVG polygon since clip-path isn't supported on native.
export function BrandMark({ size = 28 }: BrandMarkProps) {
  const iconSize = size * (24 / 44);

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size} viewBox="0 0 100 100" style={{ position: "absolute" }}>
        <Polygon points="0,0 70,0 100,30 100,100 30,100 0,70" fill={colors.blue} />
      </Svg>
      <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={colors.ink} strokeWidth={2} strokeLinecap="round">
        <Path d="M6 3v18M18 3v18M3 8h4M3 16h4M17 8h4M17 16h4" />
      </Svg>
    </View>
  );
}
