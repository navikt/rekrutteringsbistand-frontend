import {
  PublisertStatus,
  publisertStatusVerdier,
  RekrutteringstreffStatus,
  rekrutteringstreffStatusVerdier,
  Sortering,
  Visning,
} from '@/app/rekrutteringstreff/_types/constants';
import {
  erEnAv,
  lagFilterstreng,
  tolkFilterstreng,
} from '@/components/standardsøk/filterstreng';

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

const visningVerdier = Object.values(Visning);
const sorteringVerdier = Object.values(Sortering);

// Standardverdier utelates, slik at like filtre gir lik streng.
export const byggLagretSøkFilter = (filtre: LagretSøkFiltre): string =>
  lagFilterstreng(({ settVerdi, settListe }) => {
    if (filtre.visning !== Visning.ALLE) settVerdi('visning', filtre.visning);
    settListe('kontorer', filtre.kontorer);
    const erStandardStatuser =
      filtre.statuser.length === 1 &&
      filtre.statuser[0] === RekrutteringstreffStatus.PUBLISERT;
    // Også en tom liste lagres, fordi den skiller seg fra standardverdien.
    if (!erStandardStatuser) settVerdi('statuser', filtre.statuser.join(','));
    settListe('publisertStatuser', filtre.publisertStatuser);
    settListe('fylker', filtre.fylker);
    settListe('kommuner', filtre.kommuner);
    if (filtre.sortering !== Sortering.SIST_OPPDATERTE)
      settVerdi('sortering', filtre.sortering);
  });

export const tolkLagretSøkFilter = (
  lagretFilter: string,
): TolketLagretSøkFiltre => {
  const { liste, enkeltverdi } = tolkFilterstreng(lagretFilter);

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
