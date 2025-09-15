'use client';

import { useStegviser } from './StegviserContext';
import {
  publiserRekrutteringstreff,
  fullførRekrutteringstreff,
  gjenåpnRekrutteringstreff,
} from '@/app/api/rekrutteringstreff/[...slug]/steg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { RekbisError } from '@/util/rekbisError';
import { Button, Heading, ProgressBar } from '@navikt/ds-react';
import { FC, useState } from 'react';

interface Props {
  stepDetails: { id: number; header: string }[];
  onToggleForhåndsvisning?: (erIForhåndsvisning: boolean) => void;
  erIForhåndsvisning: boolean;
}

const StegviserHeader: FC<Props> = ({
  stepDetails,
  onToggleForhåndsvisning,
  erIForhåndsvisning,
}) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isFinishingRecruitment, setIsFinishingRecruitment] = useState(false);
  const [isGjenåpneRecruitment, setIsGjenåpneRecruitment] = useState(false);

  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { mutate: mutateRekrutteringstreff } =
    useRekrutteringstreff(rekrutteringstreffId);

  const {
    activeStep,
    erPubliseringklar,
    harInvitert,
    sjekklistePunkterFullfort,
    totaltAntallSjekklistePunkter,
    inviterePunkterFullfort,
    totaltAntallInviterePunkter,
    arrangementtidspunktHarPassert,
    tiltidspunktHarPassert,
  } = useStegviser();

  const onPubliserTreffet = async () => {
    setIsPublishing(true);
    try {
      await publiserRekrutteringstreff(rekrutteringstreffId);
      await mutateRekrutteringstreff();
    } catch (error) {
      new RekbisError({
        message: 'Publisering av rekrutteringstreff feilet',
        error,
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const onFullførRekrutteringstreff = async () => {
    setIsFinishingRecruitment(true);
    try {
      await fullførRekrutteringstreff(rekrutteringstreffId);
      await mutateRekrutteringstreff();
    } catch (error) {
      new RekbisError({
        message: 'Avslutting av rekrutteringstreff feilet',
        error,
      });
    } finally {
      setIsFinishingRecruitment(false);
    }
  };

  const onGjenåpnTreffet = async () => {
    setIsGjenåpneRecruitment(true);
    try {
      await gjenåpnRekrutteringstreff(rekrutteringstreffId);
      await mutateRekrutteringstreff();
    } catch (error) {
      new RekbisError({
        message: 'Gjenåpning av rekrutteringstreff feilet',
        error,
      });
    } finally {
      setIsGjenåpneRecruitment(false);
    }
  };

  const currentHeader =
    stepDetails.find((d) => d.id === activeStep)?.header ?? 'Steg';

  const getProsent = (value: number, max: number) =>
    max === 0 ? 0 : (value / max) * 100;

  const ProgressMedTeller: FC<{
    value: number;
    max: number;
    ariaLabel: string;
  }> = ({ value, max, ariaLabel }) => (
    <>
      <ProgressBar
        value={getProsent(value, max)}
        size='small'
        className='mt-2'
        aria-label={ariaLabel}
      />
      <div className='flex justify-end text-sm tabular-nums mt-1'>
        {value} / {max}
      </div>
    </>
  );

  const handleToggleForhåndsvisning = () => {
    onToggleForhåndsvisning?.(!erIForhåndsvisning);
  };

  return (
    <div className='w-full'>
      <div className='grid grid-cols-2 gap-2 w-full'>
        {activeStep != 3 && (
          <Button
            size='small'
            variant='secondary'
            className='w-full'
            onClick={handleToggleForhåndsvisning}
          >
            {erIForhåndsvisning ? 'Rediger' : 'Forhåndsvis'}
          </Button>
        )}
        {activeStep === 1 ? (
          <Button
            disabled={!erPubliseringklar || isPublishing}
            loading={isPublishing}
            size='small'
            className='w-full'
            onClick={onPubliserTreffet}
          >
            Publiser treffet
          </Button>
        ) : (
          activeStep === 2 && (
            <Button
              variant='primary'
              size='small'
              disabled={
                !harInvitert ||
                !arrangementtidspunktHarPassert ||
                isFinishingRecruitment
              }
              loading={isFinishingRecruitment}
              className='w-full'
              onClick={onFullførRekrutteringstreff}
            >
              Fullfør
            </Button>
          )
        )}
      </div>
      {activeStep === 3 && (
        <Button
          variant='primary'
          size='small'
          loading={isGjenåpneRecruitment}
          className='w-full'
          onClick={() => {}}
        >
          Gjenåpne
        </Button>
      )}

      <div className='flex items-center justify-between w-full mt-4'>
        <div className='flex-grow mr-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <Heading size='small'>{currentHeader}</Heading>
            </div>
            <div />
          </div>

          <div>
            {activeStep === 1 && (
              <ProgressMedTeller
                value={sjekklistePunkterFullfort}
                max={totaltAntallSjekklistePunkter}
                ariaLabel='Fremdrift for publisering'
              />
            )}
            {activeStep === 2 && (
              <ProgressMedTeller
                value={inviterePunkterFullfort}
                max={totaltAntallInviterePunkter}
                ariaLabel='Fremdrift for invitasjon'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StegviserHeader;
