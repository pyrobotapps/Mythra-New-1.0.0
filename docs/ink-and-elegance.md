# MYTHRA — Final typography and visual polish

## Final font roles

**Cormorant Infant SemiBold (600)** is MYTHRA's primary visual face: branding, page titles, section headings, featured collections, author showcases, prominent editorial copy, and author names. Section headings remain 30 points with 38-point line height; the next-read editorial heading is 32/40 to fit comfortably on standard iPhones. The existing five-slot author heading remains 21/27, preserving its exact geometry. Browsing-card creator names use a readable 14/18 treatment.

**Dancing Script SemiBold (600)** is a restrained, explicit accent. Its only current UI use is Home's decorative “Stories without limits” tagline. It is not the default for titles or headings. **System sans-serif** remains the companion for small labels, metadata, buttons, navigation, search/filter controls, descriptions, and longer reading text. Existing cover artwork and its lettering are preserved.

Fraunces and Allura are not part of the app's typography plan or runtime dependencies. The earlier comparison is a separate review specimen, not an application feature.

## Expo loading and fallback

Both chosen font files are bundled locally through Expo Font at the app root; they do not require Google Fonts requests at runtime. Navigation renders when font loading succeeds or reports an error. If loading fails, shared text falls back to readable system faces rather than blocking the app. Unsupported scripts, including Korean, Japanese, Chinese, Thai, Cyrillic, Arabic, and Indic scripts, use the native system font instead of being forced into the custom faces. Latin text, including Vietnamese and Spanish accents, can use the display/accent faces. Native fallback-glyph appearance depends on the operating system.

The primary and accent families are separate and opt-in through shared text roles. Explicit companion text overrides display/accent styling for functional dialogs and small controls. Both SIL Open Font Licenses are included under `assets/fonts/`.

## Shared visual polish and preservation

The shared visual tokens coordinate graceful corner radii, subdued glass borders/dividers, editorial gradients, and gentle press feedback across all six existing themes. Base palettes and identities remain unchanged. Ordinary existing panels now use softer shadows, no extra border, and modest 18-point padding. Accessible control touch sizes remain intact. No new decorative graphics, cards, redundant containers, oversized controls, or scrolling regions were introduced.

Home order, Find Your Next Read, Discover's GL/BL ordering, filters, navigation destinations, Story Details structure, catalog eligibility, launch-aware visibility, and demo/production separation remain intact. Books by Authors retains its exact horizontal snapping carousel and five fixed slots for every creator, including transparent empty slots. Standard browsing covers remain 105–115 points around the 110-point default. The floating five-tab navigation silhouette and Library/Create/Profile structures are preserved.

Existing sheet/filter transitions respect the current reduced-motion preference, including live changes and subscription cleanup. No new carousel motion or animations on reading text were added. Reader functionality remains at the existing preview stage; no new novel or toon reader is claimed.

## Verification

- TypeScript, Expo lint, all 33 tests, formatting, and diff checks pass.
- Expo exports completed for iOS, Android, and web; byte comparison confirms both chosen font files are included in exported assets.
- Browser checks across all six themes at 320, 375, 390, and 430 points confirm the loaded primary face, restrained accent, unclipped display headings, no page overflow, and identical five-slot author-card geometry.
- Discover cover widths remain 105, 105, 106, and 115 points respectively. Creator names use the primary face without clipping, and GL/BL organization is unchanged.
- Story Details remains continuous with Synopsis, Chapters, and Reviews. At all four widths, the display text fits without clipping or page overflow.
- Horizontal author scrolling settles at the expected 321-point interval at 375-point viewport width. Two-work creators retain the large first cover and first small cover in their original fixed positions.
- Theme color contrast tests pass at 4.5:1 or better against base and panel surfaces. Amethyst and the normal viewport were restored after review.
- Unit tests include font-load fallback, multilingual selection, distinct primary/accent roles, reduced-motion lifecycle, catalog gating, standard cover geometry, and fixed slots for one through five-plus works.
- Native simulator interaction, native fallback-glyph rasterization, extreme Dynamic Type sizes, and screen-reader walkthroughs were not completed in this pass. No known layout or functional regressions were found in browser checks.

## Modified files across this visual refinement

- `package.json`, `package-lock.json`: selected font packages.
- `assets/fonts/CormorantInfant-OFL.txt`, `assets/fonts/DancingScript-OFL.txt`: font licenses.
- `src/app/_layout.tsx`: local primary/accent font loading.
- `src/theme/visual.ts`, `src/theme/index.tsx`: shared tokens, role policies, font readiness.
- `src/hooks/use-reduced-motion.ts`: accessibility-aware transition preference.
- `src/components/ui.tsx`: type roles, panel simplification, curves and feedback.
- `src/components/glass.tsx`: coordinated glass surfaces and feedback.
- `src/components/bookstore.tsx`: primary wordmark, accent tagline, creator typography.
- `src/components/home/editorial.tsx`: primary editorial/author typography and shared curves; geometry is preserved.
- `src/components/discover/discovery.tsx`: shared corner tokens.
- `src/components/discover/editorial.tsx`: companion book-title/rank text and primary creator labels.
- `src/components/catalog-filters.tsx`: reduced-motion handling.
- `src/components/story/controls.tsx`: sheet/divider/badge treatment and readable dialog labels.
- `src/app/story/[id].tsx`: primary prominent book/creator typography; structure and behavior are unchanged.
- `tests/catalog.test.cjs`: font, visual, and accessibility policy checks.
- `docs/ink-and-elegance.md`: final roles, verification, and limits.

Changes are local for review. No further development phase has started.
