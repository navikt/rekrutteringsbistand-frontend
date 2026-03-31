'use client';

import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { InviterInternalDto, InviterModal } from './InviterModal';
import JobbsøkerKort from './JobbsøkerKort';
import LeggTilJobbsøkerKnapp from './LeggTilJobbsøkerKnapp';
import { useJobbsøkerFilterContext } from './filter/JobbsøkerFilterContext';
import JobbsøkerFilterrad from './filter/JobbsøkerFilterrad';
import {
  JobbsøkerSortering,
  JobbsøkerSøkTreffDTO,
  useJobbsøkerSøk,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import IngenJobbsøkereMelding from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/IngenJobbsøkereMelding';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import {
  JobbsøkerStatus,
  RekrutteringstreffStatus,
} from '@/app/rekrutteringstreff/_types/constants';
import SWRLaster from '@/components/SWRLaster';
import LitenPaginering from '@/components/paginering/LitenPaginering';
import { SortDownIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Checkbox, Select } from '@navikt/ds-react';
import { useRef, useState } from 'react';

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

type ValgteJobbsøkereState = {
  filterVersjon: number;
  jobbsøkere: InviterInternalDto[];
};

const Jobbsøkere = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { treff } = useRekrutteringstreffData();
  const filter = useJobbsøkerFilterContext();

  const jobbsøkerHook = useJobbsøkerSøk(
    rekrutteringstreffId,
    {
      side: filter.side,
      antallPerSide: filter.antallPerSide,
      sortering: filter.sortering,
      fritekst: filter.fritekst || undefined,
      status: filter.status.length > 0 ? filter.status : undefined,
      innsatsgruppe:
        filter.innsatsgruppe.length > 0 ? filter.innsatsgruppe : undefined,
    },
    JOBBSØKER_POLLING_INTERVALL_MS,
  );

  const inviterModalRef = useRef<HTMLDialogElement>(null);

  const [valgteJobbsøkereState, setValgteJobbsøkereState] =
    useState<ValgteJobbsøkereState>({
      filterVersjon: filter.filterVersjon,
      jobbsøkere: [],
    });
  const [inviterModalJobbsøkere, setInviterModalJobbsøkere] = useState<
    InviterInternalDto[]
  >([]);

  const valgteJobbsøkere =
    valgteJobbsøkereState.filterVersjon === filter.filterVersjon
      ? valgteJobbsøkereState.jobbsøkere
      : [];

  const oppdaterValgteJobbsøkere = (
    oppdater: (prev: InviterInternalDto[]) => InviterInternalDto[],
  ) => {
    setValgteJobbsøkereState((prev) => {
      const gjeldendeJobbsøkere =
        prev.filterVersjon === filter.filterVersjon ? prev.jobbsøkere : [];

      return {
        filterVersjon: filter.filterVersjon,
        jobbsøkere: oppdater(gjeldendeJobbsøkere),
      };
    });
  };

  const nullstillValgteJobbsøkere = () => {
    setValgteJobbsøkereState({
      filterVersjon: filter.filterVersjon,
      jobbsøkere: [],
    });
  };

  const handleCheckboxChange = (
    jobbsøker: JobbsøkerSøkTreffDTO,
    erValgt: boolean,
  ) => {
    const dto = jobbsøkerTilInviterDto(jobbsøker);

    oppdaterValgteJobbsøkere((prev) =>
      erValgt
        ? prev.some((j) => j.personTreffId === dto.personTreffId)
          ? prev
          : [...prev, dto]
        : prev.filter((j) => j.personTreffId !== dto.personTreffId),
    );
  };

  const handleInviterDirekte = (jobbsøker: JobbsøkerSøkTreffDTO) => {
    const dto = jobbsøkerTilInviterDto(jobbsøker);
    setInviterModalJobbsøkere([dto]);
    inviterModalRef.current?.showModal();
  };

  const handleInvitasjonSendt = () => {
    inviterModalRef.current?.close();
    setInviterModalJobbsøkere([]);
    nullstillValgteJobbsøkere();
    jobbsøkerHook.mutate();
  };

  return (
    <div className='flex flex-col gap-4'>
      <JobbsøkerFilterrad />
      <SWRLaster hooks={[jobbsøkerHook]}>
        {({
          jobbsøkere,
          totalt,
          antallSkjulte,
          antallSlettede,
          side,
          antallPerSide,
        }) => {
          const invitertePersonTreffIder = new Set(
            jobbsøkere
              .filter((j) => !erInviterbar(j))
              .map((j) => j.personTreffId),
          );

          const valgteSomIkkeErInvitert = valgteJobbsøkere.filter(
            (j) => !invitertePersonTreffIder.has(j.personTreffId),
          );

          const alleJobbsøkerePåSidenErMarkert =
            jobbsøkere.length > 0 &&
            jobbsøkere.every((j) =>
              valgteJobbsøkere.some((v) => v.personTreffId === j.personTreffId),
            );

          const handleMarkerAlle = () => {
            if (valgteJobbsøkere.length > 0) {
              nullstillValgteJobbsøkere();
            } else {
              const eksisterendeIder = new Set(
                valgteJobbsøkere.map((j) => j.personTreffId),
              );
              const nyeJobbsøkere = jobbsøkere
                .filter((j) => !eksisterendeIder.has(j.personTreffId))
                .map(jobbsøkerTilInviterDto);
              oppdaterValgteJobbsøkere((prev) => [...prev, ...nyeJobbsøkere]);
            }
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
                    value={String(filter.antallPerSide)}
                    onChange={(e) => {
                      filter.setAntallPerSide(Number(e.target.value));
                    }}
                  >
                    {['25', '50', '75', '100'].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Select>
                  <LitenPaginering
                    fraAntall={(side - 1) * antallPerSide + 1}
                    tilAntall={side * antallPerSide}
                    total={totalt}
                    side={side}
                    setSide={filter.setSide}
                  />
                </div>
              </div>

              {jobbsøkere.length > 0 ? (
                <div>
                  {treff?.status === RekrutteringstreffStatus.PUBLISERT && (
                    <div className='flex flex-row flex-wrap items-center gap-4 px-4 pb-2'>
                      <Checkbox
                        checked={alleJobbsøkerePåSidenErMarkert}
                        indeterminate={
                          valgteJobbsøkere.length > 0 &&
                          !alleJobbsøkerePåSidenErMarkert
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
                    sortering={filter.sortering}
                    setSortering={filter.setSortering}
                  />
                  <ul>
                    {jobbsøkere.map((jobbsøker) => (
                      <li key={jobbsøker.personTreffId}>
                        {treff && (
                          <JobbsøkerKort
                            fornavn={jobbsøker.fornavn ?? ''}
                            etternavn={jobbsøker.etternavn ?? ''}
                            personTreffId={jobbsøker.personTreffId}
                            navKontor={jobbsøker.navkontor}
                            veileder={{
                              navn: jobbsøker.veilederNavn,
                              navIdent: jobbsøker.veilederNavident,
                            }}
                            telefonnummer={jobbsøker.telefonnummer}
                            status={jobbsøker.status}
                            minsideHendelser={jobbsøker.minsideHendelser}
                            lagtTilDato={jobbsøker.lagtTilDato}
                            lagtTilAv={jobbsøker.lagtTilAv}
                            erValgt={valgteJobbsøkere.some(
                              (v) =>
                                v.personTreffId === jobbsøker.personTreffId,
                            )}
                            onCheckboxChange={(valgt) =>
                              handleCheckboxChange(jobbsøker, valgt)
                            }
                            erDeaktivert={false}
                            onInviterClick={() =>
                              handleInviterDirekte(jobbsøker)
                            }
                            onMutate={() => jobbsøkerHook.mutate()}
                            rekrutteringstreffId={rekrutteringstreffId}
                            rekrutteringstreffStatus={treff.status}
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
        }}
      </SWRLaster>
    </div>
  );
};

function JobbsøkerSortHeader({
  sortering,
  setSortering,
}: {
  sortering: JobbsøkerSortering;
  setSortering: (s: JobbsøkerSortering) => void;
}) {
  const sortIcon = (aktiv: boolean) => (aktiv ? <SortDownIcon /> : null);

  return (
    <div className='grid grid-cols-[13rem_12rem_8rem_14rem_1fr] items-center gap-x-3 px-6 pb-1'>
      <Button
        iconPosition='right'
        icon={sortIcon(sortering === 'navn')}
        className='justify-self-start p-0'
        variant='tertiary'
        size='small'
        onClick={() => setSortering('navn')}
      >
        Navn
      </Button>
      <Button
        iconPosition='right'
        icon={sortIcon(sortering === 'lagt_til_dato')}
        className='justify-self-start p-0'
        variant='tertiary'
        size='small'
        onClick={() => setSortering('lagt_til_dato')}
      >
        Lagt til
      </Button>
      <BodyShort size='small' className='text-text-subtle justify-self-start'>
        Telefon
      </BodyShort>
      <BodyShort size='small' className='text-text-subtle justify-self-start'>
        Veileder
      </BodyShort>
    </div>
  );
}

export default Jobbsøkere;
