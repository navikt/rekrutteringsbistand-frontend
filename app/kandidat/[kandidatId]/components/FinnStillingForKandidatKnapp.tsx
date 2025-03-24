import { useKandidatContext } from '../KandidatContext';
import { MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import Link from 'next/link';
import * as React from 'react';

const FinnStillingForKandidatKnapp: React.FC = () => {
  const { kandidatId } = useKandidatContext();
  return (
    <Link href={`/kandidat/${kandidatId}/forslag-til-stilling`}>
      <Button
        variant='tertiary'
        icon={<MagnifyingGlassIcon />}
        //   onClick={() => {
        // trackAndNavigate(
        //   UmamiEvent.Stilling.finn_stilling_knapp,
        //   `/stilling/${stillingsData?.stilling?.uuid}/finn-kandidater`,
        // );
        //   }}
      >
        Finn stilling
      </Button>
    </Link>
  );
};

export default FinnStillingForKandidatKnapp;
