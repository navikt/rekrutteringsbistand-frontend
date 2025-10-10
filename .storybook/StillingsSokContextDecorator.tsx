import { IStillingsSøkContext } from '../app/stilling/StillingsSøkContext';
import React, { useState } from 'react';

// Minimal mock av StillingsSøkContext for interaktiv lek i Storybook uten URL query sync.
const MockStillingsSokContext = React.createContext<
  IStillingsSøkContext | undefined
>(undefined);

export const MockStillingsSokProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [side, setSide] = useState(1);
  const [sortering, setSortering] = useState('publiseringsdato');
  const [statuser, setStatuser] = useState<string[]>([]);
  const [fylker, setFylker] = useState<string[]>([]);
  const [kommuner, setKommuner] = useState<string[]>([]);
  const [portefølje, setPortefølje] = useState('intern');
  const [inkludering, setInkludering] = useState<string[]>([]);
  const [inkluderingUnderkategori, setInkluderingUnderkategori] = useState<
    string[]
  >([]);
  const [kategori, setKategori] = useState<string[]>([]);
  const [publisert, setPublisert] = useState<string[]>([]);
  const [fritekst, setFritekstListe] = useState<string[]>([]);
  const [utenOppdrag, setUtenOppdrag] = useState(false);

  const value: IStillingsSøkContext = {
    side,
    setSide,
    sortering,
    setSortering,
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
    fritekst,
    setFritekst: (val: string) => setFritekstListe((prev) => [...prev, val]),
    setFritekstListe,
    utenOppdrag,
    setUtenOppdrag,
    formidlinger: false,
  };
  return (
    <MockStillingsSokContext.Provider value={value}>
      {children}
    </MockStillingsSokContext.Provider>
  );
};

export const withStillingsSokContext = (fn: () => React.ReactNode) => (
  <MockStillingsSokProvider>{fn()}</MockStillingsSokProvider>
);
