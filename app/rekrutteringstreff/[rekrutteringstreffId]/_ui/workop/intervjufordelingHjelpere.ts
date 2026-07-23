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

interface IntervjuønskeMedPlass {
  arbeidsgiverTreffId: string;
  personTreffId: string;
  foretrukketPlass: number;
  antallPlasser: number;
  rekkefølge: number;
}

const fordelUtenPlasskonflikter = (
  fordelinger: ArbeidsgiverIntervjufordelingDTO[],
  låsteArbeidsgiverTreffIder: Set<string>,
) => {
  const bruktePlasserPerPerson = new Map<string, Set<number>>();
  const bruktePlasserPerArbeidsgiver = new Map<string, Set<number>>();

  fordelinger
    .filter((fordeling) =>
      låsteArbeidsgiverTreffIder.has(fordeling.arbeidsgiverTreffId),
    )
    .forEach((fordeling) => {
      fordeling.inkludertePersonTreffIder.forEach(
        (personTreffId, plassIndeks) => {
          const bruktePlasser =
            bruktePlasserPerPerson.get(personTreffId) ?? new Set<number>();
          bruktePlasser.add(plassIndeks);
          bruktePlasserPerPerson.set(personTreffId, bruktePlasser);
        },
      );
    });

  const ønskerMedPlass = fordelinger
    .filter(
      (fordeling) =>
        !låsteArbeidsgiverTreffIder.has(fordeling.arbeidsgiverTreffId),
    )
    .flatMap((fordeling) =>
      fordeling.inkludertePersonTreffIder.map(
        (personTreffId, foretrukketPlass) => ({
          arbeidsgiverTreffId: fordeling.arbeidsgiverTreffId,
          personTreffId,
          foretrukketPlass,
          antallPlasser: fordeling.inkludertePersonTreffIder.length,
        }),
      ),
    )
    .map((ønske, rekkefølge) => ({ ...ønske, rekkefølge }));
  const antallØnskerPerPerson = ønskerMedPlass.reduce((antall, ønske) => {
    antall.set(ønske.personTreffId, (antall.get(ønske.personTreffId) ?? 0) + 1);
    return antall;
  }, new Map<string, number>());
  const plassPerØnske = new Map<IntervjuønskeMedPlass, number>();

  const ledigePlasser = (ønske: IntervjuønskeMedPlass) => {
    const brukteHosArbeidsgiver =
      bruktePlasserPerArbeidsgiver.get(ønske.arbeidsgiverTreffId) ??
      new Set<number>();
    const brukteForPerson =
      bruktePlasserPerPerson.get(ønske.personTreffId) ?? new Set<number>();

    return Array.from({ length: ønske.antallPlasser }, (_, indeks) => indeks)
      .filter(
        (plass) =>
          !brukteHosArbeidsgiver.has(plass) && !brukteForPerson.has(plass),
      )
      .sort((venstre, høyre) => {
        if (venstre === ønske.foretrukketPlass) return -1;
        if (høyre === ønske.foretrukketPlass) return 1;
        return venstre - høyre;
      });
  };

  const finnKonfliktfriFordeling = (): boolean => {
    if (plassPerØnske.size === ønskerMedPlass.length) return true;

    const kandidater = ønskerMedPlass
      .filter((ønske) => !plassPerØnske.has(ønske))
      .map((ønske) => ({ ønske, ledige: ledigePlasser(ønske) }))
      .sort(
        (venstre, høyre) =>
          venstre.ledige.length - høyre.ledige.length ||
          (antallØnskerPerPerson.get(høyre.ønske.personTreffId) ?? 0) -
            (antallØnskerPerPerson.get(venstre.ønske.personTreffId) ?? 0) ||
          venstre.ønske.antallPlasser - høyre.ønske.antallPlasser ||
          venstre.ønske.rekkefølge - høyre.ønske.rekkefølge,
      );
    const neste = kandidater[0];
    if (!neste || neste.ledige.length === 0) return false;

    for (const plass of neste.ledige) {
      const brukteHosArbeidsgiver =
        bruktePlasserPerArbeidsgiver.get(neste.ønske.arbeidsgiverTreffId) ??
        new Set<number>();
      const brukteForPerson =
        bruktePlasserPerPerson.get(neste.ønske.personTreffId) ??
        new Set<number>();
      brukteHosArbeidsgiver.add(plass);
      brukteForPerson.add(plass);
      bruktePlasserPerArbeidsgiver.set(
        neste.ønske.arbeidsgiverTreffId,
        brukteHosArbeidsgiver,
      );
      bruktePlasserPerPerson.set(neste.ønske.personTreffId, brukteForPerson);
      plassPerØnske.set(neste.ønske, plass);

      if (finnKonfliktfriFordeling()) return true;

      plassPerØnske.delete(neste.ønske);
      brukteHosArbeidsgiver.delete(plass);
      brukteForPerson.delete(plass);
    }

    return false;
  };

  if (!finnKonfliktfriFordeling()) return fordelinger;

  return fordelinger.map((fordeling) => {
    if (låsteArbeidsgiverTreffIder.has(fordeling.arbeidsgiverTreffId)) {
      return fordeling;
    }

    const plassPerPerson = new Map(
      ønskerMedPlass
        .filter(
          (ønske) =>
            ønske.arbeidsgiverTreffId === fordeling.arbeidsgiverTreffId,
        )
        .map((ønske) => [ønske.personTreffId, plassPerØnske.get(ønske) ?? 0]),
    );

    return {
      ...fordeling,
      inkludertePersonTreffIder: [...fordeling.inkludertePersonTreffIder].sort(
        (venstre, høyre) =>
          (plassPerPerson.get(venstre) ?? 0) - (plassPerPerson.get(høyre) ?? 0),
      ),
    };
  });
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
