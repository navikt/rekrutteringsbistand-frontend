import '../app/globals.css';
import { ThemeProvider } from '../providers/ThemeProvider';
import StoryProviders from './StoryProviders';
import './storybook.css';
import '@navikt/ds-css/darkside';
import type { Preview } from '@storybook/nextjs-vite';
import { themes } from '@storybook/theming';
import { useDarkMode } from 'storybook-dark-mode';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      autodocs: true,
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    backgrounds: { disable: true },
    darkMode: {
      stylePreview: true, // sett bakgrunn i preview-iframe
      dark: {
        ...themes.dark,
        appBg: '#0e151f',
        appContentBg: '#0e151f',
        barBg: '#0e151f',
        brandTitle: 'Rekrutteringsbistand (Dark)',
        textColor: '#ffffff',
        colorSecondary: '#66B3FF',
      },
      light: {
        ...themes.light,
        appBg: '#ffffff',
        appContentBg: '#ffffff',
        barBg: '#ffffff',
        brandTitle: 'Rekrutteringsbistand',
      },
    },
  },

  decorators: [
    (Story) => {
      const isDark = useDarkMode();
      return (
        <ThemeProvider forceDarkMode={isDark}>
          <StoryProviders>
            <Story />
          </StoryProviders>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
