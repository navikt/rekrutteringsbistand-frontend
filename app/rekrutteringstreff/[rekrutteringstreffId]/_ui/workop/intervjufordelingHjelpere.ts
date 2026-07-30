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
 * Fordeler personene på plasser per arbeidsgiver.
 *
 * Vi forsøker å unngå at samme person får samme plassnummer hos flere
 * arbeidsgivere, men dette er bevisst ikke en fullstendig løser: gjenstående
 * kollisjoner plukkes opp av `finnPlasskonflikter` og vises som varsel i
 * grensesnittet, slik at møtelederen kan flytte manuelt.
 */
const fordelUtenPlasskonflikter = (
  fordelinger: ArbeidsgiverIntervjufordelingDTO[],
  låsteArbeidsgiverTreffIder: Set<string>,
): ArbeidsgiverIntervjufordelingDTO[] => {
  const bruktePlasserPerPerson = new Map<string, Set<number>>();
  const merkPlassSomBrukt = (personTreffId: string, plass: number) => {
    const brukte =
      bruktePlasserPerPerson.get(personTreffId) ?? new Set<number>();
    brukte.add(plass);
    bruktePlasserPerPerson.set(personTreffId, brukte);
  };

  const erLåst = (fordeling: ArbeidsgiverIntervjufordelingDTO) =>
    låsteArbeidsgiverTreffIder.has(fordeling.arbeidsgiverTreffId);

  fordelinger
    .filter(erLåst)
    .forEach((fordeling) =>
      fordeling.inkludertePersonTreffIder.forEach(merkPlassSomBrukt),
    );

  const antallArbeidsgiverePerPerson = new Map<string, number>();
  fordelinger
    .filter((fordeling) => !erLåst(fordeling))
    .forEach((fordeling) =>
      fordeling.inkludertePersonTreffIder.forEach((personTreffId) =>
        antallArbeidsgiverePerPerson.set(
          personTreffId,
          (antallArbeidsgiverePerPerson.get(personTreffId) ?? 0) + 1,
        ),
      ),
    );

  // Arbeidsgivere med færrest plasser har minst å gå på, og fordeles først.
  // Rekkefølgen påvirker bare hvem som får «førsteretten» på en plass –
  // resultatet leveres tilbake i opprinnelig arbeidsgiverrekkefølge.
  const fordelt = new Map<string, ArbeidsgiverIntervjufordelingDTO>();
  const arbeidsgivereIBehandlingsrekkefølge = fordelinger
    .map((fordeling, opprinneligIndeks) => ({ fordeling, opprinneligIndeks }))
    .filter(({ fordeling }) => !erLåst(fordeling))
    .sort(
      (venstre, høyre) =>
        venstre.fordeling.inkludertePersonTreffIder.length -
          høyre.fordeling.inkludertePersonTreffIder.length ||
        venstre.opprinneligIndeks - høyre.opprinneligIndeks,
    );

  arbeidsgivereIBehandlingsrekkefølge.forEach(({ fordeling }) => {
    const personer = fordeling.inkludertePersonTreffIder;
    const ledigePlasser = new Set(personer.map((_, plass) => plass));
    // Personer som flere arbeidsgivere vil snakke med har minst handlingsrom,
    // og plasseres derfor først.
    const behandlingsrekkefølge = personer
      .map((personTreffId, foretrukketPlass) => ({
        personTreffId,
        foretrukketPlass,
      }))
      .sort(
        (venstre, høyre) =>
          (antallArbeidsgiverePerPerson.get(høyre.personTreffId) ?? 0) -
            (antallArbeidsgiverePerPerson.get(venstre.personTreffId) ?? 0) ||
          venstre.foretrukketPlass - høyre.foretrukketPlass,
      );

    const plassPerPerson = new Map<string, number>();
    behandlingsrekkefølge.forEach(({ personTreffId, foretrukketPlass }) => {
      const brukteForPerson = bruktePlasserPerPerson.get(personTreffId);
      const kandidater = [...ledigePlasser].sort(
        (venstre, høyre) =>
          avstandTilPlass(venstre, foretrukketPlass) -
            avstandTilPlass(høyre, foretrukketPlass) || venstre - høyre,
      );
      const plass =
        kandidater.find((kandidat) => !brukteForPerson?.has(kandidat)) ??
        kandidater[0];
      if (plass === undefined) return;

      ledigePlasser.delete(plass);
      plassPerPerson.set(personTreffId, plass);
      merkPlassSomBrukt(personTreffId, plass);
    });

    fordelt.set(fordeling.arbeidsgiverTreffId, {
      ...fordeling,
      inkludertePersonTreffIder: [...personer].sort(
        (venstre, høyre) =>
          (plassPerPerson.get(venstre) ?? 0) - (plassPerPerson.get(høyre) ?? 0),
      ),
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
  const arbeidsgiverePerPersonOgPlass = new Map<string, Set<string>>();

  intervjufordelinger.forEach((fordeling) => {
    fordeling.inkludertePersonTreffIder.forEach(
      (personTreffId, plassIndeks) => {
        const nøkkel = `${personTreffId}:${plassIndeks}`;
        const arbeidsgiverTreffIder =
          arbeidsgiverePerPersonOgPlass.get(nøkkel) ?? new Set<string>();
        arbeidsgiverTreffIder.add(fordeling.arbeidsgiverTreffId);
        arbeidsgiverePerPersonOgPlass.set(nøkkel, arbeidsgiverTreffIder);
      },
    );
  });

  return [...arbeidsgiverePerPersonOgPlass.entries()]
    .filter(([, arbeidsgiverTreffIder]) => arbeidsgiverTreffIder.size > 1)
    .map(([nøkkel, arbeidsgiverTreffIder]) => {
      const sisteKolon = nøkkel.lastIndexOf(':');
      return {
        personTreffId: nøkkel.slice(0, sisteKolon),
        plass: Number(nøkkel.slice(sisteKolon + 1)) + 1,
        arbeidsgiverTreffIder: [...arbeidsgiverTreffIder],
      };
    });
};
