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

// Fordeler de møtte jobbsøkerne jevnt på rommene med round-robin (person i → rom
// i mod R). Det gir maks 1 persons forskjell mellom rom (25 / 5 = 5 per rom).
// Rom 1..R opprettes alltid, også tomme, slik at steg 2 kan vise alle rom.
export const fordelJobbsøkerePåRom = (
  personTreffIder: string[],
  antallRom: number,
): RomDTO[] => {
  if (antallRom <= 0) return [];

  const rom: RomDTO[] = Array.from({ length: antallRom }, (_, indeks) => ({
    romnummer: indeks + 1,
    jobbsøkere: [],
  }));

  personTreffIder.forEach((personTreffId, indeks) => {
    rom[indeks % antallRom].jobbsøkere.push(personTreffId);
  });

  return rom;
};

export const balanserJobbsøkerePåRom = (
  eksisterendeRom: RomDTO[],
  oppmøte: string[],
  antallRom: number,
): RomDTO[] => {
  const uniktOppmøte = Array.from(new Set(oppmøte));
  if (antallRom <= 0) return [];
  if (eksisterendeRom.length === 0) {
    return fordelJobbsøkerePåRom(uniktOppmøte, antallRom);
  }

  const oppmøtteIder = new Set(uniktOppmøte);
  const fordelteIder = new Set<string>();
  const flyttekandidater: string[] = [];
  const rom: RomDTO[] = Array.from({ length: antallRom }, (_, indeks) => ({
    romnummer: indeks + 1,
    jobbsøkere: [],
  }));

  [...eksisterendeRom]
    .sort((a, b) => a.romnummer - b.romnummer)
    .forEach((eksisterende) => {
      eksisterende.jobbsøkere.forEach((personTreffId) => {
        if (
          !oppmøtteIder.has(personTreffId) ||
          fordelteIder.has(personTreffId)
        ) {
          return;
        }

        fordelteIder.add(personTreffId);
        const eksisterendeRomFinnes =
          eksisterende.romnummer >= 1 && eksisterende.romnummer <= antallRom;
        if (eksisterendeRomFinnes) {
          rom[eksisterende.romnummer - 1].jobbsøkere.push(personTreffId);
        } else {
          flyttekandidater.push(personTreffId);
        }
      });
    });

  uniktOppmøte.forEach((personTreffId) => {
    if (!fordelteIder.has(personTreffId)) {
      fordelteIder.add(personTreffId);
      flyttekandidater.push(personTreffId);
    }
  });

  const grunnstørrelse = Math.floor(uniktOppmøte.length / antallRom);
  const antallStørreRom = uniktOppmøte.length % antallRom;

  // Rom som allerede er størst får ekstrakapasiteten. Det maksimerer antallet
  // deltakere som kan beholde rommet sitt når størrelsene skal avvike med maks én.
  const størreRomnumre = new Set(
    [...rom]
      .sort(
        (a, b) =>
          b.jobbsøkere.length - a.jobbsøkere.length ||
          a.romnummer - b.romnummer,
      )
      .slice(0, antallStørreRom)
      .map(({ romnummer }) => romnummer),
  );
  const målstørrelse = (romnummer: number) =>
    grunnstørrelse + Number(størreRomnumre.has(romnummer));

  rom.forEach((romdata) => {
    flyttekandidater.push(
      ...romdata.jobbsøkere.splice(målstørrelse(romdata.romnummer)),
    );
  });

  let kandidatindeks = 0;
  rom.forEach((romdata) => {
    while (romdata.jobbsøkere.length < målstørrelse(romdata.romnummer)) {
      romdata.jobbsøkere.push(flyttekandidater[kandidatindeks]);
      kandidatindeks += 1;
    }
  });

  return rom;
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

    const rom: RomIRunde[] = Array.from({ length: antallRom }, (_, i) => ({
      romnummer: i + 1,
      arbeidsgiverTreffId: null,
    }));
    const ventendeArbeidsgivere: string[] = [];

    arbeidsgiverRekkefølge.forEach(({ arbeidsgiverTreffId, startPosisjon }) => {
      const posisjon = (startPosisjon + runde) % antallPosisjoner;
      if (posisjon < antallRom) {
        rom[posisjon].arbeidsgiverTreffId = arbeidsgiverTreffId;
      } else {
        ventendeArbeidsgivere.push(arbeidsgiverTreffId);
      }
    });

    return {
      runde: runde + 1,
      startKlokkeslett: klokkeslettForskjøvet(starttidspunkt, forskyvning),
      sluttKlokkeslett: klokkeslettForskjøvet(
        starttidspunkt,
        forskyvning + varighetPerMøteMinutter,
      ),
      rom,
      ventendeArbeidsgivere: ventendeArbeidsgivere,
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
