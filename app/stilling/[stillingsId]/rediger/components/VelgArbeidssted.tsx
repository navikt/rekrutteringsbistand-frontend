import { Button } from '@navikt/ds-react';
import * as React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import VelgPoststed from '../../../../components/VelgPoststed';
import { StillingsDataForm } from '../redigerFormType.zod';
import VelgKommuneFylkeEllerLand from './VelgKommuneFylkeEllerLand';

const VelgArbeidssted: React.FC = () => {
  const { control } = useFormContext<StillingsDataForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'omStillingen.locationList',
  });

  return (
    <div>
      <div className='my-4'>
        <Button variant='secondary' onClick={() => append({ postalCode: '' })}>
          Legg til adresse
        </Button>
      </div>
      {fields
        .filter((field) => field.postalCode !== null)
        .map((field, index) => (
          <VelgPoststed key={index} location={field} fieldId={field.id} />
        ))}
      <div className='my-4'>
        <VelgKommuneFylkeEllerLand />
      </div>
      {/* <ToggleGroup
        className='my-4'
        fill
        defaultValue={adresseValg}
        onChange={(e) => setAdresseValg(e as 'adresse' | 'kommune')}
        variant='neutral'
      >
        <ToggleGroup.Item value={'adresse'} label='Adresse' />
        <ToggleGroup.Item value={'kommune'} label='Kommune, fylke eller land' />
      </ToggleGroup>

      {adresseValg === 'adresse' && (
        <div className='mt-2 flex flex-col gap-2'>
          <Controller
            control={control}
            name={`omStillingen.adresse`}
            render={({ field: { onChange, value } }) => (
              <TextField
                label='Adresse'
                onChange={(e) => onChange(e.target.value)}
                value={value ?? ''}
              />
            )}
          />
          <VelgPoststed
            callBack={(poststed) => {
              setValue('omStillingen.locationList', [poststed]);
            }}
          />
        </div>
      )}

      {adresseValg === 'kommune' && (
        <KommuneFylkeEllerLand
          callBack={(lokasjoner) => {
            setValue('omStillingen.locationList', lokasjoner);
          }}
        />
      )} */}
    </div>
  );
};

export default VelgArbeidssted;
