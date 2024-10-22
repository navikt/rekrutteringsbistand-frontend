import { debounce, Search } from '@navikt/ds-react';
import * as React from 'react';
import { useKandidatSøkFilter } from '../../KandidaSokContext';

export interface FritekstSøkProps {
  children?: React.ReactNode | undefined;
}

const FritekstSøk: React.FC<FritekstSøkProps> = ({ children }) => {
  const { fritekst, setFritekst } = useKandidatSøkFilter();
  const [localFritekst, setLocalFritekst] = React.useState(fritekst ?? '');

  const debouncedSetFritekst = React.useMemo(
    () => debounce(setFritekst, 1000),
    [setFritekst],
  );

  const handleChange = (value: string) => {
    setLocalFritekst(value);
    debouncedSetFritekst(value);
  };

  React.useEffect(() => {
    return () => {
      debouncedSetFritekst.clear();
    };
  }, [debouncedSetFritekst]);

  return (
    <Search
      hideLabel={false}
      label='Søk etter kandidat'
      variant='primary'
      onChange={handleChange}
      value={localFritekst}
    />
  );
};

export default FritekstSøk;
