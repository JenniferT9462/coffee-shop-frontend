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
          "primary": "#4ade80",
          "secondary": "#8b5cf6",
          "accent": "#0ea5e9",
          "neutral": "#34d399",
          "base-100": "#d9f99d",
          "info": "#6366f1",
          "success": "#84cc16",
          "warning": "#eab308",
          "error": "#e11d48",
          },
        },
      ],
    },
  plugins: [require("daisyui")],
};
