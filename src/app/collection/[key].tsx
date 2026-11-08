import { useLocalSearchParams, router } from "expo-router";
import { View } from "react-native";
import {
  Button,
  DemoNote,
  Page,
  StoryCard,
  Txt,
  styles,
} from "@/components/ui";
import {
  collections,
  collectionStories,
  visibleStories,
} from "@/services/catalog";
export default function Collection() {
  const { key, title, ids } = useLocalSearchParams<{
    key: string;
    title?: string;
    ids?: string;
  }>();
  const c = collections.find((c) => c.key === key);
  const items = c
    ? collectionStories(key)
    : ids
      ? ids
          .split(",")
          .flatMap((id) => visibleStories.filter((s) => s.id === id))
      : [];
  return (
    <Page>
      <Button
        secondary
        label="← Back"
        onPress={() =>
          router.canGoBack() ? router.back() : router.replace("/")
        }
      />
      <View style={{ gap: 8 }}>
        <Txt title>{c?.title ?? title ?? "Collection"}</Txt>
        <Txt muted>{c?.subtitle ?? "Your selected demonstration stories"}</Txt>
      </View>
      <DemoNote />
      <Txt muted style={{ fontSize: 12 }}>
        {items.length} {items.length === 1 ? "story" : "stories"}
      </Txt>
      <View style={styles.wrap}>
        {items.map((s) => (
          <StoryCard key={s.id} story={s} />
        ))}
      </View>
      {!items.length ? (
        <Txt muted>No demo stories in this selection.</Txt>
      ) : null}
    </Page>
  );
}
