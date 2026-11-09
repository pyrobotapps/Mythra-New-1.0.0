import { AuthorBlocks } from "@/components/home/editorial";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Page, Txt } from "@/components/ui";
import {
  DiscoveryLoadStatus,
  DiscoveryResults,
} from "@/components/discover/discovery";
import { useDiscovery } from "@/hooks/use-discovery";
import { authorCollections, homeEditorial } from "@/services/home-editorial";
export default function HomeCollection() {
  const { section } = useLocalSearchParams<{ section: string }>();
  const { state, retry } = useDiscovery();
  const authors = section === "authors";
  const collection =
    state.status === "ready"
      ? homeEditorial(state.data.catalog, state.data.mode)
      : null;
  const stories = collection
    ? authors
      ? collection.authors
      : collection.next
    : [];
  return (
    <Page gap={22}>
      <Button
        secondary
        label="← Back to Home"
        onPress={() =>
          router.canGoBack() ? router.back() : router.replace("/")
        }
      />
      <Txt title>{authors ? "Books by Authors" : "Find Your Next Read"}</Txt>
      <Txt muted>
        {authors
          ? "Explore stories from MYTHRA creators. Selected for discovery, not popularity."
          : "Discover new worlds, unforgettable characters, and stories worth staying up for."}
      </Txt>
      {state.status !== "ready" ? (
        <DiscoveryLoadStatus state={state} onRetry={retry} />
      ) : (
        <>
          {state.data.mode === "demo" ? (
            <Txt muted style={{ fontSize: 10 }}>
              DEVELOPMENT CATALOG · Fictional stories
            </Txt>
          ) : null}
          {stories.length ? (
            authors ? (
              <AuthorBlocks
                showAllWorks
                collections={authorCollections(
                  state.data.catalog,
                  state.data.mode,
                )}
              />
            ) : (
              <DiscoveryResults stories={stories} />
            )
          ) : (
            <Txt muted>No published stories in this collection yet.</Txt>
          )}
        </>
      )}
    </Page>
  );
}
