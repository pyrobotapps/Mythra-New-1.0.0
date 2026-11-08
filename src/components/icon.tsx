import { SymbolView } from "expo-symbols";
const symbols = {
  share: { ios: "square.and.arrow.up", android: "share", web: "share" },
  more: { ios: "ellipsis", android: "more_horiz", web: "more_horiz" },
  down: { ios: "chevron.down", android: "expand_more", web: "expand_more" },
  home: { ios: "house", android: "home", web: "home" },
  discover: { ios: "safari", android: "explore", web: "explore" },
  library: { ios: "books.vertical", android: "book_5", web: "book_5" },
  create: {
    ios: "square.and.pencil",
    android: "edit_square",
    web: "edit_square",
  },
  profile: {
    ios: "person.crop.circle",
    android: "account_circle",
    web: "account_circle",
  },
  search: { ios: "magnifyingglass", android: "search", web: "search" },
  bell: { ios: "bell", android: "notifications", web: "notifications" },
  filter: { ios: "slider.horizontal.3", android: "tune", web: "tune" },
  back: { ios: "chevron.left", android: "arrow_back", web: "arrow_back" },
  arrow: {
    ios: "chevron.right",
    android: "chevron_right",
    web: "chevron_right",
  },
  close: { ios: "xmark", android: "close", web: "close" },
  check: { ios: "checkmark", android: "check", web: "check" },
  star: { ios: "star.fill", android: "star", web: "star" },
  book: { ios: "book.closed", android: "menu_book", web: "menu_book" },
  sparkles: { ios: "sparkles", android: "auto_awesome", web: "auto_awesome" },
} as const;
export type IconName = keyof typeof symbols;
export function Icon({
  name,
  color,
  size = 22,
}: {
  name: IconName;
  color: string;
  size?: number;
}) {
  return (
    <SymbolView
      name={symbols[name]}
      tintColor={color}
      size={size}
      style={{ width: size, height: size }}
    />
  );
}
