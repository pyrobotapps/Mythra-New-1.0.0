# Phase 1 experience inventory and implementation plan

Status: expanded scope accepted for design work; **visual approval pending**. Phase 2 has not begun.

## Baseline audit

| Area | Existing design and interactions | Missing at audit | Dependency |
| --- | --- | --- | --- |
| Home | Approved editorial order, fixed author carousel, collections, search/bell links | Reading progress and followed updates | Progress/social services |
| Discover | Approved shelves, search, filters, genre/relationship collections, eligibility gates | Production catalog/rankings | Catalog adapter, verified ranking signals |
| Story | Continuous details, edition selector, inline chapters, synopsis, story-specific demo reviews, recommendations | Reader destinations, full community flows | Published chapters, review/social services |
| Library | Four explanatory empty panels | Seven destinations, collections flow | Account library, progress, download storage |
| Create | Introductory placeholder | Complete Studio workspace and publishing/translation flows | Publishing, storage, permissions |
| Profile | Guest state and working persisted six-theme selection | Account, community, settings, monetization, administrative entry points | Auth, social, billing, authorization |
| Notifications | Empty state | Categories, updates and preference destination | Notification service |
| Readers | Not implemented | Novel/toon, chapter navigation, settings and discussion | Chapter text/art and access enforcement |

## Verified implementation groups

1. Shared secondary-screen structure; Library and story reading journey. Check TypeScript, lint and tests before continuing.
2. Accounts, preferences and community: purposeful forms, profile/list layouts, local choices, explicit service boundaries.
3. Creator Studio and translation: editing/scheduling/upload designs, collaboration and marketplace destinations, honest analytics empty states.
4. Membership, subscriptions, tips/coins, earnings/payout and administration: design previews, no checkout or authorization simulation.
5. Integrate entry points, test navigation/eligibility, responsive review, update final screen-by-screen inventory.

## Preservation contract

Home and Discover arrangements, editorial components, five-slot author geometry, regular cover sizes, floating five tabs, fonts, themes, and Story Details composition remain intact. Only necessary destination wiring is permitted on approved screens. New functionality is local and transient unless explicitly described as saved. Backend operations never report success.

## Screen-by-screen review inventory

“Review” means implemented design awaiting user visual approval, never automatic Phase 1 sign-off. Forms and filters in these secondary screens are temporary local previews. Tables show the complete service boundary for each destination.

### Approved browsing surfaces and dedicated reading routes

| Screen / destination | Design status | Working interaction | Deferred |
| --- | --- | --- | --- |
| Home `/` | Approved composition preserved | Shelves, editorial/author collections, story links, search, bell | Real progress, following and verified production rankings |
| Discover `/discover` | Approved organization preserved | Search, combined filters, format/genre/relationship collections | Production catalog integration and verified rankings |
| Collections `/collection/[key]`, `/discovery-collection`, `/home-collection` | Existing design preserved | Eligible story and creator browsing | Production source |
| Rankings `/rankings` | Existing design preserved | Development-only editorial ranking preview | Genuine production signals; remains hidden without eligibility |
| Story Details `/story/[id]` | Approved composition preserved; destination wiring added | Edition choice, synopsis, chapter sort, reader/chapter/profile/review links, share, recommendations | Account library actions, review publishing, following |
| Full chapter list `/chapters/[id]` | Review | Available edition chips, sorting, chapter navigation | Published chapters and access checks |
| Novel reader `/reader/[id]` | Review | Original development passage, immersive controls, text size, serif/sans, paper, line spacing, session bookmarks, navigation, discussion link | Real chapter text, persistence/resume, auto-next, offline access |
| Toon reader `/reader/[id]` for Toons | Review | Vertical storyboard slots, immersive controls, chapter navigation, edition and discussion destinations | Real uploaded art, image streaming/preloading, offline authorization and auto-next |
| Reader settings (reader sheet) | Review | Session text/spacing/paper/font/edition controls and bookmarks | Synced preferences, download and auto-next execution |
| Library `/library` | Review | Currently Reading / Want to Read / Completed / Favorites / History / Downloads selection; collections links | Account library, save/remove, resume, offline storage |
| Create `/create` | Review | Studio, story, chapter, upload, schedule, translation and business links | Authenticated workspace |
| Profile `/profile` | Existing theme controls preserved; new hubs review | Persisted six themes, account/community/settings entry points; development-only business/admin/map links | Identity, synced preferences, accounts |
| Notifications `/notifications` | Review | Category selection and updates/settings/connection links | Notification delivery and read state |

### Secondary destinations

Each row is `/experience/<key>`; common back navigation and service-boundary actions are implemented.

| Key | Screen | Design status | Working local interaction / layout | Deferred functionality |
| --- | --- | --- | --- | --- |
| sign-in | Welcome back | Review | form layout, editable fields, destination links, availability explanation | Authentication is not connected. Do not enter real credentials into this visual preview. No sign-in request is sent. |
| register | Begin your story | Review | form layout, editable fields, toggle previews, destination links, availability explanation | Registration, email verification, terms acceptance and age eligibility require the future account service. No account is created. |
| reset-password | Find your way back | Review | form layout, editable fields, availability explanation | Email delivery and secure recovery are not connected. No email will be sent. |
| settings | Your preferences | Review | hub layout, destination links | Only theme changes are saved on this device. Other selections are temporary design previews until preferences are integrated. |
| content-preferences | Stories for you | Review | preferences layout, selection controls, toggle previews | These selections preview preference controls only. Discover's existing search filters remain independent and working. |
| mature-access | Content & comfort | Review | preferences layout, selection controls, availability explanation | Age verification is not connected. No age or content entitlement is granted in this preview. |
| languages | Across languages | Review | preferences layout, selection controls, destination links | Language defaults and interface localization are deferred. Story Details continues to list only available editions. |
| themes | Your atmosphere | Review | Six themes, saved on device | Theme selection works locally. Account theme synchronization is deferred. |
| reading-preferences | Room to read | Review | preferences layout, selection controls, toggle previews | Synced reading preferences, progress and cross-device bookmarks are deferred. |
| privacy | Your space | Review | preferences layout, toggle previews, destination links | Privacy controls are design previews. Enforcement requires authenticated accounts and server policies. |
| notification-settings | A gentle nudge | Review | preferences layout, selection controls, toggle previews | No notifications or permission requests are sent. Delivery preferences require account and notification integrations. |
| account-settings | Account settings | Review | hub layout, destination links | You are a guest. Account updates and sign-out require authentication. |
| account-data | Your account data | Review | form layout, selection controls, availability explanation | No request is submitted and no data is exported or deleted. Identity verification and account services are required. |
| collections | Your collections | Review | inbox layout, destination links, honest empty state | Collection saving and story membership require library services. |
| collection-editor | Shape a collection | Review | form layout, editable fields, selection controls, honest empty state, availability explanation | This editable form is a layout preview. No collection is saved or made public. |
| community | Between the pages | Review | hub layout, destination links | Social accounts and activity are not connected. No followers, conversations or activity are fabricated. |
| reader-profile | Reader profile | Review | hub layout, destination links, honest empty state | Public profiles and visibility enforcement require authenticated accounts. |
| edit-profile | A little about you | Review | form layout, editable fields, availability explanation | Profile updates and avatar uploads require authenticated storage. No profile is published. |
| creator-profile | Creator profile | Review | hub layout, destination links | Profiles display eligible catalog works only. Bios, follower counts, subscriptions and following require creator account data. |
| following | Following | Review | inbox layout, selection controls, destination links, honest empty state | Follow actions and notifications are not connected. |
| updates | Fresh from your shelf | Review | inbox layout, selection controls, destination links, honest empty state | Personalized update feeds are deferred. |
| comments | Chapter discussion | Review | inbox layout, editable fields, selection controls, toggle previews, destination links, honest empty state, availability explanation | Comments, spoiler controls and moderation require authenticated services. Your draft is not sent. |
| replies | In conversation | Review | inbox layout, editable fields, honest empty state, availability explanation | No reply is sent. Thread identity, moderation and notifications are deferred. |
| reviews | Reader voices | Review | inbox layout, selection controls, destination links | Only story-scoped development reviews may appear. Publishing reviews requires authentication and moderation. |
| write-review | Leave a little ink | Review | form layout, editable fields, selection controls, toggle previews, availability explanation | No rating or review is submitted or added to story totals. Review storage and moderation are deferred. |
| messages | Private messages | Review | inbox layout, editable fields, destination links, honest empty state | There is no messaging backend and no messages are sent. |
| conversation | New conversation | Review | form layout, editable fields, destination links, honest empty state, availability explanation | No message is sent and no conversation is created. |
| connections | Your connections | Review | inbox layout, selection controls, destination links, honest empty state | No connection requests are created or accepted. |
| blocked | Blocked accounts | Review | inbox layout, destination links, honest empty state | Blocking and server-enforced restrictions are deferred. |
| report | Let us know | Review | form layout, editable fields, selection controls, toggle previews, availability explanation | No report or block is submitted. Reporting and moderation services are not connected. |
| standards | Read with care | Review | hub layout, destination links | Final community policies, appeals and enforcement workflows require policy and moderation review. |
| studio | Your writing room | Review | hub layout, destination links, honest empty state | This is an unsaved editing preview. Publishing, file storage, rights verification and moderation are not connected; no story or chapter is created. |
| my-stories | Your stories | Review | inbox layout, selection controls, destination links, honest empty state | This is an unsaved editing preview. Publishing, file storage, rights verification and moderation are not connected; no story or chapter is created. |
| new-story | A new world | Review | form layout, editable fields, selection controls, toggle previews, destination links, availability explanation | This is an unsaved editing preview. Publishing, file storage, rights verification and moderation are not connected; no story or chapter is created. |
| edit-story | Refine your story | Review | form layout, editable fields, selection controls, toggle previews, destination links, availability explanation | This is an unsaved editing preview. Publishing, file storage, rights verification and moderation are not connected; no story or chapter is created. |
| chapter-editor | The next chapter | Review | form layout, editable fields, selection controls, destination links, availability explanation | This is an unsaved editing preview. Publishing, file storage, rights verification and moderation are not connected; no story or chapter is created. |
| schedule | At the right moment | Review | form layout, editable fields, selection controls, availability explanation | Scheduling, time validation, queue processing and notifications require publishing services. |
| toon-upload | Stories in frames | Review | form layout, editable fields, destination links, honest empty state, availability explanation | This is an unsaved editing preview. Publishing, file storage, rights verification and moderation are not connected; no story or chapter is created. |
| publish-review | Before the first reader | Review | hub layout, destination links, availability explanation | This is an unsaved editing preview. Publishing, file storage, rights verification and moderation are not connected; no story or chapter is created. |
| collaborators | Made together | Review | inbox layout, editable fields, selection controls, destination links, honest empty state, availability explanation | Invitations, consent, role permissions, revenue splits and credits require authenticated collaboration services. No invitation is sent. |
| analytics | Your stories, in perspective | Review | insights layout, selection controls, honest empty state | Verified event collection, aggregation and creator permissions are deferred. |
| translation-editions | More ways into a world | Review | inbox layout, destination links, honest empty state | Edition storage, rights, translation review and publishing are deferred. |
| editions | One story, many voices | Review | inbox layout, destination links, honest empty state | Published translation content and verified translator credits require the edition catalog. |
| edition-editor | A new language edition | Review | form layout, editable fields, selection controls, toggle previews, destination links, availability explanation | No edition is created. Rights verification, chapter alignment and moderation are required. |
| translation-editor | Across the page | Review | form layout, editable fields, destination links, availability explanation | No source content, automatic translation or submitted translation is fabricated. Edition rights and storage are deferred. |
| translation-collaboration | In another voice | Review | inbox layout, selection controls, destination links, honest empty state, availability explanation | Assignments, review decisions and translator permissions are deferred. Nothing is submitted. |
| translator-profile | A translator's voice | Review | form layout, editable fields, selection controls, destination links, availability explanation | This is an editable self-profile design, not a real translator listing. Verification, portfolio storage and availability are deferred. |
| translator-marketplace | Find the right voice | Review | inbox layout, editable fields, selection controls, destination links, honest empty state | Translator discovery, contact and contracts require account and marketplace services. |
| membership | A little more MYTHRA | Review | offer layout, selection controls, destination links, availability explanation | There is no purchasable plan, trial, checkout or subscription activation. Store billing, terms and entitlement services are deferred. |
| creator-subscription | Stay close to the story | Review | offer layout, destination links, honest empty state, availability explanation | No subscription is created or billed. Creator plans, store purchases and entitlement verification are deferred. |
| tip | A note of appreciation | Review | form layout, editable fields, availability explanation | No tip is charged, sent or credited. Payment processing, consent and creator eligibility are deferred. |
| wallet | Your reading extras | Review | hub layout, destination links, honest empty state | Purchases, balances and entitlements require verified billing services. |
| coins | Unlock the next chapter | Review | offer layout, destination links, honest empty state, availability explanation | No coins are purchased or spent and no chapter is unlocked. Mobile billing policies, pricing and access verification are deferred. |
| subscriptions | Your subscriptions | Review | inbox layout, selection controls, destination links, honest empty state | Subscription management and cancellation need verified store billing connections. |
| purchases | Purchase history | Review | inbox layout, destination links, honest empty state | Receipt verification, refunds and purchase history are deferred. |
| billing-help | Billing help | Review | form layout, editable fields, selection controls, availability explanation | No support request is sent. Final billing policies and support integrations are deferred. |
| earnings | Your creative livelihood | Review | insights layout, selection controls, destination links, honest empty state | Earnings calculations, settlement, tax reporting and payout execution are deferred. |
| payout | Payout settings | Review | hub layout, destination links, availability explanation | No bank, tax or identity credentials are collected in this preview. A secure provider and verified creator account are required. |
| statements | Earnings statements | Review | inbox layout, honest empty state, availability explanation | No document is generated. Verified accounting data and creator permissions are required. |
| admin | Care for the community | Review | hub layout, destination links, honest empty state | Role verification, operational data and all administrative mutations are deferred. |
| moderation | Moderation queue | Review | inbox layout, selection controls, destination links, honest empty state | No moderation records or decisions are loaded or changed. |
| moderation-detail | Review with context | Review | form layout, editable fields, selection controls, honest empty state, availability explanation | No content is approved, restricted or removed. Authorization, appeal notices and immutable audit logging are deferred. |
| reports | Reported concerns | Review | inbox layout, selection controls, destination links, honest empty state | Report access, assignment and resolution require administrative services. |
| content-management | Catalog oversight | Review | inbox layout, editable fields, selection controls, destination links, honest empty state | Search and visibility mutations require authenticated administrative catalog access. |
| audit | Accountable decisions | Review | inbox layout, honest empty state | Immutable audit collection and role-protected access are deferred. |
| experience-map | The MYTHRA experience | Review | hub layout, destination links | This map organizes secondary routes without changing the approved Home and Discover compositions. Review and integration status is tracked in docs/phase-1-screen-inventory.md. |
| notifications | Notifications | Review | inbox layout, selection controls, destination links, honest empty state | Notification delivery, read state and unread indicators are deferred. |
| super-like | A little extra love | Review | offer layout, honest empty state, availability explanation | No Super Like is recorded and nothing is purchased or deducted. |
| promotions | Give your story a stage | Review | form layout, editable fields, selection controls, availability explanation | Promotions, advertising, audience eligibility and sponsored placements require review and backend services. No announcement or campaign is published. |
| drawing-studio | A future canvas | Review | hub layout, destination links | Drawing, layer editing and export are deferred to a later scoped design and implementation review. |
| chapter-management | Chapter by chapter | Review | Status selection, honest empty sequence, chapter editor/schedule/toon destinations | Authenticated chapter list, reorder, permissions and publication changes |

## Remaining design and integration review

- Every new destination needs user visual review; existing approvals do not automatically extend to these additions. Phase 1 is **not approved**.
- Empty states and editable forms establish navigation, placement and interaction boundaries. Real populated inboxes, financial ledgers, moderation items, translator listings and creator analytics cannot be validated against live data yet. Their data density and final policy copy require review when integrations are scoped.
- Membership benefits, prices, store terms, ads/promotional placements, mature-access rules, legal policies and marketplace contracts are not finalized product promises. Business/admin previews are development-only; backend authorization is still required in later phases.
- Drawing/creation tools remain an explicit longer-term destination, not a fabricated canvas/editor.
- Reader content is an original English typography sample or empty toon storyboard slots, never claimed to be the selected story's published chapter. Real text/art, streaming/preloading, authorized offline storage, censored visual editions where permitted, five-second auto-next transitions, resume positions and persistent bookmarks remain deferred. Auto-next is off.
- Only the existing theme preference persists. Other secondary-screen form fields, switches, collection settings and reader adjustments are transient previews. No account, message, payment, report or publication is submitted.

## Verification evidence

- TypeScript, Expo lint and formatting checks pass.
- 39 tests pass, including complete secondary-route reachability, required-feature coverage, explicit deferred actions, release gating for business/admin previews, immutable selection state, chapter 24 deep links, and all existing catalog/theme/author-layout safeguards.
- Expo Doctor: **20/20** checks passed.
- iOS production JavaScript/asset export succeeds; output is outside Git in `/private/tmp/mythra-phase1-ios-preview`.
- Browser checks at **320, 375, 390 and 430 pt**: story form, privacy switches, translator filters, membership offer, moderation decision form, Library, novel reader and toon reader show no document or control overflow. The two reader types and chapter 24 navigation render correctly.
- All six themes were selected in the UI and their actual accent/text colors checked; shared palette contrast tests pass. Amethyst restored afterward.
- Local story-title editing, classification/relationship selection, unavailable save explanation, reader text size, paper selection, session bookmark, toon tap-to-hide/show, and story/chapter/edition discussion context verified in-browser. No browser errors observed during these flows.
- Native iOS bundle compilation passed. The connected computer-use surface could not select Simulator, so interactive iOS/Android device QA is still pending; responsive browser checks are not a substitute for that review.

## Preview entry points

Run `npm start` and open the iPhone simulator with `i`, or use Expo's compatible development client. For the running web preview: `http://localhost:8082`.

- Profile → Phase 1 design review → Experience map (development builds only)
- Create → Studio dashboard / New story
- Library → category chips / Custom Collections
- Any demo story → Start Reading / View All Chapters / View Profile / Write Review

## Modified files

Existing screens: `src/app/(tabs)/create.tsx`, `library.tsx`, `profile.tsx`; `src/app/notifications.tsx`; `src/app/story/[id].tsx` (destination wiring only).

New dedicated routes: `src/app/chapters/[id].tsx`, `src/app/reader/[id].tsx`, `src/app/experience/[screen].tsx`.

New shared design/architecture files under `src/features/experience/`: `components.tsx`, `screen.tsx`, `registry.ts`, `studio-registry.ts`, `business-registry.ts`, `review-registry.ts`, `navigation.ts`, `resolve-story.ts`, `policy.ts`, `reader-policy.ts`.

Tests: `tests/experience.test.cjs`. Documentation: this inventory. No dependencies, Home/Discover layouts, shared cover tokens, theme palettes or floating navigation files changed.
