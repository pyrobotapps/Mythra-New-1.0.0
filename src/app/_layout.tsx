import { useFonts } from "expo-font";
import { displayFamily, handwritingFamily } from "@/theme/visual";
import { CatalogPreferencesProvider } from "@/state/catalog-preferences";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from "@/theme";
function Navigation() {
  const { theme } = useTheme();
  return (
    <>
      <StatusBar style={theme.dark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.bg },
        }}
      />
    </>
  );
}
export default function RootLayout() {
  const [loaded, error] = useFonts({
    [displayFamily]: require("@expo-google-fonts/cormorant-infant/600SemiBold/CormorantInfant_600SemiBold.ttf"),
    [handwritingFamily]: require("@expo-google-fonts/dancing-script/600SemiBold/DancingScript_600SemiBold.ttf"),
  });
  if (!loaded && !error) return null;
  return (
    <ThemeProvider fontsReady={loaded}>
      <CatalogPreferencesProvider>
        <Navigation />
      </CatalogPreferencesProvider>
    </ThemeProvider>
  );
}
