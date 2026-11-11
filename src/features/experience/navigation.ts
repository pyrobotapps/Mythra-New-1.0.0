import { router } from "expo-router";
export function openExperience(
  screen: string,
  context?: string,
  subject?: string,
) {
  router.push({
    pathname: "/experience/[screen]",
    params: {
      screen,
      ...(context ? { context } : {}),
      ...(subject ? { subject } : {}),
    },
  });
}
