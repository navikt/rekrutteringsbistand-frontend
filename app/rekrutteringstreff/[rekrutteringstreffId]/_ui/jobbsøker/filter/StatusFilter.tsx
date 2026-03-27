'use client';

import { useJobbsøkerFilterContext } from './JobbsøkerFilterContext';
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
  const { status, setStatus } = useJobbsøkerFilterContext();

  return (
    <CheckboxGroup legend='Status'>
      {Object.entries(statusLabels).map(([key, label]) => (
        <Checkbox
          key={key}
          value={key}
          checked={status.includes(key)}
          onChange={() => {
            if (status.includes(key)) {
              setStatus(status.filter((s) => s !== key));
            } else {
              setStatus([...status, key]);
            }
          }}
        >
          {label}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
