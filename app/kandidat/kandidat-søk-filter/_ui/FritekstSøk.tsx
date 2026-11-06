import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import { Search } from '@navikt/ds-react';
import { useState } from 'react';

export default function FritekstSøk() {
  const { setFritekst } = useKandidatSøkFilterContext();
  // Friteksten vises som chip. Feltet tømmes etter søk, så et lagret søk ikke kan få gammel tekst sendt på nytt.
  const [localFritekst, setLocalFritekst] = useState<string>('');

  const søk = () => {
    const trimmet = localFritekst.trim();
    if (!trimmet) return;
    setFritekst(trimmet);
    setLocalFritekst('');
  };

  return (
    <Search
      hideLabel={false}
      label='Søk etter jobbsøker (fnr/navn/CV-innhold)'
      placeholder='Søk'
      variant='secondary'
      size='small'
      onChange={(e) => setLocalFritekst(e)}
      value={localFritekst}
      onSearchClick={søk}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          søk();
        } else if (e.key === 'Escape') {
          setLocalFritekst('');
        }
      }}
    />
  );
}
