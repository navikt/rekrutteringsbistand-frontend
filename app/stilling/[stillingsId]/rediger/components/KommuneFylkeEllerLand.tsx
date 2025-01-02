import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  mapFylkeTilGeografiDTO,
  mapKommuneTilGeografiDTO,
  mapLandTilGeografiDTO,
} from '../../../../../util/geografi';
import { useGeografi } from '../../../../api/stilling/geografi/useGeografi';
import { GeografiDTO } from '../../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';

export interface KommuneFylkeEllerLandProps {
  callBack: (lokasjoner: GeografiDTO[]) => void;
}

const KommuneFylkeEllerLand: React.FC<KommuneFylkeEllerLandProps> = ({
  callBack,
}) => {
  const [muligeValg, setMuligeValg] = useState<string[]>([]);
  const [søkeTekst, setSøkeTekst] = useState<string>('');
  const [valgteVerdier, setValgteVerdier] = useState<string[]>([]);

  const geografi = useGeografi();

  useEffect(() => {
    if (søkeTekst.length > 1) {
      setMuligeValg([
        // Bruker Set for å unngå duplikater
        ...new Set([
          ...(geografi.data?.kommuner
            .filter((k) => k.capitalizedName.includes(søkeTekst))
            .map((k) => k.capitalizedName) ?? []),
          ...(geografi.data?.fylker
            .filter((f) => f.capitalizedName.includes(søkeTekst))
            .map((f) => f.capitalizedName) ?? []),
          ...(geografi.data?.land
            ?.filter((l) => l.capitalizedName.includes(søkeTekst))
            .map((l) => l.capitalizedName) ?? []),
        ]),
      ]);
    }
  }, [geografi.data, søkeTekst]);

  const valgteGeografi = useMemo(() => {
    const kommuner = geografi.data?.kommuner.filter((k) =>
      valgteVerdier.includes(k.capitalizedName),
    );
    const fylker = geografi.data?.fylker.filter((f) =>
      valgteVerdier.includes(f.capitalizedName),
    );
    const land = geografi.data?.land?.filter((l) =>
      valgteVerdier.includes(l.capitalizedName),
    );

    return {
      kommuner,
      fylker,
      land,
    };
  }, [valgteVerdier]);

  React.useEffect(() => {
    if (valgteGeografi) {
      const mappedGeografi = [
        ...(valgteGeografi.kommuner?.map((k) => mapKommuneTilGeografiDTO(k)) ??
          []),
        ...(valgteGeografi.fylker?.map((f) => mapFylkeTilGeografiDTO(f)) ?? []),
        ...(valgteGeografi.land?.map((l) => mapLandTilGeografiDTO(l)) ?? []),
      ];
      callBack(mappedGeografi);
    }
  }, [valgteGeografi]);

  return (
    <UNSAFE_Combobox
      disabled={geografi.isLoading}
      className='mt-4'
      toggleListButton={false}
      selectedOptions={valgteVerdier}
      onChange={(value) => {
        setSøkeTekst(value);
      }}
      onToggleSelected={(value, valgt) => {
        if (valgt) {
          setValgteVerdier([...valgteVerdier, value]);
        } else {
          setValgteVerdier(valgteVerdier.filter((v) => v !== value));
        }
      }}
      label=''
      description='Du kan velge flere kommuner, fylker eller land'
      options={muligeValg}
      isMultiSelect
    />
  );
};

export default KommuneFylkeEllerLand;
