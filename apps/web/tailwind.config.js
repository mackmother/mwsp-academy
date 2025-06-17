/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core colors from MSP_Frontend_Full_Integration_Kit
        'primary': '#0041C2',     // Main primary blue
        'accent': '#FF4D4F',      // Accent/destructive red
        
        // Gradient colors used in login and various panels
        'blue-grad-start': '#1e3a8a', // blue-900
        'blue-grad-end': '#1d4ed8',   // blue-700
        
        // Admin highlight colors
        'admin-blue-light': '#EFF6FF', // blue-50
        'admin-blue': '#2563EB',      // blue-600
        'admin-red': '#EF4444',       // red-500
        'admin-green': '#16A34A',     // green-600
        
        // Original brand colors (kept for reference and legacy components)
        brand: {
          primary: "#F6B352",    // Original yellow/gold primary
          secondary: "#F68657", // Original secondary
          dark1: "#383A3F",     // Dark gray
          dark2: "#1F2124",     // Darker gray
        },
      },
      
      // Typography settings from design system
      fontSize: {
        'h1': ['2.25rem', { lineHeight: '1.1', fontWeight: '700' }], // 36px bold
        'h1-lg': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],   // 48px bold
        'h2': ['1.75rem', { lineHeight: '1.2', fontWeight: '600' }],   // 28px semibold
        'h2-lg': ['2rem', { lineHeight: '1.2', fontWeight: '600' }],   // 32px semibold
      },
      
      // Container settings
      maxWidth: {
        '6xl': '72rem', // From design system
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
