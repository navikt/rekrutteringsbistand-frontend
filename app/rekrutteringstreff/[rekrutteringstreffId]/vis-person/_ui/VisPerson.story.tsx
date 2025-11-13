import VisPerson from './VisPerson';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert visning av person (placeholder)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none max-w-xl opacity-60'>
      <VisPerson />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
