import Åpnelenke from './Åpnelenke';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof Åpnelenke> = {
  component: Åpnelenke,
  tags: ['autodocs'],
  args: {
    href: 'https://www.nav.no',
  },
};
export default meta;

type Story = StoryObj<typeof Åpnelenke>;

export const Default: Story = {};
