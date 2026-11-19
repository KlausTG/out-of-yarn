import { SymbolView, type SymbolViewProps } from "expo-symbols";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import {
  iconSize,
  radius,
  spacing,
  typography,
  type BackgroundColorToken,
  type IconColorToken,
  type TextColorToken,
} from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link";

type VariantColors = {
  /** `null` means no fill. */
  background: BackgroundColorToken | null;
  label: TextColorToken;
  icon: IconColorToken;
};

const variantColors = {
  primary: { background: "primary", label: "staticWhite", icon: "staticWhite" },
  secondary: { background: "muted", label: "accent", icon: "default" },
  ghost: { background: null, label: "accent", icon: "default" },
  link: { background: null, label: "accent", icon: "default" },
} as const satisfies Record<ButtonVariant, VariantColors>;

/** Disabled looks the same for every variant, except `link` keeps no fill. */
const disabledColors = {
  background: "muted",
  label: "disabled",
  icon: "disabled",
} as const satisfies VariantColors;

const hitSlop = spacing.md;

/** Rendered size of iOS's `size="small"` ActivityIndicator, used to scale it to icon size. */
const iosSmallSpinnerSize = 20;

type SymbolName = SymbolViewProps["name"];

/**
 * Everything else, including `accessibilityHint` and `accessibilityState`, passes straight
 * through to Pressable. The `aria-label` and `role` aliases are removed so there is exactly
 * one way to set the name and role; Pressable lets them silently win over the props below.
 * (`aria-label` is also cleared at runtime, since TS doesn't check hyphenated JSX attributes.)
 */
type BaseProps = Omit<
  PressableProps,
  | "style"
  | "children"
  | "accessibilityLabel"
  | "accessibilityRole"
  | "aria-label"
  | "role"
> & {
  /**
   * Defaults to `button`. Pass `link` when pressing navigates somewhere,
   * so screen readers announce it the way it behaves rather than how it looks.
   */
  accessibilityRole?: "button" | "link";
  variant?: ButtonVariant;
  /**
   * Shows a spinner in the icon slot (leading, else trailing). With no icon, the spinner
   * replaces the label, which stays invisible underneath to hold the width. Blocks presses. Keeps the variant's colors; only `disabled` greys the button out.
   */
  loading?: boolean;
  /** Layout overrides only (margins, flex, alignSelf). Merged last. */
  style?: StyleProp<ViewStyle>;
};

type LabelledButtonProps = BaseProps & {
  /** Visible text. Also what screen readers announce unless `accessibilityLabel` is set. */
  label: string;
  /**
   * Screen reader name when the visible label isn't enough on its own,
   * e.g. "Delete Merino skein" for a button that just reads "Delete".
   */
  accessibilityLabel?: string;
  /** SF Symbol / Material symbol shown before the label. */
  leadingIcon?: SymbolName;
  /** SF Symbol / Material symbol shown after the label. */
  trailingIcon?: SymbolName;
};

type IconOnlyButtonProps = BaseProps & {
  label?: undefined;
  /** Required: with no visible text, this is the only name screen readers get. */
  accessibilityLabel: string;
  /** The button's only content, drawn one icon size larger than in a labelled button. */
  leadingIcon: SymbolName;
  trailingIcon?: never;
};

/** Pass `label` for a text button, or omit it and pass `leadingIcon` for an icon-only pill. */
export type ButtonProps = LabelledButtonProps | IconOnlyButtonProps;

export function Button({
  label,
  variant = "primary",
  leadingIcon,
  trailingIcon,
  disabled,
  loading = false,
  style,
  accessibilityLabel,
  accessibilityRole = "button",
  ...rest
}: ButtonProps) {
  const theme = useTheme();
  const isLink = variant === "link";
  const isIconOnly = label === undefined;
  const variantTokens = variantColors[variant];
  const tokens = disabled ? disabledColors : variantTokens;
  const backgroundToken = isLink ? null : tokens.background;
  const backgroundColor = backgroundToken
    ? theme.background[backgroundToken]
    : "transparent";
  // No-fill variants ripple against the screen background they sit on.
  const rippleColor = theme.ripple[variantTokens.background ?? "default"];
  const iconColor = theme.icon[tokens.icon];
  const glyphSize = isIconOnly ? iconSize.lg : iconSize.md;
  // The spinner takes over an existing icon's slot so the label doesn't move.
  // With no icon to replace, it takes the label's place instead.
  const spinnerSlot = leadingIcon ? "leading" : trailingIcon ? "trailing" : "label";
  const hideLabel = loading && spinnerSlot === "label";

  // Icons are decorative: the label already says what the button does.
  const renderIcon = (name: SymbolName) => (
    <SymbolView name={name} size={glyphSize} tintColor={iconColor} aria-hidden />
  );

  // Fixed box the size of the icon it replaces, so swapping never changes layout.
  // iOS only has preset spinner sizes ('small' is 20pt), so it is scaled to fit;
  // Android takes a numeric size directly.
  const renderSpinner = () => (
    <View style={[styles.glyphBox, { width: glyphSize, height: glyphSize }]} aria-hidden>
      <ActivityIndicator
        color={iconColor}
        size={Platform.OS === "android" ? glyphSize : "small"}
        style={
          Platform.OS === "ios" && {
            transform: [{ scale: glyphSize / iosSmallSpinnerSize }],
          }
        }
      />
    </View>
  );

  const renderSlot = (slot: "leading" | "trailing", icon?: SymbolName) => {
    if (loading && spinnerSlot === slot) return renderSpinner();
    return icon ? renderIcon(icon) : null;
  };

  return (
    <Pressable
      {...rest}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel ?? label}
      // TS can't block hyphenated JSX attributes, so clear it here: Pressable prefers it
      // over accessibilityLabel and it would bypass the icon-only label requirement.
      aria-label={undefined}
      // Always a boolean: Pressable then forces accessibilityState.disabled to match,
      // overriding any caller `accessibilityState` or `aria-disabled`. Loading blocks presses too.
      disabled={!!disabled || loading}
      // Placed after `...rest` so it can't be overridden; Pressable prefers it over
      // accessibilityState.busy, so a caller's `accessibilityState` keeps its other keys.
      aria-busy={loading}
      hitSlop={hitSlop}
      android_ripple={{ color: rippleColor, foreground: true }}
      style={({ pressed }) => [
        styles.base,
        isLink ? styles.link : styles.padded,
        !isLink && !isIconOnly && styles.labelledMinWidth,
        { backgroundColor },
        pressed && Platform.OS !== "android" && styles.pressed,
        style,
      ]}
    >
      {renderSlot("leading", leadingIcon)}
      {!isIconOnly && (
        // Hidden rather than removed while loading, so it keeps holding the button's width.
        <Text
          style={[
            styles.label,
            { color: theme.text[tokens.label] },
            hideLabel && styles.hidden,
          ]}
        >
          {label}
        </Text>
      )}
      {hideLabel && (
        <View style={styles.spinnerOverlay}>{renderSpinner()}</View>
      )}
      {renderSlot("trailing", trailingIcon)}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    borderRadius: radius.full,
    // Clips the Android ripple to the capsule.
    overflow: "hidden",
  },
  /**
   * `minHeight` sets the height. Content is at most 24pt (lg icon), well under 44 minus padding,
   * so every button is exactly 44pt tall. `paddingVertical` only applies once a large
   * accessibility text size pushes the label past that, keeping it off the edges.
   */
  padded: {
    minHeight: 44,
    paddingHorizontal: spacing.ml,
    paddingVertical: spacing.xs,
  },
  /** Keeps short labels like "OK" from producing a stubby pill. Icon-only buttons skip it. */
  labelledMinWidth: {
    minWidth: 90,
  },
  link: {
    padding: spacing.none,
  },
  pressed: {
    opacity: 0.7,
  },
  glyphBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  hidden: {
    opacity: 0,
  },
  spinnerOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    ...typography.bodyStrong,
    textAlign: "center",
    flexShrink: 1,
  },
});
