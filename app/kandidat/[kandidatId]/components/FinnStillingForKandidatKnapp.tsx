import { useKandidatContext } from '../KandidatContext';
import { Button } from '@navikt/ds-react';
import Link from 'next/link';
import * as React from 'react';

export interface FinnStillingForKandidatKnappProps {
  sidebar?: boolean;
}

const FinnStillingForKandidatKnapp: React.FC<
  FinnStillingForKandidatKnappProps
> = ({ sidebar }) => {
  const { kandidatId } = useKandidatContext();
  return (
    <Link href={`/kandidat/${kandidatId}/forslag-til-stilling`}>
      <Button
        size={sidebar ? 'small' : 'medium'}
        variant='primary'
        //   onClick={() => {
        // trackAndNavigate(
        //   UmamiEvent.Stilling.finn_stilling_knapp,
        //   `/stilling/${stillingsData?.stilling?.uuid}/finn-kandidater`,
        // );
        //   }}
      >
        Finn stillinger
      </Button>
    </Link>
  );
};

export default FinnStillingForKandidatKnapp;
