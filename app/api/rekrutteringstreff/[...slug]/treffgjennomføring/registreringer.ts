import type { TreffgjennomføringDTO } from './treffgjennomføringSchema';
import { harVurderingsinnhold } from './vurdering';

export interface Treffgjennomføringsregistreringer {
  interesser: number;
  intervjufordelinger: number;
  vurderinger: number;
}

export const tellRegistreringer = (
  treffgjennomføring: TreffgjennomføringDTO | undefined,
  personTreffId: string,
): Treffgjennomføringsregistreringer => {
  if (!treffgjennomføring) {
    return { interesser: 0, intervjufordelinger: 0, vurderinger: 0 };
  }

  const interesser = treffgjennomføring.interesser.filter(
    (interesse) => interesse.personTreffId === personTreffId,
  ).length;

  const intervjufordelinger = treffgjennomføring.intervjufordelinger.filter(
    (fordeling) =>
      fordeling.inkludertePersonTreffIder.includes(personTreffId) ||
      fordeling.ekskludertePersonTreffIder.includes(personTreffId),
  ).length;

  const vurderinger = treffgjennomføring.vurderinger.filter(
    (vurdering) =>
      vurdering.personTreffId === personTreffId &&
      harVurderingsinnhold(vurdering),
  ).length;

  return { interesser, intervjufordelinger, vurderinger };
};

export const harRegistreringer = (
  registreringer: Treffgjennomføringsregistreringer,
): boolean =>
  registreringer.interesser +
    registreringer.intervjufordelinger +
    registreringer.vurderinger >
  0;
