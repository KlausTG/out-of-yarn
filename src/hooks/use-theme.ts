/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { colors, type ColorScheme, type ColorSchemeName } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/** Returns the semantic color tokens for the active color scheme. */
export function useTheme(): ColorScheme {
  const scheme: ColorSchemeName = useColorScheme() === 'dark' ? 'dark' : 'light';

  return colors[scheme];
}
