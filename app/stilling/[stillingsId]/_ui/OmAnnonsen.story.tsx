import OmAnnonsen from './OmAnnonsen';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert OmAnnonsen seksjon.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none opacity-60'>
      <OmAnnonsen />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
