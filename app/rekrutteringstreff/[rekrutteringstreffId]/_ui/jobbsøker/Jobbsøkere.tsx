'use client';

import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { InviterInternalDto, InviterModal } from './InviterModal';
import JobbsøkerKort from './JobbsøkerKort';
import LeggTilJobbsøkerKnapp from './LeggTilJobbsøkerKnapp';
import {
  JobbsøkerFilterverdierDTO,
  JobbsøkerSøkFiltre,
  JobbsøkerSøkTreffDTO,
  useJobbsøkerFilterverdier,
  useJobbsøkerSøk,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import IngenJobbsøkereMelding from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/IngenJobbsøkereMelding';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import {
  JobbsøkerStatus,
  RekrutteringstreffStatus,
} from '@/app/rekrutteringstreff/_types/constants';
import SWRLaster from '@/components/SWRLaster';
import { MagnifyingGlassIcon } from '@navikt/aksel-icons';
import {
  Button,
  Chips,
  Pagination,
  Search,
  Select,
  UNSAFE_Combobox,
} from '@navikt/ds-react';
import { useRef, useState } from 'react';

const ANTALL_PER_SIDE = 20;

const jobbsøkerTilInviterDto = (
  jobbsøker: JobbsøkerSøkTreffDTO,
): InviterInternalDto => ({
  personTreffId: jobbsøker.personTreffId,
  fornavn: jobbsøker.fornavn ?? '',
  etternavn: jobbsøker.etternavn ?? '',
  veilederNavIdent: jobbsøker.veilederNavident,
});

const JOBBSØKER_POLLING_INTERVALL_MS = 10000;

const statusLabels: Record<string, string> = {
  LAGT_TIL: 'Lagt til',
  INVITERT: 'Invitert',
  SVART_JA: 'Svart ja',
  SVART_NEI: 'Svart nei',
};

const innsatsgruppeLabels: Record<string, string> = {
  STANDARD_INNSATS: 'Standard innsats',
  SITUASJONSBESTEMT_INNSATS: 'Situasjonsbestemt innsats',
  SPESIELT_TILPASSET_INNSATS: 'Spesielt tilpasset innsats',
  VARIG_TILPASSET_INNSATS: 'Varig tilpasset innsats',
};

const lagStedValg = (navn: string, type: 'kommune' | 'fylke') =>
  `${navn} (${type})`;

const parseStedValg = (valg: string) => {
  const match = valg.match(/^(.*) \((kommune|fylke)\)$/);
  if (!match) return null;

  return {
    navn: match[1],
    type: match[2] as 'kommune' | 'fylke',
  };
};

const lagFiltre = (
  aktivFritekst: string,
  statusFilter: string[],
  innsatsgruppeFilter: string[],
  navkontorFilter: string[],
  stedFilter: string[],
  sortering: string,
): JobbsøkerSøkFiltre => {
  const valgtSted = stedFilter[0] ? parseStedValg(stedFilter[0]) : null;

  return {
    fritekst: aktivFritekst || undefined,
    status: statusFilter.length > 0 ? statusFilter : undefined,
    innsatsgruppe:
      innsatsgruppeFilter.length > 0 ? innsatsgruppeFilter : undefined,
    navkontor: navkontorFilter[0] || undefined,
    kommune: valgtSted?.type === 'kommune' ? valgtSted.navn : undefined,
    fylke: valgtSted?.type === 'fylke' ? valgtSted.navn : undefined,
    sortering,
  };
};

const harAktiveFiltre = (
  aktivFritekst: string,
  statusFilter: string[],
  navkontorFilter: string[],
  stedFilter: string[],
  innsatsgruppeFilter: string[],
) =>
  Boolean(
    aktivFritekst ||
    statusFilter.length > 0 ||
    navkontorFilter.length > 0 ||
    stedFilter.length > 0 ||
    innsatsgruppeFilter.length > 0,
  );

const lagFiltervalg = (filterverdier?: JobbsøkerFilterverdierDTO) => ({
  navkontor: filterverdier?.navkontor ?? [],
  innsatsgrupper: filterverdier?.innsatsgrupper ?? [],
  steder:
    filterverdier?.steder.map((sted) => lagStedValg(sted.navn, sted.type)) ??
    [],
});

const mapInnsatsgruppeTilLabel = (kode: string) =>
  innsatsgruppeLabels[kode] ?? kode;

const finnInnsatsgruppekode = (label: string) =>
  Object.entries(innsatsgruppeLabels).find(
    ([, verdi]) => verdi === label,
  )?.[0] ?? label;

const Jobbsøkere = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { treff } = useRekrutteringstreffData();
  const inviterModalRef = useRef<HTMLDialogElement>(null);

  const [side, setSide] = useState(1);
  const [fritekst, setFritekst] = useState('');
  const [aktivFritekst, setAktivFritekst] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [navkontorFilter, setNavkontorFilter] = useState<string[]>([]);
  const [stedFilter, setStedFilter] = useState<string[]>([]);
  const [innsatsgruppeFilter, setInnsatsgruppeFilter] = useState<string[]>([]);
  const [sortering, setSortering] = useState('navn');

  const filtre = lagFiltre(
    aktivFritekst,
    statusFilter,
    innsatsgruppeFilter,
    navkontorFilter,
    stedFilter,
    sortering,
  );
  const filterverdierHook = useJobbsøkerFilterverdier(rekrutteringstreffId);

  const jobbsøkerHook = useJobbsøkerSøk(
    rekrutteringstreffId,
    side,
    ANTALL_PER_SIDE,
    filtre,
    JOBBSØKER_POLLING_INTERVALL_MS,
  );

  const [valgteJobbsøkere, setValgteJobbsøkere] = useState<
    InviterInternalDto[]
  >([]);
  const [inviterModalJobbsøkere, setInviterModalJobbsøkere] = useState<
    InviterInternalDto[]
  >([]);

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

  const handleFjernAllMarkering = () => {
    if (valgteJobbsøkere.length === 0) return;
    setValgteJobbsøkere([]);
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

  const handleSøk = () => {
    setAktivFritekst(fritekst);
    setSide(1);
  };

  const toggleStatus = (status: string) => {
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
    setSide(1);
  };

  return (
    <SWRLaster hooks={[filterverdierHook]}>
      {(filterverdier) => {
        const filtervalg = lagFiltervalg(filterverdier);

        return (
          <SWRLaster hooks={[jobbsøkerHook]}>
            {({ totalt, jobbsøkere }) => {
              const invitertePersonTreffIder = new Set(
                jobbsøkere
                  .filter((j) => j.status !== JobbsøkerStatus.LAGT_TIL)
                  .map((j) => j.personTreffId),
              );

              const valgteSomIkkeErInvitert = valgteJobbsøkere.filter(
                (j) => !invitertePersonTreffIder.has(j.personTreffId),
              );

              const antallSider = Math.max(
                1,
                Math.ceil(totalt / ANTALL_PER_SIDE),
              );
              const harFiltre = harAktiveFiltre(
                aktivFritekst,
                statusFilter,
                navkontorFilter,
                stedFilter,
                innsatsgruppeFilter,
              );

              return (
                <div className='flex flex-col gap-4 p-4'>
                  <div className='flex flex-wrap items-end gap-3'>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSøk();
                      }}
                      className='flex-1'
                    >
                      <Search
                        label='Søk etter jobbsøker'
                        hideLabel
                        placeholder='Søk på navn, veileder eller sted...'
                        size='small'
                        value={fritekst}
                        onChange={setFritekst}
                        onClear={() => {
                          setFritekst('');
                          setAktivFritekst('');
                          setSide(1);
                        }}
                      >
                        <Search.Button type='submit'>
                          <MagnifyingGlassIcon aria-hidden />
                        </Search.Button>
                      </Search>
                    </form>
                    <Select
                      label='Sortering'
                      hideLabel
                      size='small'
                      value={sortering}
                      onChange={(e) => {
                        setSortering(e.target.value);
                        setSide(1);
                      }}
                    >
                      <option value='navn'>Navn</option>
                      <option value='invitert_dato'>Invitert dato</option>
                      <option value='status'>Status</option>
                    </Select>
                  </div>

                  <div className='flex flex-wrap gap-3'>
                    <div className='min-w-56 flex-1'>
                      <UNSAFE_Combobox
                        label='Nav-kontor'
                        size='small'
                        options={filtervalg.navkontor}
                        selectedOptions={navkontorFilter}
                        onToggleSelected={(valg, erValgt) => {
                          setNavkontorFilter(erValgt ? [valg] : []);
                          setSide(1);
                        }}
                      />
                    </div>
                    <div className='min-w-56 flex-1'>
                      <UNSAFE_Combobox
                        label='Sted'
                        size='small'
                        options={filtervalg.steder}
                        selectedOptions={stedFilter}
                        onToggleSelected={(valg, erValgt) => {
                          setStedFilter(erValgt ? [valg] : []);
                          setSide(1);
                        }}
                      />
                    </div>
                    <div className='min-w-56 flex-1'>
                      <UNSAFE_Combobox
                        label='Innsatsgruppe'
                        size='small'
                        options={filtervalg.innsatsgrupper.map(
                          mapInnsatsgruppeTilLabel,
                        )}
                        selectedOptions={innsatsgruppeFilter.map(
                          mapInnsatsgruppeTilLabel,
                        )}
                        onToggleSelected={(valg, erValgt) => {
                          const kode = finnInnsatsgruppekode(valg);
                          setInnsatsgruppeFilter(erValgt ? [kode] : []);
                          setSide(1);
                        }}
                      />
                    </div>
                  </div>

                  <Chips size='small' className='flex-wrap'>
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <Chips.Toggle
                        key={value}
                        selected={statusFilter.includes(value)}
                        onClick={() => toggleStatus(value)}
                      >
                        {label}
                      </Chips.Toggle>
                    ))}
                  </Chips>

                  {jobbsøkere.length > 0 ? (
                    <>
                      <div className='flex flex-row flex-wrap items-end justify-between gap-2'>
                        <span className='text-text-subtle text-sm'>
                          {totalt} jobbsøker{totalt !== 1 ? 'e' : ''}
                          {harFiltre ? ' (filtrert)' : ''}
                        </span>
                        <div className='flex items-center gap-2'>
                          <Button
                            variant='secondary'
                            size='small'
                            onClick={handleFjernAllMarkering}
                            disabled={valgteJobbsøkere.length === 0}
                          >
                            Fjern markering
                          </Button>
                          {treff?.status ===
                            RekrutteringstreffStatus.PUBLISERT && (
                            <Button
                              disabled={valgteSomIkkeErInvitert.length === 0}
                              size='small'
                              onClick={() => {
                                setInviterModalJobbsøkere(
                                  valgteSomIkkeErInvitert,
                                );
                                inviterModalRef.current?.showModal();
                              }}
                            >
                              Inviter ({valgteSomIkkeErInvitert.length})
                            </Button>
                          )}
                          <LeggTilJobbsøkerKnapp />
                        </div>
                      </div>

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
                                status={jobbsøker.status}
                                invitertDato={jobbsøker.invitertDato}
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
                                jobbsøkereHook={jobbsøkerHook}
                                rekrutteringstreffId={rekrutteringstreffId}
                                rekrutteringstreffStatus={treff.status}
                              />
                            )}
                          </li>
                        ))}
                      </ul>

                      {antallSider > 1 && (
                        <Pagination
                          page={side}
                          onPageChange={setSide}
                          count={antallSider}
                          size='small'
                          className='self-center'
                        />
                      )}

                      <InviterModal
                        modalref={inviterModalRef}
                        inviterInternalDtoer={inviterModalJobbsøkere}
                        onInvitasjonSendt={handleInvitasjonSendt}
                        onFjernJobbsøker={(personTreffId) =>
                          setInviterModalJobbsøkere((prev) =>
                            prev.filter(
                              (jobbsøker) =>
                                jobbsøker.personTreffId !== personTreffId,
                            ),
                          )
                        }
                      />
                    </>
                  ) : harFiltre ? (
                    <p className='text-text-subtle text-sm'>
                      Ingen jobbsøkere matcher filteret.
                    </p>
                  ) : (
                    <IngenJobbsøkereMelding />
                  )}
                </div>
              );
            }}
          </SWRLaster>
        );
      }}
    </SWRLaster>
  );
};

export default Jobbsøkere;
