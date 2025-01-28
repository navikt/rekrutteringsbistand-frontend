import { Button } from '@navikt/ds-react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import {
  setNyttStandardsøk,
  useUseBrukerStandardSøk,
} from '../../api/stilling/standardsok/useBrukersStandardsøk';

const StandardsøkKnapp: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchString = new URLSearchParams(searchParams.toString()).toString();

  const brukerStandardSøkData = useUseBrukerStandardSøk();

  const brukerStandardSøk = searchString === brukerStandardSøkData.data?.søk;

  return (
    <React.Fragment>
      <Button
        variant='secondary'
        className='w-full'
        onClick={() => {
          router.replace('?brukStandardsok=true', { scroll: false });
        }}
      >
        Bruk mitt standardsøk
      </Button>
      <Button
        disabled={brukerStandardSøk}
        variant='tertiary'
        onClick={() => {
          setNyttStandardsøk('test');
        }}
      >
        Lagre nytt standardsøk
      </Button>
    </React.Fragment>
  );
};

export default StandardsøkKnapp;
