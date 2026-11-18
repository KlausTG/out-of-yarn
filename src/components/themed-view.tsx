import { View, type ViewProps } from 'react-native';

import type { BackgroundColorToken } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedViewProps = ViewProps & {
  type?: BackgroundColorToken;
};

export function ThemedView({ style, type = 'default', ...otherProps }: ThemedViewProps) {
  const theme = useTheme();

  return <View style={[{ backgroundColor: theme.background[type] }, style]} {...otherProps} />;
}
