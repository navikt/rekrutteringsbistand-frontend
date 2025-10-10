import OmAnnonsen from './OmAnnonsen';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert OmAnnonsen seksjon.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      <OmAnnonsen />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
