'use client';

import { useRekrutteringstreffSøkFilter } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffSøkContext';
import navkontorer from '@/components/layout/modiadekoratør/enheter.json';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import { useMemo, useState } from 'react';

const kontorOptions = navkontorer.map((k) => ({
  label: k.navn,
  value: k.enhetId,
}));

export default function TreffValgteKontorer() {
  const [søkeTekst, setSøkeTekst] = useState('');
  const { kontorer, setKontorer } = useRekrutteringstreffSøkFilter();

  const filtrerteOptions = useMemo(() => {
    if (!søkeTekst.trim()) return kontorOptions;
    const lower = søkeTekst.toLowerCase();
    return kontorOptions.filter(
      (k) => k.label.toLowerCase().includes(lower) || k.value.includes(lower),
    );
  }, [søkeTekst]);

  const selectedOptions = kontorer
    .map((id) => kontorOptions.find((k) => k.value === id)?.label)
    .filter(Boolean) as string[];

  const onToggleSelected = (option: string, isSelected: boolean) => {
    const enhetId = kontorOptions.find((k) => k.label === option)?.value;
    if (!enhetId) return;

    if (isSelected) {
      setKontorer([...kontorer, enhetId]);
    } else {
      setKontorer(kontorer.filter((k) => k !== enhetId));
    }
  };

  return (
    <div className='mt-2'>
      <UNSAFE_Combobox
        selectedOptions={selectedOptions}
        onToggleSelected={onToggleSelected}
        onChange={(val) => setSøkeTekst(val)}
        value={søkeTekst}
        label='Velg kontorer'
        options={filtrerteOptions.map((k) => k.label)}
        isMultiSelect
        shouldAutocomplete
      />
    </div>
  );
}
