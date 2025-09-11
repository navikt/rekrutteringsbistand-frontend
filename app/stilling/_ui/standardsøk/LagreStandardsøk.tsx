import { byggStandardsokQuery } from './standardSokUtils';
import { setNyttStandardsøk } from '@/app/api/stilling/standardsok/settStandardsøk';
import { useUseBrukerStandardSøk } from '@/app/api/stilling/standardsok/useBrukersStandardsøk';
import { useVisKandidatNr } from '@/app/kandidat/vis-kandidat/useVisKandidatNr';
import { FloppydiskIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

const LagreStandardsøk: React.FC = () => {
  const brukerStandardSøkData = useUseBrukerStandardSøk();
  const searchParams = useSearchParams();

  const { query: searchString, harKunPortefolje } =
    byggStandardsokQuery(searchParams);
  const [visKandidatnr] = useVisKandidatNr();
  const brukerStandardSøk = searchString === brukerStandardSøkData.data?.søk;

  if (
    brukerStandardSøk ||
    searchString.length === 0 ||
    visKandidatnr ||
    harKunPortefolje
  ) {
    return null;
  }

  return (
    <Button
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
