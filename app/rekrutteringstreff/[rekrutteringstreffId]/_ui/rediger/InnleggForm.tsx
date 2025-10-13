'use client';

import KiAnalyse from './ki/KiAnalyse';
import KiAnalysePanel from './ki/KiAnalysePanel';
import { useInnleggAutosave } from './useAutosave';
import { useFormFeltMedKiValidering } from './useFormFeltMedKiValidering';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import RikTekstEditor from '@/components/rikteksteditor/RikTekstEditor';
import { BodyShort, Detail, Heading, Skeleton, Tag } from '@navikt/ds-react';
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
    harGodkjentKiFeil,
    showAnalysis,
    erRedigeringAvPublisertTreff,
    runValidationAndMaybeSave,
    onGodkjennKiFeil,
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
    <>
      <section className='space-y-3'>
        <div className='flex items-center gap-2'>
          <Heading level='2' size='medium'>
            Introduksjon
          </Heading>
          <Tag variant='alt1' size='medium'>
            KI-støtte
          </Tag>
        </div>
        <Detail className='text-[var(--ax-text-neutral-subtle)]'>
          Ikke skriv <u>personopplysninger</u> og <u>diskriminerende</u>{' '}
          innhold.
        </Detail>

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
