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
 * 1. `normaliserIntervjufordelinger` bygger startforslaget ut fra ønskene.
 * 2. `finnPlasskonflikter` finner kollisjonene som er igjen, og UI-et viser
 *    dem som varseltrekanter.
 * 3. `flyttPerson*` lar møtelederen rette opp manuelt, med dra-og-slipp eller
 *    piltaster.
 *
 * Vi løser altså ikke fordelingen perfekt. Vi kommer et godt stykke
 * automatisk, og gjør resten synlig og enkel å rette for mennesket.
 */
import type {
  ArbeidsgiverIntervjufordelingDTO,
  ØnskeDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';

/** Hvilken side av sperrelinja en person står på. */
export type Fordelingsseksjon = 'inkludert' | 'ekskludert';

interface NormaliserIntervjufordelingerInput {
  /** Arbeidsgiverne på treffet. Bestemmer rekkefølgen på resultatet. */
  arbeidsgiverTreffIder: string[];
  /** Jobbsøkerne slik de vises i lista. Gir nye ønsker en forutsigbar rekkefølge. */
  personTreffIderIRekkefølge: string[];
  /** Hvem hver arbeidsgiver har sagt at de vil intervjue. */
  ønsker: ØnskeDTO[];
  /**
   * Det som allerede er lagret på serveren. Arbeidsgivere som finnes her
   * regnes som «låst»: møtelederen har bestemt rekkefølgen deres, og vi
   * omfordeler dem ikke.
   */
  intervjufordelinger: ArbeidsgiverIntervjufordelingDTO[];
}

/** Én person som står på samme plass hos to eller flere arbeidsgivere. */
export interface Plasskonflikt {
  personTreffId: string;
  /** Plassnummer slik det vises i grensesnittet, altså 1-basert. */
  plass: number;
  /** De to eller flere arbeidsgiverne som kolliderer. */
  arbeidsgiverTreffIder: string[];
}

const unike = (ider: string[]) => [...new Set(ider)];

const avstandTilPlass = (plass: number, foretrukketPlass: number) =>
  Math.abs(plass - foretrukketPlass);

/**
 * Gir hver person et plassnummer hos hver arbeidsgiver. Plassnummeret er i
 * praksis en tidsluke, og ingen rekker to intervjuer samtidig – så vi prøver å
 * unngå at samme person står på samme plassnummer hos flere arbeidsgivere.
 *
 * To regler, i denne rekkefølgen:
 *
 *  1. Arbeidsgivere med færrest personer fordeles først. De har minst å gå på,
 *     så de får velge mens det ennå er ledige tidsluker.
 *  2. Hver person får den ledige plassen nærmest den hun allerede står på,
 *     blant plassene hun ikke er opptatt i fra før.
 *
 * Dette er bevisst ikke en fullstendig løser – den fjerner de fleste
 * kollisjonene, ikke alle. Resten fanges av `finnPlasskonflikter` og vises som
 * varsel, slik at møtelederen kan flytte manuelt.
 */
const fordelUtenPlasskonflikter = (
  fordelinger: ArbeidsgiverIntervjufordelingDTO[],
  låsteArbeidsgiverTreffIder: Set<string>,
): ArbeidsgiverIntervjufordelingDTO[] => {
  const opptattePlasserPerPerson = new Map<string, Set<number>>();
  const merkOpptatt = (personTreffId: string, plass: number) => {
    const opptatte =
      opptattePlasserPerPerson.get(personTreffId) ?? new Set<number>();
    opptatte.add(plass);
    opptattePlasserPerPerson.set(personTreffId, opptatte);
  };

  const erLåst = (fordeling: ArbeidsgiverIntervjufordelingDTO) =>
    låsteArbeidsgiverTreffIder.has(fordeling.arbeidsgiverTreffId);

  // Låste fordelinger har møtelederen bestemt selv. De legger beslag på
  // plassene sine, men blir ikke rørt.
  fordelinger
    .filter(erLåst)
    .forEach((fordeling) =>
      fordeling.inkludertePersonTreffIder.forEach(merkOpptatt),
    );

  // Regel 1. Rekkefølgen avgjør bare hvem som får førsteretten på en plass –
  // resultatet leveres tilbake i opprinnelig arbeidsgiverrekkefølge.
  const fordelt = new Map<string, ArbeidsgiverIntervjufordelingDTO>();
  fordelinger
    .map((fordeling, opprinneligIndeks) => ({ fordeling, opprinneligIndeks }))
    .filter(({ fordeling }) => !erLåst(fordeling))
    .sort(
      (venstre, høyre) =>
        venstre.fordeling.inkludertePersonTreffIder.length -
          høyre.fordeling.inkludertePersonTreffIder.length ||
        venstre.opprinneligIndeks - høyre.opprinneligIndeks,
    )
    .forEach(({ fordeling }) => {
      const personer = fordeling.inkludertePersonTreffIder;
      const ledigePlasser = new Set(personer.map((_, plass) => plass));
      const nyRekkefølge: string[] = [];

      // Regel 2. Det er alltid minst én ledig plass her, siden lista har like
      // mange plasser som personer og hver person tar nøyaktig én.
      personer.forEach((personTreffId, dagensPlass) => {
        const opptatte = opptattePlasserPerPerson.get(personTreffId);
        const nærmesteFørst = [...ledigePlasser].sort(
          (venstre, høyre) =>
            avstandTilPlass(venstre, dagensPlass) -
              avstandTilPlass(høyre, dagensPlass) || venstre - høyre,
        );
        const plass =
          nærmesteFørst.find((kandidat) => !opptatte?.has(kandidat)) ??
          nærmesteFørst[0];

        ledigePlasser.delete(plass);
        nyRekkefølge[plass] = personTreffId;
        merkOpptatt(personTreffId, plass);
      });

      fordelt.set(fordeling.arbeidsgiverTreffId, {
        ...fordeling,
        inkludertePersonTreffIder: nyRekkefølge,
      });
    });

  return fordelinger.map(
    (fordeling) => fordelt.get(fordeling.arbeidsgiverTreffId) ?? fordeling,
  );
};

/**
 * Bygger den fordelingen grensesnittet skal vise, ut fra ønskene og det som
 * eventuelt er lagret fra før.
 *
 * «Normaliser» betyr her å gjøre lagrede data og ferske ønsker enige med
 * hverandre. Ønskene endrer seg mens møtedagen pågår – arbeidsgivere legger
 * til og trekker tilbake – mens den lagrede fordelingen er et øyeblikksbilde
 * fra sist møtelederen rørte den. Funksjonen tar begge og lager én liste per
 * arbeidsgiver som stemmer med dagens ønsker.
 *
 * Fire regler:
 *
 * 1. **Ønskene bestemmer hvem som er med.** Er ønsket trukket tilbake, faller
 *    personen ut av både inkludert og ekskludert.
 * 2. **Lagret rekkefølge vinner.** Har møtelederen flyttet noen, beholdes det.
 * 3. **Nye ønsker legges sist blant de inkluderte**, i samme rekkefølge som
 *    jobbsøkerlista – slik at de er lette å finne igjen.
 * 4. **Til slutt fordeles plassene** for å unngå kollisjoner, men bare for
 *    arbeidsgivere som ikke er låst.
 *
 * Funksjonen er ren og idempotent: samme input gir samme output, og å kjøre
 * den på sitt eget resultat endrer ingenting. Derfor kan den kalles på nytt
 * ved hver oppdatering fra serveren uten å flytte på noe uventet.
 */
export const normaliserIntervjufordelinger = ({
  arbeidsgiverTreffIder,
  personTreffIderIRekkefølge,
  ønsker,
  intervjufordelinger,
}: NormaliserIntervjufordelingerInput): ArbeidsgiverIntervjufordelingDTO[] => {
  const fordelinger = arbeidsgiverTreffIder.map((arbeidsgiverTreffId) => {
    const ønskedePersonTreffIder = new Set(
      ønsker
        .filter((ønske) => ønske.arbeidsgiverTreffId === arbeidsgiverTreffId)
        .map((ønske) => ønske.personTreffId),
    );
    // Regel 3: jobbsøkerlista gir rekkefølgen. Ønsker om personer som ikke står
    // i lista (for eksempel nettopp fjernet) legges bakerst, så de ikke
    // forsvinner stille.
    const ønskedeIRekkefølge = unike([
      ...personTreffIderIRekkefølge.filter((personTreffId) =>
        ønskedePersonTreffIder.has(personTreffId),
      ),
      ...ønsker
        .filter((ønske) => ønske.arbeidsgiverTreffId === arbeidsgiverTreffId)
        .map((ønske) => ønske.personTreffId),
    ]);
    const lagret = intervjufordelinger.find(
      (fordeling) => fordeling.arbeidsgiverTreffId === arbeidsgiverTreffId,
    );
    // Regel 1 og 2: behold lagret rekkefølge, men luk ut alle som ikke lenger
    // er ønsket.
    const inkludertePersonTreffIder = unike(
      lagret?.inkludertePersonTreffIder ?? [],
    ).filter((personTreffId) => ønskedePersonTreffIder.has(personTreffId));
    const inkluderte = new Set(inkludertePersonTreffIder);
    // Skulle en person ha havnet i begge lister, vinner inkludert.
    const ekskludertePersonTreffIder = unike(
      lagret?.ekskludertePersonTreffIder ?? [],
    ).filter(
      (personTreffId) =>
        ønskedePersonTreffIder.has(personTreffId) &&
        !inkluderte.has(personTreffId),
    );
    const fordelte = new Set([
      ...inkludertePersonTreffIder,
      ...ekskludertePersonTreffIder,
    ]);

    return {
      arbeidsgiverTreffId,
      inkludertePersonTreffIder: [
        ...inkludertePersonTreffIder,
        // Regel 3: ønsker vi ikke har sett før havner sist blant de inkluderte.
        ...ønskedeIRekkefølge.filter(
          (personTreffId) => !fordelte.has(personTreffId),
        ),
      ],
      ekskludertePersonTreffIder,
    };
  });
  // Alt som lå lagret er møtelederens verk, og skal ikke omfordeles.
  const låsteArbeidsgiverTreffIder = new Set(
    intervjufordelinger.map((fordeling) => fordeling.arbeidsgiverTreffId),
  );

  // Regel 4.
  return fordelUtenPlasskonflikter(fordelinger, låsteArbeidsgiverTreffIder);
};

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
