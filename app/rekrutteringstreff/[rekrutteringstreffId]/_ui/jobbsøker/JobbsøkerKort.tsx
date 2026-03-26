import {
  JobbsøkerSøkResponsDTO,
  JobbsøkerStatusType,
  MinsideHendelseRaw,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import {
  parseHendelseData,
  RekrutteringstreffStatusType,
} from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import JobbsøkerStatusTag from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/JobbsøkerStatusTag';
import MinsideStatusTag from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/MinsideStatusTag';
import SlettJobbsøkerModal from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/SlettJobbsøkerModal';
import {
  JobbsøkerStatus,
  RekrutteringstreffStatus,
} from '@/app/rekrutteringstreff/_types/constants';
import ListeKort from '@/components/layout/ListeKort';
import WindowAnker, {
  useWindowAnkerVisited,
} from '@/components/window/WindowAnker';
import { personTreffAnker } from '@/components/window/ankerLenker';
import { Buildings3Icon, PersonIcon, TrashIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Button,
  Checkbox,
  Heading,
  Tooltip,
} from '@navikt/ds-react';
import { format } from 'date-fns';
import { FC, useState } from 'react';
import { SWRResponse } from 'swr';

const JOBBSØKER_ROW_LAYOUT =
  'grid-cols-1 lg:grid-cols-[minmax(14rem,2fr)_minmax(10rem,1fr)_minmax(12rem,1.2fr)_minmax(8rem,0.8fr)_minmax(9rem,0.9fr)_auto]';

interface JobbsøkerKortProps {
  personTreffId: string;
  fornavn: string;
  etternavn: string;
  navKontor?: string | null;
  veileder?: Veileder | null;
  status: JobbsøkerStatusType;
  invitertDato?: string | null;
  minsideHendelser?: MinsideHendelseRaw[];
  onCheckboxChange: (checked: boolean) => void;
  erValgt: boolean;
  erDeaktivert?: boolean;
  onInviterClick?: () => void;
  jobbsøkereHook?: Pick<SWRResponse<JobbsøkerSøkResponsDTO>, 'mutate'>;
  rekrutteringstreffId: string;
  rekrutteringstreffStatus: RekrutteringstreffStatusType;
}

export type Veileder = {
  navn?: string | null;
  navIdent?: string | null;
};

const formatInvitertDato = (dato?: string | null) =>
  dato ? format(new Date(dato), 'dd.MM.yyyy') : 'Ikke invitert';

const JobbsøkerKort: FC<JobbsøkerKortProps> = ({
  fornavn,
  etternavn,
  personTreffId,
  navKontor,
  veileder,
  status,
  invitertDato,
  minsideHendelser,
  onCheckboxChange,
  erValgt,
  erDeaktivert = false,
  onInviterClick,
  jobbsøkereHook,
  rekrutteringstreffId,
  rekrutteringstreffStatus,
}) => {
  const [visSlettModal, setVisSlettModal] = useState(false);

  const erBesokt = useWindowAnkerVisited();

  const parsedHendelser = minsideHendelser?.map((h) => ({
    ...h,
    hendelseData: parseHendelseData(h.hendelsestype, h.hendelseData),
  }));

  const windowRef = personTreffAnker(rekrutteringstreffId, personTreffId);

  const slettKnapp = (
    <Button
      size='small'
      variant='secondary'
      disabled={status !== JobbsøkerStatus.LAGT_TIL}
      icon={<TrashIcon aria-hidden />}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setVisSlettModal(true);
      }}
    >
      Slett
    </Button>
  );

  return (
    <>
      <WindowAnker windowRef={windowRef.windowRef} href={windowRef.href}>
        <ListeKort
          className={`!m-0 ${personTreffId ? 'cursor-pointer hover:bg-[var(--ax-bg-neutral-moderate-hover)]' : ''} ${!personTreffId ? 'bg-[var(--ax-bg-neutral-moderate-pressed)]' : ''}`}
        >
          <div className={`grid w-full gap-3 ${JOBBSØKER_ROW_LAYOUT}`}>
            <div className='min-w-0'>
              <Heading
                size='small'
                className={`inline-flex items-start gap-2 pr-2 ${erBesokt ? 'text-text-subtle font-normal' : ''}`}
              >
                {rekrutteringstreffStatus ===
                  RekrutteringstreffStatus.PUBLISERT && (
                  <Checkbox
                    hideLabel
                    checked={erValgt}
                    onChange={(e) => {
                      e.stopPropagation();
                      onCheckboxChange(e.target.checked);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    disabled={erDeaktivert}
                  >
                    Velg kandidat {fornavn} {etternavn}
                  </Checkbox>
                )}
                <div
                  data-testid={`kandidatkort-lenke-${personTreffId}`}
                  className='min-w-0 break-words'
                >
                  {fornavn} {etternavn}
                </div>
              </Heading>

              <div className='mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--ax-text-subtle)] lg:hidden'>
                {navKontor && (
                  <span className='flex items-center gap-1'>
                    <Buildings3Icon fontSize='1.25rem' className='shrink-0' />
                    {navKontor}
                  </span>
                )}
                {veileder?.navn && (
                  <span className='flex items-center gap-1'>
                    <PersonIcon fontSize='1.25rem' className='shrink-0' />
                    {veileder.navn}
                    {veileder.navIdent && ` (${veileder.navIdent})`}
                  </span>
                )}
                <span>{formatInvitertDato(invitertDato)}</span>
              </div>

              <div className='mt-3 flex flex-wrap items-center gap-2 lg:hidden'>
                <JobbsøkerStatusTag status={status} />
                <MinsideStatusTag hendelser={parsedHendelser} />

                {rekrutteringstreffStatus ===
                  RekrutteringstreffStatus.PUBLISERT &&
                  status === JobbsøkerStatus.LAGT_TIL &&
                  onInviterClick && (
                    <Button
                      size='small'
                      variant='secondary'
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onInviterClick();
                      }}
                    >
                      Inviter
                    </Button>
                  )}

                {status !== JobbsøkerStatus.LAGT_TIL ? (
                  <Tooltip content='Kan ikke slette jobbsøker som er invitert'>
                    <div>{slettKnapp}</div>
                  </Tooltip>
                ) : (
                  slettKnapp
                )}
              </div>
            </div>

            <BodyShort
              size='small'
              className='text-text-subtle hidden lg:block'
            >
              {navKontor ?? 'Ikke satt'}
            </BodyShort>

            <BodyShort
              size='small'
              className='text-text-subtle hidden lg:block'
            >
              {veileder?.navn
                ? `${veileder.navn}${veileder.navIdent ? ` (${veileder.navIdent})` : ''}`
                : 'Ikke satt'}
            </BodyShort>

            <BodyShort
              size='small'
              className='text-text-subtle hidden lg:block'
            >
              {formatInvitertDato(invitertDato)}
            </BodyShort>

            <div className='hidden lg:flex lg:items-center'>
              <JobbsøkerStatusTag status={status} />
              <MinsideStatusTag hendelser={parsedHendelser} />
            </div>

            <div className='hidden lg:flex lg:flex-wrap lg:items-center lg:justify-end lg:gap-2'>
              {rekrutteringstreffStatus ===
                RekrutteringstreffStatus.PUBLISERT &&
                status === JobbsøkerStatus.LAGT_TIL &&
                onInviterClick && (
                  <Button
                    size='small'
                    variant='secondary'
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onInviterClick();
                    }}
                  >
                    Inviter
                  </Button>
                )}

              {status !== JobbsøkerStatus.LAGT_TIL ? (
                <Tooltip content='Kan ikke slette jobbsøker som er invitert'>
                  <div>{slettKnapp}</div>
                </Tooltip>
              ) : (
                slettKnapp
              )}
            </div>
          </div>
        </ListeKort>
      </WindowAnker>

      {visSlettModal && (
        <SlettJobbsøkerModal
          rekrutteringstreffId={rekrutteringstreffId}
          jobbsøkerId={personTreffId}
          jobbsøkerNavn={`${fornavn} ${etternavn}`}
          jobbsøkereHook={jobbsøkereHook}
          setVisModal={setVisSlettModal}
        />
      )}
    </>
  );
};

export default JobbsøkerKort;
