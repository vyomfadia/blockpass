import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#E68369",
      secondary: "#ECCEAE",
      foreground: "#FBF6E2",
      background: "#131842",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: { 
        "nunito": ["Nunito Sans", "sans-serif"] 
      },
      dropShadow: {
        glow: [
          "0 0px 5px rgba(255,255, 255, 1)"
        ],
      },
    },
  },
  plugins: [],
};
export default config;
