import '../app/globals.css';
import { ThemeProvider } from '../providers/ThemeProvider';
import StoryProviders from './StoryProviders';
import '@navikt/ds-css/darkside';
import type { Preview } from '@storybook/nextjs-vite';

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
  },

  decorators: [
    (Story) => (
      <ThemeProvider>
        <StoryProviders>
          <Story />
        </StoryProviders>
      </ThemeProvider>
    ),
  ],
};

export default preview;
