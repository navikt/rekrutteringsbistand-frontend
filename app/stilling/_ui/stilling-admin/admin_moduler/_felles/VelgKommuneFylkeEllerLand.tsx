import {
  GeografiType,
  usePamGeografi,
} from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { GeografiDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { storForbokstavString } from '@/app/kandidat/util';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import { FC, useMemo, useState } from 'react';

interface GeografiDTOmedId extends GeografiDTO {
  id: string;
}
interface VelgKommuneFylkeEllerLandProps {
  lokasjoner: GeografiDTOmedId[];
  leggTilLokasjon: (lokasjon: GeografiDTO) => void;
  fjernLokasjonId: (id: string) => void;
}

const VelgKommuneFylkeEllerLand: FC<VelgKommuneFylkeEllerLandProps> = ({
  lokasjoner,
  leggTilLokasjon,
  fjernLokasjonId,
}) => {
  const geografi = usePamGeografi();
  const [søkeTekst, setSøkeTekst] = useState<string>('');
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const valgteVerdier = lokasjoner;

  // Derivert liste - ingen setState i effect
  const muligeValg = useMemo(() => {
    if (søkeTekst.length <= 1 || !geografi.data) return [];
    const lower = søkeTekst.toLowerCase();
    const format = (navn: string, label: string) =>
      `${storForbokstavString(navn)} (${label})`;

    return [
      ...geografi.data
        .filter(
          (g) =>
            g.type === GeografiType.KOMMUNE &&
            g.navn.toLowerCase().includes(lower),
        )
        .map((k) => format(k.navn, 'kommune')),
      ...geografi.data
        .filter(
          (g) =>
            g.type === GeografiType.FYLKE &&
            g.navn.toLowerCase().includes(lower),
        )
        .map((f) => format(f.navn, 'fylke')),
      ...geografi.data
        .filter(
          (g) =>
            g.type === GeografiType.LAND &&
            g.navn.toLowerCase().includes(lower),
        )
        .map((l) => format(l.navn, 'land')),
    ];
  }, [søkeTekst, geografi.data]);

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

        if (type.toLowerCase() === 'kommune') return isMunicipal;
        if (type.toLowerCase() === 'fylke') return isCounty;
        if (type.toLowerCase() === 'land') return isCountry;
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
      onToggleSelected={(option, isSelected) =>
        handleValgtVerdi(option, isSelected)
      }
      label=''
      description='Du kan velge flere kommuner, fylker eller land'
      options={muligeValg}
      isMultiSelect
    />
  );
};

export default VelgKommuneFylkeEllerLand;
