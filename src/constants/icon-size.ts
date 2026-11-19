/** Icon sizes in points, named by size. */
export const iconSize = {
  sm: 18,
  md: 20,
  lg: 24,
} as const satisfies Record<string, number>;

export type IconSizeToken = keyof typeof iconSize;
