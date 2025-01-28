import { Search } from '@navikt/ds-react';
import * as React from 'react';
import { useKandidatSøkFilter } from '../../../KandidaSokContext';

const FritekstSøk: React.FC = () => {
  const { fritekst, setFritekst } = useKandidatSøkFilter();
  const [localFritekst, setLocalFritekst] = React.useState('');

  return (
    <Search
      hideLabel={false}
      label='Søk etter kandidat'
      variant='primary'
      onChange={(e) => setLocalFritekst(e)}
      value={localFritekst}
      onSearchClick={() => setFritekst([...fritekst, localFritekst])}
    />
  );
};

export default FritekstSøk;
