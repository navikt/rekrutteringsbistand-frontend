import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import { usePamGeografi } from '../../../../api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { useKandidatSøkFilter } from '../../../KandidaSokContext';
import { storBokstavSted, storForbokstavString } from '../../../util';

const KandidatStedSøk: React.FC = () => {
  const { ønsketSted, setØnsketSted } = useKandidatSøkFilter();

  const [valg, setValg] = React.useState<string[]>([]);

  const geografi = usePamGeografi();

  React.useEffect(() => {
    if (geografi.data) {
      const uniqueValg = geografi.data.map(
        (geoagrafi) =>
          `${storBokstavSted(geoagrafi.navn)} (${storForbokstavString(geoagrafi.type)})`,
      );

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
