'use client';

import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { InviterInternalDto, InviterModal } from './InviterModal';
import JobbsøkerKort from './JobbsøkerKort';
import LeggTilJobbsøkerKnapp from './LeggTilJobbsøkerKnapp';
import { useJobbsøkerFilterContext } from './filter/JobbsøkerFilterContext';
import JobbsøkerFilterrad from './filter/JobbsøkerFilterrad';
import {
  JobbsøkerSorteringsfelt,
  JobbsøkerSorteringsretning,
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
  const filter = useJobbsøkerFilterContext();

  const jobbsøkerHook = useJobbsøkerSøk(
    rekrutteringstreffId,
    {
      side: filter.side,
      antallPerSide: filter.antallPerSide,
      sorteringsfelt: filter.sorteringsfelt,
      sorteringsretning: filter.sorteringsretning,
      fritekst: filter.fritekst || undefined,
      status: filter.status.length > 0 ? filter.status : undefined,
    },
    JOBBSØKER_POLLING_INTERVALL_MS,
  );

  const inviterModalRef = useRef<HTMLDialogElement>(null);

  const [prevFilterVersjon, setPrevFilterVersjon] = useState(
    filter.filterVersjon,
  );
  const [valgteJobbsøkere, setValgteJobbsøkere] = useState<
    InviterInternalDto[]
  >([]);
  const [inviterModalJobbsøkere, setInviterModalJobbsøkere] = useState<
    InviterInternalDto[]
  >([]);

  useEffect(() => {
    const responsSide = jobbsøkerHook.data?.side;

    if (responsSide !== undefined && responsSide !== filter.side) {
      filter.setSide(responsSide);
    }
  }, [jobbsøkerHook.data?.side, filter.side, filter.setSide]);

  if (filter.filterVersjon !== prevFilterVersjon) {
    setPrevFilterVersjon(filter.filterVersjon);
    if (valgteJobbsøkere.length > 0) {
      setValgteJobbsøkere([]);
    }
  }

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

  const handleInviterDirekte = (jobbsøker: JobbsøkerSøkTreffDTO) => {
    const dto = jobbsøkerTilInviterDto(jobbsøker);
    setInviterModalJobbsøkere([dto]);
    inviterModalRef.current?.showModal();
  };

  const handleInvitasjonSendt = () => {
    inviterModalRef.current?.close();
    setInviterModalJobbsøkere([]);
    setValgteJobbsøkere([]);
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
          const fraAntall = totalt === 0 ? 0 : (side - 1) * antallPerSide + 1;
          const tilAntall = totalt === 0 ? 0 : side * antallPerSide;
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
                    fraAntall={fraAntall}
                    tilAntall={tilAntall}
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
                    sorteringsfelt={filter.sorteringsfelt}
                    sorteringsretning={filter.sorteringsretning}
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
                            fodselsnummer={jobbsøker.fodselsnummer}
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
