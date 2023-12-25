/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: '#1E4C42',
        secondary: '#E5FD99',
        terciary: '#EBF3E6',
        background: '#e6efea',
      },
      screens: {
        '3xl': '1800px',
      },
    },
  },
  plugins: [],
};
