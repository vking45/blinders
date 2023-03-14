/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-bg': '#18122B',
        'purple-bg': '#393053',
        'purple-bg-dark': '#2b1e56',
        'purple-light': '#443C68',
        'purple-lighter': '#635985',
        'darker-bg': '#100b22',
        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f545c',
          400: '#d4d7dc',
          300: '#e3e538',
          200: '#ebedef',
          100: '#f2f3f5',
        },
      },
    },
  },
  plugins: [],
}
