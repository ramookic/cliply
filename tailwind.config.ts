import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#007DFC",
          light: "#3398FF",
          dark: "#005BB5",
        },
        secondary: {
          DEFAULT: "#FF7A00",
          light: "#FFA733",
          dark: "#CC6100",
        },
      },
    },
  },
  darkMode: "class",
} satisfies Config;
