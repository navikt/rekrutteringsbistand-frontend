'use client';

import { RobotFrownIcon, RobotIcon, RobotSmileIcon } from '@navikt/aksel-icons';
import { Alert, BodyLong, Skeleton, Switch } from '@navikt/ds-react';
import React, { useEffect, useMemo, useRef } from 'react';

export type KiAnalyseVariant = 'tittel' | 'innlegg';

type BlockKind = 'none' | 'skeleton' | 'error' | 'text';

interface KiAnalysePanelProps {
  validating: boolean;
  analyse: any | undefined;
  analyseError: any | undefined;
  forceSave: boolean;
  showAnalysis: boolean;
  publisertRedigeringsmodus: boolean;
  onForceSave: () => void;
  setForceSave: (val: boolean) => void;
  variant: KiAnalyseVariant;
  ariaLabel: string;
}

const KiAnalysePanel: React.FC<KiAnalysePanelProps> = ({
  validating,
  analyse,
  analyseError,
  forceSave,
  showAnalysis,
  publisertRedigeringsmodus,
  onForceSave,
  setForceSave,
  variant,
  ariaLabel,
}) => {
  const hasAnalyse = !!analyse && !analyseError;
  const bryter = hasAnalyse ? !!(analyse as any)?.bryterRetningslinjer : false;
  const allowIconFromAnalysis =
    variant === 'tittel' ? hasAnalyse : hasAnalyse && showAnalysis;
  const shouldShowIcon = validating || allowIconFromAnalysis || !!analyseError;

  const showTextBlock: BlockKind = useMemo(() => {
    if (validating) return 'skeleton';
    if (!validating && analyseError) return 'error';
    if (!validating && hasAnalyse && showAnalysis) {
      return 'text';
    }
    return 'none';
  }, [validating, analyseError, hasAnalyse, showAnalysis]);

  const skeletonRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showTextBlock === 'error') errorRef.current?.focus();
    if (showTextBlock === 'text') textRef.current?.focus();
  }, [showTextBlock]);

  return (
    <div className='mt-2'>
      <div className='flex gap-3 items-start'>
        <div className='inline-flex justify-center items-start w-10 pt-1'>
          {shouldShowIcon ? (
            validating ? (
              <RobotIcon aria-hidden fontSize='2em' className='text-gray-700' />
            ) : analyseError ? (
              <RobotFrownIcon
                aria-hidden
                fontSize='2em'
                className='text-red-600'
              />
            ) : hasAnalyse ? (
              bryter ? (
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
            ) : null
          ) : null}
        </div>

        <div className='w-full'>
          {showTextBlock === 'skeleton' && (
            <div
              ref={skeletonRef}
              tabIndex={-1}
              role='status'
              aria-live='polite'
              aria-busy='true'
            >
              <Skeleton variant='text' width='100%' height={31} />
              <Skeleton variant='text' width='100%' height={31} />
              <Skeleton variant='text' width='100%' height={31} />
              <Skeleton variant='text' width='100%' height={31} />
              <Skeleton variant='text' width='100%' height={31} />
              <Skeleton variant='text' width='100%' height={31} />
            </div>
          )}

          {showTextBlock === 'error' && (
            <div ref={errorRef} tabIndex={-1} role='alert'>
              <Alert variant='error'>
                {analyseError?.message ?? 'En feil oppstod under validering.'}
              </Alert>
            </div>
          )}

          {showTextBlock === 'text' && (
            <div
              ref={textRef}
              tabIndex={-1}
              role='region'
              aria-label={ariaLabel}
              className={
                bryter
                  ? 'aksel-error-message p-1'
                  : variant === 'innlegg'
                    ? 'text-green-700 p-1'
                    : 'p-1'
              }
            >
              <BodyLong>{(analyse as any)?.begrunnelse}</BodyLong>
            </div>
          )}
        </div>
      </div>

      {hasAnalyse && bryter && (
        <div className='pt-1'>
          <Switch
            size='small'
            checked={!!forceSave}
            onChange={() => {
              const next = !forceSave;
              if (publisertRedigeringsmodus) {
                setForceSave(next);
              } else {
                setForceSave(next);
                if (next) onForceSave();
              }
            }}
          >
            {publisertRedigeringsmodus ? 'Bruk likevel' : 'Lagre likevel'}
          </Switch>
        </div>
      )}
    </div>
  );
};

export default KiAnalysePanel;
