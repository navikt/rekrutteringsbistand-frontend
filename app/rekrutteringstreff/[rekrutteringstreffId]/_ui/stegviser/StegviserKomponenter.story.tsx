import Stegviser from './Stegviser';
import StegviserHeader from './StegviserHeader';
import PublisereSteg from './steg/PublisereSteg';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Stegviser er tungt knyttet til context + API. Vi viser en inert samling.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='space-y-8 opacity-60 pointer-events-none'>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Header</h4>
        <StegviserHeader erIForhåndsvisning={false} />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Publisere steg</h4>
        <PublisereSteg />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Full stegviser</h4>
        <Stegviser erIForhåndsvisning={false} />
      </section>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
