/**
 * Font families and named text styles.
 *
 * Every weight is its own static font file, so weight is chosen through `fontFamily`
 * and `fontWeight` is never set. Otherwise iOS synthesizes a fake bold or falls back
 * to the system font. Text styles carry no color: apply it at render time from `useTheme()`.
 */

import type { FontSource } from 'expo-font';
import type { TextStyle } from 'react-native';

/** Family names registered with `useFonts`. Each one maps to exactly one file. */
export const fontFamily = {
  berkshireSwash: 'BerkshireSwash-Regular',
  firaSans: 'FiraSans-Regular',
  firaSansItalic: 'FiraSans-Italic',
  firaSansSemiBold: 'FiraSans-SemiBold',
  firaSansCondensed: 'FiraSansCondensed-Regular',
  firaSansCondensedSemiBold: 'FiraSansCondensed-SemiBold',
} as const;

export type FontFamily = (typeof fontFamily)[keyof typeof fontFamily];

/** Pass to `useFonts`. The `Record<FontFamily, …>` check makes TypeScript flag a family with no file. */
export const fontAssets = {
  [fontFamily.berkshireSwash]: require('@/assets/fonts/BerkshireSwash-Regular.ttf'),
  [fontFamily.firaSans]: require('@/assets/fonts/FiraSans-Regular.ttf'),
  [fontFamily.firaSansItalic]: require('@/assets/fonts/FiraSans-Italic.ttf'),
  [fontFamily.firaSansSemiBold]: require('@/assets/fonts/FiraSans-SemiBold.ttf'),
  [fontFamily.firaSansCondensed]: require('@/assets/fonts/FiraSansCondensed-Regular.ttf'),
  [fontFamily.firaSansCondensedSemiBold]: require('@/assets/fonts/FiraSansCondensed-SemiBold.ttf'),
} as const satisfies Record<FontFamily, FontSource>;

/** Converts a relative line height (1.5 = 150%) into the absolute points React Native expects. */
const lineHeight = (fontSize: number, ratio: number) => Math.round(fontSize * ratio);

export const typography = {
  display: {
    fontFamily: fontFamily.berkshireSwash,
    fontSize: 24,
    lineHeight: lineHeight(24, 1.25),
  },
  header: {
    fontFamily: fontFamily.berkshireSwash,
    fontSize: 20,
    lineHeight: lineHeight(20, 1),
  },
  /** Default text style, the most widely used. */
  body: {
    fontFamily: fontFamily.firaSans,
    fontSize: 12,
    lineHeight: lineHeight(12, 1),
  },
  bodyStrong: {
    fontFamily: fontFamily.firaSansSemiBold,
    fontSize: 12,
    lineHeight: lineHeight(12, 1),
  },
  /** `body` with a comfortable line height for running text. */
  bodyParagraph: {
    fontFamily: fontFamily.firaSans,
    fontSize: 12,
    lineHeight: lineHeight(12, 1.5),
  },
  footer: {
    fontFamily: fontFamily.firaSans,
    fontSize: 10,
    lineHeight: lineHeight(10, 1),
  },
  footerStrong: {
    fontFamily: fontFamily.firaSansSemiBold,
    fontSize: 10,
    lineHeight: lineHeight(10, 1),
  },
  /** Small uppercase label above headers and display text. */
  kicker: {
    fontFamily: fontFamily.firaSansCondensedSemiBold,
    fontSize: 12,
    lineHeight: lineHeight(12, 1),
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;
