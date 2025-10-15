import VisKandidatModal from '@/components/modal/kandidat/VisKandidatModal';
import { KandidatMockProvider } from '@/storybook/mocks';
import { Button } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

// Inert forhåndsvisning for kandidat.

const meta = {
  tags: ['autodocs'],
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <KandidatMockProvider>
        <div style={{ padding: '1rem' }}>
          <Button onClick={() => setOpen(true)}>Vis jobbsøker modal</Button>
          {open && (
            <VisKandidatModal
              tittel={'Tittel input for modal'}
              kandidatNr='kandidat-arenaKandidatnr-1'
              onClose={() => setOpen(false)}
            />
          )}
        </div>
      </KandidatMockProvider>
    );
  },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {};
