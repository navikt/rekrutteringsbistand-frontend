import { UmamiEvent } from '../../../../util/umamiEvents';
import { useUmami } from '../../../providers/UmamiContext';
import { useStillingsContext } from '../StillingsContext';
import { MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

const FinnKandidaterKnapp: React.FC = () => {
  const { trackAndNavigate } = useUmami();
  const { stillingsData } = useStillingsContext();
  return (
    <Button
      variant='primary'
      size='small'
      icon={<MagnifyingGlassIcon />}
      onClick={() => {
        trackAndNavigate(
          UmamiEvent.Stilling.finn_kandidater_knapp,
          `/stilling/${stillingsData?.stilling?.uuid}/finn-kandidater`,
        );
      }}
    >
      Finn kandidater
    </Button>
  );
};

export default FinnKandidaterKnapp;
