/**
 * Spacing scale on a 4-point grid (plus a 2pt hairline step), named by size.
 * `md` is the screen edge padding and the default padding inside most components.
 */
export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  /** Between sm and md. */
  ms: 12,
  md: 16,
  /** Between md and lg. */
  ml: 20,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const satisfies Record<string, number>;

export type SpacingToken = keyof typeof spacing;
