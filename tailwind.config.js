/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          dark: "#171939",
          default: "#212451",
          light: "#2d327f",
        },
      },
    },
  },
  plugins: [],
};
