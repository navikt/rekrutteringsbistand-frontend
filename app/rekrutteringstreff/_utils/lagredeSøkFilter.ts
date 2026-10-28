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

interface LagretSøkFiltre {
  visning: Visning;
  kontorer: string[];
  statuser: RekrutteringstreffStatus[];
  publisertStatuser: PublisertStatus[];
  fylker: string[];
  kommuner: string[];
  sortering: Sortering;
}

// null betyr at filteret mangler og skal få standardverdien. En tom liste er et lagret valg.
type TolketLagretSøkFiltre = {
  [K in keyof LagretSøkFiltre]: LagretSøkFiltre[K] | null;
};

const visningVerdier = Object.values(Visning);
const sorteringVerdier = Object.values(Sortering);

// Standardverdier utelates, slik at like filtre gir lik streng.
export const byggLagretSøkFilter = (filtre: LagretSøkFiltre): string =>
  lagFilterstreng({
    visning: filtre.visning !== Visning.ALLE ? filtre.visning : undefined,
    kontorer: filtre.kontorer,
    // Også en tom liste lagres, fordi den skiller seg fra standardverdien.
    statuser:
      filtre.statuser.length === 1 &&
      filtre.statuser[0] === RekrutteringstreffStatus.PUBLISERT
        ? undefined
        : filtre.statuser.join(','),
    publisertStatuser: filtre.publisertStatuser,
    fylker: filtre.fylker,
    kommuner: filtre.kommuner,
    sortering:
      filtre.sortering !== Sortering.SIST_OPPDATERTE
        ? filtre.sortering
        : undefined,
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
