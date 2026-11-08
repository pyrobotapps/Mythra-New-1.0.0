import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  CatalogFilters,
  emptyFilters,
  formats,
  genres,
  relationships,
} from "@/services/catalog";
const Context = createContext<{
  filters: CatalogFilters;
  setFilters: (next: CatalogFilters) => void;
  ready: boolean;
  storageError: boolean;
}>({
  filters: emptyFilters,
  setFilters: () => {},
  ready: false,
  storageError: false,
});
const key = "mythra.catalog-filters.v1";
export function CatalogPreferencesProvider({ children }: PropsWithChildren) {
  const [filters, setFilters] = useState<CatalogFilters>(emptyFilters);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(key)
      .then((raw) => {
        if (!mounted || !raw) return;
        const value = JSON.parse(raw);
        const subset = (input: unknown, allowed: readonly string[]) =>
          Array.isArray(input)
            ? input.filter(
                (v): v is string =>
                  typeof v === "string" && allowed.includes(v),
              )
            : [];
        setFilters({
          ...emptyFilters,
          relationships: subset(value.relationships, relationships),
          genres: subset(value.genres, genres),
          formats: subset(value.formats, formats),
          classification: [
            "All",
            "Safe",
            "Suggestive",
            "Erotica",
            "Pornographic",
          ].includes(value.classification)
            ? value.classification
            : "All",
          language: value.language === "English" ? "English" : "All",
          status: ["All", "Complete", "Ongoing", "Hiatus"].includes(
            value.status,
          )
            ? value.status
            : "All",
          access: ["All", "Free", "Paid"].includes(value.access)
            ? value.access
            : "All",
        });
      })
      .catch(() => {
        if (mounted) setStorageError(true);
      })
      .finally(() => {
        if (mounted) setReady(true);
      });
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    if (ready)
      AsyncStorage.setItem(
        key,
        JSON.stringify({ ...filters, query: "" }),
      ).catch(() => setStorageError(true));
  }, [filters, ready]);
  return (
    <Context.Provider value={{ filters, setFilters, ready, storageError }}>
      {children}
    </Context.Provider>
  );
}
export const useCatalogPreferences = () => useContext(Context);
