import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  GeografiType,
  usePamGeografi,
} from '../../../../api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { FormidlingDataForm } from '../../../../formidlinger/ny-formidling/redigerFormidlingFormType';
import { StillingsDataForm } from '../redigerFormType.zod';

interface VelgKommuneFylkeEllerLandProps {
  lokasjonsFelt: 'omFormidling.lokasjoner' | 'omStillingen.lokasjoner';
}

const VelgKommuneFylkeEllerLand: React.FC<VelgKommuneFylkeEllerLandProps> = ({
  lokasjonsFelt,
}) => {
  const { setValue, watch } = useFormContext<
    StillingsDataForm | FormidlingDataForm
  >();
  const geografi = usePamGeografi();
  const [muligeValg, setMuligeValg] = useState<string[]>([]);
  const [søkeTekst, setSøkeTekst] = useState<string>('');

  const [valgteVerdier, setValgteVerdier] = useState<string[]>(() => {
    const lokasjoner = watch(lokasjonsFelt);
    return (
      lokasjoner
        ?.map((item) => {
          if (item.municipal) return `${item.municipal} (kommune)`;
          if (item.county) return `${item.county} (fylke)`;
          if (item.country) return `${item.country} (land)`;
        })
        .filter((item): item is string => item !== undefined) ?? []
    );
  });

  /**
   * Oppdater valgte verdier i form
   */
  React.useEffect(() => {
    const nyeVerdier = valgteVerdier
      ?.map((verdi) => {
        const parts = verdi.split(' (');
        const navn = parts[0];
        const type = parts[1].replace(')', '');

        const baseLocation = {
          address: null,
          postalCode: null,
          city: null,
          county: null,
          countyCode: null,
          municipal: null,
          municipalCode: null,
          country: null,
        };

        if (type === 'kommune') {
          const kommune = geografi.data
            ?.filter((g) => g.type === GeografiType.KOMMUNE)
            .find((k) => k.navn.toLowerCase() === navn.toLowerCase());
          if (kommune) {
            return {
              ...baseLocation,
              city: kommune.lokasjon.poststed ?? null,
              county: kommune.lokasjon.fylke ?? null,
              countyCode: kommune.lokasjon.fylkesnummer ?? null,
              municipal: kommune.lokasjon.kommune ?? null,
              municipalCode: kommune.lokasjon.kommunenummer ?? null,
            };
          }
        } else if (type === 'fylke') {
          const fylke = geografi.data
            ?.filter((g) => g.type === GeografiType.FYLKE)
            .find((k) => k.navn.toLowerCase() === navn.toLowerCase());
          if (fylke) {
            return {
              ...baseLocation,
              county: fylke.lokasjon.fylke ?? null,
              countyCode: fylke.lokasjon.fylkesnummer ?? null,
            };
          }
        } else if (type === 'land') {
          return { ...baseLocation, country: navn };
        }
      })
      .filter(
        (value): value is NonNullable<typeof value> => value !== undefined,
      );

    setValue(lokasjonsFelt, nyeVerdier || [], {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [valgteVerdier, setValue, geografi.data, lokasjonsFelt]);

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
          .map((k) => `${k.navn} (kommune)`) ?? []),
        ...(geografi.data
          ?.filter((g) => g.type === GeografiType.FYLKE)
          .filter((f) =>
            f.navn.toLowerCase().includes(søkeTekst.toLocaleLowerCase()),
          )
          .map((f) => `${f.navn} (fylke)`) ?? []),
        ...(geografi.data
          ?.filter((g) => g.type === GeografiType.LAND)
          ?.filter((l) =>
            l.navn.toLowerCase().includes(søkeTekst.toLocaleLowerCase()),
          )
          .map((l) => `${l.navn} (land)`) ?? []),
      ]);
    }
  }, [geografi.data, søkeTekst, lokasjonsFelt]);

  const handleValgtVerdi = (option: string, isSelected: boolean) => {
    if (!isSelected) {
      setValgteVerdier(valgteVerdier?.filter((v) => v !== option));
    } else {
      setValgteVerdier([...(valgteVerdier ?? []), option]);
    }
  };

  return (
    <UNSAFE_Combobox
      disabled={geografi.isLoading}
      className='mt-4'
      toggleListButton={false}
      selectedOptions={valgteVerdier}
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
