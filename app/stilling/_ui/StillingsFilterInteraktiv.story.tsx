import { withStillingsSokContext } from '../../../.storybook/StillingsSokContextDecorator';
import StillingsSøkPaginering from './Pagnering';
import StillingsSøkChips from './StillingsSøkChips';
import StillingsSøkFilter from './StillingsSøkFilter';
import FylkerOgKommunerFilter from './StillingsSøkFilter/FylkerOgKommunerFilter';
import InkluderingFilter from './StillingsSøkFilter/InkluderingFilter';
import KategoriFilter from './StillingsSøkFilter/KategoriFilter';
import StatusFilter from './StillingsSøkFilter/StatusFilter';
import StillingSøkebar from './StillingsSøkFilter/StillingSøkebar';
import StillingsSøkNavigasjon from './StillingsSøkNavigasjon';
import StillingsSøkSortering from './StillingsSøkSortering';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Interaktiv variant med enkel mock-context.

const meta = {
  decorators: [withStillingsSokContext],
  tags: ['autodocs'],
  render: () => (
    <div className='grid max-w-[1100px] grid-cols-1 gap-8 md:grid-cols-2'>
      <section className='space-y-2 md:col-span-2'>
        <h4 className='text-sm font-semibold'>
          StillingsSøkFilter (kompositt)
        </h4>
        <StillingsSøkFilter />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Kategori</h4>
        <KategoriFilter />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Fylker og kommuner</h4>
        <FylkerOgKommunerFilter geografi={[]} />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Inkludering</h4>
        <InkluderingFilter />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Status</h4>
        <StatusFilter />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Søkebar</h4>
        <StillingSøkebar alltidÅpen={true} />
      </section>
      <section className='space-y-2 md:col-span-2'>
        <h4 className='text-sm font-semibold'>Chips</h4>
        <StillingsSøkChips />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Sortering</h4>
        <StillingsSøkSortering hideLegend />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Navigasjon</h4>
        <StillingsSøkNavigasjon />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Paginering</h4>
        <StillingsSøkPaginering totaltAntallTreff={120} />
      </section>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Standard: Story = {};
