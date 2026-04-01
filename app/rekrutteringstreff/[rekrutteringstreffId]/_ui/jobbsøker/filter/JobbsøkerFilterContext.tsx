'use client';

import {
  JobbsøkerSorteringsfelt,
  JobbsøkerSorteringsretning,
  standardRetningForSorteringsfelt,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
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
  innsatsgruppe: string[];
  setInnsatsgruppe: (innsatsgruppe: string[]) => void;
  tømAlleFiltre: () => void;
  harAktiveFiltre: boolean;
  filterVersjon: number;
}

const JobbsøkerFilterContext = createContext<JobbsøkerFilterState | null>(null);

const ANTALL_PER_SIDE = 25;

export function JobbsøkerFilterProvider({ children }: { children: ReactNode }) {
  const [side, setSideRaw] = useState(1);
  const [antallPerSide, setAntallPerSideRaw] = useState(ANTALL_PER_SIDE);
  const [sorteringsfelt, setSorteringsfeltRaw] =
    useState<JobbsøkerSorteringsfelt>(JobbsøkerSorteringsfelt.NAVN);
  const [sorteringsretning, setSorteringsretningRaw] =
    useState<JobbsøkerSorteringsretning>(JobbsøkerSorteringsretning.ASC);
  const [fritekst, setFritekstRaw] = useState('');
  const [status, setStatusRaw] = useState<string[]>([]);
  const [innsatsgruppe, setInnsatsgruppeRaw] = useState<string[]>([]);
  const [filterVersjon, setFilterVersjon] = useState(0);

  const resetValgteJobbsøkere = useCallback(
    () => setFilterVersjon((v) => v + 1),
    [],
  );
  const resetTilFørsteSide = useCallback(() => setSideRaw(1), []);

  const setSide = useCallback(
    (s: number) => {
      setSideRaw(s);
      resetValgteJobbsøkere();
    },
    [resetValgteJobbsøkere],
  );
  const setAntallPerSide = useCallback(
    (a: number) => {
      setAntallPerSideRaw(a);
      resetTilFørsteSide();
      resetValgteJobbsøkere();
    },
    [resetTilFørsteSide, resetValgteJobbsøkere],
  );
  const setSortering = useCallback(
    (
      felt: JobbsøkerSorteringsfelt,
      retning: JobbsøkerSorteringsretning = standardRetningForSorteringsfelt(
        felt,
      ),
    ) => {
      setSorteringsfeltRaw(felt);
      setSorteringsretningRaw(retning);
      resetTilFørsteSide();
      resetValgteJobbsøkere();
    },
    [resetTilFørsteSide, resetValgteJobbsøkere],
  );
  const setFritekst = useCallback(
    (f: string) => {
      setFritekstRaw(f);
      resetTilFørsteSide();
      resetValgteJobbsøkere();
    },
    [resetTilFørsteSide, resetValgteJobbsøkere],
  );
  const setStatus = useCallback(
    (s: string[]) => {
      setStatusRaw(s);
      resetTilFørsteSide();
      resetValgteJobbsøkere();
    },
    [resetTilFørsteSide, resetValgteJobbsøkere],
  );
  const setInnsatsgruppe = useCallback(
    (i: string[]) => {
      setInnsatsgruppeRaw(i);
      resetTilFørsteSide();
      resetValgteJobbsøkere();
    },
    [resetTilFørsteSide, resetValgteJobbsøkere],
  );

  const harAktiveFiltre =
    fritekst !== '' || status.length > 0 || innsatsgruppe.length > 0;

  const tømAlleFiltre = useCallback(() => {
    setFritekstRaw('');
    setStatusRaw([]);
    setInnsatsgruppeRaw([]);
    setSideRaw(1);
    resetValgteJobbsøkere();
  }, [resetValgteJobbsøkere]);

  return (
    <JobbsøkerFilterContext.Provider
      value={{
        side,
        setSide,
        antallPerSide,
        setAntallPerSide,
        sorteringsfelt,
        sorteringsretning,
        setSortering,
        fritekst,
        setFritekst,
        status,
        setStatus,
        innsatsgruppe,
        setInnsatsgruppe,
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
