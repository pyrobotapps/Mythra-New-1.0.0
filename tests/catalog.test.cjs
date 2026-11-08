const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const assert = require("node:assert/strict");
const { test } = require("node:test");
const ts = require("typescript");
// Compile only the pure catalog boundary; no React Native runtime or network needed.
function load(file, dependencies = {}) {
  const filename = path.resolve(file);
  const mod = new Module(filename, module);
  mod.paths = module.paths;
  const nativeRequire = mod.require.bind(mod);
  mod.require = (id) => dependencies[id] ?? nativeRequire(id);
  mod._compile(
    ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
      },
    }).outputText,
    filename,
  );
  return mod.exports;
}
const data = load("src/data/stories.ts");
const catalog = load("src/services/catalog.ts", { "@/data/stories": data });
const find = (updates) =>
  catalog.searchCatalog({ ...catalog.emptyFilters, ...updates });
test("catalog and collection references are unique and valid", () => {
  assert.equal(
    new Set(data.stories.map((s) => s.id)).size,
    data.stories.length,
  );
  for (const c of catalog.collections) {
    assert.ok(c.ids.length > 0, c.key);
    assert.equal(new Set(c.ids).size, c.ids.length);
    assert.equal(catalog.collectionStories(c.key).length, c.ids.length);
  }
});
test("search includes tags, aliases, author and available language", () => {
  assert.ok(find({ query: "  M/M  " }).every((s) => s.relationship === "BL"));
  assert.ok(find({ query: "M/M" }).length > 0);
  assert.ok(find({ query: "found family" }).length > 0);
  assert.ok(find({ query: "Mira Sol" }).every((s) => s.author === "Mira Sol"));
  assert.equal(
    find({ query: "English" }).length,
    catalog.visibleStories.length,
  );
  assert.equal(find({ query: "not-a-story" }).length, 0);
});
test("multiple values OR within dimensions and AND across dimensions", () => {
  const result = find({
    relationships: ["BL", "GL"],
    formats: ["Novel", "Toon"],
    genres: ["Romance", "Fantasy"],
  });
  assert.ok(result.length > 1);
  assert.ok(
    result.every(
      (s) =>
        ["BL", "GL"].includes(s.relationship) &&
        ["Novel", "Toon"].includes(s.format) &&
        ["Romance", "Fantasy"].includes(s.genre),
    ),
  );
});
test("classification, status, language and access actually constrain results", () => {
  assert.ok(
    find({
      classification: "Safe",
      status: "Complete",
      language: "English",
      access: "Free",
    }).every((s) => s.classification === "Safe" && s.status === "Complete"),
  );
  assert.equal(find({ language: "Korean" }).length, 0);
  assert.equal(find({ access: "Paid" }).length, 0);
  assert.equal(find({ classification: "Pornographic" }).length, 0);
  assert.equal(find({ classification: "Erotica" }).length, 0);
  assert.ok(find({ status: "Hiatus" }).length > 0);
});
test("inclusive relationships and long titles are represented without duplicate editions", () => {
  for (const r of catalog.relationships)
    assert.ok(find({ relationships: [r] }).length > 0, r);
  assert.ok(data.stories.some((s) => s.title.length > 45));
  assert.ok(
    data.stories.every(
      (s) => s.languages.length === 1 && s.languages[0] === "English",
    ),
  );
  assert.deepEqual(catalog.toggleSelection(["BL"], "GL"), ["BL", "GL"]);
  assert.deepEqual(catalog.toggleSelection(["BL", "GL"], "BL"), ["GL"]);
});

const { themes } = load("src/theme/index.tsx", {
  "react-native": { Platform: { OS: "ios" } },
  "@react-native-async-storage/async-storage": { default: {} },
});
function luminance(hex) {
  const rgb = hex
    .slice(1)
    .match(/../g)
    .map((c) => parseInt(c, 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}
function contrast(a, b) {
  const x = luminance(a),
    y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
test("all six palettes maintain readable text and action contrast", () => {
  assert.equal(Object.keys(themes).length, 6);
  for (const [id, t] of Object.entries(themes)) {
    for (const bg of [t.bg, t.surface])
      for (const fg of [t.text, t.muted, t.accent])
        assert.ok(contrast(bg, fg) >= 4.5, `${id} ${bg} / ${fg}`);
    assert.ok(contrast(t.bg, t.accent) >= 4.5, id + " selected button");
  }
});
const { plannedLanguages } = load("src/models/catalog.ts");
test("planned languages retain distinct Unicode labels without inventing editions", () => {
  assert.equal(plannedLanguages.length, 8);
  assert.equal(new Set(plannedLanguages.map((l) => l.code)).size, 8);
  assert.deepEqual(
    plannedLanguages
      .filter((l) => ["ko", "ja", "zh-Hans"].includes(l.code))
      .map((l) => l.compact),
    ["한국어", "日本語", "简体中文"],
  );
});

const details = load("src/services/story-details.ts", {
  "@/data/stories": data,
});
test("story details begins with 15 newest chapters and can reverse the order without mutating data", () => {
  const chapters = details.getPreviewChapters("moonlit-vow");
  assert.equal(chapters.length, 24);
  const newest = details.sortChapters(chapters, true).slice(0, 15);
  assert.deepEqual(
    newest.map((c) => c.number),
    Array.from({ length: 15 }, (_, i) => 24 - i),
  );
  assert.equal(details.sortChapters(chapters, false)[0].number, 1);
  assert.equal(chapters[0].number, 1);
  assert.ok(
    chapters.every(
      (c) =>
        !c.read &&
        c.access === "Free" &&
        !Number.isNaN(Date.parse(c.publishedAt)),
    ),
  );
  assert.equal(details.chapterDate(chapters[0].publishedAt), "Oct 1, 2026");
  assert.notEqual(
    details.getPreviewChapters("garden-of-us")[0].id,
    chapters[0].id,
  );
});
test("review summary and spice ratings derive from preview readers", () => {
  assert.equal(details.reviewSummary.count, details.previewReviews.length);
  assert.equal(
    details.reviewSummary.average,
    details.previewReviews.reduce((sum, r) => sum + r.rating, 0) /
      details.previewReviews.length,
  );
  assert.equal(
    details.reviewSummary.spice,
    details.previewReviews.reduce((sum, r) => sum + r.spice, 0) /
      details.previewReviews.length,
  );
  assert.ok(
    details.previewReviews.every(
      (r) => r.reader && r.spice >= 0 && r.spice <= 5,
    ),
  );
});
