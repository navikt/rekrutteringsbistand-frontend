import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import { useGeografi } from '../../../../api/stilling/geografi/useGeografi';
import { useKandidatSøkFilter } from '../../../KandidaSokContext';

const KandidatStedSøk: React.FC = () => {
  const { ønsketSted, setØnsketSted } = useKandidatSøkFilter();

  const [valg, setValg] = React.useState<string[]>([]);

  const geografi = useGeografi();

  React.useEffect(() => {
    if (geografi.data) {
      const kommuner = geografi.data.kommuner.map((k) => k.capitalizedName);
      const fylker = geografi.data.fylker.map((f) => f.capitalizedName);
      const land = geografi.data.land.map((l) => l.capitalizedName);

      const uniqueValg = Array.from(new Set([...kommuner, ...fylker, ...land]));
      setValg(uniqueValg);
    }
  }, [geografi.data]);

  const onOptionSelected = (option: string, isSelected: boolean) => {
    if (isSelected) {
      setØnsketSted([...(Array.isArray(ønsketSted) ? ønsketSted : []), option]);
    } else {
      setØnsketSted(
        Array.isArray(ønsketSted) ? ønsketSted.filter((o) => o !== option) : [],
      );
    }
  };

  return (
    <UNSAFE_Combobox
      disabled={geografi.isLoading}
      selectedOptions={ønsketSted}
      label='Søk i sted'
      options={valg.sort()}
      onToggleSelected={onOptionSelected}
      isMultiSelect
    />
  );
};

export default KandidatStedSøk;
