import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { TreffgjennomføringDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';

export interface TreffgjennomføringOppdatering {
  brukLagretSvar: (treffgjennomføring: TreffgjennomføringDTO) => Promise<void>;
  hentBekreftetTilstand: () => Promise<void>;
}

export interface StegBasisProps {
  rekrutteringstreffId: string;
  treffgjennomføring: TreffgjennomføringDTO;
  arbeidsgivere: ArbeidsgiverDTO[];
}

/** For steg som skriver endringer tilbake til treffgjennomføringen. */
export interface StegLagringProps {
  oppdatering: TreffgjennomføringOppdatering;
  onLagringsstatusEndret: (lagrer: boolean) => void;
}

/** For steg med både forrige- og nesteknapp. */
export interface StegNavigasjonProps {
  onTilbake: () => void;
  onNeste: () => void;
}
