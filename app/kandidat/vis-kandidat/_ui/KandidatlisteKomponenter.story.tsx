import KandidatlisteBoks from './KandidatlisteBoks';
import LeggKandidatTilKandidatliste from './LeggKandidatTilKandidatliste';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Begge komponentene krever stillings- og/eller kandidatliste-context + API.
// Vi viser derfor placeholder / inert representasjoner med nødvendige props.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='space-y-6 max-w-xl opacity-60 pointer-events-none'>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>
          LeggKandidatTilKandidatliste (placeholder)
        </h4>
        <LeggKandidatTilKandidatliste
          kandidatId='demo-kandidat'
          stillingId='demo-stilling'
        />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>
          KandidatlisteBoks (placeholder)
        </h4>
        <KandidatlisteBoks kandidatnr='demo-kandidat' />
      </section>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Oversikt: Story = {};
