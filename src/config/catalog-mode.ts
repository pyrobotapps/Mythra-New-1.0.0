export type CatalogMode = "demo" | "production";
/** An environment variable alone can never enable fictional data in a release build. */
export function resolveCatalogMode(
  isDevelopment: boolean,
  requestedMode: string | undefined,
): CatalogMode {
  return isDevelopment && requestedMode === "demo" ? "demo" : "production";
}
export const catalogMode = resolveCatalogMode(
  typeof __DEV__ !== "undefined" && __DEV__,
  process.env.EXPO_PUBLIC_CATALOG_MODE,
);
export const demoScenario =
  catalogMode === "demo"
    ? (process.env.EXPO_PUBLIC_DISCOVERY_SCENARIO ?? "mixed")
    : "mixed";
