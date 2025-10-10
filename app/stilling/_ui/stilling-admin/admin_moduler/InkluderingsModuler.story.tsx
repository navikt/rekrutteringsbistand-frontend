import Inkludering from './Inkludering';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inkluderingsrelaterte moduler (inert)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='space-y-10 opacity-60 pointer-events-none'>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Admin - Inkludering</h4>
        <Inkludering />
      </section>
      {/* StillingInkludering vises i OmStillingenElementer.story allerede */}
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
