import type { VurderingDTO } from './treffgjennomføringSchema';

export const harVurderingsinnhold = (vurdering: VurderingDTO): boolean =>
  vurdering.vurderingsstatus !== null ||
  vurdering.vurderingsnotat.length > 0 ||
  vurdering.avtaltIntervju ||
  vurdering.avtaltIntervjuDato !== null ||
  vurdering.jobbtilbud;

export const lagTomVurdering = (
  personTreffId: string,
  arbeidsgiverTreffId: string,
): VurderingDTO => ({
  personTreffId,
  arbeidsgiverTreffId,
  vurderingsstatus: null,
  vurderingsnotat: [],
  avtaltIntervju: false,
  avtaltIntervjuDato: null,
  jobbtilbud: false,
});
