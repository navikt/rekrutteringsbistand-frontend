'use client';

import { useAutosave } from './useAutosave';
import { usePamPostdata } from '@/app/api/pam-geografi/postdata/[postnummer]/usePamPostdata';
import { BodyShort, Heading, TextField } from '@navikt/ds-react';
import { useEffect } from 'react';
import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

const FormFields = {
  GATEADRESSE: 'gateadresse',
  POSTNUMMER: 'postnummer',
  POSTSTED: 'poststed',
} as const;

const StedForm = ({ control }: any) => {
  const { setValue, clearErrors, setError, trigger } = useFormContext();
  const { save } = useAutosave();
  const watchPostnummer = useWatch({ control, name: FormFields.POSTNUMMER });
  const { data: postdata, isLoading } = usePamPostdata(watchPostnummer || '');

  React.useEffect(() => {
    if (!watchPostnummer || watchPostnummer.length !== 4 || isLoading) return;

    if (postdata?.korrigertNavnBy) {
      setValue(FormFields.POSTSTED, postdata.korrigertNavnBy, {
        shouldDirty: true,
        shouldValidate: true,
      });
      clearErrors(FormFields.POSTSTED);
    } else {
      setValue(FormFields.POSTSTED, '', {
        shouldDirty: true,
        shouldValidate: true,
      });
      setError(FormFields.POSTSTED, {
        type: 'manual',
        message: 'Ukjent poststed',
      });
    }
  }, [watchPostnummer, isLoading, postdata, setValue, setError, clearErrors]);

  return (
    <div className='space-y-4'>
      <Heading level='3' size='small'>
        Sted
      </Heading>
      <Controller
        name={FormFields.GATEADRESSE}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            value={field.value ?? ''}
            label='Gateadresse'
            error={fieldState.error?.message}
            onBlur={() => {
              field.onBlur();
              save(FormFields.GATEADRESSE);
            }}
          />
        )}
      />
      <div className='flex gap-4 items-start'>
        <Controller
          name={FormFields.POSTNUMMER}
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              value={field.value ?? ''}
              label='Postnummer'
              htmlSize={12}
              error={fieldState.error?.message}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                clearErrors([FormFields.POSTNUMMER, FormFields.POSTSTED]);
                setValue(FormFields.POSTSTED, '', {
                  shouldDirty: false,
                  shouldValidate: true,
                });
                if (value.length <= 4) field.onChange(value);
                if (value.length === 4) trigger([FormFields.POSTNUMMER]);
              }}
              onBlur={() => {
                field.onBlur();
                save([FormFields.POSTNUMMER, FormFields.POSTSTED]);
              }}
            />
          )}
        />
        <BodyShort
          className={`pt-8 ${useWatch({ control, name: FormFields.POSTSTED }) ? '' : 'aksel-error-message'}`}
        >
          {useWatch({ control, name: FormFields.POSTSTED }) ||
            (watchPostnummer && watchPostnummer.length === 4 && !isLoading
              ? 'Ukjent poststed'
              : '')}
        </BodyShort>
      </div>
    </div>
  );
};
export default StedForm;
