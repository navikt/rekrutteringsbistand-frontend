import { withStillingsKandidatliste } from '@/.storybook/ContextDecorators';
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
              stillingsId='stilling-12345'
              kandidatId='kandidat-arenaKandidatnr-1'
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

export const VisJobbsøkerForStilling: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <KandidatMockProvider>
        <div style={{ padding: '1rem' }}>
          <Button onClick={() => setOpen(true)}>
            Vis jobbsøker modal (med stillingsid)
          </Button>
          {open && (
            <VisKandidatModal
              tittel='Jobbsøker for stillingsoppdrag'
              kandidatId='kandidat-arenaKandidatnr-2'
              stillingsId='stilling-12345'
              onClose={() => setOpen(false)}
            />
          )}
        </div>
      </KandidatMockProvider>
    );
  },
};

export const Vis_jobbsøker_i_kandidatliste: Story = {
  render: () =>
    withStillingsKandidatliste(() => {
      const [open, setOpen] = useState(false);
      return (
        <KandidatMockProvider>
          <div style={{ padding: '1rem' }}>
            <Button onClick={() => setOpen(true)}>
              Vis jobbsøker modal i kandidatliste (med stillingsid)
            </Button>
            {open && (
              <VisKandidatModal
                forKandidatliste='kandidatlisteId'
                tittel='Jobbsøker i liste'
                kandidatId='kandidat-arenaKandidatnr-2'
                stillingsId='stilling-12345'
                onClose={() => setOpen(false)}
              />
            )}
          </div>
        </KandidatMockProvider>
      );
    }),
};
