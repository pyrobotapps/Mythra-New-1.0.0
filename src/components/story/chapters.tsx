import { compactLanguageLabel } from "@/models/catalog";
import { Pressable, View } from "react-native";
import { chapterDate, PreviewChapter } from "@/services/story-details";
import { useTheme } from "@/theme";
import { Icon } from "@/components/icon";
import { Txt } from "@/components/ui";
export function ChapterRow({
  chapter,
  onOpen,
}: {
  chapter: PreviewChapter;
  onOpen: () => void;
}) {
  const { theme } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Chapter ${chapter.number}, ${chapter.title}, ${chapterDate(chapter.publishedAt)}, ${chapter.read ? "Read" : "Unread"}, ${chapter.access}, ${chapter.edition}`}
      onPress={onOpen}
      style={({ pressed }) => ({
        paddingVertical: 13,
        borderBottomWidth: 1,
        borderColor: theme.accent + "18",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <Txt
        style={{
          width: 26,
          color: theme.muted,
          fontSize: 12,
          fontVariant: ["tabular-nums"],
        }}
      >
        {String(chapter.number).padStart(2, "0")}
      </Txt>
      <View style={{ flex: 1, gap: 3 }}>
        <Txt style={{ fontSize: 14, lineHeight: 20, fontWeight: "500" }}>
          {chapter.title}
        </Txt>
        <Txt muted style={{ fontSize: 10, lineHeight: 16 }}>
          {chapterDate(chapter.publishedAt)} ·{" "}
          {chapter.read ? "Read" : "Unread"} · {chapter.access} ·{" "}
          {compactLanguageLabel(chapter.edition)}
        </Txt>
      </View>
      <Icon name="arrow" color={theme.muted} size={12} />
    </Pressable>
  );
}
