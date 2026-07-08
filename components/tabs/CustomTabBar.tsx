import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useRef, useState } from "react";
import { Animated, LayoutChangeEvent, Pressable, Text, View } from "react-native";

import { ChatTabIcon, ClutchAiTabIcon, HomeTabIcon, JobsTabIcon, ProfileTabIcon } from "@/components/tabs/icons";
import { colors } from "@/theme";

const INDICATOR_SIZE = 44;
const ICON_SLOT_SIZE = 44;

type TabIcon = typeof HomeTabIcon;

const TAB_CONFIG: Record<string, { label: string; Icon: TabIcon }> = {
  home: { label: "HOME", Icon: HomeTabIcon },
  jobs: { label: "JOBS", Icon: JobsTabIcon },
  "clutch-ai": { label: "CLUTCH AI", Icon: ClutchAiTabIcon },
  chat: { label: "CHAT", Icon: ChatTabIcon },
  profile: { label: "PROFILE", Icon: ProfileTabIcon },
};

// Custom bottom tab bar matching the Clutch design: the active tab's icon
// sits inside a filled circle with no label, while inactive tabs show a
// gray icon + label. A single indicator view slides between tabs instead of
// each tab drawing its own circle, so the highlight animates smoothly.
export function CustomTabBar({ state, navigation, insets }: BottomTabBarProps) {
  const [tabWidth, setTabWidth] = useState(0);
  const indicatorX = useRef(new Animated.Value(0)).current;
  const hasMeasured = useRef(false);

  useEffect(() => {
    if (tabWidth <= 0) return;
    const target = state.index * tabWidth + tabWidth / 2 - INDICATOR_SIZE / 2;

    if (!hasMeasured.current) {
      indicatorX.setValue(target);
      hasMeasured.current = true;
      return;
    }

    Animated.spring(indicatorX, {
      toValue: target,
      useNativeDriver: true,
      friction: 8,
      tension: 70,
    }).start();
  }, [state.index, tabWidth, indicatorX]);

  function handleLayout(event: LayoutChangeEvent) {
    setTabWidth(event.nativeEvent.layout.width / state.routes.length);
  }

  return (
    <View
      onLayout={handleLayout}
      className="flex-row border-t border-clutch-border bg-clutch-surface-raised"
      style={{ paddingBottom: insets.bottom + 8 }}
    >
      {tabWidth > 0 && (
        <Animated.View
          pointerEvents="none"
          className="absolute left-0 top-[10px] rounded-full bg-clutch-blue"
          style={{
            width: INDICATOR_SIZE,
            height: INDICATOR_SIZE,
            transform: [{ translateX: indicatorX }],
          }}
        />
      )}

      {state.routes.map((route, index) => {
        const config = TAB_CONFIG[route.name];
        if (!config) return null;
        const { label, Icon } = config;
        const isFocused = state.index === index;

        function onPress() {
          const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        }

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={label}
            className="flex-1 items-center gap-[5px] pt-[10px]"
          >
            <View className="items-center justify-center" style={{ width: ICON_SLOT_SIZE, height: ICON_SLOT_SIZE }}>
              <Icon color={isFocused ? colors.ink : colors.text3} />
            </View>
            {!isFocused && (
              <Text className="font-mono" style={{ fontSize: 9.5, letterSpacing: 0.5, color: colors.text3 }}>
                {label}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
