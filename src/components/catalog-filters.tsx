import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Modal, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Chip, Chips, Txt } from "./ui";
import { IconButton } from "./glass";
import {
  type CatalogFilters,
  formats,
  toggleSelection,
} from "@/services/catalog";
import { plannedLanguages } from "@/models/catalog";
import { useTheme } from "@/theme";
const relationshipOptions = [
  { label: "Boys Love", value: "BL" },
  { label: "Girls Love", value: "GL" },
  { label: "M/F", value: "M/F" },
  { label: "Multiple / Poly", value: "Multiple / Poly" },
  { label: "Other", value: "Other" },
  { label: "No Romance", value: "Non-romance" },
];
const genreOptions = [
  "Romance",
  "Fantasy",
  "Horror",
  "Action",
  "Adventure",
  "Mystery",
  "Thriller",
  "Sci-fi",
  "Slice of Life",
  "Historical",
  "Drama",
  "Comedy",
  "Supernatural",
].map((value) => ({ value, label: value === "Sci-fi" ? "Sci-Fi" : value }));
function MultiSelect({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: readonly { label: string; value: string }[];
  selected: string[];
  onChange: (values: string[]) => void;
}) {
  return (
    <View style={{ gap: 12 }}>
      <Txt
        accessibilityRole="header"
        style={{ fontSize: 16, fontWeight: "600" }}
      >
        {label}
      </Txt>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        <Chip
          label="Any"
          active={!selected.length}
          onPress={() => onChange([])}
        />
        {options.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            active={selected.includes(option.value)}
            onPress={() => onChange(toggleSelection(selected, option.value))}
          />
        ))}
      </View>
    </View>
  );
}
export function FilterSheet({
  visible,
  onClose,
  filters,
  onChange,
  onApply,
  onClear,
  count,
}: {
  visible: boolean;
  onClose: () => void;
  filters: CatalogFilters;
  onChange: (value: CatalogFilters) => void;
  onApply: () => void;
  onClear: () => void;
  count: number;
}) {
  const { theme } = useTheme();
  const reducedMotion = useReducedMotion();
  return (
    <Modal
      visible={visible}
      animationType={reducedMotion ? "none" : "slide"}
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
        <View
          style={{
            padding: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Txt title style={{ flex: 1, fontSize: 26 }}>
            Find your story
          </Txt>
          <IconButton name="close" label="Close filters" onPress={onClose} />
        </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ padding: 20, gap: 28, paddingBottom: 32 }}
        >
          <Txt muted style={{ fontSize: 12, lineHeight: 20 }}>
            Choose one or several preferences. Apply when you’re ready.
          </Txt>
          <MultiSelect
            label="Relationships"
            options={relationshipOptions}
            selected={filters.relationships}
            onChange={(relationships) =>
              onChange({ ...filters, relationships })
            }
          />
          <MultiSelect
            label="Genres"
            options={genreOptions}
            selected={filters.genres}
            onChange={(genres) => onChange({ ...filters, genres })}
          />
          <MultiSelect
            label="Story format"
            options={formats.map((value) => ({ label: value, value }))}
            selected={filters.formats}
            onChange={(formats) => onChange({ ...filters, formats })}
          />
          {(
            [
              [
                "Reading language",
                "language",
                ["All", ...plannedLanguages.map((language) => language.label)],
              ],
              [
                "Content classification",
                "classification",
                ["All", "Safe", "Suggestive", "Erotica", "Pornographic"],
              ],
              [
                "Completion status",
                "status",
                ["All", "Ongoing", "Complete", "Hiatus"],
              ],
              ["Access type", "access", ["All", "Free", "Paid"]],
            ] as const
          ).map(([label, key, values]) => (
            <View key={key} style={{ gap: 12 }}>
              <Txt style={{ fontSize: 16, fontWeight: "600" }}>{label}</Txt>
              <Chips
                values={values}
                value={filters[key]}
                onChange={(value) => onChange({ ...filters, [key]: value })}
              />
            </View>
          ))}
          <Txt muted style={{ fontSize: 12, lineHeight: 19 }}>
            Filters only narrow available editions. They never unlock restricted
            material. Explicit content is excluded from this mobile catalog.
          </Txt>
        </ScrollView>
        <View
          style={{
            padding: 20,
            gap: 12,
            borderTopWidth: 1,
            borderColor: theme.accent + "20",
          }}
        >
          <Txt muted style={{ fontSize: 11 }}>
            {count} matching {count === 1 ? "story" : "stories"}
          </Txt>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ flex: 1 }}>
              <Button secondary label="Clear Filters" onPress={onClear} />
            </View>
            <View style={{ flex: 1 }}>
              <Button label="Apply Filters" onPress={onApply} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
