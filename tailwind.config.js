/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@navikt/ds-tailwind')],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx,css}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@navikt/ds-react/**/*.{js,jsx,ts,tsx}',
  ],
  // https://cdn.jsdelivr.net/npm/@navikt/ds-tailwind/tailwind.config.js
  theme: {
    extend: {
      screens: {
        full: '1440px',
        halv: '768px',
      },
    },
  },
  plugins: [],
};
