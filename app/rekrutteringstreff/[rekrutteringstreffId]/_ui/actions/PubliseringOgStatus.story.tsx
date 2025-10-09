import AvlysRekrutteringstreffButton from './AvlysRekrutteringstreffButton';
import FullførRekrutteringstreffButton from './FullførRekrutteringstreffButton';
import GjenapneRekrutteringstreffButton from './GjenapneRekrutteringstreffButton';
import PubliserRekrutteringstreffButton from './PubliserRekrutteringstreffButton';
import RepubliserRekrutteringstreffButton from './RepubliserRekrutteringstreffButton';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Publiserings- og statusendringsknapper (subset) inert.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='flex flex-col gap-3 opacity-60 pointer-events-none max-w-sm'>
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
      <FullførRekrutteringstreffButton
        rekrutteringstreffId='demo'
        harInvitert={false}
        tiltidspunktHarPassert={false}
        oppdaterData={() => {}}
      />
      <AvlysRekrutteringstreffButton
        rekrutteringstreffId='demo'
        oppdaterData={() => {}}
      />
      <GjenapneRekrutteringstreffButton
        rekrutteringstreffId='demo'
        oppdaterData={() => {}}
      />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
