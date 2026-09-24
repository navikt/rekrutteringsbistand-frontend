'use client';

import { useJobbsøkerSøkContext } from './JobbsøkerSøkContext';
import { hentNavkontorNavn } from '@/util/navkontorMapping';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

export const kontorLabelMap = (verdi: string): string =>
  hentNavkontorNavn(verdi);

interface KontorFilterProps {
  antallPerKontor?: Record<string, number>;
}

export default function KontorFilter({ antallPerKontor }: KontorFilterProps) {
  const { kontornummer, setKontornummer } = useJobbsøkerSøkContext();

  const kontornumre = Array.from(
    new Set([...Object.keys(antallPerKontor ?? {}), ...kontornummer]),
  ).sort((a, b) => kontorLabelMap(a).localeCompare(kontorLabelMap(b), 'nb'));

  return (
    <CheckboxGroup
      legend='Kontor'
      value={kontornummer}
      onChange={setKontornummer}
    >
      <div className='max-h-72 overflow-y-auto pr-2'>
        {kontornumre.map((nummer) => {
          const antall = antallPerKontor
            ? (antallPerKontor[nummer] ?? 0)
            : undefined;
          const label = kontorLabelMap(nummer);
          return (
            <Checkbox key={nummer} value={nummer}>
              {antall !== undefined ? `${label} (${antall})` : label}
            </Checkbox>
          );
        })}
      </div>
    </CheckboxGroup>
  );
}
