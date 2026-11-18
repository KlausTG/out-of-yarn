/**
 * Single entry point for design tokens: `import { spacing, typography } from '@/constants/theme'`.
 * Colors are scheme-dependent, so components read them through `useTheme()`.
 */

import '@/global.css';

import { Platform } from 'react-native';

export * from '@/constants/colors';
export * from '@/constants/icon-size';
export * from '@/constants/radius';
export * from '@/constants/spacing';
export * from '@/constants/typography';

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
