/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@navikt/ds-tailwind')],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // https://cdn.jsdelivr.net/npm/@navikt/ds-tailwind/tailwind.config.js
  theme: {
    extend: {},
  },
  plugins: [],
};
