'use client';

import { erEditMode, erPublisert } from './autosaveUtils';
import { useInnleggAutosave } from './useInnleggAutosave';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { useKiLogg } from '@/app/api/rekrutteringstreff/kiValidering/useKiLogg';
import { useValiderRekrutteringstreff } from '@/app/api/rekrutteringstreff/kiValidering/useValiderRekrutteringstreff';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import RikTekstEditor from '@/components/felles/rikteksteditor/RikTekstEditor';
import { RekbisError } from '@/util/rekbisError';
import {
  EyeIcon,
  PersonCircleIcon,
  RobotFrownIcon,
  RobotIcon,
  RobotSmileIcon,
} from '@navikt/aksel-icons';
import {
  Alert,
  BodyLong,
  BodyShort,
  Button,
  Detail,
  Label,
  Skeleton,
} from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import { AnimatePresence, cubicBezier, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

interface EndreInnleggProps {
  onUpdated: () => void;
}

const ease = cubicBezier(0.16, 1, 0.3, 1);
const EDITOR_WRAPPER_ID = 'rediger-innlegg-htmlcontent-form';

const EndreInnlegg = ({ onUpdated }: EndreInnleggProps) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: innleggListe, isLoading } = useInnlegg(rekrutteringstreffId);

  const innlegg = innleggListe?.[0];

  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);
  const publisertRedigeringsmodus = erPublisert(treff as any) && erEditMode();

  const {
    control,
    setValue,
    getValues,
    trigger: triggerRHF,
    formState: { isDirty, isSubmitting },
  } = useFormContext();

  const { save: autosaveInnlegg } = useInnleggAutosave();

  const { setLagret: setKiLagret } = useKiLogg(rekrutteringstreffId, 'innlegg');
  const {
    trigger: validateKI,
    data: analyse,
    reset: resetAnalyse,
    error: analyseError,
    isMutating: validating,
  } = useValiderRekrutteringstreff();

  const skeletonRef = useRef<HTMLDivElement>(null);
  const analyseRef = useRef<HTMLDivElement>(null);

  const [hasChecked, setHasChecked] = useState(false);
  const [forceSave, setForceSave] = useState(false);
  const [loggId, setLoggId] = useState<string | null>(null);
  const [editorKey, setEditorKey] = useState(Date.now());

  const htmlContent = useWatch({ control, name: 'htmlContent' });

  useEffect(() => {
    const content = innlegg?.htmlContent ?? '';
    setValue('htmlContent', content, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
    setHasChecked(false);
    setForceSave(false);
    setLoggId(null);
    setEditorKey(Date.now());
  }, [innlegg?.id, setValue]);

  useEffect(() => {
    if (isDirty) {
      setHasChecked(false);
      setForceSave(false);
      setLoggId(null);
      resetAnalyse();
    }
  }, [htmlContent, isDirty, resetAnalyse]);

  const kiErrorBorder =
    !!analyse && !analyseError && analyse?.bryterRetningslinjer && !forceSave;

  useEffect(() => {
    const feil =
      !!analyse &&
      !analyseError &&
      !!analyse?.bryterRetningslinjer &&
      !forceSave;
    setValue('innleggKiFeil' as any, feil as any, {
      shouldDirty: false,
      shouldValidate: false,
      shouldTouch: false,
    });
  }, [analyse, analyseError, forceSave, setValue]);

  const save = async (currentLoggId: string | null, force?: boolean) => {
    try {
      await autosaveInnlegg(['htmlContent'], force);
      if (currentLoggId) {
        try {
          await setKiLagret({ id: currentLoggId, lagret: true });
        } catch (error) {
          new RekbisError({
            message: `Feil ved oppdatering av /lagret for logg ${currentLoggId}.`,
            error,
          });
        }
      }
      onUpdated?.();
    } catch (error) {
      new RekbisError({ message: 'Lagring av innlegg feilet.', error });
    }
  };

  const runValidationAndMaybeSave = async () => {
    // Ved publisert i redigeringsmodus: kjør validering og vis analyse, men ikke lagre automatisk
    const ok = await triggerRHF('htmlContent');
    if (!ok) return;

    const content = getValues('htmlContent');
    if (!content?.trim()) return;

    try {
      const validationResult = await validateKI({
        treffId: rekrutteringstreffId,
        feltType: 'innlegg',
        tekst: content,
      });

      setHasChecked(true);

      if (!validationResult) {
        logger.error('Validation did not return a result.');
        return;
      }

      const currentLoggId = validationResult.loggId ?? null;
      setLoggId(currentLoggId);

      const bryterRetningslinjer = validationResult.bryterRetningslinjer;
      const kanLagre = !bryterRetningslinjer || forceSave;

      // I publisert redigeringsmodus: ikke lagre automatisk, men vis analyse
      if (kanLagre && !publisertRedigeringsmodus) {
        await save(currentLoggId);
      }
    } catch (error) {
      new RekbisError({ message: 'Validation failed:', error });
      setHasChecked(true);
    }
  };

  const onForceSave = async () => {
    // Ved publisert redigeringsmodus: ikke lagre nå, bare tillat brudd og fortsett i formet
    if (publisertRedigeringsmodus) {
      setForceSave(true);
      return;
    }
    setForceSave(true);
    await save(loggId);
  };

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

          <div className='space-y-1'>
            <Detail
              size='small'
              className='flex items-start gap-2 text-gray-400'
            >
              <PersonCircleIcon
                aria-hidden
                className='h-6 w-6 shrink-0 self-start mt-0.5'
              />
              <span>
                Ikke skriv personopplysninger og diskriminerende innhold. KI
                hjelper deg å vurdere innholdet, men du er ansvarlig.
              </span>
            </Detail>
            <Detail
              size='small'
              className='flex items-start gap-2 text-gray-400'
            >
              <EyeIcon aria-hidden fontSize='2em' className='mt-0.5' />
              <span>
                Synlig for jobbsøker, arbeidsgivere og NAV-ansatte når treffet
                er publisert.
              </span>
            </Detail>
          </div>

          <div className='flex gap-3 mt-2 items-start'>
            <div className='inline-flex justify-center items-start w-10 pt-1'>
              {validating ? (
                <RobotIcon
                  aria-hidden
                  fontSize='2em'
                  className='text-gray-700'
                />
              ) : analyse && !analyseError && hasChecked ? (
                analyse.bryterRetningslinjer ? (
                  <RobotFrownIcon
                    aria-hidden
                    fontSize='2em'
                    className='text-red-600'
                  />
                ) : (
                  <RobotSmileIcon
                    aria-hidden
                    fontSize='2em'
                    className='text-green-800'
                  />
                )
              ) : analyseError ? (
                <RobotFrownIcon
                  aria-hidden
                  fontSize='2em'
                  className='text-red-600'
                />
              ) : null}
            </div>

            <div className='w-full'>
              <AnimatePresence mode='wait'>
                {validating && (
                  <motion.div
                    key='skeleton'
                    ref={skeletonRef}
                    tabIndex={0}
                    role='status'
                    aria-label='Validerer innlegg'
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease }}
                    onAnimationComplete={() => skeletonRef.current?.focus()}
                  >
                    <Skeleton variant='text' width='100%' height={31} />
                    <Skeleton variant='text' width='100%' height={31} />
                    <Skeleton variant='text' width='100%' height={31} />
                    <Skeleton variant='text' width='100%' height={31} />
                    <Skeleton variant='text' width='100%' height={31} />
                    <Skeleton variant='text' width='100%' height={31} />
                  </motion.div>
                )}

                {!validating && analyseError && (
                  <motion.div
                    key='error'
                    ref={analyseRef}
                    tabIndex={0}
                    role='alert'
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease }}
                    onAnimationComplete={() => analyseRef.current?.focus()}
                  >
                    <Alert variant='error'>
                      {analyseError.message ??
                        'En feil oppstod under validering.'}
                    </Alert>
                  </motion.div>
                )}

                {!validating && analyse && !analyseError && hasChecked && (
                  <motion.div
                    key='analyse'
                    ref={analyseRef}
                    tabIndex={0}
                    role='region'
                    aria-label='Analyse av innlegg'
                    className={
                      analyse.bryterRetningslinjer
                        ? 'aksel-error-message p-1'
                        : 'text-green-700 p-1'
                    }
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                  >
                    <BodyLong>{analyse.begrunnelse}</BodyLong>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {hasChecked && analyse?.bryterRetningslinjer && !forceSave && (
            <div className='pt-1'>
              <Button size='small' variant='secondary' onClick={onForceSave}>
                {publisertRedigeringsmodus ? 'Bruk likevel' : 'Lagre likevel'}
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

EndreInnlegg.displayName = 'EndreInnlegg';
export default EndreInnlegg;
