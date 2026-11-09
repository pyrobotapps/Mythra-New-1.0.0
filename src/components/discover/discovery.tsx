import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  View,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { genres } from "@/services/catalog";
import { type Story } from "@/data/stories";
import {
  responsiveCardWidth,
  type DiscoverySection,
} from "@/services/discovery-policy";
import { type DiscoveryState } from "@/hooks/use-discovery";
import { useTheme, tokens } from "@/theme";
import { Button, SectionHeading, StoryCard, Txt } from "@/components/ui";
import { Glass } from "@/components/glass";
import { Icon } from "@/components/icon";
import { Sheet } from "@/components/story/controls";
export function DiscoveryFilterButton({
  count,
  onPress,
}: {
  count: number;
  onPress: () => void;
}) {
  const { theme } = useTheme();
  return (
    <Glass style={{ borderRadius: 24 }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          count ? `Open filters, ${count} active` : "Open filters"
        }
        onPress={onPress}
        style={{
          width: 46,
          height: 48,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name="filter" color={theme.text} size={20} />
        {count ? (
          <View
            style={{
              position: "absolute",
              right: 8,
              top: 8,
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: theme.accent,
            }}
          />
        ) : null}
      </Pressable>
    </Glass>
  );
}
export function DiscoveryShelf({ section }: { section: DiscoverySection }) {
  const { width: windowWidth } = useWindowDimensions();
  const [width, setWidth] = useState(
    Math.min(tokens.maxWidth, windowWidth) - tokens.gutter * 2,
  );
  if (!section.stories.length) return null;
  const cardWidth = responsiveCardWidth(width, "carousel");
  return (
    <View
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      style={{ gap: 14 }}
    >
      <SectionHeading
        title={section.title}
        subtitle={section.subtitle}
        onSeeAll={() =>
          router.push({
            pathname: "/discovery-collection",
            params: { section: section.key },
          })
        }
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 16, paddingBottom: 5 }}
      >
        {section.stories.slice(0, 12).map((story) => (
          <StoryCard key={story.id} story={story} width={cardWidth} />
        ))}
      </ScrollView>
    </View>
  );
}
export function DiscoveryResults({ stories }: { stories: Story[] }) {
  const { width: windowWidth } = useWindowDimensions();
  const [width, setWidth] = useState(
    Math.min(tokens.maxWidth, windowWidth) - tokens.gutter * 2,
  );
  const cardWidth = responsiveCardWidth(width, "results");
  return (
    <View
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}
    >
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} width={cardWidth} />
      ))}
    </View>
  );
}
export function DiscoveryGenres({
  onSelect,
}: {
  onSelect: (genre: string) => void;
}) {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const choose = (genre: string) => {
    setExpanded(false);
    onSelect(genre);
  };
  const tile = (genre: string) => (
    <Pressable
      key={genre}
      accessibilityRole="button"
      accessibilityLabel={`Browse ${genre === "Sci-fi" ? "Sci-Fi" : genre}`}
      onPress={() => choose(genre)}
      style={{ width: 150, height: 72, borderRadius: 12, overflow: "hidden" }}
    >
      <LinearGradient
        colors={[theme.surface, theme.accent + "25"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, padding: 14, justifyContent: "space-between" }}
      >
        <Txt style={{ fontSize: 14, fontWeight: "600" }}>
          {genre === "Sci-fi" ? "Sci-Fi" : genre}
        </Txt>
        <Txt style={{ fontSize: 10, lineHeight: 13, color: theme.accent }}>
          Explore →
        </Txt>
      </LinearGradient>
    </Pressable>
  );
  return (
    <View style={{ gap: 14 }}>
      <SectionHeading
        title="Browse by Genre"
        subtitle="Find a world that feels like yours"
        onSeeAll={() => setExpanded(true)}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
      >
        {Array.from({ length: Math.ceil(genres.length / 2) }, (_, index) => (
          <View key={index} style={{ gap: 12 }}>
            {genres.slice(index * 2, index * 2 + 2).map(tile)}
          </View>
        ))}
      </ScrollView>
      <Sheet
        title="Browse by Genre"
        visible={expanded}
        onClose={() => setExpanded(false)}
      >
        <View style={{ gap: 6 }}>
          {genres.map((genre) => (
            <Pressable
              key={genre}
              accessibilityRole="button"
              onPress={() => choose(genre)}
              style={{
                minHeight: 46,
                justifyContent: "center",
                borderBottomWidth: 1,
                borderColor: theme.accent + "18",
              }}
            >
              <Txt>{genre === "Sci-fi" ? "Sci-Fi" : genre}</Txt>
            </Pressable>
          ))}
        </View>
      </Sheet>
    </View>
  );
}
export function DiscoveryWelcome() {
  const { theme } = useTheme();
  return (
    <View
      style={{
        paddingVertical: 20,
        gap: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: theme.accent + "20",
      }}
    >
      <Txt style={{ fontSize: 10, letterSpacing: 2, color: theme.accent }}>
        WELCOME TO MYTHRA
      </Txt>
      <Txt title style={{ fontSize: 30, lineHeight: 38 }}>
        Every great story starts somewhere.
      </Txt>
      <Txt muted style={{ fontSize: 14, lineHeight: 24 }}>
        MYTHRA is just beginning its journey. Be among the first to discover new
        worlds, meet emerging creators, and share stories worth remembering.
      </Txt>
      <View style={{ alignSelf: "flex-start" }}>
        <Button
          label="Become a creator"
          onPress={() => router.push("/create")}
        />
      </View>
      <Txt muted style={{ fontSize: 11, lineHeight: 18 }}>
        Explore the Creator Studio preview. Publishing is not available yet.
      </Txt>
    </View>
  );
}
export function DiscoveryNoResults({ onClear }: { onClear: () => void }) {
  return (
    <View style={{ paddingVertical: 24, gap: 12 }}>
      <Txt title style={{ fontSize: 26 }}>
        A story is waiting to find you.
      </Txt>
      <Txt muted style={{ fontSize: 14, lineHeight: 23 }}>
        Nothing matches this search just yet. Try another title, creator, or set
        of filters.
      </Txt>
      <Button secondary label="Back to bookstore" onPress={onClear} />
    </View>
  );
}
export function DiscoveryLoadStatus({
  state,
  onRetry,
}: {
  state: Exclude<DiscoveryState, { status: "ready" }>;
  onRetry: () => void;
}) {
  const { theme } = useTheme();
  return state.status === "loading" ? (
    <View style={{ paddingVertical: 40, gap: 16, alignItems: "center" }}>
      <ActivityIndicator color={theme.accent} />
      <Txt muted>Opening the bookstore…</Txt>
    </View>
  ) : (
    <View style={{ gap: 14, paddingVertical: 20 }}>
      <Txt title style={{ fontSize: 26 }}>
        We couldn’t open the bookstore.
      </Txt>
      <Txt muted style={{ fontSize: 14, lineHeight: 23 }}>
        {state.message}
      </Txt>
      <Button label="Try Again" onPress={onRetry} />
    </View>
  );
}
