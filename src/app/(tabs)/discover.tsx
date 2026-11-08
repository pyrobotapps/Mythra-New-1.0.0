import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  Button,
  Chip,
  Page,
  SectionHeading,
  Shelf,
  StoryCard,
  Txt,
  styles,
} from "@/components/ui";
import { ChartRow, SearchField, StoreHeader } from "@/components/bookstore";
import {
  ChartSegments,
  GenreCollections,
  RelationshipCollections,
} from "@/components/discover/collections";
import { FilterSheet } from "@/components/catalog-filters";
import { IconButton } from "@/components/glass";
import {
  collectionStories,
  emptyFilters,
  genres,
  searchCatalog,
  toggleSelection,
  visibleStories,
} from "@/services/catalog";
import { useCatalogPreferences } from "@/state/catalog-preferences";
import { useTheme } from "@/theme";
const relationshipFilters = [
  { label: "BL", values: ["BL"] },
  { label: "GL", values: ["GL"] },
  { label: "M/F", values: ["M/F"] },
  { label: "Other", values: ["Other", "Multiple / Poly"] },
  { label: "No Romance", values: ["Non-romance"] },
];
export default function Discover() {
  const { theme } = useTheme();
  const params = useLocalSearchParams<{ search?: string; tag?: string }>();
  const { filters, setFilters, storageError } = useCatalogPreferences();
  const [sheet, setSheet] = useState(false);
  const [chartFormat, setChartFormat] = useState("Novel");
  const query = params.tag || filters.query;
  const active = !!(
    query ||
    filters.formats.length ||
    filters.genres.length ||
    filters.relationships.length ||
    filters.classification !== "All" ||
    filters.language !== "All" ||
    filters.status !== "All" ||
    filters.access !== "All"
  );
  const results = searchCatalog({ ...filters, query });
  const clear = () => {
    setFilters(emptyFilters);
    if (params.tag) router.setParams({ tag: "" });
  };
  const released = visibleStories.filter((s) => !s.comingSoon);
  const releases = [...released].reverse().slice(0, 8);
  const noteworthy = collectionStories("new").filter((s) => !s.comingSoon);
  const top = collectionStories(
    chartFormat === "Novel"
      ? "novels"
      : chartFormat === "Toon"
        ? "toons"
        : "shorts",
  )
    .filter((s) => !s.comingSoon)
    .slice(0, 3);
  return (
    <Page gap={28}>
      <View style={{ gap: 12 }}>
        <StoreHeader title="Discover" />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View style={{ flex: 1 }}>
            <SearchField
              value={query}
              autoFocus={params.search === "1"}
              onChange={(value) => {
                if (params.tag) router.setParams({ tag: "" });
                setFilters({ ...filters, query: value });
              }}
            />
          </View>
          <IconButton
            name="filter"
            label="Open advanced filters"
            onPress={() => setSheet(true)}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 7 }}
        >
          <Chip
            label="All genres"
            active={!filters.genres.length}
            onPress={() => setFilters({ ...filters, genres: [] })}
          />
          {genres.map((genre) => (
            <Chip
              key={genre}
              label={genre}
              active={filters.genres.includes(genre)}
              onPress={() =>
                setFilters({
                  ...filters,
                  genres: toggleSelection(filters.genres, genre),
                })
              }
            />
          ))}
        </ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 7 }}
        >
          <Chip
            label="All relationships"
            active={!filters.relationships.length}
            onPress={() => setFilters({ ...filters, relationships: [] })}
          />
          {relationshipFilters.map((item) => (
            <Chip
              key={item.label}
              label={item.label}
              active={item.values.every((v) =>
                filters.relationships.includes(v),
              )}
              onPress={() => {
                const selected = item.values.every((v) =>
                  filters.relationships.includes(v),
                );
                setFilters({
                  ...filters,
                  relationships: selected
                    ? filters.relationships.filter(
                        (v) => !item.values.includes(v),
                      )
                    : [...new Set([...filters.relationships, ...item.values])],
                });
              }}
            />
          ))}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <Txt muted style={{ fontSize: 10, lineHeight: 16 }}>
            Preview catalog · Fictional stories & editorial rankings
          </Txt>
          {active ? (
            <Pressable
              accessibilityRole="button"
              onPress={clear}
              hitSlop={8}
              style={{ minHeight: 32, justifyContent: "center" }}
            >
              <Txt style={{ color: theme.accent, fontSize: 11 }}>Reset</Txt>
            </Pressable>
          ) : null}
        </View>
      </View>
      {storageError ? (
        <Txt muted style={{ fontSize: 12 }}>
          Preferences could not be saved on this device.
        </Txt>
      ) : null}
      {active ? (
        <View style={{ gap: 18 }}>
          <SectionHeading
            title={query ? "Search Results" : "Your Selection"}
            subtitle={`${results.length} ${results.length === 1 ? "story" : "stories"}`}
            onSeeAll={() =>
              router.push({
                pathname: "/collection/[key]",
                params: {
                  key: "custom",
                  title: "Discover results",
                  ids: results.map((s) => s.id).join(","),
                },
              })
            }
          />
          {results.length ? (
            <View style={styles.wrap}>
              {results.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </View>
          ) : (
            <View style={{ paddingVertical: 16, gap: 12 }}>
              <Txt title style={{ fontSize: 23 }}>
                A different path awaits.
              </Txt>
              <Txt muted>No stories match this selection.</Txt>
              <Button secondary label="Browse all stories" onPress={clear} />
            </View>
          )}
        </View>
      ) : (
        <>
          <Shelf
            title="New Releases"
            subtitle="Fresh voices. New worlds. Your next chapter."
            stories={releases}
            width={154}
          />
          <Shelf
            title="New & Noteworthy"
            subtitle="A few stories we think you’ll love"
            stories={noteworthy}
            twoRows
            width={136}
          />
          <View style={{ gap: 14 }}>
            <SectionHeading
              title="Top Charts"
              subtitle="The US editorial preview chart"
              onSeeAll={() => router.push("/rankings")}
            />
            <ChartSegments value={chartFormat} onChange={setChartFormat} />
            <View>
              {top.map((story, index) => (
                <ChartRow
                  key={story.id}
                  story={story}
                  rank={index + 1}
                  sampleLabel={false}
                />
              ))}
            </View>
          </View>
          <Shelf
            title="Trending Now"
            subtitle="Stories to get lost in"
            stories={collectionStories("trending").filter((s) => !s.comingSoon)}
            collectionKey="trending"
          />
          <GenreCollections />
          <RelationshipCollections />
          <Shelf
            title="Coming Soon"
            subtitle="A first look at your next obsession"
            stories={collectionStories("soon")}
            collectionKey="soon"
            width={172}
          />
          <Shelf
            title="Hidden Gems"
            subtitle="Something unexpected, something unforgettable"
            stories={collectionStories("gems")}
            collectionKey="gems"
          />
          <Shelf
            title="Editor’s Picks"
            subtitle="Handpicked for a little escape"
            stories={collectionStories("editors")}
            collectionKey="editors"
            width={154}
          />
          <Shelf
            title="Completed Stories"
            subtitle="The whole story is waiting"
            stories={collectionStories("completed")}
            collectionKey="completed"
          />
          <Shelf
            title="Popular in Your Language"
            subtitle="English editions · Curated preview selection"
            stories={collectionStories("picks").filter((s) =>
              s.languages.includes("English"),
            )}
          />
        </>
      )}
      <FilterSheet
        visible={sheet}
        onClose={() => setSheet(false)}
        filters={filters}
        onChange={setFilters}
        count={results.length}
      />
    </Page>
  );
}
