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
      gray: {
        DEFAULT: '#52525b',
        light: '#d4d4d8',
      },
      red: {
        DEFAULT: '#dc2626',
        light: '#dc262620',
      },
      green: {
        DEFAULT: '#16a34a',
        light: '#16a34a20',
      },
      accent: {
        DEFAULT: '#ffd43b',
        light: '#ffd43b50',
      },
      'accent-text': {
        DEFAULT: '#182253',
      },
      background: {
        DEFAULT: 'var(--secondary_bg_color)',
      },
    },
  },
  plugins: [],
};
