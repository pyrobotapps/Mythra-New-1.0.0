import { catalogMode, type CatalogMode } from "@/config/catalog-mode";
import type { Story } from "./stories";

/** Explicitly fictional, development-only books. Never added to the public catalog. */
const previewBooks: Story[] = [
  ["lantern-atlas", "The Lantern Atlas"],
  ["glass-harbor", "The Glass Harbor"],
  ["winter-observatory", "The Winter Observatory"],
  ["midnight-post", "The Midnight Post"],
  ["star-garden", "The Star Garden"],
].map(([id, title], index) => ({
  id: `author-preview-${id}`,
  title,
  author: "Elara Quill",
  relationship: "Non-romance",
  format: "Novel",
  genre: "Fantasy",
  classification: "Safe",
  colors: [
    "#57436F",
    ["#1B253B", "#263B39", "#38283A", "#2A2440", "#34402E"][index],
  ],
  motif: ["✦", "≈", "☽", "✉", "✿"][index],
  rating: 0,
  synopsis:
    "A fictional development-only story used to preview the Books by Authors layout. This is not a published work or an available reading edition.",
  languages: ["English"],
  status: "Preview",
}));
export function authorPreviewBooks(mode: CatalogMode): Story[] {
  return catalogMode === "demo" && mode === "demo" ? previewBooks : [];
}
export function findAuthorPreview(id: string | undefined) {
  return authorPreviewBooks(catalogMode).find((story) => story.id === id);
}
