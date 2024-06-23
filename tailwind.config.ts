import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },

  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#368ea4",
              50: "#f0f9fb",
              100: "#daf0f3",
              200: "#b9e0e8",
              300: "#89cad7",
              400: "#52aabe",
              500: "#368ea4",
              600: "#30748a",
              700: "#2d6073",
              800: "#2b4f5f",
              900: "#284451",
              950: "#162b36",
            },
            secondary: {
              DEFAULT: "#389482",
              50: "#f3faf7",
              100: "#d6f1e9",
              200: "#aee1d2",
              300: "#7dcbb8",
              400: "#65b8a6",
              500: "#389482",
              600: "#2b7669",
              700: "#265f56",
              800: "#224d46",
              900: "#20413c",
              950: "#0d2623",
            },
            error: {
              DEFAULT: "#e53e3e",
              50: "#fef6f6",
              100: "#fdeeed",
              200: "#f9d4d4",
              300: "#f4b1b1",
              400: "#f17d7d",
              500: "#e53e3e",
              600: "#c53030",
              700: "#9e2626",
              800: "#742020",
              900: "#5c1a1a",
              950: "#2d0b0b",
            },
          },
        },
      },
    }),
    require("tailwindcss-animated"),
  ],
};
export default config;
