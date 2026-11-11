import { canOpenExperience } from "@/features/experience/policy";
import { useLocalSearchParams } from "expo-router";
import { Page } from "@/components/ui";
import { ScreenHeading, EmptyState } from "@/features/experience/components";
import { ExperienceScreen } from "@/features/experience/screen";
import { experienceScreen } from "@/features/experience/registry";
export default function Experience() {
  const { screen, context, subject } = useLocalSearchParams<{
    screen: string;
    context?: string;
    subject?: string;
  }>();
  const spec = experienceScreen(screen);
  return spec && canOpenExperience(spec.domain, __DEV__) ? (
    <ExperienceScreen
      key={`${screen}:${context ?? ""}:${subject ?? ""}`}
      spec={spec}
      context={context}
      subject={subject}
    />
  ) : (
    <Page>
      <ScreenHeading title={spec ? "Not available yet" : "Page unavailable"} />
      <EmptyState
        title={spec ? "Design preview only" : "This destination was not found"}
        body={
          spec?.deferred ??
          "Return to the previous screen to continue browsing."
        }
      />
    </Page>
  );
}
