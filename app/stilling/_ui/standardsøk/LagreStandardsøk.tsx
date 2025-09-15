import { byggStandardsokQuery } from './standardSokUtils';
import { setNyttStandardsøk } from '@/app/api/stilling/standardsok/settStandardsøk';
import { useUseBrukerStandardSøk } from '@/app/api/stilling/standardsok/useBrukersStandardsøk';
import { useVisKandidatNr } from '@/app/kandidat/vis-kandidat/useVisKandidatNr';
import { Chips } from '@navikt/ds-react';
import { useSearchParams } from 'next/navigation';

export default function LagreStandardsøk() {
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
    <Chips.Toggle
      // variant='tertiary'
      // aria-describedby='lagre-standardsok-beskrivelse'
      checkmark={false}
      variant='neutral'
      onClick={async () => {
        await setNyttStandardsøk(searchString);
        await brukerStandardSøkData.mutate();
      }}
    >
      Lagre som standardsøk
    </Chips.Toggle>
  );
}
