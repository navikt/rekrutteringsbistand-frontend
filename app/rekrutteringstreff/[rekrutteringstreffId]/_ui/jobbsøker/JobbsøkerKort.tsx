import { JobbsøkerStatusType } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { HendelseDTO } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { RekrutteringstreffStatusType } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
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
import { Buildings3Icon, PhoneIcon, TrashIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Button,
  Checkbox,
  Heading,
  Tooltip,
} from '@navikt/ds-react';
import { FC, useState } from 'react';

interface JobbsøkerKortProps {
  personTreffId: string;
  fornavn: string;
  etternavn: string;
  navKontor?: string | null;
  veileder?: Veileder | null;
  telefonnummer?: string | null;
  status: JobbsøkerStatusType;
  minsideHendelser?: HendelseDTO[];
  lagtTilDato?: string | null;
  lagtTilAv?: string | null;
  onCheckboxChange: (checked: boolean) => void;
  erValgt: boolean;
  erDeaktivert?: boolean;
  onInviterClick?: () => void;
  onMutate?: () => void;
  rekrutteringstreffId: string;
  rekrutteringstreffStatus: RekrutteringstreffStatusType;
}

export type Veileder = {
  navn?: string | null;
  navIdent?: string | null;
};

const JobbsøkerKort: FC<JobbsøkerKortProps> = ({
  fornavn,
  etternavn,
  personTreffId,
  navKontor,
  veileder,
  telefonnummer,
  status,
  minsideHendelser,
  lagtTilDato,
  lagtTilAv,
  onCheckboxChange,
  erValgt,
  erDeaktivert = false,
  onInviterClick,
  onMutate,
  rekrutteringstreffId,
  rekrutteringstreffStatus,
}) => {
  const [visSlettModal, setVisSlettModal] = useState(false);
  const harCheckbox =
    rekrutteringstreffStatus === RekrutteringstreffStatus.PUBLISERT;

  const erBesokt = useWindowAnkerVisited();

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
          className={`${personTreffId ? 'cursor-pointer hover:bg-[var(--ax-bg-neutral-moderate-hover)]' : ''} ${!personTreffId ? 'bg-[var(--ax-bg-neutral-moderate-pressed)]' : ''}`}
        >
          <div className='grid w-full grid-cols-[minmax(16rem,1.85fr)_minmax(9rem,0.95fr)_minmax(7rem,0.8fr)_minmax(11rem,1.15fr)_minmax(17rem,auto)] items-center gap-x-3'>
            <div className='min-w-0'>
              <Heading
                size='small'
                className={`flex items-center gap-2 ${erBesokt ? 'text-text-subtle font-normal' : ''}`}
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
                    Velg kandidat {etternavn}, {fornavn}
                  </Checkbox>
                )}
                <span
                  className='truncate'
                  data-testid={`kandidatkort-lenke-${personTreffId}`}
                >
                  {etternavn}, {fornavn}
                </span>
              </Heading>
              {navKontor && (
                <BodyShort
                  size='small'
                  className={`text-text-subtle mt-1 flex items-center gap-1 truncate ${harCheckbox ? 'pl-8' : ''}`}
                >
                  <Buildings3Icon fontSize='1.25rem' className='shrink-0' />
                  {navKontor}
                </BodyShort>
              )}
            </div>

            <BodyShort
              size='small'
              className='text-text-subtle min-w-0 truncate'
            >
              {lagtTilAv && (
                <>
                  {lagtTilAv}
                  {lagtTilDato &&
                    `, ${new Date(lagtTilDato).toLocaleDateString('nb-NO', { day: '2-digit', month: '2-digit', year: 'numeric' })}`}
                </>
              )}
            </BodyShort>

            <BodyShort
              size='small'
              className='text-text-subtle min-w-0 truncate'
            >
              {telefonnummer && (
                <span className='flex items-center gap-1'>
                  <PhoneIcon fontSize='1rem' className='shrink-0' />
                  {telefonnummer}
                </span>
              )}
            </BodyShort>

            <BodyShort
              size='small'
              className='text-text-subtle min-w-0 truncate'
            >
              {veileder?.navn && (
                <>
                  {veileder.navn}{' '}
                  {veileder.navIdent && `(${veileder.navIdent})`}
                </>
              )}
            </BodyShort>

            <div className='flex min-w-0 items-center justify-end gap-2 whitespace-nowrap'>
              <MinsideStatusTag hendelser={minsideHendelser} />

              <JobbsøkerStatusTag status={status} />

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
          jobbsøkerNavn={`${etternavn}, ${fornavn}`}
          onMutate={onMutate}
          setVisModal={setVisSlettModal}
        />
      )}
    </>
  );
};

export default JobbsøkerKort;
