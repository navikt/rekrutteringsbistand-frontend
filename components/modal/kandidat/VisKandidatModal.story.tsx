import VisKandidatModal from '@/components/modal/kandidat/VisKandidatModal';
import { KandidatMockProvider } from '@/storybook/mocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert forhåndsvisning for kandidat.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <KandidatMockProvider>
      <div className='opacity-60 pointer-events-none'>
        <VisKandidatModal
          tittel={'Tittel input for modal'}
          kandidatNr='kandidat-arenaKandidatnr-1'
          onClose={() => {}}
        />
      </div>
    </KandidatMockProvider>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {};
