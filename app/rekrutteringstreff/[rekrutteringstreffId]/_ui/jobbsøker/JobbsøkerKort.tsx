import {
  JobbsøkereResponseDTO,
  JobbsøkerStatusType,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { HendelseDTO } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { RekrutteringstreffStatusType } from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversikt';
import JobbsøkerStatusTag from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/JobbsøkerStatusTag';
import MinsideStatusTag from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/MinsideStatusTag';
import SlettJobbsøkerModal from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/SlettJobbsøkerModal';
import {
  JobbsøkerHendelsestype,
  JobbsøkerStatus,
  RekrutteringstreffStatus,
} from '@/app/rekrutteringstreff/_types/constants';
import TekstMedIkon from '@/components/TekstMedIkon';
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

interface JobbsøkerKortProps {
  fødselsnummer?: string;
  personTreffId: string;
  fornavn: string;
  etternavn: string;
  navKontor?: string | null;
  veileder?: Veileder | null;
  status: JobbsøkerStatusType;
  sisteRelevanteHendelse?: HendelseDTO;
  hendelser?: HendelseDTO[];
  onCheckboxChange: (checked: boolean) => void;
  erValgt: boolean;
  erDeaktivert?: boolean;
  onInviterClick?: () => void;
  jobbsøkereHook?: Pick<SWRResponse<JobbsøkereResponseDTO>, 'mutate'>;
  rekrutteringstreffId: string;
  rekrutteringstreffStatus: RekrutteringstreffStatusType;
}

export type Veileder = {
  navn?: string | null;
  navIdent?: string | null;
};

const getLagtTilData = (hendelser?: HendelseDTO[]) => {
  const opprettetHendelse = hendelser?.find(
    (h) => h.hendelsestype === JobbsøkerHendelsestype.OPPRETTET,
  );

  if (opprettetHendelse) {
    return {
      datoLagtTil: opprettetHendelse.tidspunkt,
      lagtTilAv: opprettetHendelse.aktørIdentifikasjon,
    };
  }

  return {
    datoLagtTil: 'Ukjent dato',
    lagtTilAv: 'Ukjent',
  };
};

const JobbsøkerKort: FC<JobbsøkerKortProps> = ({
  fornavn,
  etternavn,
  personTreffId,
  navKontor,
  veileder,
  status,
  sisteRelevanteHendelse,
  hendelser,
  onCheckboxChange,
  erValgt,
  erDeaktivert = false,
  onInviterClick,
  jobbsøkereHook,
  rekrutteringstreffId,
  rekrutteringstreffStatus,
}) => {
  const [visSlettModal, setVisSlettModal] = useState(false);

  const { datoLagtTil, lagtTilAv } = getLagtTilData(hendelser);
  const erBesokt = useWindowAnkerVisited();

  const windowRef = personTreffAnker(rekrutteringstreffId, personTreffId);

  const slettKnapp = (
    <Button
      size='small'
      variant='secondary'
      disabled={status !== JobbsøkerStatus.LAGT_TIL}
      icon={<TrashIcon aria-hidden />}
      onClick={() => setVisSlettModal(true)}
    >
      Slett
    </Button>
  );

  return (
    <WindowAnker windowRef={windowRef.windowRef} href={windowRef.href}>
      <ListeKort
        className={`${personTreffId ? 'cursor-pointer hover:bg-[var(--ax-bg-neutral-moderate-hover)]' : ''} ${!personTreffId ? 'bg-[var(--ax-bg-neutral-moderate-pressed)]' : ''}`}
      >
        <div className='flex items-center gap-4'>
          {rekrutteringstreffStatus === RekrutteringstreffStatus.PUBLISERT && (
            <Checkbox
              hideLabel
              checked={erValgt}
              onChange={(e) => onCheckboxChange(e.target.checked)}
              disabled={erDeaktivert}
            >
              Velg kandidat {fornavn} {etternavn}
            </Checkbox>
          )}
          <div className='grid w-full'>
            <div className='flex justify-between'>
              <Heading
                size='small'
                className={`inline-flex min-w-0 flex-1 items-center gap-1 pr-2 ${erBesokt ? 'text-text-subtle font-normal' : ''}`}
              >
                <div data-testid={`kandidatkort-lenke-${personTreffId}`}>
                  {fornavn} {etternavn}
                </div>
              </Heading>

              <div className='flex items-center gap-2'>
                {rekrutteringstreffStatus ===
                  RekrutteringstreffStatus.PUBLISERT &&
                  status === JobbsøkerStatus.LAGT_TIL &&
                  onInviterClick && (
                    <Button
                      size='small'
                      variant='secondary'
                      onClick={onInviterClick}
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

                {visSlettModal && (
                  <SlettJobbsøkerModal
                    rekrutteringstreffId={rekrutteringstreffId}
                    jobbsøkerId={personTreffId}
                    jobbsøkerNavn={`${fornavn} ${etternavn}`}
                    jobbsøkereHook={jobbsøkereHook}
                    setVisModal={setVisSlettModal}
                  />
                )}

                <MinsideStatusTag hendelser={hendelser} />

                <JobbsøkerStatusTag
                  status={status}
                  sisteRelevanteHendelse={sisteRelevanteHendelse}
                  hendelser={hendelser}
                />
              </div>
            </div>
            <BodyShort
              size='small'
              className='text-text-subtle mt-1 flex items-center gap-6'
            >
              {navKontor && (
                <span className='flex items-center gap-1'>
                  <Buildings3Icon fontSize='1.25rem' className='shrink-0' />
                  {navKontor}
                </span>
              )}
              {veileder?.navn && (
                <span className='flex items-center gap-1'>
                  <PersonIcon fontSize='1.25rem' className='shrink-0' />
                  Følges opp av {veileder.navn}{' '}
                  {veileder.navIdent && `(${veileder.navIdent})`}
                </span>
              )}
              {lagtTilAv && datoLagtTil && (
                <span>
                  Lagt til av {lagtTilAv},{' '}
                  {format(new Date(datoLagtTil), 'dd.MM.yyyy')}
                </span>
              )}
            </BodyShort>
          </div>
        </div>
      </ListeKort>
    </WindowAnker>
  );
};

export default JobbsøkerKort;
