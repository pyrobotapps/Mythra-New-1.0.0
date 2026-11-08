# Story Details and Discover layout correction

This change is limited to the two requested screens and their reusable supporting components/data. Profile and Creator Studio were not redesigned. Phase 2 reader work has not started.

## Story Details

- One continuous page replaces the centered cover, oversized metadata panel, and About/Chapters/Reviews tabs.
- Compact Back / Story Details / Share / More toolbar, 100px portrait cover on the left, wrapping title and metadata on the right, and exactly one colored classification badge.
- Start Reading and a compact EN language menu sit side by side. The menu contains only the existing English edition, with the full name in the expanded menu. No translations were invented.
- Compact library/follow actions and an overflow menu. These actions show explicit availability feedback; they do not claim to save, follow, notify, report, or submit reviews to a backend.
- Synopsis uses a four-line preview with Read More / Show Less and working discovery tag links.
- Fifteen chapter rows appear directly on the page, defaulting to Newest First. Every row has number, title, fictional date, unread state, and Free access label. Sorting is reversible. View All Chapters opens an incrementally loaded 24-entry preview list.
- Continuous ratings/reviews section, distribution, review sort, and reader-derived sample spice summary; creator avatar, biography/profile sheet, other works, and More Like This shelf.
- One small preview-catalog caption identifies the fictional story metadata, chapter dates, and reader feedback. No scale explanation or repeated demo panels.

## Discover

- MYTHRA heading, existing glass search and notification controls, and compact horizontal genre/relationship ribbons.
- Ordered bookstore sections: New Releases; two-row New & Noteworthy; segmented Novels / Toons / Short Stories charts; Trending Now; visual genre collections; equally accessible BL, GL, M/F, Other, and No Romance collections; larger Coming Soon covers; Hidden Gems; Editor's Picks; Completed Stories; Popular in Your Language.
- Portrait covers use 136px, 154px, or 172px widths according to editorial hierarchy. Titles remain fully wrapping.
- Advanced filters remain behind the compact control. Search/filter results are presented only when a selection is active, with Reset available.

## Verification

TypeScript, ESLint, nine automated catalog/details tests, local Expo dependency compatibility, and iOS/Android/web exports pass. Interactive browser checks at phone width confirmed the revised Discover and Story Details layouts, the single-language menu, 15 directly rendered chapter entries, sorting from newest to oldest, full-list incremental loading, and story navigation. All six existing theme palettes remain in use.

The earlier approved Rork and Apple Books screenshots were not present in the project or attached reference files, so this correction follows the user's exact written structure. An exact screenshot comparison remains dependent on those reference images.

## Preview

Reload the project in Expo Go. If needed, start a fresh Metro session with `npx expo start --go --clear`. The existing browser preview is available at `http://localhost:8082/discover` while Metro is running.

Readers, chapter content, actual library/following persistence, live community submissions, authentication, and backend integration remain unavailable. These screen corrections do not indicate that Phase 2 or the full application is complete.
