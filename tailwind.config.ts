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
      themes: {
        light: {
          colors: {
            primary: {
              "50": "#f0f9fb",
              "100": "#daf0f3",
              "200": "#b9e0e8",
              "300": "#89cad7",
              "400": "#52aabe",
              "500": "#368ea4",
              "600": "#30748a",
              "700": "#2d6073",
              "800": "#2b4f5f",
              "900": "#284451",
              "950": "#162b36",
            },
            secondary: {
              "50": "#f3faf7",
              "100": "#d6f1e9",
              "200": "#aee1d2",
              "300": "#7dcbb8",
              "400": "#65b8a6",
              "500": "#389482",
              "600": "#2b7669",
              "700": "#265f56",
              "800": "#224d46",
              "900": "#20413c",
              "950": "#0d2623",
            },
          },
        },
      },
    }),
    require("tailwindcss-animated"),
  ],
};
export default config;
