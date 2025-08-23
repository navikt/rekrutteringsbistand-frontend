import { useKandidatContext } from '@/app/kandidat/vis-kandidat/KandidatContext';
import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useUmami } from '@/providers/UmamiContext';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

const FinnStillingForKandidatKnapp: React.FC = () => {
  const { kandidatId } = useKandidatContext();
  const { trackAndNavigate } = useUmami();

  return (
    <Button
      size={'small'}
      variant='primary'
      onClick={() => {
        trackAndNavigate(
          UmamiEvent.Kandidat.finn_stilling_knapp,
          `/stilling?visKandidatnr=${kandidatId}`,
        );
      }}
    >
      Finn stillinger
    </Button>
  );
};

export default FinnStillingForKandidatKnapp;
