'use client';

import { useJobbsøkerSøkContext } from './JobbsøkerSøkContext';
import { Aldersgruppe } from '@/app/rekrutteringstreff/_types/constants';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

const aldersgruppeLabels: Record<string, string> = {
  [Aldersgruppe.UNDER_30]: 'Under 30',
  [Aldersgruppe.OVER_30]: 'Over 30',
};

export const aldersgruppeLabelMap = (verdi: string): string =>
  aldersgruppeLabels[verdi] ?? verdi;

interface AlderFilterProps {
  antallPerAldersgruppe?: Record<string, number>;
}

export default function AldersgruppeFilter({
  antallPerAldersgruppe,
}: AlderFilterProps) {
  const { aldersgruppe, setAldersgruppe } = useJobbsøkerSøkContext();

  return (
    <CheckboxGroup
      legend='Aldersgruppe'
      value={aldersgruppe}
      onChange={setAldersgruppe}
    >
      {Object.entries(aldersgruppeLabels).map(([key, label]) => {
        const antall = antallPerAldersgruppe
          ? (antallPerAldersgruppe[key] ?? 0)
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
