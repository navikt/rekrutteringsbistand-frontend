'use client';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from 'nuqs';
import * as React from 'react';

export enum KandidatSøkPortefølje {
  MINE_BRUKERE = 'minebrukere',
  VALGTE_KONTORER = 'valgtekontorer',
  MINE_KONTORER = 'minekontorer',
  MITT_KONTOR = 'mittkontor',
  ALLE = 'alle',
}

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

export interface IKandidatSøkContext {
  fritekst: string;
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
  kompetanse: string[];
  setKompetanse: (kompetanse: string[]) => void;
  førerkort: string[];
  setFørerkort: (førerkort: string[]) => void;
  prioritertMålgruppe: string[];
  setPrioritertMålgruppe: (prioritertMålgruppe: string[]) => void;
  hovedmål: string[];
  setHovedmål: (hovedmål: string[]) => void;
  utdanningsnivå: string[];
  setUtdanningsnivå: (utdanningsnivå: string[]) => void;
  arbeidserfaring: string[];
  setArbeidserfaring: (arbeidserfaring: string[]) => void;
  ferskhet: number | null;
  språk: string[];
  setSpråk: (språk: string[]) => void;
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

  //TODO legg til setSide
  const [side] = useQueryState(
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

  //TODO Legg til sortering?
  // const [sortering, setSortering] = useQueryState(
  //   KandidatSøkQueryparam.Sortering,
  //   {
  //     defaultValue: 'publiseringsdato',
  //     clearOnDefault: true,
  //   },
  // );

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
  const [hovedmål, setHovedmål] = useQueryState<string[]>(
    KandidatSøkQueryparam.Hovedmål,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );
  const [kompetanse, setKompetanse] = useQueryState<string[]>(
    KandidatSøkQueryparam.Kompetanse,
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
  const [førerkort, setFørerkort] = useQueryState<string[]>(
    KandidatSøkQueryparam.Førerkort,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );
  const [språk, setSpråk] = useQueryState<string[]>(
    KandidatSøkQueryparam.Språk,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );
  const [arbeidserfaring, setArbeidserfaring] = useQueryState<string[]>(
    KandidatSøkQueryparam.Arbeidserfaring,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  const [utdanningsnivå, setUtdanningsnivå] = useQueryState<string[]>(
    KandidatSøkQueryparam.Utdanningsnivå,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );
  const [prioritertMålgruppe, setPrioritertMålgruppe] = useQueryState<string[]>(
    KandidatSøkQueryparam.PrioritertMålgruppe,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  //TODO er disse aktuelle?
  const [borPåØnsketSted] = React.useState<boolean | null>(null);
  const [ferskhet] = React.useState<number | null>(null);
  const [sortering] = React.useState<string>('');
  const [orgenhet] = React.useState<string | null>(null);

  return (
    <KandidatSøkContext.Provider
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
        hovedmål,
        setHovedmål,
        kompetanse,
        setKompetanse,
        førerkort,
        setFørerkort,
        språk,
        setSpråk,
        arbeidserfaring,
        setArbeidserfaring,
        utdanningsnivå,
        setUtdanningsnivå,
        prioritertMålgruppe,
        setPrioritertMålgruppe,
        borPåØnsketSted,
        ferskhet,
        sortering,
        orgenhet,
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
