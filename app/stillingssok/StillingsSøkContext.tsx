'use client';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import * as React from 'react';
import { StillingsSøkQueryparam } from './types';

interface IStillingsSøkContext {
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

  const [portefølje, setPortefølje] = useQueryState(
    StillingsSøkQueryparam.Portefølje,
    {
      defaultValue: 'visAlle',
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

  return (
    <StillingsSøkContext.Provider
      value={{
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

export const useStillingsSøk = () => {
  const context = React.useContext(StillingsSøkContext);
  if (context === undefined) {
    throw new Error(
      'useStillingsSøk must be used within a StillingsSøkProvider',
    );
  }
  return context;
};
