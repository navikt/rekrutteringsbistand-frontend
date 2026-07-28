import type { RotasjonsRunde } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/møtedagHjelpere';

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
  rotasjonsplan: RotasjonsRunde[],
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

export const lagRomplaner = (rotasjonsplan: RotasjonsRunde[]): Romplan[] => {
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
