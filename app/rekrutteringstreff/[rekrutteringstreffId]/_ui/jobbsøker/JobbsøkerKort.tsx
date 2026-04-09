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
import { Buildings3Icon, TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Checkbox, Tooltip } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { FC, useState } from 'react';

const formaterLagtTilDato = (dato: string | null | undefined) => {
  if (!dato) return null;

  return format(new Date(dato), 'd. MMM yyyy', { locale: nb });
};

interface JobbsøkerKortProps {
  personTreffId: string;
  fødselsnummer: string;
  fornavn: string;
  etternavn: string;
  navKontor?: string | null;
  veileder?: Veileder | null;
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
  fødselsnummer,
  navKontor,
  veileder,
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
  const lagtTilDatoVisning = formaterLagtTilDato(lagtTilDato);

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
          <div className='grid w-full grid-cols-[2fr_1.5fr_2fr_17rem] items-center gap-x-3'>
            <div className='min-w-0'>
              <div
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
                <BodyShort
                  weight='semibold'
                  className='truncate'
                  data-testid={`kandidatkort-lenke-${personTreffId}`}
                >
                  {etternavn}, {fornavn}
                </BodyShort>
              </div>
              {fødselsnummer && (
                <BodyShort
                  size='small'
                  className={`text-text-subtle truncate ${harCheckbox ? 'pl-8' : ''}`}
                >
                  f.nr. {fødselsnummer}
                </BodyShort>
              )}
            </div>

            <div className='min-w-0'>
              {lagtTilDatoVisning && (
                <BodyShort size='small' className='text-text-subtle truncate'>
                  {lagtTilDatoVisning}
                </BodyShort>
              )}
              {lagtTilAv && (
                <BodyShort size='small' className='text-text-subtle truncate'>
                  {lagtTilAv}
                </BodyShort>
              )}
            </div>

            <div className='min-w-0'>
              {veileder?.navn && (
                <BodyShort size='small' className='text-text-subtle truncate'>
                  {veileder.navn}{' '}
                  {veileder.navIdent && `(${veileder.navIdent})`}
                </BodyShort>
              )}
              {navKontor && (
                <BodyShort
                  size='small'
                  className='text-text-subtle mt-0.5 flex items-center gap-1 truncate'
                >
                  <Buildings3Icon fontSize='1.25rem' className='shrink-0' />
                  {navKontor}
                </BodyShort>
              )}
            </div>

            <div className='flex items-center justify-end gap-2'>
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
