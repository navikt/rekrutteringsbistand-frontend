import type { TreffgjennomføringDTO } from './treffgjennomføringSchema';
import { harVurderingsinnhold } from './vurdering';

export interface Treffgjennomføringsregistreringer {
  interesser: number;
  vurderinger: number;
}

export const tellRegistreringer = (
  treffgjennomføring: TreffgjennomføringDTO | undefined,
  personTreffId: string,
): Treffgjennomføringsregistreringer => {
  if (!treffgjennomføring) {
    return { interesser: 0, vurderinger: 0 };
  }

  const interesser = treffgjennomføring.interesser.filter(
    (interesse) => interesse.personTreffId === personTreffId,
  ).length;

  const vurderinger = treffgjennomføring.vurderinger.filter(
    (vurdering) =>
      vurdering.personTreffId === personTreffId &&
      harVurderingsinnhold(vurdering),
  ).length;

  return { interesser, vurderinger };
};

export const harRegistreringer = (
  registreringer: Treffgjennomføringsregistreringer,
): boolean => registreringer.interesser + registreringer.vurderinger > 0;
