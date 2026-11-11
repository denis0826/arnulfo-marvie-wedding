import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#f7f1e8",
        "ivory-soft": "#fbf7f0",
        parchment: "#ede4d4",
        burgundy: "#6b2430",
        "burgundy-deep": "#4a1520",
        "burgundy-soft": "#8b3a45",
        olive: "#5a6b3a",
        "olive-deep": "#3e4a28",
        moss: "#6e7f4a",
        nude: "#dcc3a8",
        ink: "#3a2728",
      },
      fontFamily: {
        script: ['"Great Vibes"', "cursive"],
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        display: ['"Cinzel"', "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
