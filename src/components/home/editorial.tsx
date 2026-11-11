import { inkSurfaces } from "@/theme/visual";
import { browsingCoverWidth } from "@/theme/browsing";
import { useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  View,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import type { Story } from "@/data/stories";
import {
  authorCarouselGeometry,
  authorShowcaseSlots,
  authorGeometry,
  type AuthorCollection,
  editorialGeometry,
} from "@/services/home-editorial";
import { Cover, SectionHeading, Txt } from "@/components/ui";
import { tokens, useTheme } from "@/theme";

function openStory(story: Story) {
  router.push({ pathname: "/story/[id]", params: { id: story.id } });
}
function openCollection(section: "next" | "authors") {
  router.push({ pathname: "/home-collection", params: { section } });
}
function useEditorialWidth() {
  const { width } = useWindowDimensions();
  const [measured, setMeasured] = useState<number>();
  return {
    width: measured ?? Math.min(width, tokens.maxWidth) - tokens.gutter * 2,
    onLayout: (event: { nativeEvent: { layout: { width: number } } }) =>
      setMeasured(event.nativeEvent.layout.width),
  };
}
const shadow = {
  shadowColor: "#000000",
  shadowOpacity: 0.22,
  shadowRadius: 9,
  shadowOffset: { width: 0, height: 6 },
  elevation: 5,
};

export function NextRead({ stories }: { stories: Story[] }) {
  const { theme } = useTheme();
  const { width, onLayout } = useEditorialWidth();
  const books = stories.slice(0, 5);
  const geometry = editorialGeometry(width, books.length);
  if (!books.length) return null;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Find Your Next Read, open curated collection"
      onPress={() => openCollection("next")}
      onLayout={onLayout}
      style={({ pressed }) => ({
        borderRadius: tokens.radii.editorial,
        opacity: pressed ? 0.9 : 1,
      })}
    >
      <LinearGradient
        colors={inkSurfaces(theme).editorialGradient}
        style={{
          borderRadius: tokens.radii.editorial,
          paddingTop: 24,
          gap: 20,
        }}
      >
        <View style={{ paddingHorizontal: 20, gap: 10 }}>
          <Txt title style={{ fontSize: 32, lineHeight: 40 }}>
            Find Your Next Read
          </Txt>
          <Txt muted style={{ fontSize: 13, lineHeight: 21 }}>
            Discover new worlds, unforgettable characters, and stories worth
            staying up for.
          </Txt>
          <Txt style={{ fontSize: 12, color: theme.accent, fontWeight: "600" }}>
            Explore the collection →
          </Txt>
        </View>
        <View pointerEvents="none" style={{ height: geometry.fanHeight }}>
          {books.map((story, index) => {
            const distance = Math.abs(index - (books.length - 1) / 2);
            return (
              <View
                key={story.id}
                style={{
                  position: "absolute",
                  left: geometry.fanLeft + geometry.fanStep * index,
                  top: 8 + distance * 9,
                  zIndex: books.length - Math.round(distance * 2),
                  ...shadow,
                }}
              >
                <Cover story={story} width={geometry.fanCover} />
              </View>
            );
          })}
        </View>
      </LinearGradient>
    </Pressable>
  );
}

/** No author-profile route exists yet, so headings remain honest text labels. */
export function AuthorBlocks({
  collections,
  showAllWorks = false,
}: {
  collections: AuthorCollection[];
  showAllWorks?: boolean;
}) {
  const { width, onLayout } = useEditorialWidth();
  const geometry = authorGeometry(width);
  const book = (story: Story, coverWidth: number) => (
    <Pressable
      key={story.id}
      accessibilityRole="button"
      accessibilityLabel={`Open ${story.title} by ${story.author}`}
      onPress={() => openStory(story)}
      style={({ pressed }) => ({
        width: coverWidth,
        opacity: pressed ? 0.75 : 1,
      })}
    >
      <View style={shadow}>
        <Cover story={story} width={coverWidth} />
      </View>
    </Pressable>
  );
  return (
    <View onLayout={onLayout} style={{ gap: 28 }}>
      {collections.map((collection) => {
        const books = collection.stories.slice(0, 5);
        return (
          <View key={collection.id} style={{ gap: 12 }}>
            <Txt title style={{ fontSize: 21, lineHeight: 27 }}>
              {collection.name}
            </Txt>
            {collection.preview ? (
              <Txt muted style={{ fontSize: 11, lineHeight: 17 }}>
                DEVELOPMENT PREVIEW · Five fictional books by one fictional
                author
              </Txt>
            ) : null}
            {books.length >= 5 ? (
              <View
                testID={`author-grid-${collection.id}`}
                style={{ flexDirection: "row", gap: geometry.gap }}
              >
                {book(books[0], geometry.large)}
                <View style={{ gap: geometry.gap }}>
                  {[books.slice(1, 3), books.slice(3, 5)].map((row, index) => (
                    <View
                      key={index}
                      style={{ flexDirection: "row", gap: geometry.gap }}
                    >
                      {row.map((story) => book(story, geometry.small))}
                    </View>
                  ))}
                </View>
              </View>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12, paddingBottom: 8 }}
              >
                {books.map((story) => book(story, browsingCoverWidth(width)))}
              </ScrollView>
            )}
            {showAllWorks && collection.stories.length > 5 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12, paddingBottom: 8 }}
              >
                {collection.stories
                  .slice(5)
                  .map((story) => book(story, browsingCoverWidth(width)))}
              </ScrollView>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}
function AuthorShowcase({
  collection,
  width,
}: {
  collection: AuthorCollection;
  width: number;
}) {
  const { theme } = useTheme();
  const layout = authorCarouselGeometry(width);
  const g = layout.covers;
  const slots = authorShowcaseSlots(collection.stories, width);
  const book = (story: Story, coverWidth: number) => (
    <Pressable
      key={story.id}
      accessibilityRole="button"
      accessibilityLabel={`Open ${story.title} by ${story.author}`}
      onPress={() => openStory(story)}
      style={({ pressed }) => ({
        width: coverWidth,
        opacity: pressed ? 0.75 : 1,
      })}
    >
      <View style={shadow}>
        <Cover story={story} width={coverWidth} />
      </View>
    </Pressable>
  );
  return (
    <View
      testID={`author-showcase-${collection.id}`}
      style={{
        width: layout.itemWidth,
        height: layout.itemHeight,
        padding: 10,
        borderWidth: 1,
        borderColor: inkSurfaces(theme).border,
        borderRadius: tokens.radii.card,
        backgroundColor: theme.surface + "60",
        gap: 4,
      }}
    >
      <Txt
        title
        numberOfLines={1}
        style={{ fontSize: 21, lineHeight: 27, height: 27 }}
      >
        {collection.name}
      </Txt>
      <Txt
        muted
        numberOfLines={1}
        style={{ fontSize: 10, lineHeight: 15, height: 15 }}
      >
        {collection.preview
          ? "DEVELOPMENT PREVIEW · 5 fictional works"
          : `${collection.stories.length} ${collection.stories.length === 1 ? "published work" : "published works"}`}
      </Txt>
      <View
        testID={`author-carousel-grid-${collection.id}`}
        style={{ height: g.height, width: layout.innerWidth }}
      >
        {slots.map((slot, index) => (
          <View
            key={index}
            testID={`author-slot-${collection.id}-${index + 1}`}
            pointerEvents={slot.story ? "auto" : "none"}
            style={{
              position: "absolute",
              left: slot.x,
              top: slot.y,
              width: slot.width,
              height: slot.height,
            }}
          >
            {slot.story ? book(slot.story, slot.width) : null}
          </View>
        ))}
      </View>
    </View>
  );
}
function AuthorSeparator() {
  return <View style={{ width: 12 }} />;
}
export function BooksByAuthors({
  collections,
}: {
  collections: AuthorCollection[];
}) {
  const { width, onLayout } = useEditorialWidth();
  const layout = authorCarouselGeometry(width);
  if (!collections.length) return null;
  return (
    <View onLayout={onLayout} style={{ gap: 16 }}>
      <SectionHeading
        title="Books by Authors"
        subtitle="Meet the voices behind your next story"
        onSeeAll={() => openCollection("authors")}
      />
      <FlatList
        testID="authors-carousel"
        accessibilityLabel="Author showcases"
        horizontal
        data={collections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AuthorShowcase collection={item} width={width} />
        )}
        ItemSeparatorComponent={AuthorSeparator}
        getItemLayout={(_, index) => ({
          length: layout.interval,
          offset: layout.interval * index,
          index,
        })}
        pagingEnabled={Platform.OS === "web"}
        snapToInterval={layout.interval}
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum
        showsHorizontalScrollIndicator={false}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        style={{ flexGrow: 0, height: layout.itemHeight + 8 }}
        contentContainerStyle={{ paddingRight: 18, paddingBottom: 8 }}
      />
    </View>
  );
}
