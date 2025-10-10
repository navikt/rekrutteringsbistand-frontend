import LagreStandardsøk from './LagreStandardsøk';
import MittStandardsøk from './MittStandardsøk';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert standardsøk-komponenter.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='space-y-8 opacity-60 pointer-events-none'>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>MittStandardsøk</h4>
        <MittStandardsøk />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>LagreStandardsøk</h4>
        <LagreStandardsøk />
      </section>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
