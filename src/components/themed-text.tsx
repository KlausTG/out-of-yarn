import { Text, type TextProps } from 'react-native';

import { typography, type TextColorToken, type TypographyVariant } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: TypographyVariant;
  themeColor?: TextColorToken;
};

export function ThemedText({ style, type = 'body', themeColor = 'primary', ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return <Text style={[{ color: theme.text[themeColor] }, typography[type], style]} {...rest} />;
}
