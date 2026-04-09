'use client';

import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { InviterInternalDto, InviterModal } from './InviterModal';
import JobbsøkerKort from './JobbsøkerKort';
import LeggTilJobbsøkerKnapp from './LeggTilJobbsøkerKnapp';
import JobbsøkerFilterrad from './filter/JobbsøkerFilterrad';
import {
  JobbsøkerSøkState,
  useJobbsøkerSøkContext,
} from './filter/JobbsøkerSøkContext';
import {
  JobbsøkerSorteringsfelt,
  JobbsøkerSorteringsretning,
  JobbsøkerSøkResponsDTO,
  JobbsøkerSøkTreffDTO,
  useJobbsøkerSøk,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { RekrutteringstreffStatusType } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import IngenJobbsøkereMelding from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/IngenJobbsøkereMelding';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import {
  JobbsøkerStatus,
  RekrutteringstreffStatus,
} from '@/app/rekrutteringstreff/_types/constants';
import SWRLaster from '@/components/SWRLaster';
import LitenPaginering from '@/components/paginering/LitenPaginering';
import { SortDownIcon, SortUpIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Checkbox, Select } from '@navikt/ds-react';
import { useEffect, useRef, useState } from 'react';

const erInviterbar = (j: JobbsøkerSøkTreffDTO) =>
  j.status === JobbsøkerStatus.LAGT_TIL;

const jobbsøkerTilInviterDto = (
  jobbsøker: JobbsøkerSøkTreffDTO,
): InviterInternalDto => ({
  personTreffId: jobbsøker.personTreffId,
  fornavn: jobbsøker.fornavn ?? '',
  etternavn: jobbsøker.etternavn ?? '',
  veilederNavIdent: jobbsøker.veilederNavident,
});

const JOBBSØKER_POLLING_INTERVALL_MS = 3000;

const Jobbsøkere = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { treff } = useRekrutteringstreffData();
  const søkState = useJobbsøkerSøkContext();

  const jobbsøkerHook = useJobbsøkerSøk(
    rekrutteringstreffId,
    {
      side: søkState.side,
      antallPerSide: søkState.antallPerSide,
      sorteringsfelt: søkState.sorteringsfelt,
      sorteringsretning: søkState.sorteringsretning,
      fritekst: søkState.fritekst || undefined,
      status: søkState.status.length > 0 ? søkState.status : undefined,
    },
    JOBBSØKER_POLLING_INTERVALL_MS,
  );

  useEffect(() => {
    const responsSide = jobbsøkerHook.data?.side;

    if (responsSide !== undefined && responsSide !== søkState.side) {
      søkState.setSide(responsSide);
    }
  }, [jobbsøkerHook.data?.side, søkState.side, søkState.setSide]);

  return (
    <div className='flex flex-col gap-4'>
      <JobbsøkerFilterrad />
      <SWRLaster<[JobbsøkerSøkResponsDTO | null]> hooks={[jobbsøkerHook]}>
        {(data) => {
          if (!data) {
            return null;
          }

          const { jobbsøkere, totalt, antallSkjulte, antallSlettede, side } =
            data;

          return (
            <JobbsøkerResultatinnhold
              antallPerSide={søkState.antallPerSide}
              antallSkjulte={antallSkjulte}
              antallSlettede={antallSlettede}
              søkState={søkState}
              jobbsøkere={jobbsøkere}
              onMutate={() => {
                void jobbsøkerHook.mutate();
              }}
              rekrutteringstreffId={rekrutteringstreffId}
              side={side}
              totalt={totalt}
              treffStatus={treff?.status}
            />
          );
        }}
      </SWRLaster>
    </div>
  );
};

function JobbsøkerResultatinnhold({
  antallPerSide,
  antallSkjulte,
  antallSlettede,
  søkState,
  jobbsøkere,
  onMutate,
  rekrutteringstreffId,
  side,
  totalt,
  treffStatus,
}: {
  antallPerSide: number;
  antallSkjulte: number;
  antallSlettede: number;
  søkState: JobbsøkerSøkState;
  jobbsøkere: JobbsøkerSøkTreffDTO[];
  onMutate: () => void;
  rekrutteringstreffId: string;
  side: number;
  totalt: number;
  treffStatus: RekrutteringstreffStatusType | undefined;
}) {
  const inviterModalRef = useRef<HTMLDialogElement>(null);
  const [valgteJobbsøkere, setValgteJobbsøkere] = useState<
    InviterInternalDto[]
  >([]);
  const [inviterModalJobbsøkere, setInviterModalJobbsøkere] = useState<
    InviterInternalDto[]
  >([]);

  const filterNøkkel = `${søkState.fritekst}|${søkState.status.join(',')}`;
  const [prevFilterNøkkel, setPrevFilterNøkkel] = useState(filterNøkkel);
  if (filterNøkkel !== prevFilterNøkkel) {
    setPrevFilterNøkkel(filterNøkkel);
    setValgteJobbsøkere([]);
  }

  const fraAntall = totalt === 0 ? 0 : (side - 1) * antallPerSide + 1;
  const tilAntall = totalt === 0 ? 0 : side * antallPerSide;
  const invitertePersonTreffIder = new Set(
    jobbsøkere.filter((j) => !erInviterbar(j)).map((j) => j.personTreffId),
  );

  const valgteSomIkkeErInvitert = valgteJobbsøkere.filter(
    (j) => !invitertePersonTreffIder.has(j.personTreffId),
  );

  const alleJobbsøkerePåSidenErMarkert =
    jobbsøkere.length > 0 &&
    jobbsøkere.every((j) =>
      valgteJobbsøkere.some((v) => v.personTreffId === j.personTreffId),
    );

  const handleCheckboxChange = (
    jobbsøker: JobbsøkerSøkTreffDTO,
    erValgt: boolean,
  ) => {
    const dto = jobbsøkerTilInviterDto(jobbsøker);

    setValgteJobbsøkere((prev) =>
      erValgt
        ? prev.some((j) => j.personTreffId === dto.personTreffId)
          ? prev
          : [...prev, dto]
        : prev.filter((j) => j.personTreffId !== dto.personTreffId),
    );
  };

  const handleMarkerAlle = () => {
    if (valgteJobbsøkere.length > 0) {
      setValgteJobbsøkere([]);
    } else {
      const eksisterendeIder = new Set(
        valgteJobbsøkere.map((j) => j.personTreffId),
      );
      const nyeJobbsøkere = jobbsøkere
        .filter((j) => !eksisterendeIder.has(j.personTreffId))
        .map(jobbsøkerTilInviterDto);
      setValgteJobbsøkere((prev) => [...prev, ...nyeJobbsøkere]);
    }
  };

  const handleInviterDirekte = (jobbsøker: JobbsøkerSøkTreffDTO) => {
    const dto = jobbsøkerTilInviterDto(jobbsøker);
    setInviterModalJobbsøkere([dto]);
    inviterModalRef.current?.showModal();
  };

  const handleInvitasjonSendt = () => {
    inviterModalRef.current?.close();
    setInviterModalJobbsøkere([]);
    setValgteJobbsøkere([]);
    onMutate();
  };

  return (
    <>
      <div className='flex gap-4 text-sm text-gray-400'>
        <span>
          Skjulte: <strong>{antallSkjulte}</strong>
        </span>
        <span>
          Slettede: <strong>{antallSlettede}</strong>
        </span>
      </div>

      <div className='flex flex-row flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <LeggTilJobbsøkerKnapp />
        </div>
        <div className='flex items-center gap-1'>
          <BodyShort>Antall per side </BodyShort>
          <Select
            className='mr-4'
            size='small'
            hideLabel
            label='Antall per side'
            value={String(søkState.antallPerSide)}
            onChange={(e) => {
              søkState.setAntallPerSide(Number(e.target.value));
            }}
          >
            {['25', '50', '75', '100'].map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Select>
          <LitenPaginering
            fraAntall={fraAntall}
            tilAntall={tilAntall}
            total={totalt}
            side={side}
            setSide={søkState.setSide}
          />
        </div>
      </div>

      {jobbsøkere.length > 0 ? (
        <div>
          {treffStatus === RekrutteringstreffStatus.PUBLISERT && (
            <div className='flex flex-row flex-wrap items-center gap-4 px-4 pb-2'>
              <Checkbox
                checked={alleJobbsøkerePåSidenErMarkert}
                indeterminate={
                  valgteJobbsøkere.length > 0 && !alleJobbsøkerePåSidenErMarkert
                }
                onChange={handleMarkerAlle}
                aria-label={
                  valgteJobbsøkere.length > 0
                    ? `${valgteJobbsøkere.length} valgt – klikk for å fjerne markering`
                    : 'Marker alle jobbsøkere'
                }
              >
                <span>
                  {valgteJobbsøkere.length > 0 && (
                    <span>{valgteJobbsøkere.length} valgt</span>
                  )}
                </span>
              </Checkbox>
              <Button
                disabled={valgteSomIkkeErInvitert.length === 0}
                onClick={() => {
                  setInviterModalJobbsøkere(valgteSomIkkeErInvitert);
                  inviterModalRef.current?.showModal();
                }}
              >
                Inviter ({valgteSomIkkeErInvitert.length})
              </Button>
            </div>
          )}
          <JobbsøkerSortHeader
            sorteringsfelt={søkState.sorteringsfelt}
            sorteringsretning={søkState.sorteringsretning}
            setSortering={søkState.setSortering}
          />
          <ul>
            {jobbsøkere.map((jobbsøker) => (
              <li key={jobbsøker.personTreffId}>
                {treffStatus && (
                  <JobbsøkerKort
                    fornavn={jobbsøker.fornavn ?? ''}
                    etternavn={jobbsøker.etternavn ?? ''}
                    personTreffId={jobbsøker.personTreffId}
                    fødselsnummer={jobbsøker.fødselsnummer}
                    navKontor={jobbsøker.navkontor}
                    veileder={{
                      navn: jobbsøker.veilederNavn,
                      navIdent: jobbsøker.veilederNavident,
                    }}
                    status={jobbsøker.status}
                    minsideHendelser={jobbsøker.minsideHendelser}
                    lagtTilDato={jobbsøker.lagtTilDato}
                    lagtTilAv={jobbsøker.lagtTilAv}
                    erValgt={valgteJobbsøkere.some(
                      (v) => v.personTreffId === jobbsøker.personTreffId,
                    )}
                    onCheckboxChange={(valgt) =>
                      handleCheckboxChange(jobbsøker, valgt)
                    }
                    erDeaktivert={false}
                    onInviterClick={() => handleInviterDirekte(jobbsøker)}
                    onMutate={onMutate}
                    rekrutteringstreffId={rekrutteringstreffId}
                    rekrutteringstreffStatus={treffStatus}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <IngenJobbsøkereMelding />
      )}

      <InviterModal
        modalref={inviterModalRef}
        inviterInternalDtoer={inviterModalJobbsøkere}
        onInvitasjonSendt={handleInvitasjonSendt}
        onFjernJobbsøker={(personTreffId) =>
          setInviterModalJobbsøkere((prev) =>
            prev.filter(
              (jobbsøker) => jobbsøker.personTreffId !== personTreffId,
            ),
          )
        }
      />
    </>
  );
}

function JobbsøkerSortHeader({
  sorteringsfelt,
  sorteringsretning,
  setSortering,
}: {
  sorteringsfelt: JobbsøkerSorteringsfelt;
  sorteringsretning: JobbsøkerSorteringsretning;
  setSortering: (
    sorteringsfelt: JobbsøkerSorteringsfelt,
    sorteringsretning?: JobbsøkerSorteringsretning,
  ) => void;
}) {
  const sortIcon = (asc: boolean, desc: boolean) => {
    if (asc) {
      return <SortDownIcon />;
    }
    if (desc) {
      return <SortUpIcon />;
    }
    return null;
  };

  return (
    <div className='grid grid-cols-[2fr_1.5fr_2fr_17rem] items-center gap-x-3 px-6 pb-1'>
      <Button
        iconPosition='right'
        icon={sortIcon(
          sorteringsfelt === JobbsøkerSorteringsfelt.NAVN &&
            sorteringsretning === JobbsøkerSorteringsretning.ASC,
          sorteringsfelt === JobbsøkerSorteringsfelt.NAVN &&
            sorteringsretning === JobbsøkerSorteringsretning.DESC,
        )}
        className='justify-self-start p-0'
        variant='tertiary'
        size='small'
        onClick={() => {
          if (sorteringsfelt === JobbsøkerSorteringsfelt.NAVN) {
            setSortering(
              JobbsøkerSorteringsfelt.NAVN,
              sorteringsretning === JobbsøkerSorteringsretning.ASC
                ? JobbsøkerSorteringsretning.DESC
                : JobbsøkerSorteringsretning.ASC,
            );
          } else {
            setSortering(JobbsøkerSorteringsfelt.NAVN);
          }
        }}
      >
        Navn
      </Button>
      <Button
        iconPosition='right'
        icon={sortIcon(
          sorteringsfelt === JobbsøkerSorteringsfelt.LAGT_TIL &&
            sorteringsretning === JobbsøkerSorteringsretning.ASC,
          sorteringsfelt === JobbsøkerSorteringsfelt.LAGT_TIL &&
            sorteringsretning === JobbsøkerSorteringsretning.DESC,
        )}
        className='justify-self-start p-0'
        variant='tertiary'
        size='small'
        onClick={() => {
          if (sorteringsfelt === JobbsøkerSorteringsfelt.LAGT_TIL) {
            setSortering(
              JobbsøkerSorteringsfelt.LAGT_TIL,
              sorteringsretning === JobbsøkerSorteringsretning.ASC
                ? JobbsøkerSorteringsretning.DESC
                : JobbsøkerSorteringsretning.ASC,
            );
          } else {
            setSortering(JobbsøkerSorteringsfelt.LAGT_TIL);
          }
        }}
      >
        Lagt til
      </Button>
      <BodyShort size='small' className='text-text-subtle justify-self-start'>
        Veileder
      </BodyShort>
    </div>
  );
}

export default Jobbsøkere;
