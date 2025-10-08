'use client';

import KiAnalyse from './ki/KiAnalyse';
import KiAnalysePanel from './ki/KiAnalysePanel';
import { useInnleggAutosave } from './useAutosave';
import { useKiAnalyse } from './useKiAnalyse';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg';
import { useKiLogg } from '@/app/api/rekrutteringstreff/kiValidering/useKiLogg';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_contexts/RekrutteringstreffContext';
import RikTekstEditor from '@/components/felles/rikteksteditor/RikTekstEditor';
import { RekbisError } from '@/util/rekbisError';
import { BodyShort, Label, Skeleton } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

interface InnleggFormProps {
  onUpdated: () => void;
}

const EDITOR_WRAPPER_ID = 'rediger-innlegg-htmlcontent-form';

const InnleggForm = ({ onUpdated }: InnleggFormProps) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: innleggListe, isLoading } = useInnlegg(rekrutteringstreffId);

  const innlegg = innleggListe?.[0];
  const savedHtmlContent = innlegg ? (innlegg.htmlContent ?? null) : undefined;

  const {
    control,
    setValue,
    getValues,
    trigger: triggerRHF,
    formState: { isDirty },
  } = useFormContext();

  const { save: autosaveInnlegg } = useInnleggAutosave();

  const { setLagret: setKiLagret } = useKiLogg(rekrutteringstreffId, 'innlegg');

  const [editorKey, setEditorKey] = useState(Date.now());

  const htmlContent = useWatch({ control, name: 'htmlContent' });

  useEffect(() => {
    const content = innlegg?.htmlContent ?? '';
    setValue('htmlContent', content, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
    setEditorKey(Date.now());
  }, [setValue, innlegg?.htmlContent]);

  const saveCallback = async (force?: boolean) => {
    try {
      await autosaveInnlegg(['htmlContent'], force);
    } catch (error) {
      new RekbisError({ message: 'Lagring av innlegg feilet.', error });
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
    showAnalysis,
    erRedigeringAvPublisertTreff,
    runValidationAndMaybeSave,
    onForceSave,
  } = useKiAnalyse({
    feltType: 'innlegg',
    fieldName: 'htmlContent',
    watchedValue: htmlContent,
    triggerRHF,
    getValues,
    setValue,
    setKiFeilFieldName: 'innleggKiFeil' as any,
    saveCallback,
    setKiLagret,
    requireHasCheckedToShow: true,
    setKiSjekketFieldName: 'innleggKiSjekket' as any,
    savedValue: savedHtmlContent,
  });

  return (
    <section className='space-y-3'>
      {isLoading && <Skeleton variant='text' />}
      {!isLoading && (
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
                  if (isDirty) {
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
            variant='innlegg'
            ariaLabel='Analyse av innlegg'
          />
        </>
      )}
    </section>
  );
};

InnleggForm.displayName = 'InnleggForm';
export default InnleggForm;
