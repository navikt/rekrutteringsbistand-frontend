import KandidatHandlingerForStilling from './KandidatHandlingerForStilling';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const mockKandidat = {
  kandidatnr: 'PAM123456',
  fornavn: 'Test',
  etternavn: 'Kandidat',
  alder: 30,
  innsatsgruppe: 'STANDARD',
  hovedmål: 'SKAFFE_ARBEID',
};

// Duplisert (ryddes ved behov)
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none opacity-60'>
      <KandidatHandlingerForStilling kandidat={mockKandidat as any} />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
