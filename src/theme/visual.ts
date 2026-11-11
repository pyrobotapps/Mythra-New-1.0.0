/** Surface-only tokens: browsing geometry, spacing and navigation silhouettes stay separate. */
export const ink = {
  radius: {
    book: 5,
    badge: 7,
    card: 14,
    control: 18,
    editorial: 20,
    panel: 22,
    glass: 22,
    sheet: 26,
    round: 24,
  },
  typography: { bodySize: 15, bodyLine: 23, titleSize: 28, titleLine: 35 },
  feedback: { pressedOpacity: 0.82 },
} as const;
export function inkSurfaces(theme: {
  surface: string;
  accent: string;
  dark: boolean;
}) {
  return {
    border: theme.accent + (theme.dark ? "20" : "28"),
    divider: theme.accent + (theme.dark ? "18" : "22"),
    glass: theme.surface + (theme.dark ? "90" : "B8"),
    shadow: theme.dark ? "0 5px 16px #00000020" : "0 5px 16px #3D254012",
    editorialGradient: [
      theme.surface,
      theme.accent + (theme.dark ? "1C" : "12"),
      theme.surface,
    ] as const,
  };
}
/** Use native system fallback for scripts outside the supplied literary Latin face. */
export function inkTypeface(platform: string, text: string, literary = false) {
  const system =
    platform === "android"
      ? "sans-serif"
      : platform === "web"
        ? "system-ui"
        : "System";
  const needsSystem =
    /[\u0590-\u109F\u1780-\u18AF\u2E80-\uA4CF\uAC00-\uD7AF\uF900-\uFAFF]/.test(
      text,
    );
  return literary && !needsSystem
    ? platform === "android"
      ? "serif"
      : platform === "web"
        ? 'Georgia, "Times New Roman", serif'
        : "Georgia"
    : system;
}

/** Dancing Script is bundled locally; scripts it does not cover use the system face. */
export const handwritingFamily = "MythraHandwriting";
export function handwritingTypeface(
  platform: string,
  text: string,
  loaded: boolean,
) {
  const supported =
    !/[^\p{Script=Latin}\p{Mark}\p{Number}\p{Punctuation}\p{Separator}\p{Symbol}]/u.test(
      text,
    );
  return loaded && supported
    ? handwritingFamily
    : inkTypeface(platform, text, false);
}

/** Primary visual face; unsupported scripts retain the readable system font. */
export const displayFamily = "MythraDisplay";
export function displayTypeface(
  platform: string,
  text: string,
  loaded: boolean,
) {
  const supported =
    !/[^\p{Script=Latin}\p{Mark}\p{Number}\p{Punctuation}\p{Separator}\p{Symbol}]/u.test(
      text,
    );
  return loaded && supported
    ? displayFamily
    : inkTypeface(platform, text, false);
}
