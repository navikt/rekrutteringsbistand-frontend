// This file has been automatically migrated to valid ESM format by Storybook.
import './local-storage-polyfill.ts';
import type { StorybookConfig } from '@storybook/nextjs-vite';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: [
    {
      directory: '../components',
      titlePrefix: 'Felles',
      files: '**/*.story.@(js|jsx|mjs|ts|tsx)',
    },
    {
      directory: '../app',
      titlePrefix: 'App',
      files: '**/*.story.@(js|jsx|mjs|ts|tsx)',
    },
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    'msw-storybook-addon',
    '@storybook/addon-queryparams',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    // const basePath = process.env.STORYBOOK_BASE_PATH; // Used for GitHub Pages deployment so assets load under /<repo>/

    return {
      ...config,
      // // Vite base path only applied in build (ignored in dev server if undefined)
      // base: basePath || config.base,
      server: {
        ...config.server,
        hmr: {
          overlay: false,
        },
      },
      css: {
        ...config.css,
        postcss: {
          plugins: [(await import('@tailwindcss/postcss')).default()],
        },
        devSourcemap: true,
      },
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@': path.resolve(__dirname, '../'),
          // Storybook har ikke Next.js App Router montert. Vi aliaser next/navigation til en mock
          // slik at hooks som useRouter/usePathname ikke kaster "invariant expected app router to be mounted".
          'next/navigation': path.resolve(__dirname, './nextNavigationMock.ts'),
          // @navikt/next-logger er server-side (pino + @opentelemetry) og bruker __dirname
          // som ikke finnes i nettleseren. Vi stubber den med en konsollbasert mock.
          '@navikt/next-logger': path.resolve(__dirname, './nextLoggerMock.ts'),
        },
      },
    };
  },
};
export default config;
