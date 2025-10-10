'use client';

import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { RekbisError } from '@/util/rekbisError';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from 'nuqs';
import { createContext, FC, useContext, useState, type ReactNode } from 'react';

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

export interface IKandidaSokFilterContext {
  fritekst: string;
  setFritekst: (tekst: string) => void;
  portefølje: string;
  setPortefølje: (portefølje: string) => void;
  valgtKontor: string[];
  setValgtKontor: (valgtKontor: string[]) => void;
  innsatsgruppe: string[];
  setInnsatsgruppe: (innsatsgruppe: string[]) => void;
  side: number;
  setSide: (number: number) => void;
  ønsketYrke: string[];
  setØnsketYrke: (ønsketYrke: string[]) => void;
  ønsketSted: string[];
  setØnsketSted: (ønsketSted: string[]) => void;
  borPåØnsketSted: string | null;
  setBorPåØnsketSted: (borPåØnsketSted: string) => void;
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

export const KandidaSøkFilterContext = createContext<
  IKandidaSokFilterContext | undefined
>(undefined);

export const KandidatSøkProvider: FC<{
  children: ReactNode;
  defaultPortefølje?: KandidatSøkPortefølje;
}> = ({ children, defaultPortefølje }) => {
  const { valgtNavKontor } = useApplikasjonContext();
  const { track } = useUmami();
  // Unngå fritekst i searchParams
  const [fritekst, setFritekst] = useState<string>('');

  const [side, setSide] = useQueryState(
    KandidatSøkQueryparam.Side,
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  );

  const [portefølje, setPortefølje] = useQueryState(
    KandidatSøkQueryparam.Portefølje,
    {
      defaultValue: defaultPortefølje ?? KandidatSøkPortefølje.MINE_BRUKERE,
      clearOnDefault: true,
    },
  );

  const [sortering] = useQueryState(KandidatSøkQueryparam.Sortering, {
    defaultValue: 'nyeste',
    clearOnDefault: true,
  });

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

  const [borPåØnsketSted, setBorPåØnsketSted] = useQueryState(
    KandidatSøkQueryparam.BorPåØnsketSted,
    {
      defaultValue: 'nei',
      clearOnDefault: true,
    },
  );

  //TODO er denne aktuell?

  const [ferskhet] = useState<number | null>(null);

  const wrapWithPageReset = <T,>(
    setter: (value: T | ((prevValue: T) => T) | null) => Promise<any>,
    trackingKey?: keyof typeof UmamiEvent.Kandidat,
  ): ((value: T | ((prevValue: T) => T)) => Promise<void>) => {
    return async (value) => {
      await setter(value);

      if (trackingKey && Array.isArray(value) && value.length > 0) {
        track(UmamiEvent.Kandidat[trackingKey], {
          filter: Array.isArray(value) ? value.join(', ') : String(value),
        });
      }

      if (side !== 1) {
        await setSide(1);
      }
    };
  };

  return (
    <KandidaSøkFilterContext.Provider
      value={{
        fritekst,
        setFritekst,
        portefølje,
        setPortefølje: wrapWithPageReset(setPortefølje, 'filter_portefølje'),
        side,
        ønsketSted,
        setØnsketSted: wrapWithPageReset(setØnsketSted, 'filter_ønsket_sted'),
        ønsketYrke,
        setØnsketYrke: wrapWithPageReset(setØnsketYrke, 'filter_ønsket_yrke'),
        innsatsgruppe,
        setInnsatsgruppe: wrapWithPageReset(
          setInnsatsgruppe,
          'filter_innsatsgruppe',
        ),
        valgtKontor,
        setValgtKontor: wrapWithPageReset(
          setValgtKontor,
          'filter_valgt_kontor',
        ),
        hovedmål,
        setHovedmål: wrapWithPageReset(setHovedmål, 'filter_hovedmål'),
        kompetanse,
        setKompetanse: wrapWithPageReset(setKompetanse, 'filter_kompetanse'),
        førerkort,
        setFørerkort: wrapWithPageReset(setFørerkort, 'filter_førerkort'),
        språk,
        setSpråk: wrapWithPageReset(setSpråk, 'filter_språk'),
        arbeidserfaring,
        setArbeidserfaring: wrapWithPageReset(
          setArbeidserfaring,
          'filter_arbeidserfaring',
        ),
        utdanningsnivå,
        setUtdanningsnivå: wrapWithPageReset(
          setUtdanningsnivå,
          'filter_utdanningsnivå',
        ),
        prioritertMålgruppe,
        setPrioritertMålgruppe: wrapWithPageReset(
          setPrioritertMålgruppe,
          'filter_prioritert_målgruppe',
        ),
        borPåØnsketSted,
        setBorPåØnsketSted,
        ferskhet,
        sortering,
        orgenhet:
          portefølje === KandidatSøkPortefølje.MITT_KONTOR
            ? (valgtNavKontor?.navKontor ?? null)
            : null,
        setSide,
      }}
    >
      {children}
    </KandidaSøkFilterContext.Provider>
  );
};

export const useKandidatSøkFilterContext = () => {
  const context = useContext(KandidaSøkFilterContext);
  if (context === undefined) {
    throw new RekbisError({
      message: 'useKandidaSokFilterContext må være i scope',
    });
  }
  return context;
};
