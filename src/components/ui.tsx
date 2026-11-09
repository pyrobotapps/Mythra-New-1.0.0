import { catalogMode } from "@/config/catalog-mode";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextProps,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Story } from "@/data/stories";
import { tokens, useTheme } from "@/theme";
import { browsingCover, browsingCoverWidth } from "@/theme/browsing";
import { Glass } from "./glass";
// Static assets are added by the original cover-art generation workflow.
import { coverAssets } from "@/data/cover-assets";
export function Txt({
  style,
  muted,
  title,
  ...props
}: TextProps & { muted?: boolean; title?: boolean }) {
  const { theme } = useTheme();
  return (
    <Text
      {...props}
      style={[
        {
          color: muted ? theme.muted : theme.text,
          fontSize: 15,
          lineHeight: 23,
        },
        title && { fontFamily: tokens.serif, fontSize: 28, lineHeight: 35 },
        style,
      ]}
    />
  );
}
export function Page({
  children,
  gap = tokens.space.section,
}: React.PropsWithChildren<{ gap?: number }>) {
  const { theme, id } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{
        flex: 1,
        minHeight: 0,
        overflow: "hidden",
        backgroundColor: theme.bg,
      }}
    >
      {id === "aurora" ? (
        <LinearGradient
          pointerEvents="none"
          colors={["#45244355", "#143F4F44", "#1B183F00"]}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      <ScrollView
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: tokens.gutter,
          paddingTop: 12,
          paddingBottom: 110 + insets.bottom,
          width: "100%",
          maxWidth: tokens.maxWidth,
          alignSelf: "center",
          gap,
        }}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
export function Panel({
  children,
  style,
}: React.PropsWithChildren<{ style?: ViewStyle }>) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: theme.surface,
          borderRadius: 20,
          padding: 20,
          gap: 12,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
export function Button({
  label,
  onPress,
  secondary = false,
}: {
  label: string;
  onPress: () => void;
  secondary?: boolean;
}) {
  const { theme } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: 48,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: secondary ? theme.surface : theme.accent,
        opacity: pressed ? 0.65 : 1,
      })}
    >
      <Text
        style={{
          color: secondary ? theme.text : theme.bg,
          fontSize: 15,
          fontWeight: "700",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
export function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  const { theme } = useTheme();
  return (
    <Glass
      style={{
        borderRadius: 22,
        backgroundColor: active ? theme.accent : theme.surface + "80",
        borderColor: active ? theme.accent : theme.accent + "25",
      }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: active }}
        onPress={onPress}
        style={({ pressed }) => ({
          backgroundColor: active ? theme.accent : "transparent",
          minHeight: 42,
          paddingHorizontal: 16,
          paddingVertical: 9,
          justifyContent: "center",
          opacity: pressed ? 0.65 : 1,
        })}
      >
        <Txt
          style={{
            color: active ? theme.bg : theme.text,
            fontSize: 13,
            fontWeight: active ? "700" : "500",
          }}
        >
          {label}
        </Txt>
      </Pressable>
    </Glass>
  );
}
export function Chips({
  values,
  value,
  onChange,
}: {
  values: readonly string[];
  value: string;
  onChange: (s: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8 }}
    >
      {values.map((v) => (
        <Chip
          key={v}
          label={v}
          active={value === v}
          onPress={() => onChange(v)}
        />
      ))}
    </ScrollView>
  );
}
export function Cover({
  story,
  width = browsingCover.width,
}: {
  story: Story;
  width?: number;
}) {
  const source = coverAssets[story.id];
  return (
    <View
      style={{
        width,
        aspectRatio: tokens.coverRatio,
        borderRadius: 5,
        boxShadow: "2px 5px 10px #00000030",
      }}
    >
      <LinearGradient
        colors={story.colors}
        style={{ flex: 1, borderRadius: 5, overflow: "hidden" }}
      >
        {source ? (
          <Image
            source={source}
            contentFit="cover"
            style={StyleSheet.absoluteFill}
            transition={150}
          />
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#FFE0AE55",
              margin: 8,
            }}
          >
            <Text
              style={{
                color: "#F4DDBB",
                fontFamily: tokens.serif,
                fontSize: width * 0.45,
              }}
            >
              {story.motif}
            </Text>
            <View
              style={{
                width: width * 0.55,
                height: 1,
                backgroundColor: "#D1B98E80",
              }}
            />
          </View>
        )}
        <LinearGradient
          colors={["#090712B0", "#09071205", "#09071220", "#090712DB"]}
          locations={[0, 0.45, 0.6, 1]}
          style={StyleSheet.absoluteFill}
        />
        <View
          style={{
            position: "absolute",
            top: width * 0.1,
            left: width * 0.09,
            right: width * 0.09,
          }}
        >
          <Text
            style={{
              fontFamily: tokens.serif,
              color: "#FFF5E7",
              fontSize: width * (story.title.length > 38 ? 0.12 : 0.145),
              lineHeight: width * (story.title.length > 38 ? 0.145 : 0.165),
              textAlign: "center",
              textShadowColor: "#0009",
              textShadowRadius: 4,
            }}
          >
            {story.title}
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: width * 0.08,
            left: 6,
            right: 6,
          }}
        >
          <Text
            style={{
              color: "#FFF0DA",
              fontSize: Math.max(6, width * 0.065),
              letterSpacing: 1,
              textAlign: "center",
            }}
          >
            {story.author.toUpperCase()}
          </Text>
        </View>
        <LinearGradient
          pointerEvents="none"
          colors={["#FFFFFF20", "#FFFFFF00", "#00000020", "#FFFFFF00"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 9 }}
        />
      </LinearGradient>
    </View>
  );
}
export function StoryCard({ story, width }: { story: Story; width?: number }) {
  const { width: windowWidth } = useWindowDimensions();
  const cardWidth =
    width ??
    browsingCoverWidth(
      Math.min(tokens.maxWidth, windowWidth) - tokens.gutter * 2,
    );
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${story.title}, by ${story.author}, ${story.relationship}, ${story.format}`}
      onPress={() =>
        router.push({ pathname: "/story/[id]", params: { id: story.id } })
      }
      style={({ pressed }) => ({
        width: cardWidth,
        gap: 7,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Cover story={story} width={cardWidth} />
      <Txt style={{ fontSize: 14, lineHeight: 19, fontWeight: "600" }}>
        {story.title}
      </Txt>
      <Txt muted style={{ fontSize: 11, lineHeight: 16 }}>
        {story.author}
      </Txt>
      <Txt muted style={{ fontSize: 10, lineHeight: 15 }}>
        {story.relationship} · {story.format}
      </Txt>
    </Pressable>
  );
}
export function SectionHeading({
  title,
  subtitle,
  onSeeAll,
}: {
  title: string;
  subtitle?: string;
  onSeeAll?: () => void;
}) {
  const { theme } = useTheme();
  return (
    <View style={{ gap: 4 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Txt title style={{ flex: 1, fontSize: 25, lineHeight: 31 }}>
          {title}
        </Txt>
        {onSeeAll ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`See all ${title}`}
            onPress={onSeeAll}
            hitSlop={8}
            style={{ minHeight: 44, justifyContent: "center" }}
          >
            <Txt
              style={{ fontSize: 12, fontWeight: "600", color: theme.accent }}
            >
              See All
            </Txt>
          </Pressable>
        ) : null}
      </View>
      {subtitle ? (
        <Txt muted style={{ fontSize: 12, lineHeight: 18 }}>
          {subtitle}
        </Txt>
      ) : null}
    </View>
  );
}
export function Shelf({
  title,
  subtitle,
  stories,
  collectionKey,
  twoRows = false,
  width,
}: {
  title: string;
  subtitle?: string;
  stories: Story[];
  collectionKey?: string;
  twoRows?: boolean;
  width?: number;
}) {
  if (!stories.length) return null;
  const seeAll = () =>
    router.push({
      pathname: "/collection/[key]",
      params: {
        key: collectionKey ?? "custom",
        title,
        ids: stories.map((s) => s.id).join(","),
      },
    });
  const midpoint = Math.ceil(stories.length / 2);
  const rows = [stories.slice(0, midpoint), stories.slice(midpoint)];
  return (
    <View style={{ gap: 16 }}>
      <SectionHeading title={title} subtitle={subtitle} onSeeAll={seeAll} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: browsingCover.gap, paddingBottom: 6 }}
      >
        {twoRows ? (
          <View style={{ gap: 24 }}>
            {rows.map((row, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  gap: browsingCover.gap,
                  alignItems: "flex-start",
                }}
              >
                {row.map((story) => (
                  <StoryCard key={story.id} story={story} width={width} />
                ))}
              </View>
            ))}
          </View>
        ) : (
          stories.map((s) => <StoryCard key={s.id} story={s} width={width} />)
        )}
      </ScrollView>
    </View>
  );
}
export function DemoNote() {
  if (catalogMode !== "demo") return null;
  return (
    <Txt muted style={{ fontSize: 10, lineHeight: 15, letterSpacing: 0.35 }}>
      DEMO BOOKSTORE · Fictional catalog, ratings & editorial rankings
    </Txt>
  );
}
export const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 16 },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: browsingCover.gap },
});
