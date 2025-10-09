import KandidatTilStilling from './KandidatTilStilling';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert KandidatTilStilling modul.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      <KandidatTilStilling />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
