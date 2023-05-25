/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3454C6",
        secondary: "#E7E2D4",
        tertiary: "#3C3C3C",
        base: {
          color: "#E7E2D4",
          font: "#000000",
        },
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
      }
    },
  },
  daisyui: {
    themes: [{
      "mytheme": {
        primary: "#3454C6",
        "base-100": "#E7E2D4",
      }
    },],
  },
  plugins: [require("daisyui")],
}
