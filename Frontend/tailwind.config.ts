import { transform } from 'next/dist/build/swc';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
        },
        gray: {
          100: 'rgb(var(--tw-color-gray-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-gray-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-gray-300) / <alpha-value>)',
        },
        border: {
          100: 'rgb(var(--tw-color-white-100) / 0.4)',
          200: 'rgb(var(--tw-color-white-100) / 0.15)',
          300: 'rgb(var(--tw-color-white-100) / 0.1)',
        },
        background: {
          100: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
          200: 'rgb(var(--tw-color-gray-100) / <alpha-value>)',
          300: 'rgb(var(--tw-color-gray-200) / <alpha-value>)',
          400: 'rgb(var(--tw-color-gray-300) / <alpha-value>)',
          500: 'rgb(var(--tw-color-gray-400) / <alpha-value>)',
        },
        dark: '#000000',
        light: 'rgb(var(--tw-color-white-100) / <alpha-value>)',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
        loading: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
        'loading-line': 'loading 1.5s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
