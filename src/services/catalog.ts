import { stories, Story } from "@/data/stories";
export const relationships = [
  "BL",
  "GL",
  "M/F",
  "Multiple / Poly",
  "Other",
  "Non-romance",
] as const;
export const genres = [
  "Fantasy",
  "Romance",
  "Action",
  "Adventure",
  "Mystery",
  "Thriller",
  "Horror",
  "Sci-fi",
  "Slice of Life",
  "Historical",
  "Drama",
  "Comedy",
  "Supernatural",
] as const;
export const formats = ["Novel", "Toon", "Short Story"] as const;
export type CatalogFilters = {
  query: string;
  relationships: string[];
  genres: string[];
  formats: string[];
  classification: string;
  language: string;
  status: string;
  access: string;
};
export const emptyFilters: CatalogFilters = {
  query: "",
  relationships: [],
  genres: [],
  formats: [],
  classification: "All",
  language: "All",
  status: "All",
  access: "All",
};
/** This distribution's demo catalog includes no explicit material. Never treat a local toggle as an entitlement. */
export const visibleStories = stories.filter(
  (s) => s.classification !== "Pornographic" && s.classification !== "Erotica",
);
export function searchCatalog(
  filters: CatalogFilters,
  source: Story[] = visibleStories,
) {
  const q = filters.query.trim().toLocaleLowerCase();
  return source.filter((s) => {
    const haystack = [
      s.title,
      s.author,
      s.genre,
      s.relationship,
      s.relationship === "BL"
        ? "M/M"
        : s.relationship === "GL"
          ? "F/F"
          : s.relationship === "Non-romance"
            ? "No romance"
            : "",
      ...(s.tags ?? []),
      ...s.languages,
    ]
      .join(" ")
      .toLocaleLowerCase();
    return (
      (!q || haystack.includes(q)) &&
      (!filters.relationships.length ||
        filters.relationships.includes(s.relationship)) &&
      (!filters.genres.length || filters.genres.includes(s.genre)) &&
      (!filters.formats.length || filters.formats.includes(s.format)) &&
      (filters.classification === "All" ||
        s.classification === filters.classification) &&
      (filters.language === "All" || s.languages.includes(filters.language)) &&
      (filters.status === "All" || s.status === filters.status) &&
      (filters.access === "All" || (s.access ?? "Free") === filters.access)
    );
  });
}
export type Collection = {
  key: string;
  title: string;
  subtitle: string;
  ids: string[];
  layout?: "shelf" | "double" | "ranked";
};
const ids = (fn: (s: Story) => boolean) =>
  visibleStories.filter(fn).map((s) => s.id);
const all = visibleStories.map((s) => s.id);
export const collections: Collection[] = [
  {
    key: "featured",
    title: "Featured Stories",
    subtitle: "Worlds worth falling into",
    ids: all.slice(0, 8),
  },
  {
    key: "charts",
    title: "Top 10 in the US",
    subtitle: "Demo chart · Editorial order, not live analytics",
    ids: [...all].slice(0, 10),
    layout: "ranked",
  },
  {
    key: "picks",
    title: "Top Picks for You",
    subtitle: "A little wonder, a little escape · Demo picks",
    ids: [all[1], all[8], all[6], all[16], all[5]],
  },
  {
    key: "new",
    title: "New & Noteworthy",
    subtitle: "Fresh voices for your next chapter",
    ids: [...all].reverse().slice(0, 10),
    layout: "double",
  },
  {
    key: "trending",
    title: "Trending Now",
    subtitle: "The demo editorial shortlist",
    ids: all.slice(3, 11),
  },
  {
    key: "novels",
    title: "Popular Novels",
    subtitle: "Settle into another world",
    ids: ids((s) => s.format === "Novel"),
  },
  {
    key: "toons",
    title: "Popular Toons",
    subtitle: "Stories that come to life, panel by panel",
    ids: ids((s) => s.format === "Toon"),
  },
  {
    key: "shorts",
    title: "Popular Short Stories",
    subtitle: "Small escapes. Lasting impressions.",
    ids: ids((s) => s.format === "Short Story"),
  },
  {
    key: "bl",
    title: "Popular BL",
    subtitle: "Extraordinary connections · M/M",
    ids: ids((s) => s.relationship === "BL"),
  },
  {
    key: "gl",
    title: "Popular GL",
    subtitle: "Love in every shade · F/F",
    ids: ids((s) => s.relationship === "GL"),
  },
  {
    key: "mf",
    title: "M/F Romance",
    subtitle: "Meet your next favorite love story",
    ids: ids((s) => s.relationship === "M/F"),
  },
  {
    key: "completed",
    title: "Completed Stories",
    subtitle: "The whole story is waiting",
    ids: ids((s) => s.status === "Complete"),
  },
  {
    key: "updated",
    title: "Recently Updated",
    subtitle: "Demo release order · No live activity",
    ids: ids((s) => s.status === "Ongoing" && !s.comingSoon).reverse(),
  },
  {
    key: "editors",
    title: "Editor’s Picks",
    subtitle: "Chosen for the demonstration bookstore",
    ids: [all[8], all[5], all[1], all[11]],
  },
  {
    key: "gems",
    title: "Hidden Gems",
    subtitle: "Take a chance on something different",
    ids: [all[9], all[16], all[13], all[14]],
  },
  {
    key: "soon",
    title: "Coming Soon",
    subtitle: "A first look at what’s next · Demo preview",
    ids: ids((s) => !!s.comingSoon),
  },
  {
    key: "quiet",
    title: "Quiet Worlds, Big Feelings",
    subtitle: "A collection for slower evenings",
    ids: ids(
      (s) =>
        s.genre === "Slice of Life" ||
        s.genre === "Drama" ||
        s.genre === "Fantasy",
    ),
  },
];
export function collectionStories(key: string) {
  const c = collections.find((c) => c.key === key);
  return c
    ? c.ids
        .map((id) => visibleStories.find((s) => s.id === id))
        .filter((s): s is Story => !!s)
    : [];
}
export function toggleSelection(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((v) => v !== value)
    : [...values, value];
}

/** Fixed editorial preview order, not live platform analytics. */
export function chartPreview(format: string): Story[] {
  return visibleStories
    .filter((story) => story.format === format && !story.comingSoon)
    .slice(0, 5);
}
