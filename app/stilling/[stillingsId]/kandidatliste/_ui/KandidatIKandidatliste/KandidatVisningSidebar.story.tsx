import KandidatVisningSidebar from './KandidatIKandidatliste';
import { MockStillingsProvider } from '@/.storybook/mocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Sidebar for kandidatvisning i stilling (inert)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <MockStillingsProvider>
      <div className='grid md:grid-cols-2 gap-8 opacity-60 pointer-events-none'>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>KandidatVisningSidebar</h4>
          <KandidatVisningSidebar kandidatlisteKandidat='kandidat-1' />
        </section>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>
            KandidatHandlingerForStilling
          </h4>
          {/* Direkte bruk krever kandidat prop; lar stå uten for inert visning */}
        </section>
      </div>
    </MockStillingsProvider>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
