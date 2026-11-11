import { getPreviewChapters } from "@/services/story-details";
import { selectedChapter } from "@/features/experience/reader-policy";
import { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Chip, Txt } from "@/components/ui";
import { IconButton } from "@/components/glass";
import { Sheet } from "@/components/story/controls";
import { useTheme } from "@/theme";
import { catalogMode } from "@/config/catalog-mode";
import { resolveStory } from "@/features/experience/resolve-story";
import { EmptyState } from "@/features/experience/components";
import { openExperience } from "@/features/experience/navigation";
import { plannedLanguages } from "@/models/catalog";
const passage = [
  "The bookshop opened before the rest of the street. Light gathered in the windows, touching the spines of books that had waited all night for someone to find them.",
  "Mira paused at the threshold. She had come looking for a map, but the owner offered her an empty notebook instead. Its pages smelled faintly of rain.",
  "‘Some places,’ he said, ‘can only be found by writing your way toward them.’ Outside, the morning bells began. Mira put the notebook in her coat and stepped back into the city.",
  "At the corner she turned to look once more. Between the familiar buildings, a narrow lane had appeared. There was no name on its sign, only a small painted star.",
];
export default function Reader() {
  const params = useLocalSearchParams<{
    id: string;
    chapter?: string;
    language?: string;
  }>();
  const story = resolveStory(params.id);
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const availableChapters = story
    ? getPreviewChapters(story.id, story.languages[0])
    : [];
  const [chapter, setChapter] = useState(
    () =>
      selectedChapter(
        params.chapter,
        availableChapters.map((chapter) => chapter.number),
      ) ?? 1,
  );
  const [settings, setSettings] = useState(false);
  const [chrome, setChrome] = useState(true);
  const [size, setSize] = useState(19);
  const [leading, setLeading] = useState(1.7);
  const [serif, setSerif] = useState(false);
  const [paper, setPaper] = useState("Theme");
  const [progress, setProgress] = useState(0);
  const paperColor =
    paper === "Light"
      ? "#FAF7F2"
      : paper === "Dark"
        ? "#111113"
        : paper === "Sepia"
          ? "#F1E5CD"
          : theme.bg;
  const textColor =
    paper === "Light" || paper === "Sepia"
      ? "#261F2D"
      : paper === "Dark"
        ? "#F5F3F7"
        : theme.text;
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [language, setLanguage] = useState(
    story?.languages.includes(params.language ?? "")
      ? params.language!
      : story?.languages[0],
  );
  const toon = story?.format === "Toon";
  const demo = catalogMode === "demo" && !!story;
  const go = (next: number) => {
    setChapter(next);
    setProgress(0);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      {chrome ? (
        <View style={{ paddingHorizontal: 16, paddingVertical: 8, gap: 8 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <IconButton
              name="back"
              label="Exit reader"
              onPress={() =>
                router.canGoBack() ? router.back() : router.replace("/")
              }
            />
            <Txt numberOfLines={2} style={{ flex: 1, fontSize: 14 }}>
              {story?.title ?? "Reader"}
            </Txt>
            <IconButton
              name="more"
              label="Reader settings"
              onPress={() => setSettings(true)}
            />
          </View>
          <Txt muted style={{ textAlign: "center", fontSize: 12 }}>
            Chapter {chapter} · {language ?? "No edition"}
          </Txt>
        </View>
      ) : null}
      <ScrollView
        key={`${chapter}:${language}`}
        style={{ backgroundColor: paperColor }}
        scrollEventThrottle={100}
        onScroll={({ nativeEvent }) => {
          const distance =
            nativeEvent.contentSize.height -
            nativeEvent.layoutMeasurement.height;
          setProgress(
            distance > 0
              ? Math.min(
                  100,
                  Math.max(
                    0,
                    Math.round((nativeEvent.contentOffset.y / distance) * 100),
                  ),
                )
              : 0,
          );
        }}
        contentContainerStyle={{
          width: "100%",
          maxWidth: 720,
          alignSelf: "center",
          padding: toon ? 0 : width < 350 ? 20 : 28,
          paddingBottom: 40,
          gap: toon ? 32 : 22,
        }}
      >
        {demo ? (
          <>
            <View style={{ paddingHorizontal: toon ? 24 : 0, gap: 12 }}>
              <Txt style={{ color: textColor, fontSize: 11 }}>
                DEVELOPMENT READER PREVIEW · NOT A PUBLISHED CHAPTER
              </Txt>
              <Txt title style={{ color: textColor }}>
                Chapter {chapter}
              </Txt>
              <Txt style={{ color: textColor }}>
                {toon
                  ? "Storyboard spacing preview. Comic artwork has not been uploaded."
                  : "Original English sample passage for typography review. Changing edition updates the selected edition only; translations are not connected."}
              </Txt>
            </View>
            {toon ? (
              ["Establishing scene", "A quiet exchange", "The next moment"].map(
                (label, i) => (
                  <Pressable
                    key={label}
                    accessibilityRole="button"
                    accessibilityLabel={`Empty comic panel ${i + 1}: ${label}. Toggle reading controls`}
                    onPress={() => setChrome((value) => !value)}
                    style={{
                      height: Math.min(width * 1.25, 600),
                      marginHorizontal: 16,
                      backgroundColor: theme.surface,
                      borderRadius: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <Txt literary style={{ fontSize: 28 }}>
                      {label}
                    </Txt>
                    <Txt muted style={{ fontSize: 12 }}>
                      Artwork slot {i + 1} · no comic content
                    </Txt>
                  </Pressable>
                ),
              )
            ) : (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={
                  chrome ? "Hide reader controls" : "Show reader controls"
                }
                onPress={() => setChrome((value) => !value)}
                style={{ gap: 22 }}
              >
                {passage.map((paragraph, i) => (
                  <Txt
                    key={i}
                    style={{
                      fontSize: size,
                      lineHeight: Math.round(size * leading),
                      color: textColor,
                      fontFamily: serif
                        ? Platform.OS === "ios"
                          ? "Georgia"
                          : "serif"
                        : undefined,
                    }}
                  >
                    {paragraph}
                  </Txt>
                ))}
              </Pressable>
            )}
          </>
        ) : (
          <View style={{ padding: 24 }}>
            <EmptyState
              title="Chapter unavailable"
              body="No readable chapter or authorized edition is connected. The reader will display only published content you can access."
            />
          </View>
        )}
        <View style={{ paddingHorizontal: toon ? 24 : 0, gap: 12 }}>
          <Txt style={{ color: textColor, fontSize: 12 }}>
            Preview scroll progress · {progress}% · not saved
          </Txt>
          <Button
            secondary
            label={chrome ? "Enter immersive view" : "Show reading controls"}
            onPress={() => setChrome(!chrome)}
          />
          {demo ? (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {chapter > 1 ? (
                <Button
                  secondary
                  label="Previous chapter"
                  onPress={() => go(chapter - 1)}
                />
              ) : null}
              {chapter < availableChapters.length ? (
                <Button label="Next chapter" onPress={() => go(chapter + 1)} />
              ) : null}
            </View>
          ) : null}
          <Button
            secondary
            label="Chapter discussion"
            onPress={() =>
              openExperience(
                "comments",
                story?.id,
                `Chapter ${chapter} · ${language ?? "No edition"}`,
              )
            }
          />
        </View>
      </ScrollView>
      <Sheet
        title="Reader settings"
        visible={settings}
        onClose={() => setSettings(false)}
      >
        <Txt muted>
          Reader choices and bookmarks are local to this preview session.
        </Txt>
        {!toon ? (
          <>
            <Txt>Reading font</Txt>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Chip
                label="Sans serif"
                active={!serif}
                onPress={() => setSerif(false)}
              />
              <Chip
                label="Serif"
                active={serif}
                onPress={() => setSerif(true)}
              />
            </View>
            <Txt>Paper</Txt>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {["Theme", "Light", "Dark", "Sepia"].map((option) => (
                <Chip
                  key={option}
                  label={option}
                  active={paper === option}
                  onPress={() => setPaper(option)}
                />
              ))}
            </View>
            <Txt>Text size · {size} pt</Txt>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Chip
                label="Smaller"
                active={false}
                onPress={() => setSize(Math.max(16, size - 1))}
              />
              <Chip
                label="Larger"
                active={false}
                onPress={() => setSize(Math.min(28, size + 1))}
              />
            </View>
            <Txt>Line spacing</Txt>
            <View style={{ flexDirection: "row", gap: 10 }}>
              {[1.5, 1.7, 2].map((value) => (
                <Chip
                  key={value}
                  label={String(value)}
                  active={leading === value}
                  onPress={() => setLeading(value)}
                />
              ))}
            </View>
          </>
        ) : null}
        <Txt>Reading edition</Txt>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {plannedLanguages
            .filter((l) => story?.languages.includes(l.label))
            .map((l) => (
              <Chip
                key={l.code}
                label={l.compact}
                active={language === l.label}
                onPress={() => setLanguage(l.label)}
              />
            ))}
        </View>
        {demo ? (
          <Button
            secondary
            label={
              bookmarks.includes(chapter)
                ? "Remove chapter bookmark"
                : "Bookmark this chapter"
            }
            onPress={() =>
              setBookmarks(
                bookmarks.includes(chapter)
                  ? bookmarks.filter((n) => n !== chapter)
                  : [...bookmarks, chapter],
              )
            }
          />
        ) : null}
        <Txt muted>
          {bookmarks.length
            ? `Bookmarked chapters: ${bookmarks.join(", ")}`
            : "No session bookmarks"}
        </Txt>
        <Button
          secondary
          label="All chapters"
          onPress={() => {
            setSettings(false);
            router.push({
              pathname: "/chapters/[id]",
              params: { id: params.id, language },
            });
          }}
        />
        <Txt muted>
          Auto-next · off. Automatic chapter transitions and resume positions
          are deferred.
        </Txt>
        <Txt muted>
          Downloads are not connected. Offline storage, access permissions and
          image preloading will be implemented with published chapter content.
        </Txt>
      </Sheet>
    </SafeAreaView>
  );
}
