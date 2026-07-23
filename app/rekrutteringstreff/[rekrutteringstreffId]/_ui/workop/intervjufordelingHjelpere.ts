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

export const normaliserIntervjufordelinger = ({
  arbeidsgiverTreffIder,
  personTreffIderIRekkefølge,
  ønsker,
  intervjufordelinger,
}: NormaliserIntervjufordelingerInput): ArbeidsgiverIntervjufordelingDTO[] =>
  arbeidsgiverTreffIder.map((arbeidsgiverTreffId) => {
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

export const flyttPersonEttSteg = (
  fordeling: ArbeidsgiverIntervjufordelingDTO,
  personTreffId: string,
  retning: 'opp' | 'ned',
): ArbeidsgiverIntervjufordelingDTO => {
  const seksjon = finnSeksjon(fordeling, personTreffId);
  if (!seksjon) return fordeling;

  const indeks = listeForSeksjon(fordeling, seksjon).indexOf(personTreffId);
  return flyttPersonTilIndeks(
    fordeling,
    personTreffId,
    seksjon,
    retning === 'opp' ? indeks - 1 : indeks + 2,
  );
};

export const flyttPersonOverSperre = (
  fordeling: ArbeidsgiverIntervjufordelingDTO,
  personTreffId: string,
): ArbeidsgiverIntervjufordelingDTO => {
  const seksjon = finnSeksjon(fordeling, personTreffId);
  if (seksjon === 'inkludert') {
    return flyttPersonTilIndeks(fordeling, personTreffId, 'ekskludert', 0);
  }
  if (seksjon === 'ekskludert') {
    return flyttPersonTilIndeks(
      fordeling,
      personTreffId,
      'inkludert',
      fordeling.inkludertePersonTreffIder.length,
    );
  }
  return fordeling;
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
