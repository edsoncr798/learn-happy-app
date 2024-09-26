/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}', // Path to your files
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Atkinson Hyperlegible', 'sans-serif'],
      }
    },
  },
  variants:{
    extend: {},
  },
  plugins: [],
}

