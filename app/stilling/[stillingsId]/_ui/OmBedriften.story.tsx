import OmBedriften from './OmBedriften';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert OmBedriften seksjon.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      <OmBedriften />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
