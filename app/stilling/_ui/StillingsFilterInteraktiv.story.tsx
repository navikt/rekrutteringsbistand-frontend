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
    <div className='max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-8'>
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
        <StillingsSøkPaginering totaltAntallTreff={120} />
      </section>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Standard: Story = {};
