import { byggStandardsokQuery } from './standardSokUtils';
import { setNyttStandardsøk } from '@/app/api/stilling/standardsok/settStandardsøk';
import { useUseBrukerStandardSøk } from '@/app/api/stilling/standardsok/useBrukersStandardsøk';
import { FloppydiskIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
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

  const disabled =
    brukerStandardSøk ||
    searchString.length === 0 ||
    Boolean(visKandidatnr) ||
    harKunPortefolje;

  return (
    <Button
      variant='tertiary'
      disabled={disabled}
      icon={<FloppydiskIcon />}
      onClick={async () => {
        await setNyttStandardsøk(searchString);
        await brukerStandardSøkData.mutate();
      }}
    />
  );
}
