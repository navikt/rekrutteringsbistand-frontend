import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useUmami } from '@/providers/UmamiContext';
import { MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

export interface FinnKandidaterKnappProps {
  stillingId: string;
}

const FinnKandidaterKnapp: React.FC<FinnKandidaterKnappProps> = ({
  stillingId,
}) => {
  const { trackAndNavigate } = useUmami();
  return (
    <Button
      variant='primary'
      size='small'
      icon={<MagnifyingGlassIcon />}
      onClick={() => {
        trackAndNavigate(
          UmamiEvent.Stilling.finn_kandidater_knapp,
          `/stilling/${stillingId}?finnKandidater=true`,
        );
      }}
    >
      Finn kandidater
    </Button>
  );
};

export default FinnKandidaterKnapp;
