import type { LagretSøkDTO } from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';

/** Sant når søket avviker fra standard. En tom filterstreng betyr at alle filtre har standardverdien. */
export const harFilterEllerSøkeord = (filter: string, fritekst: string[]) =>
  filter !== '' || fritekst.length > 0;

const somMengde = (søkeord: string[]) => new Set(søkeord);

const sammeSøkeord = (a: string[], b: string[]) => {
  const mengdeA = somMengde(a);
  const mengdeB = somMengde(b);
  return (
    mengdeA.size === mengdeB.size &&
    [...mengdeA].every((ord) => mengdeB.has(ord))
  );
};

/**
 * Sant når søket har samme filtre og søkeord. Rekkefølgen på søkeordene teller ikke,
 * og et søkeord som står to ganger, teller én gang. Filtrene sammenlignes etter `normaliserFilter`, så rekkefølge
 * og standardverdier ikke teller.
 */
export const harSammeInnhold = (
  søk: Pick<LagretSøkDTO, 'filter' | 'fritekst'>,
  filter: string,
  fritekst: string[],
  normaliserFilter: (filter: string) => string = (f) => f,
) =>
  normaliserFilter(søk.filter) === normaliserFilter(filter) &&
  sammeSøkeord(søk.fritekst, fritekst);

/** Det første lagrede søket med samme filtre og søkeord. Like søk stoppes ved lagring, men to faner kan lagre samtidig. */
export const finnLiktSøk = <
  T extends Pick<LagretSøkDTO, 'filter' | 'fritekst'>,
>(
  søk: readonly T[],
  filter: string,
  fritekst: string[],
  normaliserFilter?: (filter: string) => string,
): T | undefined =>
  søk.find((s) => harSammeInnhold(s, filter, fritekst, normaliserFilter));
