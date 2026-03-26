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
import AlleFilterKomponent from '@/components/filter/AlleFilterKomponent';
import FilterKomponent from '@/components/filter/FilterKomponent';
import LitenPaginering from '@/components/paginering/LitenPaginering';
import { MagnifyingGlassIcon, SortDownIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Button,
  Checkbox,
  Chips,
  Search,
  Select,
  UNSAFE_Combobox,
} from '@navikt/ds-react';
import { useRef, useState } from 'react';

const ANTALL_PER_SIDE = 20;
const ANTALL_PER_SIDE_OPTIONS = ['20', '50', '100'];
const JOBBSØKER_COLUMN_LAYOUT =
  'grid-cols-1 lg:grid-cols-[minmax(14rem,2fr)_minmax(10rem,1fr)_minmax(12rem,1.2fr)_minmax(8rem,0.8fr)_minmax(9rem,0.9fr)_auto]';

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

type AktivtFilterChip = {
  key: string;
  label: string;
  onRemove: () => void;
};

const lagAktiveFilterChips = (
  aktivFritekst: string,
  statusFilter: string[],
  navkontorFilter: string[],
  stedFilter: string[],
  innsatsgruppeFilter: string[],
  setAktivFritekst: (verdi: string) => void,
  setFritekst: (verdi: string) => void,
  setStatusFilter: (verdi: string[]) => void,
  setNavkontorFilter: (verdi: string[]) => void,
  setStedFilter: (verdi: string[]) => void,
  setInnsatsgruppeFilter: (verdi: string[]) => void,
): AktivtFilterChip[] => {
  const chips: AktivtFilterChip[] = [];

  if (aktivFritekst) {
    chips.push({
      key: `fritekst-${aktivFritekst}`,
      label: `Søk: ${aktivFritekst}`,
      onRemove: () => {
        setAktivFritekst('');
        setFritekst('');
      },
    });
  }

  statusFilter.forEach((status) => {
    chips.push({
      key: `status-${status}`,
      label: statusLabels[status] ?? status,
      onRemove: () =>
        setStatusFilter(statusFilter.filter((verdi) => verdi !== status)),
    });
  });

  navkontorFilter.forEach((navkontor) => {
    chips.push({
      key: `navkontor-${navkontor}`,
      label: navkontor,
      onRemove: () => setNavkontorFilter([]),
    });
  });

  stedFilter.forEach((sted) => {
    chips.push({
      key: `sted-${sted}`,
      label: sted,
      onRemove: () => setStedFilter([]),
    });
  });

  innsatsgruppeFilter.forEach((innsatsgruppe) => {
    chips.push({
      key: `innsatsgruppe-${innsatsgruppe}`,
      label: mapInnsatsgruppeTilLabel(innsatsgruppe),
      onRemove: () => setInnsatsgruppeFilter([]),
    });
  });

  return chips;
};

interface SorteringsknappProps {
  label: string;
  value: string;
  aktivSortering: string;
  onClick: (value: string) => void;
}

const Sorteringsknapp = ({
  label,
  value,
  aktivSortering,
  onClick,
}: SorteringsknappProps) => (
  <Button
    type='button'
    variant='tertiary'
    size='small'
    className='justify-start px-0'
    iconPosition='right'
    icon={aktivSortering === value ? <SortDownIcon aria-hidden /> : undefined}
    onClick={() => onClick(value)}
    data-testid={`jobbsokere-sort-${value}`}
  >
    {label}
  </Button>
);

const Jobbsøkere = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { treff } = useRekrutteringstreffData();
  const inviterModalRef = useRef<HTMLDialogElement>(null);

  const [side, setSide] = useState(1);
  const [antallPerSide, setAntallPerSide] = useState(ANTALL_PER_SIDE);
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
    antallPerSide,
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

  const handleNullstillFiltre = () => {
    setFritekst('');
    setAktivFritekst('');
    setStatusFilter([]);
    setNavkontorFilter([]);
    setStedFilter([]);
    setInnsatsgruppeFilter([]);
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

              const harFiltre = harAktiveFiltre(
                aktivFritekst,
                statusFilter,
                navkontorFilter,
                stedFilter,
                innsatsgruppeFilter,
              );
              const aktiveFilterChips = lagAktiveFilterChips(
                aktivFritekst,
                statusFilter,
                navkontorFilter,
                stedFilter,
                innsatsgruppeFilter,
                setAktivFritekst,
                setFritekst,
                setStatusFilter,
                setNavkontorFilter,
                setStedFilter,
                setInnsatsgruppeFilter,
              );
              const fraAntall =
                totalt === 0 ? 0 : (side - 1) * antallPerSide + 1;
              const tilAntall = Math.min(side * antallPerSide, totalt);

              return (
                <div className='flex flex-col gap-4 p-4'>
                  <div className='flex flex-wrap items-start gap-4'>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSøk();
                      }}
                      className='w-full md:w-[18rem]'
                    >
                      <Search
                        label='Søk etter jobbsøker'
                        hideLabel
                        placeholder='Søk på navn, veileder eller sted...'
                        variant='secondary'
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
                    <div className='hidden flex-wrap items-center gap-4 md:flex'>
                      <FilterKomponent tittel='Status'>
                        <div className='flex min-w-56 flex-col gap-2 p-3'>
                          {Object.entries(statusLabels).map(
                            ([value, label]) => (
                              <Checkbox
                                key={value}
                                checked={statusFilter.includes(value)}
                                onChange={() => toggleStatus(value)}
                              >
                                {label}
                              </Checkbox>
                            ),
                          )}
                        </div>
                      </FilterKomponent>
                      <FilterKomponent tittel='Nav-kontor'>
                        <div className='w-72 p-2'>
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
                      </FilterKomponent>
                      <FilterKomponent tittel='Sted'>
                        <div className='w-72 p-2'>
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
                      </FilterKomponent>
                      <FilterKomponent tittel='Innsatsgruppe'>
                        <div className='w-72 p-2'>
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
                      </FilterKomponent>
                    </div>
                    <div className='flex items-center gap-2 md:hidden'>
                      <Select
                        label='Sorter jobbsøkere'
                        size='small'
                        value={sortering}
                        onChange={(e) => {
                          setSortering(e.target.value);
                          setSide(1);
                        }}
                      >
                        <option value='navn'>Navn</option>
                        <option value='invitert_dato'>Invitert</option>
                        <option value='status'>Status</option>
                      </Select>
                      <AlleFilterKomponent>
                        <div className='flex flex-col gap-2'>
                          <BodyShort size='small'>Status</BodyShort>
                          {Object.entries(statusLabels).map(
                            ([value, label]) => (
                              <Checkbox
                                key={value}
                                checked={statusFilter.includes(value)}
                                onChange={() => toggleStatus(value)}
                              >
                                {label}
                              </Checkbox>
                            ),
                          )}
                        </div>
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
                      </AlleFilterKomponent>
                    </div>
                  </div>

                  {aktiveFilterChips.length > 0 && (
                    <div className='relative mt-1 w-full'>
                      <Chips>
                        <div className='flex flex-row flex-wrap gap-2 pb-2'>
                          <Chips.Toggle
                            data-color='neutral'
                            checkmark={false}
                            onClick={handleNullstillFiltre}
                            style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
                          >
                            Fjern alle filtre
                          </Chips.Toggle>
                          {aktiveFilterChips.map((chip) => (
                            <Chips.Removable
                              key={chip.key}
                              onClick={() => {
                                chip.onRemove();
                                setSide(1);
                              }}
                            >
                              {chip.label}
                            </Chips.Removable>
                          ))}
                        </div>
                      </Chips>
                    </div>
                  )}

                  {jobbsøkere.length > 0 ? (
                    <>
                      <div className='flex flex-wrap items-center justify-between gap-3'>
                        <BodyShort size='small' className='text-text-subtle'>
                          {totalt} jobbsøker{totalt !== 1 ? 'e' : ''}
                          {harFiltre ? ' (filtrert)' : ''}
                        </BodyShort>
                        <div className='flex flex-wrap items-center gap-2'>
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

                      <div className='flex flex-wrap items-center justify-between gap-3'>
                        <div className='hidden md:flex' />
                        <div className='flex flex-wrap items-center gap-2 md:gap-3'>
                          <BodyShort size='small'>Antall per side</BodyShort>
                          <Select
                            label='Antall per side'
                            hideLabel
                            size='small'
                            value={String(antallPerSide)}
                            onChange={(e) => {
                              setAntallPerSide(Number(e.target.value));
                              setSide(1);
                            }}
                          >
                            {ANTALL_PER_SIDE_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </Select>
                          {totalt > antallPerSide && (
                            <LitenPaginering
                              fraAntall={fraAntall}
                              tilAntall={tilAntall}
                              total={totalt}
                              side={side}
                              setSide={setSide}
                            />
                          )}
                        </div>
                      </div>

                      <div className='overflow-x-auto'>
                        <div className='min-w-[72rem]'>
                          <div
                            className={`hidden lg:grid ${JOBBSØKER_COLUMN_LAYOUT} gap-x-3 px-4 pb-2`}
                          >
                            <div>
                              <Sorteringsknapp
                                label='Navn'
                                value='navn'
                                aktivSortering={sortering}
                                onClick={(value) => {
                                  setSortering(value);
                                  setSide(1);
                                }}
                              />
                            </div>
                            <BodyShort size='small' className='font-semibold'>
                              Nav-kontor
                            </BodyShort>
                            <BodyShort size='small' className='font-semibold'>
                              Veileder
                            </BodyShort>
                            <div>
                              <Sorteringsknapp
                                label='Invitert'
                                value='invitert_dato'
                                aktivSortering={sortering}
                                onClick={(value) => {
                                  setSortering(value);
                                  setSide(1);
                                }}
                              />
                            </div>
                            <div>
                              <Sorteringsknapp
                                label='Status'
                                value='status'
                                aktivSortering={sortering}
                                onClick={(value) => {
                                  setSortering(value);
                                  setSide(1);
                                }}
                              />
                            </div>
                            <div />
                          </div>

                          <ul className='grid gap-1'>
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
                                    minsideHendelser={
                                      jobbsøker.minsideHendelser
                                    }
                                    erValgt={valgteJobbsøkere.some(
                                      (v) =>
                                        v.personTreffId ===
                                        jobbsøker.personTreffId,
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
                        </div>
                      </div>

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
