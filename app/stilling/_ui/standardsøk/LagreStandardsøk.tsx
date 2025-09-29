import { byggStandardsokQuery } from './standardSokUtils';
import { setNyttStandardsøk } from '@/app/api/stilling/standardsok/settStandardsøk';
import { useUseBrukerStandardSøk } from '@/app/api/stilling/standardsok/useBrukersStandardsøk';
import { Chips } from '@navikt/ds-react';
import { useSearchParams } from 'next/navigation';
import { useQueryState } from 'nuqs';

export default function LagreStandardsøk() {
  const brukerStandardSøkData = useUseBrukerStandardSøk();
  const searchParams = useSearchParams();

  const { query: searchString, harKunPortefolje } =
    byggStandardsokQuery(searchParams);

  const [visKandidatnr] = useQueryState('visKandidatnr', {
    defaultValue: '',
    clearOnDefault: true,
  });

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
