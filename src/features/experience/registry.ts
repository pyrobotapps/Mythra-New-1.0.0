import { reviewScreens } from "./review-registry";
import { businessScreens } from "./business-registry";
import { studioScreens } from "./studio-registry";
export type FieldSpec = {
  label: string;
  placeholder?: string;
  multiline?: boolean;
  secure?: boolean;
  email?: boolean;
};
export type ChoiceSpec = {
  label: string;
  options: string[];
  multiple?: boolean;
};
export type DestinationSpec = {
  title: string;
  screen: string;
  detail?: string;
};
export type ExperienceSpec = {
  id: string;
  domain: string;
  title: string;
  intro: string;
  kind: "hub" | "form" | "preferences" | "inbox" | "insights" | "offer";
  fields?: FieldSpec[];
  choices?: ChoiceSpec[];
  toggles?: string[];
  links?: DestinationSpec[];
  empty?: { title: string; body: string };
  action?: string;
  deferred: string;
  notes?: string[];
};
export const accountScreens: ExperienceSpec[] = [
  {
    id: "sign-in",
    domain: "Account",
    title: "Welcome back",
    intro: "Your stories, wherever you open them.",
    kind: "form",
    fields: [
      { label: "Email", email: true },
      { label: "Password", secure: true },
    ],
    action: "Sign in · not connected",
    links: [
      { title: "Create an account", screen: "register" },
      { title: "Forgot password?", screen: "reset-password" },
    ],
    deferred:
      "Authentication is not connected. Do not enter real credentials into this visual preview. No sign-in request is sent.",
  },
  {
    id: "register",
    domain: "Account",
    title: "Begin your story",
    intro: "A home for readers, storytellers and the worlds between.",
    kind: "form",
    fields: [
      { label: "Display name" },
      { label: "Email", email: true },
      { label: "Password", secure: true },
    ],
    toggles: ["I have read the community standards"],
    links: [
      { title: "Community standards", screen: "standards" },
      { title: "Already have an account?", screen: "sign-in" },
    ],
    action: "Create account · not connected",
    deferred:
      "Registration, email verification, terms acceptance and age eligibility require the future account service. No account is created.",
  },
  {
    id: "reset-password",
    domain: "Account",
    title: "Find your way back",
    intro: "Request a secure password reset link.",
    kind: "form",
    fields: [{ label: "Email", email: true }],
    action: "Send reset link · not connected",
    deferred:
      "Email delivery and secure recovery are not connected. No email will be sent.",
  },
  {
    id: "settings",
    domain: "Preferences",
    title: "Your preferences",
    intro: "Make room for the stories you love.",
    kind: "hub",
    links: [
      { title: "Content preferences", screen: "content-preferences" },
      { title: "Mature content access", screen: "mature-access" },
      { title: "Languages", screen: "languages" },
      { title: "Themes", screen: "themes" },
      { title: "Reading preferences", screen: "reading-preferences" },
      { title: "Privacy", screen: "privacy" },
      { title: "Notifications", screen: "notification-settings" },
      { title: "Account settings", screen: "account-settings" },
    ],
    deferred:
      "Only theme changes are saved on this device. Other selections are temporary design previews until preferences are integrated.",
  },
  {
    id: "content-preferences",
    domain: "Preferences",
    title: "Stories for you",
    intro:
      "Genres and relationships are separate choices. Browse broadly or choose a starting point.",
    kind: "preferences",
    choices: [
      {
        label: "Genres",
        multiple: true,
        options: [
          "Fantasy",
          "Romance",
          "Mystery",
          "Drama",
          "Action",
          "Sci-Fi",
          "Slice of Life",
          "Horror",
          "Comedy",
          "Historical",
        ],
      },
      {
        label: "Relationships",
        multiple: true,
        options: ["BL", "GL", "M/F", "Other", "Multiple / Poly", "No Romance"],
      },
      {
        label: "Formats",
        multiple: true,
        options: ["Novels", "Toons", "Short Stories"],
      },
    ],
    toggles: ["Reduce recommendations with content warnings"],
    deferred:
      "These selections preview preference controls only. Discover's existing search filters remain independent and working.",
  },
  {
    id: "mature-access",
    domain: "Preferences",
    title: "Content & comfort",
    intro: "A reading experience with clear boundaries.",
    kind: "preferences",
    choices: [
      { label: "Mobile catalog", options: ["Safe", "Safe & Suggestive"] },
    ],
    notes: [
      "Erotica and Pornographic classifications remain excluded from the mobile catalog.",
      "Account age checks, jurisdiction policies and website access will be enforced by backend services. Selecting a preference never grants restricted access.",
    ],
    action: "Age eligibility · not connected",
    deferred:
      "Age verification is not connected. No age or content entitlement is granted in this preview.",
  },
  {
    id: "languages",
    domain: "Preferences",
    title: "Across languages",
    intro:
      "Choose the languages you enjoy. Only existing story editions can be read.",
    kind: "preferences",
    choices: [
      {
        label: "Interface language preview",
        options: [
          "English",
          "한국어",
          "日本語",
          "简体中文",
          "Русский",
          "ไทย",
          "Tiếng Việt",
          "Español",
        ],
      },
      {
        label: "Preferred reading languages",
        multiple: true,
        options: [
          "English",
          "한국어",
          "日本語",
          "简体中文",
          "Русский",
          "ไทย",
          "Tiếng Việt",
          "Español",
        ],
      },
    ],
    notes: [
      "Interface translations are not yet available; selecting a language does not translate this preview.",
    ],
    links: [{ title: "Explore language editions", screen: "editions" }],
    deferred:
      "Language defaults and interface localization are deferred. Story Details continues to list only available editions.",
  },
  {
    id: "themes",
    domain: "Preferences",
    title: "Your atmosphere",
    intro:
      "Six ways to make MYTHRA yours. Theme changes are saved on this device.",
    kind: "preferences",
    deferred:
      "Theme selection works locally. Account theme synchronization is deferred.",
  },
  {
    id: "reading-preferences",
    domain: "Preferences",
    title: "Room to read",
    intro: "Preview your comfortable reading defaults.",
    kind: "preferences",
    choices: [
      { label: "Text size", options: ["Comfortable", "Large", "Extra Large"] },
      { label: "Line spacing", options: ["Relaxed", "Generous"] },
    ],
    toggles: ["Hide controls while reading", "Follow system reduced motion"],
    notes: [
      "The reader offers working session text-size and spacing controls. These default choices are not persisted yet.",
    ],
    deferred:
      "Synced reading preferences, progress and cross-device bookmarks are deferred.",
  },
  {
    id: "privacy",
    domain: "Preferences",
    title: "Your space",
    intro: "Choose how you connect with other readers.",
    kind: "preferences",
    toggles: [
      "Show reading activity",
      "Allow connection requests",
      "Allow messages from connections",
    ],
    links: [
      { title: "Blocked accounts", screen: "blocked" },
      { title: "Report a concern", screen: "report" },
    ],
    deferred:
      "Privacy controls are design previews. Enforcement requires authenticated accounts and server policies.",
  },
  {
    id: "notification-settings",
    domain: "Preferences",
    title: "A gentle nudge",
    intro: "Decide what is worth interrupting your next chapter.",
    kind: "preferences",
    toggles: [
      "New chapters from followed stories",
      "Creator announcements",
      "Replies and mentions",
      "Connection requests",
      "Private messages",
      "Membership and purchases",
    ],
    choices: [
      {
        label: "Delivery preview",
        multiple: true,
        options: ["In app", "Push", "Email"],
      },
    ],
    deferred:
      "No notifications or permission requests are sent. Delivery preferences require account and notification integrations.",
  },
  {
    id: "account-settings",
    action: "Sign out · not connected",
    domain: "Account",
    title: "Account settings",
    intro: "Your identity and account controls.",
    kind: "hub",
    links: [
      { title: "Edit reader profile", screen: "edit-profile" },
      { title: "Sign in", screen: "sign-in" },
      { title: "Privacy settings", screen: "privacy" },
      { title: "Data & account requests", screen: "account-data" },
    ],
    deferred:
      "You are a guest. Account updates and sign-out require authentication.",
  },
  {
    id: "account-data",
    domain: "Account",
    title: "Your account data",
    intro: "Access and manage the information associated with your account.",
    kind: "form",
    choices: [
      {
        label: "Request type",
        options: ["Export my data", "Delete my account"],
      },
    ],
    action: "Request · not connected",
    deferred:
      "No request is submitted and no data is exported or deleted. Identity verification and account services are required.",
  },
  {
    id: "collections",
    domain: "Library",
    title: "Your collections",
    intro: "Small shelves for your own reading worlds.",
    kind: "inbox",
    empty: {
      title: "A shelf of your own",
      body: "No saved collections exist. You can preview a collection's name, description and visibility before account storage is connected.",
    },
    links: [{ title: "New collection", screen: "collection-editor" }],
    deferred:
      "Collection saving and story membership require library services.",
  },
  {
    id: "collection-editor",
    domain: "Library",
    title: "Shape a collection",
    intro: "Give your next shelf a name.",
    kind: "form",
    fields: [
      { label: "Collection name", placeholder: "Rainy-day reading" },
      { label: "Description", multiline: true },
    ],
    choices: [{ label: "Visibility", options: ["Private", "Public"] }],
    empty: {
      title: "No stories selected",
      body: "Story selection and collection saving will connect to your eligible library catalog.",
    },
    action: "Save collection · not connected",
    deferred:
      "This editable form is a layout preview. No collection is saved or made public.",
  },
];
export const communityScreens: ExperienceSpec[] = [
  {
    id: "community",
    domain: "Community",
    title: "Between the pages",
    intro: "Meet through the stories that stay with you.",
    kind: "hub",
    links: [
      { title: "Your reader profile", screen: "reader-profile" },
      { title: "Following", screen: "following" },
      { title: "Story updates", screen: "updates" },
      { title: "Messages", screen: "messages" },
      { title: "Connections", screen: "connections" },
      { title: "Community standards", screen: "standards" },
    ],
    deferred:
      "Social accounts and activity are not connected. No followers, conversations or activity are fabricated.",
  },
  {
    id: "reader-profile",
    domain: "Community",
    title: "Reader profile",
    intro: "Your literary corner of MYTHRA.",
    kind: "hub",
    empty: {
      title: "Guest reader",
      body: "Sign in to build your profile, share collections and connect with other readers. No public account is loaded.",
    },
    links: [
      { title: "Edit profile preview", screen: "edit-profile" },
      { title: "Collections", screen: "collections" },
      { title: "Connections", screen: "connections" },
      { title: "Privacy", screen: "privacy" },
    ],
    deferred:
      "Public profiles and visibility enforcement require authenticated accounts.",
  },
  {
    id: "edit-profile",
    domain: "Community",
    title: "A little about you",
    intro: "Preview your reader identity. Changes are not saved.",
    kind: "form",
    fields: [
      { label: "Display name" },
      { label: "Bio", multiline: true },
      { label: "Website" },
    ],
    action: "Save profile · not connected",
    deferred:
      "Profile updates and avatar uploads require authenticated storage. No profile is published.",
  },
  {
    id: "creator-profile",
    domain: "Community",
    title: "Creator profile",
    intro: "The person behind the pages.",
    kind: "hub",
    links: [
      { title: "Follow creator · preview", screen: "following" },
      { title: "Creator subscription", screen: "creator-subscription" },
      { title: "Leave a tip", screen: "tip" },
      { title: "Report this profile", screen: "report" },
    ],
    deferred:
      "Profiles display eligible catalog works only. Bios, follower counts, subscriptions and following require creator account data.",
  },
  {
    id: "following",
    domain: "Community",
    title: "Following",
    intro: "Keep your favorite storytellers close.",
    kind: "inbox",
    choices: [{ label: "View", options: ["Creators", "Stories", "Readers"] }],
    empty: {
      title: "Your circle begins here",
      body: "Followed accounts and stories will appear after sign-in and social integration. No follows are recorded in this preview.",
    },
    links: [{ title: "Story updates", screen: "updates" }],
    deferred: "Follow actions and notifications are not connected.",
  },
  {
    id: "updates",
    domain: "Community",
    title: "Fresh from your shelf",
    intro: "New chapters and notes from creators you follow.",
    kind: "inbox",
    choices: [
      { label: "Show", options: ["All updates", "Chapters", "Creator notes"] },
    ],
    empty: {
      title: "No updates yet",
      body: "Your followed stories will bring their newest chapters here. No account or update feed is connected.",
    },
    links: [{ title: "Following", screen: "following" }],
    deferred: "Personalized update feeds are deferred.",
  },
  {
    id: "comments",
    domain: "Community",
    title: "Chapter discussion",
    intro: "A thoughtful place to talk about this chapter.",
    kind: "inbox",
    choices: [{ label: "Sort", options: ["Recent", "Oldest"] }],
    empty: {
      title: "No connected discussion",
      body: "Chapter comments will appear here when community services are available. No sample comments are presented as real readers.",
    },
    fields: [
      {
        label: "Comment draft",
        multiline: true,
        placeholder: "What stayed with you?",
      },
    ],
    toggles: ["Contains spoilers"],
    action: "Post comment · not connected",
    links: [
      { title: "Replies design", screen: "replies" },
      { title: "Report a concern", screen: "report" },
    ],
    deferred:
      "Comments, spoiler controls and moderation require authenticated services. Your draft is not sent.",
  },
  {
    id: "replies",
    domain: "Community",
    title: "In conversation",
    intro: "Replies stay with the comment they belong to.",
    kind: "inbox",
    empty: {
      title: "No thread selected",
      body: "A real parent comment and its replies will appear here. There is no connected discussion thread in this preview.",
    },
    fields: [{ label: "Reply draft", multiline: true }],
    action: "Send reply · not connected",
    deferred:
      "No reply is sent. Thread identity, moderation and notifications are deferred.",
  },
  {
    id: "reviews",
    domain: "Community",
    title: "Reader voices",
    intro: "Ratings, thoughtful reviews and reader-submitted spice levels.",
    kind: "inbox",
    choices: [{ label: "Sort", options: ["Recent", "Highest rated"] }],
    links: [{ title: "Write a review", screen: "write-review" }],
    deferred:
      "Only story-scoped development reviews may appear. Publishing reviews requires authentication and moderation.",
  },
  {
    id: "write-review",
    domain: "Community",
    title: "Leave a little ink",
    intro: "Help another reader find their next story.",
    kind: "form",
    choices: [
      { label: "Your rating", options: ["1 ★", "2 ★", "3 ★", "4 ★", "5 ★"] },
      {
        label: "Spice rating · optional",
        options: ["Not rated", "0", "1", "2", "3", "4", "5"],
      },
    ],
    fields: [
      { label: "Review title" },
      { label: "Your review", multiline: true },
    ],
    toggles: ["Contains spoilers"],
    action: "Publish review · not connected",
    deferred:
      "No rating or review is submitted or added to story totals. Review storage and moderation are deferred.",
  },
  {
    id: "messages",
    domain: "Community",
    title: "Private messages",
    intro: "Thoughtful conversations, at your own pace.",
    kind: "inbox",
    fields: [{ label: "Search conversations" }],
    empty: {
      title: "No conversations yet",
      body: "Messages will be available after account, connection and privacy services are connected.",
    },
    links: [
      { title: "New conversation preview", screen: "conversation" },
      { title: "Message privacy", screen: "privacy" },
    ],
    deferred: "There is no messaging backend and no messages are sent.",
  },
  {
    id: "conversation",
    domain: "Community",
    title: "New conversation",
    intro: "A private note starts with a connection.",
    kind: "form",
    fields: [
      { label: "Recipient", placeholder: "Connected reader or creator" },
      { label: "Message draft", multiline: true },
    ],
    empty: {
      title: "No recipient verified",
      body: "Connection eligibility and recipient consent must be checked before delivery.",
    },
    action: "Send message · not connected",
    links: [
      { title: "Connections", screen: "connections" },
      { title: "Block or report", screen: "report" },
    ],
    deferred: "No message is sent and no conversation is created.",
  },
  {
    id: "connections",
    domain: "Community",
    title: "Your connections",
    intro: "A smaller circle for shared reading worlds.",
    kind: "inbox",
    choices: [{ label: "View", options: ["Connected", "Requests", "Sent"] }],
    empty: {
      title: "No connections loaded",
      body: "Connection requests and accepted accounts will appear here once social services are connected.",
    },
    links: [
      { title: "Privacy settings", screen: "privacy" },
      { title: "Blocked accounts", screen: "blocked" },
    ],
    deferred: "No connection requests are created or accepted.",
  },
  {
    id: "blocked",
    domain: "Community",
    title: "Blocked accounts",
    intro: "Keep your reading space comfortable.",
    kind: "inbox",
    empty: {
      title: "No block list connected",
      body: "Your blocked accounts will appear here after sign-in. A blank preview does not represent the state of a real account.",
    },
    links: [{ title: "Block or report an account", screen: "report" }],
    deferred: "Blocking and server-enforced restrictions are deferred.",
  },
  {
    id: "report",
    domain: "Community",
    title: "Let us know",
    intro: "Help keep MYTHRA considerate and safe.",
    kind: "form",
    fields: [
      { label: "Story, comment or account link" },
      { label: "Additional details", multiline: true },
    ],
    choices: [
      {
        label: "Reason",
        options: [
          "Harassment",
          "Content classification",
          "Copyright",
          "Spam",
          "Other",
        ],
      },
    ],
    toggles: ["Also request to block this account"],
    action: "Submit report · not connected",
    deferred:
      "No report or block is submitted. Reporting and moderation services are not connected.",
  },
  {
    id: "standards",
    domain: "Community",
    title: "Read with care",
    intro: "A community built on respect for readers and creators.",
    kind: "hub",
    notes: [
      "Respect identities, languages and personal boundaries.",
      "Mark spoilers and content warnings thoughtfully.",
      "Share only work you own or are authorized to publish.",
      "Use reports for harassment, rights concerns and unsafe content. This draft is not a finalized legal policy.",
    ],
    links: [
      { title: "Report a concern", screen: "report" },
      { title: "Privacy preferences", screen: "privacy" },
    ],
    deferred:
      "Final community policies, appeals and enforcement workflows require policy and moderation review.",
  },
];
export const experienceScreens: ExperienceSpec[] = [
  ...accountScreens,
  ...communityScreens,
  ...studioScreens,
  ...businessScreens,
  ...reviewScreens,
];
export function experienceScreen(id: string) {
  return experienceScreens.find((screen) => screen.id === id);
}
