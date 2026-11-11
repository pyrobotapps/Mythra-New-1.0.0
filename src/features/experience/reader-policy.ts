/** Preserve valid chapter deep links instead of imposing an arbitrary preview limit. */
export function selectedChapter(
  input: string | undefined,
  available: readonly number[],
) {
  const requested = input === undefined ? 1 : Number(input);
  return Number.isInteger(requested) && available.includes(requested)
    ? requested
    : (available[0] ?? null);
}
