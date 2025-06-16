'use client';

import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import LeggTilArbeidsgiverModal from './LeggTilArbeidsgiverModal';
import EndreTittel from './om-treffet/components/EndreTittel';
import StedModal from './om-treffet/components/sted/StedModal';
import SvarfristModal from './om-treffet/components/tidspunkt/svarfrist/SvarfristModal';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckmarkIcon,
} from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Button,
  Heading,
  Stepper,
  Detail,
  Loader,
} from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
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
  { id: 'innlegg', label: 'Minst 1 innlegg' },
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
  const activeStep = 1;

  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const arbeidsgiverModalRef = React.useRef<HTMLDialogElement>(null);
  const endreTittelModalRef = React.useRef<HTMLDialogElement>(null);
  const stedModalRef = React.useRef<HTMLDialogElement>(null);
  const svarfristModalRef = React.useRef<HTMLDialogElement>(null);

  const {
    data: arbeidsgivereData,
    isLoading: arbeidsgivereLoading,
    error: arbeidsgivereError,
  } = useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

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
      logger.error('Feil ved henting av arbeidsgivere:', arbeidsgivereError);
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
      logger.error(
        'Feil ved henting av rekrutteringstreff:',
        rekrutteringstreffError,
      );
  }, [rekrutteringstreffData, rekrutteringstreffError]);

  React.useEffect(() => {
    if (innleggData) {
      setCheckedItems((c) => ({ ...c, innlegg: innleggData.length > 0 }));
    }
    if (innleggError)
      logger.error('Feil ved henting av innlegg:', innleggError);
  }, [innleggData, innleggError]);

  const handleClickSjekklisteItem = (id: string) => {
    if (checkedItems[id]) return;
    if (id === 'arbeidsgiver') arbeidsgiverModalRef.current?.showModal();
    if (id === 'navn') endreTittelModalRef.current?.showModal();
    if (id === 'sted') stedModalRef.current?.showModal();
    if (id === 'svarfrist') svarfristModalRef.current?.showModal();
  };

  const currentHeader =
    stepDetails.find((d) => d.id === activeStep)?.header ?? 'Steg';

  const commonBoxProps = {
    background: 'raised' as const,
    borderColor: 'neutral-subtleA' as const,
    borderWidth: '1' as const,
    padding: '6' as const,
  };

  return (
    <div className='my-2'>
      {/* topp */}
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
              <Button
                disabled
                size='small'
                onClick={(e) => e.stopPropagation()}
              >
                Publiser treffet
              </Button>
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

      {/* innhold */}
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
                          className={`flex items-center justify-between py-1 ${item.id === 'arbeidsgiver' || item.id === 'svarfrist' ? 'border-b border-border-subtle mb-2' : ''} ${kanKlikkes ? 'cursor-pointer hover:bg-surface-hover rounded' : ''}`}
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
                            <Button
                              variant='tertiary'
                              size='small'
                              onClick={(e) => {
                                e.stopPropagation();
                                handleClickSjekklisteItem(item.id);
                              }}
                            >
                              Legg til
                            </Button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
            </div>
          </div>
        </Box.New>
      )}

      <LeggTilArbeidsgiverModal modalRef={arbeidsgiverModalRef} />

      {rekrutteringstreffData && (
        <>
          <EndreTittel
            modalRef={endreTittelModalRef}
            rekrutteringstreff={rekrutteringstreffData}
            onUpdated={() => {
              mutateRekrutteringstreff();
            }}
          />
          <StedModal
            rekrutteringstreff={rekrutteringstreffData}
            onUpdated={() => {
              mutateRekrutteringstreff();
            }}
            modalRef={stedModalRef}
          />
          <SvarfristModal
            rekrutteringstreff={rekrutteringstreffData}
            onUpdated={() => {
              mutateRekrutteringstreff();
            }}
            modalRef={svarfristModalRef}
          />
        </>
      )}
    </div>
  );
};

export default TreffSteg;
