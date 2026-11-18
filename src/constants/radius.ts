/**
 * Corner radius scale. Pair every non-`full` radius with `borderCurve: 'continuous'`
 * so corners render as iOS-style squircles.
 */
export const radius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  /** Capsules and circles. */
  full: 9999,
} as const satisfies Record<string, number>;

export type RadiusToken = keyof typeof radius;
