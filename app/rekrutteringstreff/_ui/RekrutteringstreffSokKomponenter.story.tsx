import { RekrutteringstreffFilter } from './RekrutteringstreffFilter';
import RekrutteringstreffSøk from './RekrutteringstreffSøk';
import RekrutteringstreffSøkLayout from './RekrutteringstreffSøkLayout';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Disse er avhengig av SWR / API og applikasjonscontext; vises inert med redusert interaktivitet.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='space-y-8 opacity-60 pointer-events-none'>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Filter</h4>
        <RekrutteringstreffFilter />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Søk (kortliste)</h4>
        <RekrutteringstreffSøk />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Søk layout</h4>
        <RekrutteringstreffSøkLayout />
      </section>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
