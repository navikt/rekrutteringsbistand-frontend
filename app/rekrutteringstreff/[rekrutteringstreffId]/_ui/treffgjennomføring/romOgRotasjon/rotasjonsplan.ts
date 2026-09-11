import type { ArbeidsgiverRotasjonDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import { formaterKlokkeslett } from '@/app/rekrutteringstreff/_utils/DatoTidFormaterere';
import { addMinutes, parse } from 'date-fns';

export interface RomIRunde {
  romnummer: number;
  arbeidsgiverTreffId: string | null;
}

export interface Rotasjonsrunde {
  runde: number;
  startKlokkeslett: string;
  sluttKlokkeslett: string;
  rom: RomIRunde[];
  ventendeArbeidsgivere: string[];
}

const TID_REFERANSEDATO = new Date(2000, 0, 1);

const forskyvKlokkeslett = (starttidspunkt: string, minutter: number): string =>
  formaterKlokkeslett(
    addMinutes(parse(starttidspunkt, 'HH:mm', TID_REFERANSEDATO), minutter),
  ) ?? '';

export const beregnRotasjonsplan = (
  arbeidsgiverRekkefølge: ArbeidsgiverRotasjonDTO[],
  antallRom: number,
  starttidspunkt: string,
  varighetPerMøteMinutter: number,
): Rotasjonsrunde[] => {
  const antallArbeidsgivere = arbeidsgiverRekkefølge.length;
  if (antallRom <= 0 || antallArbeidsgivere === 0) return [];

  const antallPosisjoner = Math.max(antallRom, antallArbeidsgivere);

  return Array.from({ length: antallPosisjoner }, (_, rundeindeks) => {
    const minutterFraStart = rundeindeks * varighetPerMøteMinutter;
    const arbeidsgiverPerPosisjon = new Map<number, string>();
    const ventendeArbeidsgivere: string[] = [];

    for (const {
      arbeidsgiverTreffId,
      førsteRomnummer,
    } of arbeidsgiverRekkefølge) {
      const posisjon = (førsteRomnummer - 1 + rundeindeks) % antallPosisjoner;
      arbeidsgiverPerPosisjon.set(posisjon, arbeidsgiverTreffId);
      if (posisjon >= antallRom) {
        ventendeArbeidsgivere.push(arbeidsgiverTreffId);
      }
    }

    return {
      runde: rundeindeks + 1,
      startKlokkeslett: forskyvKlokkeslett(starttidspunkt, minutterFraStart),
      sluttKlokkeslett: forskyvKlokkeslett(
        starttidspunkt,
        minutterFraStart + varighetPerMøteMinutter,
      ),
      rom: Array.from({ length: antallRom }, (_, posisjon) => ({
        romnummer: posisjon + 1,
        arbeidsgiverTreffId: arbeidsgiverPerPosisjon.get(posisjon) ?? null,
      })),
      ventendeArbeidsgivere,
    };
  });
};
