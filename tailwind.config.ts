import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#f4ebe4",
        "ivory-soft": "#f8f0ea",
        parchment: "#ead9d1",
        burgundy: "#7a2230",
        "burgundy-deep": "#4a121c",
        "burgundy-soft": "#9a3d4a",
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
