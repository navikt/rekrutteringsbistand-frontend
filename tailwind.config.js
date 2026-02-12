import akselTailwind from '@navikt/ds-tailwind';
import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
const config = {
  presets: [akselTailwind],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx,css}',
    './_ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: { xs: '320px' },
      keyframes: {
        kiFadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'ki-fade-in': 'kiFadeIn 300ms ease-in forwards',
      },
    },
  },
  plugins: [scrollbar({ nocompatible: true })],
};

export default config;
