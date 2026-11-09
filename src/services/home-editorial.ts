import { authorPreviewBooks } from "@/data/author-preview";
import type { CatalogMode } from "@/config/catalog-mode";
import { eligibleCatalog, type DiscoveryCatalog } from "./discovery-policy";

/** Editorial selection uses publication eligibility, never ratings or engagement. */
export function homeEditorial(catalog: DiscoveryCatalog, mode: CatalogMode) {
  const records = eligibleCatalog(catalog.published, mode).published;
  const seen = new Set<string>();
  const unique = records.filter(({ story }) => {
    if (seen.has(story.id)) return false;
    seen.add(story.id);
    return true;
  });
  const creators = new Set<string>();
  const lead = unique.filter((record) => {
    if (creators.has(record.creator.id)) return false;
    creators.add(record.creator.id);
    return true;
  });
  const selected = new Set(lead.map(({ story }) => story.id));
  const authors = [
    ...lead,
    ...unique.filter(({ story }) => !selected.has(story.id)),
  ];
  return {
    next: unique.map(({ story }) => story),
    authors: authors.map(({ story }) => story),
  };
}

/** All dimensions use usable width after page gutters. Covers keep a 2:3 ratio. */
export function editorialGeometry(width: number, count = 5) {
  const available = Math.max(0, width);
  const inset = 20;
  const inner = Math.max(0, available - inset * 2);
  const cover = Math.min(132, inner / (1 + Math.max(0, count - 1) * 0.43));
  const step = cover * 0.43;
  const span = cover + Math.max(0, count - 1) * step;
  const small = Math.max(0, (available - 32) / 4);
  return {
    fanCover: cover,
    fanStep: step,
    fanLeft: (available - span) / 2,
    fanHeight: cover * 1.5 + 40,
    small,
    large: small * 2 + 8,
  };
}

export type AuthorCollection = {
  id: string;
  name: string;
  stories: import("@/data/stories").Story[];
  preview?: boolean;
};
/** Identity comes from creator.id, never display names or popularity. */
export function authorCollections(
  catalog: DiscoveryCatalog,
  mode: CatalogMode,
): AuthorCollection[] {
  const groups = new Map<string, AuthorCollection>();
  const seen = new Set<string>();
  for (const { story, creator } of eligibleCatalog(catalog.published, mode)
    .published) {
    if (seen.has(story.id)) continue;
    seen.add(story.id);
    let group = groups.get(creator.id);
    if (!group) {
      group = { id: creator.id, name: creator.name, stories: [] };
      groups.set(creator.id, group);
    }
    group.stories.push(story);
  }
  const result = [...groups.values()];
  const preview = authorPreviewBooks(mode);
  if (
    result.length &&
    preview.length &&
    !result.some((group) => group.stories.length >= 5)
  ) {
    result.unshift({
      id: "dev-elara-quill",
      name: "Elara Quill",
      stories: preview,
      preview: true,
    });
  }
  return result;
}

export function authorGeometry(width: number) {
  const gap = 8;
  // largeHeight = 2 * smallHeight + gap, with both retaining the 2:3 ratio.
  const small = Math.max(0, (width - gap * (2 + 2 / 3)) / 4);
  const large = 2 * small + (gap * 2) / 3;
  return { small, large, gap, height: large * 1.5 };
}

/** One author is one snap interval; six points of the next item remain visible. */
export function authorCarouselGeometry(availableWidth: number) {
  const itemWidth = Math.max(0, availableWidth - 18);
  const innerWidth = Math.max(0, itemWidth - 22);
  const covers = authorGeometry(innerWidth);
  return {
    itemWidth,
    innerWidth,
    interval: itemWidth + 12,
    covers,
    itemHeight: 22 + 27 + 15 + 8 + covers.height,
  };
}

/** Five stable, ordered positions. Missing books leave transparent, noninteractive slots. */
export function authorShowcaseSlots(
  stories: readonly import("@/data/stories").Story[],
  availableWidth: number,
) {
  const { covers: g } = authorCarouselGeometry(availableWidth);
  return Array.from({ length: 5 }, (_, index) => {
    const large = index === 0;
    const rightIndex = index - 1;
    const width = large ? g.large : g.small;
    return {
      story: stories[index],
      x: large ? 0 : g.large + g.gap + (rightIndex % 2) * (g.small + g.gap),
      y: large ? 0 : Math.floor(rightIndex / 2) * (g.small * 1.5 + g.gap),
      width,
      height: width * 1.5,
    };
  });
}
