import { Modal, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Chip, Chips, Txt } from "./ui";
import { IconButton } from "./glass";
import {
  CatalogFilters,
  emptyFilters,
  formats,
  genres,
  relationships,
  toggleSelection,
} from "@/services/catalog";
import { useTheme } from "@/theme";
export function MultiSelect({
  label,
  values,
  selected,
  onChange,
}: {
  label: string;
  values: readonly string[];
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <View style={{ gap: 10 }}>
      <Txt style={{ fontWeight: "600" }}>{label}</Txt>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        <Chip
          label="All"
          active={!selected.length}
          onPress={() => onChange([])}
        />
        {values.map((v) => (
          <Chip
            key={v}
            label={v}
            active={selected.includes(v)}
            onPress={() => onChange(toggleSelection(selected, v))}
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
  count,
}: {
  visible: boolean;
  onClose: () => void;
  filters: CatalogFilters;
  onChange: (f: CatalogFilters) => void;
  count: number;
}) {
  const { theme } = useTheme();
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
        <View
          style={{
            padding: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Txt title>Refine your shelves</Txt>
          <IconButton name="close" label="Close filters" onPress={onClose} />
        </View>
        <ScrollView
          contentContainerStyle={{ padding: 20, gap: 26, paddingBottom: 40 }}
        >
          <Txt muted style={{ fontSize: 12 }}>
            Choose several preferences or browse everything. Changes apply
            immediately and are saved on this device.
          </Txt>
          <MultiSelect
            label="Format"
            values={formats}
            selected={filters.formats}
            onChange={(v) => onChange({ ...filters, formats: v })}
          />
          <MultiSelect
            label="Literary genres"
            values={genres}
            selected={filters.genres}
            onChange={(v) => onChange({ ...filters, genres: v })}
          />
          <MultiSelect
            label="Relationship categories"
            values={relationships}
            selected={filters.relationships}
            onChange={(v) => onChange({ ...filters, relationships: v })}
          />
          {(
            [
              [
                "Content classification",
                "classification",
                ["All", "Safe", "Suggestive", "Erotica", "Pornographic"],
              ],
              ["Available reading language", "language", ["All", "English"]],
              [
                "Publication status",
                "status",
                ["All", "Ongoing", "Complete", "Hiatus"],
              ],
              ["Access", "access", ["All", "Free", "Paid"]],
            ] as const
          ).map(([label, key, values]) => (
            <View key={key} style={{ gap: 10 }}>
              <Txt style={{ fontWeight: "600" }}>{label}</Txt>
              <Chips
                values={values}
                value={filters[key]}
                onChange={(v) => onChange({ ...filters, [key]: v })}
              />
            </View>
          ))}
          <Txt muted style={{ fontSize: 12 }}>
            Only English editions exist in this demo. All sample stories are
            free. Explicit material is excluded from this mobile catalog;
            classification filters do not unlock content.
          </Txt>
          <Button
            secondary
            label="Reset all filters"
            onPress={() => onChange({ ...emptyFilters, query: filters.query })}
          />
        </ScrollView>
        <View
          style={{
            padding: 20,
            borderTopWidth: 1,
            borderColor: theme.accent + "20",
          }}
        >
          <Button
            label={`Show ${count} ${count === 1 ? "story" : "stories"}`}
            onPress={onClose}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}
