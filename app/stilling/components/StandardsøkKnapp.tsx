import { useUseBrukerStandardSøk } from '../../api/stilling/standardsok/useBrukersStandardsøk';
import { Button } from '@navikt/ds-react';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

const StandardsøkKnapp: React.FC = () => {
  const searchParams = useSearchParams();
  const searchString = new URLSearchParams(searchParams.toString()).toString();

  const brukerStandardSøkData = useUseBrukerStandardSøk();

  const brukerStandardSøk = searchString === brukerStandardSøkData.data?.søk;

  return (
    <Button
      disabled={brukerStandardSøk}
      variant='tertiary'
      size='small'
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
  );
};

export default StandardsøkKnapp;
