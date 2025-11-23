/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: { 
    extend: {
      colors: {
        // 'primary': '#C12966',
        // 'secondary': '#37467F',
        // 'on-primary': '#D7F2FB',
        // 'white': '#ffffff',
        // 'black': '#000000',
      },
    },
  },
  plugins: [],
}