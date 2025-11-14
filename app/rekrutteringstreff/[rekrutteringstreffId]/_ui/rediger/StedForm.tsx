'use client';

import { useAutosaveRekrutteringstreff } from './hooks/kladd/useAutosave';
import { usePamPostdata } from '@/app/api/pam-geografi/postdata/[postnummer]/usePamPostdata';
import { BodyShort, Heading, TextField } from '@navikt/ds-react';
import { useEffect } from 'react';
import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

const FormFields = {
  GATEADRESSE: 'gateadresse',
  POSTNUMMER: 'postnummer',
  POSTSTED: 'poststed',
  FYLKE: 'fylke',
  FYLKESNUMMER: 'fylkesnummer',
  KOMMUNE: 'kommune',
  KOMMUNENUMMER: 'kommunenummer',
} as const;

const StedForm = ({ control }: any) => {
  const { setValue, clearErrors, setError, trigger } = useFormContext();
  const { autosave } = useAutosaveRekrutteringstreff();
  const watchPostnummer = useWatch({ control, name: FormFields.POSTNUMMER });
  const { data: postdata, isLoading } = usePamPostdata(watchPostnummer || '');

  useEffect(() => {
    if (!watchPostnummer || watchPostnummer.length !== 4 || isLoading) return;

    const dirtyAndValidate = {
      shouldDirty: true,
      shouldValidate: true,
    };
    if (postdata?.korrigertNavnBy) {
      setValue(FormFields.POSTSTED, postdata.korrigertNavnBy, dirtyAndValidate);
      setValue(
        FormFields.KOMMUNE,
        postdata.kommune.korrigertNavn,
        dirtyAndValidate,
      );
      setValue(
        FormFields.KOMMUNENUMMER,
        postdata.kommune.kommunenummer,
        dirtyAndValidate,
      );
      setValue(
        FormFields.FYLKE,
        postdata.fylke.korrigertNavn,
        dirtyAndValidate,
      );
      setValue(
        FormFields.FYLKESNUMMER,
        postdata.fylke.fylkesnummer,
        dirtyAndValidate,
      );
      clearErrors(FormFields.POSTSTED);
    } else {
      setValue(FormFields.POSTSTED, '', dirtyAndValidate);
      setValue(FormFields.KOMMUNE, '', dirtyAndValidate);
      setValue(FormFields.KOMMUNENUMMER, '', dirtyAndValidate);
      setValue(FormFields.FYLKE, '', dirtyAndValidate);
      setValue(FormFields.FYLKESNUMMER, '', dirtyAndValidate);
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
            maxLength={100}
            onBlur={() => {
              field.onBlur();
              autosave([FormFields.GATEADRESSE]);
            }}
          />
        )}
      />
      <div className='flex items-start gap-4'>
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
                autosave([FormFields.POSTNUMMER, FormFields.POSTSTED]);
              }}
            />
          )}
        />
        <BodyShort
          className={`mt-3 pt-8 ${useWatch({ control, name: FormFields.POSTSTED }) ? '' : 'aksel-error-message'}`}
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
