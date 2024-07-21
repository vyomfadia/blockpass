import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#AA0076",
      secondary: "#ECCEAE",
      foreground: "#FBF6E2",
      background: "#131842",
      gray: "#DFDFDF"
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        nunito: ['var(--font-nunito)'],
      },
      dropShadow: {
        glow: [
          "0 0px 5px rgba(255,255, 255, 1)"
        ],
        botom: [
          "0.1px 0.2px 0.2px hsl(208, 7%, 77% / 0.27)",
          "0.5px 1.1px 1.4px -0.3px hsl(208, 7%, 77% / 0.27)",
          "0.8px 2px 2.4px -0.6px hsl(208, 7%, 77% / 0.27)",
          "1.2px 3px 3.6px -0.8px hsl(208, 7%, 77% / 0.27)",
          "1.8px 4.4px 5.3px -1.1px hsl(208, 7%, 77% / 0.27)",
          "2.6px 6.3px 7.6px -1.4px hsl(208, 7%, 77% / 0.27)",
          "3.7px 9px 10.9px -1.7px hsl(208, 7%, 77% / 0.27)",
          "5.2px 12.6px 15.2px -2px hsl(208, 7%, 77% / 0.27)",
          "7.2px 17.4px 21px -2.3px hsl(208, 7%, 77% / 0.26)",
          "9.7px 23.4px 28.3px -2.5px hsl(208, 7%, 77% / 0.26)"
        ],
      },
    },
  },
  plugins: [],
};
export default config;
