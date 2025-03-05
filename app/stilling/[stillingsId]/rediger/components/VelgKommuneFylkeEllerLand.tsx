import {
  GeografiType,
  usePamGeografi,
} from '../../../../api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { GeografiDTO } from '../../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { storForbokstavString } from '../../../../kandidat/util';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import { useState } from 'react';

interface GeografiDTOmedId extends GeografiDTO {
  id: string;
}
interface VelgKommuneFylkeEllerLandProps {
  lokasjoner: GeografiDTOmedId[];
  leggTilLokasjon: (lokasjon: GeografiDTO) => void;
  fjernLokasjonId: (id: string) => void;
}

const VelgKommuneFylkeEllerLand: React.FC<VelgKommuneFylkeEllerLandProps> = ({
  lokasjoner,
  leggTilLokasjon,
  fjernLokasjonId,
}) => {
  const geografi = usePamGeografi();
  const [muligeValg, setMuligeValg] = useState<string[]>([]);
  const [søkeTekst, setSøkeTekst] = useState<string>('');

  const valgteVerdier = lokasjoner;

  /**
   * Oppdater søket
   */
  React.useEffect(() => {
    if (søkeTekst.length > 1) {
      setMuligeValg([
        ...(geografi.data
          ?.filter((g) => g.type === GeografiType.KOMMUNE)
          .filter((k) =>
            k.navn.toLowerCase().includes(søkeTekst.toLocaleLowerCase()),
          )
          .map((k) => `${storForbokstavString(k.navn)} (kommune)`) ?? []),
        ...(geografi.data
          ?.filter((g) => g.type === GeografiType.FYLKE)
          .filter((f) =>
            f.navn.toLowerCase().includes(søkeTekst.toLocaleLowerCase()),
          )
          .map((f) => `${storForbokstavString(f.navn)} (fylke)`) ?? []),
        ...(geografi.data
          ?.filter((g) => g.type === GeografiType.LAND)
          ?.filter((l) =>
            l.navn.toLowerCase().includes(søkeTekst.toLocaleLowerCase()),
          )
          .map((l) => `${storForbokstavString(l.navn)} (land)`) ?? []),
      ]);
    }
  }, [geografi.data, søkeTekst]);

  const handleValgtVerdi = (option: string, isSelected: boolean) => {
    const parts = option.split(' (');
    const navn = parts[0];
    const type = parts[1].replace(')', '');

    const lokasjon = geografi.data
      ?.filter((g) => g.type.toLowerCase() === type.toLowerCase())
      .find((g) => g.navn.toLowerCase() === navn.toLowerCase());

    if (isSelected && lokasjon) {
      leggTilLokasjon({
        address: lokasjon.lokasjon.adresse,
        postalCode: null,
        city: lokasjon.lokasjon.poststed,
        county: lokasjon.lokasjon.fylke,
        // countyCode: lokasjon.lokasjon.fylkesnummer,
        municipal: lokasjon.lokasjon.kommune,
        municipalCode: lokasjon.lokasjon.kommunenummer,
        country: lokasjon.lokasjon.land,
      });
    } else {
      const id = valgteVerdier.find(
        (v) =>
          // Fjern i rekkefølge kommune, fylke, land
          v.municipal === lokasjon?.lokasjon.kommune ||
          v.county === lokasjon?.lokasjon.fylke ||
          v.country === lokasjon?.lokasjon.land,
      )?.id;

      if (id) {
        fjernLokasjonId(id);
      }
    }
  };

  return (
    <UNSAFE_Combobox
      disabled={geografi.isLoading}
      className='mt-4'
      toggleListButton={false}
      selectedOptions={valgteVerdier.map((v) =>
        v.municipal
          ? `${storForbokstavString(v.municipal)} (kommune)`
          : v.county
            ? `${storForbokstavString(v.county)} (fylke)`
            : v.country
              ? `${storForbokstavString(v.country)} (land)`
              : '',
      )}
      onChange={(value) => {
        setSøkeTekst(value);
      }}
      onToggleSelected={(option, isSelected) => {
        handleValgtVerdi(option, isSelected);
      }}
      label=''
      description='Du kan velge flere kommuner, fylker eller land'
      options={muligeValg}
      isMultiSelect
    />
  );
};

export default VelgKommuneFylkeEllerLand;
