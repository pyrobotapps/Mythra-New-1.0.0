import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { coverAssets } from "@/data/cover-assets";
import { formats, visibleStories } from "@/services/catalog";
import { useTheme } from "@/theme";
import { Glass } from "@/components/glass";
import { SectionHeading, Txt } from "@/components/ui";
const genreArtwork = [
  { genre: "Fantasy", id: "moonlit-vow", caption: "Beyond the ordinary" },
  { genre: "Mystery", id: "house-of-rain", caption: "Follow every clue" },
  { genre: "Romance", id: "garden-of-us", caption: "A little closer" },
  { genre: "Horror", id: "hollow-hour", caption: "After the lights go out" },
  { genre: "Sci-fi", id: "between-stars", caption: "Somewhere in the stars" },
  {
    genre: "Slice of Life",
    id: "summer-platform",
    caption: "The extraordinary everyday",
  },
];
export function GenreCollections() {
  return (
    <View style={{ gap: 16 }}>
      <SectionHeading
        title="Browse by Genre"
        subtitle="Which world will you wander into?"
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
      >
        {[0, 1, 2].map((column) => (
          <View key={column} style={{ gap: 12 }}>
            {genreArtwork.slice(column * 2, column * 2 + 2).map((item) => (
              <Pressable
                key={item.genre}
                accessibilityRole="button"
                accessibilityLabel={`Browse ${item.genre}`}
                onPress={() =>
                  router.push({
                    pathname: "/collection/[key]",
                    params: {
                      key: "custom",
                      title: item.genre,
                      ids: visibleStories
                        .filter((s) => s.genre === item.genre && !s.comingSoon)
                        .map((s) => s.id)
                        .join(","),
                    },
                  })
                }
                style={{
                  width: 214,
                  height: 116,
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={coverAssets[item.id]}
                  contentFit="cover"
                  contentPosition="center"
                  style={StyleSheet.absoluteFill}
                />
                <LinearGradient
                  colors={["#09071320", "#090713E8"]}
                  style={StyleSheet.absoluteFill}
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    padding: 15,
                    gap: 2,
                  }}
                >
                  <Txt
                    title
                    style={{ fontSize: 23, lineHeight: 28, color: "#FFF7EC" }}
                  >
                    {item.genre}
                  </Txt>
                  <Txt
                    style={{ fontSize: 10, lineHeight: 16, color: "#F0E3E5" }}
                  >
                    {item.caption}
                  </Txt>
                </View>
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const relationshipCollections = [
  { label: "BL", subtitle: "M/M stories", values: ["BL"] },
  { label: "GL", subtitle: "F/F stories", values: ["GL"] },
  { label: "M/F", subtitle: "Romance & more", values: ["M/F"] },
  {
    label: "Other",
    subtitle: "Every connection",
    values: ["Other", "Multiple / Poly"],
  },
  {
    label: "No Romance",
    subtitle: "Worlds beyond love",
    values: ["Non-romance"],
  },
];
export function RelationshipCollections() {
  const { theme } = useTheme();
  return (
    <View style={{ gap: 16 }}>
      <SectionHeading
        title="Browse by Relationship"
        subtitle="Every kind of connection. Every kind of story."
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
      >
        {relationshipCollections.map((item) => (
          <Pressable
            key={item.label}
            accessibilityRole="button"
            accessibilityLabel={`Browse ${item.label} stories`}
            onPress={() =>
              router.push({
                pathname: "/collection/[key]",
                params: {
                  key: "custom",
                  title: item.label,
                  ids: visibleStories
                    .filter(
                      (s) =>
                        item.values.includes(s.relationship) && !s.comingSoon,
                    )
                    .map((s) => s.id)
                    .join(","),
                },
              })
            }
            style={({ pressed }) => ({
              width: 135,
              minHeight: 94,
              padding: 15,
              borderRadius: 12,
              backgroundColor: theme.surface,
              borderBottomWidth: 2,
              borderColor: theme.accent + "70",
              justifyContent: "space-between",
              opacity: pressed ? 0.65 : 1,
            })}
          >
            <Txt title style={{ fontSize: 23, lineHeight: 29 }}>
              {item.label}
            </Txt>
            <Txt muted style={{ fontSize: 10, lineHeight: 16 }}>
              {item.subtitle}
            </Txt>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
const labels = {
  Novel: "Novels",
  Toon: "Toons",
  "Short Story": "Short Stories",
};
export function ChartSegments({
  value,
  onChange,
}: {
  value: string;
  onChange: (s: string) => void;
}) {
  const { theme } = useTheme();
  return (
    <Glass style={{ borderRadius: 15, padding: 4, flexDirection: "row" }}>
      {formats.map((format) => (
        <Pressable
          accessibilityRole="tab"
          accessibilityState={{ selected: format === value }}
          aria-selected={format === value}
          accessibilityLabel={labels[format]}
          key={format}
          onPress={() => onChange(format)}
          style={{
            flex: 1,
            minHeight: 38,
            paddingHorizontal: 6,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 11,
            backgroundColor: value === format ? theme.accent : "transparent",
          }}
        >
          <Txt
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: format === value ? theme.bg : theme.muted,
            }}
          >
            {labels[format]}
          </Txt>
        </Pressable>
      ))}
    </Glass>
  );
}
