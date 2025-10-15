import KandidatKnapper from './KandidatKnapper';
import Kontaktpersoner from './Kontaktpersoner';
import OmStillingen from './OmStillingen';
import OmStillingenHeader from './OmStillingenHeader';
import StillingInkludering from './StillingSidebar/StillingInkludering';
import { MockStillingsProvider, dummyRef } from '@/.storybook/mocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert oversikt over "Om stillingen" relaterte elementer.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <MockStillingsProvider>
      <div className='space-y-10 opacity-60 pointer-events-none'>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>Header</h4>
          <OmStillingenHeader />
        </section>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>OmStillingen</h4>
          <OmStillingen printRef={dummyRef} />
        </section>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>Kontaktpersoner</h4>
          <Kontaktpersoner />
        </section>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>KandidatKnapper</h4>
          <KandidatKnapper />
        </section>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>StillingInkludering</h4>
          <StillingInkludering />
        </section>
      </div>
    </MockStillingsProvider>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
