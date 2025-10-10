import GråBoks from './GråBoks';
import KandidatOversiktDivider from './KandidatOversiktDivider';
import TidslinjeFelt from './TidslinjeFelt';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Layout / helper elementer.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='space-y-8 opacity-60 pointer-events-none'>
      <section className='space-y-4'>
        <h4 className='text-sm font-semibold'>TidslinjeFelt</h4>
        <TidslinjeFelt />
      </section>
      <section className='space-y-4'>
        <h4 className='text-sm font-semibold'>Divider</h4>
        <KandidatOversiktDivider />
      </section>
      <section className='space-y-4'>
        <h4 className='text-sm font-semibold'>GråBoks</h4>
        <GråBoks tittel='Demo tittel'>
          <div className='text-xs'>Innhold</div>
        </GråBoks>
      </section>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
