import { ExperienceScreen } from "@/features/experience/screen";
import { experienceScreen } from "@/features/experience/registry";
export default function Notifications() {
  return <ExperienceScreen spec={experienceScreen("notifications")!} />;
}
