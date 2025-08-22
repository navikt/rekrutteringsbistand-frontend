/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@navikt/ds-tailwind/darkside-tw3')],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx,css}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // https://cdn.jsdelivr.net/npm/@navikt/ds-tailwind/tailwind.config.js
  theme: {
    extend: {
      screens: {
        xs: '320px',
      },
    },
  },
  plugins: [require('@tailwindcss/container-queries')],
};
