import NyhetVisning from './NyhetVisning';
import type { NyheterDTO } from '@/app/api/bruker/nyheter/[...slug]/nyhet-admin';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const mockNyhet: NyheterDTO = {
  nyhetId: '1ed48a35-a978-43d1-baca-34a6a1f48e80',
  tittel: 'Ny funksjonalitet for kandidatsøk',
  innhold:
    'Vi har lansert forbedret søkefunksjonalitet som gjør det enklere å finne relevante kandidater. Søket støtter nå flere filtre og gir bedre resultater.',
  opprettetDato: new Date().toISOString(),
};

// Duplisert
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      <NyhetVisning nyhet={mockNyhet} refetch={() => {}} />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
