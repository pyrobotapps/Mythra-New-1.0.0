import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Page, Txt, Chip } from "@/components/ui";
import { ChapterRow } from "@/components/story/chapters";
import { getPreviewChapters, sortChapters } from "@/services/story-details";
import { ScreenHeading, EmptyState } from "@/features/experience/components";
import { resolveStory } from "@/features/experience/resolve-story";
import { plannedLanguages } from "@/models/catalog";
export default function Chapters() {
  const { id, language: initial } = useLocalSearchParams<{
    id: string;
    language?: string;
  }>();
  const story = resolveStory(id);
  const [selected, setSelected] = useState(initial);
  const [newest, setNewest] = useState(false);
  const language = story?.languages.includes(selected ?? "")
    ? selected!
    : story?.languages[0];
  const chapters = story
    ? sortChapters(getPreviewChapters(story.id, language), newest)
    : [];
  return (
    <Page gap={20}>
      <ScreenHeading
        title="Chapters"
        subtitle={story?.title ?? "Story unavailable"}
      />
      {story ? (
        <>
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
            {plannedLanguages
              .filter((l) => story.languages.includes(l.label))
              .map((l) => (
                <Chip
                  key={l.code}
                  label={l.compact}
                  active={language === l.label}
                  onPress={() => setSelected(l.label)}
                />
              ))}
          </View>
          <Chip
            label={newest ? "Newest First" : "Oldest First"}
            active={false}
            onPress={() => setNewest(!newest)}
          />
          <Txt muted>
            Development chapter metadata · no published chapter content
            connected.
          </Txt>
          {chapters.map((chapter) => (
            <ChapterRow
              key={chapter.id}
              chapter={chapter}
              onOpen={() =>
                router.push({
                  pathname: "/reader/[id]",
                  params: { id, chapter: chapter.number, language },
                })
              }
            />
          ))}
        </>
      ) : null}
      {!chapters.length ? (
        <EmptyState
          title="No chapters available"
          body="Published chapters will appear here once the catalog and access checks are connected."
        />
      ) : null}
    </Page>
  );
}
