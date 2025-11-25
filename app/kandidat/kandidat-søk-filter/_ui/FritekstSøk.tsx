import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import { Search } from '@navikt/ds-react';
import { useState } from 'react';

export default function FritekstSøk() {
  const { fritekst, setFritekst } = useKandidatSøkFilterContext();
  const [localFritekst, setLocalFritekst] = useState<string>(fritekst);

  return (
    <Search
      hideLabel
      label='Søk'
      placeholder='Søk'
      variant='secondary'
      size='small'
      onChange={(e) => setLocalFritekst(e)}
      value={localFritekst}
      onSearchClick={() => setFritekst(localFritekst)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          setFritekst(localFritekst);
          setLocalFritekst('');
        } else if (e.key === 'Escape') {
          setLocalFritekst('');
        }
      }}
    />
  );
}
