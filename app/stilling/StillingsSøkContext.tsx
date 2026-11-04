'use client';

import {
  hierarkiAvTagsForFilter,
  Subtag,
} from './_ui/StillingsSøkFilter/InkluderingFilter';
import {
  byggLagretSøkFilter,
  normaliserLagretSøkFilter,
  STANDARD_STATUSER,
  tolkLagretSøkFilter,
} from './_util/lagredeSøkFilter';
import { VisningsStatus } from './_util/stillingInfoUtil';
import { StillingsSøkQueryparam } from './_util/stillingssøk-typer';
import { LagredeSøkDomene } from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';
import {
  type LagredeSøkTilstand,
  useLagredeSøk,
} from '@/components/lagrede-søk/useLagredeSøk';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { RekbisError } from '@/util/rekbisError';
import { UmamiEvent } from '@/util/umamiEvents';
import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from 'nuqs';
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

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
  /** Lagrede søk. Finnes bare i stillingssøket, ikke i etterregistreringen eller på jobbsøkerens side. */
  lagredeSøk?: LagredeSøkTilstand;
  /** Filtrene som lagres i et lagret søk. */
  gjeldendeFilter: string;
  /** Filtrene og søkeordene er ikke satt ennå (oppstart, standardsøk eller tilbake og fram), så søket skal ikke hentes. */
  venterPåFiltreOgSøkeord: boolean;
  /** Vanlig søk: alle filtre og søkeord får standardverdien. */
  nullstillFiltre: () => void;
  /** «Fjern alle filtre»: fjerner søkeord og filtre, også statusene, men beholder porteføljen. */
  fjernAlleFiltre: () => void;
}

const StillingsSøkContext = createContext<IStillingsSøkContext | undefined>(
  undefined,
);

const INGEN_STATUSER: string[] = [];

const useStillingsSøkFiltre = ({
  formidlinger,
  standardStatuser,
}: {
  formidlinger?: boolean;
  standardStatuser: string[];
}) => {
  const { harRolle } = useApplikasjonContext();

  const harArbeidsgiverrettetRolle = harRolle([
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
  ]);

  const [fritekst, setFritekstListeInternal] = useState<string[]>([]);

  const kunÅpenForSøkere = !formidlinger && !harArbeidsgiverrettetRolle;

  const [utenOppdrag, setUtenOppdrag] = useQueryState(
    StillingsSøkQueryparam.HarKandidatliste,
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: false }),
  );

  const [statuser, setStatuserOriginal] = useQueryState<string[]>(
    StillingsSøkQueryparam.Statuser,
    parseAsArrayOf(parseAsString)
      .withDefault(standardStatuser)
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

  useEffect(() => {
    const gyldigeVisningsStatuser = Object.values(VisningsStatus);
    const ugyldige = statuser.filter(
      (status) => !gyldigeVisningsStatuser.includes(status as VisningsStatus),
    );

    if (ugyldige.length > 0) {
      const filtrerteStatuser = statuser.filter((status) =>
        gyldigeVisningsStatuser.includes(status as VisningsStatus),
      );
      setStatuserOriginal(filtrerteStatuser);
    }
  }, [statuser, setStatuserOriginal]);

  useEffect(() => {
    if (inkluderingUnderkategori.length !== 0) {
      let newInkluderingUnderkategori = inkluderingUnderkategori;

      hierarkiAvTagsForFilter.forEach((gruppeMedTags) => {
        if (!inkludering.includes(gruppeMedTags.hovedtag)) {
          newInkluderingUnderkategori = newInkluderingUnderkategori.filter(
            (subtag) => !gruppeMedTags.subtags.includes(subtag as Subtag),
          );
        }
      });

      if (
        newInkluderingUnderkategori.length !== inkluderingUnderkategori.length
      ) {
        setInkluderingUnderkategori(newInkluderingUnderkategori);
      }
    }
  }, [inkludering, inkluderingUnderkategori, setInkluderingUnderkategori]);

  useEffect(() => {
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

  const gjeldendeFilter = byggLagretSøkFilter({
    portefølje,
    sortering,
    statuser: kunÅpenForSøkere ? STANDARD_STATUSER : statuser,
    kategori,
    inkludering,
    inkluderingUnderkategori,
    fylker,
    kommuner,
  });

  const settFiltreFraLagretSøk = useCallback(
    (lagretFilter: string) => {
      const filter = tolkLagretSøkFilter(lagretFilter);
      void setPortefølje(filter.portefølje);
      void setSortering(filter.sortering);
      void setStatuserOriginal(kunÅpenForSøkere ? null : filter.statuser);
      void setKategori(filter.kategori);
      void setInkludering(filter.inkludering);
      void setInkluderingUnderkategori(filter.inkluderingUnderkategori);
      void setFylker(filter.fylker);
      void setKommuner(filter.kommuner);
      void setSide(null);
      void setPublisert(null);
      void setUtenOppdrag(null);
    },
    [
      kunÅpenForSøkere,
      setPortefølje,
      setSortering,
      setStatuserOriginal,
      setKategori,
      setInkludering,
      setInkluderingUnderkategori,
      setFylker,
      setKommuner,
      setSide,
      setPublisert,
      setUtenOppdrag,
    ],
  );

  return {
    fritekst,
    setFritekstListeInternal,
    kunÅpenForSøkere,
    utenOppdrag,
    setUtenOppdrag,
    statuser,
    setStatuserOriginal,
    fylker,
    setFylker,
    kommuner,
    setKommuner,
    side,
    setSide,
    portefølje,
    setPortefølje,
    sortering,
    setSortering,
    inkludering,
    setInkludering,
    inkluderingUnderkategori,
    setInkluderingUnderkategori,
    kategori,
    setKategori,
    publisert,
    setPublisert,
    gjeldendeFilter,
    settFiltreFraLagretSøk,
  };
};

type StillingsSøkFiltre = ReturnType<typeof useStillingsSøkFiltre>;

const lagStillingsSøkVerdi = (
  {
    fritekst,
    setFritekstListeInternal,
    kunÅpenForSøkere,
    utenOppdrag,
    setUtenOppdrag,
    statuser,
    setStatuserOriginal,
    fylker,
    setFylker,
    kommuner,
    setKommuner,
    side,
    setSide,
    portefølje,
    setPortefølje,
    sortering,
    setSortering,
    inkludering,
    setInkludering,
    inkluderingUnderkategori,
    setInkluderingUnderkategori,
    kategori,
    setKategori,
    publisert,
    setPublisert,
    gjeldendeFilter,
    settFiltreFraLagretSøk,
  }: StillingsSøkFiltre,
  {
    formidlinger,
    søkEndret,
    lagredeSøk,
  }: {
    formidlinger?: boolean;
    søkEndret: () => void;
    lagredeSøk?: LagredeSøkTilstand;
  },
): IStillingsSøkContext => {
  const wrapWithPageReset = <T,>(
    setter: (value: T | ((prevValue: T) => T) | null) => Promise<any>,
  ): ((value: T | ((prevValue: T) => T)) => Promise<void>) => {
    return async (value) => {
      søkEndret();
      await setter(value);

      if (side !== 1) {
        await setSide(1);
      }
    };
  };

  const setFritekst = (val: string) => {
    setFritekstListeInternal((søkeord) =>
      søkeord.includes(val) ? søkeord : [...søkeord, val],
    );
    setSide(1);
    søkEndret();
  };

  const setFritekstListe = (val: string[]) => {
    setFritekstListeInternal(val);
    setSide(1);
    søkEndret();
  };

  const setStatuser = (value: string[] | ((prev: string[]) => string[])) => {
    søkEndret();
    if (kunÅpenForSøkere) {
      setStatuserOriginal([VisningsStatus.ApenForSokere]);
      setSide(1);
    } else {
      setStatuserOriginal(value);
      setSide(1);
    }
  };

  const nullstillFiltre = () => {
    settFiltreFraLagretSøk('');
    setFritekstListeInternal([]);
    søkEndret();
  };

  const fjernAlleFiltre = () => {
    settFiltreFraLagretSøk(
      new URLSearchParams({
        [StillingsSøkQueryparam.Portefølje]: portefølje,
        [StillingsSøkQueryparam.Statuser]: '',
      }).toString(),
    );
    setFritekstListeInternal([]);
    søkEndret();
  };

  return {
    fritekst,
    setFritekst: setFritekst,
    setFritekstListe,
    sortering,
    setSortering: wrapWithPageReset(setSortering),
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
    setInkluderingUnderkategori: wrapWithPageReset(setInkluderingUnderkategori),
    utenOppdrag,
    setUtenOppdrag: wrapWithPageReset(setUtenOppdrag),
    kategori,
    setKategori: wrapWithPageReset(setKategori),
    publisert,
    setPublisert: wrapWithPageReset(setPublisert),
    formidlinger,
    lagredeSøk,
    gjeldendeFilter,
    venterPåFiltreOgSøkeord: lagredeSøk?.venterPåFiltreOgSøkeord ?? false,
    nullstillFiltre,
    fjernAlleFiltre,
  };
};

type StillingsSøkProviderProps = {
  children: ReactNode;
  formidlinger?: boolean;
};

const MedLagredeSøk: FC<StillingsSøkProviderProps> = ({
  children,
  formidlinger,
}) => {
  const { track } = useUmami();
  const filtre = useStillingsSøkFiltre({
    formidlinger,
    standardStatuser: STANDARD_STATUSER,
  });
  const lagredeSøk = useLagredeSøk({
    domene: LagredeSøkDomene.STILLING,
    gjeldendeFilter: filtre.gjeldendeFilter,
    gjeldendeSøkeord: filtre.fritekst,
    settFiltre: filtre.settFiltreFraLagretSøk,
    settSøkeord: filtre.setFritekstListeInternal,
    normaliserFilter: normaliserLagretSøkFilter,
    sporHendelse: (hendelse) => track(UmamiEvent.Stilling[hendelse]),
  });
  return (
    <StillingsSøkContext.Provider
      value={lagStillingsSøkVerdi(filtre, {
        formidlinger,
        søkEndret: lagredeSøk.søkEndret,
        lagredeSøk,
      })}
    >
      {children}
    </StillingsSøkContext.Provider>
  );
};

const ingenEndring = () => {};

const UtenLagredeSøk: FC<StillingsSøkProviderProps> = ({
  children,
  formidlinger,
}) => {
  const filtre = useStillingsSøkFiltre({
    formidlinger,
    standardStatuser: INGEN_STATUSER,
  });
  return (
    <StillingsSøkContext.Provider
      value={lagStillingsSøkVerdi(filtre, {
        formidlinger,
        søkEndret: ingenEndring,
      })}
    >
      {children}
    </StillingsSøkContext.Provider>
  );
};

/**
 * Lagrede søk brukes bare i stillingssøket, ikke i etterregistreringen eller i jobbsøkerens stillingssøk.
 * Hooks kan ikke kalles betinget, så sidene uten lagrede søk får en egen komponent som ikke kaller `useLagredeSøk`.
 */
export const StillingsSøkProvider: FC<
  StillingsSøkProviderProps & { brukerLagredeSøk: boolean }
> = ({ brukerLagredeSøk, ...props }) =>
  brukerLagredeSøk ? (
    <MedLagredeSøk {...props} />
  ) : (
    <UtenLagredeSøk {...props} />
  );

export const useStillingsSøkFilter = () => {
  const context = useContext(StillingsSøkContext);
  if (context === undefined) {
    throw new RekbisError({
      message: 'useStillingsSøk må være i scope: StillingsSøkProvider',
    });
  }
  return context;
};
