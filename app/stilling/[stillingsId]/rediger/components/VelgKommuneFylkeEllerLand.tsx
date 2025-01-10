import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  mapFylkeTilGeografiDTO,
  mapKommuneTilGeografiDTO,
  mapLandTilGeografiDTO,
} from '../../../../../util/geografi';
import { useGeografi } from '../../../../api/stilling/geografi/useGeografi';
import { StillingsDataForm } from '../redigerFormType.zod';

const VelgKommuneFylkeEllerLand: React.FC = () => {
  const { control, setValue } = useFormContext<StillingsDataForm>();
  const { fields, append } = useFieldArray({
    control,
    name: 'omStillingen.locationList',
  });
  const [muligeValg, setMuligeValg] = useState<string[]>([]);
  const [søkeTekst, setSøkeTekst] = useState<string>('');

  const lokasjoner = fields.filter((field) => field.postalCode === null);

  const [valgteVerdier, setValgteVerdier] = useState<string[]>(() =>
    lokasjoner
      .map((lokasjon) => {
        if (lokasjon.municipal) return lokasjon.municipal;
        if (lokasjon.city) return lokasjon.city;
        if (lokasjon.country) return lokasjon.country;
        return '';
      })
      .filter(Boolean),
  );

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

      // Remove locations that are no longer selected
      const currentLocations = fields.filter(
        (field) => field.postalCode === null,
      );
      currentLocations.forEach((location, index) => {
        const stillExists = mappedGeografi.some(
          (geo) =>
            geo.municipal === location.municipal &&
            geo.city === location.city &&
            geo.country === location.country,
        );
        if (!stillExists) {
          setValue(
            `omStillingen.locationList`,
            fields.filter((_, i) => i !== index),
          );
        }
      });

      // Add new locations that don't exist yet
      mappedGeografi.forEach((geo) => {
        const alreadyExists = fields.some(
          (field) =>
            field.municipal === geo.municipal &&
            field.city === geo.city &&
            field.country === geo.country,
        );

        if (!alreadyExists) {
          append(geo);
        }
      });
    }
  }, [valgteGeografi, fields, append, setValue]);

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

export default VelgKommuneFylkeEllerLand;
