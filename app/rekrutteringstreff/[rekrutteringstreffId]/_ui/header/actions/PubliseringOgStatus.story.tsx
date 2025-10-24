import AvlysRekrutteringstreffButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/AvlysRekrutteringstreffButton';
import FullførRekrutteringstreffButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/FullførRekrutteringstreffButton';
import GjenapneRekrutteringstreffButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/GjenapneRekrutteringstreffButton';
import PubliserRekrutteringstreffButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/PubliserRekrutteringstreffButton';
import RepubliserRekrutteringstreffButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/RepubliserRekrutteringstreffButton';
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
        treff={{}}
        innleggHtmlFraBackend={null}
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
