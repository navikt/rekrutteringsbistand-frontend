import VisStillingModal from '@/components/modal/stilling/VisStillingModal';
import { Button } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useQueryState } from 'nuqs';
import React, { useEffect } from 'react';

// Storyene styrer åpning via søkeparameteren 'visStillingsId'.
const meta: Meta = {
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

// Scoped rendering slik at bare modal med riktig stillingsId vises.
const ScopedVisStillingModal: React.FC<{
  expectedId: string;
  kandidatId?: string;
}> = ({ expectedId, kandidatId }) => {
  const [id] = useQueryState('visStillingsId', {
    defaultValue: '',
    clearOnDefault: true,
  });
  if (id !== expectedId) return null;
  return <VisStillingModal kandidatId={kandidatId} />;
};

const Launcher: React.FC<{
  stillingsId: string;
  label: string;
  kandidatId?: string;
}> = ({ stillingsId, label, kandidatId }) => {
  const [id, setId] = useQueryState('visStillingsId', {
    defaultValue: '',
    clearOnDefault: true,
  });
  // Nullstill ved mount slik at forrige story ikke påvirker.
  useEffect(() => {
    if (id) setId('', { history: 'replace' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{ padding: '1rem' }}>
      <Button onClick={() => setId(stillingsId)}>{label}</Button>
      <ScopedVisStillingModal
        expectedId={stillingsId}
        kandidatId={kandidatId}
      />
    </div>
  );
};

export const FinnStillingForKandidatModal: Story = {
  render: () => (
    <Launcher
      stillingsId='minStilling'
      kandidatId='kandidat-123'
      label='Vis stilling modal (med kandidatId)'
    />
  ),
};

export const FinnStillingUtenKandidat: Story = {
  render: () => (
    <Launcher
      stillingsId='minStilling-2'
      label='Vis stilling modal (uten kandidat)'
    />
  ),
};
