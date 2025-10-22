'use client';

import { StillingsSøkQueryparam } from '@/app/stilling/_util/stillingssøk-typer';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from 'nuqs';
import {
  createContext,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from 'react';

enum KandidatlisteFilterParam {
  SIDE = 'kandidatlisteSide',
  SORTERING = 'kandidatlisteSortering',
  INTERN_STATUS = 'kandidatlsiteInternStatus',
  VIS_SLETTEDE = 'visSlettedeKandidater',
  HENDELSE_TYPE = 'kandidatlisteHendelseType',
}

export enum KandidatlisteSortering {
  NAVN_ASC = 'navn-asc',
  NAVN_DESC = 'navn-desc',
  LAGT_TIL_ASC = 'lagt-til-asc',
  LAGT_TIL_DESC = 'lagt-til-desc',
  HENDELSE_ASC = 'hendelse-asc',
  HENDELSE_DESC = 'hendelse-desc',
  VARSEL_ASC = 'varsel-asc',
  VARSEL_DESC = 'varsel-desc',
  INTERN_STATUS_ASC = 'intern-status-asc',
  INTERN_STATUS_DESC = 'intern-status-desc',
}

export interface KandidatlisteFilterContextProps {
  fritekstSøk: string;
  setFritekstSøk: (val: string) => void;
  side: number;
  setSide: (val: number) => void;
  sortering: string;
  setSortering: (val: string) => void;
  internStatus: string[];
  setInternStatus: (val: string[]) => void;
  visSlettede: string;
  setVisSlettede: (val: string) => void;
  hendelseFilter: string[];
  setHendelseFilter: (val: string[]) => void;
}

const KandidatlisteFilterContext = createContext<
  KandidatlisteFilterContextProps | undefined
>(undefined);

export interface KandidatlisteFilterContextProviderProps {
  children?: ReactNode | undefined;
}

export const KandidatlisteFilterContextProvider: FC<
  KandidatlisteFilterContextProviderProps
> = ({ children }) => {
  const [sortering, setSortering] = useQueryState(
    KandidatlisteFilterParam.SORTERING,
    {
      defaultValue: '',
      clearOnDefault: true,
    },
  );

  const [fritekstSøk, setFritekstSøk] = useState<string>('');

  const [side, setSide] = useQueryState(
    StillingsSøkQueryparam.Side,
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  );

  const [internStatus, setInternStatus] = useQueryState<string[]>(
    KandidatlisteFilterParam.INTERN_STATUS,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  const [hendelseFilter, setHendelseFilter] = useQueryState<string[]>(
    KandidatlisteFilterParam.HENDELSE_TYPE,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  const [visSlettede, setVisSlettede] = useQueryState<string>(
    KandidatlisteFilterParam.VIS_SLETTEDE,
    parseAsString.withDefault('false').withOptions({ clearOnDefault: true }),
  );

  return (
    <KandidatlisteFilterContext.Provider
      value={{
        sortering,
        setSortering,
        side,
        setSide,
        internStatus,
        setInternStatus,
        fritekstSøk,
        setFritekstSøk,
        visSlettede,
        setVisSlettede,
        hendelseFilter,
        setHendelseFilter,
      }}
    >
      {children}
    </KandidatlisteFilterContext.Provider>
  );
};

export const useKandidatlisteFilterContext = () => {
  const context = useContext(KandidatlisteFilterContext);
  if (context === undefined) {
    throw new Error(
      'KandidatlisteFilterContext must be used within a KandidatlisteFilterContextProvider',
    );
  }
  return context;
};
