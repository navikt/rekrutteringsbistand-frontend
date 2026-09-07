import type {
  InteresseDTO,
  TreffgjennomføringDTO,
  VurderingDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import { harVurderingsinnhold } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/vurdering';

export type Interesseendring = InteresseDTO & { interessert: boolean };
export type Registreringspar = Pick<
  InteresseDTO,
  'personTreffId' | 'arbeidsgiverTreffId'
>;

export const registreringsnøkkel = ({
  personTreffId,
  arbeidsgiverTreffId,
}: Registreringspar) => `${personTreffId}:${arbeidsgiverTreffId}`;

export const medOptimistiskeInteresser = (
  treffgjennomføring: TreffgjennomføringDTO,
  optimistiskeInteresser: Record<string, Interesseendring>,
): TreffgjennomføringDTO => {
  let interesser = [...treffgjennomføring.interesser];

  for (const interesse of Object.values(optimistiskeInteresser)) {
    interesser = interesser.filter(
      (lagretInteresse) =>
        registreringsnøkkel(lagretInteresse) !== registreringsnøkkel(interesse),
    );
    if (interesse.interessert) {
      interesser.push({
        personTreffId: interesse.personTreffId,
        arbeidsgiverTreffId: interesse.arbeidsgiverTreffId,
      });
    }
  }

  return { ...treffgjennomføring, interesser };
};

export const medOptimistiskeVurderinger = (
  treffgjennomføring: TreffgjennomføringDTO,
  optimistiskeVurderinger: Record<string, VurderingDTO>,
): TreffgjennomføringDTO => {
  const vurderinger = [...treffgjennomføring.vurderinger];

  for (const vurdering of Object.values(optimistiskeVurderinger)) {
    const indeks = vurderinger.findIndex(
      (lagretVurdering) =>
        registreringsnøkkel(lagretVurdering) === registreringsnøkkel(vurdering),
    );

    if (!harVurderingsinnhold(vurdering)) {
      if (indeks >= 0) vurderinger.splice(indeks, 1);
    } else if (indeks >= 0) {
      vurderinger[indeks] = vurdering;
    } else {
      vurderinger.push(vurdering);
    }
  }

  return { ...treffgjennomføring, vurderinger };
};
