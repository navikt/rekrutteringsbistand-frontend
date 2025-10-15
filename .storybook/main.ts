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
    'msw-storybook-addon',
    '@storybook/addon-queryparams',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    // GitHub Pages hoster under https://<org>.github.io/<repo>/
    // Vi ønsker at alle Storybook-assets lever under <repo>/storybook/ for å unngå konflikt med appens egne GitHub Pages (hvis noen).
    // Prioritet:
    // 1. STORYBOOK_BASE_PATH hvis satt eksplisitt (full verdi f.eks. /rekrutteringsbistand-frontend/storybook/)
    // 2. Hvis GITHUB_REPOSITORY miljøvariabel finnes (org/repo) -> konstruer /<repo>/storybook/
    // 3. Fallback: eksisterende config.base (typisk '/')
    let computedBase = config.base;
    const explicit = process.env.STORYBOOK_BASE_PATH;
    if (explicit) {
      computedBase = explicit;
    } else if (process.env.GITHUB_REPOSITORY) {
      const repo = process.env.GITHUB_REPOSITORY.split('/')?.[1];
      if (repo) {
        computedBase = `/${repo}/storybook/`;
      }
    }

    // Sørg for trailing slash pga Vite asset resolving krav.
    if (computedBase && !computedBase.endsWith('/')) computedBase += '/';

    return {
      ...config,
      base: computedBase,
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
        },
      },
    };
  },
};
export default config;
