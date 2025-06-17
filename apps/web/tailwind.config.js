/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-grad-start': '#1e3a8a', // blue-900
        'blue-grad-end': '#1d4ed8',   // blue-700
        'primary': '#0041C2',         // From kit
        'accent': '#FF4D4F',          // From kit
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
