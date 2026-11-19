/** Icon sizes in points, named by size. */
export const iconSize = {
  sm: 20,
  md: 24,
  lg: 28,
} as const satisfies Record<string, number>;

export type IconSizeToken = keyof typeof iconSize;
