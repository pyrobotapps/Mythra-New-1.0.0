/** Design-only business/admin routes must never become live release features by accident. */
const previewDomains = new Set([
  "Membership",
  "Purchases",
  "Creator support",
  "Creator business",
  "Administration",
  "Phase 1",
]);
export function canOpenExperience(domain: string, development: boolean) {
  return development || !previewDomains.has(domain);
}
export function updateSelection(
  current: readonly string[],
  option: string,
  multiple = false,
): string[] {
  if (!multiple) return [option];
  return current.includes(option)
    ? current.filter((value) => value !== option)
    : [...current, option];
}
