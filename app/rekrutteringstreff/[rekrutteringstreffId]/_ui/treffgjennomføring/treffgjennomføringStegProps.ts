import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { TreffgjennomføringDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import type { TreffgjennomføringOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useTreffgjennomføringFane';

export interface StegBasisProps {
  rekrutteringstreffId: string;
  treffgjennomføring: TreffgjennomføringDTO;
  arbeidsgivere: ArbeidsgiverDTO[];
}

/** For steg som skriver endringer tilbake til treffgjennomføringen. */
export interface StegLagringProps {
  onTreffgjennomføringOppdatert: TreffgjennomføringOppdatering;
  onLagringsstatusEndret: (lagrer: boolean) => void;
}

/** For steg med både forrige- og nesteknapp. */
export interface StegNavigasjonProps {
  onTilbake: () => void;
  onNeste: () => void;
}

export type ArbeidsgiverMedId = ArbeidsgiverDTO & {
  arbeidsgiverTreffId: string;
};

export const medArbeidsgiverTreffId = (
  arbeidsgiver: ArbeidsgiverDTO,
): arbeidsgiver is ArbeidsgiverMedId =>
  Boolean(arbeidsgiver.arbeidsgiverTreffId);
