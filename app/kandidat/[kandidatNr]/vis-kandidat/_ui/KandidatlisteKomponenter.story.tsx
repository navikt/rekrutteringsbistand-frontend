import LeggKandidatTilKandidatliste from './LeggKandidatTilKandidatliste';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Begge komponentene krever stillings- og/eller kandidatliste-context + API.
// Vi viser derfor placeholder / inert representasjoner med nødvendige props.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none max-w-xl space-y-6 opacity-60'>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>
          LeggKandidatTilKandidatliste (placeholder)
        </h4>
        <LeggKandidatTilKandidatliste
          kandidatId='demo-kandidat'
          stillingId='demo-stilling'
        />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>
          KandidatlisteBoks (placeholder)
        </h4>
        {/* <KandidatlisteBoks kandidatnr='demo-kandidat' /> */}
      </section>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Oversikt: Story = {};
