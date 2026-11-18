# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

The rules in AGENTS.md (imported above) apply in full. In particular, this project is on **Expo SDK 58** (React Native 0.88, React 19.3). Check the v58 docs (`https://docs.expo.dev/versions/v58.0.0/`) before touching any Expo/RN API rather than relying on memory.

## Commands

The package manager is **npm** (`package-lock.json`; no `bun.lock`), so use `npx`.

```bash
npm install
npx expo start              # dev server (also: npm run ios | android | web)
npx expo lint               # lint (npm run lint)
npx tsc --noEmit            # typecheck
npx expo install <package>  # add deps; never use npm install <pkg> directly
```

No test runner is set up yet. Adding one means following Expo's "Unit Testing with Jest" guide.

`npm run reset-project` (`scripts/reset-project.js`) moves the starter code into `example/` and leaves a blank `src/app/`. It's destructive, so don't run it unless the user asks.

## Architecture

This is still mostly the `create-expo-app` default template. This app ("out of yarn") is in a pre-production stage. We are working on building out the design system and scaffolding the navigation for the screens we already know we want.

- **Routing**: Expo Router. The entry is `expo-router/entry` and routes live in `src/app/`. `src/app/_layout.tsx` is the root: it holds the splash screen (`preventAutoHideAsync` plus `AnimatedSplashOverlay`), the navigation `ThemeProvider`, and `AppTabs`.
- **Platform-split files**: several modules have a `.web.tsx`/`.web.ts` sibling that Metro picks on web. For example, `app-tabs.tsx` uses `NativeTabs` from `expo-router/native-tabs`, while `app-tabs.web.tsx` builds a custom top tab bar with `expo-router/ui` (`Tabs`/`TabList`/`TabTrigger`). If you add, rename, or remove a tab, update **both** files. The same split applies to `animated-icon` and `use-color-scheme`.
- **Theming**: `src/constants/theme.ts` holds the `Colors` (light/dark tokens), `Fonts` (selected per platform; web uses the CSS variables in `src/global.css`), `Spacing` scale, `BottomTabInset`, and `MaxContentWidth`. Components get colors through `useTheme()` (`src/hooks/use-theme.ts`) or `ThemedText`/`ThemedView` with a `type`/`themeColor` key. There's no styling library; use `StyleSheet` with these tokens.
- **Path aliases** (`tsconfig.json`): `@/*` maps to `src/*` and `@/assets/*` maps to `assets/*`.
- **app.json experiments**: `typedRoutes` (route types generated in `.expo/types`) and `reactCompiler` are on, so manual `useMemo`/`useCallback` are generally unnecessary. Web uses `output: "server"`.
- `ios/` and `android/` don't exist (CNG). Configure native behavior via `app.json` plugins.
