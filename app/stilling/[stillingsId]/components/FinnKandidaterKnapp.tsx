import { useStillingsContext } from '../StillingsContext';
import { MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const FinnKandidaterKnapp: React.FC = () => {
  const router = useRouter();

  const { stillingsData } = useStillingsContext();
  return (
    <Button
      variant='tertiary'
      icon={<MagnifyingGlassIcon />}
      onClick={() =>
        router.push(
          `/stilling/${stillingsData?.stilling?.uuid}/finn-kandidater`,
        )
      }
    >
      Finn kandidater
    </Button>
  );
};

export default FinnKandidaterKnapp;
