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

export const lagRegistreringshint = (
  registreringer: Treffgjennomføringsregistreringer,
  personerIRom = 0,
): string => {
  const handlinger: string[] = [];
  if (personerIRom > 0)
    handlinger.push('flytt personene ut av arbeidsgiverens rom');
  if (registreringer.interesser > 0)
    handlinger.push('fjern registrerte interesser');
  if (registreringer.intervjufordelinger > 0)
    handlinger.push('fjern registrerte intervjufordelinger');
  if (registreringer.vurderinger > 0)
    handlinger.push('nullstill registrerte vurderinger');
  const hint = handlinger.join(' og ');
  return hint ? `${hint[0].toUpperCase()}${hint.slice(1)} først.` : '';
};
