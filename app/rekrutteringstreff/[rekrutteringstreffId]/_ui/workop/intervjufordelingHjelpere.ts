/**
 * Hjelpere for intervjufordelingen i WorkOp – steg 4 på møtedagen.
 *
 * ## Domenemodellen
 *
 * Under møtedagen sier arbeidsgiverne hvem de ønsker å intervjue («ønsker»).
 * Møtelederen fordeler så disse på en liste per arbeidsgiver, delt i to av en
 * sperrelinje:
 *
 * - **inkludert** – de som faktisk får intervju. Rekkefølgen betyr noe:
 *   posisjon 0 er første intervju, posisjon 1 det neste, og så videre.
 * - **ekskludert** – ønsket, men får ikke intervju denne gangen. Rekkefølgen
 *   her er bare visuell.
 *
 * Posisjonen i den inkluderte lista kalles «plass», og fungerer som en
 * tidsluke: alle arbeidsgivere kjører intervju 1 samtidig, så intervju 2, og
 * så videre. Derfor er det et problem hvis samme person står på samme plass
 * hos to arbeidsgivere – hun kan ikke være to steder på én gang. Det er dette
 * som kalles en **plasskonflikt**.
 *
 * ## Arbeidsdelingen i fila
 *
 * Selve fordelingen ligger **ikke** her. Den eies av backend, som regner den ut
 * og lagrer den i én transaksjon – se `fordelIntervjuer` i møtedagens
 * `mutations.ts`. Frontend ber om en fordeling ved to bevisste handlinger:
 * første gang møtelederen går videre fra ønskesteget, og ved «Fordel på nytt».
 * Navigering endrer aldri noe.
 *
 * Igjen her står det som må skje umiddelbart i grensesnittet:
 *
 * 1. `fordelingerForArbeidsgivere` former serverdataene for visning – ett
 *    kort per arbeidsgiver, også de uten fordeling.
 * 2. `finnPlasskonflikter` finner kollisjonene og UI-et viser dem som
 *    varseltrekanter. Denne blir liggende i frontend med vilje: varselet må
 *    oppdateres mens møtelederen drar, uten en rundtur til serveren.
 * 3. `flyttPerson*` lar henne rette opp manuelt, med dra-og-slipp eller
 *    piltaster. Resultatet lagres med `PUT /intervjufordeling`.
 *
 * Vi løser altså ikke fordelingen perfekt. Backend kommer et godt stykke når
 * noen ber om det, og denne fila gjør resten synlig og enkel å rette for
 * mennesket.
 *
 * Merk at ønskene holdes i takt av backend, ikke her: trekkes et ønske,
 * forsvinner personen fra fordelingen, og legges et nytt til, havner hun
 * bakerst blant de inkluderte.
 */
import type { ArbeidsgiverIntervjufordelingDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';

/** Hvilken side av sperrelinja en person står på. */
export type Fordelingsseksjon = 'inkludert' | 'ekskludert';

/** Én person som står på samme plass hos to eller flere arbeidsgivere. */
export interface Plasskonflikt {
  personTreffId: string;
  /** Plassnummer slik det vises i grensesnittet, altså 1-basert. */
  plass: number;
  /** De to eller flere arbeidsgiverne som kolliderer. */
  arbeidsgiverTreffIder: string[];
}

const fordelingForArbeidsgiver = (
  intervjufordelinger: ArbeidsgiverIntervjufordelingDTO[],
  arbeidsgiverTreffId: string,
): ArbeidsgiverIntervjufordelingDTO =>
  intervjufordelinger.find(
    (fordeling) => fordeling.arbeidsgiverTreffId === arbeidsgiverTreffId,
  ) ?? {
    arbeidsgiverTreffId,
    inkludertePersonTreffIder: [],
    ekskludertePersonTreffIder: [],
  };

/**
 * Former serverens fordelinger for visning: én per arbeidsgiver, i samme
 * rekkefølge som arbeidsgiverne står i lista.
 *
 * Rent oppslag – ingen omfordeling og ingen synkronisering mot ønskene. En
 * arbeidsgiver uten lagret fordeling får en tom, slik at kortet hennes kan
 * tegnes. At hver arbeidsgiver alltid har en oppføring er en forutsetning
 * resten av steget hviler på.
 */
export const fordelingerForArbeidsgivere = (
  arbeidsgiverTreffIder: string[],
  intervjufordelinger: ArbeidsgiverIntervjufordelingDTO[],
): ArbeidsgiverIntervjufordelingDTO[] =>
  arbeidsgiverTreffIder.map((arbeidsgiverTreffId) =>
    fordelingForArbeidsgiver(intervjufordelinger, arbeidsgiverTreffId),
  );

/**
 * Sammenligner to fordelinger felt for felt, inkludert rekkefølgen.
 *
 * Brukes til å avgjøre om noe faktisk er endret, slik at vi slipper å lagre
 * og tegne på nytt når resultatet er identisk.
 */
export const erSammeIntervjufordeling = (
  venstre: ArbeidsgiverIntervjufordelingDTO,
  høyre: ArbeidsgiverIntervjufordelingDTO,
) =>
  venstre.arbeidsgiverTreffId === høyre.arbeidsgiverTreffId &&
  venstre.inkludertePersonTreffIder.length ===
    høyre.inkludertePersonTreffIder.length &&
  venstre.inkludertePersonTreffIder.every(
    (personTreffId, indeks) =>
      personTreffId === høyre.inkludertePersonTreffIder[indeks],
  ) &&
  venstre.ekskludertePersonTreffIder.length ===
    høyre.ekskludertePersonTreffIder.length &&
  venstre.ekskludertePersonTreffIder.every(
    (personTreffId, indeks) =>
      personTreffId === høyre.ekskludertePersonTreffIder[indeks],
  );

/** Finner hvilken side av sperrelinja personen står på, eller `null`. */
const finnSeksjon = (
  fordeling: ArbeidsgiverIntervjufordelingDTO,
  personTreffId: string,
): Fordelingsseksjon | null => {
  if (fordeling.inkludertePersonTreffIder.includes(personTreffId)) {
    return 'inkludert';
  }
  if (fordeling.ekskludertePersonTreffIder.includes(personTreffId)) {
    return 'ekskludert';
  }
  return null;
};

const listeForSeksjon = (
  fordeling: ArbeidsgiverIntervjufordelingDTO,
  seksjon: Fordelingsseksjon,
) =>
  seksjon === 'inkludert'
    ? fordeling.inkludertePersonTreffIder
    : fordeling.ekskludertePersonTreffIder;

/**
 * Grunnoperasjonen for all flytting: setter personen inn på `målIndeks` i
 * `målSeksjon`. De to andre flyttefunksjonene regner om til dette kallet.
 *
 * Ukjent person, eller en indeks utenfor lista, gir fordelingen uendret
 * tilbake i stedet for å kaste. Flyttingen skjer under dra-og-slipp, der en
 * krasj ville vært verre enn at ingenting skjedde.
 */
export const flyttPersonTilIndeks = (
  fordeling: ArbeidsgiverIntervjufordelingDTO,
  personTreffId: string,
  målSeksjon: Fordelingsseksjon,
  målIndeks: number,
): ArbeidsgiverIntervjufordelingDTO => {
  const kildeSeksjon = finnSeksjon(fordeling, personTreffId);
  if (!kildeSeksjon) return fordeling;

  const inkludertePersonTreffIder = [...fordeling.inkludertePersonTreffIder];
  const ekskludertePersonTreffIder = [...fordeling.ekskludertePersonTreffIder];
  const kildeListe =
    kildeSeksjon === 'inkludert'
      ? inkludertePersonTreffIder
      : ekskludertePersonTreffIder;
  const målListe =
    målSeksjon === 'inkludert'
      ? inkludertePersonTreffIder
      : ekskludertePersonTreffIder;
  const kildeIndeks = kildeListe.indexOf(personTreffId);

  kildeListe.splice(kildeIndeks, 1);
  // Vi fjernet personen før vi setter den inn igjen. Flytter vi nedover i
  // samme liste, har alt bak den rykket ett hakk fram, og målindeksen må
  // korrigeres tilsvarende.
  const justertMålIndeks =
    kildeSeksjon === målSeksjon && kildeIndeks < målIndeks
      ? målIndeks - 1
      : målIndeks;
  målListe.splice(
    Math.max(0, Math.min(justertMålIndeks, målListe.length)),
    0,
    personTreffId,
  );

  return {
    ...fordeling,
    inkludertePersonTreffIder,
    ekskludertePersonTreffIder,
  };
};

/**
 * Slipper en person på en annen persons rad – dra-og-slipp.
 *
 * Retningen avgjør hvor personen havner: drar du oppover legges hun *før*
 * målraden, drar du nedover *etter*. Det matcher forventningen om at raden du
 * slipper på blir stående, og at den dratte tar plassen «der du ser den».
 */
export const flyttPersonTilRad = (
  fordeling: ArbeidsgiverIntervjufordelingDTO,
  personTreffId: string,
  målPersonTreffId: string,
): ArbeidsgiverIntervjufordelingDTO => {
  const kildeSeksjon = finnSeksjon(fordeling, personTreffId);
  const målSeksjon = finnSeksjon(fordeling, målPersonTreffId);
  if (!kildeSeksjon || !målSeksjon || personTreffId === målPersonTreffId) {
    return fordeling;
  }

  const kildeIndeks = listeForSeksjon(fordeling, kildeSeksjon).indexOf(
    personTreffId,
  );
  const målIndeks = listeForSeksjon(fordeling, målSeksjon).indexOf(
    målPersonTreffId,
  );
  const plasserEtterMål =
    kildeSeksjon === målSeksjon && kildeIndeks < målIndeks;

  return flyttPersonTilIndeks(
    fordeling,
    personTreffId,
    målSeksjon,
    målIndeks + Number(plasserEtterMål),
  );
};

/**
 * Flytter en person ett hakk opp eller ned med piltastene.
 *
 * Sperrelinja krysses automatisk når man går ut av lista si: nederst blant de
 * inkluderte tar ett steg ned deg øverst blant de ekskluderte, og motsatt.
 * Møtelederen slipper dermed å tenke på de to listene som atskilte – det er
 * én kolonne med en strek i.
 *
 * Står du ytterst og ikke har noe å krysse til, skjer ingenting.
 */
export const flyttPersonEttSteg = (
  fordeling: ArbeidsgiverIntervjufordelingDTO,
  personTreffId: string,
  retning: 'opp' | 'ned',
): ArbeidsgiverIntervjufordelingDTO => {
  const seksjon = finnSeksjon(fordeling, personTreffId);
  if (!seksjon) return fordeling;

  const liste = listeForSeksjon(fordeling, seksjon);
  const indeks = liste.indexOf(personTreffId);

  if (retning === 'opp' && indeks === 0) {
    return seksjon === 'ekskludert'
      ? flyttPersonTilIndeks(
          fordeling,
          personTreffId,
          'inkludert',
          fordeling.inkludertePersonTreffIder.length,
        )
      : fordeling;
  }

  if (retning === 'ned' && indeks === liste.length - 1) {
    return seksjon === 'inkludert'
      ? flyttPersonTilIndeks(fordeling, personTreffId, 'ekskludert', 0)
      : fordeling;
  }

  // Opp: rett til indeksen over. Ned: `+ 2` fordi personen selv fjernes først,
  // slik at målindeksen rykker ett hakk fram – jf. justeringen i
  // `flyttPersonTilIndeks`. Netto blir det ett steg ned.
  return flyttPersonTilIndeks(
    fordeling,
    personTreffId,
    seksjon,
    retning === 'opp' ? indeks - 1 : indeks + 2,
  );
};

/**
 * Finner personer som står på samme plass hos flere arbeidsgivere, altså to
 * intervjuer i samme tidsluke.
 *
 * Dette er varselet som gjør at fordelingen kan være «god nok» framfor
 * perfekt: `fordelUtenPlasskonflikter` fjerner de fleste kollisjonene, og de
 * som blir igjen vises her som varseltrekant, slik at møtelederen kan flytte
 * manuelt.
 *
 * Bare inkluderte teller. Ekskluderte skal ikke intervjues, og kan derfor
 * ikke kollidere med noe.
 */
export const finnPlasskonflikter = (
  intervjufordelinger: ArbeidsgiverIntervjufordelingDTO[],
): Plasskonflikt[] => {
  // Samme person på samme plassnummer hos to arbeidsgivere betyr to intervjuer
  // i samme tidsluke. Nøkkelen brukes bare til å gruppere; feltene vi trenger
  // ligger i verdien.
  const konfliktkandidater = new Map<string, Plasskonflikt>();

  intervjufordelinger.forEach((fordeling) =>
    fordeling.inkludertePersonTreffIder.forEach(
      (personTreffId, plassIndeks) => {
        const nøkkel = `${plassIndeks}:${personTreffId}`;
        const kandidat = konfliktkandidater.get(nøkkel);
        if (kandidat) {
          kandidat.arbeidsgiverTreffIder.push(fordeling.arbeidsgiverTreffId);
          return;
        }
        konfliktkandidater.set(nøkkel, {
          personTreffId,
          plass: plassIndeks + 1,
          arbeidsgiverTreffIder: [fordeling.arbeidsgiverTreffId],
        });
      },
    ),
  );

  return [...konfliktkandidater.values()].filter(
    ({ arbeidsgiverTreffIder }) => arbeidsgiverTreffIder.length > 1,
  );
};
