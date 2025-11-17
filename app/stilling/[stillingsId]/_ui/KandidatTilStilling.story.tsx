import KandidatTilStilling from './KandidatTilStilling';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert KandidatTilStilling modul.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none opacity-60'>
      <KandidatTilStilling />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
