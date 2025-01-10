import { TextField } from '@navikt/ds-react';
import * as React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { usePostData } from '../api/stilling/geografi/postData/usePostData';
import { GeografiDTO } from '../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { StillingsDataForm } from '../stilling/[stillingsId]/rediger/redigerFormType.zod';

export interface VelgPoststedProps {
  location: GeografiDTO;
  fieldId: string;
}

const VelgPoststed: React.FC<VelgPoststedProps> = ({ location, fieldId }) => {
  const hook = usePostData();
  const { setValue } = useFormContext<StillingsDataForm>();

  const { fields } = useFieldArray({
    name: 'omStillingen.locationList',
  });

  const [postNummer, setPostNummer] = React.useState<string>(
    location?.postalCode ?? '',
  );
  const [postSted, setPostSted] = React.useState<string>(location?.city ?? '');

  React.useEffect(() => {
    if (postNummer && postSted) {
      const index = fields.findIndex((f) => f.id === fieldId);
      if (index !== -1) {
        setValue(`omStillingen.locationList.${index}.postalCode`, postNummer);
        setValue(`omStillingen.locationList.${index}.city`, postSted);
      }
    }
  }, [postNummer, postSted]);

  React.useEffect(() => {
    if (postNummer.length === 4 && hook.data) {
      const postSted = hook.data
        .filter((item) => item.postalCode === postNummer)
        .map((item) => item.capitalizedCityName);
      setPostSted(postSted[0] ?? 'Ukjent poststed');
    }
  }, [postNummer, hook.data]);

  return (
    <div className='flex gap-4'>
      <div className='w-32'>
        <TextField
          label='Postnummer'
          maxLength={4}
          value={postNummer}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ''); // Only allow digits
            if (value.length <= 4) {
              setPostNummer(value);
            }
          }}
        />
      </div>
      <div className='flex-1'>
        <TextField label='Poststed' value={postSted} readOnly />
      </div>
    </div>
  );

  // return (
  //   <UNSAFE_Combobox
  //     toggleListButton={false}
  //     value={søkeVerdi}
  //     label='Velg postnummer og poststed'
  //     isLoading={hook.isLoading}
  //     options={filteredOptions}
  //     shouldAutocomplete
  //     onChange={(value) => {
  //       setSøkeVerdi(value);
  //     }}
  //     isListOpen={søkeVerdi.length > 1}
  //     onToggleSelected={(value) => {
  //       const poststed = hook.data
  //         ? hook.data.find((item) => item.postalCode === value)
  //         : null;
  //       if (poststed) {
  //         callBack({
  //           address: null,
  //           postalCode: poststed.postalCode,
  //           county: poststed.county.name,
  //           municipal: poststed.municipality.name,
  //           municipalCode: poststed.municipality.code,
  //           city: poststed.city,
  //           country: null,
  //           latitude: null,
  //           longitude: null,
  //         });
  //       }
  //     }}
  //   />
  // );
};

export default VelgPoststed;
