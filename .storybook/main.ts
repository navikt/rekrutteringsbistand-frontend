import type { StorybookConfig } from '@storybook/nextjs-vite';
import path from 'path';

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
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    const basePath = process.env.STORYBOOK_BASE_PATH; // Used for GitHub Pages deployment so assets load under /<repo>/

    return {
      ...config,
      // Vite base path only applied in build (ignored in dev server if undefined)
      base: basePath || config.base,
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
        },
      },
    };
  },
};
export default config;
