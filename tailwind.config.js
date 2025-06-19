const {nextui} = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", 
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        primary: "#E21B70",
        secondary: "#DCDCDC",
        title: "#333333",
        subTitle: "#999999",
        border: "#E5E7EB"
      },
      textColor: {
        secondary: "#9e9e9e"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};