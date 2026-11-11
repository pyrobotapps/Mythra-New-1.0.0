import { PropsWithChildren, useState } from "react";
import { Pressable, TextInput, TextInputProps, View } from "react-native";
import { router } from "expo-router";
import { IconButton } from "@/components/glass";
import { Button, Txt } from "@/components/ui";
import { Sheet } from "@/components/story/controls";
import { useTheme } from "@/theme";
import { inkSurfaces } from "@/theme/visual";
import { openExperience } from "./navigation";
export function ScreenHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <IconButton
          name="back"
          label="Back"
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/")
          }
        />
        <Txt title accessibilityRole="header" style={{ flex: 1 }}>
          {title}
        </Txt>
      </View>
      {subtitle ? <Txt muted>{subtitle}</Txt> : null}
    </View>
  );
}
export function Section({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <View style={{ gap: 12 }}>
      <Txt
        title
        accessibilityRole="header"
        style={{ fontSize: 26, lineHeight: 34 }}
      >
        {title}
      </Txt>
      {children}
    </View>
  );
}
export function Destination({
  title,
  detail,
  screen,
  context,
  subject,
}: {
  title: string;
  detail?: string;
  screen: string;
  context?: string;
  subject?: string;
}) {
  const { theme } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => openExperience(screen, context, subject)}
      style={({ pressed }) => ({
        minHeight: 56,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: inkSurfaces(theme).divider,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        opacity: pressed ? 0.75 : 1,
      })}
    >
      <View style={{ flex: 1, gap: 3 }}>
        <Txt style={{ fontWeight: "600" }}>{title}</Txt>
        {detail ? (
          <Txt muted style={{ fontSize: 12, lineHeight: 18 }}>
            {detail}
          </Txt>
        ) : null}
      </View>
      <Txt muted>›</Txt>
    </Pressable>
  );
}
export function Field({ label, ...props }: TextInputProps & { label: string }) {
  const { theme } = useTheme();
  return (
    <View style={{ gap: 7 }}>
      <Txt style={{ fontSize: 13, fontWeight: "600" }}>{label}</Txt>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={theme.muted}
        {...props}
        style={[
          {
            color: theme.text,
            backgroundColor: theme.surface,
            borderRadius: 14,
            minHeight: 48,
            padding: 12,
            fontSize: 15,
            lineHeight: 23,
            textAlignVertical: props.multiline ? "top" : "center",
          },
          props.style,
        ]}
      />
    </View>
  );
}
export function EmptyState({ title, body }: { title: string; body: string }) {
  const { theme } = useTheme();
  return (
    <View
      style={{
        paddingVertical: 22,
        gap: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: inkSurfaces(theme).divider,
      }}
    >
      <Txt literary style={{ fontSize: 23, lineHeight: 31 }}>
        {title}
      </Txt>
      <Txt muted>{body}</Txt>
    </View>
  );
}
export function DeferredAction({
  label,
  reason,
}: {
  label: string;
  reason: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button secondary label={label} onPress={() => setOpen(true)} />
      <Sheet
        title="Not connected yet"
        visible={open}
        onClose={() => setOpen(false)}
      >
        <Txt>{reason}</Txt>
        <Txt muted>
          This design preview does not submit, charge, publish, or change a
          remote account.
        </Txt>
        <Button label="Understood" onPress={() => setOpen(false)} />
      </Sheet>
    </>
  );
}
