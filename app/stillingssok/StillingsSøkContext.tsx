'use client';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from 'nuqs';
import * as React from 'react';
import {
  hierarkiAvTagsForFilter,
  Subtag,
} from './components/StillingsSøkFilter/InkluderingFilter';
import { StillingsSøkQueryparam } from './stillingssøk-typer';

interface IStillingsSøkContext {
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
}

const StillingsSøkContext = React.createContext<
  IStillingsSøkContext | undefined
>(undefined);

export const StillingsSøkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [statuser, setStatuser] = useQueryState<string[]>(
    StillingsSøkQueryparam.Statuser,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
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
      defaultValue: 'visAlle',
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
      .withOptions({ clearOnDefault: true }),
  );

  const [inkluderingUnderkategori, setInkluderingUnderkategori] = useQueryState<
    string[]
  >(
    StillingsSøkQueryparam.SubInkluderingTags,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  const [kategori, setKategori] = useQueryState<string[]>(
    StillingsSøkQueryparam.Stillingskategorier,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  const [publisert, setPublisert] = useQueryState<string[]>(
    StillingsSøkQueryparam.Publisert,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

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

  return (
    <StillingsSøkContext.Provider
      value={{
        sortering,
        setSortering,
        side,
        setSide,
        statuser,
        setStatuser,
        fylker,
        setFylker,
        kommuner,
        setKommuner,
        portefølje,
        setPortefølje,
        inkludering,
        setInkludering,
        inkluderingUnderkategori,
        setInkluderingUnderkategori,
        kategori,
        setKategori,
        publisert,
        setPublisert,
      }}
    >
      {children}
    </StillingsSøkContext.Provider>
  );
};

export const useStillingsSøkFilter = () => {
  const context = React.useContext(StillingsSøkContext);
  if (context === undefined) {
    throw new Error('useStillingsSøk må være i scope: StillingsSøkProvider');
  }
  return context;
};
