import { ComponentRef, Ref } from "react";
import {
  Tabs,
  TabList,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from "expo-router/ui";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/theme";
import { Glass } from "@/components/glass";
import { Icon, IconName } from "@/components/icon";
const tabs = [
  { name: "home", href: "/" as const, label: "Home", icon: "home" },
  {
    name: "discover",
    href: "/discover" as const,
    label: "Discover",
    icon: "discover",
  },
  {
    name: "library",
    href: "/library" as const,
    label: "Library",
    icon: "library",
  },
  { name: "create", href: "/create" as const, label: "Create", icon: "create" },
  {
    name: "profile",
    href: "/profile" as const,
    label: "Profile",
    icon: "profile",
  },
] as const;
function TabButton({
  isFocused,
  icon,
  label,
  ...props
}: Omit<TabTriggerSlotProps, "ref"> & {
  ref?: Ref<ComponentRef<typeof Pressable>>;
  icon: IconName;
  label: string;
}) {
  const { theme } = useTheme();
  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected: isFocused }}
      aria-selected={isFocused}
      style={({ pressed }) => ({
        flex: 1,
        minHeight: 58,
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        borderRadius: 26,
        backgroundColor: isFocused ? theme.accent + "24" : "transparent",
        opacity: pressed ? 0.65 : 1,
      })}
    >
      <Icon
        name={icon}
        color={isFocused ? theme.accent : theme.muted}
        size={23}
      />
      <Text
        style={{
          color: isFocused ? theme.accent : theme.muted,
          fontSize: 10,
          fontWeight: isFocused ? "700" : "500",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
export default function TabsLayout() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      options={{ backBehavior: "history" }}
      style={{
        flex: 1,
        minHeight: 0,
        overflow: "hidden",
        backgroundColor: theme.bg,
      }}
    >
      <TabSlot style={{ flex: 1, flexBasis: 0, minHeight: 0 }} />
      <TabList style={{ display: "none" }}>
        {tabs.map((t) => (
          <TabTrigger key={t.name} name={t.name} href={t.href} />
        ))}
      </TabList>
      <View
        style={{
          position: "absolute",
          left: 16,
          right: 16,
          bottom: Math.max(insets.bottom, 12),
          alignItems: "center",
        }}
      >
        <Glass
          style={{
            width: "100%",
            maxWidth: 540,
            borderRadius: 34,
            padding: 5,
            flexDirection: "row",
            boxShadow: "0 8px 28px #00000025",
          }}
        >
          {tabs.map((t) => (
            <TabTrigger key={t.name} name={t.name} asChild>
              <TabButton icon={t.icon} label={t.label} />
            </TabTrigger>
          ))}
        </Glass>
      </View>
    </Tabs>
  );
}
