import LagreIRekrutteringstreffKnapp from '../../../finn-kandidater/_ui/LagreIRekrutteringstreffKnapp';
import RedigerPublisertButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/RedigerPublisertButton';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Duplisert (ryddes ved behov) redigering / lagring subset
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none flex flex-col gap-3 opacity-60'>
      <RedigerPublisertButton
        erIForhåndsvisning={false}
        harPublisert={true}
        onToggleForhåndsvisning={() => {}}
        onBekreftRedigerPublisert={() => {}}
      />
      <LagreIRekrutteringstreffKnapp
        rekrutteringstreffId='demo'
        kandidatsokKandidater={[]}
      />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
