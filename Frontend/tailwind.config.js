/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "kred" : "#ea2e0e",
        "pealGreen" : "#b4ffd7",
      }
    },
  },
  plugins: [],
}

