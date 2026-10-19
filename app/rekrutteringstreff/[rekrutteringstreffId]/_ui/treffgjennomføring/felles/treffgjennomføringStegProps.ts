import type { TreffgjennomføringDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import type { ArbeidsgiverMedId } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/arbeidsgivere';

export interface TreffgjennomføringOppdatering {
  tilstandErUbekreftet: boolean;
  brukLagretSvar: (treffgjennomføring: TreffgjennomføringDTO) => Promise<void>;
  hentBekreftetTilstand: () => Promise<void>;
}

export interface StegBasisProps {
  rekrutteringstreffId: string;
  treffgjennomføring: TreffgjennomføringDTO;
  arbeidsgivere: ArbeidsgiverMedId[];
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
  /** Neste steg er allerede nådd. Et opplåst steg forblir åpent, så Neste sperres bare mens det lagres. */
  nesteErLåstOpp: boolean;
}

/** For hooks som autolagrer registreringer i et steg. */
export type AutolagringProps = Pick<
  StegBasisProps,
  'rekrutteringstreffId' | 'treffgjennomføring'
> &
  Pick<StegLagringProps, 'oppdatering'>;
