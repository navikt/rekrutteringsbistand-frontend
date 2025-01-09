import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import { usePostData } from '../api/stilling/geografi/postData/usePostData';
import { GeografiDTO } from '../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';

export interface VelgPoststedProps {
  callBack: (poststed: GeografiDTO) => void;
}

const VelgPoststed: React.FC<VelgPoststedProps> = ({ callBack }) => {
  const hook = usePostData();

  const [søkeVerdi, setSøkeVerdi] = React.useState<string>('');

  const filteredOptions = React.useMemo(
    () =>
      søkeVerdi.length > 1 && hook.data
        ? hook.data
            .filter(
              (item) =>
                item.postalCode.includes(søkeVerdi) ||
                item.capitalizedCityName
                  .toLowerCase()
                  .includes(søkeVerdi.toLowerCase()),
            )
            .slice(0, 100)
            .sort((a, b) => Number(a.postalCode) - Number(b.postalCode))
            .map((item) => {
              return {
                label: `${item.postalCode} - ${item.capitalizedCityName}`,
                value: item.postalCode,
              };
            }) // Begrens antall resultater
        : [],
    [hook.data, søkeVerdi],
  );

  return (
    <UNSAFE_Combobox
      toggleListButton={false}
      value={søkeVerdi}
      label='Velg postnummer og poststed'
      isLoading={hook.isLoading}
      options={filteredOptions}
      shouldAutocomplete
      onChange={(value) => {
        setSøkeVerdi(value);
      }}
      isListOpen={søkeVerdi.length > 1}
      onToggleSelected={(value) => {
        const poststed = hook.data
          ? hook.data.find((item) => item.postalCode === value)
          : null;
        if (poststed) {
          callBack({
            address: null,
            postalCode: poststed.postalCode,
            county: poststed.county.name,
            municipal: poststed.municipality.name,
            municipalCode: poststed.municipality.code,
            city: poststed.city,
            country: null,
            latitude: null,
            longitude: null,
          });
        }
      }}
    />
  );
};

export default VelgPoststed;
