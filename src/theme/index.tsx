import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export const themes = {
  amethyst: {
    name: "Amethyst",
    bg: "#120D20",
    surface: "#231B35",
    text: "#F8F1FF",
    muted: "#BEB0D0",
    accent: "#C5A2FF",
    dark: true,
  },
  rose: {
    name: "Rose",
    bg: "#24111C",
    surface: "#3A2031",
    text: "#FFF1F7",
    muted: "#D9ADC3",
    accent: "#FFACD2",
    dark: true,
  },
  lagoon: {
    name: "Lagoon Teal",
    bg: "#081E22",
    surface: "#153339",
    text: "#EDFFFF",
    muted: "#A1C7CB",
    accent: "#77E3D5",
    dark: true,
  },
  aurora: {
    name: "Aurora Multicolor",
    bg: "#141627",
    surface: "#262B42",
    text: "#F5F3FF",
    muted: "#B9BBD6",
    accent: "#A9E7DE",
    dark: true,
  },
  light: {
    name: "Classic Light",
    bg: "#FAF7F2",
    surface: "#EEE8E1",
    text: "#261F2D",
    muted: "#685C73",
    accent: "#7340A4",
    dark: false,
  },
  dark: {
    name: "Classic Dark",
    bg: "#111113",
    surface: "#252528",
    text: "#F5F3F7",
    muted: "#B5B0BE",
    accent: "#D2B8F4",
    dark: true,
  },
} as const;
export type ThemeId = keyof typeof themes;
export const tokens = {
  radius: 20,
  coverRatio: 2 / 3,
  tabHeight: 66,
  space: { xs: 4, sm: 8, md: 12, lg: 20, xl: 28, section: 32 },
  gutter: 24,
  serif: Platform.OS === "android" ? "serif" : "Georgia",
  maxWidth: 1080,
};
const Context = createContext<{
  theme: (typeof themes)[ThemeId];
  id: ThemeId;
  setTheme: (id: ThemeId) => void;
}>({ theme: themes.amethyst, id: "amethyst", setTheme: () => {} });
export function ThemeProvider({ children }: React.PropsWithChildren) {
  const [id, setId] = useState<ThemeId>("amethyst");
  useEffect(() => {
    AsyncStorage.getItem("mythra.theme")
      .then((value) => {
        if (value && Object.hasOwn(themes, value)) setId(value as ThemeId);
      })
      .catch(() => {});
  }, []);
  const setTheme = (next: ThemeId) => {
    setId(next);
    void AsyncStorage.setItem("mythra.theme", next).catch(() => {});
  };
  return (
    <Context.Provider value={{ theme: themes[id], id, setTheme }}>
      {children}
    </Context.Provider>
  );
}
export const useTheme = () => useContext(Context);
