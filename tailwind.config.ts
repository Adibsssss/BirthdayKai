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
        // Midnight-sky celebration: an intentionally varied blue family,
        // warmed by tiny amber/coral details that feel like candlelight.
        ink: "#172554",
        paper: "#f7f9ff",
        line: "#ced9f2",
        muted: "#64748b",
        coral: "#d98b36", // restrained candlelight accent / primary action
        peach: "#c4cff3", // periwinkle softness
        butter: "#78bde9", // airy sky-blue details
        sage: "#8ccbc4", // a quiet blue-green note
        plum: "#1e2a78", // inky indigo for the hero and overlays
        rose: "#ee9a68", // sparing warm highlight
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
          "0%": { boxShadow: "0 0 0 0 rgba(217,139,54,0.5)" },
          "70%": { boxShadow: "0 0 0 16px rgba(217,139,54,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(217,139,54,0)" },
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
