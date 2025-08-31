import { setNyttStandardsøk } from '@/app/api/stilling/standardsok/settStandardsøk';
import { useUseBrukerStandardSøk } from '@/app/api/stilling/standardsok/useBrukersStandardsøk';
import { useVisKandidatNr } from '@/app/kandidat/vis-kandidat/useVisKandidatNr';
import { FloppydiskIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useMemo } from 'react';

const LagreStandardsøk: React.FC = () => {
  const brukerStandardSøkData = useUseBrukerStandardSøk();
  const searchParams = useSearchParams();

  // Keys that should NOT be persisted as en del av standardsøk.
  const ekskluderteParametere = useMemo(
    () => new Set<string>(['utenOppdrag', 'visStillingId', 'finnKandidater']),
    [],
  );

  const filteredParams = new URLSearchParams();
  searchParams.forEach((value, key) => {
    if (!ekskluderteParametere.has(key)) {
      filteredParams.append(key, value);
    }
  });

  const searchString = filteredParams.toString();
  const [visKandidatnr] = useVisKandidatNr();
  const brukerStandardSøk = searchString === brukerStandardSøkData.data?.søk;

  const urlParams = new URLSearchParams(searchString);
  const harKunPortefolje = urlParams.size === 1 && urlParams.has('portefolje');

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
