import KandidatFørerkort from './KandidatFørerkort';
import KandidatKurs from './KandidatKurs';
import KandidatØnsker from './KandidatØnsker';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Diverse mindre seksjoner (inert)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='grid md:grid-cols-3 gap-8 opacity-60 pointer-events-none'>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Kurs</h4>
        <KandidatKurs />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Ønsker</h4>
        <KandidatØnsker />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Førerkort</h4>
        <KandidatFørerkort />
      </section>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
