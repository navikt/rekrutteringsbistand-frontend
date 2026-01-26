import FinnStillingForKandidatKnapp from './FinnStillingForKandidatKnapp';
import NavigerTilAktivitetsplanenKnapp, {
  NavigerTilAktivitetsplanenMedContext,
} from './NavigerTilAktivitetsplanenKnapp';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Kandidat action lenker (inert)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none flex max-w-sm flex-col gap-4 opacity-60'>
      <FinnStillingForKandidatKnapp />
      <NavigerTilAktivitetsplanenMedContext />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
