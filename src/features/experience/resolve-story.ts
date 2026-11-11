import { visibleStories } from "@/services/catalog";
import { findAuthorPreview } from "@/data/author-preview";
export const resolveStory = (id?: string) =>
  visibleStories.find((story) => story.id === id) ??
  (id ? findAuthorPreview(id) : undefined);
