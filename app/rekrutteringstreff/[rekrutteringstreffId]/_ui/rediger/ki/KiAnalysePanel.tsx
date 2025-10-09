'use client';

import { RobotFrownIcon } from '@navikt/aksel-icons';
import { Alert, BodyLong, Button, Skeleton } from '@navikt/ds-react';
import { FC, useEffect, useMemo, useRef } from 'react';

type BlockKind = 'none' | 'skeleton' | 'error' | 'text';

interface KiAnalysePanelProps {
  validating: boolean;
  analyse: any | undefined;
  analyseError: any | undefined;
  forceSave: boolean;
  showAnalysis: boolean;
  erRedigeringAvPublisertTreff: boolean;
  onForceSave: () => void;
  ariaLabel: string;
}

const KiAnalysePanel: FC<KiAnalysePanelProps> = ({
  validating,
  analyse,
  analyseError,
  forceSave,
  showAnalysis,
  erRedigeringAvPublisertTreff,
  onForceSave,
  ariaLabel,
}) => {
  const hasAnalyse = !!analyse && !analyseError;
  const bryter = hasAnalyse ? !!(analyse as any)?.bryterRetningslinjer : false;

  // Only show icon and content when there is a violation
  const shouldShowIcon = showAnalysis && bryter;

  const showTextBlock: BlockKind = useMemo(() => {
    if (validating) return 'skeleton';
    if (analyseError) return 'error';
    if (showAnalysis && bryter) return 'text';
    return 'none';
  }, [validating, analyseError, showAnalysis, bryter]);

  const skeletonRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showTextBlock === 'skeleton') skeletonRef.current?.focus();
    if (showTextBlock === 'error') errorRef.current?.focus();
    if (showTextBlock === 'text') textRef.current?.focus();
  }, [showTextBlock]);

  return (
    <div className='mt-2'>
      <div className='flex gap-3 items-start'>
        <div className='inline-flex justify-center items-start w-10 pt-1'>
          {shouldShowIcon ? (
            <RobotFrownIcon
              aria-hidden
              fontSize='2em'
              className='text-red-600'
            />
          ) : null}
        </div>

        <div className='w-full'>
          <style jsx global>{`
            @keyframes kiFadeIn {
              to {
                opacity: 1;
              }
            }
          `}</style>
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
              style={{
                opacity: 0,
                animation: 'kiFadeIn 300ms ease-in forwards',
              }}
              className='aksel-error-message p-1'
            >
              <BodyLong>{(analyse as any)?.begrunnelse}</BodyLong>
            </div>
          )}
        </div>
      </div>

      {bryter && !forceSave && (
        <div className='pt-4'>
          <Button variant='secondary' size='small' onClick={onForceSave}>
            {erRedigeringAvPublisertTreff ? 'Bruk likevel' : 'Lagre likevel'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default KiAnalysePanel;
