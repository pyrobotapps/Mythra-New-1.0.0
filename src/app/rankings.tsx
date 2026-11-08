import { useState } from "react";
import { router } from "expo-router";
import { Button, Chips, DemoNote, Page, Txt } from "@/components/ui";
import { ChartRow } from "@/components/bookstore";
import { formats, visibleStories } from "@/services/catalog";
export default function Rankings() {
  const [format, setFormat] = useState("Novel");
  return (
    <Page>
      <Button
        secondary
        label="← Back"
        onPress={() =>
          router.canGoBack() ? router.back() : router.replace("/")
        }
      />
      <Txt title>Top Charts</Txt>
      <DemoNote />
      <Txt muted>
        US demonstration chart. This is a fixed editorial ordering of fictional
        stories, not readership or sales analytics.
      </Txt>
      <Chips values={formats} value={format} onChange={setFormat} />
      {visibleStories
        .filter((s) => s.format === format)
        .slice(0, 10)
        .map((s, i) => (
          <ChartRow key={s.id} story={s} rank={i + 1} />
        ))}
    </Page>
  );
}
