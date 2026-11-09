import type { Story } from "@/data/stories";
import type { CatalogMode } from "@/config/catalog-mode";
export type DiscoveryRecord = {
  story: Story;
  source: CatalogMode;
  approved: boolean;
  visibility: "public" | "private";
  mobileEligible: boolean;
  publicationState: "published" | "scheduled" | "draft";
  publishedAt: string | null;
  publishedChapterCount: number;
  lastChapterPublishedAt: string | null;
  completedAt: string | null;
  scheduledAt: string | null;
  creator: {
    id: string;
    name: string;
    approved: boolean;
    firstPublishedAt: string | null;
  };
};
export type DiscoveryCatalog = {
  published: DiscoveryRecord[];
  upcoming: DiscoveryRecord[];
};
export type DiscoverySection = {
  key: string;
  title: string;
  subtitle: string;
  stories: Story[];
};
export const discoveryThresholds = {
  genreShelfStories: 4,
  newCreatorWindowDays: 90,
  top10Stories: 10,
  engagementStories: 10,
  uniqueReaders: 100,
  engagementEvents: 1000,
};
const date = (value: string | null) => (value ? Date.parse(value) : NaN);
export function mobileClassificationAllowed(classification: string) {
  return classification === "Safe" || classification === "Suggestive";
}
export function eligibleCatalog(
  records: readonly DiscoveryRecord[],
  mode: CatalogMode,
  now = Date.now(),
): DiscoveryCatalog {
  const eligible = records.filter(
    (record) =>
      record.source === mode &&
      record.approved &&
      record.visibility === "public" &&
      record.mobileEligible &&
      record.creator.approved &&
      mobileClassificationAllowed(record.story.classification),
  );
  return {
    published: eligible.filter(
      (record) =>
        record.publicationState === "published" &&
        record.publishedChapterCount > 0 &&
        date(record.publishedAt) <= now,
    ),
    upcoming: eligible.filter(
      (record) =>
        record.publicationState === "scheduled" &&
        date(record.scheduledAt) > now,
    ),
  };
}
export function buildDiscoverySections(
  catalog: DiscoveryCatalog,
  now = Date.now(),
  thresholds = discoveryThresholds,
): DiscoverySection[] {
  const records = catalog.published;
  const sections: DiscoverySection[] = [];
  const add = (
    key: string,
    title: string,
    subtitle: string,
    selected: DiscoveryRecord[],
  ) => {
    if (selected.length)
      sections.push({
        key,
        title,
        subtitle,
        stories: selected.map((record) => record.story),
      });
  };
  add(
    "gl",
    "Girls Love",
    "Stories of connection, courage, and love · F/F",
    records.filter((r) => r.story.relationship === "GL"),
  );
  add(
    "bl",
    "Boys Love",
    "Find your next unforgettable connection · M/M",
    records.filter((r) => r.story.relationship === "BL"),
  );
  add(
    "new",
    "Newly Published",
    "Meet the newest worlds on MYTHRA",
    [...records].sort((a, b) => date(b.publishedAt) - date(a.publishedAt)),
  );
  add(
    "updated",
    "Recently Updated",
    "A new chapter is waiting",
    records
      .filter(
        (r) =>
          date(r.lastChapterPublishedAt) > date(r.publishedAt) &&
          date(r.lastChapterPublishedAt) <= now,
      )
      .sort(
        (a, b) =>
          date(b.lastChapterPublishedAt) - date(a.lastChapterPublishedAt),
      ),
  );
  add(
    "completed",
    "Completed Stories",
    "From the first page to the very last",
    records.filter(
      (r) => r.story.status === "Complete" && date(r.completedAt) <= now,
    ),
  );
  const creatorIds = new Set<string>();
  add(
    "creators",
    "Discover New Creators",
    "Meet the voices beginning their MYTHRA journey",
    records.filter((r) => {
      const first = date(r.creator.firstPublishedAt);
      if (
        !Number.isFinite(first) ||
        first > now ||
        now - first > thresholds.newCreatorWindowDays * 86400000 ||
        creatorIds.has(r.creator.id)
      )
        return false;
      creatorIds.add(r.creator.id);
      return true;
    }),
  );
  add(
    "soon",
    "Coming Soon",
    "A first look at the worlds on the horizon",
    catalog.upcoming,
  );
  const genreGroups = [
    ["Romance", ["Romance"]],
    ["Horror", ["Horror"]],
    ["Fantasy", ["Fantasy"]],
    ["Action", ["Action"]],
    ["Mystery & Thriller", ["Mystery", "Thriller"]],
    ["Sci-Fi", ["Sci-fi"]],
    ["Slice of Life", ["Slice of Life"]],
  ] as const;
  for (const [title, genres] of genreGroups) {
    const selected = records.filter((r) =>
      genres.some((genre) => genre === r.story.genre),
    );
    if (selected.length >= Math.max(1, thresholds.genreShelfStories))
      add(
        `genre:${title}`,
        title,
        "Find a story that speaks to your imagination",
        selected,
      );
  }
  return sections;
}
/** Future capabilities only. No ranking is manufactured from local story order or fixture scores. */
export function rankingEligibility(
  catalog: DiscoveryCatalog,
  signals: {
    verified: boolean;
    rankedStoryIds: string[];
    uniqueReaders: number;
    engagementEvents: number;
  } | null,
  thresholds = discoveryThresholds,
) {
  const eligibleIds = new Set(
    catalog.published
      .filter((record) => record.source === "production")
      .map((r) => r.story.id),
  );
  const ranked = new Set(
    signals?.rankedStoryIds.filter((id) => eligibleIds.has(id)) ?? [],
  );
  const reliable =
    !!signals?.verified &&
    signals.uniqueReaders >= thresholds.uniqueReaders &&
    signals.engagementEvents >= thresholds.engagementEvents;
  return {
    top10:
      reliable &&
      eligibleIds.size >= Math.max(10, thresholds.top10Stories) &&
      ranked.size >= 10,
    popular: reliable && eligibleIds.size >= thresholds.engagementStories,
    trending: reliable && eligibleIds.size >= thresholds.engagementStories,
  };
}
export function responsiveCardWidth(
  width: number,
  layout: "carousel" | "results",
) {
  const available = Math.max(0, width);
  const gap = 16;
  const columns =
    available < 500 ? 2 : Math.max(2, Math.floor((available + gap) / 180));
  return layout === "results"
    ? Math.max(1, (available - gap * (columns - 1)) / columns)
    : Math.min(192, Math.max(112, (available - gap) / 2.12));
}
