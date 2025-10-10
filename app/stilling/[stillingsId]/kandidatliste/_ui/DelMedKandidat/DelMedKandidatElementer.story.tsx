import DelMedKandidatModal from './DelMedKandidatModal';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const mockKandidater = [
  {
    kandidatnr: 'PAM123456',
    fornavn: 'Test',
    etternavn: 'Kandidat',
    alder: 30,
    innsatsgruppe: 'STANDARD',
    hovedmål: 'SKAFFE_ARBEID',
  },
];

// Duplisert (ryddes ved behov)
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      <DelMedKandidatModal
        markerteKandidater={mockKandidater as any}
        fjernAllMarkering={() => {}}
      />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
