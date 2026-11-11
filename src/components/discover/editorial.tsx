import { browsingCover } from "@/theme/browsing";
import { getStoryReviews, summarizeReviews } from "@/services/story-details";
import { Pressable, ScrollView, View } from "react-native";
import { router } from "expo-router";
import { Story } from "@/data/stories";
import { Cover, SectionHeading, StoryCard, Txt } from "@/components/ui";
import { useTheme } from "@/theme";
function openStory(story: Story) {
  router.push({ pathname: "/story/[id]", params: { id: story.id } });
}
function openCollection(title: string, stories: Story[]) {
  router.push({
    pathname: "/collection/[key]",
    params: {
      key: "custom",
      title,
      ids: stories.map((story) => story.id).join(","),
    },
  });
}
/** Side-by-side editorial spreads: the cover leads, with readable context beside it. */
export function ReleaseSpreads({ stories }: { stories: Story[] }) {
  const { theme } = useTheme();
  return (
    <View style={{ gap: 20, paddingTop: 6, paddingBottom: 8 }}>
      <SectionHeading
        title="New Releases"
        subtitle="Fresh voices. Entirely new worlds."
        onSeeAll={() => openCollection("New Releases", stories)}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 28, paddingBottom: 8 }}
      >
        {stories.slice(0, 5).map((story, index) => (
          <Pressable
            key={story.id}
            accessibilityRole="button"
            accessibilityLabel={`New release: ${story.title}`}
            onPress={() => openStory(story)}
            style={({ pressed }) => ({
              width: 310,
              flexDirection: "row",
              gap: 16,
              alignItems: "flex-start",
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Cover story={story} width={170} />
            <View style={{ flex: 1, gap: 8, paddingTop: 8 }}>
              <Txt
                style={{
                  fontSize: 9,
                  lineHeight: 15,
                  letterSpacing: 1.5,
                  color: theme.accent,
                }}
              >
                {index === 0 ? "JUST LANDED" : "NEW VOICES"}
              </Txt>
              <Txt title companion style={{ fontSize: 22, lineHeight: 28 }}>
                {story.title}
              </Txt>
              <Txt muted literary style={{ fontSize: 14, lineHeight: 18 }}>
                {story.author}
              </Txt>
              <View
                style={{
                  height: 1,
                  backgroundColor: theme.accent + "30",
                  marginVertical: 4,
                }}
              />
              <Txt
                muted
                numberOfLines={3}
                style={{ fontSize: 12, lineHeight: 19 }}
              >
                {story.synopsis}
              </Txt>
              <Txt style={{ fontSize: 11, color: theme.accent }}>
                Explore story →
              </Txt>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
export function DoubleCollection({ stories }: { stories: Story[] }) {
  const midpoint = Math.ceil(stories.length / 2);
  return (
    <View style={{ gap: 20, paddingTop: 8, paddingBottom: 16 }}>
      <SectionHeading
        title="New & Noteworthy"
        subtitle="A collection worth making room for"
        onSeeAll={() => openCollection("New & Noteworthy", stories)}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 6 }}
      >
        <View style={{ gap: 30 }}>
          {[stories.slice(0, midpoint), stories.slice(midpoint)].map(
            (row, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  gap: browsingCover.gap,
                  alignItems: "flex-start",
                }}
              >
                {row.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </View>
            ),
          )}
        </View>
      </ScrollView>
    </View>
  );
}
/** A larger leading bestseller followed by four compact entries; all rankings are editorial demo order. */
export function RankedBooks({ stories }: { stories: Story[] }) {
  const { theme } = useTheme();
  return (
    <View>
      {stories.map((story, index) => {
        const lead = index === 0;
        const rating = summarizeReviews(getStoryReviews(story.id)).average;
        return (
          <Pressable
            key={story.id}
            accessibilityRole="button"
            accessibilityLabel={`Chart rank ${index + 1}: ${story.title}`}
            onPress={() => openStory(story)}
            style={({ pressed }) => ({
              paddingVertical: lead ? 22 : 16,
              borderBottomWidth: 1,
              borderColor: theme.accent + "20",
              flexDirection: "row",
              alignItems: "center",
              gap: 14,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Txt
              title
              companion
              style={{
                width: 27,
                fontSize: lead ? 42 : 29,
                lineHeight: lead ? 48 : 36,
                color: theme.accent,
                textAlign: "center",
              }}
            >
              {index + 1}
            </Txt>
            <Cover story={story} width={lead ? 100 : 72} />
            <View style={{ flex: 1, gap: 5 }}>
              {lead ? (
                <Txt
                  style={{
                    fontSize: 9,
                    lineHeight: 15,
                    letterSpacing: 1.2,
                    color: theme.accent,
                  }}
                >
                  LEADING THE CHART
                </Txt>
              ) : null}
              <Txt
                title={lead}
                companion
                style={{
                  fontSize: lead ? 22 : 15,
                  lineHeight: lead ? 28 : 21,
                  fontWeight: lead ? "400" : "600",
                }}
              >
                {story.title}
              </Txt>
              <Txt muted literary style={{ fontSize: 14, lineHeight: 18 }}>
                {story.author}
              </Txt>
              <Txt
                style={{ fontSize: 11, lineHeight: 17, color: theme.accent }}
              >
                {rating === null ? "Not yet rated" : `★ ${rating.toFixed(1)}`}
              </Txt>
              <Txt muted style={{ fontSize: 10, lineHeight: 16 }}>
                {story.relationship} · {story.genre}
              </Txt>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
/** A quiet, magazine-style pick with a large book and a single editorial description. */
export function EditorsPick({ stories }: { stories: Story[] }) {
  const { theme } = useTheme();
  const story = stories[0];
  if (!story) return null;
  return (
    <View
      style={{
        gap: 22,
        paddingVertical: 18,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: theme.accent + "20",
      }}
    >
      <SectionHeading
        title="Editor’s Picks"
        subtitle="The stories we keep coming back to"
        onSeeAll={() => openCollection("Editor’s Picks", stories)}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Editor's pick: ${story.title}`}
        onPress={() => openStory(story)}
        style={{ flexDirection: "row", gap: 20, alignItems: "flex-start" }}
      >
        <Cover story={story} width={166} />
        <View style={{ flex: 1, gap: 9, paddingTop: 8 }}>
          <Txt
            style={{
              fontSize: 9,
              lineHeight: 15,
              letterSpacing: 1.4,
              color: theme.accent,
            }}
          >
            THE EDITOR’S NOTE
          </Txt>
          <Txt title companion style={{ fontSize: 23, lineHeight: 29 }}>
            {story.title}
          </Txt>
          <Txt muted literary style={{ fontSize: 14, lineHeight: 18 }}>
            by {story.author}
          </Txt>
          <Txt muted numberOfLines={5} style={{ fontSize: 12, lineHeight: 20 }}>
            {story.synopsis}
          </Txt>
          <Txt style={{ fontSize: 12, color: theme.accent }}>
            Take a closer look →
          </Txt>
        </View>
      </Pressable>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
      >
        {stories.slice(1).map((item) => (
          <SmallBook key={item.id} story={item} />
        ))}
      </ScrollView>
    </View>
  );
}
function SmallBook({ story }: { story: Story }) {
  const { theme } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Explore ${story.title}`}
      onPress={() => openStory(story)}
      style={{
        width: 272,
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        paddingVertical: 8,
      }}
    >
      <Cover story={story} width={66} />
      <View style={{ flex: 1, gap: 4 }}>
        <Txt style={{ fontSize: 15, lineHeight: 21, fontWeight: "600" }}>
          {story.title}
        </Txt>
        <Txt muted literary style={{ fontSize: 14, lineHeight: 18 }}>
          {story.author}
        </Txt>
        <Txt style={{ fontSize: 10, lineHeight: 16, color: theme.accent }}>
          {story.genre} · {story.format}
        </Txt>
      </View>
    </Pressable>
  );
}
export function BookListCollection({
  title,
  subtitle,
  stories,
}: {
  title: string;
  subtitle: string;
  stories: Story[];
}) {
  return (
    <View style={{ gap: 16, paddingVertical: 6 }}>
      <SectionHeading
        title={title}
        subtitle={subtitle}
        onSeeAll={() => openCollection(title, stories)}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 24 }}
      >
        {Array.from({ length: Math.ceil(stories.length / 2) }, (_, i) =>
          stories.slice(i * 2, i * 2 + 2),
        ).map((column, index) => (
          <View key={index} style={{ gap: 14 }}>
            {column.map((story) => (
              <SmallBook key={story.id} story={story} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
export function ComingSoonSpread({ stories }: { stories: Story[] }) {
  const { theme } = useTheme();
  return (
    <View style={{ gap: 22, paddingTop: 14, paddingBottom: 10 }}>
      <SectionHeading
        title="Coming Soon"
        subtitle="A first look at your next obsession"
        onSeeAll={() => openCollection("Coming Soon", stories)}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 26, paddingBottom: 8 }}
      >
        {stories.map((story) => (
          <Pressable
            key={story.id}
            accessibilityRole="button"
            accessibilityLabel={`Coming soon: ${story.title}`}
            onPress={() => openStory(story)}
            style={{
              width: 328,
              flexDirection: "row",
              gap: 20,
              alignItems: "center",
            }}
          >
            <Cover story={story} width={186} />
            <View style={{ flex: 1, gap: 10 }}>
              <Txt
                style={{
                  fontSize: 9,
                  lineHeight: 15,
                  letterSpacing: 1.4,
                  color: theme.accent,
                }}
              >
                ON THE HORIZON
              </Txt>
              <Txt title companion style={{ fontSize: 23, lineHeight: 29 }}>
                {story.title}
              </Txt>
              <Txt muted literary style={{ fontSize: 14, lineHeight: 18 }}>
                {story.author}
              </Txt>
              <Txt muted style={{ fontSize: 11, lineHeight: 18 }}>
                {story.relationship} · {story.genre}
              </Txt>
              <Txt style={{ color: theme.accent, fontSize: 12 }}>
                Preview story →
              </Txt>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
