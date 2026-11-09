/** Shared standard for portrait browsing cards; editorial and list covers opt out. */
export const browsingCover = {
  width: 110,
  minWidth: 105,
  maxWidth: 115,
  gap: 12,
} as const;

/** Width is the usable content area, after page gutters. */
export function browsingCoverWidth(availableWidth?: number) {
  if (availableWidth === undefined) return browsingCover.width;
  return Math.min(
    browsingCover.maxWidth,
    Math.max(
      browsingCover.minWidth,
      (availableWidth - browsingCover.gap * 2) / 3,
    ),
  );
}
