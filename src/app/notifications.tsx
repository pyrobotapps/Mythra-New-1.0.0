import { router } from "expo-router";
import { Button, Page, Panel, Txt } from "@/components/ui";
export default function Notifications() {
  return (
    <Page>
      <Button
        secondary
        label="← Back"
        onPress={() =>
          router.canGoBack() ? router.back() : router.replace("/")
        }
      />
      <Txt title>Notifications</Txt>
      <Panel>
        <Txt>No notifications yet</Txt>
        <Txt muted>
          Story updates and followed-creator activity will arrive with community
          features. No notification service or account is connected in this
          demo.
        </Txt>
      </Panel>
      <Button
        secondary
        label="Discover creators through their stories"
        onPress={() => router.push("/collection/editors")}
      />
    </Page>
  );
}
