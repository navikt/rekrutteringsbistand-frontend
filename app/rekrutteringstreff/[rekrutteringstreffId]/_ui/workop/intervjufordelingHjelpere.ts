import type {
  ArbeidsgiverIntervjufordelingDTO,
  ØnskeDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';

export type Fordelingsseksjon = 'inkludert' | 'ekskludert';

interface NormaliserIntervjufordelingerInput {
  arbeidsgiverTreffIder: string[];
  personTreffIderIRekkefølge: string[];
  ønsker: ØnskeDTO[];
  intervjufordelinger: ArbeidsgiverIntervjufordelingDTO[];
}

export interface Plasskonflikt {
  personTreffId: string;
  plass: number;
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
    const inkludertePersonTreffIder = unike(
      lagret?.inkludertePersonTreffIder ?? [],
    ).filter((personTreffId) => ønskedePersonTreffIder.has(personTreffId));
    const inkluderte = new Set(inkludertePersonTreffIder);
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
        ...ønskedeIRekkefølge.filter(
          (personTreffId) => !fordelte.has(personTreffId),
        ),
      ],
      ekskludertePersonTreffIder,
    };
  });
  const låsteArbeidsgiverTreffIder = new Set(
    intervjufordelinger.map((fordeling) => fordeling.arbeidsgiverTreffId),
  );

  return fordelUtenPlasskonflikter(fordelinger, låsteArbeidsgiverTreffIder);
};

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

  return flyttPersonTilIndeks(
    fordeling,
    personTreffId,
    seksjon,
    retning === 'opp' ? indeks - 1 : indeks + 2,
  );
};

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
