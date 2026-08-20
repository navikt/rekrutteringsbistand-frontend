import type { ArbeidsgiverIntervjufordelingDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';

/** Hvilken side av sperrelinja en person står på. */
export type Fordelingsseksjon = 'inkludert' | 'ekskludert';

export interface Plasskonflikt {
  personTreffId: string;
  plass: number;
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

/**
 * Finner personer som står på samme plass hos flere arbeidsgivere, altså to
 * intervjuer i samme tidsluke.
 */
export const finnPlasskonflikter = (
  intervjufordelinger: ArbeidsgiverIntervjufordelingDTO[],
): Plasskonflikt[] => {
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
