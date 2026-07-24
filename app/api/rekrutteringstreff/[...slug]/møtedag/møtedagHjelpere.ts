import type {
  ArbeidsgiverRotasjonDTO,
  MøtedagDTO,
  RomDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { formaterKlokkeslett } from '@/app/rekrutteringstreff/_utils/DatoTidFormaterere';
import { addMinutes, parse } from 'date-fns';

export interface RomIRunde {
  romnummer: number;
  arbeidsgiverTreffId: string | null;
}

export interface RotasjonsRunde {
  runde: number;
  startKlokkeslett: string; // «HH:mm»
  sluttKlokkeslett: string; // «HH:mm»
  rom: RomIRunde[];
  ventendeArbeidsgivere: string[];
}

// Kun tidskomponenten (HH:mm) er relevant. En fast referansedato gjør
// beregningen deterministisk og uavhengig av sommertid. Selve formateringen
// gjenbruker formaterKlokkeslett fra DatoTidFormaterere.
const TID_REFERANSEDATO = new Date(2000, 0, 1);

const klokkeslettForskjøvet = (
  starttidspunkt: string,
  minutter: number,
): string =>
  formaterKlokkeslett(
    addMinutes(parse(starttidspunkt, 'HH:mm', TID_REFERANSEDATO), minutter),
  ) ?? '';

// Fordeler de møtte jobbsøkerne jevnt på rommene med round-robin
export const fordelJobbsøkerePåRom = (
  personTreffIder: string[],
  antallRom: number,
): RomDTO[] => {
  if (antallRom <= 0) return [];

  return Array.from({ length: antallRom }, (_, indeks) => ({
    romnummer: indeks + 1,
    jobbsøkere: personTreffIder.filter(
      (_, personIndeks) => personIndeks % antallRom === indeks,
    ),
  }));
};

export const flyttJobbsøkerTilRom = (
  rom: RomDTO[],
  personTreffId: string,
  målromnummer: number,
): RomDTO[] => {
  const kildeRom = rom.find(({ jobbsøkere }) =>
    jobbsøkere.includes(personTreffId),
  );
  const målromFinnes = rom.some(({ romnummer }) => romnummer === målromnummer);

  if (!kildeRom || !målromFinnes || kildeRom.romnummer === målromnummer) {
    return rom;
  }

  return rom.map((aktueltRom) => ({
    ...aktueltRom,
    jobbsøkere:
      aktueltRom.romnummer === målromnummer
        ? [
            ...aktueltRom.jobbsøkere.filter((id) => id !== personTreffId),
            personTreffId,
          ]
        : aktueltRom.jobbsøkere.filter((id) => id !== personTreffId),
  }));
};

export const lagArbeidsgiverRotasjon = (
  arbeidsgiverTreffIder: string[],
): ArbeidsgiverRotasjonDTO[] =>
  arbeidsgiverTreffIder.map((arbeidsgiverTreffId, indeks) => ({
    arbeidsgiverTreffId,
    startPosisjon: indeks,
  }));

export const oppdaterRomEtterOppmøte = (
  eksisterendeRom: RomDTO[],
  oppmøte: string[],
): RomDTO[] => {
  if (eksisterendeRom.length === 0) return [];

  const oppmøtteIder = new Set(oppmøte);
  const alleredeFordelt = new Set<string>();
  const oppdaterteRom = eksisterendeRom.map((rom) => ({
    ...rom,
    jobbsøkere: rom.jobbsøkere.filter((personTreffId) => {
      if (
        !oppmøtteIder.has(personTreffId) ||
        alleredeFordelt.has(personTreffId)
      ) {
        return false;
      }
      alleredeFordelt.add(personTreffId);
      return true;
    }),
  }));

  for (const personTreffId of oppmøte) {
    if (alleredeFordelt.has(personTreffId)) continue;

    const romMedFærrest = oppdaterteRom.reduce((minsteRom, rom) =>
      rom.jobbsøkere.length < minsteRom.jobbsøkere.length ? rom : minsteRom,
    );
    romMedFærrest.jobbsøkere.push(personTreffId);
    alleredeFordelt.add(personTreffId);
  }

  return oppdaterteRom;
};

export const beregnRotasjonsplan = (
  arbeidsgiverRekkefølge: ArbeidsgiverRotasjonDTO[],
  antallRom: number,
  starttidspunkt: string,
  varighetPerMøteMinutter: number,
  pauseMellomMøterMinutter: number,
): RotasjonsRunde[] => {
  const antallArbeidsgivere = arbeidsgiverRekkefølge.length;
  if (antallRom <= 0 || antallArbeidsgivere === 0) return [];

  const antallPosisjoner = Math.max(antallRom, antallArbeidsgivere);

  return Array.from({ length: antallPosisjoner }, (_, runde) => {
    const forskyvning =
      runde * (varighetPerMøteMinutter + pauseMellomMøterMinutter);

    const posisjonFor = ({ startPosisjon }: ArbeidsgiverRotasjonDTO) =>
      (startPosisjon + runde) % antallPosisjoner;
    const rom = Array.from({ length: antallRom }, (_, posisjon) => ({
      romnummer: posisjon + 1,
      arbeidsgiverTreffId: arbeidsgiverRekkefølge.reduce<string | null>(
        (arbeidsgiverTreffId, arbeidsgiver) =>
          posisjonFor(arbeidsgiver) === posisjon
            ? arbeidsgiver.arbeidsgiverTreffId
            : arbeidsgiverTreffId,
        null,
      ),
    }));
    const ventendeArbeidsgivere = arbeidsgiverRekkefølge
      .filter((arbeidsgiver) => posisjonFor(arbeidsgiver) >= antallRom)
      .map(({ arbeidsgiverTreffId }) => arbeidsgiverTreffId);

    return {
      runde: runde + 1,
      startKlokkeslett: klokkeslettForskjøvet(starttidspunkt, forskyvning),
      sluttKlokkeslett: klokkeslettForskjøvet(
        starttidspunkt,
        forskyvning + varighetPerMøteMinutter,
      ),
      rom,
      ventendeArbeidsgivere,
    };
  });
};

export const harMøtt = (møtedag: MøtedagDTO, personTreffId: string): boolean =>
  møtedag.oppmøte.includes(personTreffId);

export const toggleOppmøte = (
  oppmøte: string[],
  personTreffId: string,
): string[] =>
  oppmøte.includes(personTreffId)
    ? oppmøte.filter((id) => id !== personTreffId)
    : [...oppmøte, personTreffId];
