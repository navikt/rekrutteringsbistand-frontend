'use client';

import KiAnalysePanel from './ki/KiAnalysePanel';
import { useAutosave } from './useAutosave';
import { useKiAnalyse } from './useKiAnalyse';
import { useKiLogg } from '@/app/api/rekrutteringstreff/kiValidering/useKiLogg';
import { MAX_TITLE_LENGTH } from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import KiAnalyse from '@/app/rekrutteringstreff/[rekrutteringstreffId]/components/redigereRekrutteringstreff/ki/KiAnalyse';
import { RekbisError } from '@/util/rekbisError';
import { XMarkIcon } from '@navikt/aksel-icons';
import { Button, Detail, Skeleton, TextField, Heading } from '@navikt/ds-react';
import React, { useRef } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

interface TittelFormProps {
  onUpdated: () => void;
}

const TittelForm = ({ onUpdated }: TittelFormProps) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const { setLagret: setKiLagret, isLoading } = useKiLogg(
    rekrutteringstreffId,
    'tittel',
  );

  const {
    control,
    setValue,
    getValues,
    trigger: triggerRHF,
    clearErrors,
    formState: { isSubmitting },
  } = useFormContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const tittel = useWatch({ control, name: 'tittel' });
  const tegnIgjen =
    MAX_TITLE_LENGTH - (typeof tittel === 'string' ? tittel.length : 0);

  const { save } = useAutosave();

  const saveCallback = async (force?: boolean) => {
    try {
      await save(['tittel'], force);
    } catch (error) {
      new RekbisError({ message: 'Lagring av tittel feilet.', error });
    } finally {
      onUpdated?.();
    }
  };

  const {
    analyse,
    analyseError,
    validating,
    kiErrorBorder,
    forceSave,
    publisertRedigeringsmodus,
    runValidationAndMaybeSave,
    onForceSave,
  } = useKiAnalyse({
    feltType: 'tittel',
    fieldName: 'tittel',
    watchedValue: tittel,
    triggerRHF,
    getValues,
    setValue,
    isSubmitting,
    setKiFeilFieldName: 'tittelKiFeil' as any,
    saveCallback,
    setKiLagret,
    setKiSjekketFieldName: 'tittelKiSjekket' as any,
  });

  const clear = () => {
    setValue('tittel', '', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    inputRef.current?.focus();
  };

  return (
    <section className='space-y-3'>
      {isLoading && <Skeleton variant='text' />}
      {!isLoading && (
        <>
          <Heading level='2' size='medium'>
            Navn på treffet
          </Heading>

          <div className='relative w-full'>
            {tittel && (
              <Button
                type='button'
                onClick={clear}
                aria-label='Tøm tittel feltet'
                variant='tertiary'
                size='small'
                className='absolute right-2 top-[4rem] -translate-y-1/2 h-8 p-1'
                title='Tøm feltet'
              >
                <XMarkIcon aria-hidden fontSize='1.25rem' />
              </Button>
            )}

            <div className='flex items-start'>
              <Controller
                control={control}
                name='tittel'
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    value={field.value ?? ''}
                    ref={(el) => {
                      field.ref(el);
                      inputRef.current = el as HTMLInputElement | null;
                    }}
                    label='Navn på treffet'
                    hideLabel
                    maxLength={MAX_TITLE_LENGTH}
                    className='w-full pt-2'
                    error={
                      fieldState.error?.message ||
                      (kiErrorBorder ? 'Brudd på retningslinjer' : undefined)
                    }
                    aria-invalid={!!(fieldState.error || kiErrorBorder)}
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    onChange={(e) => {
                      field.onChange(e);
                      const v = (e.target as HTMLInputElement).value;
                      if (v.trim().length > 0) {
                        clearErrors('tittel');
                      }
                    }}
                    onBlur={async () => {
                      field.onBlur();
                      await runValidationAndMaybeSave();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        (async () => {
                          const el = e.currentTarget as HTMLInputElement;
                          await runValidationAndMaybeSave();
                          el?.blur();
                        })();
                      }
                    }}
                  />
                )}
              />
            </div>
          </div>

          <Detail className='text-gray-400'>{tegnIgjen} tegn igjen</Detail>

          <KiAnalyse />

          <KiAnalysePanel
            validating={validating}
            analyse={analyse}
            analyseError={analyseError}
            forceSave={forceSave}
            showAnalysis={true}
            publisertRedigeringsmodus={publisertRedigeringsmodus}
            onForceSave={onForceSave}
            variant='tittel'
            ariaLabel='Analyse av tittel'
          />
        </>
      )}
    </section>
  );
};

TittelForm.displayName = 'TittelForm';
export default TittelForm;
