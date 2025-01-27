import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useGeografi } from '../../../../api/stilling/geografi/useGeografi';
import { StillingsDataForm } from '../redigerFormType.zod';

const VelgKommuneFylkeEllerLand: React.FC = () => {
  const { setValue, watch } = useFormContext<StillingsDataForm>();
  const geografi = useGeografi();
  const [muligeValg, setMuligeValg] = useState<string[]>([]);
  const [søkeTekst, setSøkeTekst] = useState<string>('');

  const [valgteVerdier, setValgteVerdier] = useState<string[]>(() => {
    const lokasjoner = watch('omStillingen.lokasjoner');
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

        if (type === 'kommune') {
          const kommune = geografi.data?.kommuner.find(
            (k) => k.capitalizedName.toLowerCase() === navn.toLowerCase(),
          );
          if (kommune) {
            return {
              municipal: kommune.capitalizedName,
              municipalCode: kommune.code,
            };
          }
        } else if (type === 'fylke') {
          return { county: navn };
        } else if (type === 'land') {
          return { country: navn };
        }
      })
      .filter(
        (value): value is NonNullable<typeof value> => value !== undefined,
      );

    setValue('omStillingen.lokasjoner', nyeVerdier || [], {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [valgteVerdier, setValue, geografi.data]);

  /**
   * Oppdater søket
   */
  React.useEffect(() => {
    if (søkeTekst.length > 1) {
      setMuligeValg([
        ...(geografi.data?.kommuner
          .filter((k) =>
            k.capitalizedName
              .toLowerCase()
              .includes(søkeTekst.toLocaleLowerCase()),
          )
          .map((k) => `${k.capitalizedName} (kommune)`) ?? []),
        ...(geografi.data?.fylker
          .filter((f) =>
            f.capitalizedName
              .toLowerCase()
              .includes(søkeTekst.toLocaleLowerCase()),
          )
          .map((f) => `${f.capitalizedName} (fylke)`) ?? []),
        ...(geografi.data?.land
          ?.filter((l) =>
            l.capitalizedName
              .toLowerCase()
              .includes(søkeTekst.toLocaleLowerCase()),
          )
          .map((l) => `${l.capitalizedName} (land)`) ?? []),
      ]);
    }
  }, [geografi.data, søkeTekst]);

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
