import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
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

  plugins: [nextui(
    {
      themes: {
        light:{
          colors:{
            primary:{
              foreground: "#FFFFFF",
              DEFAULT: "#2d6073",
            }
,
            secondary:{
              foreground: "#FFFFFF",
              DEFAULT: "#65b8a6",
            },

            
          }
        }
      }
    }
  ),require('tailwindcss-animated')],
};
export default config;
