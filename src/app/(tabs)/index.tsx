import { NextRead, BooksByAuthors } from "@/components/home/editorial";
import { useDiscovery } from "@/hooks/use-discovery";
import { authorCollections, homeEditorial } from "@/services/home-editorial";
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
  "trending",
  "novels",
  "toons",
  "shorts",
  "mf",
  "completed",
];
function homeShelf(key: string) {
  const c = collections.find((collection) => collection.key === key)!;
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
}
export default function Home() {
  const { theme } = useTheme();
  const { state } = useDiscovery();
  const editorial =
    state.status === "ready"
      ? homeEditorial(state.data.catalog, state.data.mode)
      : null;
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
      {editorial ? <NextRead stories={editorial.next} /> : null}
      {homeShelf("gl")}
      <EditorialFeature story={visibleStories[0]} />
      {homeShelf("bl")}
      {editorial ? (
        <BooksByAuthors
          collections={
            state.status === "ready"
              ? authorCollections(state.data.catalog, state.data.mode)
              : []
          }
        />
      ) : null}
      {homeShelf("updated")}
      <ChartShelf stories={collectionStories("charts")} />
      {homeShelf("new")}
      {homeKeys.map(homeShelf)}
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
