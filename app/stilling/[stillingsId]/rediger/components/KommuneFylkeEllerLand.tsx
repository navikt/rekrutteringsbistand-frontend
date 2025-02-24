import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';

import {
  GeografiType,
  PamGeografi,
  usePamGeografi,
} from '../../../../api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { GeografiDTO } from '../../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';

export interface KommuneFylkeEllerLandProps {
  callBack: (lokasjoner: GeografiDTO[]) => void;
}

const mapTilGeografiDTO = (geografi: PamGeografi) => {
  return {
    address: geografi.lokasjon.adresse,
    postalCode: geografi.lokasjon.postnummer,
    county: geografi.navn,
    // countyCode: geografi.lokasjon.fylkesnummer,
    municipal: geografi.lokasjon.kommunenummer,
    municipalCode: geografi.lokasjon.kommunenummer,
    city: geografi.lokasjon.poststed,
    country: geografi.lokasjon.land,
  };
};
const KommuneFylkeEllerLand: React.FC<KommuneFylkeEllerLandProps> = ({
  callBack,
}) => {
  const [muligeValg, setMuligeValg] = useState<string[]>([]);
  const [søkeTekst, setSøkeTekst] = useState<string>('');
  const [valgteVerdier, setValgteVerdier] = useState<string[]>([]);

  const geografi = usePamGeografi();

  useEffect(() => {
    if (søkeTekst.length > 1) {
      setMuligeValg([
        // Bruker Set for å unngå duplikater
        ...new Set([
          ...(geografi.data
            ?.filter(
              (g) =>
                g.type === GeografiType.KOMMUNE &&
                g.lokasjon.kommunenummer?.includes(søkeTekst),
            )
            .map((k) => k.navn) ?? []),
          ...(geografi.data
            ?.filter(
              (g) =>
                g.type === GeografiType.FYLKE &&
                g.lokasjon.fylkesnummer?.includes(søkeTekst),
            )
            .map((f) => f.navn) ?? []),
          ...(geografi.data
            ?.filter(
              (g) =>
                g.type === GeografiType.LAND &&
                g.lokasjon.land?.includes(søkeTekst),
            )
            .map((l) => l.navn) ?? []),
        ]),
      ]);
    }
  }, [geografi.data, søkeTekst]);

  const valgteGeografi = useMemo(() => {
    const kommuner = geografi.data
      ?.filter((g) => g.type === GeografiType.KOMMUNE)
      .filter((k) => valgteVerdier.includes(k.navn));
    const fylker = geografi.data
      ?.filter((g) => g.type === GeografiType.FYLKE)
      .filter((f) => valgteVerdier.includes(f.navn));
    const land = geografi.data
      ?.filter((g) => g.type === GeografiType.LAND)
      .filter((l) => valgteVerdier.includes(l.navn));

    return {
      kommuner,
      fylker,
      land,
    };
  }, [valgteVerdier, geografi.data]);

  React.useEffect(() => {
    if (valgteGeografi) {
      const mappedGeografi = [
        ...(valgteGeografi.kommuner?.map((k) => mapTilGeografiDTO(k)) ?? []),
        ...(valgteGeografi.fylker?.map((f) => mapTilGeografiDTO(f)) ?? []),
        ...(valgteGeografi.land?.map((l) => mapTilGeografiDTO(l)) ?? []),
      ];
      callBack(mappedGeografi);
    }
  }, [valgteGeografi, callBack]);

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
