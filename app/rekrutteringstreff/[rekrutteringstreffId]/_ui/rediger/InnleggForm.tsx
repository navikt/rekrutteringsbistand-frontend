'use client';

import KiAnalyse from './ki/KiAnalyseIntro';
import KiAnalysePanel from './ki/KiAnalysePanel';
import { useFormFeltMedKiValidering } from './useFormFeltMedKiValidering';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import RikTekstEditor from '@/components/rikteksteditor/RikTekstEditor';
import { BodyShort, Skeleton } from '@navikt/ds-react';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface InnleggFormProps {
  onUpdated: () => void;
}

const EDITOR_WRAPPER_ID = 'rediger-innlegg-htmlcontent-form';

const InnleggForm = ({ onUpdated }: InnleggFormProps) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: innleggListe, isLoading } = useInnlegg(rekrutteringstreffId);
  const { getValues } = useFormContext();

  const innlegg = innleggListe?.[0];
  const savedHtmlContent = innlegg ? (innlegg.htmlContent ?? null) : undefined;

  const [editorKey, setEditorKey] = useState(0);
  const harInitialisertRef = useRef(false);

  const {
    analyse,
    analyseError,
    validating,
    kiErrorBorder,
    harGodkjentKiFeil,
    showAnalysis,
    erRedigeringAvPublisertTreff,
    validerMedKiOgLagreVedGodkjenning,
    onGodkjennKiFeil,
    control,
    setValue,
  } = useFormFeltMedKiValidering({
    feltType: 'innlegg',
    fieldName: 'htmlContent',
    savedValue: savedHtmlContent,
    onUpdated,
  });

  useEffect(() => {
    // Bare initialiser editoren første gang, eller når innholdet er nytt fra serveren
    // og skjemaet ikke har egne ulagrede endringer (for å unngå å overskrive brukerens input)
    const serverInnhold = innlegg?.htmlContent ?? '';
    const skjemaInnhold = getValues('htmlContent') ?? '';

    // Ved første lasting, initialiser alltid
    if (!harInitialisertRef.current && savedHtmlContent !== undefined) {
      harInitialisertRef.current = true;
      setValue('htmlContent', serverInnhold, {
        shouldDirty: false,
        shouldTouch: false,
        shouldValidate: false,
      });
      const timeout = window.setTimeout(() => {
        setEditorKey((prev) => prev + 1);
      }, 0);
      return () => window.clearTimeout(timeout);
    }

    // Etter initialisering, bare oppdater hvis server har annet innhold enn skjema
    // (f.eks. ved ekstern oppdatering), men ikke ved vår egen lagring
    if (harInitialisertRef.current && serverInnhold !== skjemaInnhold) {
      // Sjekk om dette er en ekstern endring (innholdet er ulikt det vi har i skjemaet)
      // Ved autolagre vil server-innholdet bli likt skjema-innholdet, så denne blokken kjører ikke
      setValue('htmlContent', serverInnhold, {
        shouldDirty: false,
        shouldTouch: false,
        shouldValidate: false,
      });
      const timeout = window.setTimeout(() => {
        setEditorKey((prev) => prev + 1);
      }, 0);
      return () => window.clearTimeout(timeout);
    }
  }, [setValue, innlegg?.htmlContent, savedHtmlContent, getValues]);

  return (
    <>
      <section className='space-y-3'>
        <KiAnalyse title='Introduksjon' />

        {isLoading && <Skeleton variant='text' />}
        {!isLoading && (
          <>
            <div className='space-y-2'>
              <BodyShort size='small' textColor='subtle'>
                Fortell jobbsøkeren om treffet: de unike fordelene, mulighetene,
                og oppgavene som de vil møte. For eksempel arbeidsgivere,
                forventninger, læring- og karrieremuligheter.
              </BodyShort>
            </div>

            <div
              className={`rounded-lg border ${
                kiErrorBorder ? 'border-red-500' : 'border-gray-300'
              }`}
              onBlur={(e) => {
                const currentTarget = e.currentTarget;
                setTimeout(async () => {
                  if (!currentTarget.contains(document.activeElement)) {
                    await validerMedKiOgLagreVedGodkjenning();
                  }
                }, 0);
              }}
            >
              <Controller
                name='htmlContent'
                control={control}
                render={({ field }) => (
                  <RikTekstEditor
                    key={editorKey}
                    id={EDITOR_WRAPPER_ID}
                    tekst={field.value ?? ''}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <KiAnalysePanel
              validating={validating}
              analyse={analyse}
              analyseError={analyseError}
              harGodkjentKiFeil={harGodkjentKiFeil}
              showAnalysis={showAnalysis}
              erRedigeringAvPublisertTreff={erRedigeringAvPublisertTreff}
              onGodkjennKiFeil={onGodkjennKiFeil}
              ariaLabel='Analyse av innlegg'
            />
          </>
        )}
      </section>
    </>
  );
};

InnleggForm.displayName = 'InnleggForm';
export default InnleggForm;
