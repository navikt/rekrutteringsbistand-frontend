import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import { useGeografi } from '../../api/stilling/geografi/useGeografi';
import { useKandidatSøkFilter } from '../KandidaSokContext';

export interface KandidatStedSøkProps {
  children?: React.ReactNode | undefined;
}

const KandidatStedSøk: React.FC<KandidatStedSøkProps> = ({ children }) => {
  const { ønsketSted, setØnsketSted } = useKandidatSøkFilter();

  const [valg, setValg] = React.useState<string[]>([]);

  const geografi = useGeografi();

  React.useEffect(() => {
    if (geografi.data) {
      const kommuner = geografi.data.kommuner.map((k) => k.capitalizedName);
      const fylker = geografi.data.fylker.map((f) => f.capitalizedName);

      const uniqueValg = Array.from(new Set([...kommuner, ...fylker]));
      setValg(uniqueValg);
    }
  }, [geografi.data]);

  return (
    <UNSAFE_Combobox
      disabled={geografi.isLoading}
      label='Søk i sted'
      options={valg.sort()}
      selectedOptions={ønsketSted}
      //   onChange={(val) => setØnsketSted(val)}
      isMultiSelect
    />
  );
};

export default KandidatStedSøk;
