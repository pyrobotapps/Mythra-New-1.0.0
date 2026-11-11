import { Avatar } from "@/components/story/controls";
import { authorPreviewBooks } from "@/data/author-preview";
import { catalogMode } from "@/config/catalog-mode";
import { router } from "expo-router";
import { updateSelection } from "./policy";
import { useState } from "react";
import { Switch, View } from "react-native";
import { Button, Page, Txt, Chip, StoryCard } from "@/components/ui";
import { useTheme, themes, ThemeId } from "@/theme";
import {
  Field,
  ScreenHeading,
  Destination,
  Section,
  EmptyState,
  DeferredAction,
} from "./components";
import { ExperienceSpec } from "./registry";
import { visibleStories } from "@/services/catalog";
import { resolveStory } from "./resolve-story";
import { getStoryReviews, summarizeReviews } from "@/services/story-details";
export function ExperienceScreen({
  spec,
  context,
  subject,
}: {
  spec: ExperienceSpec;
  context?: string;
  subject?: string;
}) {
  const { theme, id, setTheme } = useTheme();
  const [values, setValues] = useState<Record<string, string>>({});
  const [choices, setChoices] = useState<Record<string, string[]>>({});
  const [toggles, setToggles] = useState<Record<string, boolean>>({});
  const story = resolveStory(context);
  const author =
    spec.id === "creator-profile" ? (story?.author ?? context) : undefined;
  const works = author
    ? [...visibleStories, ...authorPreviewBooks(catalogMode)].filter(
        (s) => s.author === author,
      )
    : [];
  const reviews = story ? getStoryReviews(story.id) : [];
  const sortedReviews =
    choices.Sort?.[0] === "Highest rated"
      ? [...reviews].sort((a, b) => b.rating - a.rating)
      : [...reviews].reverse();
  const summary = summarizeReviews(reviews);
  const select = (label: string, option: string, multiple?: boolean) =>
    setChoices((old) => ({
      ...old,
      [label]: updateSelection(old[label] ?? [], option, multiple),
    }));
  return (
    <Page gap={24}>
      <ScreenHeading title={author ?? spec.title} subtitle={spec.intro} />
      <Txt muted style={{ fontSize: 11, letterSpacing: 1 }}>
        {spec.domain.toUpperCase()} · DESIGN PREVIEW
      </Txt>
      {author ? (
        <View style={{ flexDirection: "row", gap: 14, alignItems: "center" }}>
          <Avatar
            initials={author
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)}
            size={56}
          />
          <Txt muted style={{ flex: 1 }}>
            Development catalog creator · no verified biography or follower
            metrics connected.
          </Txt>
        </View>
      ) : null}
      {spec.id === "sign-in" ||
      spec.id === "register" ||
      spec.id === "reset-password" ? (
        <Txt muted>
          Use fictional details only. Authentication is not connected.
        </Txt>
      ) : null}
      {context && !author ? (
        <Txt literary style={{ fontSize: 22 }}>
          {story?.title ?? context}
        </Txt>
      ) : null}
      {(spec.kind === "form" || spec.kind === "preferences") &&
      spec.id !== "themes" ? (
        <Txt muted style={{ fontSize: 12 }}>
          Editable preview · choices are temporary and are not submitted.
        </Txt>
      ) : null}
      {subject ? <Txt muted>{subject}</Txt> : null}
      {spec.id === "themes" ? (
        <View style={{ gap: 10 }}>
          {(Object.keys(themes) as ThemeId[]).map((key) => (
            <Chip
              key={key}
              label={themes[key].name}
              active={id === key}
              onPress={() => setTheme(key)}
            />
          ))}
        </View>
      ) : null}
      {spec.kind === "offer" ? (
        <View
          style={{
            height: 3,
            width: 64,
            borderRadius: 2,
            backgroundColor: theme.accent,
          }}
        />
      ) : null}
      {spec.notes ? (
        <Section title="Good to know">
          {spec.notes.map((note) => (
            <Txt muted key={note}>
              {note}
            </Txt>
          ))}
        </Section>
      ) : null}
      {spec.id === "new-story" || spec.id === "edit-story" ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 18 }}>
          <View
            accessibilityLabel="Empty portrait cover preview"
            style={{
              width: 86,
              aspectRatio: 2 / 3,
              backgroundColor: theme.surface,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: theme.accent + "33",
            }}
          />
          <View style={{ flex: 1, gap: 10 }}>
            <Txt literary style={{ fontSize: 23 }}>
              The first impression
            </Txt>
            <Txt muted style={{ fontSize: 12 }}>
              No artwork selected
            </Txt>
            <DeferredAction
              label="Cover upload · not connected"
              reason="Cover selection, rights verification, storage and crop previews will be connected in the publishing phase. No file is uploaded."
            />
          </View>
        </View>
      ) : null}
      {spec.id === "toon-upload" ? (
        <View style={{ gap: 12 }}>
          <View
            accessibilityLabel="Empty vertical comic upload sequence"
            style={{
              minHeight: 180,
              backgroundColor: theme.surface,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              padding: 24,
              gap: 12,
            }}
          >
            <Txt literary style={{ fontSize: 26 }}>
              Your panels, in order
            </Txt>
            <Txt muted>No artwork selected</Txt>
          </View>
          <DeferredAction
            label="Batch artwork · not connected"
            reason="Batch image selection, ordering and upload validation require the future content storage pipeline."
          />
          <DeferredAction
            label="ZIP import · not connected"
            reason="ZIP import will be available only on supported platforms after archive validation and upload processing are implemented."
          />
        </View>
      ) : null}
      {spec.fields?.map((field) => (
        <Field
          key={field.label}
          label={field.label}
          placeholder={field.placeholder}
          value={values[field.label] ?? ""}
          onChangeText={(value) =>
            setValues((old) => ({ ...old, [field.label]: value }))
          }
          secureTextEntry={field.secure}
          autoCapitalize={field.email || field.secure ? "none" : "sentences"}
          autoComplete="off"
          keyboardType={field.email ? "email-address" : "default"}
          multiline={field.multiline}
          style={field.multiline ? { minHeight: 120 } : undefined}
        />
      ))}
      {spec.choices?.map((choice) => (
        <Section key={choice.label} title={choice.label}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {choice.options.map((option) => (
              <Chip
                key={option}
                label={option}
                active={(choices[choice.label] ?? []).includes(option)}
                onPress={() => select(choice.label, option, choice.multiple)}
              />
            ))}
          </View>
        </Section>
      ))}
      {spec.toggles?.map((label) => (
        <View
          key={label}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            minHeight: 48,
          }}
        >
          <Txt style={{ flex: 1 }}>{label}</Txt>
          <Switch
            accessibilityLabel={label}
            value={toggles[label] ?? false}
            onValueChange={(value) =>
              setToggles((old) => ({ ...old, [label]: value }))
            }
            trackColor={{ true: theme.accent, false: theme.surface }}
          />
        </View>
      ))}
      {spec.id === "creator-profile" ? (
        <Section title="Published works">
          {works.length ? (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {works.map((work) => (
                <StoryCard key={work.id} story={work} />
              ))}
            </View>
          ) : (
            <EmptyState
              title="No eligible works loaded"
              body="Only approved, published works from the selected creator belong here. No popularity or follower count is invented."
            />
          )}
        </Section>
      ) : null}
      {spec.id === "editions" && story ? (
        <Section title="Available editions">
          {story.languages.map((language) => (
            <Button
              secondary
              key={language}
              label={`${language} · open Story Details`}
              onPress={() =>
                router.push({
                  pathname: "/story/[id]",
                  params: { id: story.id },
                })
              }
            />
          ))}
        </Section>
      ) : null}
      {spec.id === "reviews" ? (
        <Section title="Reviews & ratings">
          <Txt>
            {summary.average === null
              ? "Not yet rated"
              : `★ ${summary.average.toFixed(1)} · ${summary.count} development reviews`}
          </Txt>
          {reviews.length ? (
            sortedReviews.map((review) => (
              <View key={review.id} style={{ gap: 8 }}>
                <Txt style={{ fontWeight: "600" }}>{review.title}</Txt>
                <Txt muted>
                  {review.reader} · {review.rating} ★ · Spice{" "}
                  {review.spice ?? "Not rated"}
                </Txt>
                <Txt>{review.body}</Txt>
              </View>
            ))
          ) : (
            <EmptyState
              title="No reviews available"
              body="No reviews are connected for this story. Be the first to leave a thoughtful response when review publishing becomes available."
            />
          )}
        </Section>
      ) : null}
      {spec.empty && !(spec.id === "editions" && story) ? (
        <EmptyState {...spec.empty} />
      ) : null}
      {spec.action ? (
        <DeferredAction label={spec.action} reason={spec.deferred} />
      ) : null}
      {spec.links?.length ? (
        <Section title={spec.kind === "hub" ? "Explore" : "Continue"}>
          {spec.links.map((link) => (
            <Destination
              key={link.screen}
              {...link}
              context={context}
              subject={subject}
            />
          ))}
        </Section>
      ) : null}
      <Txt muted style={{ fontSize: 12, lineHeight: 19 }}>
        {spec.deferred}
      </Txt>
    </Page>
  );
}
