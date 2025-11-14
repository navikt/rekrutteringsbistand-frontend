import { RekrutteringstreffFilter } from './RekrutteringstreffFilter';
import RekrutteringstreffSøk from './RekrutteringstreffSøk';
import RekrutteringstreffSøkLayout from './RekrutteringstreffSøkLayout';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Disse er avhengig av SWR / API og applikasjonscontext; vises inert med redusert interaktivitet.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none space-y-8 opacity-60'>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Filter</h4>
        <RekrutteringstreffFilter />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Søk (kortliste)</h4>
        <RekrutteringstreffSøk />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Søk layout</h4>
        <RekrutteringstreffSøkLayout />
      </section>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
