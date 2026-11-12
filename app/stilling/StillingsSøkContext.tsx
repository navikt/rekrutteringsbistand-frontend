'use client';

import { hierarkiAvTagsForFilter } from './_ui/StillingsSøkFilter/InkluderingFilter';
import {
  byggLagretSøkFilter,
  normaliserLagretSøkFilter,
  STANDARD_PORTEFØLJE,
  STANDARD_SORTERING,
  STANDARD_STATUSER,
  filtreFraLagretSøk,
} from './_util/lagredeSøkFilter';
import { VisningsStatus } from './_util/stillingInfoUtil';
import {
  StillingsSøkOmfang,
  StillingsSøkPortefølje,
  StillingsSøkQueryparam,
  Subtag,
} from './_util/stillingssøk-typer';
import { LagredeSøkDomene } from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';
import {
  type LagredeSøkTilstand,
  type ForhåndsutfyltSøk,
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

const kommunerIFylkene = (kommuner: string[], fylker: string[]) =>
  kommuner.filter((kommune) => fylker.includes(kommune.slice(0, 2)));

const underkategorierIValgteKategorier = (
  underkategorier: string[],
  inkludering: string[],
) =>
  underkategorier.filter((subtag) =>
    hierarkiAvTagsForFilter.every(
      (gruppe) =>
        inkludering.includes(gruppe.hovedtag) ||
        !gruppe.subtags.includes(subtag as Subtag),
    ),
  );

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
  omfang: string[];
  setOmfang: (val: string[]) => void;
  ansettelsesform: string[];
  setAnsettelsesform: (val: string[]) => void;
  publisert: string[];
  setPublisert: (val: string[]) => void;
  fritekst: string[];
  setFritekst: (val: string) => void;
  setFritekstListe: (val: string[]) => void;
  utenOppdrag: boolean;
  setUtenOppdrag: (val: boolean) => void;
  formidlinger?: boolean;
  lagredeSøk?: LagredeSøkTilstand;
  /** Filtrene og søkeordene er ikke satt ennå (oppstart, standardsøk eller tilbake og fram), så søket skal ikke hentes. */
  venterPåFiltreOgSøkeord: boolean;
  /** «Fjern alle filtre»: fjerner søkeord og filtre, også statusene og «Med oppdrag», men beholder porteføljen. */
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
  const kanSeMine = formidlinger
    ? harRolle([
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
      ])
    : harArbeidsgiverrettetRolle;

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

  // URL-parserne her er ikke `filterParsere`: URL-en kan ha statuser som ikke kan lagres
  // («Slettet», «Ukjent status»), og etterregistrering og jobbsøkerens søk har andre standardstatuser.
  // Standardverdiene for portefølje og sortering er felles, så statuslinjen og søket er enige.
  const [portefølje, setPortefølje] = useQueryState(
    StillingsSøkQueryparam.Portefølje,
    {
      defaultValue: STANDARD_PORTEFØLJE,
      clearOnDefault: true,
    },
  );

  const [sortering, setSortering] = useQueryState(
    StillingsSøkQueryparam.Sortering,
    {
      defaultValue: STANDARD_SORTERING,
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

  const [omfang, setOmfang] = useQueryState<string[]>(
    StillingsSøkQueryparam.Omfang,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true, shallow: true }),
  );

  const [ansettelsesform, setAnsettelsesform] = useQueryState<string[]>(
    StillingsSøkQueryparam.Ansettelsesform,
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
    const gyldigeOmfang = omfang.filter((verdi) =>
      Object.values(StillingsSøkOmfang).some((gyldig) => gyldig === verdi),
    );
    if (gyldigeOmfang.length !== omfang.length) {
      void setOmfang(gyldigeOmfang);
    }
  }, [omfang, setOmfang]);

  // Ryddes også i setterne. Effektene tar URL-er og lagrede søk med ugyldige kombinasjoner.
  useEffect(() => {
    const gyldige = underkategorierIValgteKategorier(
      inkluderingUnderkategori,
      inkludering,
    );
    if (gyldige.length !== inkluderingUnderkategori.length) {
      setInkluderingUnderkategori(gyldige);
    }
  }, [inkludering, inkluderingUnderkategori, setInkluderingUnderkategori]);

  useEffect(() => {
    const gyldige = kommunerIFylkene(kommuner, fylker);
    if (gyldige.length !== kommuner.length) {
      setKommuner(gyldige);
    }
  }, [kommuner, fylker, setKommuner]);

  const gjeldendeFilter = byggLagretSøkFilter({
    portefølje,
    utenOppdrag,
    sortering,
    statuser: kunÅpenForSøkere ? STANDARD_STATUSER : statuser,
    kategori,
    inkludering,
    inkluderingUnderkategori,
    omfang,
    ansettelsesform,
    fylker,
    kommuner,
  });

  const settFiltreFraLagretSøk = useCallback(
    (lagretFilter: string) => {
      const filter = filtreFraLagretSøk(lagretFilter);
      // Veiledere som ikke ser fanen «Mine», får standardporteføljen, som i rekrutteringstreff.
      void setPortefølje(
        filter.portefølje === StillingsSøkPortefølje.VIS_MINE && !kanSeMine
          ? null
          : filter.portefølje,
      );
      void setSortering(filter.sortering);
      void setStatuserOriginal(kunÅpenForSøkere ? null : filter.statuser);
      void setKategori(filter.kategori);
      void setInkludering(filter.inkludering);
      void setInkluderingUnderkategori(filter.inkluderingUnderkategori);
      void setOmfang(filter.omfang);
      void setAnsettelsesform(filter.ansettelsesform);
      void setFylker(filter.fylker);
      void setKommuner(filter.kommuner);
      void setSide(null);
      void setPublisert(null);
      void setUtenOppdrag(filter.utenOppdrag ? true : null);
    },
    [
      kanSeMine,
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
      setOmfang,
      setAnsettelsesform,
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
    omfang,
    setOmfang,
    ansettelsesform,
    setAnsettelsesform,
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
    omfang,
    setOmfang,
    ansettelsesform,
    setAnsettelsesform,
    publisert,
    setPublisert,
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

  type Listeendring = string[] | ((forrige: string[]) => string[]) | null;
  const nyListe = (endring: Listeendring, forrige: string[]) =>
    (typeof endring === 'function' ? endring(forrige) : endring) ?? [];

  // Avhengige filtre ryddes i samme endring, så søkeordene huskes for det endelige filteret.
  const setFylkerOgKommuner = (endring: Listeendring) => {
    const nyeFylker = nyListe(endring, fylker);
    const gyldigeKommuner = kommunerIFylkene(kommuner, nyeFylker);
    if (gyldigeKommuner.length !== kommuner.length) {
      void setKommuner(gyldigeKommuner);
    }
    return setFylker(nyeFylker);
  };

  const setInkluderingOgUnderkategorier = (endring: Listeendring) => {
    const nyInkludering = nyListe(endring, inkludering);
    const gyldigeUnderkategorier = underkategorierIValgteKategorier(
      inkluderingUnderkategori,
      nyInkludering,
    );
    if (gyldigeUnderkategorier.length !== inkluderingUnderkategori.length) {
      void setInkluderingUnderkategori(gyldigeUnderkategorier);
    }
    return setInkludering(nyInkludering);
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
    setFylker: wrapWithPageReset(setFylkerOgKommuner),
    kommuner,
    setKommuner: wrapWithPageReset(setKommuner),
    portefølje,
    setPortefølje: wrapWithPageReset(setPortefølje),
    inkludering,
    setInkludering: wrapWithPageReset(setInkluderingOgUnderkategorier),
    inkluderingUnderkategori,
    setInkluderingUnderkategori: wrapWithPageReset(setInkluderingUnderkategori),
    utenOppdrag,
    setUtenOppdrag: wrapWithPageReset(setUtenOppdrag),
    kategori,
    setKategori: wrapWithPageReset(setKategori),
    omfang,
    setOmfang: wrapWithPageReset(setOmfang),
    ansettelsesform,
    setAnsettelsesform: wrapWithPageReset(setAnsettelsesform),
    publisert,
    setPublisert: wrapWithPageReset(setPublisert),
    formidlinger,
    lagredeSøk,
    venterPåFiltreOgSøkeord: lagredeSøk?.venterPåFiltreOgSøkeord ?? false,
    fjernAlleFiltre,
  };
};

type StillingsSøkProviderProps = {
  children: ReactNode;
  formidlinger?: boolean;
};

type MedLagredeSøkProps = StillingsSøkProviderProps & {
  /** Skiller søkeordene i minnet fra stillingssøket, for eksempel per jobbsøker. */
  minnenøkkel?: string;
  /** Filtrene og søkeordene siden selv fyller ut, for eksempel jobbsøkerens jobbønsker. */
  forhåndsutfyltSøk?: ForhåndsutfyltSøk | null;
};

const MedLagredeSøk: FC<MedLagredeSøkProps> = ({
  children,
  formidlinger,
  minnenøkkel,
  forhåndsutfyltSøk,
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
    minnenøkkel,
    forhåndsutfyltSøk,
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
 * Lagrede søk brukes i stillingssøket og i jobbsøkerens stillingssøk, men ikke i etterregistreringen.
 * Hooks kan ikke kalles betinget, så sidene uten lagrede søk får en egen komponent som ikke kaller `useLagredeSøk`.
 */
export const StillingsSøkProvider: FC<
  MedLagredeSøkProps & { brukerLagredeSøk: boolean }
> = ({ brukerLagredeSøk, minnenøkkel, forhåndsutfyltSøk, ...props }) =>
  brukerLagredeSøk ? (
    <MedLagredeSøk
      {...props}
      minnenøkkel={minnenøkkel}
      forhåndsutfyltSøk={forhåndsutfyltSøk}
    />
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
