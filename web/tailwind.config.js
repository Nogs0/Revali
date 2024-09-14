/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'ltrenovate-bold': ['LTRenovate-bold', 'sans-serif'],
        'raleway-semibold': ['Raleway-semibold', 'san-serif'],
        'raleway-medium': ['Raleway-medium', 'sans-serif'],
        'raleway-bold': ['Raleway-bold', 'sans-serif'],
        'raleway-regular': ['Raleway-regular', 'sans-serif']
      }, 
      colors: {
        'green-light': '#faf9e2',
        'green-regular': '#d5d900',
        'green-medium': '#89c480',
        'green-dark': '#1e3629',
      },
      boxShadow: {
        shape:
          "0px 8px 8px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.03), inset 0px 1px 0px rgba(255, 255, 255, 0.03)",
      },
      screens: {
        'tall': { 'raw': '(min-height: 714px)' },
        // => @media (min-height: 800px) { ... }
      }
    },
  },
  plugins: [],
}

