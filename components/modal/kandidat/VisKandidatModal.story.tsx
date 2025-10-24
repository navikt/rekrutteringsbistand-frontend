import { withStillingsKandidatliste } from '@/.storybook/ContextDecorators';
import { KandidatMockProvider } from '@/.storybook/mocks';
import VisKandidatModal from '@/components/modal/kandidat/VisKandidatModal';
import { Button } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useQueryState } from 'nuqs';
import React, { useEffect } from 'react';

// Meta uten global render – hver story kontrollerer selv.
const meta: Meta = {
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

/**
 * Wrapper som sørger for at modal bare rendres når query-param matcher forventet kandidatId.
 * Dermed åpner ikke alle stories samtidig i Docs når visKandidatId settes.
 */
const ScopedVisKandidatModal: React.FC<{
  expectedId: string;
  tittel: string;
  stillingsId?: string;
  forKandidatliste?: string;
}> = ({ expectedId, tittel, stillingsId, forKandidatliste }) => {
  const [id] = useQueryState('visKandidatId', {
    defaultValue: '',
    clearOnDefault: true,
  });
  if (id !== expectedId) return null;
  return (
    <VisKandidatModal
      tittel={tittel}
      stillingsId={stillingsId}
      forKandidatliste={forKandidatliste}
    />
  );
};

/**
 * Felles launcher: nullstiller param ved mount slik at state ikke lekker mellom stories.
 */
const Launcher: React.FC<{
  kandidatId: string;
  label: string;
  tittel: string;
  stillingsId?: string;
  forKandidatliste?: string;
}> = ({ kandidatId, label, tittel, stillingsId, forKandidatliste }) => {
  const [id, setId] = useQueryState('visKandidatId', {
    defaultValue: '',
    clearOnDefault: true,
  });

  // Nullstill ved mount så tidligere story ikke påvirker.
  useEffect(() => {
    if (id) {
      setId('', { history: 'replace' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <KandidatMockProvider>
      <div style={{ padding: '1rem' }}>
        <Button onClick={() => setId(kandidatId)}>{label}</Button>
        <ScopedVisKandidatModal
          expectedId={kandidatId}
          tittel={tittel}
          stillingsId={stillingsId}
          forKandidatliste={forKandidatliste}
        />
      </div>
    </KandidatMockProvider>
  );
};

export const VisKandidat: Story = {
  render: () => (
    <Launcher
      kandidatId='kandidat-arenaKandidatnr-1'
      label='Vis jobbsøker modal'
      tittel='Tittel input for modal'
    />
  ),
};

export const VisJobbsøkerForStilling: Story = {
  render: () => (
    <Launcher
      kandidatId='kandidat-arenaKandidatnr-2'
      label='Vis jobbsøker modal (med stillingsid)'
      tittel='Jobbsøker for stillingsoppdrag'
      stillingsId='stilling-12345'
    />
  ),
};

export const Vis_jobbsøker_i_kandidatliste: Story = {
  render: () =>
    withStillingsKandidatliste(() => (
      <Launcher
        kandidatId='kandidat-arenaKandidatnr-3'
        label='Vis jobbsøker modal i kandidatliste (med stillingsid)'
        tittel='Jobbsøker i liste'
        stillingsId='stilling-12345'
        forKandidatliste='kandidatlisteId'
      />
    )),
};

// Nå åpner bare den storyen du klikker i – selv i Docs visning.
