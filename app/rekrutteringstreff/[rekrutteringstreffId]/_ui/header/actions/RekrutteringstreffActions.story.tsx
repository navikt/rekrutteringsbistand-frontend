import AvlysRekrutteringstreffButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/AvlysRekrutteringstreffButton';
import FullførRekrutteringstreffButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/FullførRekrutteringstreffButton';
import PubliserRekrutteringstreffButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/PubliserRekrutteringstreffButton';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Handlingsknapper avhenger av API/state. Vi viser dem i inert modus.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='flex flex-col gap-4 opacity-60 pointer-events-none max-w-sm'>
      <PubliserRekrutteringstreffButton
        erPubliseringklar={false}
        rekrutteringstreffId='demo'
        oppdaterData={() => {}}
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
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
