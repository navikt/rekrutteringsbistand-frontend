'use client';

import { RekbisError } from '../../../../util/rekbisError';
import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import LeggTilArbeidsgiverModal from './LeggTilArbeidsgiverModal';
import EndreTittel from './om-treffet/components/EndreTittel';
import InnleggModal from './om-treffet/components/innlegg/InnleggModal';
import StedModal from './om-treffet/components/sted/StedModal';
import TidspunktModal from './om-treffet/components/tidspunkt/TidspunktModal';
import SvarfristModal from './om-treffet/components/tidspunkt/svarfrist/SvarfristModal';
import {
  avsluttArrangement,
  avsluttInvitasjon,
  avsluttOppfolging,
  avsluttRekrutteringstreff,
  publiserRekrutteringstreff,
} from '@/app/api/rekrutteringstreff/[...slug]/steg';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import {
  CheckmarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Button,
  Detail,
  Heading,
  Loader,
  Stepper,
} from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

interface ChecklistItem {
  id: string;
  label: string;
}

const DEFAULT_TITTEL = 'Nytt rekrutteringstreff';

const sjekklisteData: ChecklistItem[] = [
  { id: 'arbeidsgiver', label: 'Minst 1 arbeidsgiver' },
  { id: 'navn', label: 'Navn' },
  { id: 'sted', label: 'Sted' },
  { id: 'tidspunkt', label: 'Tidspunkt' },
  { id: 'svarfrist', label: 'Svarfrist' },
  { id: 'omtreffet', label: 'Om treffet' },
];

const stepDetails = [
  { id: 1, stepLabel: 'Publisere', header: 'Gjør klar til publisering' },
  { id: 2, stepLabel: 'Invitere', header: 'Send ut invitasjoner' },
  {
    id: 3,
    stepLabel: 'Arrangere',
    header: 'Planlegg og gjennomfør arrangementet',
  },
  {
    id: 4,
    stepLabel: 'Følge opp',
    header: 'Følg opp påmeldte og gjennomfør treffet',
  },
  {
    id: 5,
    stepLabel: 'Avslutte',
    header: 'Avslutt og evaluer rekrutteringstreffet',
  },
];

const stepsForStepper = stepDetails.map((d) => d.stepLabel);

const TreffSteg = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen((o) => !o);
  const [isPublishing, setIsPublishing] = React.useState(false);
  const [isFinishingInvitation, setIsFinishingInvitation] =
    React.useState(false);
  const [isFinishingArrangement, setIsFinishingArrangement] =
    React.useState(false);
  const [isFinishingFollowUp, setIsFinishingFollowUp] = React.useState(false);
  const [isFinishingRecruitment, setIsFinishingRecruitment] =
    React.useState(false);

  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const arbeidsgiverModalRef = React.useRef<HTMLDialogElement>(null);
  const endreTittelModalRef = React.useRef<HTMLDialogElement>(null);
  const tidspunktModalRef = React.useRef<HTMLDialogElement>(null);
  const stedModalRef = React.useRef<HTMLDialogElement>(null);
  const svarfristModalRef = React.useRef<HTMLDialogElement>(null);
  const innleggModalRef = React.useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const {
    data: arbeidsgivereData,
    isLoading: arbeidsgivereLoading,
    error: arbeidsgivereError,
  } = useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

  const {
    data: jobbsøkereData,
    isLoading: jobbsøkereLoading,
    error: jobbsøkereError,
  } = useJobbsøkere(rekrutteringstreffId);

  const {
    data: rekrutteringstreffData,
    isLoading: rekrutteringstreffLoading,
    error: rekrutteringstreffError,
    mutate: mutateRekrutteringstreff,
  } = useRekrutteringstreff(rekrutteringstreffId);

  const {
    data: innleggData,
    isLoading: innleggLoading,
    error: innleggError,
    mutate: mutateInnlegg,
  } = useInnlegg(rekrutteringstreffId);

  const [checkedItems, setCheckedItems] = React.useState<
    Record<string, boolean>
  >(
    () =>
      Object.fromEntries(sjekklisteData.map(({ id }) => [id, false])) as Record<
        string,
        boolean
      >,
  );

  React.useEffect(() => {
    if (arbeidsgivereData) {
      setCheckedItems((c) => ({
        ...c,
        arbeidsgiver: arbeidsgivereData.length > 0,
      }));
    }
    if (arbeidsgivereError)
      new RekbisError({
        message: 'Feil ved henting av arbeidsgivere:',
        error: arbeidsgivereError,
      });
  }, [arbeidsgivereData, arbeidsgivereError]);

  React.useEffect(() => {
    if (rekrutteringstreffData) {
      const tittel = rekrutteringstreffData.tittel?.trim() ?? '';
      setCheckedItems((c) => ({
        ...c,
        navn: tittel.length > 0 && tittel !== DEFAULT_TITTEL,
        sted:
          !!rekrutteringstreffData.gateadresse?.trim() &&
          !!rekrutteringstreffData.poststed?.trim(),
        tidspunkt: !!rekrutteringstreffData.fraTid,
        svarfrist: !!rekrutteringstreffData.svarfrist,
      }));
    }
    if (rekrutteringstreffError)
      new RekbisError({
        message: 'Feil ved henting av rekrutteringstreff:',
        error: rekrutteringstreffError,
      });
  }, [rekrutteringstreffData, rekrutteringstreffError]);

  React.useEffect(() => {
    if (innleggData && innleggData.length > 0) {
      setCheckedItems((c) => ({ ...c, omtreffet: innleggData.length > 0 }));
    }
    if (innleggError)
      new RekbisError({
        message: 'Feil ved henting av innlegg:',
        error: innleggError,
      });
  }, [innleggData, innleggError]);

  React.useEffect(() => {
    if (jobbsøkereError)
      new RekbisError({
        message: 'Feil ved henting av jobbsøkere:',
        error: jobbsøkereError,
      });
  }, [jobbsøkereError]);

  const handleClickSjekklisteItem = (id: string) => {
    if (checkedItems[id]) return;
    if (id === 'arbeidsgiver') arbeidsgiverModalRef.current?.showModal();
    if (id === 'navn') endreTittelModalRef.current?.showModal();
    if (id === 'tidspunkt') tidspunktModalRef.current?.showModal();
    if (id === 'sted') stedModalRef.current?.showModal();
    if (id === 'svarfrist') svarfristModalRef.current?.showModal();
    if (id === 'omtreffet') innleggModalRef.current?.showModal();
  };

  const commonBoxProps = {
    background: 'raised' as const,
    borderColor: 'neutral-subtleA' as const,
    borderWidth: '1' as const,
    padding: '6' as const,
  };

  const alleStegOk = sjekklisteData.every((item) => checkedItems[item.id]);

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

  const onAvsluttArrangement = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFinishingArrangement(true);
    try {
      await avsluttArrangement(rekrutteringstreffId);
      await mutateRekrutteringstreff();
    } catch (error) {
      new RekbisError({
        message: 'Avslutting av arrangement feilet',
        error,
      });
    } finally {
      setIsFinishingArrangement(false);
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
      ),
    [rekrutteringstreffData],
  );

  const activeStep = React.useMemo(() => {
    const hendelser = rekrutteringstreffData?.hendelser;
    if (!hendelser) return 1;

    const harHendelse = (type: string) =>
      hendelser.some((h) => h.hendelsestype === type);

    if (harHendelse('AVSLUTT') || harHendelse('AVSLUTT_OPPFOLGING')) {
      return 5;
    }
    if (harHendelse('AVSLUTT_ARRANGEMENT')) {
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

  const currentHeader =
    stepDetails.find((d) => d.id === activeStep)?.header ?? 'Steg';

  const antallInviterte =
    jobbsøkereData?.filter((j) =>
      j.hendelser?.some((h) => h.hendelsestype === 'INVITER'),
    ).length ?? 0;

  const harInvitert = antallInviterte > 0;

  return (
    <div className='my-2'>
      <Box.New
        {...commonBoxProps}
        className={`${isOpen ? 'rounded-t-xl border-b-0' : 'rounded-xl'} cursor-pointer`}
        onClick={toggle}
        role='button'
        aria-expanded={isOpen}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
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
                  disabled={!alleStegOk || isPublishing}
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
                    !harInvitert || jobbsøkereLoading || isFinishingInvitation
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
                  loading={isFinishingArrangement}
                  onClick={onAvsluttArrangement}
                >
                  Ferdig å arrangere
                </Button>
              )}
              {activeStep === 4 && (
                <Button
                  variant='primary'
                  size='small'
                  loading={isFinishingFollowUp}
                  onClick={onAvsluttOppfolging}
                >
                  Ferdig med oppfølging
                </Button>
              )}
              {activeStep === 5 && !harAvsluttet && (
                <Button
                  variant='primary'
                  size='small'
                  loading={isFinishingRecruitment}
                  onClick={onAvsluttRekrutteringstreff}
                >
                  Avslutt treffet
                </Button>
              )}
              <Button
                variant='secondary'
                size='small'
                onClick={(e) => e.stopPropagation()}
              >
                Se forhåndsvisning
              </Button>
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

      {isOpen && (
        <Box.New
          {...commonBoxProps}
          className='rounded-b-xl border-t-0'
          role='region'
        >
          <div className='flex flex-row gap-16'>
            <Stepper
              activeStep={activeStep}
              orientation='vertical'
              interactive={false}
            >
              {stepsForStepper.map((label, i) => (
                <Stepper.Step key={i + 1}>{label}</Stepper.Step>
              ))}
            </Stepper>

            {activeStep == 1 && (
              <div className='flex-1'>
                <Detail spacing>
                  Før treffet er tilgjengelig for andre, og du kan invitere
                  jobbsøker må noen detaljer være på plass først:
                </Detail>

                {(arbeidsgivereLoading ||
                  rekrutteringstreffLoading ||
                  innleggLoading) && (
                  <Loader size='medium' title='Laster sjekkliste status...' />
                )}

                {!arbeidsgivereLoading &&
                  !rekrutteringstreffLoading &&
                  !innleggLoading && (
                    <ul className='space-y-0'>
                      {sjekklisteData.map((item) => {
                        const erOppfylt = !!checkedItems[item.id];
                        const kanKlikkes = !erOppfylt;
                        return (
                          <li
                            key={item.id}
                            onClick={() =>
                              kanKlikkes && handleClickSjekklisteItem(item.id)
                            }
                            onKeyDown={(e) => {
                              if (
                                kanKlikkes &&
                                (e.key === 'Enter' || e.key === ' ')
                              ) {
                                e.preventDefault();
                                handleClickSjekklisteItem(item.id);
                              }
                            }}
                            className={`flex items-center justify-between py-4 ${
                              item.id === 'arbeidsgiver' ||
                              item.id === 'svarfrist'
                                ? 'border-b border-border-subtle mb-1'
                                : ''
                            } ${kanKlikkes ? 'cursor-pointer hover:bg-gray-800 rounded' : ''}`}
                            role={kanKlikkes ? 'button' : undefined}
                            tabIndex={kanKlikkes ? 0 : undefined}
                            aria-label={
                              kanKlikkes
                                ? `Legg til eller rediger ${item.label}`
                                : `${item.label} - Oppfylt`
                            }
                          >
                            <div className='flex items-center gap-2'>
                              <div className='w-5 h-5 border-2 rounded-full flex items-center justify-center border-blue-400 text-blue-400'>
                                {erOppfylt && <CheckmarkIcon fontSize='1rem' />}
                              </div>
                              <BodyShort>{item.label}</BodyShort>
                            </div>
                            {kanKlikkes && (
                              <BodyShort className='text-blue-400 px-1'>
                                Legg til
                              </BodyShort>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
              </div>
            )}

            {activeStep == 2 && (
              <div className='flex-1'>
                <Box.New padding='6' borderRadius='large' className='mb-4'>
                  <div className='flex flex-col gap-4'>
                    <div className='flex items-center justify-between gap-2 pb-4 border-b border-border-subtle'>
                      <div className='flex items-center gap-2'>
                        <div className='w-5 h-5 border-2 rounded-full flex items-center justify-center border-blue-400 text-blue-400'>
                          {harInvitert && <CheckmarkIcon fontSize='1rem' />}
                        </div>
                        <BodyShort>Minst en invitasjon</BodyShort>
                      </div>
                      <button
                        type='button'
                        className='text-blue-400 hover:underline focus:underline'
                        onClick={() =>
                          router.push(
                            `/rekrutteringstreff/${rekrutteringstreffId}?visFane=jobbsøkere`,
                          )
                        }
                      >
                        Inviter
                      </button>
                    </div>
                    <div className='pt-2'>
                      <BodyShort>
                        Antall inviterte: <b>{antallInviterte}</b>
                      </BodyShort>
                    </div>
                  </div>
                </Box.New>
              </div>
            )}
            {activeStep === 3 && (
              <div className='flex-1'>
                <Detail spacing>
                  Her kan du planlegge og gjennomføre arrangementet.
                </Detail>
              </div>
            )}
            {activeStep === 4 && (
              <div className='flex-1'>
                <Detail spacing>
                  Her kan du følge opp påmeldte og gjennomføre treffet.
                </Detail>
              </div>
            )}
            {activeStep === 5 && (
              <div className='flex-1'>
                <Detail spacing>
                  Her kan du avslutte og evaluere rekrutteringstreffet.
                </Detail>
              </div>
            )}
          </div>
        </Box.New>
      )}

      <LeggTilArbeidsgiverModal modalRef={arbeidsgiverModalRef} />

      {rekrutteringstreffData && (
        <>
          <EndreTittel
            modalRef={endreTittelModalRef}
            rekrutteringstreff={rekrutteringstreffData}
            onUpdated={() => mutateRekrutteringstreff()}
          />
          <TidspunktModal
            rekrutteringstreff={rekrutteringstreffData}
            modalRef={tidspunktModalRef}
            onUpdated={() => mutateRekrutteringstreff()}
          />
          <StedModal
            rekrutteringstreff={rekrutteringstreffData}
            onUpdated={() => mutateRekrutteringstreff()}
            modalRef={stedModalRef}
          />
          <SvarfristModal
            rekrutteringstreff={rekrutteringstreffData}
            onUpdated={() => mutateRekrutteringstreff()}
            modalRef={svarfristModalRef}
          />
          <InnleggModal
            rekrutteringstreffId={rekrutteringstreffData.id}
            innlegg={
              innleggData && innleggData.length > 0 ? innleggData[0] : undefined
            }
            onInnleggUpdated={() => mutateInnlegg()}
            modalRef={innleggModalRef}
          />
        </>
      )}
    </div>
  );
};
export default TreffSteg;
