import { usePamGeografi } from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import { storBokstavSted, storForbokstavString } from '@/app/kandidat/util';
import { Checkbox, UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';

const KandidatStedSøk: React.FC = () => {
  const { ønsketSted, setØnsketSted } = useKandidatSøkFilterContext();

  const [valg, setValg] = React.useState<string[]>([]);

  const geografi = usePamGeografi();

  React.useEffect(() => {
    if (geografi.data) {
      const uniqueValg = geografi.data
        .filter((geo) => geo.type !== 'LAND')
        .map(
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
    <>
      <UNSAFE_Combobox
        disabled={geografi.isLoading}
        selectedOptions={ønsketSted}
        label='Ønsket sted'
        options={valg.sort()}
        onToggleSelected={onOptionSelected}
        isMultiSelect
      />
      <BorPåØnsketSted />
    </>
  );
};

const BorPåØnsketSted: React.FC = () => {
  const { setBorPåØnsketSted, borPåØnsketSted } = useKandidatSøkFilterContext();
  return (
    <Checkbox
      checked={borPåØnsketSted === 'ja'}
      onChange={(e) => setBorPåØnsketSted(e.target.checked ? 'ja' : 'nei')}
    >
      Kandidaten må også bo på ønsket sted
    </Checkbox>
  );
};

export default KandidatStedSøk;
