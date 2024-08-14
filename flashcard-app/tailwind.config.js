/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'coral': '#FF6F61',
        'mint': '#4ECDC4',
        'sky': '#E7F5F2',
      },
    },
  },
  plugins: [],
}