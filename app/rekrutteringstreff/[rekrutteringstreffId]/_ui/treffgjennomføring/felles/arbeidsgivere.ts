import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';

export type ArbeidsgiverMedId = ArbeidsgiverDTO & {
  arbeidsgiverTreffId: string;
};

export const harArbeidsgiverTreffId = (
  arbeidsgiver: ArbeidsgiverDTO,
): arbeidsgiver is ArbeidsgiverMedId =>
  Boolean(arbeidsgiver.arbeidsgiverTreffId);
