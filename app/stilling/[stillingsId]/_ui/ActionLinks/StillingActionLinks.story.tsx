import FinnKandidaterKnapp from './FinnKandidaterKnapp';
import LeggTilKandidatTilStilling from './LeggTilKandidatTilStilling';
import { MockStillingsProvider } from '@/storybook/mocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert action links for stilling.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <MockStillingsProvider>
      <div className='flex flex-col gap-4 opacity-60 pointer-events-none max-w-sm'>
        <FinnKandidaterKnapp stillingId='stilling-123' />
        <LeggTilKandidatTilStilling
          stillingsId='stilling-123'
          stillingsTittel='Utvikler'
        />
      </div>
    </MockStillingsProvider>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
