import { useKandidatSøkFilterContext } from '../../../KandidaSokFilterContext';
import { Search } from '@navikt/ds-react';
import * as React from 'react';

const FritekstSøk: React.FC = () => {
  const { setFritekst } = useKandidatSøkFilterContext();
  const [localFritekst, setLocalFritekst] = React.useState<string>('');

  const handleSearchChange = (e: string) => {
    setFritekst(e);

    setLocalFritekst('');
  };

  return (
    <Search
      hideLabel={false}
      label='Søk etter kandidat'
      variant='primary'
      onChange={(e) => setLocalFritekst(e)}
      value={localFritekst}
      onSearchClick={() => handleSearchChange(localFritekst)}
    />
  );
};

export default FritekstSøk;
