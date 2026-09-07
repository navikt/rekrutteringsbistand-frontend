import type { Rotasjonsrunde } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/rotasjonsplan';

interface Tidsrom {
  startKlokkeslett: string;
  sluttKlokkeslett: string;
}

export interface Arbeidsgiverpost extends Tidsrom {
  romnummer: number | null;
}

export interface Arbeidsgiverplan {
  arbeidsgiverTreffId: string;
  poster: Arbeidsgiverpost[];
}

export interface Rompost extends Tidsrom {
  arbeidsgiverTreffId: string | null;
}

export interface Romplan {
  romnummer: number;
  poster: Rompost[];
}

export const lagArbeidsgiverplaner = (
  rotasjonsplan: Rotasjonsrunde[],
  arbeidsgiverTreffIder: string[],
): Arbeidsgiverplan[] =>
  arbeidsgiverTreffIder.map((arbeidsgiverTreffId) => ({
    arbeidsgiverTreffId,
    poster: rotasjonsplan.map((runde) => ({
      startKlokkeslett: runde.startKlokkeslett,
      sluttKlokkeslett: runde.sluttKlokkeslett,
      romnummer:
        runde.rom.find((rom) => rom.arbeidsgiverTreffId === arbeidsgiverTreffId)
          ?.romnummer ?? null,
    })),
  }));

export const lagRomplaner = (rotasjonsplan: Rotasjonsrunde[]): Romplan[] => {
  const romnumre = [
    ...new Set(
      rotasjonsplan.flatMap((runde) => runde.rom.map((rom) => rom.romnummer)),
    ),
  ].sort((et, annet) => et - annet);

  return romnumre.map((romnummer) => ({
    romnummer,
    poster: rotasjonsplan.map((runde) => ({
      startKlokkeslett: runde.startKlokkeslett,
      sluttKlokkeslett: runde.sluttKlokkeslett,
      arbeidsgiverTreffId:
        runde.rom.find((rom) => rom.romnummer === romnummer)
          ?.arbeidsgiverTreffId ?? null,
    })),
  }));
};
