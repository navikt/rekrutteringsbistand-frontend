import FinnKandidaterForRekrutteringstreff from './FinnKandidaterForRekrutteringstreff';
import KandidatTilRekrutteringstreff from './KandidatTilRekrutteringstreff';
import { MockRekrutteringstreffProvider } from '@/storybook/mocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert søk etter kandidater til treff.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <MockRekrutteringstreffProvider>
      <div className='space-y-8 opacity-60 pointer-events-none'>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>Søk</h4>
          <FinnKandidaterForRekrutteringstreff />
        </section>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>Kandidat kort (enkelt)</h4>
          <KandidatTilRekrutteringstreff />
        </section>
      </div>
    </MockRekrutteringstreffProvider>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
