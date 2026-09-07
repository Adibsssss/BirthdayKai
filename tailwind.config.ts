import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm scrapbook / photo-booth palette. `coral`, `peach`, `butter`,
        // `line`, `muted`, `ink`, `paper` are kept as token *names* so every
        // component that already reads them just inherits the new values —
        // only `plum` and `rose` are newly introduced, for the banner
        // background and the "just landed" accent.
        ink: "#2a1810",
        paper: "#fbf1e3",
        line: "#ecdfc9",
        muted: "#8c7360",
        coral: "#ee9c1f", // marigold — primary CTA / accent
        peach: "#f0c4cf", // dusty rose — icon fills, soft chips
        butter: "#f6d374", // golden — icon fills
        sage: "#a9c1a4",
        plum: "#43162f", // deep banner background
        rose: "#d1487a", // secondary accent — "new photo" glow, counter
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      transitionDuration: {
        150: "150ms",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "float-in": {
          "0%": { transform: "translateY(14px) scale(0.96)", opacity: "0" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" },
        },
        "glow-pulse": {
          "0%": { boxShadow: "0 0 0 0 rgba(209,72,122,0.5)" },
          "70%": { boxShadow: "0 0 0 16px rgba(209,72,122,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(209,72,122,0)" },
        },
        tick: {
          "0%": { transform: "scale(1)" },
          "35%": { transform: "scale(1.28)" },
          "100%": { transform: "scale(1)" },
        },
        "pop-in": {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "60%": { transform: "scale(1.08)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 150ms ease-out",
        "slide-up": "slide-up 200ms ease-out",
        "float-in": "float-in 450ms cubic-bezier(0.22, 1, 0.36, 1) both",
        shimmer: "shimmer 1.8s ease-in-out infinite",
        breathe: "breathe 3.2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 1.6s ease-out 2",
        tick: "tick 420ms ease-out",
        "pop-in": "pop-in 380ms cubic-bezier(0.34, 1.56, 0.64, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
