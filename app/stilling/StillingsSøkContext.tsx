'use client';

import { RekbisError } from '../../util/rekbisError';
import { Roller } from '../components/tilgangskontroll/roller';
import { useApplikasjonContext } from '../providers/ApplikasjonContext';
import {
  hierarkiAvTagsForFilter,
  Subtag,
} from './components/StillingsSøkFilter/InkluderingFilter';
import { StillingsSøkQueryparam } from './stillingssøk-typer';
import { useSearchParams } from 'next/navigation';
import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from 'nuqs';
import * as React from 'react';

export interface IStillingsSøkContext {
  side: number;
  setSide: (val: number) => void;
  sortering: string;
  setSortering: (val: string) => void;
  statuser: string[];
  setStatuser: (val: string[]) => void;
  fylker: string[];
  setFylker: (val: string[]) => void;
  kommuner: string[];
  setKommuner: (val: string[]) => void;
  portefølje: string;
  setPortefølje: (val: string) => void;
  inkludering: string[];
  setInkludering: (val: string[]) => void;
  inkluderingUnderkategori: string[];
  setInkluderingUnderkategori: (val: string[]) => void;
  kategori: string[];
  setKategori: (val: string[]) => void;
  publisert: string[];
  setPublisert: (val: string[]) => void;
  fritekst: string[];
  setFritekst: (val: string) => void;
  setFritekstListe: (val: string[]) => void;
  utenOppdrag: boolean;
  setUtenOppdrag: (val: boolean) => void;
  formidlinger?: boolean;
}

const StillingsSøkContext = React.createContext<
  IStillingsSøkContext | undefined
>(undefined);

export const StillingsSøkProvider: React.FC<{
  children: React.ReactNode;
  formidlinger?: boolean;
}> = ({ children, formidlinger }) => {
  const { harRolle } = useApplikasjonContext();
  const searchParams = useSearchParams();
  const brukStandardSøk = searchParams.get('brukStandardsok') !== null;

  const harArbeidsgiverrettetRolle = harRolle([
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
  ]);

  // Set fritekst som lokal state for å hindre fritekst i searchparam
  const [fritekst, setFritekstListe] = React.useState<string[]>([]);

  const setFritekst = (val: string) => {
    setFritekstListe((prevFritekst) => [...prevFritekst, val]);
  };

  const setStatuser = (value: string[] | ((prev: string[]) => string[])) => {
    if (!formidlinger && !harArbeidsgiverrettetRolle) {
      setStatuserOriginal(['publisert']);
      setSide(1);
    } else {
      setStatuserOriginal(value);
      setSide(1);
    }
  };

  const [utenOppdrag, setUtenOppdrag] = useQueryState(
    StillingsSøkQueryparam.HarKandidatliste,
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: false }),
  );

  const [statuser, setStatuserOriginal] = useQueryState<string[]>(
    StillingsSøkQueryparam.Statuser,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true, shallow: true }),
  );

  const [fylker, setFylker] = useQueryState<string[]>(
    StillingsSøkQueryparam.Fylker,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  const [kommuner, setKommuner] = useQueryState<string[]>(
    StillingsSøkQueryparam.Kommuner,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  const [side, setSide] = useQueryState(
    StillingsSøkQueryparam.Side,
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  );

  const [portefølje, setPortefølje] = useQueryState(
    StillingsSøkQueryparam.Portefølje,
    {
      defaultValue: 'intern',
      clearOnDefault: true,
    },
  );

  const [sortering, setSortering] = useQueryState(
    StillingsSøkQueryparam.Sortering,
    {
      defaultValue: 'publiseringsdato',
      clearOnDefault: true,
    },
  );

  const [inkludering, setInkludering] = useQueryState<string[]>(
    StillingsSøkQueryparam.HovedInkluderingTags,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true, shallow: true }),
  );

  const [inkluderingUnderkategori, setInkluderingUnderkategori] = useQueryState<
    string[]
  >(
    StillingsSøkQueryparam.SubInkluderingTags,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true, shallow: true }),
  );

  const [kategori, setKategori] = useQueryState<string[]>(
    StillingsSøkQueryparam.Stillingskategorier,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true, shallow: true }),
  );

  const [publisert, setPublisert] = useQueryState<string[]>(
    StillingsSøkQueryparam.Publisert,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  React.useEffect(() => {
    if (
      !formidlinger &&
      !harArbeidsgiverrettetRolle &&
      (!statuser.includes('publisert') || statuser.length > 1)
    ) {
      setStatuserOriginal(['publisert']);
    }
  }, [harArbeidsgiverrettetRolle, statuser, setStatuserOriginal, formidlinger]);

  React.useEffect(() => {
    if (inkluderingUnderkategori.length !== 0) {
      let newInkluderingUnderkategori = inkluderingUnderkategori;

      // Fjern hovedtag hvis undertag er valgt
      hierarkiAvTagsForFilter.forEach((gruppeMedTags) => {
        if (!inkludering.includes(gruppeMedTags.hovedtag)) {
          newInkluderingUnderkategori = newInkluderingUnderkategori.filter(
            (subtag) => !gruppeMedTags.subtags.includes(subtag as Subtag),
          );
        }
      });

      // Bare oppdater når det er endringer
      if (
        newInkluderingUnderkategori.length !== inkluderingUnderkategori.length
      ) {
        setInkluderingUnderkategori(newInkluderingUnderkategori);
      }
    }
  }, [inkludering, inkluderingUnderkategori, setInkluderingUnderkategori]);

  React.useEffect(() => {
    if (kommuner.length !== 0) {
      const filteredKommuner = kommuner.filter((kommune) => {
        const prefix = kommune.slice(0, 2);
        return fylker.some((fylke) => fylke === prefix);
      });

      if (filteredKommuner.length !== kommuner.length) {
        setKommuner(filteredKommuner);
      }
    }
  }, [kommuner, fylker, setKommuner]);

  const wrapWithPageReset = <T,>(
    setter: (value: T | ((prevValue: T) => T) | null) => Promise<any>,
  ): ((value: T | ((prevValue: T) => T)) => Promise<void>) => {
    return async (value) => {
      await setter(value);

      if (side !== 1) {
        await setSide(1);
      }
    };
  };

  React.useEffect(() => {
    if (brukStandardSøk) {
      setFritekstListe([]);
    }
  }, [brukStandardSøk]);

  return (
    <StillingsSøkContext.Provider
      value={{
        fritekst,
        setFritekst: setFritekst,
        setFritekstListe,
        sortering,
        setSortering,
        side,
        setSide,
        statuser,
        setStatuser,
        fylker,
        setFylker: wrapWithPageReset(setFylker),
        kommuner,
        setKommuner: wrapWithPageReset(setKommuner),
        portefølje,
        setPortefølje: wrapWithPageReset(setPortefølje),
        inkludering,
        setInkludering: wrapWithPageReset(setInkludering),
        inkluderingUnderkategori,
        setInkluderingUnderkategori: wrapWithPageReset(
          setInkluderingUnderkategori,
        ),
        utenOppdrag,
        setUtenOppdrag: wrapWithPageReset(setUtenOppdrag),
        kategori,
        setKategori: wrapWithPageReset(setKategori),
        publisert,
        setPublisert: wrapWithPageReset(setPublisert),
        formidlinger,
      }}
    >
      {children}
    </StillingsSøkContext.Provider>
  );
};

export const useStillingsSøkFilter = () => {
  const context = React.useContext(StillingsSøkContext);
  if (context === undefined) {
    throw new RekbisError({
      message: 'useStillingsSøk må være i scope: StillingsSøkProvider',
    });
  }
  return context;
};
