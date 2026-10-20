'use client';

import {
  StandardsøkDomene,
  type StandardsøkDTO,
} from '@/app/api/bruker/standardsok/standardsøkTyper';
import {
  type RekrutteringstreffSokRespons,
  Sortering,
  useRekrutteringstreffSok,
  Visning,
} from '@/app/api/rekrutteringstreff/sok/useRekrutteringstreffSok';
import {
  PublisertStatus,
  RekrutteringstreffStatus,
} from '@/app/rekrutteringstreff/_types/constants';
import { useBrukStandardsøk } from '@/components/standardsøk/useBrukStandardsøk';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { UmamiEvent } from '@/util/umamiEvents';
import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
} from 'nuqs';
import {
  createContext,
  FC,
  useContext,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { SWRResponse } from 'swr';

export interface IRekrutteringstreffSøkContext {
  visning: Visning;
  setVisning: (val: Visning) => void;
  statuser: RekrutteringstreffStatus[];
  setStatuser: (val: RekrutteringstreffStatus[]) => void;
  publisertStatuser: PublisertStatus[];
  setPublisertStatuser: (val: PublisertStatus[]) => void;
  fylker: string[];
  setFylker: (val: string[]) => void;
  kommuner: string[];
  setKommuner: (val: string[]) => void;
  kontorer: string[];
  setKontorer: (val: string[]) => void;
  fritekst: string[];
  setFritekst: (val: string) => void;
  setFritekstListe: (val: string[]) => void;
  sortering: Sortering;
  setSortering: (val: Sortering) => void;
  side: number;
  setSide: (val: number) => void;
  sokHook: SWRResponse<RekrutteringstreffSokRespons, Error>;
  /** Filtrene som lagres i et lagret søk, som normalisert query-streng uten fritekst. */
  gjeldendeFilter: string;
  aktivtStandardsøkId: string | null;
  setAktivtStandardsøkId: (id: string | null) => void;
  brukLagretSøk: (søk: StandardsøkDTO) => Promise<boolean>;
  /** Sann mens menylenken venter på standardsøket. Søket mot treffene starter først etterpå. */
  venterPåStandardsøk: boolean;
}

const STANDARDSØK_DOMENE = StandardsøkDomene.REKRUTTERINGSTREFF;

const erRekrutteringstreffStatus = (
  verdi: string,
): verdi is RekrutteringstreffStatus =>
  (Object.values(RekrutteringstreffStatus) as string[]).includes(verdi);

const erPublisertStatus = (verdi: string): verdi is PublisertStatus =>
  (Object.values(PublisertStatus) as string[]).includes(verdi);

const erVisning = (verdi: string | null): verdi is Visning =>
  (Object.values(Visning) as (string | null)[]).includes(verdi);

const erSortering = (verdi: string | null): verdi is Sortering =>
  (Object.values(Sortering) as (string | null)[]).includes(verdi);

const RekrutteringstreffSøkContext = createContext<
  IRekrutteringstreffSøkContext | undefined
>(undefined);

export const RekrutteringstreffSøkProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [visning, setVisningInternal] = useQueryState('visning', {
    defaultValue: Visning.ALLE,
    clearOnDefault: true,
  });

  const {
    brukerData: { roller },
    visVarsel,
  } = useApplikasjonContext();
  const { track } = useUmami();

  const harTilgangTilUtkast =
    roller?.includes(
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
    ) || roller?.includes(Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER);

  const rekrutteringstreffStatusVerdier = Object.values(
    RekrutteringstreffStatus,
  );
  const publiserteStatusVerdier = Object.values(PublisertStatus);

  const [statuser, setStatuserInternal] = useQueryState<
    RekrutteringstreffStatus[]
  >(
    'statuser',
    parseAsArrayOf(parseAsStringLiteral(rekrutteringstreffStatusVerdier))
      .withDefault([RekrutteringstreffStatus.PUBLISERT])
      .withOptions({ clearOnDefault: true }),
  );

  const synligeStatuser = harTilgangTilUtkast
    ? statuser
    : statuser.filter((s) => s !== RekrutteringstreffStatus.UTKAST);

  const [publisertStatuser, setPublisertStatuserInternal] = useQueryState<
    PublisertStatus[]
  >(
    'publisertStatuser',
    parseAsArrayOf(parseAsStringLiteral(publiserteStatusVerdier))
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  const [fylker, setFylkerInternal] = useQueryState<string[]>(
    'fylker',
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );
  const [kommuner, setKommunerInternal] = useQueryState<string[]>(
    'kommuner',
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  const setFylker = (val: string[]) => {
    setFylkerInternal(val);
    setSideInternal(1);
  };
  const setKommuner = (val: string[]) => {
    setKommunerInternal(val);
    setSideInternal(1);
  };

  useEffect(() => {
    if (kommuner.length !== 0) {
      const filtrerte = kommuner.filter((kommune) =>
        fylker.includes(kommune.slice(0, 2)),
      );
      if (filtrerte.length !== kommuner.length) setKommunerInternal(filtrerte);
    }
  }, [kommuner, fylker, setKommunerInternal]);

  const [kontorer, setKontorerInternal] = useQueryState<string[]>(
    'kontorer',
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  const [fritekst, setFritekstListeInternal] = useState<string[]>([]);

  const setFritekst = (val: string) => {
    setFritekstListeInternal((forrige) => [...forrige, val]);
    setSideInternal(1);
  };

  const setFritekstListe = (val: string[]) => {
    setFritekstListeInternal(val);
    setSideInternal(1);
  };

  const [side, setSideInternal] = useQueryState(
    'side',
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  );

  const [sortering, setSorteringInternal] = useQueryState('sortering', {
    defaultValue: Sortering.SIST_OPPDATERTE,
    clearOnDefault: true,
  });

  useEffect(() => {
    if (
      !harTilgangTilUtkast &&
      statuser.includes(RekrutteringstreffStatus.UTKAST)
    ) {
      setStatuserInternal(
        statuser.filter((s) => s !== RekrutteringstreffStatus.UTKAST),
      );
    }
  }, [harTilgangTilUtkast, statuser, setStatuserInternal]);

  const setVisning = (val: Visning) => {
    setVisningInternal(val);
    setSideInternal(1);
    if (val !== Visning.VALGTE_KONTORER) {
      setKontorerInternal([]);
    }
  };

  const setStatuser = (val: RekrutteringstreffStatus[]) => {
    const filtrerteStatuser = harTilgangTilUtkast
      ? val
      : val.filter((s) => s !== RekrutteringstreffStatus.UTKAST);
    setStatuserInternal(filtrerteStatuser);
    setSideInternal(1);
  };

  const setPublisertStatuser = (val: PublisertStatus[]) => {
    setPublisertStatuserInternal(val);
    setSideInternal(1);
  };

  const setKontorer = (val: string[]) => {
    setKontorerInternal(val);
    setSideInternal(1);
  };

  const setSide = (val: number) => {
    setSideInternal(val);
  };

  const setSortering = (val: Sortering) => {
    setSorteringInternal(val);
    setSideInternal(1);
  };

  const [brukStandardsok, setBrukStandardsok] = useQueryState(
    'brukStandardsok',
    parseAsBoolean,
  );
  const [aktivtStandardsøkId, setAktivtStandardsøkId] = useState<string | null>(
    null,
  );
  const { liste: standardsøkListe, hentGjeldendeSøk } =
    useBrukStandardsøk(STANDARDSØK_DOMENE);

  const gjeldendeFilter = (() => {
    const filter = new URLSearchParams();
    if (visning !== Visning.ALLE) filter.set('visning', visning);
    if (kontorer.length > 0) filter.set('kontorer', kontorer.join(','));
    const erStandardStatuser =
      synligeStatuser.length === 1 &&
      synligeStatuser[0] === RekrutteringstreffStatus.PUBLISERT;
    if (!erStandardStatuser) filter.set('statuser', synligeStatuser.join(','));
    if (publisertStatuser.length > 0)
      filter.set('publisertStatuser', publisertStatuser.join(','));
    if (fylker.length > 0) filter.set('fylker', fylker.join(','));
    if (kommuner.length > 0) filter.set('kommuner', kommuner.join(','));
    if (sortering !== Sortering.SIST_OPPDATERTE)
      filter.set('sortering', sortering);
    filter.sort();
    return filter.toString();
  })();

  // Parametere som mangler i det lagrede filteret, settes til standardverdien (null).
  const settFiltreFraLagretSøk = (søk: StandardsøkDTO) => {
    const filter = new URLSearchParams(søk.filter);
    const liste = (navn: string) => {
      const verdi = filter.get(navn);
      if (verdi === null) return null;
      return verdi === '' ? [] : verdi.split(',');
    };
    const lagretVisning = filter.get('visning');
    const visningFraSøk = erVisning(lagretVisning) ? lagretVisning : null;
    const lagretSortering = filter.get('sortering');

    setVisningInternal(
      visningFraSøk === Visning.MINE && !harTilgangTilUtkast
        ? null
        : visningFraSøk,
    );
    setStatuserInternal(
      liste('statuser')?.filter(erRekrutteringstreffStatus) ?? null,
    );
    setPublisertStatuserInternal(
      liste('publisertStatuser')?.filter(erPublisertStatus) ?? null,
    );
    setFylkerInternal(liste('fylker'));
    setKommunerInternal(liste('kommuner'));
    setKontorerInternal(liste('kontorer'));
    setSorteringInternal(erSortering(lagretSortering) ? lagretSortering : null);
    setSideInternal(null);
    setFritekstListeInternal(søk.fritekst);
    setAktivtStandardsøkId(søk.id);
    setBrukStandardsok(null);
  };

  const brukLagretSøk = async (søk: StandardsøkDTO) => {
    const gjeldende = await hentGjeldendeSøk(søk);
    if (!gjeldende) return false;
    settFiltreFraLagretSøk(gjeldende);
    return true;
  };

  // Menylenken åpner siden med brukStandardsok=true. Søket mot treffene venter til standardsøket er kontrollert.
  // Vi venter også på at listen er hentet på nytt, så vi ikke velger standardsøk fra en utdatert cache.
  const behandlerStandardsøk = useRef(false);
  useEffect(() => {
    if (!brukStandardsok) behandlerStandardsøk.current = false;
  }, [brukStandardsok]);

  useEffect(() => {
    if (
      !brukStandardsok ||
      behandlerStandardsøk.current ||
      standardsøkListe.isLoading ||
      standardsøkListe.isValidating
    ) {
      return;
    }
    behandlerStandardsøk.current = true;

    const standardsøk = standardsøkListe.data?.find((s) => s.erStandard);
    if (!standardsøk) {
      if (standardsøkListe.error) {
        visVarsel({
          type: 'error',
          tekst: 'Kunne ikke hente standardsøket. Viser vanlig søk.',
        });
      }
      setBrukStandardsok(null);
      return;
    }

    void brukLagretSøk(standardsøk).then((brukt) => {
      if (brukt) {
        track(UmamiEvent.Rekrutteringstreff.standardsøk_brukt_fra_menylenke);
      } else {
        setBrukStandardsok(null);
      }
    });
    // brukLagretSøk lages på nytt ved hver render. Ref-en hindrer at effekten kjører flere ganger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    brukStandardsok,
    standardsøkListe.isLoading,
    standardsøkListe.isValidating,
    standardsøkListe.data,
    standardsøkListe.error,
  ]);

  const venterPåStandardsøk = brukStandardsok === true;

  const sokHook = useRekrutteringstreffSok(
    {
      visning: visning as Visning,
      statuser: synligeStatuser.length > 0 ? synligeStatuser : undefined,
      publisertStatuser:
        publisertStatuser.length > 0 ? publisertStatuser : undefined,
      fylker: fylker.length > 0 ? fylker : undefined,
      kommuner: kommuner.length > 0 ? kommuner : undefined,
      kontorer: kontorer.length > 0 ? kontorer : undefined,
      fritekst: fritekst.length > 0 ? fritekst : undefined,
      sortering: sortering as Sortering,
      side,
    },
    { aktiv: !venterPåStandardsøk },
  );

  return (
    <RekrutteringstreffSøkContext.Provider
      value={{
        visning: visning as Visning,
        setVisning,
        statuser: synligeStatuser,
        setStatuser,
        publisertStatuser,
        setPublisertStatuser,
        fylker,
        setFylker,
        kommuner,
        setKommuner,
        kontorer,
        setKontorer,
        fritekst,
        setFritekst,
        setFritekstListe,
        sortering: sortering as Sortering,
        setSortering,
        side,
        setSide,
        sokHook,
        gjeldendeFilter,
        aktivtStandardsøkId,
        setAktivtStandardsøkId,
        brukLagretSøk,
        venterPåStandardsøk,
      }}
    >
      {children}
    </RekrutteringstreffSøkContext.Provider>
  );
};

export const useRekrutteringstreffSøkFilter = () => {
  const context = useContext(RekrutteringstreffSøkContext);
  if (!context) {
    throw new Error(
      'useRekrutteringstreffSøkFilter må brukes innenfor RekrutteringstreffSøkProvider',
    );
  }
  return context;
};
