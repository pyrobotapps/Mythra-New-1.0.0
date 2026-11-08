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
export const previewReviews = [
  {
    id: "r1",
    reader: "Luna Reads",
    initials: "LR",
    rating: 5,
    spice: 1,
    title: "A beautiful escape",
    body: "The atmosphere stayed with me long after I put it down. I loved the small moments between the characters.",
  },
  {
    id: "r2",
    reader: "Page Wanderer",
    initials: "PW",
    rating: 4,
    spice: 2,
    title: "Stayed for the storytelling",
    body: "Thoughtful world-building and a voice that makes even quiet scenes feel alive. Looking forward to more.",
  },
  {
    id: "r3",
    reader: "River",
    initials: "R",
    rating: 5,
    spice: 1,
    title: "One more chapter",
    body: "A lovely balance of wonder and heart. The kind of story I want to share with a friend.",
  },
];
export const reviewSummary = {
  average:
    previewReviews.reduce((n, r) => n + r.rating, 0) / previewReviews.length,
  count: previewReviews.length,
  spice:
    previewReviews.reduce((n, r) => n + r.spice, 0) / previewReviews.length,
};
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
