import { router, useLocalSearchParams } from "expo-router";
import { Button, Page, Txt } from "@/components/ui";
import {
  DiscoveryLoadStatus,
  DiscoveryResults,
} from "@/components/discover/discovery";
import { useDiscovery } from "@/hooks/use-discovery";
import { buildDiscoverySections } from "@/services/discovery-policy";
export default function DiscoveryCollection() {
  const { section } = useLocalSearchParams<{ section: string }>();
  const { state, retry } = useDiscovery();
  const collection =
    state.status === "ready"
      ? buildDiscoverySections(state.data.catalog).find(
          (value) => value.key === section,
        )
      : undefined;
  return (
    <Page gap={22}>
      <Button
        secondary
        label="← Back to Discover"
        onPress={() =>
          router.canGoBack() ? router.back() : router.replace("/discover")
        }
      />
      {state.status !== "ready" ? (
        <DiscoveryLoadStatus state={state} onRetry={retry} />
      ) : (
        <>
          <Txt title>{collection?.title ?? "Discover"}</Txt>
          <Txt muted>
            {collection?.subtitle ??
              "No eligible stories in this collection yet."}
          </Txt>
          {state.data.mode === "demo" ? (
            <Txt muted style={{ fontSize: 10 }}>
              DEVELOPMENT CATALOG · Fictional stories
            </Txt>
          ) : null}
          {collection?.stories.length ? (
            <DiscoveryResults stories={collection.stories} />
          ) : null}
        </>
      )}
    </Page>
  );
}
