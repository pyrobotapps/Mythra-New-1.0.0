import type { ExperienceSpec } from "./registry";
export const reviewScreens: ExperienceSpec[] = [
  {
    id: "experience-map",
    domain: "Phase 1",
    title: "The MYTHRA experience",
    intro:
      "A design review map. New screens await your approval; no later development phase has started.",
    kind: "hub",
    links: [
      { title: "Reading preferences", screen: "reading-preferences" },
      { title: "Library collections", screen: "collections" },
      { title: "Accounts & settings", screen: "settings" },
      { title: "Community", screen: "community" },
      { title: "Reader reviews", screen: "reviews" },
      { title: "Creator profile", screen: "creator-profile" },
      { title: "Creator Studio", screen: "studio" },
      { title: "Language editions", screen: "editions" },
      { title: "Translation marketplace", screen: "translator-marketplace" },
      { title: "Memberships & paid content", screen: "wallet" },
      { title: "Creator earnings", screen: "earnings" },
      { title: "Administration", screen: "admin" },
    ],
    deferred:
      "This map organizes secondary routes without changing the approved Home and Discover compositions. Review and integration status is tracked in docs/phase-1-screen-inventory.md.",
  },
  {
    id: "notifications",
    domain: "Community",
    title: "Notifications",
    intro: "The chapters and conversations that matter to you.",
    kind: "inbox",
    choices: [
      {
        label: "Show",
        options: ["All", "Story updates", "Community", "Account"],
      },
    ],
    empty: {
      title: "Nothing to catch up on yet",
      body: "No notification service is connected. No unread counts or reader activity are simulated.",
    },
    links: [
      { title: "Story updates", screen: "updates" },
      { title: "Notification preferences", screen: "notification-settings" },
      { title: "Connections", screen: "connections" },
    ],
    deferred:
      "Notification delivery, read state and unread indicators are deferred.",
  },
  {
    id: "super-like",
    domain: "Community",
    title: "A little extra love",
    intro: "Super Likes · a special moment of appreciation.",
    kind: "offer",
    empty: {
      title: "Not available yet",
      body: "Eligibility, limits and any pricing or benefits must be finalized before this can be offered. No activity count is invented.",
    },
    action: "Super Like · not connected",
    deferred: "No Super Like is recorded and nothing is purchased or deducted.",
  },
  {
    id: "promotions",
    domain: "Creator Studio",
    title: "Give your story a stage",
    intro: "Creator promotional tools · planned architecture.",
    kind: "form",
    fields: [
      { label: "Promotion title" },
      { label: "Creator announcement", multiline: true },
    ],
    choices: [
      {
        label: "Placement preview",
        options: ["Creator profile", "Follower update"],
      },
    ],
    action: "Publish promotion · not connected",
    deferred:
      "Promotions, advertising, audience eligibility and sponsored placements require review and backend services. No announcement or campaign is published.",
  },
  {
    id: "drawing-studio",
    domain: "Creator Studio",
    title: "A future canvas",
    intro: "Built-in drawing and creation tools · longer-term roadmap.",
    kind: "hub",
    notes: [
      "Drawing tools are not part of this implementation. No fake canvas is offered.",
      "The current publishing design accepts creator-owned artwork through a future upload pipeline.",
    ],
    links: [{ title: "Toon upload design", screen: "toon-upload" }],
    deferred:
      "Drawing, layer editing and export are deferred to a later scoped design and implementation review.",
  },
];
