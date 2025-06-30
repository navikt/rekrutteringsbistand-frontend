import { useRekrutteringstreffContext } from '../../../RekrutteringstreffContext';
import {
  avsluttInvitasjon,
  avsluttOppfolging,
  avsluttRekrutteringstreff,
  publiserRekrutteringstreff,
} from '@/app/api/rekrutteringstreff/[...slug]/steg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { RekbisError } from '@/util/rekbisError';
import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { Box, Button, Heading } from '@navikt/ds-react';
import { parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import * as React from 'react';

interface Props {
  isOpen?: boolean;
  toggle?: () => void;
  stepDetails: { id: number; stepLabel: string; header: string }[];
  alleSteg1Ok: boolean;
  harInvitert: boolean;
}

const commonBoxProps = {
  background: 'raised' as const,
  borderColor: 'neutral-subtleA' as const,
  borderWidth: '1' as const,
  padding: '6' as const,
};

const TreffStegHeader: React.FC<Props> = ({
  isOpen,
  toggle,
  stepDetails,
  alleSteg1Ok,
  harInvitert,
}) => {
  const [isPublishing, setIsPublishing] = React.useState(false);
  const [isFinishingInvitation, setIsFinishingInvitation] =
    React.useState(false);
  const [isFinishingFollowUp, setIsFinishingFollowUp] = React.useState(false);
  const [isFinishingRecruitment, setIsFinishingRecruitment] =
    React.useState(false);

  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: rekrutteringstreffData, mutate: mutateRekrutteringstreff } =
    useRekrutteringstreff(rekrutteringstreffId);

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

  const activeStep = React.useMemo(() => {
    const hendelser = rekrutteringstreffData?.hendelser;
    if (!hendelser) return 1;

    const harHendelse = (type: string) =>
      hendelser.some((h) => h.hendelsestype === type);

    if (harHendelse('AVSLUTT') || harHendelse('AVSLUTT_OPPFØLGING')) {
      return 4;
    }
    if (harHendelse('AVSLUTT_INVITASJON')) {
      return 3;
    }
    if (harHendelse('PUBLISER')) {
      return 2;
    }
    return 1;
  }, [rekrutteringstreffData]);

  const harAvsluttet = React.useMemo(
    () =>
      rekrutteringstreffData?.hendelser?.some(
        (h) => h.hendelsestype === 'AVSLUTT',
      ) ?? false,
    [rekrutteringstreffData],
  );

  const arrangementtidspunktHarPassert = React.useMemo(() => {
    if (!rekrutteringstreffData?.fraTid) return false;
    return (
      toZonedTime(parseISO(rekrutteringstreffData.fraTid), 'Europe/Oslo') <
      new Date()
    );
  }, [rekrutteringstreffData?.fraTid]);

  const currentHeader =
    stepDetails.find((d) => d.id === activeStep)?.header ?? 'Steg';

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
        <Heading size='small' className='flex items-center'>
          <span className='mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-sm text-white'>
            {activeStep}
          </span>
          {currentHeader}
        </Heading>
        <div className='flex items-center gap-4'>
          <div className='flex gap-2'>
            {activeStep === 1 && (
              <Button
                disabled={!alleSteg1Ok || isPublishing}
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

export default TreffStegHeader;
