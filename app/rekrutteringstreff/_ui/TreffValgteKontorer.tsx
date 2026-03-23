'use client';

import { useRekrutteringstreffSøkFilter } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffSøkContext';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import { useEffect, useMemo, useState } from 'react';

type KontorOption = { label: string; value: string };

export default function TreffValgteKontorer() {
  const [søkeTekst, setSøkeTekst] = useState('');
  const [kontorOptions, setKontorOptions] = useState<KontorOption[]>([]);
  const { kontorer, setKontorer } = useRekrutteringstreffSøkFilter();

  useEffect(() => {
    let mounted = true;
    import('@/components/layout/modiadekoratør/enheter.json').then((mod) => {
      if (!mounted) return;
      const data = (mod.default ?? mod) as { navn: string; enhetId: string }[];
      setKontorOptions(data.map((k) => ({ label: k.navn, value: k.enhetId })));
    });
    return () => {
      mounted = false;
    };
  }, []);

  const filtrerteOptions = useMemo(() => {
    if (!søkeTekst.trim()) return kontorOptions;
    const lower = søkeTekst.toLowerCase();
    return kontorOptions.filter(
      (k) => k.label.toLowerCase().includes(lower) || k.value.includes(lower),
    );
  }, [søkeTekst, kontorOptions]);

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
