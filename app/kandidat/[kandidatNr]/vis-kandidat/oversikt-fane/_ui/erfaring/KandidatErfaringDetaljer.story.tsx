import Detaljer from './Detaljer';
import Erfaring from './Erfaring';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert erfaring & detaljer.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='space-y-8 opacity-60 pointer-events-none max-w-3xl'>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Erfaring</h4>
        <Erfaring />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Detaljer</h4>
        <Detaljer>
          <div className='text-xs'>Placeholder innhold</div>
        </Detaljer>
      </section>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
