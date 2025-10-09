import AvlysRekrutteringstreffButton from '../actions/AvlysRekrutteringstreffButton';
import FullførRekrutteringstreffButton from '../actions/FullførRekrutteringstreffButton';
import GjenapneRekrutteringstreffButton from '../actions/GjenapneRekrutteringstreffButton';
import LagreIRekrutteringstreffButton from '../actions/LagreIRekrutteringstreffButton';
import PubliserRekrutteringstreffButton from '../actions/PubliserRekrutteringstreffButton';
import RedigerPublisertButton from '../actions/RedigerPublisertButton';
import RepubliserRekrutteringstreffButton from '../actions/RepubliserRekrutteringstreffButton';
import SlettRekrutteringstreffButton from '../actions/SlettRekrutteringstreffButton';
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
