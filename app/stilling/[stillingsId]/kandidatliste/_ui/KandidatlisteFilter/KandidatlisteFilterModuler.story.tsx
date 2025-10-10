import HendelseTypeFilter from './HendelseTypeFilter';
import InternStatusFilter from './InternStatusFilter';
import KandidatlisteChips from './KandidatlisteChips';
import KandidatlisteFilterrad from './KandidatlisteFilterrad';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Kandidatliste filter moduler (inert)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='grid md:grid-cols-2 gap-8 opacity-60 pointer-events-none'>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Filterrad</h4>
        <KandidatlisteFilterrad />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Chips</h4>
        <KandidatlisteChips />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>InternStatusFilter</h4>
        <InternStatusFilter />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>HendelseTypeFilter</h4>
        <HendelseTypeFilter />
      </section>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
