'use client';

import { usePamPostdata } from '@/app/api/pam-geografi/postdata/[postnummer]/usePamPostdata';
import { useRekrutteringstreffData } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useRekrutteringstreffData';
import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { BodyShort, ErrorMessage, Heading, TextField } from '@navikt/ds-react';
import { useEffect } from 'react';
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
  const watchPostnummer = useWatch({ control, name: FormFields.POSTNUMMER });
  const { data: postdata, isLoading } = usePamPostdata(watchPostnummer || '');
  const { harPublisert } = useRekrutteringstreffData();

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
          <div className='mb-6'>
            <TextField
              {...field}
              value={field.value ?? ''}
              label='Gateadresse'
              error={
                fieldState.error?.message || (harPublisert && !field.value)
              }
              maxLength={100}
              onBlur={field.onBlur}
              className='mb-2'
            />
            {harPublisert && !field.value && (
              <ErrorMessage className='flex items-center pt-0'>
                <ExclamationmarkTriangleIcon className='mr-1' />
                Gateadresse må fylles ut
              </ErrorMessage>
            )}
          </div>
        )}
      />

      <div className='flex items-start gap-4'>
        <Controller
          name={FormFields.POSTNUMMER}
          control={control}
          render={({ field, fieldState }) => (
            <div className='mb-6'>
              <TextField
                {...field}
                value={field.value ?? ''}
                label='Postnummer'
                htmlSize={12}
                error={
                  fieldState.error?.message ||
                  (harPublisert && field.value?.length != 4)
                }
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
                onBlur={field.onBlur}
                className='mb-2'
              />
              {harPublisert && field.value?.length != 4 && (
                <ErrorMessage className='flex items-center pt-0'>
                  <ExclamationmarkTriangleIcon className='mr-1' />
                  Postnummer må fylles ut
                </ErrorMessage>
              )}
            </div>
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
