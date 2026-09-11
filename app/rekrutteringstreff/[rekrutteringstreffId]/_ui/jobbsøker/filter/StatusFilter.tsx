'use client';

import { useJobbsøkerSøkContext } from './JobbsøkerSøkContext';
import { useTreffgjennomføring } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

const statusLabels: Record<string, string> = {
  [JobbsøkerStatus.LAGT_TIL]: 'Lagt til',
  [JobbsøkerStatus.INVITERT]: 'Invitert',
  [JobbsøkerStatus.SVART_JA]: 'Svart ja',
  [JobbsøkerStatus.SVART_NEI]: 'Svart nei',
  [JobbsøkerStatus.MØTT_OPP]: 'Møtt opp',
  [JobbsøkerStatus.FÅTT_JOBB]: 'Fått jobb',
};

export const statusLabelMap = (verdi: string): string =>
  statusLabels[verdi] ?? verdi;

interface StatusFilterProps {
  antallPerStatus?: Record<string, number>;
}

export default function StatusFilter({ antallPerStatus }: StatusFilterProps) {
  const { status, setStatus } = useJobbsøkerSøkContext();
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treffgjennomføring } =
    useTreffgjennomføring(rekrutteringstreffId);

  const visMøttOpp = treffgjennomføring !== undefined;

  return (
    <CheckboxGroup legend='Status' value={status} onChange={setStatus}>
      {Object.entries(statusLabels)
        .filter(([key]) => key !== JobbsøkerStatus.MØTT_OPP || visMøttOpp)
        .map(([key, label]) => {
          const antall = antallPerStatus
            ? (antallPerStatus[key] ?? 0)
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
