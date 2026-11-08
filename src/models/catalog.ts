/** Future Supabase boundaries. One canonical story can own several available editions. */
export type LanguageCode =
  "en" | "ko" | "ja" | "zh-Hans" | "ru" | "th" | "vi" | "es";
export const plannedLanguages = [
  { code: "en", label: "English", compact: "EN" },
  { code: "ko", label: "Korean", compact: "한국어" },
  { code: "ja", label: "Japanese", compact: "日本語" },
  { code: "zh-Hans", label: "Simplified Chinese", compact: "简体中文" },
  { code: "ru", label: "Russian", compact: "RU" },
  { code: "th", label: "Thai", compact: "ไทย" },
  { code: "vi", label: "Vietnamese", compact: "VI" },
  { code: "es", label: "Spanish", compact: "ES" },
] as const;
export type StoryEdition = {
  id: string;
  storyId: string;
  language: LanguageCode;
  title: string;
  synopsis: string;
  original: boolean;
  translatorIds: string[];
};
export type Chapter = {
  id: string;
  editionId: string;
  number: number;
  title: string;
  publishedAt: string | null;
  access: "free" | "restricted";
  content: string | null;
};
export type ReadingProgress = {
  storyId: string;
  editionId: string;
  chapterId: string;
  offset: number;
  updatedAt: string;
};
export const featureFlags = {
  payments: false,
  messaging: false,
  publishing: false,
  remoteAccounts: false,
} as const;

/** Resolve edition codes, full names, or native compact names without defaulting unknown editions to English. */
export function compactLanguageLabel(edition: string): string {
  const value = edition.trim().toLocaleLowerCase();
  const language = plannedLanguages.find((item) =>
    [item.code, item.label, item.compact].some(
      (label) => label.toLocaleLowerCase() === value,
    ),
  );
  return language?.compact ?? edition;
}
