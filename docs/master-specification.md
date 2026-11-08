# MYTHRA 1.0.0 — MASTER REDESIGN & DEVELOPMENT SPECIFICATION

## CRITICAL INSTRUCTIONS

MYTHRA currently runs in Expo Go, but the implementation does not match the product we've designed.

I want a substantial redesign and functional rebuild of the existing application.

Do not create a new project. Work directly inside the current MYTHRA 1.0.0 Expo project.

Do not simply restyle the current screens. Rework the layout, components, navigation, and functionality to follow this specification.

Do not stop after creating a plan. Inspect the existing project, implement the changes, run checks, fix errors, and provide a working simulator preview.

If reference screenshots are available in the project, inspect them first. If not, follow this specification and identify any visual references you still need.

## 1. PRODUCT IDENTITY

MYTHRA is a premium, multilingual reading, storytelling, and publishing platform.

It supports:
- Novels
- Toons / webcomics
- Short stories
- Original works
- Translated editions
- Independent creators and collaborative publishing

BL and GL are MYTHRA's signature categories, but MYTHRA is NOT exclusively a BL/GL platform.

Support:
- BL / M/M
- GL / F/F
- M/F / heterosexual romance
- Multiple / polyamorous relationships
- Other relationship configurations
- No romance

Relationship categories must remain separate from literary genres.

Literary genres include Fantasy, Romance, Action, Adventure, Mystery, Thriller, Horror, Sci-Fi, Slice of Life, Historical, Drama, Comedy, Supernatural, and more.

Readers can select multiple preferences or browse everything.

Do not make the interface exclusively BL/GL-themed.

## 2. TECHNOLOGY

Continue using:
- React Native
- Expo
- TypeScript
- Expo Router
- Existing project dependencies where suitable

Architecture requirements:
- Reusable UI components
- Centralized design tokens
- Global theme provider
- Shared story and chapter data models
- Persistent local preferences
- Clear separation between UI, data services, and business logic
- Supabase-ready architecture
- iPhone-first responsive design
- Android compatibility for a later release

The website will be a separate application sharing the future backend.

Do not replace the mobile app with a WebView.

Use Expo-compatible packages and avoid unnecessary native dependencies that break Expo Go.

## 3. VISUAL IDENTITY — EXTREMELY IMPORTANT

The current design is not close enough to MYTHRA.

Use Apple Books as inspiration for the editorial browsing experience, particularly:
- Large readable section headings
- Realistic portrait book covers
- Horizontally scrolling shelves
- Two-row book collections
- Numbered bestseller charts
- Generous spacing
- Subtle depth and shadows
- Clean typography
- Bookstore-style discovery

Do not copy Apple's branding or assets.

Combine this with MYTHRA's original glassmorphism identity.

### Preserve the glass design

Use frosted or translucent glass for:
- Floating bottom navigation
- Search controls
- Notification button
- Filter controls
- Segmented controls
- Reader settings
- Selected interactive surfaces

Do not put every element inside a glass card.

The story artwork should remain the visual focus.

### Themes

Implement six selectable themes:

1. Amethyst — deep plum, violet, lavender
2. Rose — pink, blush, berry
3. Lagoon — teal, turquoise, deep ocean tones
4. Aurora — coordinated purple, pink, teal gradients
5. Classic Light — clean white and warm neutral backgrounds
6. Classic Dark — near-black and charcoal backgrounds

Themes must affect the entire application, including navigation, buttons, backgrounds, text, readers, and glass components.

Save the selected theme between sessions.

Ensure readable contrast in every theme.

## 4. NAVIGATION — PRESERVE THIS DESIGN

Use five primary tabs:

Home | Discover | Library | Create | Profile

Use a floating, rounded, frosted-glass navigation bar with clear icons and labels.

The active tab should be highlighted using the current theme.

Preserve:
- Working search
- Notification bell
- Smooth navigation transitions
- Correct back navigation
- Safe-area spacing

Do not replace the navigation with a standard rectangular bottom tab bar.

Avoid giant headers and excessive empty space.

## 5. HOME — APPLE BOOKS-INSPIRED

The Home screen should look like a premium digital bookstore.

Use the MYTHRA wordmark, compact search access, and notification bell.

Build these sections:

1. Continue Reading
2. Featured Stories
3. Top 10 in the US
4. Top Picks for You
5. New & Noteworthy
6. Trending Now
7. Popular Novels
8. Popular Toons
9. Popular Short Stories
10. Popular BL
11. Popular GL
12. M/F Romance
13. Completed Stories
14. Recently Updated
15. Following / Updates from Followed Creators

### Book presentation

Use portrait covers with consistent aspect ratios.

Do not crop covers into square thumbnails unless the section intentionally calls for that format.

Story titles must be fully readable underneath covers, with natural multiline wrapping.

Do not truncate titles unnecessarily.

Support long English and non-English titles.

Use horizontal scrolling for ordinary shelves.

For selected sections such as New & Noteworthy, use a two-row horizontally scrolling layout inspired by Apple Books.

Continue Reading should show chapter progress and open the correct reader.

Featured Stories should have a premium editorial treatment without becoming an oversized promotional hero.

Top 10 should use actual numbered ranking indicators.

Every section needs a working See All destination.

## 6. DISCOVER — COMPLETE BOOKSTORE EXPERIENCE

Discover must not be just a search bar, genre chips, and two story lists.

Build a full discovery experience with:

1. Search
2. Advanced filters
3. Browse by Format
4. Browse by Literary Genre
5. Browse by Relationship Category
6. New Releases
7. Trending Now
8. Top Charts
9. Editor's Picks
10. Popular BL
11. Popular GL
12. M/F Romance
13. Completed Stories
14. Hidden Gems
15. Coming Soon
16. Curated Collections

### Search

Search by:
- Story title
- Author
- Genre
- Relationship category
- Tags
- Language

Support filtering by:
- Novels, Toons, Short Stories
- Genre
- Relationship category
- Content classification
- Language
- Completed / Ongoing / Hiatus
- Free / Paid where applicable

Filters must actually change results.

### Top Charts

Provide tabs for:
- Novels
- Toons
- Short Stories

Display numbered entries with portrait covers, titles, authors, and ratings when available.

Provide a full rankings page.

Never present fabricated popularity numbers as real platform analytics.

## 7. STORY DETAILS — FOLLOW THIS STRUCTURE EXACTLY

This screen is one of MYTHRA's most important features.

Use a compact portrait cover alongside the story title and metadata.

### Section A — Story Header

Display:
- Portrait cover
- Full title
- Author name
- Average reader rating
- Review count
- Story format
- Relationship category
- Literary genres
- Publication status
- Content classification

Allow titles to wrap naturally.

Do not make the cover excessively large.

### Section B — Reading Controls

Display a prominent:

Start Reading / Continue Reading

Beside it, place a SMALL frosted-glass reading-language dropdown.

The language selector must not be a giant panel.

Use compact native-language labels:
- EN
- 한국어
- 日本語
- 简体中文
- RU
- ไทย
- VI
- ES

Show full language names in the expanded menu.

Only show available editions.

The selected language controls the displayed title, synopsis, chapters, chapter content, and edition-specific progress.

Do not fabricate translations.

### Section C — Library & Community

Include:
- Add to Library
- Add to Reading List
- Follow Story
- Follow Author
- Story update notifications
- Super Like
- Share
- Report

Use compact actions and an overflow menu where appropriate.

Do not crowd the screen with oversized buttons.

### Section D — Synopsis

Show a 3–4 line preview with Read More / Show Less.

Display:
- Full synopsis
- Literary genres
- Relationship category
- Descriptive tags
- Content warnings
- Original language
- Available translations
- Publication information

Tags should link to matching Discover results.

### Section E — Chapters

SHOW THE FIRST 15 CHAPTERS DIRECTLY ON STORY DETAILS.

Do not show only two or three.

Include:
- Chapter number
- Chapter title
- Publication date
- Read/unread status
- Free/restricted status
- Selected language availability

Default sorting: Newest First.

Also support Oldest First.

After the first 15 chapters, display View All Chapters.

The full chapter list should support incremental loading.

Make chapter rows comfortable to read and tap.

Do not randomly lock chapters.

### Section F — Ratings & Reviews

Include:
- Average rating
- Rating distribution
- Written reviews
- Review sorting
- Write/Edit Review
- Reader-generated spice rating
- Review reporting

Spice ratings must come from readers, NOT authors.

### Section G — About the Creator

Include:
- Creator avatar
- Display name
- Biography
- Follow Author
- View Profile
- Other published works

Show translator and collaborator credits where applicable.

### Section H — Recommendations

Include:
- More Like This
- More from This Creator

Use portrait-cover shelves with readable titles.

## 8. CONTENT CLASSIFICATIONS

MYTHRA uses four content classifications:

- Safe
- Suggestive
- Erotica
- Pornographic

Display exactly ONE classification badge per story, based on its actual classification.

Use:
- Green for Safe
- Amber for Suggestive
- Rose/Pink for Erotica
- Red for Pornographic

These are separate from genres, relationship categories, and content warnings.

Implement adult-access restrictions for mature material.

IMPORTANT: Apple's App Store rules may prohibit explicit pornographic content in the iOS app. Do not assume age verification makes it permissible. Design the data model to support classifications across the platform, but ensure the iOS distribution experience complies with App Store policies. Do not expose prohibited explicit content in the App Store build.

## 9. NOVEL READER

Create a premium, immersive novel reader.

Include:
- Full-screen reading mode
- Tap to hide/show controls
- Adjustable font size
- Serif and sans-serif fonts
- Line spacing options
- Reader color themes
- Light, dark, sepia, and other comfortable reading backgrounds
- Chapter navigation
- Bookmarks
- Reading progress
- Resume position
- Previous/Next chapter
- Optional automatic next-chapter behavior, OFF by default
- Chapter comments
- Reading-language edition selection

Support multilingual text correctly.

Reading preferences must persist.

## 10. TOON READER

Create a separate reader optimized for vertical-scroll webcomics.

Include:
- Smooth continuous vertical scrolling
- Full-width panels
- Image preloading
- Progressive loading
- Immersive controls
- Tap to hide/show UI
- Reading progress
- Chapter navigation
- Chapter comments
- Optional auto-next with a five-second transition, OFF by default
- Offline access for downloaded eligible chapters

Handle large image chapters efficiently.

Support separate censored/uncensored visual editions where applicable and permitted by platform rules.

Do not apply visual censorship options to novels.

## 11. LIBRARY

Create a functional personal library with:

- Currently Reading
- Want to Read
- Completed
- Favorites
- Downloads
- Custom collections
- Reading history

Readers should be able to save and remove stories, organize collections, and resume reading.

Persist local data until backend synchronization is available.

Offline reading should be free for eligible chapters added to the library.

Downloaded content must be limited to chapters the reader is authorized to access.

## 12. CREATOR STUDIO

MYTHRA is also a publishing platform.

Readers and creators should use the same account.

Build a Creator Studio supporting:

- Creator dashboard
- My Stories
- Drafts
- New Story
- Novel publishing
- Short-story publishing
- Toon publishing
- Chapter management
- Chapter scheduling
- Cover uploads
- Genre and relationship classification
- Content classification
- Tags
- Synopsis editing
- Publication status
- Language editions
- Translation management
- Contributor credits
- Collaboration management
- Creator analytics

Support original-language and translated editions under one canonical story listing.

Prepare for a translator marketplace and collaborative publishing workflows.

For toon creation, prepare a panel/image upload workflow, including batch uploads and ZIP import where supported.

Preserve the longer-term plan for a built-in drawing/creation studio, but do not substitute a fake editor for a functional publishing workflow.

## 13. COMMUNITY & SOCIAL FEATURES

Build or prepare real flows for:

- Follow authors
- Follow stories
- Story update notifications
- Chapter comments
- Threaded replies
- Reviews
- Super Likes
- Creator profiles
- Reader profiles
- Private messaging
- Connections
- Unread-message indicators
- Sharing story recommendations
- Notification center

Messaging must support appropriate privacy, blocking, and reporting controls.

Do not claim real-time messaging is operational until backend services are connected.

## 14. MULTILINGUAL ARCHITECTURE

MYTHRA's planned launch languages are:

English, Korean, Japanese, Simplified Chinese, Russian, Thai, Vietnamese, and Spanish.

Separate:
1. Application interface language
2. Story's original language
3. Available translated editions
4. Reader's selected reading language

A translated story must remain attached to the original canonical story.

Do not create duplicate listings for each language.

Support Unicode, multilingual typography, and appropriate line wrapping.

## 15. PROFILE & SETTINGS

Include:
- Account details
- Reading preferences
- Relationship preferences
- Language settings
- Theme selector
- Notification preferences
- Privacy settings
- Content preferences
- Saved collections
- Creator Studio access
- Subscription status where applicable
- Sign in / Sign out

Prepare account authentication using Supabase.

Remember-me behavior should be handled securely through the authentication system.

## 16. MONETIZATION — ARCHITECTURE ONLY FOR NOW

Prepare for:
- Free reading with limited advertising
- MYTHRA+ membership
- Creator subscriptions
- Reader tips
- Creator earnings
- Coin-based or chapter-based purchases where appropriate
- Creator promotional tools
- Creator analytics

Keep monetization behind feature flags until fully implemented.

For iOS digital purchases, use an Apple-compliant purchase implementation rather than assuming external web checkout is permitted.

Do not add fake payment flows or pretend purchases work.

## 17. BACKEND & DATA

Prepare Supabase-compatible models for:

- Users and profiles
- Stories
- Language editions
- Chapters
- Genres
- Relationship categories
- Tags
- Content classifications
- Library entries
- Reading progress
- Follows
- Reviews
- Comments
- Notifications
- Messages
- Creator relationships
- Publication schedules
- Purchases and entitlements

Use a clearly identified demo-data layer until the real database is configured.

Do not embed secret API keys in the app.

Use appropriate authorization and row-level security when backend functionality is implemented.

## 18. DEMONSTRATION CONTENT

The app must look populated enough to evaluate the layout.

Create a varied demonstration catalog with:
- BL
- GL
- M/F romance
- Non-romance stories
- Fantasy
- Mystery
- Horror
- Slice of Life
- Novels
- Toons
- Short Stories

Use consistent, high-quality cover assets where available.

Do not use copyrighted commercial book covers without permission.

Do not invent live rankings, real reviews, paid entitlements, or real user activity.

Clearly identify demonstration content in development.

## 19. INTERACTIONS — NO DEAD BUTTONS

Every visible control should either:

A. Perform a real working action, or

B. Clearly indicate that its backend-dependent functionality is not yet available.

Prioritize working:
- Tab navigation
- Search
- Filters
- Theme switching
- Story selection
- Story Details
- Language selection
- Chapter sorting
- Chapter opening
- Reader preferences
- Library saving
- Reading progress
- Creator navigation

Persist state where appropriate.

Do not create buttons that visually respond but do nothing.

## 20. IMPLEMENTATION PLAN

This is a substantial rebuild. Work in phases without abandoning the overall specification.

PHASE 1 — VISUAL FOUNDATION
- Inspect existing files.
- Build the theme system.
- Implement glass navigation.
- Create reusable bookstore components.
- Rebuild Home and Discover.
- Implement working navigation and filters.

PHASE 2 — STORY EXPERIENCE
- Rebuild Story Details completely.
- Implement language selection.
- Show 15 chapters.
- Add synopsis, reviews, creator information, and recommendations.
- Build functional novel and toon readers.
- Persist reading progress.

PHASE 3 — PERSONAL LIBRARY & COMMUNITY
- Library and collections.
- Following and notifications.
- Profiles and settings.
- Reviews and comments.
- Messaging architecture.

PHASE 4 — CREATOR STUDIO
- Publishing workflows.
- Story and chapter management.
- Translation editions.
- Scheduling.
- Contributor management.

PHASE 5 — BACKEND & RELEASE PREPARATION
- Supabase integration.
- Authentication.
- Database permissions.
- Content access rules.
- Offline storage.
- App Store compliance.
- Performance and accessibility testing.

## 21. TESTING

After each phase:
- Run TypeScript checks.
- Run linting if configured.
- Fix build errors.
- Verify Expo compatibility.
- Test navigation and interactions.
- Test long story titles.
- Test multilingual labels.
- Test all six themes.
- Check iPhone safe areas.
- Check scrolling and layout overflow.

Do not claim the app is complete merely because it launches.

## FINAL INSTRUCTION

I want MYTHRA to feel like a polished, premium digital bookstore and reading community—not a generic AI-generated book app.

Preserve MYTHRA's original identity, Apple Books-inspired editorial layouts, glassmorphism, signature BL/GL categories, inclusive genre support, and comprehensive publishing features.

Start by inspecting the existing project, then implement Phase 1 immediately.

Do not replace the entire project unnecessarily.

When Phase 1 is complete, tell me exactly what changed, what works, what remains unfinished, and how to preview it in Expo Go.

Continue with the later phases when instructed.