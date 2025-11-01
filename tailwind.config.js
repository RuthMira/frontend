/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'txai-red': '#E53935',
        'txai-black': '#000000',
        'txai-white': '#FFFFFF',
      },
    },
  },
  plugins: [],
}
