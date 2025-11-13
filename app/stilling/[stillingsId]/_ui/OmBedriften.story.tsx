import OmBedriften from './OmBedriften';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert OmBedriften seksjon.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none opacity-60'>
      <OmBedriften />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
