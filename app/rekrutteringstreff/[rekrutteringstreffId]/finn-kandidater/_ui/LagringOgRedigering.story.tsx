import LagreIRekrutteringstreffKnapp from './LagreIRekrutteringstreffKnapp';
import RedigerPublisertButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/RedigerPublisertButton';
import SlettRekrutteringstreffButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/SlettRekrutteringstreffButton';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Lagring / redigering / sletting (inert)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none flex max-w-sm flex-col gap-3 opacity-60'>
      <LagreIRekrutteringstreffKnapp
        rekrutteringstreffId='demo'
        kandidatsokKandidater={[]}
      />
      <RedigerPublisertButton
        erIForhåndsvisning={false}
        harPublisert={true}
        onToggleForhåndsvisning={() => {}}
        onBekreftRedigerPublisert={() => {}}
      />
      <SlettRekrutteringstreffButton />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
