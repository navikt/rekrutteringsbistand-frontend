import { usePamGeografi } from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import { storBokstavSted, storForbokstavString } from '@/app/kandidat/util';
import { Checkbox, UNSAFE_Combobox } from '@navikt/ds-react';
import { FC, useEffect, useState } from 'react';

export default function KandidatStedSøk() {
  const { ønsketSted, setØnsketSted } = useKandidatSøkFilterContext();

  const [valg, setValg] = useState<string[]>([]);

  const geografi = usePamGeografi();

  useEffect(() => {
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
        size='small'
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
}

const BorPåØnsketSted: FC = () => {
  const { setBorPåØnsketSted, borPåØnsketSted } = useKandidatSøkFilterContext();
  return (
    <Checkbox
      size='small'
      checked={borPåØnsketSted === 'ja'}
      onChange={(e) => setBorPåØnsketSted(e.target.checked ? 'ja' : 'nei')}
    >
      Kandidaten må også bo på ønsket sted
    </Checkbox>
  );
};
