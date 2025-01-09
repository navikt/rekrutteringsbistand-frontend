import { TextField, ToggleGroup } from '@navikt/ds-react';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import VelgPoststed from '../../../../components/VelgPoststed';
import { StillingsDataForm } from '../redigerFormType.zod';
import KommuneFylkeEllerLand from './KommuneFylkeEllerLand';

const VelgArbeidssted: React.FC = () => {
  const { setValue, control } = useFormContext<StillingsDataForm>();

  const [adresseValg, setAdresseValg] = React.useState<'adresse' | 'kommune'>(
    'adresse',
  );

  return (
    <div>
      <ToggleGroup
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
      )}
    </div>
  );
};

export default VelgArbeidssted;
