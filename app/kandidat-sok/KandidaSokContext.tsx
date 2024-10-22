'use client';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from 'nuqs';
import * as React from 'react';
import { KandidatSøkPortefølje } from './components/PorteføljeTabs';

export enum KandidatSøkQueryparam {
  Fritekst = 'fritekst',
  Side = 'side',
  Portefølje = 'portefolje',
  ValgtKontor = 'kontor',
  Innsatsgruppe = 'innsatsgruppe',
  ØnsketYrke = 'yrke',
  ØnsketSted = 'sted',
  BorPåØnsketSted = 'borDer',
  Kompetanse = 'kompetanse',
  Førerkort = 'forerkort',
  PrioritertMålgruppe = 'malgruppe',
  Hovedmål = 'hovedmal',
  Utdanningsnivå = 'utdanning',
  Arbeidserfaring = 'arbeidserfaring',
  Ferskhet = 'ferskhet',
  Språk = 'sprak',
  Sortering = 'sortering',
}

interface IKandidatSøkContext {
  fritekst: string | null;
  setFritekst: (tekst: string) => void;
  portefølje: string;
  setPortefølje: (portefølje: string) => void;
  valgtKontor: string[];
  setValgtKontor: (valgtKontor: string[]) => void;
  innsatsgruppe: string[];
  setInnsatsgruppe: (innsatsgruppe: string[]) => void;
  side: number;
  ønsketYrke: string[];
  setØnsketYrke: (ønsketYrke: string[]) => void;
  ønsketSted: string[];
  setØnsketSted: (ønsketSted: string[]) => void;
  borPåØnsketSted: boolean | null;
  kompetanse: string;
  førerkort: string;
  prioritertMålgruppe: string;
  hovedmål: string;
  utdanningsnivå: string;
  arbeidserfaring: string;
  ferskhet: number | null;
  språk: string;
  sortering: string;
  orgenhet: string | null;
}

export const KandidatSøkContext = React.createContext<
  IKandidatSøkContext | undefined
>(undefined);

export const KandidatSøkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [fritekst, setFritekst] = useQueryState(
    KandidatSøkQueryparam.Fritekst,
    {
      defaultValue: '',
      clearOnDefault: true,
    },
  );

  const [side, setSide] = useQueryState(
    KandidatSøkQueryparam.Side,
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  );

  const [portefølje, setPortefølje] = useQueryState(
    KandidatSøkQueryparam.Portefølje,
    {
      defaultValue: KandidatSøkPortefølje.MINE_BRUKERE,
      clearOnDefault: true,
    },
  );
  const [sortering, setSortering] = useQueryState(
    KandidatSøkQueryparam.Sortering,
    {
      defaultValue: 'publiseringsdato',
      clearOnDefault: true,
    },
  );

  const [ønsketSted, setØnsketSted] = useQueryState<string[]>(
    KandidatSøkQueryparam.ØnsketSted,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );
  const [ønsketYrke, setØnsketYrke] = useQueryState<string[]>(
    KandidatSøkQueryparam.ØnsketYrke,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );
  const [valgtKontor, setValgtKontor] = useQueryState<string[]>(
    KandidatSøkQueryparam.ValgtKontor,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  const [innsatsgruppe, setInnsatsgruppe] = useQueryState<string[]>(
    KandidatSøkQueryparam.Innsatsgruppe,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  return (
    <KandidatSøkContext.Provider
      //@ts-ignore
      value={{
        fritekst,
        setFritekst,
        portefølje,
        setPortefølje,
        side,
        ønsketSted,
        setØnsketSted,
        ønsketYrke,
        setØnsketYrke,
        innsatsgruppe,
        setInnsatsgruppe,
        valgtKontor,
        setValgtKontor,
      }}
    >
      {children}
    </KandidatSøkContext.Provider>
  );
};

export const useKandidatSøkFilter = () => {
  const context = React.useContext(KandidatSøkContext);
  if (context === undefined) {
    throw new Error('useKandidatSøk må være i scope: KandidatSøkProvider');
  }
  return context;
};
