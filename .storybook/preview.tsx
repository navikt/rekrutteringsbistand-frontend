import '../app/globals.css';
import { ThemeProvider } from '../providers/ThemeProvider';
import { MockRekrutteringstreffProvider } from '../storybook/mocks';
import StoryProviders from './StoryProviders';
import './storybook.css';
import '@navikt/ds-css/darkside';
import type { Preview } from '@storybook/nextjs-vite';

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
  },
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
