import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
const config = {
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
