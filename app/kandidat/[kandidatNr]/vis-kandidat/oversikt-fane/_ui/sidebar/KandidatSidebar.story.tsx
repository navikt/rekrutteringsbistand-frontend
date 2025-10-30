import KandidatOversiktSidebar from './KandidatOversiktSidebar';
import Profilkvalitet from './Profilkvalitet';
import SisteAktivitet from './SisteAktivitet';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert sidebar elementer.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='grid md:grid-cols-3 gap-6 opacity-60 pointer-events-none'>
      <div className='space-y-2'>
        <h4 className='text-sm font-semibold'>Sidebar (kompositt)</h4>
        <KandidatOversiktSidebar />
      </div>
      <div className='space-y-2'>
        <h4 className='text-sm font-semibold'>Siste aktivitet</h4>
        <SisteAktivitet />
      </div>
      <div className='space-y-2'>
        <h4 className='text-sm font-semibold'>Profilkvalitet</h4>
        <Profilkvalitet />
      </div>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
