import { Page, Panel, Txt } from "@/components/ui";
export default function Create() {
  return (
    <Page>
      <Txt muted style={{ letterSpacing: 2, fontSize: 11 }}>
        A HOME FOR YOUR IMAGINATION
      </Txt>
      <Txt title>Every world starts{"\n"}with a word.</Txt>
      <Panel>
        <Txt title style={{ fontSize: 24 }}>
          Creator Studio
        </Txt>
        <Txt muted>
          Coming in a later stage. Write novels, publish toons, manage chapters,
          and credit your creative team.
        </Txt>
      </Panel>
      <Panel>
        <Txt>Your stories, your voice</Txt>
        <Txt muted>
          Publishing, drafts, analytics, and creator accounts are not connected
          yet.
        </Txt>
      </Panel>
    </Page>
  );
}
