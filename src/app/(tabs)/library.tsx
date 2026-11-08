import { Page, Panel, Txt } from "@/components/ui";
export default function Library() {
  return (
    <Page>
      <Txt title>Your Library</Txt>
      <Txt muted>Library features are planned for the next stage.</Txt>
      {["Currently Reading", "Want to Read", "Completed", "Downloads"].map(
        (label) => (
          <Panel key={label}>
            <Txt>{label}</Txt>
            <Txt muted>
              No saved items yet. Saving, reading progress, and offline
              downloads are not implemented.
            </Txt>
          </Panel>
        ),
      )}
    </Page>
  );
}
