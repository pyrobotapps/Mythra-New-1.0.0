import { Button, Page, Txt } from "@/components/ui";
import {
  Destination,
  EmptyState,
  Section,
} from "@/features/experience/components";
import { openExperience } from "@/features/experience/navigation";
export default function Create() {
  return (
    <Page gap={24}>
      <Txt muted style={{ letterSpacing: 2, fontSize: 11 }}>
        A HOME FOR YOUR IMAGINATION
      </Txt>
      <Txt title>Every world starts{"\n"}with a word.</Txt>
      <Txt handwritten style={{ fontSize: 25, lineHeight: 34 }}>
        Leave a little ink.
      </Txt>
      <Button
        label="New story · design preview"
        onPress={() => openExperience("new-story")}
      />
      <EmptyState
        title="Your writing room is waiting"
        body="No creator account or published workspace is connected. Explore the Studio designs without saving or publishing anything."
      />
      <Section title="Creator Studio">
        <Destination
          title="Studio dashboard"
          detail="Stories, chapters and your creative team"
          screen="studio"
        />
        <Destination
          title="My stories"
          detail="Drafts, scheduled and published works"
          screen="my-stories"
        />
        <Destination title="Chapter editor" screen="chapter-editor" />
        <Destination title="Toon upload" screen="toon-upload" />
        <Destination title="Schedule" screen="schedule" />
      </Section>
      <Section title="Across languages">
        <Destination
          title="Translation editions"
          screen="translation-editions"
        />
        <Destination
          title="Translator marketplace"
          screen="translator-marketplace"
        />
        <Destination title="Collaborators" screen="collaborators" />
      </Section>
      <Section title="Your creator business">
        <Destination title="Analytics" screen="analytics" />
        <Destination title="Earnings" screen="earnings" />
      </Section>
    </Page>
  );
}
