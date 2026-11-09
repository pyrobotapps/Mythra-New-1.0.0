import { findAuthorPreview } from "@/data/author-preview";
import { useState } from "react";
import { Pressable, Share, View } from "react-native";
import * as Linking from "expo-linking";
import { router, useLocalSearchParams } from "expo-router";
import { Story } from "@/data/stories";
import { visibleStories } from "@/services/catalog";
import { plannedLanguages } from "@/models/catalog";
import {
  creatorBio,
  getPreviewChapters,
  getStoryReviews,
  summarizeReviews,
  sortChapters,
  storyTags,
} from "@/services/story-details";
import { Button, Chip, Cover, Page, Shelf, Txt } from "@/components/ui";
import { Glass, IconButton } from "@/components/glass";
import { Icon } from "@/components/icon";
import {
  Avatar,
  ClassificationBadge,
  DetailSection,
  Sheet,
  TextAction,
} from "@/components/story/controls";
import { ChapterRow } from "@/components/story/chapters";
import { useTheme } from "@/theme";
type Dialog = "languages" | "more" | "chapters" | "creator" | "info" | null;
function StoryContent({ story }: { story: Story }) {
  const { theme } = useTheme();
  const [language, setLanguage] = useState(story.languages[0]);
  const [expanded, setExpanded] = useState(false);
  const [newest, setNewest] = useState(true);
  const [reviewSort, setReviewSort] = useState("Recent");
  const [dialog, setDialog] = useState<Dialog>(null);
  const [info, setInfo] = useState({ title: "", body: "" });
  const [chapterLimit, setChapterLimit] = useState(15);
  const chapters = sortChapters(getPreviewChapters(story.id, language), newest);
  const editions = plannedLanguages.filter((l) =>
    story.languages.includes(l.label),
  );
  const selectedEdition = editions.find((l) => l.label === language);
  const works = visibleStories.filter(
    (s) => s.author === story.author && s.id !== story.id,
  );
  const recommendations = visibleStories
    .filter((s) => s.id !== story.id)
    .sort(
      (a, b) =>
        Number(
          b.genre === story.genre || b.relationship === story.relationship,
        ) -
        Number(
          a.genre === story.genre || a.relationship === story.relationship,
        ),
    )
    .slice(0, 8);
  const storyReviews = getStoryReviews(story.id);
  const reviewSummary = summarizeReviews(storyReviews);
  const reviews =
    reviewSort === "Highest rated"
      ? [...storyReviews].sort((a, b) => b.rating - a.rating)
      : [...storyReviews].reverse();
  const explain = (title: string, body: string) => {
    setInfo({ title, body });
    setDialog("info");
  };
  const unavailable = (label: string) =>
    explain(
      label,
      `${label} is not available in this layout preview. No account or community service is connected yet.`,
    );
  const openChapter = (number: number) =>
    explain(
      `Chapter ${number}`,
      `The chapter list is available to preview, but chapter text and the ${story.format === "Toon" ? "toon" : "novel"} reader have not been built yet.`,
    );
  const share = async () => {
    const url = Linking.createURL(`/story/${story.id}`);
    try {
      await Share.share({
        title: story.title,
        message: `${story.title} by ${story.author}\n${url}`,
      });
    } catch {
      explain(
        "Share story",
        `${story.title} by ${story.author}\n\n${url}\n\nSelect and copy this preview link. A published public story URL is not available yet.`,
      );
    }
  };
  const initials = story.author
    .split(" ")
    .map((n) => n[0])
    .join("");
  const dialogTitle =
    dialog === "languages"
      ? "Reading language"
      : dialog === "more"
        ? "Story actions"
        : dialog === "chapters"
          ? "All Chapters"
          : dialog === "creator"
            ? story.author
            : info.title;
  const follow = () => unavailable("Follow Author");
  return (
    <Page gap={22}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <IconButton
          name="back"
          label="Back"
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/")
          }
        />
        <Txt
          accessibilityRole="header"
          style={{ flex: 1, fontSize: 17, fontWeight: "600" }}
        >
          Story Details
        </Txt>
        <IconButton
          name="share"
          label="Share story"
          onPress={() => void share()}
        />
        <IconButton
          name="more"
          label="More story actions"
          onPress={() => setDialog("more")}
        />
      </View>
      <View style={{ gap: 12 }}>
        <View
          style={{ flexDirection: "row", alignItems: "flex-start", gap: 16 }}
        >
          <Cover story={story} width={100} />
          <View style={{ flex: 1, gap: 6 }}>
            <Txt title style={{ fontSize: 22, lineHeight: 28 }}>
              {story.title}
            </Txt>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`About ${story.author}`}
              onPress={() => setDialog("creator")}
            >
              <Txt muted style={{ fontSize: 12, lineHeight: 18 }}>
                by {story.author}
              </Txt>
            </Pressable>
            <Txt style={{ fontSize: 11, lineHeight: 18, color: theme.accent }}>
              {reviewSummary.average === null
                ? "Not yet rated"
                : `★ ${reviewSummary.average?.toFixed(1)}`}{" "}
              <Txt muted style={{ fontSize: 11 }}>
                · {reviewSummary.count} reviews
              </Txt>
            </Txt>
            <Txt muted style={{ fontSize: 11, lineHeight: 18 }}>
              {story.format} · {story.relationship}
              {"\n"}
              {story.status === "Complete" ? "Completed" : story.status}
            </Txt>
            <ClassificationBadge value={story.classification} />
          </View>
        </View>
        <Txt muted style={{ fontSize: 10, lineHeight: 14 }}>
          Demo catalog · Sample metadata & reader feedback
        </Txt>
      </View>
      <View style={{ flexDirection: "row", alignItems: "stretch", gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Button label="Start Reading" onPress={() => openChapter(1)} />
        </View>
        <Glass style={{ borderRadius: 24 }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Reading language: ${language}. Choose edition`}
            accessibilityState={{ expanded: dialog === "languages" }}
            onPress={() => setDialog("languages")}
            style={{
              minWidth: 66,
              minHeight: 48,
              paddingHorizontal: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
            }}
          >
            <Txt style={{ fontSize: 12, fontWeight: "600" }}>
              {selectedEdition?.compact ?? language}
            </Txt>
            <Icon name="down" color={theme.muted} size={10} />
          </Pressable>
        </Glass>
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        {[
          {
            label: "Add to Library",
            icon: "library" as const,
            action: () => unavailable("Add to Library"),
          },
          { label: "Follow Author", icon: "profile" as const, action: follow },
        ].map((a) => (
          <Glass key={a.label} style={{ flex: 1, borderRadius: 18 }}>
            <Pressable
              accessibilityRole="button"
              onPress={a.action}
              style={{
                minHeight: 42,
                paddingHorizontal: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
              }}
            >
              <Icon name={a.icon} color={theme.accent} size={16} />
              <Txt style={{ fontSize: 12, fontWeight: "600" }}>{a.label}</Txt>
            </Pressable>
          </Glass>
        ))}
      </View>
      <DetailSection title="Synopsis">
        <View>
          <Txt
            numberOfLines={expanded ? undefined : 4}
            style={{ fontSize: 14, lineHeight: 23 }}
          >
            {story.synopsis}
          </Txt>
          <TextAction
            label={expanded ? "Show Less" : "Read More"}
            onPress={() => setExpanded((v) => !v)}
          />
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 7 }}>
          {storyTags(story).map((tag) => (
            <Pressable
              key={tag}
              accessibilityRole="button"
              accessibilityLabel={`Discover ${tag}`}
              onPress={() =>
                router.push({ pathname: "/discover", params: { tag } })
              }
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 7,
                backgroundColor: theme.surface,
                minHeight: 32,
                justifyContent: "center",
              }}
            >
              <Txt
                style={{ fontSize: 11, lineHeight: 17, color: theme.accent }}
              >
                {tag}
              </Txt>
            </Pressable>
          ))}
        </View>
      </DetailSection>
      <DetailSection
        title="Chapters"
        action={
          <Glass style={{ borderRadius: 16 }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Chapter order: ${newest ? "Newest First" : "Oldest First"}. Change sort`}
              onPress={() => setNewest((v) => !v)}
              style={{
                minHeight: 38,
                paddingHorizontal: 10,
                flexDirection: "row",
                gap: 6,
                alignItems: "center",
              }}
            >
              <Txt style={{ fontSize: 11 }}>
                {newest ? "Newest First" : "Oldest First"}
              </Txt>
              <Icon name="down" color={theme.muted} size={10} />
            </Pressable>
          </Glass>
        }
      >
        <Txt muted style={{ fontSize: 11, lineHeight: 17 }}>
          {chapters.length} chapters · {selectedEdition?.label ?? language}
        </Txt>
        <View>
          {chapters.slice(0, 15).map((chapter) => (
            <ChapterRow
              key={chapter.id}
              chapter={chapter}
              onOpen={() => openChapter(chapter.number)}
            />
          ))}
        </View>
        <TextAction
          label="View All Chapters"
          onPress={() => {
            setChapterLimit(15);
            setDialog("chapters");
          }}
        />
      </DetailSection>
      <DetailSection
        title="Reviews & Ratings"
        action={
          <TextAction
            label="Write Review"
            onPress={() => unavailable("Write Review")}
          />
        }
      >
        {reviewSummary.count > 0 ? (
          <>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
            >
              <View style={{ gap: 3 }}>
                <Txt title style={{ fontSize: 34, lineHeight: 40 }}>
                  {reviewSummary.average?.toFixed(1)}
                  <Txt muted style={{ fontSize: 14 }}>
                    {" "}
                    / 5
                  </Txt>
                </Txt>
                <Txt style={{ fontSize: 12, color: theme.accent }}>
                  {"★".repeat(Math.round(reviewSummary.average ?? 0))}
                  {"☆".repeat(5 - Math.round(reviewSummary.average ?? 0))}
                </Txt>
                <Txt muted style={{ fontSize: 11 }}>
                  {reviewSummary.count} reader reviews
                </Txt>
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <View
                    key={rating}
                    style={{
                      flexDirection: "row",
                      gap: 7,
                      alignItems: "center",
                    }}
                  >
                    <Txt
                      muted
                      style={{ fontSize: 10, lineHeight: 12, width: 9 }}
                    >
                      {rating}
                    </Txt>
                    <View
                      style={{
                        flex: 1,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: theme.surface,
                      }}
                    >
                      <View
                        style={{
                          height: 4,
                          borderRadius: 2,
                          width: `${(storyReviews.filter((r) => r.rating === rating).length / reviewSummary.count) * 100}%`,
                          backgroundColor: theme.accent,
                        }}
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <Txt muted style={{ fontSize: 12 }}>
              {reviewSummary.spice === null
                ? "No reader spice ratings yet."
                : `Reader spice · ${reviewSummary.spice.toFixed(1)}/5 · ${reviewSummary.spiceCount} reader-submitted ratings`}
            </Txt>
            <View style={{ alignSelf: "flex-start" }}>
              <Chip
                label={
                  reviewSort === "Recent"
                    ? "Recent reviews"
                    : "Highest rated reviews"
                }
                active={false}
                onPress={() =>
                  setReviewSort((v) =>
                    v === "Recent" ? "Highest rated" : "Recent",
                  )
                }
              />
            </View>
            {reviews.map((review) => (
              <View
                key={review.id}
                style={{
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderColor: theme.accent + "18",
                  gap: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Avatar initials={review.initials} size={30} />
                  <View style={{ flex: 1 }}>
                    <Txt style={{ fontSize: 12, fontWeight: "600" }}>
                      {review.reader}
                    </Txt>
                    <Txt muted style={{ fontSize: 10, lineHeight: 16 }}>
                      {review.spice === null
                        ? "Spice not rated"
                        : `Spice ${review.spice}/5`}
                    </Txt>
                  </View>
                  <Txt style={{ fontSize: 11, color: theme.accent }}>
                    {"★".repeat(review.rating)}
                  </Txt>
                </View>
                <Txt style={{ fontSize: 14, fontWeight: "600" }}>
                  {review.title}
                </Txt>
                <Txt muted style={{ fontSize: 13, lineHeight: 21 }}>
                  {review.body}
                </Txt>
                <TextAction
                  label="Report review"
                  muted
                  onPress={() => unavailable("Report review")}
                />
              </View>
            ))}
          </>
        ) : (
          <View style={{ gap: 8 }}>
            <Txt>No reviews yet.</Txt>
            <Txt muted style={{ fontSize: 13, lineHeight: 21 }}>
              This story has no reader ratings or written reviews in the demo
              catalog.
            </Txt>
            <Txt muted style={{ fontSize: 12 }}>
              No reader spice ratings yet.
            </Txt>
          </View>
        )}
      </DetailSection>
      <DetailSection title="About the Creator">
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Avatar initials={initials} size={48} />
          <View style={{ flex: 1 }}>
            <Txt style={{ fontSize: 16, fontWeight: "600" }}>
              {story.author}
            </Txt>
            <Txt muted style={{ fontSize: 11 }}>
              MYTHRA storyteller
            </Txt>
          </View>
          <TextAction
            label="View Profile"
            onPress={() => setDialog("creator")}
          />
        </View>
        <Txt muted style={{ fontSize: 13, lineHeight: 21 }}>
          {creatorBio(story)}
        </Txt>
        <TextAction label="Follow Author" onPress={follow} />
        {works.length ? (
          <Shelf title="More from This Creator" stories={works} />
        ) : (
          <Txt muted style={{ fontSize: 12 }}>
            No other works in this preview.
          </Txt>
        )}
      </DetailSection>
      <Shelf title="More Like This" stories={recommendations} />
      <Sheet
        visible={dialog !== null}
        title={dialogTitle}
        onClose={() => setDialog(null)}
      >
        {dialog === "info" ? (
          <Txt selectable style={{ fontSize: 14, lineHeight: 23 }}>
            {info.body}
          </Txt>
        ) : null}
        {dialog === "languages" ? (
          <>
            {editions.map((edition) => (
              <Pressable
                key={edition.code}
                accessibilityRole="button"
                accessibilityState={{ selected: language === edition.label }}
                onPress={() => {
                  setLanguage(edition.label);
                  setDialog(null);
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  paddingVertical: 14,
                }}
              >
                <Txt style={{ flex: 1 }}>{edition.label}</Txt>
                <Txt muted>{edition.compact}</Txt>
                {language === edition.label ? (
                  <Icon name="check" color={theme.accent} size={17} />
                ) : null}
              </Pressable>
            ))}
          </>
        ) : null}
        {dialog === "more" ? (
          <>
            {[
              "Add to Reading List",
              "Follow Story",
              "Story Update Notifications",
              "Super Like",
              "Report Story",
            ].map((label) => (
              <TextAction
                key={label}
                label={label}
                onPress={() => unavailable(label)}
              />
            ))}
          </>
        ) : null}
        {dialog === "chapters" ? (
          <>
            <TextAction
              label={newest ? "Newest First ↓" : "Oldest First ↑"}
              onPress={() => setNewest((v) => !v)}
            />
            {chapters.slice(0, chapterLimit).map((chapter) => (
              <ChapterRow
                key={chapter.id}
                chapter={chapter}
                onOpen={() => openChapter(chapter.number)}
              />
            ))}
            {chapterLimit < chapters.length ? (
              <Button
                secondary
                label="Load More Chapters"
                onPress={() => setChapterLimit((v) => v + 15)}
              />
            ) : (
              <Txt muted style={{ fontSize: 12 }}>
                All {chapters.length} chapters shown.
              </Txt>
            )}
          </>
        ) : null}
        {dialog === "creator" ? (
          <>
            <View
              style={{ flexDirection: "row", gap: 12, alignItems: "center" }}
            >
              <Avatar initials={initials} size={52} />
              <Txt title style={{ fontSize: 23 }}>
                {story.author}
              </Txt>
            </View>
            <Txt>{creatorBio(story)}</Txt>
            <Button secondary label="Follow Author" onPress={follow} />
            <Txt muted>Other published works</Txt>
            {works.map((work) => (
              <TextAction
                key={work.id}
                label={work.title}
                onPress={() => {
                  setDialog(null);
                  router.push({
                    pathname: "/story/[id]",
                    params: { id: work.id },
                  });
                }}
              />
            ))}
          </>
        ) : null}
      </Sheet>
    </Page>
  );
}
export default function StoryDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const story =
    visibleStories.find((s) => s.id === id) ??
    findAuthorPreview(typeof id === "string" ? id : undefined);
  if (!story)
    return (
      <Page>
        <Txt title>Story not found</Txt>
        <Button label="Back to Home" onPress={() => router.replace("/")} />
      </Page>
    );
  return <StoryContent key={story.id} story={story} />;
}
