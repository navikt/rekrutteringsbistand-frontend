import {
  Button,
  Checkbox,
  CheckboxGroup,
  Heading,
  TextField,
} from '@navikt/ds-react';
import * as React from 'react';
import {
  Control,
  Controller,
  FieldArrayWithId,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';
import { StillingsDataForm } from '../../redigerFormType.zod';

const KontaktPersonInformasjon: React.FC<{
  control: Control<StillingsDataForm, any>;
  field: FieldArrayWithId<
    StillingsDataForm,
    'omVirksomheten.kontaktPersoner',
    'id'
  >;
  index: number;
}> = ({ control, field, index }) => {
  const [epostFelt, setEpostFelt] = React.useState<boolean>(true);
  const [telefonFelt, setTelefonFelt] = React.useState<boolean>(true);

  return (
    <div key={field.id} className='grid grid-cols-2 gap-4 items-start'>
      <Controller
        control={control}
        name={`omVirksomheten.kontaktPersoner.${index}.name`}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label='Navn'
            onChange={(e) => onChange(e.target.value)}
            value={value ?? ''}
            error={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name={`omVirksomheten.kontaktPersoner.${index}.title`}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label='Tittel'
            onChange={(e) => onChange(e.target.value)}
            value={value ?? ''}
            error={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name={`omVirksomheten.kontaktPersoner.${index}.email`}
        render={({ fieldState: { error } }) => (
          <CheckboxGroup
            legend='Velg hvor de kan nås (må ha minst en)'
            error={error?.message}
          >
            <Checkbox
              value='email'
              checked={epostFelt}
              onChange={(e) => setEpostFelt(e.target.checked)}
            >
              E-post
            </Checkbox>
            <Checkbox
              value='phone'
              checked={telefonFelt}
              onChange={(e) => setTelefonFelt(e.target.checked)}
            >
              Telefon
            </Checkbox>
          </CheckboxGroup>
        )}
      />

      <div />

      {epostFelt && (
        <Controller
          control={control}
          name={`omVirksomheten.kontaktPersoner.${index}.email`}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              type='email'
              label='E-post'
              onChange={(e) => onChange(e.target.value)}
              value={value ?? ''}
              error={error?.message}
            />
          )}
        />
      )}
      {telefonFelt && (
        <Controller
          control={control}
          name={`omVirksomheten.kontaktPersoner.${index}.phone`}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              type='tel'
              label='Telefonnummer'
              onChange={(e) => onChange(e.target.value)}
              value={value ?? ''}
              error={error?.message}
            />
          )}
        />
      )}
    </div>
  );
};

const VelgKontaktperson: React.FC = () => {
  const { control } = useFormContext<StillingsDataForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'omVirksomheten.kontaktPersoner',
  });

  if (fields.length === 0) {
    append({ name: '', title: '', email: '', phone: '' });
  }

  return (
    <React.Fragment>
      <Heading size='medium'>Kontaktperson</Heading>
      <p>Vi må vite hvem som er kontaktperson for stillingen.</p>
      <p>
        Kontaktperson er synlig for veiledere i NAV. Kandidater bes ta kontakt
        med veileder for informasjon om stillingen.
      </p>
      {fields.map((field, index) => (
        <div key={field.id}>
          <KontaktPersonInformasjon
            control={control}
            field={field}
            index={index}
          />

          {fields.length > 1 && (
            <>
              <div> </div>
              <div className='flex justify-end'>
                <Button
                  variant='secondary'
                  type='button'
                  onClick={() => remove(index)}
                >
                  Fjern kontaktperson
                </Button>
              </div>
            </>
          )}
        </div>
      ))}
      <div>
        <Button
          variant='secondary'
          type='button'
          onClick={() => append({ name: '', title: '', email: '', phone: '' })}
        >
          Legg til flere kontaktpersoner
        </Button>
      </div>
    </React.Fragment>
  );
};

export default VelgKontaktperson;
