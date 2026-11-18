import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import {
  iconSize,
  radius,
  spacing,
  typography,
  type BackgroundColorToken,
  type IconColorToken,
  type TextColorToken,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';

type VariantColors = {
  /** `null` means no fill. */
  background: BackgroundColorToken | null;
  label: TextColorToken;
  icon: IconColorToken;
};

const variantColors = {
  primary: { background: 'primary', label: 'inverted', icon: 'inverted' },
  secondary: { background: 'muted', label: 'primary', icon: 'default' },
  ghost: { background: null, label: 'primary', icon: 'default' },
  link: { background: null, label: 'accent', icon: 'default' },
} as const satisfies Record<ButtonVariant, VariantColors>;

/** Disabled looks the same for every variant, except `link` keeps no fill. */
const disabledColors = {
  background: 'muted',
  label: 'disabled',
  icon: 'disabled',
} as const satisfies VariantColors;

const hitSlop = spacing.ms;

export type ButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  label: string;
  variant?: ButtonVariant;
  /** SF Symbol / Material symbol shown before the label. */
  leadingIcon?: SymbolViewProps['name'];
  /** SF Symbol / Material symbol shown after the label. */
  trailingIcon?: SymbolViewProps['name'];
  /** Layout overrides only (margins, flex, alignSelf). Merged last. */
  style?: StyleProp<ViewStyle>;
};

export function Button({
  label,
  variant = 'primary',
  leadingIcon,
  trailingIcon,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const theme = useTheme();
  const isLink = variant === 'link';
  const variantTokens = variantColors[variant];
  const tokens = disabled ? disabledColors : variantTokens;
  const backgroundToken = isLink ? null : tokens.background;
  const backgroundColor = backgroundToken ? theme.background[backgroundToken] : 'transparent';
  // No-fill variants ripple against the screen background they sit on.
  const rippleColor = theme.ripple[variantTokens.background ?? 'default'];
  const iconColor = theme.icon[tokens.icon];

  const renderIcon = (name: SymbolViewProps['name']) => (
    <SymbolView name={name} size={iconSize.md} tintColor={iconColor} />
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      hitSlop={hitSlop}
      android_ripple={{ color: rippleColor }}
      style={({ pressed }) => [
        styles.base,
        isLink ? styles.link : styles.padded,
        { backgroundColor },
        pressed && Platform.OS !== 'android' && styles.pressed,
        style,
      ]}
      {...rest}>
      {leadingIcon && renderIcon(leadingIcon)}
      <Text style={[styles.label, { color: theme.text[tokens.label] }]}>{label}</Text>
      {trailingIcon && renderIcon(trailingIcon)}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    borderRadius: radius.full,
    // Clips the Android ripple to the capsule.
    overflow: 'hidden',
  },
  padded: {
    minHeight: 40,
    minWidth: 72,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  link: {
    padding: spacing.none,
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    ...typography.bodyStrong,
    textAlign: 'center',
    flexShrink: 1,
  },
});
