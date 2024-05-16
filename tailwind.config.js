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
      'tg-theme-destructive-text': {
        DEFAULT: 'var(--tg-theme-destructive-text-color)',
      },
      'tg-theme-section-bg': {
        DEFAULT: 'var(--tg-theme-section-bg-color)',
      },
      'tg-theme-header-bg': {
        DEFAULT: 'var(--tg-theme-header-bg-color)',
      },
      'tg-theme-button': {
        DEFAULT: 'var(--tg-theme-button-color)',
      },
      'tg-theme-button-text': {
        DEFAULT: 'var(--tg-theme-button-text-color)',
      },
      'tg-theme-text': {
        DEFAULT: 'var(--tg-theme-text-color)',
      },
      'tg-theme-hint': {
        DEFAULT: 'var(--tg-theme-hint-color)',
      },
      'tg-theme-link': {
        DEFAULT: 'var(--tg-theme-link-color)',
      },
      'tg-theme-subtitle-text': {
        DEFAULT: 'var(--tg-theme-subtitle-text-color)',
      },
      'tg-color-scheme': {
        DEFAULT: 'var(--tg-color-scheme)',
      },
      'tg-theme-bg': {
        DEFAULT: 'var(--tg-theme-bg-color)',
      },
      'tg-theme-accent-text': {
        DEFAULT: 'var(--tg-theme-accent-text-color)',
      },
      'tg-theme-section-header': {
        DEFAULT: 'var(--tg-theme-section-header-color)',
      },
      'tg-theme-section-header-text': {
        DEFAULT: 'var(--tg-theme-section-header-text-color)',
      },
      'tg-theme-secondary-bg': {
        DEFAULT: 'var(--tg-theme-secondary-bg-color)',
      },
    },
  },
  plugins: [],
};
