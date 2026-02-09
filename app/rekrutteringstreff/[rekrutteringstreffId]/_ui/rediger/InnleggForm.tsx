'use client';

import KiAnalysePanel from './ki/KiAnalysePanel';
import { useFormFeltMedKiValidering } from './useFormFeltMedKiValidering';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg';
import KiAnalyseIntro from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/rediger/ki/KiAnalyseIntro';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { useLagringsStatus } from '@/components/autolagre/LagringsStatusContext';
import RikTekstEditor from '@/components/rikteksteditor/RikTekstEditor';
import { BodyShort, Skeleton } from '@navikt/ds-react';
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
    // Ignorer SWR-oppdateringer som kommer rett etter en lagring vi selv initierte
    // for å unngå at fokus mistes i editoren
    if (nettoLagret) return;

    const serverInnhold = innlegg?.htmlContent ?? '';

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
  }, [setValue, innlegg?.htmlContent, savedHtmlContent, nettoLagret]);

  return (
    <>
      <section className='space-y-3'>
        <KiAnalyseIntro title='Introduksjon' />

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
