/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        coffeeShop: {
          "primary": "#4B2E2B",
          "secondary": "#D9C5B2",
          "accent": "#D27C2C",
          "neutral": "#826A5C",
          "base-100": "#F6F1EB",
          "info": "#A1C8E9",
          "success": "#8A977B",
          "warning": "#E8B54D",
          "error": "#AF4035",
          },
        },
        "coffee",
      ],
      
    },
  plugins: [require("daisyui")],
};
