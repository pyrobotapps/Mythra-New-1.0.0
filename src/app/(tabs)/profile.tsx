import { Destination, Section } from "@/features/experience/components";
import { openExperience } from "@/features/experience/navigation";
import { View } from "react-native";
import { Button, Chip, DemoNote, Page, Panel, Txt } from "@/components/ui";
import { ThemeId, themes, useTheme } from "@/theme";
export default function Profile() {
  const { id, setTheme } = useTheme();
  return (
    <Page>
      <Txt title>Make yourself at home.</Txt>
      <DemoNote />
      <Panel>
        <Txt title style={{ fontSize: 24 }}>
          Welcome, reader
        </Txt>
        <Txt muted>
          You’re browsing as a guest. Accounts and synced preferences will
          arrive with Supabase integration.
        </Txt>
      </Panel>
      <Txt title style={{ fontSize: 24 }}>
        Your atmosphere
      </Txt>
      <Txt muted>Choose a theme. Your selection is saved on this device.</Txt>
      <View style={{ gap: 12 }}>
        {(Object.keys(themes) as ThemeId[]).map((key) => (
          <Chip
            key={key}
            label={`${id === key ? "✦  " : ""}${themes[key].name}`}
            active={id === key}
            onPress={() => setTheme(key)}
          />
        ))}
      </View>
      <Button
        label="Sign in · account preview"
        onPress={() => openExperience("sign-in")}
      />
      <Section title="Your reading world">
        <Destination title="Reader profile" screen="reader-profile" />
        <Destination title="Community & messages" screen="community" />
        <Destination title="Preferences & account" screen="settings" />
      </Section>
      {__DEV__ ? (
        <>
          <Section title="Support stories">
            <Destination title="MYTHRA+ membership" screen="membership" />
            <Destination title="Subscriptions & coins" screen="wallet" />
            <Destination
              title="Translator marketplace"
              screen="translator-marketplace"
            />
          </Section>
          <Section title="Phase 1 design review">
            <Destination
              title="Experience map"
              detail="All secondary designs and integration boundaries"
              screen="experience-map"
            />
            <Destination
              title="Administration design preview"
              detail="No admin access is granted"
              screen="admin"
            />
          </Section>
        </>
      ) : null}
    </Page>
  );
}
