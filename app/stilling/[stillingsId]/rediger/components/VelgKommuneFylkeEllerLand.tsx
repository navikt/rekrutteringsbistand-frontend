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
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
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
    const typeMatch = option.match(/\(([^)]+)\)$/);
    const type = typeMatch ? typeMatch[1] : '';

    const navn = option.replace(/\s*\([^)]*\)$/, '').trim();

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
      const valgtVerdi = valgteVerdier.find((v) => {
        const isMunicipal =
          lokasjon?.lokasjon.kommune &&
          v.municipal === lokasjon.lokasjon.kommune;
        const isCounty =
          lokasjon?.lokasjon.fylke && v.county === lokasjon.lokasjon.fylke;
        const isCountry =
          lokasjon?.lokasjon.land && v.country === lokasjon.lokasjon.land;

        // Match based on the specific type found in the option
        if (type.toLowerCase() === 'kommune') {
          return isMunicipal;
        } else if (type.toLowerCase() === 'fylke') {
          return isCounty;
        } else if (type.toLowerCase() === 'land') {
          return isCountry;
        }

        return false;
      });

      if (valgtVerdi?.id) {
        fjernLokasjonId(valgtVerdi.id);
      }
    }
  };

  return (
    <UNSAFE_Combobox
      isListOpen={isListOpen}
      disabled={geografi.isLoading}
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
        setIsListOpen(value.length > 0);
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
