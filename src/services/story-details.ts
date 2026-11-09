import { catalogMode } from "@/config/catalog-mode";
import { chapterTitles, Story } from "@/data/stories";
export type PreviewChapter = {
  id: string;
  edition: string;
  number: number;
  title: string;
  publishedAt: string;
  read: boolean;
  access: "Free";
};
const extraTitles = [
  "The promised city",
  "A light in the window",
  "Beyond the silver shore",
  "The returning tide",
  "A letter from home",
  "All the roads between",
  "Under an open sky",
  "What we carry forward",
  "The next beginning",
];
/** Fictional publication metadata for the layout preview; no chapter text or entitlements. */
export function getPreviewChapters(
  storyId: string,
  language = "English",
): PreviewChapter[] {
  if (catalogMode !== "demo") return [];
  return [...chapterTitles, ...extraTitles].map((title, index) => ({
    id: `${storyId}:${language}:${index + 1}`,
    edition: language,
    number: index + 1,
    title,
    publishedAt: new Date(Date.UTC(2026, 9, index + 1)).toISOString(),
    read: false,
    access: "Free",
  }));
}
export function sortChapters(chapters: PreviewChapter[], newestFirst: boolean) {
  return [...chapters].sort((a, b) =>
    newestFirst ? b.number - a.number : a.number - b.number,
  );
}
export function chapterDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
export type PreviewReview = {
  id: string;
  storyId: string;
  reader: string;
  initials: string;
  rating: number;
  spice: number | null;
  title: string;
  body: string;
};
/** Explicitly fictional, story-scoped reader feedback. Unlisted stories have no reviews. */
const reviewsByStory: Readonly<Record<string, readonly PreviewReview[]>> = {
  "moonlit-vow": [
    {
      id: "moonlit-vow:r1",
      storyId: "moonlit-vow",
      reader: "Luna Reads",
      initials: "LR",
      rating: 5,
      spice: 2,
      title: "A map worth following",
      body: "The cartographer and the runaway prince make such an interesting pair. The impossible kingdom is what drew me in; their fragile trust kept me reading.",
    },
    {
      id: "moonlit-vow:r2",
      storyId: "moonlit-vow",
      reader: "Northbound",
      initials: "N",
      rating: 4,
      spice: 1,
      title: "Promises under a silver moon",
      body: "I loved the idea of a map remembering a lost kingdom. The quieter conversations on the road were my favorite moments.",
    },
  ],
  "garden-of-us": [
    {
      id: "garden-of-us:r1",
      storyId: "garden-of-us",
      reader: "Fern & Paper",
      initials: "FP",
      rating: 5,
      spice: 0,
      title: "A gentle place to begin again",
      body: "The greenhouse feels like a character of its own. Watching these two women rebuild it together made for a wonderfully comforting read.",
    },
    {
      id: "garden-of-us:r2",
      storyId: "garden-of-us",
      reader: "Solstice Reader",
      initials: "SR",
      rating: 5,
      spice: null,
      title: "Love in the small things",
      body: "Rain, handwritten notes, and a stubborn little garden. I appreciated how much the relationship grows through ordinary acts of care.",
    },
  ],
};
export function getStoryReviews(storyId: string): readonly PreviewReview[] {
  return catalogMode === "demo" ? (reviewsByStory[storyId] ?? []) : [];
}
export function summarizeReviews(reviews: readonly PreviewReview[]) {
  const spiceRatings = reviews.flatMap((review) =>
    review.spice === null ? [] : [review.spice],
  );
  return {
    count: reviews.length,
    average: reviews.length
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : null,
    spiceCount: spiceRatings.length,
    spice: spiceRatings.length
      ? spiceRatings.reduce((sum, value) => sum + value, 0) /
        spiceRatings.length
      : null,
  };
}
export function creatorBio(story: Story) {
  return `${story.author} creates character-driven ${story.genre.toLowerCase()} stories about connection, courage, and finding a place to belong. Part of the MYTHRA preview catalog.`;
}
export function storyTags(story: Story) {
  return [
    ...new Set([
      story.genre,
      story.relationship,
      ...(story.tags ?? ["character driven", "atmospheric"]),
    ]),
  ];
}
