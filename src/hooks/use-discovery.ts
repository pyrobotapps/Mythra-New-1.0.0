import { useEffect, useState } from "react";
import {
  loadDiscoveryCatalog,
  type DiscoveryLoadResult,
} from "@/services/discovery-source";
export type DiscoveryState =
  | { status: "loading" }
  | { status: "ready"; data: DiscoveryLoadResult }
  | { status: "error"; message: string };
export function useDiscovery() {
  const [state, setState] = useState<DiscoveryState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let current = true;
    loadDiscoveryCatalog()
      .then((data) => {
        if (current) setState({ status: "ready", data });
      })
      .catch((error) => {
        if (current)
          setState({
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : "Discovery could not be loaded. Please try again.",
          });
      });
    return () => {
      current = false;
    };
  }, [attempt]);
  return {
    state,
    retry: () => {
      setState({ status: "loading" });
      setAttempt((value) => value + 1);
    },
  };
}
