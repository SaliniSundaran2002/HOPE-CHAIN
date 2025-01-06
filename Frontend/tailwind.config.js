/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        SourGummy:[ "Sour Gummy", "serif"],
        BebasNeue: ["Bebas Neue", "serif"],
        Lobster:["Lobster", "serif"],
      }
    },
  },
  plugins: [],
}