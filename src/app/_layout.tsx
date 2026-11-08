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
  return (
    <ThemeProvider>
      <CatalogPreferencesProvider>
        <Navigation />
      </CatalogPreferencesProvider>
    </ThemeProvider>
  );
}
