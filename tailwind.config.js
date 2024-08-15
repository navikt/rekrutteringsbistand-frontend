/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@navikt/ds-tailwind')],
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      maxWidth: {
        dekstop: '1200px',
      },
    },
  },
  plugins: [],
};
