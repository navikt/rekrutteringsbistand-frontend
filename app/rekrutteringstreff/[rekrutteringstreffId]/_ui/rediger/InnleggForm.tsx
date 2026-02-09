'use client';

import KiAnalyse from './ki/KiAnalyseIntro';
import KiAnalysePanel from './ki/KiAnalysePanel';
import { useFormFeltMedKiValidering } from './useFormFeltMedKiValidering';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { useLagringsStatus } from '@/components/autolagre/LagringsStatusContext';
import RikTekstEditor from '@/components/rikteksteditor/RikTekstEditor';
import { BodyShort, Button, Loader, Skeleton } from '@navikt/ds-react';
import { useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';

interface InnleggFormProps {
  onUpdated: () => void;
}

const EDITOR_WRAPPER_ID = 'rediger-innlegg-htmlcontent-form';

const InnleggForm = ({ onUpdated }: InnleggFormProps) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: innleggListe, isLoading } = useInnlegg(rekrutteringstreffId);
  const { nettoLagret } = useLagringsStatus();

  const innlegg = innleggListe?.[0];
  const savedHtmlContent =
    innleggListe !== undefined ? (innlegg?.htmlContent ?? null) : undefined;

  const [editorKey, setEditorKey] = useState(0);
  const harInitialisertRef = useRef(false);

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
    sjekkOgLagre,
    onGodkjennKiFeil,
    control,
    setValue,
    getValues,
  } = useFormFeltMedKiValidering({
    feltType: 'innlegg',
    fieldName: 'htmlContent',
    savedValue: savedHtmlContent,
    onUpdated,
  });

  useEffect(() => {
    if (nettoLagret) return;

    const serverInnhold = innlegg?.htmlContent ?? '';

    if (!harInitialisertRef.current && savedHtmlContent !== undefined) {
      harInitialisertRef.current = true;

      const eksisterendeVerdi = getValues('htmlContent');
      if (eksisterendeVerdi && eksisterendeVerdi.trim().length > 0) {
        return;
      }

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
  }, [
    setValue,
    getValues,
    innlegg?.htmlContent,
    savedHtmlContent,
    nettoLagret,
  ]);

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

            {harEndringer && !hasChecked && (
              <div className='flex justify-start'>
                <Button
                  type='button'
                  variant='secondary'
                  size='small'
                  onClick={() => void sjekkOgLagre()}
                  disabled={validating}
                  icon={validating ? <Loader size='xsmall' /> : undefined}
                >
                  Sjekk og lagre
                </Button>
              </div>
            )}

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
