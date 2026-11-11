const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const assert = require("node:assert/strict");
const { test } = require("node:test");
const ts = require("typescript");
const cache = new Map();
function load(file) {
  const filename = path.resolve(file);
  if (cache.has(filename)) return cache.get(filename);
  const mod = new Module(filename, module);
  mod.paths = module.paths;
  const original = mod.require.bind(mod);
  mod.require = (id) =>
    id.startsWith(".")
      ? load(path.resolve(path.dirname(filename), id + ".ts"))
      : original(id);
  mod._compile(
    ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText,
    filename,
  );
  cache.set(filename, mod.exports);
  return mod.exports;
}
const { experienceScreens } = load("src/features/experience/registry.ts");
const byId = new Map(experienceScreens.map((spec) => [spec.id, spec]));
test("all secondary destinations resolve and every design is reachable from an app hub", () => {
  assert.equal(byId.size, experienceScreens.length, "duplicate route key");
  for (const spec of experienceScreens) {
    assert.ok(spec.title && spec.intro && spec.deferred, spec.id);
    for (const link of spec.links ?? [])
      assert.ok(byId.has(link.screen), `${spec.id} -> ${link.screen}`);
  }
  const visited = new Set();
  function visit(id) {
    if (visited.has(id)) return;
    assert.ok(byId.has(id), id);
    visited.add(id);
    for (const link of byId.get(id).links ?? []) visit(link.screen);
  }
  for (const id of [
    "experience-map",
    "sign-in",
    "collection-editor",
    "report",
    "notifications",
    "super-like",
  ])
    visit(id);
  assert.deepEqual(
    experienceScreens
      .filter((spec) => !visited.has(spec.id))
      .map((spec) => spec.id),
    [],
  );
});
test("expanded Phase 1 covers every requested secondary capability without hidden omissions", () => {
  const required = [
    "collections",
    "collection-editor",
    "studio",
    "my-stories",
    "new-story",
    "edit-story",
    "chapter-editor",
    "chapter-management",
    "schedule",
    "toon-upload",
    "translation-editions",
    "collaborators",
    "analytics",
    "earnings",
    "creator-profile",
    "reader-profile",
    "following",
    "updates",
    "notifications",
    "comments",
    "replies",
    "reviews",
    "write-review",
    "messages",
    "conversation",
    "connections",
    "blocked",
    "report",
    "sign-in",
    "register",
    "content-preferences",
    "mature-access",
    "languages",
    "themes",
    "reading-preferences",
    "privacy",
    "notification-settings",
    "membership",
    "creator-subscription",
    "tip",
    "coins",
    "payout",
    "admin",
    "moderation",
    "reports",
    "content-management",
    "editions",
    "translator-profile",
    "translation-collaboration",
    "translator-marketplace",
    "super-like",
    "promotions",
    "drawing-studio",
  ];
  required.forEach((id) => assert.ok(byId.has(id), id));
});
test("transactional, social and publishing design actions declare unavailable integrations", () => {
  for (const spec of experienceScreens.filter((spec) => spec.action)) {
    assert.match(spec.action, /not (connected|available)/i, spec.id);
    assert.ok(spec.deferred.trim(), spec.id);
  }
  const payout = byId.get("payout");
  assert.equal(
    payout.fields,
    undefined,
    "Do not collect real payout credentials in a preview",
  );
});

const policy = load("src/features/experience/policy.ts");
test("business and administration previews stay out of release builds", () => {
  for (const domain of [
    "Membership",
    "Purchases",
    "Creator support",
    "Creator business",
    "Administration",
    "Phase 1",
  ]) {
    assert.equal(policy.canOpenExperience(domain, false), false);
    assert.equal(policy.canOpenExperience(domain, true), true);
  }
  assert.equal(policy.canOpenExperience("Preferences", false), true);
});
test("single and multiple preview choices preserve independent preferences without mutating input", () => {
  const initial = ["GL", "No Romance"];
  assert.deepEqual(policy.updateSelection(initial, "GL", true), ["No Romance"]);
  assert.deepEqual(policy.updateSelection(initial, "BL", true), [
    "GL",
    "No Romance",
    "BL",
  ]);
  assert.deepEqual(policy.updateSelection(initial, "M/F"), ["M/F"]);
  assert.deepEqual(initial, ["GL", "No Romance"]);
});

const readerPolicy = load("src/features/experience/reader-policy.ts");
test("reader deep links preserve late chapters and handle invalid or absent chapter content", () => {
  const available = Array.from({ length: 24 }, (_, i) => i + 1);
  assert.equal(readerPolicy.selectedChapter("24", available), 24);
  assert.equal(readerPolicy.selectedChapter("16", available), 16);
  for (const value of [undefined, "-3", "1.5", "Infinity", "invalid", "999"]) {
    assert.equal(readerPolicy.selectedChapter(value, available), 1);
  }
  assert.equal(readerPolicy.selectedChapter("1", []), null);
});
