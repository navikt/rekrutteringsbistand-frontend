'use client';

import { useStegviser } from './StegviserContext';
import {
  avsluttInvitasjon,
  avsluttOppfolging,
  avsluttRekrutteringstreff,
  publiserRekrutteringstreff,
} from '@/app/api/rekrutteringstreff/[...slug]/steg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { RekbisError } from '@/util/rekbisError';
import { Button, Heading, BodyShort, ProgressBar } from '@navikt/ds-react';
import { useState } from 'react';
import * as React from 'react';

interface Props {
  stepDetails: { id: number; stepLabel: string; header: string }[];
}

const StegviserHeader: React.FC<Props> = ({ stepDetails }) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isFinishingInvitation, setIsFinishingInvitation] = useState(false);
  const [isFinishingFollowUp, setIsFinishingFollowUp] = useState(false);
  const [isFinishingRecruitment, setIsFinishingRecruitment] = useState(false);

  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: rekrutteringstreffData, mutate: mutateRekrutteringstreff } =
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
    antallMøttOpp,
    antallIkkeMøttOpp,
    antallUbestemt,
    antallInviterte,
  } = useStegviser();

  const antallRegistrertOppmøte = antallMøttOpp + antallIkkeMøttOpp;

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

  const onAvsluttInvitasjon = async () => {
    setIsFinishingInvitation(true);
    try {
      await avsluttInvitasjon(rekrutteringstreffId);
      await mutateRekrutteringstreff();
    } catch (error) {
      new RekbisError({ message: 'Avslutting av invitasjon feilet', error });
    } finally {
      setIsFinishingInvitation(false);
    }
  };

  const onAvsluttOppfolging = async () => {
    setIsFinishingFollowUp(true);
    try {
      await avsluttOppfolging(rekrutteringstreffId);
      await mutateRekrutteringstreff();
    } catch (error) {
      new RekbisError({ message: 'Avslutting av oppfølging feilet', error });
    } finally {
      setIsFinishingFollowUp(false);
    }
  };

  const onAvsluttRekrutteringstreff = async () => {
    setIsFinishingRecruitment(true);
    try {
      await avsluttRekrutteringstreff(rekrutteringstreffId);
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

  const harAvsluttet =
    rekrutteringstreffData?.hendelser?.some(
      (h) => h.hendelsestype === 'AVSLUTT',
    ) ?? false;

  const currentHeader =
    stepDetails.find((d) => d.id === activeStep)?.header ?? 'Steg';

  const getProsent = (value: number, max: number) =>
    max === 0 ? 0 : (value / max) * 100;

  return (
    <div className='w-full'>
      <div className='grid grid-cols-2 gap-2 w-full'>
        <Button
          disabled
          size='small'
          variant='secondary'
          className='w-full'
          onClick={onPubliserTreffet}
        >
          Forhåndsvis
        </Button>

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
        ) : activeStep === 2 ? (
          <Button
            variant='primary'
            size='small'
            disabled={
              !harInvitert ||
              !arrangementtidspunktHarPassert ||
              isFinishingInvitation
            }
            loading={isFinishingInvitation}
            className='w-full'
            onClick={onAvsluttInvitasjon}
          >
            Ferdig å invitere
          </Button>
        ) : activeStep === 3 ? (
          <Button
            variant='primary'
            size='small'
            loading={isFinishingFollowUp}
            disabled={
              isFinishingFollowUp ||
              !tiltidspunktHarPassert ||
              antallUbestemt > 0
            }
            className='w-full'
            onClick={onAvsluttOppfolging}
          >
            Ferdig med oppfølging
          </Button>
        ) : activeStep === 4 && !harAvsluttet ? (
          <Button
            variant='primary'
            size='small'
            loading={isFinishingRecruitment}
            className='w-full'
            onClick={onAvsluttRekrutteringstreff}
          >
            Avslutt treffet
          </Button>
        ) : (
          <div />
        )}
      </div>

      <div className='flex items-center justify-between w-full mt-4'>
        <div className='flex-grow mr-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <span className='mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-sm text-white'>
                {activeStep}
              </span>
              <Heading size='small'>{currentHeader}</Heading>
            </div>
            <div>
              {activeStep === 1 && (
                <BodyShort className='text-text-subtle whitespace-nowrap'>
                  {sjekklistePunkterFullfort} / {totaltAntallSjekklistePunkter}
                </BodyShort>
              )}
              {activeStep === 2 && (
                <BodyShort className='text-text-subtle whitespace-nowrap'>
                  {inviterePunkterFullfort} / {totaltAntallInviterePunkter}
                </BodyShort>
              )}
              {activeStep === 3 && (
                <BodyShort className='text-text-subtle whitespace-nowrap'>
                  {antallRegistrertOppmøte} / {antallInviterte}
                </BodyShort>
              )}
            </div>
          </div>

          <div>
            {activeStep === 1 && (
              <ProgressBar
                value={getProsent(
                  sjekklistePunkterFullfort,
                  totaltAntallSjekklistePunkter,
                )}
                size='small'
                className='mt-2'
                aria-label='Fremdrift for publisering'
              />
            )}
            {activeStep === 2 && (
              <ProgressBar
                value={getProsent(
                  inviterePunkterFullfort,
                  totaltAntallInviterePunkter,
                )}
                size='small'
                className='mt-2'
                aria-label='Fremdrift for invitasjon'
              />
            )}
            {activeStep === 3 && (
              <ProgressBar
                value={getProsent(antallRegistrertOppmøte, antallInviterte)}
                size='small'
                className='mt-2'
                aria-label='Fremdrift for oppfølging'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StegviserHeader;
