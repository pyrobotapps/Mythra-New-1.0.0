import { View } from "react-native";
import { router } from "expo-router";
import {
  Button,
  DemoNote,
  Page,
  SectionHeading,
  Shelf,
  Txt,
} from "@/components/ui";
import {
  ChartShelf,
  EditorialFeature,
  StoreHeader,
} from "@/components/bookstore";
import {
  collections,
  collectionStories,
  visibleStories,
} from "@/services/catalog";
import { useTheme } from "@/theme";
const homeKeys = [
  "picks",
  "new",
  "trending",
  "novels",
  "toons",
  "shorts",
  "bl",
  "gl",
  "mf",
  "completed",
  "updated",
];
export default function Home() {
  const { theme } = useTheme();
  return (
    <Page>
      <StoreHeader />
      <DemoNote />
      <View style={{ gap: 12 }}>
        <SectionHeading
          title="Continue Reading"
          onSeeAll={() => router.push("/library")}
        />
        <View
          style={{
            borderLeftWidth: 2,
            borderColor: theme.accent,
            paddingLeft: 16,
            gap: 6,
          }}
        >
          <Txt style={{ fontSize: 15 }}>Your next chapter starts here.</Txt>
          <Txt muted style={{ fontSize: 12, lineHeight: 19 }}>
            No reading history yet. Readers and resume progress arrive in Phase
            2.
          </Txt>
          <View style={{ alignSelf: "flex-start", marginTop: 4 }}>
            <Button
              secondary
              label="Find a story"
              onPress={() => router.navigate("/discover")}
            />
          </View>
        </View>
      </View>
      <EditorialFeature story={visibleStories[0]} />
      <ChartShelf stories={collectionStories("charts")} />
      {homeKeys.map((key) => {
        const c = collections.find((c) => c.key === key)!;
        return (
          <Shelf
            key={key}
            title={c.title}
            subtitle={c.subtitle}
            stories={collectionStories(key)}
            collectionKey={key}
            twoRows={c.layout === "double"}
          />
        );
      })}
      <View style={{ gap: 12 }}>
        <SectionHeading
          title="Following"
          subtitle="Updates from the creators you love"
          onSeeAll={() => router.push("/notifications")}
        />
        <Txt muted style={{ fontSize: 13 }}>
          Followed-creator updates will be available when following and accounts
          are connected in a later phase.
        </Txt>
        <Button
          secondary
          label="Explore new voices"
          onPress={() => router.push("/collection/editors")}
        />
      </View>
    </Page>
  );
}
