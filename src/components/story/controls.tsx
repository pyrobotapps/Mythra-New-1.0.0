import { inkSurfaces } from "@/theme/visual";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { PropsWithChildren } from "react";
import { Modal, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Classification } from "@/data/stories";
import { tokens, useTheme } from "@/theme";
import { IconButton } from "@/components/glass";
import { Txt } from "@/components/ui";
export function Sheet({
  title,
  visible,
  onClose,
  children,
}: {
  title: string;
  visible: boolean;
  onClose: () => void;
} & PropsWithChildren) {
  const { theme } = useTheme();
  const reducedMotion = useReducedMotion();
  return (
    <Modal
      transparent
      visible={visible}
      animationType={reducedMotion ? "none" : "fade"}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#00000085",
          justifyContent: "flex-end",
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss dialog"
          style={{ flex: 1 }}
          onPress={onClose}
        />
        <SafeAreaView
          edges={["bottom", "left", "right"]}
          accessibilityViewIsModal
          style={{
            maxHeight: "85%",
            backgroundColor: theme.bg,
            borderTopLeftRadius: tokens.radii.sheet,
            borderTopRightRadius: tokens.radii.sheet,
            borderWidth: 1,
            borderColor: inkSurfaces(theme).border,
          }}
        >
          <View
            style={{
              padding: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Txt
              title
              companion
              accessibilityRole="header"
              style={{ flex: 1, fontSize: 24, lineHeight: 30 }}
            >
              {title}
            </Txt>
            <IconButton
              name="close"
              label={`Close ${title}`}
              onPress={onClose}
            />
          </View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: 24,
              gap: 16,
            }}
          >
            {children}
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
}
export function TextAction({
  label,
  onPress,
  muted = false,
}: {
  label: string;
  onPress: () => void;
  muted?: boolean;
}) {
  const { theme } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: 44,
        justifyContent: "center",
        opacity: pressed ? tokens.feedback.pressedOpacity : 1,
      })}
    >
      <Txt
        style={{
          fontSize: 13,
          fontWeight: "600",
          color: muted ? theme.muted : theme.accent,
        }}
      >
        {label}
      </Txt>
    </Pressable>
  );
}
export function DetailSection({
  title,
  children,
  action,
}: { title: string; action?: React.ReactNode } & PropsWithChildren) {
  const { theme } = useTheme();
  return (
    <View
      style={{
        borderTopWidth: 1,
        borderColor: inkSurfaces(theme).divider,
        paddingTop: 20,
        gap: 14,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Txt
          accessibilityRole="header"
          title
          companion
          style={{ flex: 1, fontSize: 24, lineHeight: 30 }}
        >
          {title}
        </Txt>
        {action}
      </View>
      {children}
    </View>
  );
}
const badgeColors: Record<Classification, { dark: string; light: string }> = {
  Safe: { dark: "#91E0AE", light: "#176139" },
  Suggestive: { dark: "#F1CB7D", light: "#7C5000" },
  Erotica: { dark: "#FFACD0", light: "#9A235D" },
  Pornographic: { dark: "#FF9D9D", light: "#A1212D" },
};
export function ClassificationBadge({ value }: { value: Classification }) {
  const { theme } = useTheme();
  const color = theme.dark ? badgeColors[value].dark : badgeColors[value].light;
  return (
    <View
      accessibilityLabel={`Content classification: ${value}`}
      style={{
        alignSelf: "flex-start",
        paddingHorizontal: 9,
        paddingVertical: 3,
        borderRadius: tokens.radii.badge,
        backgroundColor: color + "18",
        borderWidth: 1,
        borderColor: color + "44",
      }}
    >
      <Txt style={{ fontSize: 10, lineHeight: 16, fontWeight: "700", color }}>
        {value}
      </Txt>
    </View>
  );
}
export function Avatar({
  initials,
  size = 42,
}: {
  initials: string;
  size?: number;
}) {
  const { theme } = useTheme();
  return (
    <View
      accessibilityLabel={`${initials} avatar`}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.accent + "22",
      }}
    >
      <Txt
        style={{
          fontSize: Math.round(size * 0.3),
          fontWeight: "700",
          color: theme.accent,
        }}
      >
        {initials}
      </Txt>
    </View>
  );
}
