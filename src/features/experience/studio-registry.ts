import type { ExperienceSpec } from "./registry";
const publishingBoundary =
  "This is an unsaved editing preview. Publishing, file storage, rights verification and moderation are not connected; no story or chapter is created.";
export const studioScreens: ExperienceSpec[] = [
  {
    id: "chapter-management",
    domain: "Creator Studio",
    title: "Chapter by chapter",
    intro: "A clear view of each edition's publication sequence.",
    kind: "inbox",
    choices: [
      { label: "Status", options: ["Draft", "Published", "Scheduled"] },
    ],
    empty: {
      title: "No saved chapters loaded",
      body: "A selected story's chapters will show number, edition, status and release time. Reordering will require a saved story and publishing permissions.",
    },
    links: [
      { title: "New chapter", screen: "chapter-editor" },
      { title: "Schedule a release", screen: "schedule" },
      { title: "Upload toon episode", screen: "toon-upload" },
    ],
    deferred:
      "Chapter listing, reorder, editing and publication changes require an authenticated creator workspace.",
  },

  {
    id: "studio",
    domain: "Creator Studio",
    title: "Your writing room",
    intro: "One place for your worlds, chapters and creative collaborators.",
    kind: "hub",
    empty: {
      title: "A blank page, full of possibility",
      body: "No authenticated creator workspace is loaded. Start with a story form preview or explore the publishing tools.",
    },
    links: [
      { title: "My stories", screen: "my-stories" },
      { title: "New story", screen: "new-story" },
      { title: "Manage chapters", screen: "chapter-management" },
      { title: "Chapter editor", screen: "chapter-editor" },
      { title: "Publishing schedule", screen: "schedule" },
      { title: "Toon upload", screen: "toon-upload" },
      { title: "Translation editions", screen: "translation-editions" },
      { title: "Collaborators", screen: "collaborators" },
      { title: "Analytics", screen: "analytics" },
      { title: "Promotional tools", screen: "promotions" },
      { title: "Future drawing studio", screen: "drawing-studio" },
      { title: "Earnings", screen: "earnings" },
    ],
    deferred: publishingBoundary,
  },
  {
    id: "my-stories",
    domain: "Creator Studio",
    title: "Your stories",
    intro: "Drafts and published works, thoughtfully organized.",
    kind: "inbox",
    choices: [
      {
        label: "Status",
        options: ["All", "Drafts", "Published", "Scheduled", "Completed"],
      },
    ],
    empty: {
      title: "No creator stories loaded",
      body: "The demo reading catalog does not belong to you. Your authenticated works will appear here once publishing services are connected.",
    },
    links: [
      { title: "New story", screen: "new-story" },
      { title: "Edit story form preview", screen: "edit-story" },
    ],
    deferred: publishingBoundary,
  },
  ...["new-story", "edit-story"].map((id): ExperienceSpec => ({
    id,
    domain: "Creator Studio",
    title: id === "new-story" ? "A new world" : "Refine your story",
    intro: "Set the first impression: title, cover and the promise of a story.",
    kind: "form",
    fields: [
      { label: "Story title" },
      { label: "Synopsis", multiline: true },
      { label: "Descriptive tags", placeholder: "Found family, slow burn…" },
      { label: "Creator credits", multiline: true },
    ],
    choices: [
      { label: "Format", options: ["Novel", "Toon", "Short Story"] },
      {
        label: "Original language",
        options: [
          "English",
          "한국어",
          "日本語",
          "简体中文",
          "RU",
          "ไทย",
          "VI",
          "ES",
        ],
      },
      {
        label: "Genre",
        multiple: true,
        options: [
          "Fantasy",
          "Romance",
          "Mystery",
          "Drama",
          "Action",
          "Sci-Fi",
          "Slice of Life",
          "Other",
        ],
      },
      {
        label: "Relationship",
        options: ["BL", "GL", "M/F", "Other", "Multiple / Poly", "No Romance"],
      },
      {
        label: "Classification",
        options: ["Safe", "Suggestive", "Erotica", "Pornographic"],
      },
      {
        label: "Publication status",
        options: ["Draft", "Ongoing", "Completed"],
      },
    ],
    notes: [
      "Cover artwork slot · upload is not connected.",
      "Restricted classifications can be described in the design, but never become eligible for the mobile catalog through this form.",
    ],
    toggles: ["I own or have permission to publish this work"],
    links: [
      { title: "Chapter editor", screen: "chapter-editor" },
      { title: "Toon pages", screen: "toon-upload" },
      { title: "Edition management", screen: "translation-editions" },
      { title: "Collaborator credits", screen: "collaborators" },
      { title: "Publication review", screen: "publish-review" },
    ],
    action: "Save draft · not connected",
    deferred: publishingBoundary,
  })),
  {
    id: "chapter-editor",
    domain: "Creator Studio",
    title: "The next chapter",
    intro: "Room for the words and the notes that accompany them.",
    kind: "form",
    fields: [
      {
        label: "Story selection",
        placeholder: "No authenticated stories loaded",
      },
      { label: "Chapter title" },
      { label: "Chapter text", multiline: true },
      { label: "Author's note", multiline: true },
    ],
    choices: [
      {
        label: "Chapter access",
        options: ["Free", "Paid · planned", "Subscriber · planned"],
      },
    ],
    links: [
      { title: "Schedule chapter", screen: "schedule" },
      { title: "Review before publishing", screen: "publish-review" },
      { title: "Chapter comments", screen: "comments" },
    ],
    action: "Save chapter · not connected",
    deferred: publishingBoundary,
  },
  {
    id: "schedule",
    domain: "Creator Studio",
    title: "At the right moment",
    intro: "Plan when the next chapter meets its readers.",
    kind: "form",
    fields: [
      { label: "Chapter", placeholder: "No saved chapter selected" },
      { label: "Publication date", placeholder: "YYYY-MM-DD" },
      { label: "Publication time", placeholder: "HH:MM" },
      { label: "Time zone", placeholder: "e.g. America/New_York" },
    ],
    choices: [
      {
        label: "Release plan",
        options: ["Manual publication", "Scheduled release"],
      },
    ],
    notes: [
      "A saved, approved chapter and a valid time zone will be required before scheduling. No calendar event or queued release is created in this preview.",
    ],
    action: "Schedule · not connected",
    deferred:
      "Scheduling, time validation, queue processing and notifications require publishing services.",
  },
  {
    id: "toon-upload",
    domain: "Creator Studio",
    title: "Stories in frames",
    intro: "Arrange a chapter for smooth vertical reading.",
    kind: "form",
    fields: [
      { label: "Episode title" },
      { label: "Accessible episode description", multiline: true },
    ],
    empty: {
      title: "Page sequence",
      body: "Uploaded artwork will appear as an ordered vertical strip with reorder and remove controls. No files are currently selected or uploaded.",
    },
    action: "Choose artwork · not connected",
    links: [
      { title: "Publication review", screen: "publish-review" },
      { title: "Chapter scheduling", screen: "schedule" },
    ],
    notes: [
      "Batch artwork upload and ZIP import are planned where supported. File format, dimensions and size limits will be specified with the storage pipeline. No pretend upload progress or preview pages are shown.",
    ],
    deferred: publishingBoundary,
  },
  {
    id: "publish-review",
    domain: "Creator Studio",
    title: "Before the first reader",
    intro: "A clear final review before publication.",
    kind: "hub",
    notes: [
      "Story metadata · no saved story selected",
      "Rights and creator credits · verification pending",
      "Classification and warnings · not reviewed",
      "Language edition and chapter access · not configured",
      "Publication timing · not scheduled",
    ],
    links: [
      { title: "Story metadata", screen: "edit-story" },
      { title: "Creator credits", screen: "collaborators" },
      { title: "Schedule", screen: "schedule" },
    ],
    action: "Submit for publication · not connected",
    deferred: publishingBoundary,
  },
  {
    id: "collaborators",
    domain: "Creator Studio",
    title: "Made together",
    intro: "Clear roles, thoughtful credits and shared creative work.",
    kind: "inbox",
    empty: {
      title: "No team loaded",
      body: "Verified collaborators and pending invitations will appear here for a selected story.",
    },
    fields: [{ label: "Collaborator account or email" }],
    choices: [
      {
        label: "Role",
        options: ["Co-author", "Artist", "Editor", "Translator", "Letterer"],
      },
      {
        label: "Permissions preview",
        options: ["View only", "Edit assigned work"],
      },
    ],
    action: "Invite collaborator · not connected",
    links: [
      {
        title: "Translation collaboration",
        screen: "translation-collaboration",
      },
    ],
    deferred:
      "Invitations, consent, role permissions, revenue splits and credits require authenticated collaboration services. No invitation is sent.",
  },
  {
    id: "analytics",
    domain: "Creator Studio",
    title: "Your stories, in perspective",
    intro: "Understand readership without inventing it.",
    kind: "insights",
    choices: [
      { label: "Period", options: ["7 days", "30 days", "All time"] },
      { label: "Measure", options: ["Reads", "Completion", "Library adds"] },
    ],
    empty: {
      title: "No analytics source connected",
      body: "A readership trend chart, chapter retention table and edition breakdown will appear only when verified events are available.",
    },
    notes: [
      "Reads —",
      "Unique readers —",
      "Chapter completion —",
      "No sample activity is presented as genuine creator performance.",
    ],
    deferred:
      "Verified event collection, aggregation and creator permissions are deferred.",
  },
  {
    id: "translation-editions",
    domain: "Translation",
    title: "More ways into a world",
    intro:
      "Manage original and translated editions without duplicating stories.",
    kind: "inbox",
    empty: {
      title: "No creator editions loaded",
      body: "Each edition will show its language, translator credits, review status and chapter coverage.",
    },
    links: [
      { title: "Add an edition preview", screen: "edition-editor" },
      {
        title: "Translation collaboration",
        screen: "translation-collaboration",
      },
      { title: "Find a translator", screen: "translator-marketplace" },
    ],
    deferred:
      "Edition storage, rights, translation review and publishing are deferred.",
  },
  {
    id: "editions",
    domain: "Translation",
    title: "One story, many voices",
    intro:
      "Available languages belong to the original story, not separate duplicate listings.",
    kind: "inbox",
    empty: {
      title: "Choose a story edition",
      body: "Story Details lists only the languages available for that story. A language preference does not create a translation.",
    },
    links: [
      { title: "Translator marketplace", screen: "translator-marketplace" },
      { title: "Translator profile", screen: "translator-profile" },
    ],
    deferred:
      "Published translation content and verified translator credits require the edition catalog.",
  },
  {
    id: "edition-editor",
    domain: "Translation",
    title: "A new language edition",
    intro: "Respect the original work and the translator's voice.",
    kind: "form",
    fields: [
      { label: "Original story", placeholder: "No authorized story selected" },
      { label: "Localized title" },
      { label: "Localized synopsis", multiline: true },
      { label: "Translator credit" },
    ],
    choices: [
      {
        label: "Language",
        options: [
          "English",
          "한국어",
          "日本語",
          "简体中文",
          "RU",
          "ไทย",
          "VI",
          "ES",
        ],
      },
    ],
    toggles: ["Translation rights have been granted"],
    links: [
      { title: "Translation chapter editor", screen: "translation-editor" },
      {
        title: "Collaboration and review",
        screen: "translation-collaboration",
      },
    ],
    action: "Save edition · not connected",
    deferred:
      "No edition is created. Rights verification, chapter alignment and moderation are required.",
  },
  {
    id: "translation-editor",
    domain: "Translation",
    title: "Across the page",
    intro: "Keep translated chapters aligned with the source edition.",
    kind: "form",
    fields: [
      {
        label: "Source chapter",
        placeholder: "No authorized source chapter loaded",
      },
      { label: "Translated chapter title" },
      { label: "Translated text", multiline: true },
      { label: "Translator's note", multiline: true },
    ],
    action: "Save translation · not connected",
    links: [{ title: "Request review", screen: "translation-collaboration" }],
    deferred:
      "No source content, automatic translation or submitted translation is fabricated. Edition rights and storage are deferred.",
  },
  {
    id: "translation-collaboration",
    domain: "Translation",
    title: "In another voice",
    intro: "A shared workspace for creators and translators.",
    kind: "inbox",
    choices: [
      { label: "Work queue", options: ["Assigned", "In review", "Approved"] },
    ],
    empty: {
      title: "No assignments loaded",
      body: "Assigned chapters, translator notes and review history will appear for authorized collaborators.",
    },
    links: [
      { title: "Invite a translator", screen: "collaborators" },
      { title: "Translation editor", screen: "translation-editor" },
    ],
    action: "Request review · not connected",
    deferred:
      "Assignments, review decisions and translator permissions are deferred. Nothing is submitted.",
  },
  {
    id: "translator-profile",
    domain: "Translation",
    title: "A translator's voice",
    intro: "Language, nuance and the worlds between.",
    kind: "form",
    fields: [
      { label: "Translator display name" },
      { label: "About your work", multiline: true },
      { label: "Portfolio link" },
    ],
    choices: [
      {
        label: "Source languages",
        multiple: true,
        options: [
          "EN",
          "한국어",
          "日本語",
          "简体中文",
          "RU",
          "ไทย",
          "VI",
          "ES",
        ],
      },
      {
        label: "Target languages",
        multiple: true,
        options: [
          "EN",
          "한국어",
          "日本語",
          "简体中文",
          "RU",
          "ไทย",
          "VI",
          "ES",
        ],
      },
    ],
    action: "Save profile · not connected",
    links: [
      {
        title: "Translation collaboration",
        screen: "translation-collaboration",
      },
    ],
    deferred:
      "This is an editable self-profile design, not a real translator listing. Verification, portfolio storage and availability are deferred.",
  },
  {
    id: "translator-marketplace",
    domain: "Translation",
    title: "Find the right voice",
    intro: "Discover language collaborators with care.",
    kind: "inbox",
    fields: [{ label: "Search translators" }],
    choices: [
      {
        label: "From",
        options: [
          "EN",
          "한국어",
          "日本語",
          "简体中文",
          "RU",
          "ไทย",
          "VI",
          "ES",
        ],
      },
      {
        label: "To",
        options: [
          "EN",
          "한국어",
          "日本語",
          "简体中文",
          "RU",
          "ไทย",
          "VI",
          "ES",
        ],
      },
      { label: "Format", options: ["Novels", "Toons", "Short Stories"] },
    ],
    empty: {
      title: "No translator directory connected",
      body: "Verified profiles, language pairs and availability will appear here. No fictional translators or marketplace ratings are invented.",
    },
    links: [
      {
        title: "Your translator profile preview",
        screen: "translator-profile",
      },
      { title: "Collaboration workspace", screen: "translation-collaboration" },
    ],
    deferred:
      "Translator discovery, contact and contracts require account and marketplace services.",
  },
];
