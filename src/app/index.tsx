import type { SymbolViewProps } from "expo-symbols";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { Button, type ButtonVariant } from "@/components/ui/button";
import { WebBadge } from "@/components/web-badge";
import {
  BottomTabInset,
  MaxContentWidth,
  spacing,
  typography,
  type TypographyVariant,
} from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

/**
 * Design system showcase: every typography variant and every Button variant/state.
 * Temporary home screen so the team can review the building blocks on a device.
 */

type SymbolName = SymbolViewProps["name"];

/** SF Symbol on iOS, Material Symbol on Android and web. */
const icons = {
  star: { ios: "star.fill", android: "star_rate", web: "star_rate" },
  heart: { ios: "heart", android: "favorite", web: "favorite" },
  share: { ios: "square.and.arrow.up", android: "share", web: "share" },
  bookmark: { ios: "bookmark", android: "bookmark", web: "bookmark" },
  add: { ios: "plus", android: "add", web: "add" },
  delete: { ios: "trash", android: "delete", web: "delete" },
  forward: { ios: "arrow.right", android: "arrow_forward", web: "arrow_forward" },
  face: { ios: "face.smiling", android: "face", web: "face" },
  cart: { ios: "cart", android: "shopping_cart", web: "shopping_cart" },
  more: { ios: "ellipsis", android: "more_horiz", web: "more_horiz" },
} as const satisfies Record<string, SymbolName>;

const typographyVariants = Object.keys(typography) as TypographyVariant[];

const buttonVariants: ButtonVariant[] = ["primary", "secondary", "ghost", "link"];

const buttonStates = [
  { name: "Default", props: {} },
  { name: "Disabled", props: { disabled: true } },
  { name: "Loading", props: { loading: true } },
] as const;

function Section({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <View style={[styles.section, { borderTopColor: theme.border.default }]}>
      <View style={styles.sectionHeading}>
        <ThemedText type="kicker" themeColor="accent">
          {kicker}
        </ThemedText>
        <ThemedText type="header">{title}</ThemedText>
      </View>
      {children}
    </View>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <ThemedText type="footerStrong" themeColor="secondary">
      {children}
    </ThemedText>
  );
}

export default function HomeScreen() {
  const theme = useTheme();
  return (
    <ScrollView
      style={{ backgroundColor: theme.background.default }}
      contentContainerStyle={styles.scrollContent}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Hero: a real-world composition, centered */}
        <View style={styles.hero}>
          <ThemedText type="kicker" themeColor="accent" style={styles.textCenter}>
            the final seal of approval
          </ThemedText>
          <ThemedText type="display" style={styles.textCenter}>
            How did you enjoy knitting Icelandic Sweater?
          </ThemedText>
          <ThemedText
            type="bodyParagraph"
            themeColor="secondary"
            style={styles.textCenter}
          >
            Your rating helps us elevate reputable creators so you can discover
            the highest quality patterns
          </ThemedText>
          <Button label="Rate 5 stars" leadingIcon={icons.star} />
          <Button label="Skip" variant="ghost" />
        </View>

        <Section kicker="Typography" title="Every variant">
          {typographyVariants.map((variant) => (
            <View key={variant} style={styles.specimen}>
              <Caption>{variant}</Caption>
              <ThemedText type={variant}>
                Out of yarn, never out of ideas
              </ThemedText>
            </View>
          ))}
        </Section>

        <Section kicker="Typography" title="Centered">
          <ThemedText type="kicker" themeColor="accent" style={styles.textCenter}>
            Pattern of the week
          </ThemedText>
          <ThemedText type="display" style={styles.textCenter}>
            Fair Isle Mittens
          </ThemedText>
          <ThemedText type="header" style={styles.textCenter}>
            Worked in the round
          </ThemedText>
          <ThemedText type="body" themeColor="secondary" style={styles.textCenter}>
            Intermediate · 4 colours · ~12 hours
          </ThemedText>
          <ThemedText type="footer" themeColor="hint" style={styles.textCenter}>
            Designed by Sigrún Jónsdóttir
          </ThemedText>
        </Section>

        <Section kicker="Typography" title="Left aligned paragraph">
          <ThemedText type="bodyStrong">Before you cast on</ThemedText>
          <ThemedText type="bodyParagraph">
            Knit a gauge swatch of at least 15 × 15 cm in stranded colourwork,
            using the same needles you plan to use for the body. Wash and block
            the swatch the way you will treat the finished sweater, then let it
            dry flat before measuring. Stranded fabric tends to pull in, so
            count stitches over the central 10 cm rather than at the edges. If
            you have more stitches than the pattern asks for, go up a needle
            size; if you have fewer, go down one. It feels like a detour, but
            twenty minutes of swatching is far quicker than unravelling a
            yoke that turned out two sizes too small.
          </ThemedText>
          <ThemedText type="bodyParagraph" themeColor="secondary">
            Tip: keep your floats loose by spreading the stitches on the right
            needle before each colour change.
          </ThemedText>
          <ThemedText type="footer" themeColor="hint">
            Last updated 19 November 2026
          </ThemedText>
        </Section>

        <Section kicker="Button" title="Variants × states">
          {buttonVariants.map((variant) => (
            <View key={variant} style={styles.group}>
              <ThemedText type="bodyStrong">{variant}</ThemedText>
              {buttonStates.map((state) => (
                <View key={state.name} style={styles.group}>
                  <Caption>{state.name}</Caption>
                  <View style={styles.row}>
                    <Button {...state.props} variant={variant} label="Save" />
                    <Button
                      {...state.props}
                      variant={variant}
                      label="Add"
                      leadingIcon={icons.add}
                    />
                    <Button
                      {...state.props}
                      variant={variant}
                      label="Next"
                      trailingIcon={icons.forward}
                    />
                    <Button
                      {...state.props}
                      variant={variant}
                      accessibilityLabel="Add to favourites"
                      leadingIcon={icons.heart}
                    />
                  </View>
                </View>
              ))}
            </View>
          ))}
        </Section>

        <Section kicker="Button" title="Icon only next to label">
          <View style={styles.row}>
            <Button
              variant="secondary"
              accessibilityLabel="Bookmark pattern"
              leadingIcon={icons.bookmark}
            />
            <Button label="Start knitting" leadingIcon={icons.forward} />
          </View>
          <View style={styles.row}>
            <Button
              variant="secondary"
              accessibilityLabel="Remove from cart"
              leadingIcon={icons.delete}
            />
            <Button
              label="Add to cart"
              leadingIcon={icons.cart}
              style={styles.fill}
            />
          </View>
        </Section>

        <Section kicker="Button" title="Five icon buttons in a row">
          <View style={styles.row}>
            <Button accessibilityLabel="Favourite" leadingIcon={icons.heart} />
            <Button
              variant="secondary"
              accessibilityLabel="Bookmark"
              leadingIcon={icons.bookmark}
            />
            <Button
              variant="secondary"
              accessibilityLabel="Share"
              leadingIcon={icons.share}
            />
            <Button
              variant="secondary"
              accessibilityLabel="Rate"
              leadingIcon={icons.face}
            />
            <Button
              variant="ghost"
              accessibilityLabel="More options"
              leadingIcon={icons.more}
            />
          </View>
        </Section>

        <Section kicker="Button" title="Full width">
          <Button label="Buy pattern" style={styles.fullWidth} />
          <Button
            label="Add to cart"
            variant="secondary"
            leadingIcon={icons.cart}
            style={styles.fullWidth}
          />
          <Button label="Not now" variant="ghost" style={styles.fullWidth} />
          <Button
            label="Processing payment"
            loading
            leadingIcon={icons.cart}
            style={styles.fullWidth}
          />
          <Button label="Sold out" disabled style={styles.fullWidth} />
        </Section>

        <Section kicker="Button" title="Fit to content">
          <View style={styles.group}>
            <Button label="OK" style={styles.fit} />
            <Button label="Save" variant="secondary" style={styles.fit} />
            <Button
              label="Download the full pattern as PDF"
              trailingIcon={icons.forward}
              style={styles.fit}
            />
            <Button label="Forgot password?" variant="link" style={styles.fit} />
          </View>
        </Section>

        {Platform.OS === "web" && <WebBadge />}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingVertical: spacing.xxxl,
  },
  safeArea: {
    flex: 1,
    width: "100%",
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    paddingHorizontal: spacing.md,
    paddingBottom: BottomTabInset + spacing.md,
    gap: spacing.xl,
  },
  hero: {
    alignItems: "center",
    gap: spacing.md,
  },
  section: {
    gap: spacing.md,
    paddingTop: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  sectionHeading: {
    gap: spacing.xs,
  },
  specimen: {
    gap: spacing.xxs,
  },
  group: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing.sm,
  },
  textCenter: {
    textAlign: "center",
  },
  fill: {
    flex: 1,
  },
  fullWidth: {
    alignSelf: "stretch",
  },
  fit: {
    alignSelf: "flex-start",
  },
});
