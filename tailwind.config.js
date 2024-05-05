/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#2e2e2e',
      'color-text': '#2e2e2e',
      gray: {
        DEFAULT: '#52525b',
        light: '#d4d4d8',
      },
      red: {
        DEFAULT: '#dc2626',
        light: '#dc262620',
      },
      green: {
        DEFAULT: '#16a391',
        light: '#16a39120',
      },
      accent: {
        DEFAULT: '#2d3a3f',
        light: '#2d3a3f',
      },
      'accent-text': {
        DEFAULT: '#ffffff',
      },
      background: {
        DEFAULT: '#ffffff',
      },
    },
  },
  plugins: [],
};
