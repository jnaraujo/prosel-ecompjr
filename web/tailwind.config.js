// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1200px",
      },
    },
    fontFamily: {
      sans: ["Inter", fontFamily.sans],
    },
    extend: {
      colors: {
        "brand-blue": "#1D6FB7",
      },
    },
  },
  plugins: [],
}
