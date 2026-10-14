'use client';

import { useJobbsøkerSøkContext } from './JobbsøkerSøkContext';
import { AktuellForTreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

const aktuellForTreffStatusLabels: Record<string, string> = {
  [AktuellForTreffStatus.VURDERES]: 'Vurderes',
  [AktuellForTreffStatus.KONTAKTET]: 'Kontaktet',
  [AktuellForTreffStatus.AKTUELL]: 'Aktuell',
  [AktuellForTreffStatus.IKKE_AKTUELL]: 'Ikke aktuell',
};

export const aktuellForTreffStatusLabelMap = (verdi: string): string =>
  aktuellForTreffStatusLabels[verdi] ?? verdi;

interface AktuellForTreffStatusFilterProps {
  antallPerAktuellForTreffStatus?: Record<string, number>;
}

export default function AktuellForTreffStatusFilter({
  antallPerAktuellForTreffStatus,
}: AktuellForTreffStatusFilterProps) {
  const { aktuellForTreffStatus, setAktuellForTreffStatus } =
    useJobbsøkerSøkContext();

  return (
    <CheckboxGroup
      legend='Intern status'
      value={aktuellForTreffStatus}
      onChange={setAktuellForTreffStatus}
    >
      {Object.entries(aktuellForTreffStatusLabels).map(([key, label]) => {
        const antall = antallPerAktuellForTreffStatus
          ? (antallPerAktuellForTreffStatus[key] ?? 0)
          : undefined;
        return (
          <Checkbox key={key} value={key}>
            {antall !== undefined ? `${label} (${antall})` : label}
          </Checkbox>
        );
      })}
    </CheckboxGroup>
  );
}
