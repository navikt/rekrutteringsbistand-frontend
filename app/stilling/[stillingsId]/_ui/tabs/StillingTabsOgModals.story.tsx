import SlettOppdragModal from './SlettOppdragModal';
import StillingDropdown from './StillingDropdown';
import StillingTabs from './StillingTabs';
import TabKnapper from './TabKnapper';
import { MockStillingsProvider, dummyRef } from '@/storybook/mocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert oversikt over tabs / modaler.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <MockStillingsProvider>
      <div className='space-y-10 opacity-60 pointer-events-none'>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>Tabs</h4>
          <StillingTabs />
        </section>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>Tab knapper</h4>
          <TabKnapper printRef={dummyRef} />
        </section>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>Dropdown</h4>
          <StillingDropdown />
        </section>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>SlettOppdragModal</h4>
          <SlettOppdragModal setVisModal={() => {}} />
        </section>
      </div>
    </MockStillingsProvider>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
