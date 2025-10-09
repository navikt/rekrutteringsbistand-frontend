import '../app/globals.css';
import StoryProviders from './StoryProviders';
import '@navikt/ds-css/darkside';
import type { Preview } from '@storybook/nextjs-vite';
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

    darkMode: {
      current: 'dark',
      stylePreview: true,
      darkClass: 'dark',
      lightClass: 'light',
    },
  },

  decorators: [
    (Story) => {
      const isDark = useDarkMode();
      return (
        <StoryProviders darkMode={isDark}>
          <Story />
        </StoryProviders>
      );
    },
  ],
};

export default preview;
