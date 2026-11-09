import { stories } from "@/data/stories";
import {
  catalogMode,
  demoScenario,
  type CatalogMode,
} from "@/config/catalog-mode";
import {
  eligibleCatalog,
  type DiscoveryRecord,
  type DiscoveryCatalog,
} from "./discovery-policy";
export type DiscoveryLoadResult = {
  mode: CatalogMode;
  catalog: DiscoveryCatalog;
};
export function demoDiscoveryRecords(now = Date.now()): DiscoveryRecord[] {
  return stories.map((story, index) => {
    const publishedAt = new Date(now - (30 - index) * 86400000).toISOString();
    return {
      story,
      source: "demo",
      approved: true,
      visibility: "public",
      mobileEligible: true,
      publicationState: story.comingSoon ? "scheduled" : "published",
      publishedAt: story.comingSoon ? null : publishedAt,
      publishedChapterCount: story.comingSoon ? 0 : 15,
      lastChapterPublishedAt:
        story.status === "Ongoing" && !story.comingSoon
          ? new Date(now - (index % 5) * 86400000).toISOString()
          : null,
      completedAt:
        story.status === "Complete"
          ? new Date(now - 86400000).toISOString()
          : null,
      scheduledAt: story.comingSoon
        ? new Date(now + 7 * 86400000).toISOString()
        : null,
      creator: {
        id: story.author,
        name: story.author,
        approved: true,
        firstPublishedAt: publishedAt,
      },
    };
  });
}
/** A future adapter must return genuine server-approved records. An absent/failing adapter is an error, never an empty catalog or a demo fallback. */
export function createDiscoveryLoader(options: {
  mode: CatalogMode;
  scenario?: string;
  loadPublished?: () => Promise<readonly DiscoveryRecord[]>;
  now?: () => number;
}) {
  return async (): Promise<DiscoveryLoadResult> => {
    const now = options.now?.() ?? Date.now();
    if (options.mode === "production") {
      if (!options.loadPublished)
        throw new Error(
          "Published discovery is not connected yet. Please try again later.",
        );
      const records = await options.loadPublished();
      return {
        mode: "production",
        catalog: eligibleCatalog(records, "production", now),
      };
    }
    if (options.scenario === "error")
      throw new Error(
        "The demonstration catalog could not be loaded. Try again.",
      );
    let records = demoDiscoveryRecords(now);
    if (options.scenario === "empty") records = [];
    if (options.scenario === "gl-only")
      records = records.filter((r) => r.story.relationship === "GL");
    if (options.scenario === "bl-only")
      records = records.filter((r) => r.story.relationship === "BL");
    return { mode: "demo", catalog: eligibleCatalog(records, "demo", now) };
  };
}
export const loadDiscoveryCatalog = createDiscoveryLoader({
  mode: catalogMode,
  scenario: demoScenario,
});
