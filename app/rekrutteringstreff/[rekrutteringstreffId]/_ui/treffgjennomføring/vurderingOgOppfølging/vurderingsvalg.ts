import type { Vurderingsvalg } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';

export const VURDERINGSETIKETT: Record<Vurderingsvalg, string> = {
  AKTUELL: 'Aktuell',
  KANSKJE: 'Kanskje',
  IKKE_AKTUELL: 'Ikke aktuell',
};

/** Rekkefølgen i nedtrekkslisten. */
export const VURDERINGSVALG = Object.keys(
  VURDERINGSETIKETT,
) as Vurderingsvalg[];

export const erVurderingsvalg = (verdi: string): verdi is Vurderingsvalg =>
  VURDERINGSVALG.some((valg) => valg === verdi);
