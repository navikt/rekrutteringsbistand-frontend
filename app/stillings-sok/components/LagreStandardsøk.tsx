import { FloppydiskIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { setNyttStandardsøk } from '../../api/stilling/standardsok/settStandardsøk';
import { useUseBrukerStandardSøk } from '../../api/stilling/standardsok/useBrukersStandardsøk';

const LagreStandardsøk: React.FC = () => {
  const brukerStandardSøkData = useUseBrukerStandardSøk();
  const searchParams = useSearchParams();
  const searchString = new URLSearchParams(searchParams.toString()).toString();

  const brukerStandardSøk = searchString === brukerStandardSøkData.data?.søk;

  return (
    <Button
      className='whitespace-nowrap'
      disabled={brukerStandardSøk}
      variant='tertiary'
      aria-describedby='lagre-standardsok-beskrivelse'
      icon={<FloppydiskIcon />}
      size='small'
      onClick={async () => {
        await setNyttStandardsøk(searchString);
        await brukerStandardSøkData.mutate();
      }}
    >
      Lagre nytt standardsøk
    </Button>
  );
};

export default LagreStandardsøk;
