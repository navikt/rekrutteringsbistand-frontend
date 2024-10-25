'use client';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import * as React from 'react';

export enum KandidatFilterQueryparam {
  Status = 'status',
  Hendelse = 'hendelse',
}

export enum KandidatStatus {
  VURDERES = 'Vurderes',
  KONTAKTET = 'Kontaktet',
  AKTUELL = 'Aktuell',
  TIL_INTERVJU = 'Til intervju',
  UAKTUELL = 'Uaktuell',
  UINTERESSERT = 'Uinteressert',
}

export enum KandidatHendelser {
  //TODO Finn riktige navn på hendelser
  NY_KANDIDAT = 'Ny kandidat',
  DELT_MED_KANDIDAT = 'Stilling delt med kandidat',
  SVAR_JA = 'Svart ja',
  SVAR_NEI = 'Svart nei',
  CV_DELT = 'CV delt med arbeidsgiver',
  CV_SLETTET = 'CV slettet',
  FÅTT_JOBB = 'Fått jobb',
  EKSTERN_VARSEL_FEILET = 'Ekstern varsel feilet',
  SMS_SENDT = 'SMS sendt',
  EPOST_SENDT = 'Epost sendt',
}

interface IStillingsKandidaterContext {
  status: string[];
  setStatus: (val: string[]) => void;
  hendelse: string[];
  setHendelse: (val: string[]) => void;
}

const StillingsKandidaterFilterContext = React.createContext<
  IStillingsKandidaterContext | undefined
>(undefined);

export const StillingsKandidaterFilterProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [status, setStatus] = useQueryState<string[]>(
    KandidatFilterQueryparam.Status,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  const [hendelse, setHendelse] = useQueryState<string[]>(
    KandidatFilterQueryparam.Hendelse,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  return (
    <StillingsKandidaterFilterContext.Provider
      value={{
        status,
        setStatus,
        hendelse,
        setHendelse,
      }}
    >
      {children}
    </StillingsKandidaterFilterContext.Provider>
  );
};

export const useStillingsKandidaterFilter = () => {
  const context = React.useContext(StillingsKandidaterFilterContext);
  if (context === undefined) {
    throw new Error(
      'useStillingsKandidater må være i scope: StillingsKandidaterProvider',
    );
  }
  return context;
};
