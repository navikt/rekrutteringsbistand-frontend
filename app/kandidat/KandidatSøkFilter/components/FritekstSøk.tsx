import { useKandidatSøkFilterContext } from '../../KandidaSokFilterContext';
import { Search } from '@navikt/ds-react';
import * as React from 'react';

const FritekstSøk: React.FC = () => {
  const { fritekst, setFritekst } = useKandidatSøkFilterContext();
  const [localFritekst, setLocalFritekst] = React.useState<string>(fritekst);

  return (
    <Search
      hideLabel
      label='Søk etter kandidat'
      placeholder='Søk etter kandidat'
      variant='secondary'
      size='small'
      onChange={(e) => setLocalFritekst(e)}
      value={localFritekst}
      onSearchClick={() => setFritekst(localFritekst)}
    />
  );
};

export default FritekstSøk;
