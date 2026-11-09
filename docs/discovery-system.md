# Discover system: development and production boundaries

## Local testing

Demo content is opt-in. Set `EXPO_PUBLIC_CATALOG_MODE=demo` in an ignored `.env.local` file or launch with:

```sh
EXPO_PUBLIC_CATALOG_MODE=demo npx expo start --go
```

The working copy has an ignored `.env.local` enabling demo mode. Fresh clones default to production mode until explicitly configured for demos. `.env.example` contains only public configuration placeholders.

`EXPO_PUBLIC_DISCOVERY_SCENARIO` supports `mixed`, `empty`, `gl-only`, `bl-only`, and `error` for development QA. Reload after changing environment values. The normal working-copy scenario is restored to `mixed` after verification.

Release builds **always resolve to production**, even if the public environment requests demo mode. Demo reviews, chapter metadata, and the legacy catalog used by other screens are also gated. Empty shared shelves and missing featured books safely render nothing, preserving the existing development layouts of other screens.

## Production source contract

`createDiscoveryLoader` accepts a future `loadPublished` adapter returning trusted publication records. It has no production backend adapter configured yet. The absence of an adapter or a rejected request produces an error with Retry. A successful adapter response containing zero eligible publications produces the welcome state. These cases never silently fall back to demo stories.

Publication records carry provenance, approval, mobile distribution eligibility, published chapter count, publication timestamps, chapter-update timestamps, completion information, creator approval/first-publication dates, and explicit upcoming schedules. Production ignores demo-provenance records. Only approved, public-to-mobile, Safe/Suggestive records with approved creators, an actual published chapter, and a publication date at or before now enter the published catalog. Upcoming works must instead have an explicit approved future schedule.

These checks are client-side defense in depth, **not authentication or entitlement enforcement**. A future backend must supply authoritative records and enforce moderation, distribution, licensing, age/access restrictions, and row-level security. No new backend, purchase, or publishing service is implemented here.

## Discovery composition and results

The header retains MYTHRA, the bell, the main search bar, and the adjacent circular filter control. The redundant header search shortcut and all visible filter strips are removed only from Discover.

Nonempty shelves appear in this order: Girls Love; Boys Love; genre browsing; Newly Published; Recently Updated; Completed Stories; Discover New Creators; Coming Soon. Optional genre shelves follow when their configurable minimum is met. GL/BL shelves need only one eligible story; no empty shelves are rendered. All 13 supported literary genres remain browsable even with an empty catalog.

Recently Updated requires a real later chapter-publication timestamp; completion and new-creator sections require their corresponding data. New-creator discovery shows one eligible published work per approved creator. Upcoming works do not masquerade as published search results.

All filters live in the panel. Draft selections survive closing/reopening without affecting results until Apply. Applied filters persist on-device. Clear Filters clears the search and applied/draft filters and returns to the bookstore. A subtle dot and explicit applied-count line make restored filters obvious. Search/filter results use balanced, container-measured card widths rather than a fixed-width grid. Shelf covers remain portrait carousels. Existing safe-area padding keeps the final content row above the floating navigation.

## Future ranking capabilities

No Top 10, Popular, Trending, or genre-ranking sections are rendered by Discover. The eligibility helper requires production-provenance inventory, verified ranking/engagement inputs, and configurable minimums. It never derives popularity from fixture ratings or local ordering. Demo inventory cannot satisfy these gates.

Initial policy thresholds are kept in `discoveryThresholds`: genre shelves need 4 stories; new-creator window is 90 days; Top 10 needs at least 10 eligible works and 10 eligible ranked IDs; engagement capabilities require at least 10 works, 100 distinct readers, and 1,000 genuine engagement events. These are future policy defaults to review against real data, not fabricated statistics or enabled features.

## Files

- Discover route: `src/app/(tabs)/discover.tsx`
- Full shelf destination: `src/app/discovery-collection.tsx`
- Discovery UI: `src/components/discover/discovery.tsx`
- Filter panel: `src/components/catalog-filters.tsx`
- Source/mode boundary: `src/config/catalog-mode.ts`, `src/services/discovery-source.ts`
- Eligibility, section composition, growth thresholds, responsive sizing: `src/services/discovery-policy.ts`
- Loading/retry hook: `src/hooks/use-discovery.ts`
- Shared compatibility guards: `src/components/bookstore.tsx`, `src/components/ui.tsx`, `src/services/catalog.ts`, `src/services/story-details.ts`
- Applied language-preference validation: `src/state/catalog-preferences.tsx`
- Tests: `tests/catalog.test.cjs`
- Configuration/docs: `.env.example`, `README.md`, this document

No Home, Story Details, Library, Create, Profile, theme-definition, or floating-navigation route was redesigned. Existing cover assets and language-selection controls remain unchanged.

## Verification

Automated checks cover release-mode demo rejection, empty production success versus errors, failed loads without fallback, zero/GL-only/BL-only/mixed catalogs, publication/moderation/access eligibility, timestamp-based shelf eligibility, optional genre thresholds, real-data ranking thresholds, and balanced card widths at 320–430px phone sizes.

Interactive checks at a 320px-wide viewport confirmed the clean header, GL/BL carousels, balanced results, combined search/filters, draft retention, Apply, Clear, zero-story welcome, production error/retry without demo content, and GL-only/BL-only shelf suppression. Navigation remains accessible. The production-adapter zero-success path is verified with an injected test adapter; no live backend is claimed.
