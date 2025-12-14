import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{jsx,tsx,mdx}",
    "./src/components/**/*.{jsx,tsx,mdx}",
    "./src/app/**/*.{jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        well: {
          deep: "#1a2332",
          stone: "#3d4f5c",
          water: "#4a6b7c",
          moss: "#5a7866",
          whisper: "#c5d5d8",
          glow: "#7ea8b8",
        },
      },
      animation: {
        "fade-in": "fadeIn 1.2s ease-in",
        "scale-gentle": "scaleGentle 0.8s ease-out",
        "breathe": "breathe 6s ease-in-out",
        "ripple": "ripple 3s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleGentle: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        ripple: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.3" },
          "50%": { transform: "scale(1.1)", opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
