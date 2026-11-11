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
const modeConfig = load("src/config/catalog-mode.ts");
const browsing = load("src/theme/browsing.ts");
const policy = load("src/services/discovery-policy.ts", {
  "@/theme/browsing": browsing,
});
const demoMode = { catalogMode: "demo", demoScenario: "mixed" };
const catalog = load("src/services/catalog.ts", {
  "@/data/stories": data,
  "@/config/catalog-mode": demoMode,
  "@/services/discovery-policy": policy,
});
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

const visual = load("src/theme/visual.ts");
const { themes } = load("src/theme/index.tsx", {
  "./visual": visual,
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
  "@/config/catalog-mode": demoMode,
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
test("review fixtures belong only to their explicit story", () => {
  const moonlit = details.getStoryReviews("moonlit-vow");
  const garden = details.getStoryReviews("garden-of-us");
  assert.ok(moonlit.length > 0 && garden.length > 0);
  assert.ok(moonlit.every((review) => review.storyId === "moonlit-vow"));
  assert.ok(garden.every((review) => review.storyId === "garden-of-us"));
  assert.ok(
    moonlit.every(
      (review) =>
        !garden.some(
          (other) => other.id === review.id || other.body === review.body,
        ),
    ),
  );
  assert.notEqual(
    details.summarizeReviews(moonlit).average,
    details.summarizeReviews(garden).average,
  );
});
test("unreviewed and unknown stories have no fabricated rating or spice score", () => {
  for (const id of ["tidebound", "city-of-kites", "missing"]) {
    const reviews = details.getStoryReviews(id);
    assert.equal(reviews.length, 0);
    assert.deepEqual(details.summarizeReviews(reviews), {
      count: 0,
      average: null,
      spiceCount: 0,
      spice: null,
    });
  }
});
test("review averages count only submitted spice ratings and retain a genuine zero", () => {
  const reviews = details.getStoryReviews("garden-of-us");
  const summary = details.summarizeReviews(reviews);
  assert.equal(summary.count, 2);
  assert.equal(summary.average, 5);
  assert.equal(summary.spiceCount, 1);
  assert.equal(summary.spice, 0);
  assert.deepEqual(
    details.summarizeReviews(reviews.map((r) => ({ ...r, spice: null }))),
    { count: 2, average: 5, spiceCount: 0, spice: null },
  );
});
const { compactLanguageLabel } = load("src/models/catalog.ts");
test("chapter edition labels resolve all launch codes and full names instead of defaulting to EN", () => {
  for (const language of plannedLanguages) {
    assert.equal(compactLanguageLabel(language.code), language.compact);
    assert.equal(compactLanguageLabel(language.label), language.compact);
    assert.equal(compactLanguageLabel(language.compact), language.compact);
  }
  assert.equal(compactLanguageLabel(" KO "), "한국어");
  assert.equal(compactLanguageLabel("Portuguese"), "Portuguese");
});
test("chart previews include up to five released books of each selected format", () => {
  for (const format of catalog.formats) {
    const available = catalog.visibleStories.filter(
      (story) => story.format === format && !story.comingSoon,
    );
    const preview = catalog.chartPreview(format);
    assert.equal(preview.length, Math.min(5, available.length));
    assert.equal(new Set(preview.map((s) => s.id)).size, preview.length);
    assert.ok(
      preview.every((story) => story.format === format && !story.comingSoon),
    );
  }
  assert.deepEqual(catalog.chartPreview("unknown"), []);
});

const source = load("src/services/discovery-source.ts", {
  "@/data/stories": data,
  "@/config/catalog-mode": demoMode,
  "./discovery-policy": policy,
});
const now = Date.parse("2026-11-07T12:00:00Z");
const demoRecords = source.demoDiscoveryRecords(now);
const toProduction = (record) => ({ ...record, source: "production" });
const productionRecords = demoRecords.map(toProduction);
test("release builds reject demo mode even when the public environment requests it", () => {
  for (const requested of [undefined, "demo", "production", "anything"])
    assert.equal(modeConfig.resolveCatalogMode(false, requested), "production");
  assert.equal(modeConfig.resolveCatalogMode(true, undefined), "production");
  assert.equal(modeConfig.resolveCatalogMode(true, "demo"), "demo");
  assert.equal(modeConfig.resolveCatalogMode(true, "production"), "production");
  const releaseCatalog = load("src/services/catalog.ts", {
    "@/data/stories": data,
    "@/config/catalog-mode": { catalogMode: "production" },
    "@/services/discovery-policy": policy,
  });
  assert.equal(releaseCatalog.visibleStories.length, 0);
  assert.equal(
    releaseCatalog.searchCatalog(releaseCatalog.emptyFilters).length,
    0,
  );
  assert.equal(releaseCatalog.chartPreview("Novel").length, 0);
  const releaseDetails = load("src/services/story-details.ts", {
    "@/data/stories": data,
    "@/config/catalog-mode": { catalogMode: "production" },
  });
  assert.deepEqual(releaseDetails.getStoryReviews("moonlit-vow"), []);
  assert.deepEqual(releaseDetails.getPreviewChapters("moonlit-vow"), []);
  assert.deepEqual(policy.eligibleCatalog(demoRecords, "production", now), {
    published: [],
    upcoming: [],
  });
});
test("production adapter success with zero stories is distinct from absence or failure", async () => {
  const empty = await source.createDiscoveryLoader({
    mode: "production",
    loadPublished: async () => [],
    now: () => now,
  })();
  assert.equal(empty.mode, "production");
  assert.deepEqual(empty.catalog, { published: [], upcoming: [] });
  await assert.rejects(
    source.createDiscoveryLoader({ mode: "production" })(),
    /not connected/,
  );
  await assert.rejects(
    source.createDiscoveryLoader({
      mode: "production",
      loadPublished: async () => {
        throw new Error("Network failed");
      },
    })(),
    /Network failed/,
  );
  const rejectedDemos = await source.createDiscoveryLoader({
    mode: "production",
    loadPublished: async () => demoRecords,
    now: () => now,
  })();
  assert.equal(rejectedDemos.catalog.published.length, 0);
});
test("zero, GL-only, BL-only, mixed and failed development catalogs have honest states", async () => {
  for (const scenario of ["empty", "gl-only", "bl-only", "mixed"]) {
    const result = await source.createDiscoveryLoader({
      mode: "demo",
      scenario,
      now: () => now,
    })();
    const sections = policy.buildDiscoverySections(result.catalog, now);
    assert.ok(sections.every((section) => section.stories.length > 0));
    assert.ok(
      sections.every(
        (section) => !/(top|popular|trending)/i.test(section.title),
      ),
    );
    if (scenario === "empty") assert.deepEqual(sections, []);
    if (scenario === "gl-only") {
      assert.ok(sections.some((section) => section.key === "gl"));
      assert.ok(!sections.some((section) => section.key === "bl"));
    }
    if (scenario === "bl-only") {
      assert.ok(sections.some((section) => section.key === "bl"));
      assert.ok(!sections.some((section) => section.key === "gl"));
    }
    if (scenario === "mixed")
      assert.deepEqual(
        sections.slice(0, 2).map((section) => section.key),
        ["gl", "bl"],
      );
  }
  await assert.rejects(
    source.createDiscoveryLoader({ mode: "demo", scenario: "error" })(),
    /could not be loaded/,
  );
});
test("eligibility requires approved mobile-safe publication or an explicit approved schedule", () => {
  const base = productionRecords.find(
    (record) => record.publicationState === "published",
  );
  const invalid = [
    { ...base, approved: false },
    { ...base, visibility: "private" },
    { ...base, mobileEligible: false },
    { ...base, creator: { ...base.creator, approved: false } },
    { ...base, publicationState: "draft" },
    { ...base, publishedAt: new Date(now + 1).toISOString() },
    { ...base, publishedAt: null },
    { ...base, publishedChapterCount: 0 },
    { ...base, story: { ...base.story, classification: "Pornographic" } },
    { ...base, story: { ...base.story, classification: "Erotica" } },
  ];
  assert.equal(
    policy.eligibleCatalog(invalid, "production", now).published.length,
    0,
  );
  assert.equal(
    policy.eligibleCatalog([base], "production", now).published.length,
    1,
  );
  const upcoming = productionRecords.find(
    (record) => record.publicationState === "scheduled",
  );
  assert.equal(
    policy.eligibleCatalog([upcoming], "production", now).upcoming.length,
    1,
  );
  assert.equal(
    policy.eligibleCatalog(
      [{ ...upcoming, scheduledAt: null }],
      "production",
      now,
    ).upcoming.length,
    0,
  );
  assert.equal(
    catalog.searchCatalog(
      { ...catalog.emptyFilters, classification: "Pornographic" },
      [{ ...base.story, classification: "Pornographic" }],
    ).length,
    0,
  );
});
test("updated, completed and new-creator shelves require corresponding publication evidence", () => {
  const base = productionRecords.find(
    (record) => record.publicationState === "published",
  );
  const catalogWithNoSignals = policy.eligibleCatalog(
    [
      {
        ...base,
        lastChapterPublishedAt: null,
        completedAt: null,
        story: { ...base.story, status: "Complete" },
        creator: { ...base.creator, firstPublishedAt: null },
      },
    ],
    "production",
    now,
  );
  const keys = policy
    .buildDiscoverySections(catalogWithNoSignals, now)
    .map((section) => section.key);
  assert.ok(keys.includes("new"));
  for (const key of ["updated", "completed", "creators", "soon"])
    assert.ok(!keys.includes(key));
  const catalogWithSignals = policy.eligibleCatalog(
    [
      {
        ...base,
        lastChapterPublishedAt: new Date(now - 1000).toISOString(),
        completedAt: new Date(now - 1000).toISOString(),
        story: { ...base.story, status: "Complete" },
      },
    ],
    "production",
    now,
  );
  const populated = policy
    .buildDiscoverySections(catalogWithSignals, now)
    .map((section) => section.key);
  for (const key of ["updated", "completed", "creators"])
    assert.ok(populated.includes(key));
});
test("genre shelves and future ranking capabilities follow configurable genuine-data thresholds", () => {
  const eligible = policy.eligibleCatalog(productionRecords, "production", now);
  assert.deepEqual(policy.rankingEligibility(eligible, null), {
    top10: false,
    popular: false,
    trending: false,
  });
  const reliable = {
    verified: true,
    rankedStoryIds: eligible.published.map((record) => record.story.id),
    uniqueReaders: 100,
    engagementEvents: 1000,
  };
  assert.equal(policy.rankingEligibility(eligible, reliable).top10, true);
  assert.equal(
    policy.rankingEligibility(
      { ...eligible, published: eligible.published.slice(0, 9) },
      reliable,
    ).top10,
    false,
  );
  assert.equal(
    policy.rankingEligibility(eligible, { ...reliable, verified: false })
      .popular,
    false,
  );
  assert.equal(
    policy.rankingEligibility(eligible, { ...reliable, engagementEvents: 0 })
      .trending,
    false,
  );
  const thresholds = { ...policy.discoveryThresholds, genreShelfStories: 100 };
  assert.ok(
    !policy
      .buildDiscoverySections(eligible, now, thresholds)
      .some((section) => section.key.startsWith("genre:")),
  );
});
test("future ranking eligibility never treats demonstration stories as real inventory", () => {
  const demo = policy.eligibleCatalog(demoRecords, "demo", now);
  const signals = {
    verified: true,
    rankedStoryIds: demo.published.map((record) => record.story.id),
    uniqueReaders: 10000,
    engagementEvents: 10000,
  };
  assert.deepEqual(policy.rankingEligibility(demo, signals), {
    top10: false,
    popular: false,
    trending: false,
  });
});
test("shared browsing covers stay compact at 320, 375, 390 and 430pt", () => {
  assert.equal(browsing.browsingCoverWidth(), 110);
  assert.equal(browsing.browsingCover.gap, 12);
  for (const viewport of [320, 375, 390, 430]) {
    const available = viewport - 48;
    const card = browsing.browsingCoverWidth(available);
    assert.ok(card >= 105 && card <= 115);
    assert.ok(card * 2 + 12 <= available);
    assert.equal(policy.responsiveCardWidth(available, "carousel"), card);
    assert.equal(policy.responsiveCardWidth(available, "results"), card);
  }
});

const authorPreview = load("src/data/author-preview.ts", {
  "@/config/catalog-mode": demoMode,
});
const home = load("src/services/home-editorial.ts", {
  "@/data/author-preview": authorPreview,
  "./discovery-policy": policy,
});
test("Home editorial never admits drafts, restricted, unapproved or demo production records", () => {
  const records = source.demoDiscoveryRecords();
  const mixed = { published: records, upcoming: records };
  const selected = home.homeEditorial(mixed, "demo");
  const eligible = policy.eligibleCatalog(records, "demo").published;
  assert.deepEqual(
    selected.next.map((s) => s.id),
    eligible.map((r) => r.story.id),
  );
  assert.equal(
    new Set(selected.authors.map((s) => s.id)).size,
    selected.authors.length,
  );
  assert.ok(selected.authors.length >= 5);
  assert.deepEqual(home.homeEditorial(mixed, "production"), {
    next: [],
    authors: [],
  });
  for (const patch of [
    { approved: false },
    { visibility: "private" },
    { mobileEligible: false },
    { publicationState: "draft" },
    { publishedChapterCount: 0 },
  ]) {
    assert.equal(
      home.homeEditorial(
        { published: [{ ...eligible[0], ...patch }], upcoming: [] },
        "demo",
      ).next.length,
      0,
    );
  }
});
test("Home editorial handles zero and limited story selections without invented books", () => {
  const records = policy.eligibleCatalog(
    source.demoDiscoveryRecords(),
    "demo",
  ).published;
  for (let count = 0; count <= 5; count++) {
    const selected = home.homeEditorial(
      { published: records.slice(0, count), upcoming: [] },
      "demo",
    );
    assert.equal(selected.next.length, count);
    assert.equal(selected.authors.length, count);
  }
});
test("editorial artwork fits 320, 375, 390 and 430pt without touching headings", () => {
  for (const viewport of [320, 375, 390, 430]) {
    const width = viewport - 48;
    for (let count = 1; count <= 5; count++) {
      const g = home.editorialGeometry(width, count);
      assert.ok(g.fanLeft >= 20 - 0.001);
      assert.ok(
        g.fanLeft + g.fanStep * (count - 1) + g.fanCover <= width - 20 + 0.001,
      );
      assert.ok(
        8 + Math.abs((count - 1) / 2) * 9 + g.fanCover * 1.5 <= g.fanHeight,
      );
      assert.equal(g.large + 16 + g.small * 2 + 8, width);
    }
  }
});

test("author blocks use creator IDs and never fill slots with another creator", () => {
  const records = policy.eligibleCatalog(
    source.demoDiscoveryRecords(),
    "demo",
  ).published;
  const groups = home.authorCollections(
    { published: records, upcoming: [] },
    "demo",
  );
  assert.equal(groups[0].preview, true);
  assert.equal(groups[0].stories.length, 5);
  for (const group of groups.filter((g) => !g.preview)) {
    assert.ok(
      group.stories.every(
        (s) => records.find((r) => r.story.id === s.id).creator.id === group.id,
      ),
    );
    assert.equal(
      new Set(group.stories.map((s) => s.id)).size,
      group.stories.length,
    );
  }
  const sameNames = records.slice(0, 2).map((r, i) => ({
    ...r,
    creator: { ...r.creator, id: `id-${i}`, name: "Same name" },
  }));
  assert.equal(
    home
      .authorCollections({ published: sameNames, upcoming: [] }, "demo")
      .filter((g) => !g.preview).length,
    2,
  );
  assert.deepEqual(
    home.authorCollections({ published: [], upcoming: [] }, "demo"),
    [],
  );
  assert.deepEqual(authorPreview.authorPreviewBooks("production"), []);
  const releasePreview = load("src/data/author-preview.ts", {
    "@/config/catalog-mode": { catalogMode: "production" },
  });
  assert.deepEqual(releasePreview.authorPreviewBooks("demo"), []);
});
test("five-book author blocks exactly align portrait cover edges at all requested widths", () => {
  for (const viewport of [320, 375, 390, 430]) {
    const width = viewport - 48;
    const g = home.authorGeometry(width);
    assert.ok(Math.abs(g.large + g.gap + 2 * g.small + g.gap - width) < 0.0001);
    assert.ok(Math.abs(g.large * 1.5 - (2 * g.small * 1.5 + g.gap)) < 0.0001);
    assert.equal(g.gap, 8);
  }
});

test("author carousel keeps one complete showcase per interval at every requested width", () => {
  for (const viewport of [320, 375, 390, 430]) {
    const available = viewport - 48;
    const g = home.authorCarouselGeometry(available);
    assert.equal(g.itemWidth + 18, available);
    assert.equal(g.interval, g.itemWidth + 12);
    assert.equal(g.innerWidth + 22, g.itemWidth);
    const c = g.covers;
    assert.ok(
      Math.abs(c.large + c.gap + 2 * c.small + c.gap - g.innerWidth) < 0.0001,
    );
    assert.ok(Math.abs(c.height - (2 * c.small * 1.5 + c.gap)) < 0.0001);
    assert.ok(g.itemHeight >= c.height + 27 + 15 + 22 + 8);
  }
});

test("one through five-plus books preserve identical five-slot author cards", () => {
  const stories = authorPreview.authorPreviewBooks("demo");
  for (const viewport of [320, 375, 390, 430]) {
    const available = viewport - 48;
    const baseline = home
      .authorShowcaseSlots(stories, available)
      .map(({ story, ...rect }) => rect);
    const layout = home.authorCarouselGeometry(available);
    for (const count of [1, 2, 3, 4, 5, 6]) {
      const works =
        count === 6
          ? [...stories, { ...stories[0], id: "test-sixth-work" }]
          : stories.slice(0, count);
      const slots = home.authorShowcaseSlots(works, available);
      assert.equal(slots.length, 5);
      assert.deepEqual(
        slots.map(({ story, ...rect }) => rect),
        baseline,
      );
      assert.deepEqual(
        slots.filter((s) => s.story).map((s) => s.story.id),
        works.slice(0, 5).map((s) => s.id),
      );
      for (const slot of slots) {
        assert.ok(slot.x >= 0 && slot.y >= 0);
        assert.ok(slot.x + slot.width <= layout.innerWidth + 0.001);
        assert.ok(slot.y + slot.height <= layout.covers.height + 0.001);
      }
      assert.equal(slots[0].y, slots[1].y);
      assert.ok(
        Math.abs(slots[0].height - (slots[4].y + slots[4].height)) < 0.001,
      );
    }
    assert.ok(Math.abs(layout.itemHeight - layout.covers.height - 72) < 0.001);
  }
});

test("literary typography falls back for multilingual scripts without font downloads", () => {
  for (const platform of ["ios", "android", "web"]) {
    for (const text of [
      "한국어",
      "日本語",
      "简体中文",
      "ไทย",
      "العربية",
      "हिन्दी",
    ]) {
      assert.equal(
        visual.inkTypeface(platform, text, true),
        visual.inkTypeface(platform, text, false),
      );
    }
    assert.notEqual(
      visual.inkTypeface(platform, "Ink & Elegance", true),
      visual.inkTypeface(platform, "Ink & Elegance", false),
    );
    for (const text of ["Tiếng Việt", "Español", "Русский"])
      assert.ok(visual.inkTypeface(platform, text, true));
  }
});
test("ink surface polish keeps all six palettes and approved cover geometry", () => {
  for (const theme of Object.values(themes)) {
    const surfaces = visual.inkSurfaces(theme);
    assert.ok(surfaces.border.startsWith(theme.accent));
    assert.ok(surfaces.glass.startsWith(theme.surface));
    assert.equal(surfaces.editorialGradient[0], theme.surface);
  }
  assert.equal(visual.ink.radius.book, 5);
  assert.equal(browsing.browsingCover.width, 110);
  assert.equal(visual.ink.typography.bodyLine, 23);
  assert.equal(visual.ink.typography.titleLine, 35);
});

test("motion preferences default safely, update live, and clean up on unmount", async () => {
  let state,
    effect,
    handler,
    removed = false;
  const hook = load("src/hooks/use-reduced-motion.ts", {
    react: {
      useState: (initial) => {
        state = initial;
        return [
          state,
          (value) => {
            state = value;
          },
        ];
      },
      useEffect: (callback) => {
        effect = callback;
      },
    },
    "react-native": {
      AccessibilityInfo: {
        addEventListener: (name, callback) => {
          assert.equal(name, "reduceMotionChanged");
          handler = callback;
          return {
            remove: () => {
              removed = true;
            },
          };
        },
        isReduceMotionEnabled: () => Promise.resolve(false),
      },
    },
  });
  assert.equal(hook.useReducedMotion(), true);
  const cleanup = effect();
  await Promise.resolve();
  assert.equal(state, false);
  handler(true);
  assert.equal(state, true);
  cleanup();
  assert.equal(removed, true);
  handler(false);
  assert.equal(state, true);
});

test("real handwriting is opt-in to loaded fonts and Latin-supported text only", () => {
  for (const platform of ["ios", "android", "web"]) {
    for (const text of [
      "MYTHRA",
      "Find Your Next Read",
      "Books by Authors",
      "Tiếng Việt",
      "Español",
    ]) {
      assert.equal(
        visual.handwritingTypeface(platform, text, true),
        visual.handwritingFamily,
      );
      assert.equal(
        visual.handwritingTypeface(platform, text, false),
        visual.inkTypeface(platform, text, false),
      );
    }
    for (const text of [
      "한국어",
      "日本語",
      "简体中文",
      "ไทย",
      "Русский",
      "العربية",
    ]) {
      assert.equal(
        visual.handwritingTypeface(platform, text, true),
        visual.inkTypeface(platform, text, false),
      );
    }
  }
  const font = fs.readFileSync(
    "node_modules/@expo-google-fonts/dancing-script/600SemiBold/DancingScript_600SemiBold.ttf",
  );
  assert.equal(font.readUInt32BE(0), 0x00010000);
});

test("Cormorant Infant is primary while handwriting remains a separate opt-in accent", () => {
  for (const platform of ["ios", "android", "web"]) {
    for (const text of [
      "MYTHRA",
      "Books by Authors",
      "Elara Quill",
      "Tiếng Việt",
      "Español",
    ]) {
      assert.equal(
        visual.displayTypeface(platform, text, true),
        visual.displayFamily,
      );
      assert.notEqual(visual.displayFamily, visual.handwritingFamily);
      assert.equal(
        visual.displayTypeface(platform, text, false),
        visual.inkTypeface(platform, text, false),
      );
    }
    for (const text of [
      "한국어",
      "日本語",
      "简体中文",
      "Русский",
      "ไทย",
      "العربية",
    ])
      assert.equal(
        visual.displayTypeface(platform, text, true),
        visual.inkTypeface(platform, text, false),
      );
  }
  const font = fs.readFileSync(
    "node_modules/@expo-google-fonts/cormorant-infant/600SemiBold/CormorantInfant_600SemiBold.ttf",
  );
  assert.equal(font.readUInt32BE(0), 0x00010000);
});
