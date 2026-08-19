import type {
  ArbeidsgiverRotasjonDTO,
  TreffgjennomføringDTO,
  RomDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import { harRegistrertNoe } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
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
const TID_REFERANSEDATO = new Date(2000, 0, 1);

const klokkeslettForskjøvet = (
  starttidspunkt: string,
  minutter: number,
): string =>
  formaterKlokkeslett(
    addMinutes(parse(starttidspunkt, 'HH:mm', TID_REFERANSEDATO), minutter),
  ) ?? '';

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

export const beregnRotasjonsplan = (
  arbeidsgiverRekkefølge: ArbeidsgiverRotasjonDTO[],
  antallRom: number,
  starttidspunkt: string,
  varighetPerMøteMinutter: number,
): RotasjonsRunde[] => {
  const antallArbeidsgivere = arbeidsgiverRekkefølge.length;
  if (antallRom <= 0 || antallArbeidsgivere === 0) return [];

  const antallPosisjoner = Math.max(antallRom, antallArbeidsgivere);

  return Array.from({ length: antallPosisjoner }, (_, runde) => {
    const forskyvning = runde * varighetPerMøteMinutter;

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

export interface Treffgjennomføringsregistreringer {
  interesser: number;
  intervjuplasser: number;
  vurderinger: number;
}

export const tellRegistreringer = (
  treffgjennomføring: TreffgjennomføringDTO | undefined,
  personTreffId: string,
): Treffgjennomføringsregistreringer => {
  if (!treffgjennomføring) {
    return { interesser: 0, intervjuplasser: 0, vurderinger: 0 };
  }

  const interesser = treffgjennomføring.interesser.filter(
    (interesse) => interesse.personTreffId === personTreffId,
  ).length;

  const intervjuplasser = treffgjennomføring.intervjufordelinger.filter(
    (fordeling) =>
      fordeling.inkludertePersonTreffIder.includes(personTreffId) ||
      fordeling.ekskludertePersonTreffIder.includes(personTreffId),
  ).length;

  const vurderinger = treffgjennomføring.vurderinger.filter(
    (vurdering) =>
      vurdering.personTreffId === personTreffId && harRegistrertNoe(vurdering),
  ).length;

  return { interesser, intervjuplasser, vurderinger };
};

export const harRegistreringer = (
  registreringer: Treffgjennomføringsregistreringer,
): boolean =>
  registreringer.interesser +
    registreringer.intervjuplasser +
    registreringer.vurderinger >
  0;
