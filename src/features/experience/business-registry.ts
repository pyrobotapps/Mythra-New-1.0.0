import type { ExperienceSpec } from "./registry";
export const businessScreens: ExperienceSpec[] = [
  {
    id: "membership",
    domain: "Membership",
    title: "A little more MYTHRA",
    intro: "MYTHRA+ · a considered home for deeper reading.",
    kind: "offer",
    choices: [{ label: "Plan preview", options: ["Monthly", "Annual"] }],
    notes: [
      "Planned membership benefits · final entitlements require product approval",
      "A more personal reading experience",
      "Member collections and selected extras",
      "Pricing, regional availability and renewal terms are not set",
    ],
    action: "Membership · not available",
    links: [{ title: "Manage subscriptions", screen: "subscriptions" }],
    deferred:
      "There is no purchasable plan, trial, checkout or subscription activation. Store billing, terms and entitlement services are deferred.",
  },
  {
    id: "creator-subscription",
    domain: "Membership",
    title: "Stay close to the story",
    intro: "Creator subscriptions · support a voice you love.",
    kind: "offer",
    empty: {
      title: "No creator plan loaded",
      body: "A creator's verified offer, benefits, pricing and renewal terms will appear here when subscriptions are available.",
    },
    notes: [
      "Subscriber chapters, if offered, will remain subject to content and access policies.",
      "No benefits or popularity are attributed to a creator in this preview.",
    ],
    action: "Subscribe · not available",
    links: [{ title: "Subscription management", screen: "subscriptions" }],
    deferred:
      "No subscription is created or billed. Creator plans, store purchases and entitlement verification are deferred.",
  },
  {
    id: "tip",
    domain: "Creator support",
    title: "A note of appreciation",
    intro: "Tips · a little encouragement for the next chapter.",
    kind: "form",
    fields: [
      {
        label: "Amount preview",
        placeholder: "No currency or payment method configured",
      },
      { label: "Optional note", multiline: true },
    ],
    notes: [
      "No payment details are collected. Pricing, currencies, platform fees and creator eligibility must be reviewed before launch.",
    ],
    action: "Tip · not available",
    deferred:
      "No tip is charged, sent or credited. Payment processing, consent and creator eligibility are deferred.",
  },
  {
    id: "wallet",
    domain: "Purchases",
    title: "Your reading extras",
    intro: "Memberships, creator support and paid chapters in one place.",
    kind: "hub",
    empty: {
      title: "No wallet connected",
      body: "Coin balance — · purchase history is unavailable. No invented balance or free credits are displayed.",
    },
    links: [
      { title: "MYTHRA+", screen: "membership" },
      { title: "Subscriptions", screen: "subscriptions" },
      { title: "Coins & paid content", screen: "coins" },
      { title: "Purchase history", screen: "purchases" },
    ],
    deferred:
      "Purchases, balances and entitlements require verified billing services.",
  },
  {
    id: "coins",
    domain: "Purchases",
    title: "Unlock the next chapter",
    intro: "Paid content and coins · architecture preview.",
    kind: "offer",
    empty: {
      title: "No paid offer available",
      body: "A chapter's price, access terms and verified balance will appear here before any purchase is offered. No coin packages or prices have been invented.",
    },
    action: "Unlock · not available",
    links: [{ title: "Purchase history", screen: "purchases" }],
    deferred:
      "No coins are purchased or spent and no chapter is unlocked. Mobile billing policies, pricing and access verification are deferred.",
  },
  {
    id: "subscriptions",
    domain: "Purchases",
    title: "Your subscriptions",
    intro: "Clear terms, thoughtful control.",
    kind: "inbox",
    choices: [{ label: "View", options: ["Active", "Expired"] }],
    empty: {
      title: "No subscriptions loaded",
      body: "Verified MYTHRA+ and creator subscriptions will show plan, renewal date and management actions here. This is not a real account's subscription status.",
    },
    links: [
      { title: "Explore MYTHRA+", screen: "membership" },
      { title: "Billing help", screen: "billing-help" },
    ],
    deferred:
      "Subscription management and cancellation need verified store billing connections.",
  },
  {
    id: "purchases",
    domain: "Purchases",
    title: "Purchase history",
    intro: "A clear record of reading extras.",
    kind: "inbox",
    empty: {
      title: "No transaction service connected",
      body: "Receipts and purchase status will appear from verified transactions only.",
    },
    links: [{ title: "Billing help", screen: "billing-help" }],
    deferred:
      "Receipt verification, refunds and purchase history are deferred.",
  },
  {
    id: "billing-help",
    domain: "Purchases",
    title: "Billing help",
    intro: "Support for memberships, coins and creator purchases.",
    kind: "form",
    choices: [
      {
        label: "Topic",
        options: ["Subscription", "Purchase", "Refund", "Other"],
      },
    ],
    fields: [
      { label: "Order reference · preview" },
      { label: "Your question", multiline: true },
    ],
    action: "Contact billing support · not connected",
    deferred:
      "No support request is sent. Final billing policies and support integrations are deferred.",
  },
  {
    id: "earnings",
    domain: "Creator business",
    title: "Your creative livelihood",
    intro: "An honest picture of what your work earns.",
    kind: "insights",
    choices: [
      { label: "Period", options: ["This month", "Last month", "All time"] },
    ],
    notes: [
      "Gross earnings —",
      "Platform fees —",
      "Available for payout —",
      "No financial figures are simulated.",
    ],
    empty: {
      title: "No earnings ledger connected",
      body: "Verified subscriptions, tips and chapter purchases will populate a breakdown and transaction ledger here.",
    },
    links: [
      { title: "Payout settings", screen: "payout" },
      { title: "Earnings statements", screen: "statements" },
    ],
    deferred:
      "Earnings calculations, settlement, tax reporting and payout execution are deferred.",
  },
  {
    id: "payout",
    domain: "Creator business",
    title: "Payout settings",
    intro: "Your earnings, handled with care.",
    kind: "hub",
    notes: [
      "Identity verification · not connected",
      "Tax information · not connected",
      "Payout destination · not connected",
      "Payout schedule · not configured",
    ],
    action: "Set up payouts · not available",
    links: [{ title: "Earnings", screen: "earnings" }],
    deferred:
      "No bank, tax or identity credentials are collected in this preview. A secure provider and verified creator account are required.",
  },
  {
    id: "statements",
    domain: "Creator business",
    title: "Earnings statements",
    intro: "A record for every settled period.",
    kind: "inbox",
    empty: {
      title: "No statements available",
      body: "Statements will show verified revenue, fees, adjustments and payouts. There is no connected financial ledger.",
    },
    action: "Export statement · not available",
    deferred:
      "No document is generated. Verified accounting data and creator permissions are required.",
  },
  {
    id: "admin",
    domain: "Administration",
    title: "Care for the community",
    intro: "Owner and moderation workspace · design preview only.",
    kind: "hub",
    notes: [
      "No administrator role or permission is granted by opening this page.",
      "All future data and operations require server-enforced authorization.",
    ],
    empty: {
      title: "Restricted workspace · no data connected",
      body: "Operational metrics, queues and audit history remain unavailable to this guest preview.",
    },
    links: [
      { title: "Moderation queue", screen: "moderation" },
      { title: "Reports", screen: "reports" },
      { title: "Content management", screen: "content-management" },
      { title: "Audit history", screen: "audit" },
    ],
    deferred:
      "Role verification, operational data and all administrative mutations are deferred.",
  },
  {
    id: "moderation",
    domain: "Administration",
    title: "Moderation queue",
    intro: "Consistent decisions with a clear record.",
    kind: "inbox",
    choices: [
      { label: "Queue", options: ["Pending", "In review", "Resolved"] },
      {
        label: "Content type",
        options: ["Stories", "Chapters", "Comments", "Profiles"],
      },
    ],
    empty: {
      title: "No authorized queue loaded",
      body: "Submitted items, policy context and review history will appear here after role authorization. This is not an empty real queue.",
    },
    links: [{ title: "Moderation detail design", screen: "moderation-detail" }],
    deferred: "No moderation records or decisions are loaded or changed.",
  },
  {
    id: "moderation-detail",
    domain: "Administration",
    title: "Review with context",
    intro:
      "A measured decision, with a reason readers and creators can understand.",
    kind: "form",
    empty: {
      title: "No item selected",
      body: "The original content, classification, reports, creator response and prior decisions will appear for an authorized item.",
    },
    choices: [
      {
        label: "Decision preview",
        options: ["Request changes", "Approve", "Restrict", "Escalate"],
      },
    ],
    fields: [
      { label: "Policy reference" },
      { label: "Decision rationale", multiline: true },
    ],
    action: "Record decision · not connected",
    deferred:
      "No content is approved, restricted or removed. Authorization, appeal notices and immutable audit logging are deferred.",
  },
  {
    id: "reports",
    domain: "Administration",
    title: "Reported concerns",
    intro: "Every concern deserves a considered response.",
    kind: "inbox",
    choices: [
      { label: "Status", options: ["Open", "Assigned", "Resolved"] },
      {
        label: "Reason",
        options: ["All", "Harassment", "Copyright", "Classification", "Spam"],
      },
    ],
    empty: {
      title: "No report data authorized",
      body: "Report context, assignment and resolution status will be visible to authorized moderators only.",
    },
    links: [{ title: "Report detail design", screen: "moderation-detail" }],
    deferred:
      "Report access, assignment and resolution require administrative services.",
  },
  {
    id: "content-management",
    domain: "Administration",
    title: "Catalog oversight",
    intro: "Publication, visibility and rights in one considered view.",
    kind: "inbox",
    fields: [{ label: "Search managed content" }],
    choices: [
      {
        label: "Status",
        options: ["All", "Published", "Pending", "Restricted", "Removed"],
      },
    ],
    empty: {
      title: "No managed catalog loaded",
      body: "Server-authorized stories, editions and publication controls will appear here. Public demo stories are not an administrative dataset.",
    },
    links: [{ title: "Review content design", screen: "moderation-detail" }],
    deferred:
      "Search and visibility mutations require authenticated administrative catalog access.",
  },
  {
    id: "audit",
    domain: "Administration",
    title: "Accountable decisions",
    intro: "A traceable record of administrative actions.",
    kind: "inbox",
    empty: {
      title: "No audit service connected",
      body: "Actor, time, action, reason and affected content will appear in a read-only authorized history.",
    },
    deferred:
      "Immutable audit collection and role-protected access are deferred.",
  },
];
