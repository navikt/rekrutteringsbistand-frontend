'use client';
import { parseAsInteger, useQueryState } from 'nuqs';
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
  portefølje: string;
  setPortefølje: (portefølje: string) => void;
  valgtKontor: string;
  innsatsgruppe: string;
  side: number;
  ønsketYrke: string;
  ønsketSted: string;
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

  //   React.useEffect(() => {
  //     if (inkluderingUnderkategori.length !== 0) {
  //       let newInkluderingUnderkategori = inkluderingUnderkategori;

  //       // Fjern hovedtag hvis undertag er valgt
  //       hierarkiAvTagsForFilter.forEach((gruppeMedTags) => {
  //         if (!inkludering.includes(gruppeMedTags.hovedtag)) {
  //           newInkluderingUnderkategori = newInkluderingUnderkategori.filter(
  //             (subtag) => !gruppeMedTags.subtags.includes(subtag as Subtag),
  //           );
  //         }
  //       });

  //       // Bare oppdater når det er endringer
  //       if (
  //         newInkluderingUnderkategori.length !== inkluderingUnderkategori.length
  //       ) {
  //         setInkluderingUnderkategori(newInkluderingUnderkategori);
  //       }
  //     }
  //   }, [inkludering, inkluderingUnderkategori, setInkluderingUnderkategori]);

  //   React.useEffect(() => {
  //     if (kommuner.length !== 0) {
  //       const filteredKommuner = kommuner.filter((kommune) => {
  //         const prefix = kommune.slice(0, 2);
  //         return fylker.some((fylke) => fylke === prefix);
  //       });

  //       if (filteredKommuner.length !== kommuner.length) {
  //         setKommuner(filteredKommuner);
  //       }
  //     }
  //   }, [kommuner, fylker, setKommuner]);

  return (
    <KandidatSøkContext.Provider
      //@ts-ignore
      value={{ portefølje, setPortefølje }}
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
