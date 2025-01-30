import { Button } from '@navikt/ds-react';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useUseBrukerStandardSøk } from '../../api/stilling/standardsok/useBrukersStandardsøk';

const StandardsøkKnapp: React.FC = () => {
  const searchParams = useSearchParams();
  const searchString = new URLSearchParams(searchParams.toString()).toString();

  const brukerStandardSøkData = useUseBrukerStandardSøk();

  const brukerStandardSøk = searchString === brukerStandardSøkData.data?.søk;

  return (
    <React.Fragment>
      <Button
        disabled={brukerStandardSøk}
        variant='secondary'
        className='w-full'
        onClick={() => {
          window.history.pushState(
            {},
            '',
            `${window.location.pathname}?brukStandardsok=true`,
          );
        }}
      >
        Bruk mitt standardsøk
      </Button>
    </React.Fragment>
  );
};

export default StandardsøkKnapp;
