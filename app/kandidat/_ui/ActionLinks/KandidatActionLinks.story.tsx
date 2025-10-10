import FinnStillingForKandidatKnapp from './FinnStillingForKandidatKnapp';
import NavigerTilAktivitetsplanenKnapp from './NavigerTilAktivitetsplanenKnapp';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Kandidat action lenker (inert)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='flex flex-col gap-4 opacity-60 pointer-events-none max-w-sm'>
      <FinnStillingForKandidatKnapp />
      <NavigerTilAktivitetsplanenKnapp />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
