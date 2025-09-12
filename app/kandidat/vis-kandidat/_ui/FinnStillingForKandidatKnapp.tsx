import { useKandidatContext } from '@/app/kandidat/vis-kandidat/KandidatContext';
import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useUmami } from '@/providers/UmamiContext';
import { Button } from '@navikt/ds-react';
import { FC } from 'react';

const FinnStillingForKandidatKnapp: FC = () => {
  const { kandidatId } = useKandidatContext();
  const { trackAndNavigate } = useUmami();

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
