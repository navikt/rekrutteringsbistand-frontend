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
    },
  },
  plugins: [scrollbar({ nocompatible: true })],
};

export default config;
