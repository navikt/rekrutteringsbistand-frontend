import Statistikk from './Statistikk';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert statistikk wrapper.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      <Statistikk />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
