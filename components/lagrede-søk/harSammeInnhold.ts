import type { StandardsøkDTO } from '@/app/api/bruker/standardsok/standardsøkTyper';

/** Sant når søket avviker fra standard. En tom filterstreng betyr at alle filtre har standardverdien. */
export const harFilterEllerSøkeord = (filter: string, fritekst: string[]) =>
  filter !== '' || fritekst.length > 0;

/** Sant når søket har samme filtre og søkeord, i samme rekkefølge. */
export const harSammeInnhold = (
  søk: Pick<StandardsøkDTO, 'filter' | 'fritekst'>,
  filter: string,
  fritekst: string[],
) =>
  søk.filter === filter &&
  søk.fritekst.length === fritekst.length &&
  søk.fritekst.every((ord, i) => ord === fritekst[i]);
