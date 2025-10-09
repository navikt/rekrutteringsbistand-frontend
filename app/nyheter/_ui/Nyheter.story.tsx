import EndreNyhetModal from './EndreNyhetModal';
import LegacyNyheter from './LegacyNyheter';
import NyhetVisning from './NyhetVisning';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const mockNyhet: any = {
  id: '1',
  tittel: 'Demo nyhet',
  tekst: 'Dette er en kort nyhetsmelding for story-visning.',
  opprettetAv: 'X123456',
  opprettetTidspunkt: new Date().toISOString(),
};

// Nyheter-relaterte komponenter (inert)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='space-y-10 opacity-60 pointer-events-none'>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>NyhetVisning</h4>
        <NyhetVisning nyhet={mockNyhet} refetch={() => {}} />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>LegacyNyheter</h4>
        <LegacyNyheter />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>EndreNyhetModal</h4>
        <EndreNyhetModal refetch={() => {}} />
      </section>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
