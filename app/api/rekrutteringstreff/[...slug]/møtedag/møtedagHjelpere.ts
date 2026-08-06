import type {
  ArbeidsgiverIntervjufordelingDTO,
  ArbeidsgiverRotasjonDTO,
  DeltakernummerDTO,
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

/**
 * Forenklet intervjufordeling for mocken.
 *
 * Backend eier den ekte fordelingen (`POST /motedag/intervjufordeling/fordel`).
 * Her ligger en bevisst enklere variant, slik at «Fordel på nytt» gjør noe
 * ekte lokalt og i tester – men uten finjusteringene backend har.
 *
 * To regler:
 *  1. Arbeidsgivere med færrest personer fordeles først; de har minst å gå på.
 *  2. Hver person får den ledige plassen nærmest den hun står på nå, blant
 *     plassene hun ikke allerede er opptatt i hos en annen arbeidsgiver.
 *
 * Ekskluderte står urørt – de er flyttet dit med vilje. Ønsker som ennå ikke
 * er plassert regnes som inkluderte.
 */
export const fordelIntervjuerForenklet = (
  møtedag: MøtedagDTO,
  arbeidsgiverTreffIder: string[],
): ArbeidsgiverIntervjufordelingDTO[] => {
  const utgangspunkt = arbeidsgiverTreffIder.map((arbeidsgiverTreffId) => {
    const lagret = møtedag.intervjufordelinger.find(
      (fordeling) => fordeling.arbeidsgiverTreffId === arbeidsgiverTreffId,
    );
    const ønskede = møtedag.ønsker
      .filter((ønske) => ønske.arbeidsgiverTreffId === arbeidsgiverTreffId)
      .map((ønske) => ønske.personTreffId);
    const ekskluderte = (lagret?.ekskludertePersonTreffIder ?? []).filter(
      (personTreffId) => ønskede.includes(personTreffId),
    );
    const inkluderte = (lagret?.inkludertePersonTreffIder ?? []).filter(
      (personTreffId) => ønskede.includes(personTreffId),
    );
    const uplasserte = ønskede.filter(
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

  // Regel 1. Rekkefølgen avgjør bare hvem som får førsteretten på en plass.
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

      // Regel 2. Det finnes alltid en ledig plass: like mange plasser som
      // personer, og hver person tar nøyaktig én.
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

export interface Møtedagsregistreringer {
  ønsker: number;
  intervjuplasser: number;
  vurderinger: number;
}

export const tellRegistreringer = (
  møtedag: MøtedagDTO | undefined,
  personTreffId: string,
): Møtedagsregistreringer => {
  if (!møtedag) {
    return { ønsker: 0, intervjuplasser: 0, vurderinger: 0 };
  }

  const ønsker = møtedag.ønsker.filter(
    (ønske) => ønske.personTreffId === personTreffId,
  ).length;

  const intervjuplasser = møtedag.intervjufordelinger.filter(
    (fordeling) =>
      fordeling.inkludertePersonTreffIder.includes(personTreffId) ||
      fordeling.ekskludertePersonTreffIder.includes(personTreffId),
  ).length;

  const vurderinger = møtedag.vurderinger.filter(
    (vurdering) =>
      vurdering.personTreffId === personTreffId &&
      (vurdering.vurdering !== null ||
        vurdering.andreIntervju ||
        vurdering.jobbtilbud),
  ).length;

  return { ønsker, intervjuplasser, vurderinger };
};

export const harRegistreringer = (
  registreringer: Møtedagsregistreringer,
): boolean =>
  registreringer.ønsker +
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

/**
 * Deltakernummeret følger det fysiske kortet jobbsøkeren får utdelt i døra, og
 * er derfor bundet til personen – ikke til plassen i en liste. Nummeret
 * tildeles første gang oppmøtet registreres, og blir stående.
 *
 * Fjernes oppmøtet, blir nummeret liggende reservert for den samme personen.
 * Registreres hun møtt igjen, får hun sitt eget nummer tilbake. Prisen er at
 * det kan bli hull i rekka, og det er med vilje: et nummer som allerede er
 * delt ut skal aldri kunne peke på to ulike personer i etterkant.
 */
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
