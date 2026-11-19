/**
 * Semantic color tokens, built only from the base palette in `colors-base.ts`.
 * Screens and components read these through `useTheme()`, never the palette directly.
 */

import type * as basePalette from '@/constants/colors-base';
import { deep_teal, dusty_olive, harvest_orange, neutral, pure_red } from '@/constants/colors-base';

type Palette = typeof basePalette;

/** Union of every literal color value in the base palette. Token leaves must be one of these. */
export type PaletteColor = {
  [Hue in keyof Palette]: Palette[Hue][keyof Palette[Hue]];
}[keyof Palette];

/** The shape every color scheme must implement. Keys are semantic, values come from the palette. */
export type ColorScheme = {
  background: {
    /** Default background on almost all screens. */
    default: PaletteColor;
    /** One step removed from default: cards, subtle separation, disabled primary buttons. */
    muted: PaletteColor;
    /** Brand-colored surfaces. */
    primary: PaletteColor;
    /** Opposite of default, e.g. tooltips. */
    inverted: PaletteColor;
  };
  text: {
    primary: PaletteColor;
    secondary: PaletteColor;
    accent: PaletteColor;
    placeholder: PaletteColor;
    hint: PaletteColor;
    disabled: PaletteColor;
    danger: PaletteColor;
    /** Labels on `background.inverted`. */
    inverted: PaletteColor;
    /** White in both schemes, e.g. labels on `background.primary`. */
    staticWhite: PaletteColor;
    /** Black in both schemes. */
    staticBlack: PaletteColor;
  };
  icon: {
    default: PaletteColor;
    accent: PaletteColor;
    danger: PaletteColor;
    inactive: PaletteColor;
    disabled: PaletteColor;
    subtle: PaletteColor;
    /** White in both schemes, e.g. icons on `background.primary`. */
    staticWhite: PaletteColor;
    /** Black in both schemes. */
    staticBlack: PaletteColor;
  };
  border: {
    default: PaletteColor;
    strong: PaletteColor;
    accent: PaletteColor;
  };
  /**
   * Android press ripple, keyed by the background it sits on.
   * One tone darker than that background where the palette allows it.
   */
  ripple: Record<keyof ColorScheme['background'], PaletteColor>;
};

const light = {
  background: {
    default: pure_red[50],
    muted: pure_red[100],
    primary: pure_red[600],
    inverted: pure_red[950],
  },
  text: {
    primary: dusty_olive[950],
    secondary: dusty_olive[600],
    accent: pure_red[600],
    placeholder: dusty_olive[400],
    hint: dusty_olive[400],
    disabled: pure_red[400],
    danger: harvest_orange[700],
    inverted: neutral.white,
    staticWhite: neutral.white,
    staticBlack: neutral.black,
  },
  icon: {
    default: pure_red[600],
    accent: deep_teal[500],
    danger: harvest_orange[600],
    inactive: pure_red[400],
    disabled: pure_red[400],
    subtle: pure_red[400],
    staticWhite: neutral.white,
    staticBlack: neutral.black,
  },
  border: {
    default: pure_red[200],
    strong: pure_red[300],
    accent: pure_red[600],
  },
  ripple: {
    default: pure_red[200],
    muted: pure_red[300],
    primary: pure_red[700],
    inverted: pure_red[1000],
  },
} as const satisfies ColorScheme;

const dark = {
  background: {
    default: pure_red[1000],
    muted: pure_red[950],
    primary: pure_red[600],
    inverted: pure_red[50],
  },
  text: {
    primary: dusty_olive[50],
    secondary: dusty_olive[400],
    accent: pure_red[400],
    placeholder: dusty_olive[700],
    hint: dusty_olive[700],
    disabled: dusty_olive[700],
    danger: harvest_orange[400],
    inverted: dusty_olive[1000],
    staticWhite: neutral.white,
    staticBlack: neutral.black,
  },
  icon: {
    default: pure_red[400],
    accent: deep_teal[400],
    danger: harvest_orange[400],
    inactive: pure_red[700],
    disabled: pure_red[700],
    subtle: pure_red[700],
    staticWhite: neutral.white,
    staticBlack: neutral.black,
  },
  border: {
    default: pure_red[900],
    strong: pure_red[800],
    accent: pure_red[500],
  },
  ripple: {
    // `default` is already the darkest tone, so its ripple steps lighter instead.
    default: pure_red[900],
    muted: pure_red[900],
    primary: pure_red[700],
    inverted: pure_red[100],
  },
} as const satisfies ColorScheme;

export const colors = { light, dark } as const satisfies Record<'light' | 'dark', ColorScheme>;

export type ColorSchemeName = keyof typeof colors;

export type BackgroundColorToken = keyof ColorScheme['background'];
export type TextColorToken = keyof ColorScheme['text'];
export type IconColorToken = keyof ColorScheme['icon'];
export type BorderColorToken = keyof ColorScheme['border'];
