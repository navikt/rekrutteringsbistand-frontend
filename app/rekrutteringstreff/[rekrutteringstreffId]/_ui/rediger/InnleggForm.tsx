'use client';

import KiAnalyse from './ki/KiAnalyse';
import KiAnalysePanel from './ki/KiAnalysePanel';
import { useInnleggAutosave } from './useAutosave';
import { useFormFeltMedKiValidering } from './useFormFeltMedKiValidering';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import RikTekstEditor from '@/components/rikteksteditor/RikTekstEditor';
import { BodyShort, Label, Skeleton } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface InnleggFormProps {
  onUpdated: () => void;
}

const EDITOR_WRAPPER_ID = 'rediger-innlegg-htmlcontent-form';

const InnleggForm = ({ onUpdated }: InnleggFormProps) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: innleggListe, isLoading } = useInnlegg(rekrutteringstreffId);
  const { formState } = useFormContext();

  const innlegg = innleggListe?.[0];
  const savedHtmlContent = innlegg ? (innlegg.htmlContent ?? null) : undefined;

  const { save: autosaveInnlegg } = useInnleggAutosave();

  const [editorKey, setEditorKey] = useState(Date.now());

  const {
    analyse,
    analyseError,
    validating,
    kiErrorBorder,
    forceSave,
    showAnalysis,
    erRedigeringAvPublisertTreff,
    runValidationAndMaybeSave,
    onForceSave,
    watchedValue: htmlContent,
    control,
    setValue,
    kiLoggLoading,
  } = useFormFeltMedKiValidering({
    feltType: 'innlegg',
    fieldName: 'htmlContent',
    savedValue: savedHtmlContent,
    saveCallback: autosaveInnlegg,
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
    <section className='space-y-3'>
      {(isLoading || kiLoggLoading) && <Skeleton variant='text' />}
      {!isLoading && !kiLoggLoading && (
        <>
          <div className='space-y-2'>
            <Label htmlFor={EDITOR_WRAPPER_ID}>
              {innlegg ? 'Endre innlegg' : 'Skriv nytt innlegg'}
            </Label>
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
                  if (formState.isDirty) {
                    await runValidationAndMaybeSave();
                  }
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

          <KiAnalyse />

          <KiAnalysePanel
            validating={validating}
            analyse={analyse}
            analyseError={analyseError}
            forceSave={forceSave}
            showAnalysis={showAnalysis}
            erRedigeringAvPublisertTreff={erRedigeringAvPublisertTreff}
            onForceSave={onForceSave}
            ariaLabel='Analyse av innlegg'
          />
        </>
      )}
    </section>
  );
};

InnleggForm.displayName = 'InnleggForm';
export default InnleggForm;
