'use client';

import { useRekrutteringstreffData } from '../hooks/useRekrutteringstreffData';
import KiAnalyse from './ki/KiAnalyse';
import KiAnalysePanel from './ki/KiAnalysePanel';
import { useAutosave } from './useAutosave';
import { useFormFeltMedKiValidering } from './useFormFeltMedKiValidering';
import { MAX_TITLE_LENGTH } from '@/app/api/rekrutteringstreff/[...slug]/mutations';
import { XMarkIcon } from '@navikt/aksel-icons';
import { Button, Detail, Skeleton, TextField, Heading } from '@navikt/ds-react';
import React, { useRef, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const DEFAULT_TITTEL = 'Treff uten navn';

interface TittelFormProps {
  onUpdated: () => void;
}

const TittelForm = ({ onUpdated }: TittelFormProps) => {
  const { treff, harPublisert } = useRekrutteringstreffData();
  const savedTittel = treff ? (treff.tittel ?? null) : undefined;

  const {
    clearErrors,
    formState: { isSubmitting },
  } = useFormContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const { save } = useAutosave();

  const {
    analyse,
    analyseError,
    validating,
    kiErrorBorder,
    harGodkjentKiFeil,
    showAnalysis,
    erRedigeringAvPublisertTreff,
    runValidationAndMaybeSave,
    onGodkjennKiFeil,
    watchedValue: tittel,
    control,
    setValue,
    kiLoggLoading,
  } = useFormFeltMedKiValidering({
    feltType: 'tittel',
    fieldName: 'tittel',
    savedValue: savedTittel,
    saveCallback: save,
    onUpdated,
  });

  const tegnIgjen =
    MAX_TITLE_LENGTH - (typeof tittel === 'string' ? tittel.length : 0);

  const clear = () => {
    setValue('tittel', '', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    inputRef.current?.focus();
  };

  // Sett initial fokus på tittelfeltet i kladd-modus hvis tittel mangler eller er default
  useEffect(() => {
    if (!treff || kiLoggLoading) return;

    const erIKladdModus = !harPublisert;
    const tittelVerdi = (tittel ?? '').trim();
    const tittelMangler =
      tittelVerdi.length === 0 || tittelVerdi === DEFAULT_TITTEL;

    if (erIKladdModus && tittelMangler && inputRef.current) {
      // Sett fokus med en liten delay for å sikre at DOM er klar
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [treff, kiLoggLoading, tittel, harPublisert]);

  return (
    <section className='space-y-3'>
      {kiLoggLoading && <Skeleton variant='text' />}
      {!kiLoggLoading && (
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
                className='absolute right-2 top-[2rem] -translate-y-1/2 h-8 p-1'
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
                      setTimeout(async () => {
                        if (!validating && !isSubmitting) {
                          await runValidationAndMaybeSave();
                        }
                      }, 0);
                    }}
                    onFocus={() => {
                      const current = field.value;
                      if (!current || typeof current !== 'string') return;

                      const erDefaultTittel = current.trim() === DEFAULT_TITTEL;

                      if (erDefaultTittel) {
                        setValue('tittel', '', {
                          shouldValidate: false,
                          shouldDirty: false,
                          shouldTouch: false,
                        });
                      }
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
            harGodkjentKiFeil={harGodkjentKiFeil}
            showAnalysis={showAnalysis}
            erRedigeringAvPublisertTreff={erRedigeringAvPublisertTreff}
            onGodkjennKiFeil={onGodkjennKiFeil}
            ariaLabel='Analyse av tittel'
          />
        </>
      )}
    </section>
  );
};

TittelForm.displayName = 'TittelForm';
export default TittelForm;
