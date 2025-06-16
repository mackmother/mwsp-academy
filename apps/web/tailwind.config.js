/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blueGrad: {
          start: "#1e3a8a", // blue-900
          end: "#1d4ed8",   // blue-700
        },
      },
      colors: {
        brand: {
          primary: "#F6B352",
          secondary: "#F68657",
          dark1: "#383A3F",
          dark2: "#1F2124",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
