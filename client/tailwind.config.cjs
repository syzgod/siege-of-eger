/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['MedievalSharp', 'serif'],
        ui: ['Marcellus', 'serif'],
        body: ['EB Garamond', 'serif'],
      },
      colors: {
        // Your Historical Palette
        iron: '#434343',
        parchment: '#fcf5e5',
        wood: '#5d4037',
        blood: '#9d2235', // Hungarian Red
        gold: '#d4af37',
      },
      fontFamily: {
        // You can add medieval-style Google Fonts here later
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
