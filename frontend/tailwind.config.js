/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#1E1B4B",
          DEFAULT: "#312E81",
          light: "#4338CA",
        },
        savings: {
          DEFAULT: "#059669",
          light: "#D1FAE5",
          dark: "#065F46",
        },
        cost: {
          DEFAULT: "#DC2626",
          light: "#FEE2E2",
          dark: "#991B1B",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        minimal: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
}
