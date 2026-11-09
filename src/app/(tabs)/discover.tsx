import { useState } from "react";
import { Pressable, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Page, Txt } from "@/components/ui";
import { SearchField, StoreHeader } from "@/components/bookstore";
import { FilterSheet } from "@/components/catalog-filters";
import {
  DiscoveryFilterButton,
  DiscoveryGenres,
  DiscoveryLoadStatus,
  DiscoveryNoResults,
  DiscoveryResults,
  DiscoveryShelf,
  DiscoveryWelcome,
} from "@/components/discover/discovery";
import {
  emptyFilters,
  searchCatalog,
  type CatalogFilters,
} from "@/services/catalog";
import { buildDiscoverySections } from "@/services/discovery-policy";
import { useDiscovery } from "@/hooks/use-discovery";
import { useCatalogPreferences } from "@/state/catalog-preferences";
import { useTheme } from "@/theme";
export default function Discover() {
  const { theme } = useTheme();
  const params = useLocalSearchParams<{ search?: string; tag?: string }>();
  const { filters, setFilters, ready, storageError } = useCatalogPreferences();
  const { state, retry } = useDiscovery();
  const [panel, setPanel] = useState(false);
  const [draft, setDraft] = useState<CatalogFilters | null>(null);
  const query = params.tag || filters.query;
  const filterCount =
    filters.relationships.length +
    filters.genres.length +
    filters.formats.length +
    [
      filters.classification,
      filters.language,
      filters.status,
      filters.access,
    ].filter((value) => value !== "All").length;
  const active = !!query || filterCount > 0;
  const published =
    state.status === "ready"
      ? state.data.catalog.published.map((record) => record.story)
      : [];
  const results = searchCatalog({ ...filters, query }, published);
  const sections =
    state.status === "ready" ? buildDiscoverySections(state.data.catalog) : [];
  const clear = () => {
    setFilters(emptyFilters);
    setDraft(emptyFilters);
    if (params.tag) router.setParams({ tag: "" });
    setPanel(false);
  };
  const currentDraft = { ...(draft ?? filters), query };
  const chooseGenre = (genre: string) => {
    setFilters({ ...emptyFilters, genres: [genre] });
    setDraft(null);
    if (params.tag) router.setParams({ tag: "" });
  };
  return (
    <Page gap={24}>
      <View style={{ gap: 12 }}>
        <StoreHeader title="Discover" showSearch={false} />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View style={{ flex: 1 }}>
            <SearchField
              value={query}
              autoFocus={params.search === "1"}
              onChange={(query) => {
                if (params.tag) router.setParams({ tag: "" });
                setFilters({ ...filters, query });
              }}
            />
          </View>
          <DiscoveryFilterButton
            count={filterCount}
            onPress={() => {
              setDraft(currentDraft);
              setPanel(true);
            }}
          />
        </View>
        {active ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <Txt muted style={{ fontSize: 11, lineHeight: 18 }}>
              {filterCount
                ? `${filterCount} ${filterCount === 1 ? "filter" : "filters"} applied`
                : "Searching the bookstore"}
            </Txt>
            <Pressable
              accessibilityRole="button"
              onPress={clear}
              style={{ minHeight: 36, justifyContent: "center" }}
            >
              <Txt
                style={{ fontSize: 12, color: theme.accent, fontWeight: "600" }}
              >
                Back to bookstore
              </Txt>
            </Pressable>
          </View>
        ) : null}
        {state.status === "ready" && state.data.mode === "demo" ? (
          <Txt muted style={{ fontSize: 10, lineHeight: 15 }}>
            DEVELOPMENT CATALOG · Fictional stories and publication activity
          </Txt>
        ) : null}
      </View>
      {storageError ? (
        <Txt muted style={{ fontSize: 12 }}>
          Preferences could not be saved on this device.
        </Txt>
      ) : null}
      {!ready ? (
        <Txt muted>Loading your preferences…</Txt>
      ) : state.status !== "ready" ? (
        <>
          <DiscoveryLoadStatus state={state} onRetry={retry} />
          <DiscoveryGenres onSelect={chooseGenre} />
        </>
      ) : active ? (
        <View style={{ gap: 16 }}>
          <View style={{ gap: 4 }}>
            <Txt accessibilityRole="header" title style={{ fontSize: 28 }}>
              {query ? "Search Results" : "Filtered Stories"}
            </Txt>
            <Txt muted style={{ fontSize: 12 }}>
              {results.length} {results.length === 1 ? "story" : "stories"}
              {query ? ` for “${query}”` : ""}
            </Txt>
          </View>
          {results.length ? (
            <DiscoveryResults stories={results} />
          ) : (
            <DiscoveryNoResults onClear={clear} />
          )}
        </View>
      ) : (
        <>
          {published.length === 0 ? <DiscoveryWelcome /> : null}
          {sections
            .filter((section) => section.key === "gl" || section.key === "bl")
            .map((section) => (
              <DiscoveryShelf key={section.key} section={section} />
            ))}
          <DiscoveryGenres onSelect={chooseGenre} />
          {sections
            .filter((section) => section.key !== "gl" && section.key !== "bl")
            .map((section) => (
              <DiscoveryShelf key={section.key} section={section} />
            ))}
        </>
      )}
      <FilterSheet
        visible={panel}
        onClose={() => setPanel(false)}
        filters={currentDraft}
        onChange={setDraft}
        count={searchCatalog(currentDraft, published).length}
        onClear={clear}
        onApply={() => {
          setFilters(currentDraft);
          if (params.tag) router.setParams({ tag: "" });
          setPanel(false);
        }}
      />
    </Page>
  );
}
