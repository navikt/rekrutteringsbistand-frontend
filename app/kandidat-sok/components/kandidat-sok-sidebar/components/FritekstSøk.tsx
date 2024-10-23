import { Search } from '@navikt/ds-react';
import * as React from 'react';
import { useKandidatSøkFilter } from '../../../KandidaSokContext';

const FritekstSøk: React.FC = () => {
  const { fritekst, setFritekst } = useKandidatSøkFilter();
  const [localFritekst, setLocalFritekst] = React.useState('');

  const handleChange = (value: string) => {
    setFritekst([...fritekst, value]);
    setLocalFritekst('');
  };

  return (
    <Search
      hideLabel={false}
      label='Søk etter kandidat'
      variant='primary'
      onChange={setLocalFritekst}
      value={localFritekst}
      onSearchClick={handleChange}
    />
  );
};

export default FritekstSøk;
