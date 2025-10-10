import LagreIRekrutteringstreffButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/actions/LagreIRekrutteringstreffButton';
import AvlysRekrutteringstreffButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/AvlysRekrutteringstreffButton';
import FullførRekrutteringstreffButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/FullførRekrutteringstreffButton';
import GjenapneRekrutteringstreffButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/GjenapneRekrutteringstreffButton';
import PubliserRekrutteringstreffButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/PubliserRekrutteringstreffButton';
import RedigerPublisertButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/RedigerPublisertButton';
import RepubliserRekrutteringstreffButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/RepubliserRekrutteringstreffButton';
import SlettRekrutteringstreffButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/SlettRekrutteringstreffButton';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert samling av ALLE action-knapper. Krever egentlig context + data; vises deaktivert / med dummy verdier.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='flex flex-col gap-3 max-w-sm opacity-60 pointer-events-none'>
      <PubliserRekrutteringstreffButton
        erPubliseringklar={false}
        rekrutteringstreffId='demo'
        oppdaterData={() => {}}
      />
      <RepubliserRekrutteringstreffButton
        disabled
        treff={{}}
        innleggHtmlFraBackend={null}
        onBekreft={async () => {}}
      />
      <RedigerPublisertButton
        erIForhåndsvisning={false}
        harPublisert={true}
        onToggleForhåndsvisning={() => {}}
        onBekreftRedigerPublisert={() => {}}
      />
      <AvlysRekrutteringstreffButton
        rekrutteringstreffId='demo'
        oppdaterData={() => {}}
      />
      <FullførRekrutteringstreffButton
        rekrutteringstreffId='demo'
        harInvitert={false}
        tiltidspunktHarPassert={false}
        oppdaterData={() => {}}
      />
      <GjenapneRekrutteringstreffButton
        rekrutteringstreffId='demo'
        oppdaterData={() => {}}
      />
      <SlettRekrutteringstreffButton />
      <LagreIRekrutteringstreffButton
        rekrutteringstreffId='demo'
        kandidatsokKandidater={[]}
      />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
