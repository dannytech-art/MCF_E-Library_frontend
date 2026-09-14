/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        surface: '#141414',
        carton: {
          DEFAULT: '#B8935A',
          light: '#D4B483',
          dark: '#8A6D3F',
        },
        cream: '#F5E6D3',
        teal: {
          DEFAULT: '#1F6F6B',
          dark: '#14504D',
        },
        navy: '#0A0A0A',
        'brand-red': '#B8935A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
      },
    },
  },
  plugins: [],
}