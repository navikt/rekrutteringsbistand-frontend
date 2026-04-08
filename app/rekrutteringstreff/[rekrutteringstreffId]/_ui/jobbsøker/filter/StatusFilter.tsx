'use client';

import { useJobbsøkerSøkContext } from './JobbsøkerSøkContext';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

const statusLabels: Record<string, string> = {
  [JobbsøkerStatus.LAGT_TIL]: 'Lagt til',
  [JobbsøkerStatus.INVITERT]: 'Invitert',
  [JobbsøkerStatus.SVART_JA]: 'Svart ja',
  [JobbsøkerStatus.SVART_NEI]: 'Svart nei',
};

export const statusLabelMap = (verdi: string): string =>
  statusLabels[verdi] ?? verdi;

export default function StatusFilter() {
  const { status, setStatus } = useJobbsøkerSøkContext();

  return (
    <CheckboxGroup legend='Status' value={status} onChange={setStatus}>
      {Object.entries(statusLabels).map(([key, label]) => (
        <Checkbox key={key} value={key}>
          {label}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
