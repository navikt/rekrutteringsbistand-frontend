import LagreIRekrutteringstreffKnapp from '../../../finn-kandidater/_ui/LagreIRekrutteringstreffKnapp';
import RedigerPublisertButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/RedigerPublisertButton';
import SlettRekrutteringstreffButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/SlettRekrutteringstreffButton';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Ekstra action-knapper (duplikat sti – ryddes ved behov)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none flex flex-col gap-3 opacity-60'>
      <SlettRekrutteringstreffButton />
      <LagreIRekrutteringstreffKnapp
        kandidatsokKandidater={[]}
        rekrutteringstreffId='demo'
      />
      <RedigerPublisertButton
        erIForhåndsvisning={false}
        harPublisert={true}
        onToggleForhåndsvisning={() => {}}
        onBekreftRedigerPublisert={() => {}}
      />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
