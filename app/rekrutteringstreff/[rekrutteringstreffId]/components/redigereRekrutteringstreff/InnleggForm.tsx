'use client';

import KiAnalyse from './ki/KiAnalyse';
import KiAnalysePanel from './ki/KiAnalysePanel';
import { useInnleggAutosave } from './useInnleggAutosave';
import { useKiAnalyse } from './useKiAnalyse';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { useKiLogg } from '@/app/api/rekrutteringstreff/kiValidering/useKiLogg';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
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

  const {
    control,
    setValue,
    getValues,
    trigger: triggerRHF,
    formState: { isDirty, isSubmitting },
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
  }, [innlegg?.id, setValue]);

  const saveCallback = async (force?: boolean) => {
    try {
      await autosaveInnlegg(['htmlContent'], force);
      onUpdated?.();
    } catch (error) {
      new RekbisError({ message: 'Lagring av innlegg feilet.', error });
    }
  };

  const {
    analyse,
    analyseError,
    validating,
    kiErrorBorder,
    forceSave,
    setForceSave,
    showAnalysis,
    publisertRedigeringsmodus,
    runValidationAndMaybeSave,
    onForceSave,
  } = useKiAnalyse({
    feltType: 'innlegg',
    fieldName: 'htmlContent',
    watchedValue: htmlContent,
    triggerRHF,
    getValues,
    setValue,
    isSubmitting,
    setKiFeilFieldName: 'innleggKiFeil' as any,
    saveCallback,
    setKiLagret,
    requireHasCheckedToShow: true,
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
              Dette innlegget vises til jobbsøkerne før treffet. Skriv gjerne en
              hyggelig introduksjon og praktisk informasjon.
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
            publisertRedigeringsmodus={publisertRedigeringsmodus}
            onForceSave={onForceSave}
            setForceSave={setForceSave}
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
