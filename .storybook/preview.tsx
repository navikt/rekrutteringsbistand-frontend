import '../app/globals.css';
import { mswHandlers } from '../mocks/handlers';
import { ThemeProvider } from '../providers/ThemeProvider';
import { MockRekrutteringstreffProvider } from '../storybook/mocks';
import StoryProviders from './StoryProviders';
import './storybook.css';
import '@navikt/ds-css/darkside';
import type { Preview } from '@storybook/nextjs-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';

// Init MSW (kun i Storybook). Handlerliste importeres fra mocks/handlers.ts.
// Viktig: Standard (addon) forsøker å registrere service worker på "/mockServiceWorker.js".
// På GitHub Pages ligger Storybook gjerne under en subpath (f.eks. /rekrutteringsbistand-frontend/),
// og da vil "/mockServiceWorker.js" peke til organisasjons-roten i stedet for repoet.
// Vi bruker derfor en RELATIV sti (uten leading slash) slik at den blir korrekt uansett base.
// (Vite sin base settes i main.ts via STORYBOOK_BASE_PATH.)
initialize({
  onUnhandledRequest: 'bypass',
  serviceWorker: {
    // Relativ gjør at URLen blir `${window.location.origin}${window.location.pathnameBase}mockServiceWorker.js`.
    // Fungerer både lokalt (root) og på GitHub Pages (subpath) og i Chromatic.
    url: 'mockServiceWorker.js',
  },
});

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Tema',
      description: 'Velg tema',
      defaultValue: 'light',
      toolbar: {
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Lys' },
          { value: 'dark', title: 'Mørk' },
        ],
      },
    },
  },
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    docs: { autodocs: true },
    a11y: { test: 'todo' },
    backgrounds: { disable: true },
    msw: { handlers: mswHandlers },
  },
  loaders: [mswLoader],
  decorators: [
    // Base dekoratør: tema + applikasjons/umami + (senere flere globale)
    (Story, context) => {
      const mode = (context.globals.theme as 'light' | 'dark') || 'light';
      if (typeof document !== 'undefined') {
        document.documentElement.dataset.theme = mode;
      }
      return (
        <ThemeProvider forceDarkMode={mode === 'dark'}>
          <StoryProviders>
            <Story />
          </StoryProviders>
        </ThemeProvider>
      );
    },
    // RekrutteringstreffContext automatisk. Hvis du vil skru AV for en story, sett parameters.rekrutteringstreffContext=false
    (Story, context) => {
      const opt = context.parameters.rekrutteringstreffContext;
      if (opt === false) return <Story />; // eksplisitt av
      // Tillat å overstyre id via parameters.rekrutteringstreffContext.id
      const id =
        (typeof opt === 'object' && opt?.id) ||
        'storybook-rekrutteringstreff-id';
      return (
        <MockRekrutteringstreffProvider id={id}>
          <Story />
        </MockRekrutteringstreffProvider>
      );
    },
  ],
};

export default preview;
