import KandidatTilRekrutteringstreff from './KandidatTilRekrutteringstreff';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Kandidat kort isolert (duplisert)
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      <KandidatTilRekrutteringstreff />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
