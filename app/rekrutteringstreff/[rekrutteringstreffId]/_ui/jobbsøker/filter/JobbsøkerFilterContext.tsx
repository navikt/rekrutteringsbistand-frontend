'use client';

import {
  JobbsøkerSorteringsfelt,
  JobbsøkerSorteringsretning,
  standardRetningForSorteringsfelt,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
import {
  createParser,
  parseAsArrayOf,
  parseAsNumberLiteral,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

export interface JobbsøkerFilterState {
  side: number;
  setSide: (side: number) => void;
  antallPerSide: number;
  setAntallPerSide: (antall: number) => void;
  sorteringsfelt: JobbsøkerSorteringsfelt;
  sorteringsretning: JobbsøkerSorteringsretning;
  setSortering: (
    sorteringsfelt: JobbsøkerSorteringsfelt,
    sorteringsretning?: JobbsøkerSorteringsretning,
  ) => void;
  fritekst: string;
  setFritekst: (fritekst: string) => void;
  status: string[];
  setStatus: (status: string[]) => void;
  tømAlleFiltre: () => void;
  harAktiveFiltre: boolean;
  filterVersjon: number;
}

const JobbsøkerFilterContext = createContext<JobbsøkerFilterState | null>(null);

const ANTALL_PER_SIDE = 25;
const GYLDIGE_ANTALL_PER_SIDE = [25, 50, 75, 100] as const;
type JobbsøkerStatusVerdi =
  (typeof JobbsøkerStatus)[keyof typeof JobbsøkerStatus];

const sorteringsfeltVerdier = Object.values(
  JobbsøkerSorteringsfelt,
) as JobbsøkerSorteringsfelt[];
const sorteringsretningVerdier = Object.values(
  JobbsøkerSorteringsretning,
) as JobbsøkerSorteringsretning[];
const jobbsøkerStatusVerdier = Object.values(
  JobbsøkerStatus,
) as JobbsøkerStatusVerdi[];

const positivtHeltallParser = createParser<number>({
  parse: (value) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
  },
  serialize: String,
});

const jobbsøkerFilterParsers = {
  side: positivtHeltallParser
    .withDefault(1)
    .withOptions({ clearOnDefault: true }),
  antallPerSide: parseAsNumberLiteral(GYLDIGE_ANTALL_PER_SIDE)
    .withDefault(ANTALL_PER_SIDE)
    .withOptions({ clearOnDefault: true }),
  sortering: parseAsStringEnum(sorteringsfeltVerdier)
    .withDefault(JobbsøkerSorteringsfelt.NAVN)
    .withOptions({ clearOnDefault: true }),
  retning: parseAsStringEnum(sorteringsretningVerdier).withOptions({
    clearOnDefault: true,
  }),
  fritekst: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  status: parseAsArrayOf(parseAsStringEnum(jobbsøkerStatusVerdier))
    .withDefault([])
    .withOptions({ clearOnDefault: true }),
};

export function JobbsøkerFilterProvider({ children }: { children: ReactNode }) {
  const [filterState, setFilterState] = useQueryStates(jobbsøkerFilterParsers);
  const [filterVersjon, setFilterVersjon] = useState(0);

  const sorteringsretning =
    filterState.retning ??
    standardRetningForSorteringsfelt(filterState.sortering);

  const resetValgteJobbsøkere = useCallback(
    () => setFilterVersjon((v) => v + 1),
    [],
  );

  const setSide = useCallback(
    (s: number) => {
      void setFilterState({ side: s });
      resetValgteJobbsøkere();
    },
    [resetValgteJobbsøkere, setFilterState],
  );
  const setAntallPerSide = useCallback(
    (a: number) => {
      if (
        !GYLDIGE_ANTALL_PER_SIDE.includes(
          a as (typeof GYLDIGE_ANTALL_PER_SIDE)[number],
        )
      ) {
        return;
      }

      void setFilterState({
        antallPerSide: a as (typeof GYLDIGE_ANTALL_PER_SIDE)[number],
        side: 1,
      });
      resetValgteJobbsøkere();
    },
    [resetValgteJobbsøkere, setFilterState],
  );
  const setSortering = useCallback(
    (
      felt: JobbsøkerSorteringsfelt,
      retning: JobbsøkerSorteringsretning = standardRetningForSorteringsfelt(
        felt,
      ),
    ) => {
      void setFilterState({
        sortering: felt,
        retning:
          retning === standardRetningForSorteringsfelt(felt) ? null : retning,
        side: 1,
      });
      resetValgteJobbsøkere();
    },
    [resetValgteJobbsøkere, setFilterState],
  );
  const setFritekst = useCallback(
    (f: string) => {
      void setFilterState({ fritekst: f, side: 1 });
      resetValgteJobbsøkere();
    },
    [resetValgteJobbsøkere, setFilterState],
  );
  const setStatus = useCallback(
    (s: string[]) => {
      void setFilterState({ status: s as JobbsøkerStatusVerdi[], side: 1 });
      resetValgteJobbsøkere();
    },
    [resetValgteJobbsøkere, setFilterState],
  );

  const harAktiveFiltre =
    filterState.fritekst !== '' || filterState.status.length > 0;

  const tømAlleFiltre = useCallback(() => {
    void setFilterState({
      fritekst: '',
      status: [],
      side: 1,
    });
    resetValgteJobbsøkere();
  }, [resetValgteJobbsøkere, setFilterState]);

  return (
    <JobbsøkerFilterContext.Provider
      value={{
        side: filterState.side,
        setSide,
        antallPerSide: filterState.antallPerSide,
        setAntallPerSide,
        sorteringsfelt: filterState.sortering,
        sorteringsretning,
        setSortering,
        fritekst: filterState.fritekst,
        setFritekst,
        status: filterState.status,
        setStatus,
        tømAlleFiltre,
        harAktiveFiltre,
        filterVersjon,
      }}
    >
      {children}
    </JobbsøkerFilterContext.Provider>
  );
}

export function useJobbsøkerFilterContext(): JobbsøkerFilterState {
  const context = useContext(JobbsøkerFilterContext);
  if (!context) {
    throw new Error(
      'useJobbsøkerFilterContext må brukes innenfor JobbsøkerFilterProvider',
    );
  }
  return context;
}
