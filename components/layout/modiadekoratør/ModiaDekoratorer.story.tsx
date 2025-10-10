import DevDekoratør from './DevDekoratør';
import NavDekoratør from './NavDekoratør';
import UtviklerDekoratør from './UtviklerDekoratør';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Disse komponentene er konteksttunge; vi viser dem separat.

const meta = {
  tags: ['autodocs'],
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Nav: Story = { render: () => <NavDekoratør /> };
export const Dev: Story = { render: () => <DevDekoratør /> };
export const Utvikler: Story = { render: () => <UtviklerDekoratør /> };
