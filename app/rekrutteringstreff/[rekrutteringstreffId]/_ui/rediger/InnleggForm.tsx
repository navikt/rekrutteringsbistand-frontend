'use client';

import { useAutosaveInnlegg } from './hooks/kladd/useAutosaveInnlegg';
import KiAnalyse from './ki/KiAnalyseIntro';
import KiAnalysePanel from './ki/KiAnalysePanel';
import { useFormFeltMedKiValidering } from './useFormFeltMedKiValidering';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import RikTekstEditor from '@/components/rikteksteditor/RikTekstEditor';
import { BodyShort, Skeleton } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

interface InnleggFormProps {
  onUpdated: () => void;
}

const EDITOR_WRAPPER_ID = 'rediger-innlegg-htmlcontent-form';

const InnleggForm = ({ onUpdated }: InnleggFormProps) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: innleggListe, isLoading } = useInnlegg(rekrutteringstreffId);

  const innlegg = innleggListe?.[0];
  const savedHtmlContent = innlegg ? (innlegg.htmlContent ?? null) : undefined;

  const { autosave } = useAutosaveInnlegg();

  const [editorKey, setEditorKey] = useState(Date.now());

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
    kiLoggLoading,
  } = useFormFeltMedKiValidering({
    feltType: 'innlegg',
    fieldName: 'htmlContent',
    savedValue: savedHtmlContent,
    saveCallback: autosave,
    onUpdated,
    requireHasCheckedToShow: true,
  });

  useEffect(() => {
    const content = innlegg?.htmlContent ?? '';
    setValue('htmlContent', content, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
    setEditorKey(Date.now());
  }, [setValue, innlegg?.htmlContent]);

  return (
    <>
      <section className='space-y-3'>
        <KiAnalyse title='Introduksjon' />

        {(isLoading || kiLoggLoading) && <Skeleton variant='text' />}
        {!isLoading && !kiLoggLoading && (
          <>
            <div className='space-y-2'>
              <BodyShort size='small' textColor='subtle'>
                Fortell jobbsøkeren om treffet: de unike fordelene, mulighetene,
                og oppgavene som de vil møte. For eksempel arbeidsgivere,
                forventninger, læring- og karrieremuligheter.
              </BodyShort>
            </div>

            <div
              className={`border rounded-lg ${
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
