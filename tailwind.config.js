import darkside from '@navikt/ds-tailwind/darkside-tw3';
import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [darkside],
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
