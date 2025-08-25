import { useKandidatContext } from '@/app/kandidat/vis-kandidat/KandidatContext';
import { useWindows } from '@/components/layout/windows/WindowWrapper';
import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useUmami } from '@/providers/UmamiContext';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

const FinnStillingForKandidatKnapp: React.FC = () => {
  const { kandidatId } = useKandidatContext();
  const { trackAndNavigate } = useUmami();

  const windows = useWindows();
  return (
    <Button
      size={'small'}
      variant='primary'
      onClick={() => {
        trackAndNavigate(
          UmamiEvent.Kandidat.finn_stilling_knapp,
          `/kandidat/${kandidatId}?finnStilling=true`,
        );
      }}
    >
      Finn stillinger
    </Button>
  );
};

export default FinnStillingForKandidatKnapp;
