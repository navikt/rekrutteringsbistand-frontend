import {
  JobbsøkerSøkResponsDTO,
  JobbsøkerStatusType,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { RekrutteringstreffStatusType } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import JobbsøkerStatusTag from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/JobbsøkerStatusTag';
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
import { FC, useState } from 'react';
import { SWRResponse } from 'swr';

interface JobbsøkerKortProps {
  personTreffId: string;
  fornavn: string;
  etternavn: string;
  navKontor?: string | null;
  veileder?: Veileder | null;
  status: JobbsøkerStatusType;
  invitertDato?: string | null;
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

const JobbsøkerKort: FC<JobbsøkerKortProps> = ({
  fornavn,
  etternavn,
  personTreffId,
  navKontor,
  veileder,
  status,
  onCheckboxChange,
  erValgt,
  erDeaktivert = false,
  onInviterClick,
  jobbsøkereHook,
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
          <div className='grid w-full'>
            <div className='flex flex-wrap items-center justify-between'>
              <Heading
                size='small'
                className={`inline-flex flex-1 items-center gap-2 pr-2 ${erBesokt ? 'text-text-subtle font-normal' : ''}`}
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
                <div data-testid={`kandidatkort-lenke-${personTreffId}`}>
                  {fornavn} {etternavn}
                </div>
              </Heading>

              <div className='flex items-center gap-2'>
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
            <BodyShort
              size='small'
              className={`text-text-subtle mt-1 flex flex-row items-center gap-x-6 ${harCheckbox ? 'pl-8' : ''}`}
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
            </BodyShort>
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
