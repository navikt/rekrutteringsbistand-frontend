import StillingsSøkPaginering from './Pagnering';
import StillingsSøkChips from './StillingsSøkChips';
import StillingsSøkFilter from './StillingsSøkFilter';
import FylkerOgKommunerFilter from './StillingsSøkFilter/FylkerOgKommunerFilter';
import GeografiFilter from './StillingsSøkFilter/GeografiFilter';
import InkluderingFilter from './StillingsSøkFilter/InkluderingFilter';
import KategoriFilter from './StillingsSøkFilter/KategoriFilter';
import StatusFilter from './StillingsSøkFilter/StatusFilter';
import StillingSøkebar from './StillingsSøkFilter/StillingSøkebar';
import StillingsSøkNavigasjon from './StillingsSøkNavigasjon';
import StillingsSøkSortering from './StillingsSøkSortering';
import MittStandardsøk from './standardsøk/MittStandardsøk';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Disse komponentene er sterkt avhengige av context + API hooks. Vi viser dem i en inert tilstand.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-8 opacity-60 pointer-events-none'>
      <section className='space-y-2 md:col-span-2'>
        <h4 className='font-semibold text-sm'>
          StillingsSøkFilter (kompositt)
        </h4>
        <StillingsSøkFilter />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Kategori</h4>
        <KategoriFilter />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Fylker og kommuner</h4>
        <FylkerOgKommunerFilter geografi={[]} />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Inkludering</h4>
        <InkluderingFilter />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Status</h4>
        <StatusFilter />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Geografi (wrapper)</h4>
        <GeografiFilter />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Søkebar</h4>
        <StillingSøkebar alltidÅpen={true} />
      </section>
      <section className='space-y-2 md:col-span-2'>
        <h4 className='font-semibold text-sm'>Chips</h4>
        <StillingsSøkChips />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Sortering</h4>
        <StillingsSøkSortering hideLegend />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Navigasjon</h4>
        <StillingsSøkNavigasjon />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Paginering</h4>
        <StillingsSøkPaginering totaltAntallTreff={400} />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Mitt standardsøk</h4>
        <MittStandardsøk />
      </section>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Oversikt: Story = {};
