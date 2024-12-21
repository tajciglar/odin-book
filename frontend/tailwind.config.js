/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warmBeige: '#C89D6B',
        forestGreen: '#2B4A3A',
        burntOrange: '#A5542B',
        darkerBurntOrange: '#843E22',
        white: '#FFFFFF',
        black: '#000000',
        lightBeige: '#D6C6A1'
      },
    },
  },
  plugins: [],
}

