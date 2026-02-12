'use client';

import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import KiAnalysePanel from './ki/KiAnalysePanel';
import { useFormFeltMedKiValidering } from './useFormFeltMedKiValidering';
import { MAX_TITLE_LENGTH } from '@/app/api/rekrutteringstreff/[...slug]/mutations';
import KiAnalyseIntro from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/rediger/ki/KiAnalyseIntro';
import { XMarkIcon } from '@navikt/aksel-icons';
import { Button, Detail, Loader, TextField } from '@navikt/ds-react';
import { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const DEFAULT_TITTEL = 'Treff uten navn';

interface TittelFormProps {
  onUpdated: () => void;
}

const TittelForm = ({ onUpdated }: TittelFormProps) => {
  const { treff } = useRekrutteringstreffData();
  const savedTittel = treff ? (treff.tittel ?? null) : undefined;

  const { clearErrors } = useFormContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    analyse,
    analyseError,
    validating,
    kiErrorBorder,
    harGodkjentKiFeil,
    hasChecked,
    harEndringer,
    showAnalysis,
    erRedigeringAvPublisertTreff,
    sjekkKnappTekst,
    sjekkKnappId,
    visSjekkPåminnelse,
    onKiFeltBlur,
    sjekkOgLagre,
    onGodkjennKiFeil,
    watchedValue: tittel,
    control,
    setValue,
  } = useFormFeltMedKiValidering({
    feltType: 'tittel',
    fieldName: 'tittel',
    savedValue: savedTittel,
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

  return (
    <section
      className='space-y-3'
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          onKiFeltBlur();
        }
      }}
    >
      <KiAnalyseIntro title='Navn på treffet' />

      <div>
        <div className='relative w-full'>
          {tittel && (
            <Button
              type='button'
              onClick={clear}
              aria-label='Tøm tittel feltet'
              variant='tertiary'
              size='small'
              className='absolute top-[2rem] right-2 h-8 -translate-y-1/2 p-1'
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
                    (visSjekkPåminnelse
                      ? 'Teksten må sjekkes før du kan gå videre'
                      : undefined) ||
                    (kiErrorBorder ? 'Brudd på retningslinjer' : undefined)
                  }
                  aria-invalid={
                    !!(fieldState.error || visSjekkPåminnelse || kiErrorBorder)
                  }
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
                  onBlur={() => {
                    field.onBlur();
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
                    }
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className='pt-3'>
          <Detail className='text-gray-400'>{tegnIgjen} tegn igjen</Detail>
        </div>
      </div>

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

      <Button
        id={sjekkKnappId}
        type='button'
        variant='primary'
        onClick={() => void sjekkOgLagre()}
        disabled={!harEndringer || hasChecked || validating}
        icon={validating ? <Loader size='xsmall' /> : undefined}
      >
        {sjekkKnappTekst}
      </Button>
    </section>
  );
};

TittelForm.displayName = 'TittelForm';
export default TittelForm;
