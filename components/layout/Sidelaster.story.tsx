import Sidelaster from './Sidelaster';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: Sidelaster,
} satisfies Meta<typeof Sidelaster>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
