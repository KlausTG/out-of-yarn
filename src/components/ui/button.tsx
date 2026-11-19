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
  primary: { background: 'primary', label: 'staticWhite', icon: 'staticWhite' },
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

const hitSlop = spacing.md;

export type ButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  /** Visible text. Also what screen readers announce unless `accessibilityLabel` is set. */
  label: string;
  /**
   * Screen reader name when the visible label isn't enough on its own,
   * e.g. "Delete Merino skein" for a button that just reads "Delete".
   */
  accessibilityLabel?: string;
  /**
   * Screen reader description of the result, read after the label.
   * Start with a verb and skip "Tap to", e.g. "Opens the pattern in a new screen".
   */
  accessibilityHint?: string;
  /**
   * Defaults to `button`. Pass `link` when pressing navigates somewhere,
   * so screen readers announce it the way it behaves rather than how it looks.
   */
  accessibilityRole?: 'button' | 'link';
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
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  accessibilityState,
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

  // Icons are decorative: the label already says what the button does.
  const renderIcon = (name: SymbolViewProps['name']) => (
    <SymbolView name={name} size={iconSize.md} tintColor={iconColor} aria-hidden />
  );

  return (
    <Pressable
      {...rest}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ ...accessibilityState, disabled: !!disabled }}
      disabled={disabled}
      hitSlop={hitSlop}
      android_ripple={{ color: rippleColor }}
      style={({ pressed }) => [
        styles.base,
        isLink ? styles.link : styles.padded,
        { backgroundColor },
        pressed && Platform.OS !== 'android' && styles.pressed,
        style,
      ]}>
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
