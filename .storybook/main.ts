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
    '@storybook/addon-vitest',
    'storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    return {
      ...config,
      server: {
        ...config.server,
        hmr: {
          overlay: false,
        },
      },
      css: {
        ...config.css,
        postcss: {
          plugins: [require('@tailwindcss/postcss')()],
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
