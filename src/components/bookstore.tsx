import { Pressable, ScrollView, TextInput, View } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Story } from "@/data/stories";
import { tokens, useTheme } from "@/theme";
import { Cover, SectionHeading, Txt, styles } from "./ui";
import { Glass, IconButton } from "./glass";
import { Icon } from "./icon";
export function StoreHeader({
  title,
  showSearch = true,
}: {
  title?: string;
  showSearch?: boolean;
}) {
  const { theme } = useTheme();
  return (
    <View style={[styles.row, { justifyContent: "space-between" }]}>
      <View style={{ flex: 1, gap: 2 }}>
        <Txt
          style={{
            fontFamily: tokens.serif,
            fontSize: 25,
            lineHeight: 30,
            letterSpacing: 3,
            color: theme.text,
          }}
        >
          MYTHRA
        </Txt>
        <Txt muted style={{ fontSize: 11, lineHeight: 16 }}>
          {title ?? "Stories without limits"}
        </Txt>
      </View>
      <View style={{ flexDirection: "row", gap: 8 }}>
        {showSearch ? (
          <>
            <IconButton
              name="search"
              label="Search bookstore"
              onPress={() =>
                router.navigate({
                  pathname: "/discover",
                  params: { search: "1" },
                })
              }
            />
          </>
        ) : null}
        <IconButton
          name="bell"
          label="Open notifications"
          onPress={() => router.push("/notifications")}
        />
      </View>
    </View>
  );
}
export function SearchField({
  value,
  onChange,
  autoFocus = false,
}: {
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
}) {
  const { theme } = useTheme();
  return (
    <Glass>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          gap: 10,
        }}
      >
        <Icon name="search" color={theme.muted} size={19} />
        <TextInput
          accessibilityLabel="Search title, author, genre, tags, relationship, language"
          value={value}
          onChangeText={onChange}
          autoFocus={autoFocus}
          placeholder="Stories, creators, genres, languages…"
          placeholderTextColor={theme.muted}
          autoCorrect={false}
          returnKeyType="search"
          style={{
            flex: 1,
            paddingVertical: 16,
            color: theme.text,
            fontSize: 14,
            minHeight: 52,
          }}
        />
        {value ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            onPress={() => onChange("")}
            style={{
              minWidth: 32,
              minHeight: 44,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="close" size={15} color={theme.muted} />
          </Pressable>
        ) : null}
      </View>
    </Glass>
  );
}
export function ChartRow({
  story,
  rank,
  sampleLabel = true,
}: {
  story: Story;
  rank: number;
  sampleLabel?: boolean;
}) {
  const { theme } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Demo rank ${rank}: ${story.title}`}
      onPress={() =>
        router.push({ pathname: "/story/[id]", params: { id: story.id } })
      }
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        minHeight: 112,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: theme.accent + "18",
      }}
    >
      <Txt
        title
        style={{
          width: 28,
          fontSize: 28,
          color: theme.accent,
          textAlign: "center",
        }}
      >
        {rank}
      </Txt>
      <Cover story={story} width={58} />
      <View style={{ flex: 1, gap: 3 }}>
        <Txt style={{ fontSize: 14, lineHeight: 20, fontWeight: "600" }}>
          {story.title}
        </Txt>
        <Txt muted style={{ fontSize: 12, lineHeight: 18 }}>
          {story.author}
        </Txt>
        <Txt muted style={{ fontSize: 11, lineHeight: 17 }}>
          ★ {story.rating.toFixed(1)}
          {sampleLabel ? " sample" : ""} · {story.format}
        </Txt>
      </View>
    </Pressable>
  );
}
export function ChartShelf({ stories }: { stories: Story[] }) {
  if (!stories.length) return null;
  const pages = Array.from({ length: Math.ceil(stories.length / 3) }, (_, i) =>
    stories.slice(i * 3, i * 3 + 3),
  );
  return (
    <View style={{ gap: 12 }}>
      <SectionHeading
        title="Top 10 in the US"
        subtitle="Demo chart · Editorial order, not live analytics"
        onSeeAll={() => router.push("/rankings")}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
      >
        {pages.map((page, i) => (
          <View key={i} style={{ width: 294 }}>
            {page.map((s, j) => (
              <ChartRow key={s.id} story={s} rank={i * 3 + j + 1} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
export function EditorialFeature({ story }: { story: Story | undefined }) {
  const { theme, id } = useTheme();
  if (!story) return null;
  return (
    <View style={{ gap: 14 }}>
      <SectionHeading
        title="Featured Stories"
        onSeeAll={() => router.push("/collection/featured")}
      />
      <LinearGradient
        colors={
          id === "aurora" ? ["#684062", "#24495C"] : [theme.surface, theme.bg]
        }
        style={{
          borderRadius: 18,
          padding: 18,
          flexDirection: "row",
          gap: 18,
          borderWidth: 1,
          borderColor: theme.accent + "20",
        }}
      >
        <View style={{ flex: 1, justifyContent: "center", gap: 8 }}>
          <Txt
            style={{
              color: theme.accent,
              letterSpacing: 1.7,
              fontSize: 9,
              lineHeight: 14,
            }}
          >
            THE EDITOR’S SPOTLIGHT
          </Txt>
          <Txt title style={{ fontSize: 24, lineHeight: 29 }}>
            {story.title}
          </Txt>
          <Txt muted style={{ fontSize: 12, lineHeight: 18 }}>
            A stolen name. A silver moon. A promise worth keeping.
          </Txt>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/story/moonlit-vow")}
            style={{ minHeight: 44, justifyContent: "center" }}
          >
            <Txt
              style={{ color: theme.accent, fontSize: 12, fontWeight: "700" }}
            >
              Explore story →
            </Txt>
          </Pressable>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Open ${story.title}`}
          onPress={() => router.push("/story/moonlit-vow")}
        >
          <Cover story={story} width={108} />
        </Pressable>
      </LinearGradient>
    </View>
  );
}
