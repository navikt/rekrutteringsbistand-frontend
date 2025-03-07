import { useKandidatSøkFilterContext } from '../../../KandidaSokFilterContext';
import { Search } from '@navikt/ds-react';
import * as React from 'react';

const FritekstSøk: React.FC = () => {
  const { fritekst, setFritekst } = useKandidatSøkFilterContext();
  const [localFritekst, setLocalFritekst] = React.useState(fritekst);

  return (
    <Search
      hideLabel={false}
      label='Søk etter kandidat'
      variant='primary'
      onChange={(e) => setLocalFritekst(e)}
      value={localFritekst}
      onSearchClick={() => setFritekst(localFritekst)}
    />
  );
};

export default FritekstSøk;
