# Home editorial additions

Find Your Next Read remains unchanged: its whole themed overlapping-cover banner opens the curated next-read collection. It follows Continue Reading and precedes Featured Stories.

## Books by Authors

Home uses one horizontal virtualized FlatList. Each equal-size item contains one creator heading and that creator's complete cover arrangement, inside a subtle themed box with 10-point padding. A 12-point inter-item gap and a six-point next-item preview provide a swipe cue. Native platforms use snapToInterval, fast deceleration, and interval momentum limiting. Web uses pagingEnabled for CSS snapping because react-native-web does not implement snapToInterval alone. Stable creator-ID keys preserve items; no scroll-reset effects or nested cover scrollers are used.

Every author showcase always has five fixed positions: large left, top-right left/right, bottom-right left/right. Books populate these slots in order, up to five. Missing books leave transparent, noninteractive slots with exactly the same geometry. Covers never center, resize, or rearrange based on count. All inner gaps remain eight points, and the exact 2:3 geometry aligns the large cover with both small rows. There are no captions beneath covers and no filler stories. The author heading and publication count are each one compact line, separated by four-point gaps; this removes 50 points of unused header space from every card.

See All continues to open author discovery, where readers can browse separate authors and all their works. Author-profile navigation is unavailable; names remain plain headings. Existing creator-ID grouping, launch eligibility, and development fixture gates are unchanged.

## Development fixture and eligibility

The existing catalog has no five-work author. An explicitly labeled development-only collection provides five distinct fictional stories by Elara Quill. Their covers use the existing Cover component's typographic treatment, without misattributing existing artwork. The fixture is isolated from the public catalog, Discover, other Home shelves, and Find Your Next Read. A minimal Story Details resolver addition allows only these gated preview IDs to use the existing details screen; that screen's layout is unchanged. Preview stories have no fabricated reviews or popularity.

The fixture is available only when both the effective runtime catalog mode and requested mode are demo. Release builds already force the runtime mode to production, so requesting demo mode cannot expose it. A genuinely empty eligible catalog hides the whole section, including the fixture. The fixture is also omitted if a normal eligible author already has five works.

Normal groups reapply the approved/public/mobile/published/Safe-or-Suggestive eligibility policy. Scheduled, private, unapproved, or restricted works are excluded. Production still has no backend adapter; no new backend or publishing features are implemented.

## Verification

TypeScript, Expo lint, and all 28 tests pass. Browser measurements at 320, 375, 390, and 430 points confirm equal-size showcases in a single row, equal small-cover sizes, aligned top edges, bottom-edge rounding below 0.01 CSS pixel, and no page overflow. No showcase contains a nested scroll area. Horizontal forward/backward scrolling settles on whole showcase intervals; at 375 points the measured snap offset is 321 pixels, matching item width 309 plus gap 12. Home remains vertically scrollable even when the gesture starts over the carousel.

All five fixture cover buttons and a compact next-author cover opened their correct Story Details IDs. See All opened author discovery. Tests cover 1, 2, 3, 4, 5, and 6 works at every requested width, confirming identical slot rectangles, ordered population, transparent missing positions, and geometry bounds. Browser checks compare rendered two-book and five-book cards at all four widths: all five slot rectangles and card dimensions match, empty slots have no interactive children, and the page has no horizontal overflow. Existing tests continue to check creator-ID isolation, unique works, zero catalogs, release demo suppression, and eligibility. Native touch momentum and snapping were not interactively tested in an iPhone/Android simulator this pass.

This carousel correction changes only `src/components/home/editorial.tsx`, the new geometry helper in `src/services/home-editorial.ts`, `tests/catalog.test.cjs`, and this document. Find Your Next Read, other Home sections, navigation, theme definitions, standard browsing covers, and Story Details have no additional edits in this pass. The inventory below includes the earlier uncommitted Home additions as well.

## Files changed

- `src/app/(tabs)/index.tsx`: pass creator groups to Books by Authors.
- `src/components/home/editorial.tsx`: grouped author blocks, exact grid geometry, compact fallback; Find Your Next Read unchanged.
- `src/services/home-editorial.ts`: creator-ID grouping and exact author geometry; next-read selection unchanged.
- `src/data/author-preview.ts`: isolated development-only five-book fixture.
- `src/app/home-collection.tsx`: author-discovery blocks and all works.
- `src/app/story/[id].tsx`: gated preview-ID lookup only, no layout changes.
- `tests/catalog.test.cjs`: grouping, fixture isolation, and geometry tests.
- `docs/home-editorial.md`: current behavior and limits.
