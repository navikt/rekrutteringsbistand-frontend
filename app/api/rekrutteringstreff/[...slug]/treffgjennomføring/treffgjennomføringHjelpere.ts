import type {
  ArbeidsgiverIntervjufordelingDTO,
  ArbeidsgiverRotasjonDTO,
  DeltakernummerDTO,
  TreffgjennomføringDTO,
  RomDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
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

export const fordelIntervjuerForenklet = (
  treffgjennomføring: TreffgjennomføringDTO,
  arbeidsgiverTreffIder: string[],
): ArbeidsgiverIntervjufordelingDTO[] => {
  const utgangspunkt = arbeidsgiverTreffIder.map((arbeidsgiverTreffId) => {
    const lagret = treffgjennomføring.intervjufordelinger.find(
      (fordeling) => fordeling.arbeidsgiverTreffId === arbeidsgiverTreffId,
    );
    const interesserte = treffgjennomføring.interesser
      .filter(
        (interesse) => interesse.arbeidsgiverTreffId === arbeidsgiverTreffId,
      )
      .map((interesse) => interesse.personTreffId);
    const ekskluderte = (lagret?.ekskludertePersonTreffIder ?? []).filter(
      (personTreffId) => interesserte.includes(personTreffId),
    );
    const inkluderte = (lagret?.inkludertePersonTreffIder ?? []).filter(
      (personTreffId) => interesserte.includes(personTreffId),
    );
    const uplasserte = interesserte.filter(
      (personTreffId) =>
        !inkluderte.includes(personTreffId) &&
        !ekskluderte.includes(personTreffId),
    );

    return {
      arbeidsgiverTreffId,
      inkludertePersonTreffIder: [...inkluderte, ...uplasserte],
      ekskludertePersonTreffIder: ekskluderte,
    };
  });

  const opptattePlasser = new Map<string, Set<number>>();
  const fordelt = new Map<string, ArbeidsgiverIntervjufordelingDTO>();

  [...utgangspunkt]
    .sort(
      (venstre, høyre) =>
        venstre.inkludertePersonTreffIder.length -
        høyre.inkludertePersonTreffIder.length,
    )
    .forEach((fordeling) => {
      const personer = fordeling.inkludertePersonTreffIder;
      const ledige = new Set(personer.map((_, plass) => plass));
      const nyRekkefølge: string[] = [];

      personer.forEach((personTreffId, dagensPlass) => {
        const opptatte =
          opptattePlasser.get(personTreffId) ?? new Set<number>();
        const nærmesteFørst = [...ledige].sort(
          (venstre, høyre) =>
            Math.abs(venstre - dagensPlass) - Math.abs(høyre - dagensPlass) ||
            venstre - høyre,
        );
        const plass =
          nærmesteFørst.find((kandidat) => !opptatte.has(kandidat)) ??
          nærmesteFørst[0];

        ledige.delete(plass);
        nyRekkefølge[plass] = personTreffId;
        opptatte.add(plass);
        opptattePlasser.set(personTreffId, opptatte);
      });

      fordelt.set(fordeling.arbeidsgiverTreffId, {
        ...fordeling,
        inkludertePersonTreffIder: nyRekkefølge,
      });
    });

  return utgangspunkt.map(
    (fordeling) => fordelt.get(fordeling.arbeidsgiverTreffId) ?? fordeling,
  );
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

export const normaliserRom = (rom: RomDTO[], antallRom: number): RomDTO[] => {
  const antall = Math.max(antallRom, 0);
  if (antall === 0) return [];

  const beholdteRom = Array.from({ length: antall }, (_, indeks) => {
    const romnummer = indeks + 1;
    const eksisterende = rom.find(
      (kandidat) => kandidat.romnummer === romnummer,
    );
    return { romnummer, jobbsøkere: [...(eksisterende?.jobbsøkere ?? [])] };
  });

  const hjemløse = rom
    .filter((kandidat) => kandidat.romnummer > antall)
    .flatMap((kandidat) => kandidat.jobbsøkere);

  for (const personTreffId of hjemløse) {
    const romMedFærrest = beholdteRom.reduce((minsteRom, kandidat) =>
      kandidat.jobbsøkere.length < minsteRom.jobbsøkere.length
        ? kandidat
        : minsteRom,
    );
    romMedFærrest.jobbsøkere.push(personTreffId);
  }

  return beholdteRom;
};

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
      vurdering.personTreffId === personTreffId &&
      (vurdering.vurdering !== null ||
        vurdering.andregangsintervju ||
        vurdering.jobbtilbud),
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

export const toggleOppmøte = (
  oppmøte: string[],
  personTreffId: string,
): string[] =>
  oppmøte.includes(personTreffId)
    ? oppmøte.filter((id) => id !== personTreffId)
    : [...oppmøte, personTreffId];

export const tildelDeltakernummer = (
  deltakernummer: DeltakernummerDTO[],
  personTreffId: string,
): DeltakernummerDTO[] => {
  if (deltakernummer.some((rad) => rad.personTreffId === personTreffId)) {
    return deltakernummer;
  }

  const høyesteBrukte = deltakernummer.reduce(
    (høyeste, rad) => Math.max(høyeste, rad.nummer),
    0,
  );

  return [...deltakernummer, { personTreffId, nummer: høyesteBrukte + 1 }];
};
