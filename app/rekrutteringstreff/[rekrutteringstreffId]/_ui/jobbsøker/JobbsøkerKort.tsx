import { JobbsøkerStatusType } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import {
  HendelseDTO,
  RekrutteringstreffStatusType,
} from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import EndreSvarJobbsøkerModal from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/EndreSvarJobbsøkerModal';
import JobbsøkerKortValg from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/JobbsokerKortValg';
import JobbsøkerStatusTag from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/JobbsøkerStatusTag';
import SlettJobbsøkerModal from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/SlettJobbsøkerModal';
import { useJobbsøkerOppmøte } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/useJobbsøkerOppmøte';
import {
  JobbsøkerStatus,
  RekrutteringstreffStatus,
} from '@/app/rekrutteringstreff/_types/constants';
import { formaterNavn } from '@/app/rekrutteringstreff/_utils/formaterNavn';
import ListeKort from '@/components/layout/ListeKort';
import WindowAnker, {
  useWindowAnkerVisited,
} from '@/components/window/WindowAnker';
import { personTreffAnker } from '@/components/window/ankerLenker';
import { BodyShort, Checkbox, Tag } from '@navikt/ds-react';
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

const JobbsøkerNavn: FC<{ navn: string; personTreffId: string }> = ({
  navn,
  personTreffId,
}) => {
  const erBesokt = useWindowAnkerVisited();
  return (
    <BodyShort
      weight='semibold'
      data-testid={`kandidatkort-lenke-${personTreffId}`}
      className={erBesokt ? 'text-text-subtle font-normal' : ''}
    >
      {navn}
    </BodyShort>
  );
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
  alder?: number | null;
  onCheckboxChange: (checked: boolean) => void;
  erValgt: boolean;
  erDeaktivert?: boolean;
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
  alder,
  onCheckboxChange,
  erValgt,
  erDeaktivert = false,
  onMutate,
  rekrutteringstreffId,
  rekrutteringstreffStatus,
}) => {
  const [visSlettModal, setVisSlettModal] = useState(false);
  const harCheckbox =
    rekrutteringstreffStatus === RekrutteringstreffStatus.PUBLISERT;

  const windowRef = personTreffAnker(rekrutteringstreffId, personTreffId);
  const lagtTilDatoVisning = formaterLagtTilDato(lagtTilDato);
  const lagtTilAvVisning = formaterLagtTilAv(lagtTilAv, lagtTilAvNavn);
  const visningsnavn = formaterNavn(etternavn, fornavn, personTreffId);
  const [visEndreSvarModal, setVisEndreSvarModal] = useState(false);
  const {
    visOppmøte,
    erMøtt,
    lagrer: oppmøteLagrer,
    feil: oppmøteFeil,
    toggleOppmøte,
  } = useJobbsøkerOppmøte(rekrutteringstreffId, personTreffId);

  return (
    <>
      <ListeKort
        className={`mb-3 p-4 ${personTreffId ? 'cursor-pointer hover:bg-[var(--ax-bg-neutral-moderate-hover)]' : ''} ${!personTreffId ? 'bg-[var(--ax-bg-neutral-moderate-pressed)]' : ''}`}
      >
        <div className='flex w-full flex-row items-center'>
          <div className='basis-1/4'>
            <div className='flex items-center gap-2'>
              {rekrutteringstreffStatus ===
                RekrutteringstreffStatus.PUBLISERT && (
                <Checkbox
                  className='relative z-10'
                  hideLabel
                  checked={erValgt}
                  onChange={(e) => {
                    e.stopPropagation();
                    onCheckboxChange(e.target.checked);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  disabled={erDeaktivert || status !== JobbsøkerStatus.LAGT_TIL}
                >
                  Velg kandidat {visningsnavn}
                </Checkbox>
              )}
              {personTreffId ? (
                <WindowAnker
                  stretchet
                  windowRef={windowRef.windowRef}
                  href={windowRef.href}
                  aria-label={visningsnavn}
                >
                  <JobbsøkerNavn
                    navn={visningsnavn}
                    personTreffId={personTreffId}
                  />
                </WindowAnker>
              ) : (
                <BodyShort
                  weight='semibold'
                  data-testid={`kandidatkort-lenke-${personTreffId}`}
                >
                  {visningsnavn}
                </BodyShort>
              )}
            </div>
            {fødselsnummer && (
              <BodyShort
                size='small'
                className={`text-text-subtle ${harCheckbox ? 'pl-8' : ''}`}
              >
                f.nr. {fødselsnummer}
              </BodyShort>
            )}
          </div>

          <div className='flex basis-1/4 justify-around'>
            {alder && alder <= 30 && (
              <Tag data-color={'meta-lime'}>Under 30</Tag>
            )}
          </div>

          <div className='flex basis-1/4 flex-col items-center'>
            {lagtTilDatoVisning && (
              <BodyShort size='small' className='text-text-subtle'>
                {lagtTilDatoVisning}
              </BodyShort>
            )}
            {lagtTilAvVisning && (
              <BodyShort size='small' className='text-text-subtle text-center'>
                {lagtTilAvVisning}
              </BodyShort>
            )}
          </div>

          <div className='flex basis-1/4 items-center justify-end gap-2'>
            {visOppmøte && erMøtt && (
              <Tag variant='success' size='small' className='relative z-10'>
                Møtt
              </Tag>
            )}
            <div className='relative z-10'>
              <JobbsøkerStatusTag
                status={status}
                minsideHendelser={minsideHendelser}
              />
            </div>
            <div className='relative z-10'>
              <JobbsøkerKortValg
                endreSvar={() => setVisEndreSvarModal(true)}
                slettJobbsøker={() => setVisSlettModal(true)}
                jobbsøkerStatus={status}
                rekrutteringstreffStatus={rekrutteringstreffStatus}
                visOppmøte={visOppmøte}
                erMøtt={erMøtt}
                oppmøteLagrer={oppmøteLagrer}
                onToggleOppmøte={() => void toggleOppmøte()}
              />
            </div>
          </div>
        </div>
      </ListeKort>

      {oppmøteFeil && (
        <BodyShort role='alert' className='mb-3'>
          {oppmøteFeil}
        </BodyShort>
      )}

      {visSlettModal && (
        <SlettJobbsøkerModal
          rekrutteringstreffId={rekrutteringstreffId}
          jobbsøkerId={personTreffId}
          jobbsøkerNavn={visningsnavn}
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
          gjeldendeSvar={
            status === JobbsøkerStatus.SVART_JA
              ? true
              : status === JobbsøkerStatus.SVART_NEI
                ? false
                : null
          }
          lukkModal={() => setVisEndreSvarModal(false)}
        />
      )}
    </>
  );
};

export default JobbsøkerKort;
