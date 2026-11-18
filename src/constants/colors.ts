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
    /** Identical across schemes. */
    static: {
      white: PaletteColor;
      black: PaletteColor;
    };
  };
  text: {
    primary: PaletteColor;
    secondary: PaletteColor;
    accent: PaletteColor;
    placeholder: PaletteColor;
    hint: PaletteColor;
    disabled: PaletteColor;
    danger: PaletteColor;
    /** Labels on `background.primary` / `background.inverted`. */
    inverted: PaletteColor;
  };
  icon: {
    default: PaletteColor;
    accent: PaletteColor;
    danger: PaletteColor;
    inactive: PaletteColor;
    disabled: PaletteColor;
    subtle: PaletteColor;
    /** Icons on `background.primary` / `background.inverted`. */
    inverted: PaletteColor;
  };
  border: {
    default: PaletteColor;
    strong: PaletteColor;
    accent: PaletteColor;
  };
};

const staticColors = {
  white: neutral.white,
  black: neutral.black,
} as const satisfies ColorScheme['background']['static'];

const light = {
  background: {
    default: pure_red[50],
    muted: pure_red[100],
    primary: pure_red[600],
    inverted: pure_red[950],
    static: staticColors,
  },
  text: {
    primary: dusty_olive[950],
    secondary: dusty_olive[600],
    accent: pure_red[600],
    placeholder: dusty_olive[400],
    hint: dusty_olive[400],
    disabled: dusty_olive[400],
    danger: harvest_orange[700],
    inverted: neutral.white,
  },
  icon: {
    default: pure_red[600],
    accent: deep_teal[500],
    danger: harvest_orange[600],
    inactive: pure_red[400],
    disabled: pure_red[400],
    subtle: pure_red[400],
    inverted: neutral.white,
  },
  border: {
    default: pure_red[200],
    strong: pure_red[300],
    accent: pure_red[600],
  },
} as const satisfies ColorScheme;

const dark = {
  background: {
    default: pure_red[1000],
    muted: pure_red[950],
    primary: pure_red[500],
    inverted: pure_red[50],
    static: staticColors,
  },
  text: {
    primary: dusty_olive[50],
    secondary: dusty_olive[400],
    accent: pure_red[400],
    placeholder: dusty_olive[600],
    hint: dusty_olive[600],
    disabled: dusty_olive[600],
    danger: harvest_orange[400],
    inverted: dusty_olive[1000],
  },
  icon: {
    default: pure_red[400],
    accent: deep_teal[400],
    danger: harvest_orange[400],
    inactive: pure_red[700],
    disabled: pure_red[700],
    subtle: pure_red[700],
    inverted: dusty_olive[1000],
  },
  border: {
    default: pure_red[900],
    strong: pure_red[800],
    accent: pure_red[500],
  },
} as const satisfies ColorScheme;

export const colors = { light, dark } as const satisfies Record<'light' | 'dark', ColorScheme>;

export type ColorSchemeName = keyof typeof colors;

/** Background tokens usable as a surface fill (`static` is a group, not a color). */
export type BackgroundColorToken = Exclude<keyof ColorScheme['background'], 'static'>;
export type TextColorToken = keyof ColorScheme['text'];
export type IconColorToken = keyof ColorScheme['icon'];
export type BorderColorToken = keyof ColorScheme['border'];
