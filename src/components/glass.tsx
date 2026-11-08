import { PropsWithChildren } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import { useTheme } from "@/theme";
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
          backgroundColor: theme.surface + "82",
          borderColor: theme.accent + "26",
          borderWidth: 1,
          borderRadius: 22,
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
    <Glass style={{ borderRadius: 24 }}>
      <Pressable
        onPress={onPress}
        accessibilityLabel={label}
        accessibilityRole="button"
        style={({ pressed }) => ({
          width: 44,
          height: 44,
          alignItems: "center",
          justifyContent: "center",
          opacity: pressed ? 0.6 : 1,
        })}
      >
        <Icon name={name} color={theme.text} size={20} />
      </Pressable>
    </Glass>
  );
}
