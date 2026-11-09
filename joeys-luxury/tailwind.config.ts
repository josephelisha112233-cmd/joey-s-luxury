import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        luxury: {
          gold: "#D4AF37",
          goldHover: "#B8941F",
          highlight: "#F1E5AC",
          ink: "#3B342A",
          muted: "#786F62",
          cream: "#FAFAF7",
          sand: "#F5F3EE",
          border: "#E9E4D9"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 12px 40px rgba(59, 52, 42, 0.07)"
      }
    }
  },
  plugins: []
};
export default config;
