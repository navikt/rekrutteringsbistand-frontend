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
import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { Box, Button, Heading, BodyShort, ProgressBar } from '@navikt/ds-react';
import * as React from 'react';

interface Props {
  isOpen?: boolean;
  toggle?: () => void;
  stepDetails: { id: number; stepLabel: string; header: string }[];
}

const commonBoxProps = {
  background: 'raised' as const,
  borderColor: 'neutral-subtleA' as const,
  borderWidth: '1' as const,
  padding: '6' as const,
};

const StegviserHeader: React.FC<Props> = ({ isOpen, toggle, stepDetails }) => {
  const [isPublishing, setIsPublishing] = React.useState(false);
  const [isFinishingInvitation, setIsFinishingInvitation] =
    React.useState(false);
  const [isFinishingFollowUp, setIsFinishingFollowUp] = React.useState(false);
  const [isFinishingRecruitment, setIsFinishingRecruitment] =
    React.useState(false);

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

  // Avledet data for steg 3
  const antallRegistrertOppmøte = antallMøttOpp + antallIkkeMøttOpp;

  const onPubliserTreffet = async (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const onAvsluttInvitasjon = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFinishingInvitation(true);
    try {
      await avsluttInvitasjon(rekrutteringstreffId);
      await mutateRekrutteringstreff();
    } catch (error) {
      new RekbisError({
        message: 'Avslutting av invitasjon feilet',
        error,
      });
    } finally {
      setIsFinishingInvitation(false);
    }
  };

  const onAvsluttOppfolging = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFinishingFollowUp(true);
    try {
      await avsluttOppfolging(rekrutteringstreffId);
      await mutateRekrutteringstreff();
    } catch (error) {
      new RekbisError({
        message: 'Avslutting av oppfølging feilet',
        error,
      });
    } finally {
      setIsFinishingFollowUp(false);
    }
  };

  const onAvsluttRekrutteringstreff = async (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const harAvsluttet = React.useMemo(
    () =>
      rekrutteringstreffData?.hendelser?.some(
        (h) => h.hendelsestype === 'AVSLUTT',
      ) ?? false,
    [rekrutteringstreffData],
  );

  const currentHeader =
    stepDetails.find((d) => d.id === activeStep)?.header ?? 'Steg';

  const getProsent = (value: number, max: number) => {
    if (max === 0) return 0;
    return (value / max) * 100;
  };

  return (
    <Box.New
      {...commonBoxProps}
      className={`${isOpen ? 'rounded-t-xl border-b-0' : 'rounded-xl'} cursor-pointer`}
      onClick={toggle}
      role='button'
      aria-expanded={isOpen}
      tabIndex={0}
      onKeyDown={(e) => {
        if (toggle && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <div className='flex items-center justify-between w-full'>
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
                className='mt-2 h-1'
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
                className='mt-2 h-1'
                aria-label='Fremdrift for invitasjon'
              />
            )}
            {activeStep === 3 && (
              <ProgressBar
                value={getProsent(antallRegistrertOppmøte, antallInviterte)}
                size='small'
                className='mt-2 h-1'
                aria-label='Fremdrift for oppfølging'
              />
            )}
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex gap-2'>
            {activeStep === 1 && (
              <Button
                disabled={!erPubliseringklar || isPublishing}
                loading={isPublishing}
                size='small'
                onClick={onPubliserTreffet}
              >
                Publiser treffet
              </Button>
            )}
            {activeStep === 2 && (
              <Button
                variant='primary'
                size='small'
                disabled={
                  !harInvitert ||
                  !arrangementtidspunktHarPassert ||
                  isFinishingInvitation
                }
                loading={isFinishingInvitation}
                onClick={onAvsluttInvitasjon}
              >
                Ferdig å invitere
              </Button>
            )}
            {activeStep === 3 && (
              <Button
                variant='primary'
                size='small'
                loading={isFinishingFollowUp}
                disabled={
                  isFinishingFollowUp ||
                  !tiltidspunktHarPassert ||
                  antallUbestemt > 0
                }
                onClick={onAvsluttOppfolging}
              >
                Ferdig med oppfølging
              </Button>
            )}
            {activeStep === 4 && !harAvsluttet && (
              <Button
                variant='primary'
                size='small'
                loading={isFinishingRecruitment}
                onClick={onAvsluttRekrutteringstreff}
              >
                Avslutt treffet
              </Button>
            )}
          </div>
          <div className='text-text-action pointer-events-none'>
            {isOpen ? (
              <ChevronUpIcon fontSize='1.5rem' />
            ) : (
              <ChevronDownIcon fontSize='1.5rem' />
            )}
          </div>
        </div>
      </div>
    </Box.New>
  );
};

export default StegviserHeader;
