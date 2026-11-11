import { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Button, Chip, Page, Txt } from "@/components/ui";
import {
  Destination,
  EmptyState,
  Section,
} from "@/features/experience/components";
import { openExperience } from "@/features/experience/navigation";
const categories = [
  "Currently Reading",
  "Want to Read",
  "Completed",
  "Favorites",
  "Reading History",
  "Downloads",
];
export default function Library() {
  const [category, setCategory] = useState(categories[0]);
  return (
    <Page gap={24}>
      <Txt title>Your Library</Txt>
      <Txt muted>A place for every chapter of your reading life.</Txt>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {categories.map((label) => (
          <Chip
            key={label}
            label={label}
            active={category === label}
            onPress={() => setCategory(label)}
          />
        ))}
      </View>
      <EmptyState
        title={
          category === "Downloads"
            ? "Your offline shelf is waiting"
            : `Nothing in ${category.toLowerCase()} yet`
        }
        body={
          category === "Downloads"
            ? "Downloads and offline reading are not connected. No files have been saved."
            : "Sign in and connected library services will bring your saved stories and reading progress here. This preview does not invent library activity."
        }
      />
      <Button
        label="Find your next story"
        onPress={() => router.push("/discover")}
      />
      <Section title="Custom Collections">
        <Destination
          title="Your collections"
          detail="Create a local layout preview for a personal shelf"
          screen="collections"
        />
        <Button
          secondary
          label="Design a collection"
          onPress={() => openExperience("collection-editor")}
        />
      </Section>
      <Button
        secondary
        label="Sign in · account preview"
        onPress={() => openExperience("sign-in")}
      />
    </Page>
  );
}
