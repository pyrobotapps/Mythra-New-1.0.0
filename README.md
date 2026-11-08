# MYTHRA 1.0.0

An iPhone-first Expo SDK 58 / React Native / TypeScript reading and publishing app. The existing project has been rebuilt for **Phase 1 — Visual Foundation**. Later phases remain intentionally unfinished. The complete [master specification](docs/master-specification.md) is preserved for subsequent phases.

## Preview in Expo Go

From this project folder:

```sh
npm install
npx expo start --go
```

On an iPhone, scan the terminal QR code with Camera and open it in an Expo Go version supporting SDK 58. Keep the phone and Mac on the same network. To use an installed iPhone simulator, press `i` in the Expo terminal (or run `npm run ios`). If an older preview is already running, use its Reload control to fetch the latest source.

The development preview created during this phase runs on port 8082. Its browser counterpart is `http://localhost:8082`. This remains a native React Native application; the browser is only an additional development target, not a WebView replacement.

## What changed in Phase 1

- Reusable bookstore components, 2:3 portrait covers with subtle depth, fully wrapping titles, horizontal shelves, aligned two-row collections, numbered charts, and collection/See All destinations.
- Home rebuilt with all 15 requested section headings. Continue Reading has an honest empty state until readers/progress exist. Following explains its unavailable community connection.
- Discover rebuilt with format/genre/relationship browsing, full charts, curated collections, all requested demo shelves, and an advanced filter sheet.
- Search covers titles, creators, literary genres, relationship categories/aliases, tags, and available reading languages. Multi-select values are OR within a dimension and AND across dimensions. Classification, language, publication status, and access filters also constrain results. Filter preferences persist locally; search queries are session-only.
- Five real Expo Router custom tabs retain tab state, with floating frosted navigation, platform icons, selected-tab accessibility, correct story/back routing, a search shortcut, and an honest notification-center empty state.
- Six persistent themes: Amethyst, Rose, Lagoon Teal, Aurora Multicolor, Classic Light, Classic Dark. Aurora adds coordinated background gradients. The shared palette affects controls, glass, navigation, text, and backgrounds.
- 20 fictional stories across all six relationship categories and varied literary genres/formats. Every story has original generated cover artwork stored in `assets/covers/`. See [cover provenance and prompts](docs/cover-art.md).
- Shared edition/chapter/progress types distinguish canonical stories, original/translated editions, and reading progress. Eight planned launch languages have native compact labels. Only English demonstration editions actually exist.

## Working and unfinished boundaries

Working: bookstore browsing, story selection, all See All routes, rankings format tabs, search, combined filters, resetting filters, theme switching, local theme/filter persistence, and navigation.

Story Details and Discover received the requested [layout correction](docs/layout-correction.md). Story Details is now one continuous compact page with fifteen chapter rows, sorting, ratings/reviews, and creator/recommendation sections. **Actual chapter content, both readers, bookmarks, progress/resume behavior, and translated editions remain unavailable. Phase 2 is awaiting approval.**

Library, collections, following, notifications, reviews/comments, profiles/privacy, and messaging are later-phase work. Creator Studio is a labeled preview; it does not publish anything. No accounts, live rankings, real user activity, paid entitlements, purchases, or remote services are operating. Demo ratings and editorial chart ordering are explicitly labeled. Payments, remote accounts, messaging, and publishing are feature-flagged off in the prepared model layer.

The mobile demo excludes Erotica and Pornographic material. Classification filters never grant access or establish age/entitlement checks. Actual authorization, moderation, adult-access controls, and distribution compliance must be built and reviewed before production content is connected.

## Supabase preparation

`src/lib/supabase.ts` prepares an optional client; screens use the local demonstration service and do not call it. There is no database schema, configured authentication, access policy, synchronization, or production backend. `.env.example` documents public connection variables for future use. Never place a service-role key in a mobile application.

## Structure

- `src/app/`: Expo Router screens
- `src/components/`: glass controls, symbols, covers, shelves, charts, filters
- `src/theme/`: palettes and shared design tokens
- `src/state/`: persistent local discovery preferences
- `src/services/catalog.ts`: pure search, filtering, visibility, and editorial collections
- `src/data/`: typed fictional catalog and static cover registry
- `src/models/`: future canonical edition/chapter/progress boundaries and feature flags
- `tests/`: catalog, filtering, reference integrity, palette contrast, and language-label checks
- `docs/`: asset provenance and verification notes

## Checks

```sh
npm test
npm run typecheck
npm run lint
npx expo install --check
npx expo export --platform ios --platform android --platform web
```

In restricted shells, prepend `EXPO_NO_TELEMETRY=1` to Expo commands to avoid writing global telemetry state.

See [Phase 1 verification](docs/phase1-verification.md) for observed checks and preview limitations. An ignored `.tools/` portable Node installation from the original setup is optional; system Node/npm are now available.
