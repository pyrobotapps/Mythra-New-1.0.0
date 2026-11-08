import { View } from "react-native";
import { Chip, DemoNote, Page, Panel, Txt } from "@/components/ui";
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
      <Panel>
        <Txt>Preferences · Coming in a later stage</Txt>
        <Txt muted>
          Reading defaults, notifications, account settings, and language
          preferences.
        </Txt>
      </Panel>
    </Page>
  );
}
