// Base colors are the available colors the project can use for theming.
// Use in a token map and never directly in screens or components.

const pure_red = {
    50: "hsl(9, 97%, 96%)",
    100: "hsl(9, 97%, 88%)",
    200: "hsl(9, 97%, 80%)",
    300: "hsl(9, 97%, 72%)",
    400: "hsl(9, 97%, 64%)",
    500: "hsl(9, 97%, 56%)",
    600: "hsl(9, 97%, 48%)",
    700: "hsl(9, 97%, 40%)",
    800: "hsl(9, 97%, 32%)",
    900: "hsl(9, 97%, 24%)",
    950: "hsl(9, 97%, 8%)",
    1000: "hsl(9, 97%, 0%)",
} as const

const deep_teal = {
    50: "hsl(144, 15%, 96%)",
    100: "hsl(144, 15%, 88%)",
    200: "hsl(144, 15%, 80%)",
    300: "hsl(144, 15%, 72%)",
    400: "hsl(144, 15%, 64%)",
    500: "hsl(144, 15%, 56%)",
    600: "hsl(144, 15%, 48%)",
    700: "hsl(144, 15%, 40%)",
    800: "hsl(144, 15%, 32%)",
    900: "hsl(144, 15%, 24%)",
    950: "hsl(144, 15%, 16%)",
    1000: "hsl(144, 15%, 8%)",
} as const

const harvest_orange = {
    50: "hsl(28, 98%, 96%)",
    100: "hsl(28, 98%, 88%)",
    200: "hsl(28, 98%, 80%)",
    300: "hsl(28, 98%, 72%)",
    400: "hsl(28, 98%, 64%)",
    500: "hsl(28, 98%, 56%)",
    600: "hsl(28, 98%, 48%)",
    700: "hsl(28, 98%, 40%)",
    800: "hsl(28, 98%, 32%)",
    900: "hsl(28, 98%, 24%)",
    950: "hsl(28, 98%, 16%)",
    1000: "hsl(28, 98%, 8%)",
} as const

const dusty_olive = {
    50: "hsl(60, 8%, 96%)",
    100: "hsl(60, 8%, 88%)",
    200: "hsl(60, 8%, 80%)",
    300: "hsl(60, 8%, 72%)",
    400: "hsl(60, 8%, 64%)",
    500: "hsl(60, 8%, 56%)",
    600: "hsl(60, 8%, 48%)",
    700: "hsl(60, 8%, 40%)",
    800: "hsl(60, 8%, 32%)",
    900: "hsl(60, 8%, 24%)",
    950: "hsl(60, 8%, 16%)",
    1000: "hsl(60, 8%, 8%)",
} as const

const neutral = {
    white: "#fff",
    black: "#000"
} as const;

export { deep_teal, dusty_olive, harvest_orange, neutral, pure_red };

