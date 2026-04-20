import { JobbsøkerStatusType } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { HendelseDTO } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { RekrutteringstreffStatusType } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import EndreSvarJobbsøkerModal from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/EndreSvarJobbsøkerModal';
import JobbsøkerKortValg from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/JobbsokerKortValg';
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
import { TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Checkbox, Tooltip } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { FC, useState } from 'react';

const formaterLagtTilDato = (dato: string | null | undefined) => {
  if (!dato) return null;

  return format(new Date(dato), 'd. MMM yyyy', { locale: nb });
};

const formaterLagtTilAv = (
  ident: string | null | undefined,
  navn: string | null | undefined,
) => {
  if (navn && ident) {
    return `${navn} (${ident})`;
  }

  return navn ?? ident ?? null;
};

interface JobbsøkerKortProps {
  personTreffId: string;
  fødselsnummer: string;
  fornavn: string;
  etternavn: string;
  status: JobbsøkerStatusType;
  minsideHendelser?: HendelseDTO[];
  lagtTilDato?: string | null;
  lagtTilAv?: string | null;
  lagtTilAvNavn?: string | null;
  onCheckboxChange: (checked: boolean) => void;
  erValgt: boolean;
  erDeaktivert?: boolean;
  onInviterClick?: () => void;
  onMutate?: () => void;
  rekrutteringstreffId: string;
  rekrutteringstreffStatus: RekrutteringstreffStatusType;
}

const JobbsøkerKort: FC<JobbsøkerKortProps> = ({
  fornavn,
  etternavn,
  personTreffId,
  fødselsnummer,
  status,
  minsideHendelser,
  lagtTilDato,
  lagtTilAv,
  lagtTilAvNavn,
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
  const lagtTilAvVisning = formaterLagtTilAv(lagtTilAv, lagtTilAvNavn);
  const [visEndreSvarModal, setVisEndreSvarModal] = useState(false);

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
          <div className='grid w-full grid-cols-[1.5fr_1fr_17rem] items-center gap-x-3'>
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
              {lagtTilAvVisning && (
                <BodyShort size='small' className='text-text-subtle truncate'>
                  {lagtTilAvVisning}
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

              {rekrutteringstreffStatus ===
                RekrutteringstreffStatus.PUBLISERT && (
                <JobbsøkerKortValg
                  onEndreSvar={() => setVisEndreSvarModal(true)}
                />
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

      {visEndreSvarModal && (
        <EndreSvarJobbsøkerModal
          rekrutteringstreffId={rekrutteringstreffId}
          personTreffId={personTreffId}
          fornavn={fornavn}
          etternavn={etternavn}
          lukkModal={() => setVisEndreSvarModal(false)}
        />
      )}
    </>
  );
};

export default JobbsøkerKort;
