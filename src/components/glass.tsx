import { inkSurfaces } from "@/theme/visual";
import { PropsWithChildren } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import { tokens, useTheme } from "@/theme";
import { Icon, IconName } from "./icon";
export function Glass({
  children,
  style,
}: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  const { theme } = useTheme();
  return (
    <BlurView
      tint={theme.dark ? "systemThinMaterialDark" : "systemThinMaterialLight"}
      intensity={55}
      style={[
        {
          backgroundColor: inkSurfaces(theme).glass,
          borderColor: inkSurfaces(theme).border,
          borderWidth: 1,
          borderRadius: tokens.radii.glass,
          overflow: "hidden",
        },
        style,
      ]}
    >
      {children}
    </BlurView>
  );
}
export function IconButton({
  name,
  label,
  onPress,
}: {
  name: IconName;
  label: string;
  onPress: () => void;
}) {
  const { theme } = useTheme();
  return (
    <Glass style={{ borderRadius: tokens.radii.round }}>
      <Pressable
        onPress={onPress}
        accessibilityLabel={label}
        accessibilityRole="button"
        style={({ pressed }) => ({
          width: 44,
          height: 44,
          alignItems: "center",
          justifyContent: "center",
          opacity: pressed ? tokens.feedback.pressedOpacity : 1,
        })}
      >
        <Icon name={name} color={theme.text} size={20} />
      </Pressable>
    </Glass>
  );
}
