import {
  PublisertStatus,
  publisertStatusVerdier,
  RekrutteringstreffStatus,
  rekrutteringstreffStatusVerdier,
  Sortering,
  Visning,
} from '@/app/rekrutteringstreff/_types/constants';

export interface LagretSøkFiltre {
  visning: Visning;
  kontorer: string[];
  statuser: RekrutteringstreffStatus[];
  publisertStatuser: PublisertStatus[];
  fylker: string[];
  kommuner: string[];
  sortering: Sortering;
}

// null betyr at filteret mangler og skal få standardverdien. En tom liste er et lagret valg.
export type TolketLagretSøkFiltre = {
  [K in keyof LagretSøkFiltre]: LagretSøkFiltre[K] | null;
};

const erEnAv = <T extends string>(
  gyldige: readonly T[],
  verdi: string,
): verdi is T => (gyldige as readonly string[]).includes(verdi);

const visningVerdier = Object.values(Visning);
const sorteringVerdier = Object.values(Sortering);

// Standardverdier utelates, og nøklene sorteres, slik at like filtre gir lik streng.
export const byggLagretSøkFilter = (filtre: LagretSøkFiltre): string => {
  const filter = new URLSearchParams();
  const settListe = (navn: string, verdier: string[]) => {
    if (verdier.length > 0) filter.set(navn, verdier.join(','));
  };

  if (filtre.visning !== Visning.ALLE) filter.set('visning', filtre.visning);
  settListe('kontorer', filtre.kontorer);
  const erStandardStatuser =
    filtre.statuser.length === 1 &&
    filtre.statuser[0] === RekrutteringstreffStatus.PUBLISERT;
  if (!erStandardStatuser) filter.set('statuser', filtre.statuser.join(','));
  settListe('publisertStatuser', filtre.publisertStatuser);
  settListe('fylker', filtre.fylker);
  settListe('kommuner', filtre.kommuner);
  if (filtre.sortering !== Sortering.SIST_OPPDATERTE)
    filter.set('sortering', filtre.sortering);
  filter.sort();
  return filter.toString();
};

export const tolkLagretSøkFilter = (
  lagretFilter: string,
): TolketLagretSøkFiltre => {
  const filter = new URLSearchParams(lagretFilter);
  const liste = (navn: string) => {
    const verdi = filter.get(navn);
    if (verdi === null) return null;
    return verdi === '' ? [] : verdi.split(',');
  };
  const enkeltverdi = <T extends string>(navn: string, gyldige: T[]) => {
    const verdi = filter.get(navn);
    return verdi !== null && erEnAv(gyldige, verdi) ? verdi : null;
  };

  return {
    visning: enkeltverdi('visning', visningVerdier),
    kontorer: liste('kontorer'),
    statuser:
      liste('statuser')?.filter((verdi) =>
        erEnAv(rekrutteringstreffStatusVerdier, verdi),
      ) ?? null,
    publisertStatuser:
      liste('publisertStatuser')?.filter((verdi) =>
        erEnAv(publisertStatusVerdier, verdi),
      ) ?? null,
    fylker: liste('fylker'),
    kommuner: liste('kommuner'),
    sortering: enkeltverdi('sortering', sorteringVerdier),
  };
};
