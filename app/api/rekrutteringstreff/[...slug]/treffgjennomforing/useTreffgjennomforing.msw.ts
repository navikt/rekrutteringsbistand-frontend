import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { mockHentArbeidsgivereForTreff } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/arbeidsgivereMockBackend';
import {
  fordelIntervjuerForenklet,
  fordelJobbsøkerePåRom,
  harRegistreringer,
  lagArbeidsgiverRotasjon,
  oppdaterRomEtterOppmøte,
  tellRegistreringer,
  tildelDeltakernummer,
  toggleOppmøte,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomforing/treffgjennomforingHjelpere';
import {
  ArbeidsgiverIntervjufordelingSchema,
  harRegistrertNoe,
  MøteoppsettSchema,
  RomfordelingSchema,
  VurderingSchema,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomforing/useTreffgjennomforing';
import type {
  ArbeidsgiverIntervjufordelingDTO,
  TreffgjennomforingDTO,
  TreffgjennomforingFase,
  InteresseDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomforing/useTreffgjennomforing';
import { byggMswScopeKey } from '@/app/api/rekrutteringstreff/mswScope';
import { treffgjennomforingStore } from '@/app/api/rekrutteringstreff/mswState';
import { getMock, postMock, putMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';
import { z } from 'zod';

const LES_STI = `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/treffgjennomforing-og-oppfolging`;
const MOTEDAG_STI = `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/treffgjennomforing`;
const OPPFOLGING_STI = `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/oppfolging`;

const WORKOP_TREFF_ID = 'workop';
const STANDARD_STARTTIDSPUNKT = '10:00';
const STANDARD_VARIGHET_MINUTTER = 10;
const ANTALL_FREMMØTTE = 20;

const lagFremmøttePersonTreffIder = () =>
  Array.from(
    { length: ANTALL_FREMMØTTE },
    (_, indeks) => `mock-js-${String(indeks + 1).padStart(3, '0')}`,
  );

const lagTreffgjennomforingStartdata = (
  rekrutteringstreffId: string,
  antallArbeidsgivere: number,
): TreffgjennomforingDTO => {
  const fremmøtte =
    rekrutteringstreffId === WORKOP_TREFF_ID
      ? lagFremmøttePersonTreffIder()
      : [];

  return {
    rekrutteringstreffId,
    fase: 'OPPMØTE',
    antallRom: Math.max(antallArbeidsgivere, 1),
    starttidspunkt: STANDARD_STARTTIDSPUNKT,
    varighetPerMøteMinutter: STANDARD_VARIGHET_MINUTTER,
    oppmøte: fremmøtte,
    // De fremmøtte har allerede fått utdelt kort i døra, i den rekkefølgen de
    // kom.
    deltakernummer: fremmøtte.map((personTreffId, indeks) => ({
      personTreffId,
      nummer: indeks + 1,
    })),
    rom: [],
    arbeidsgiverRekkefølge: [],
    interesser: [],
    intervjufordelinger: [],
    vurderinger: [],
  };
};

const FASE_REKKEFØLGE: TreffgjennomforingFase[] = [
  'OPPMØTE',
  'ROM',
  'INTERESSE',
  'FORDELING',
  'VURDERING',
];

const senesteFase = (
  nåværende: TreffgjennomforingFase,
  minst: TreffgjennomforingFase,
): TreffgjennomforingFase =>
  FASE_REKKEFØLGE.indexOf(nåværende) >= FASE_REKKEFØLGE.indexOf(minst)
    ? nåværende
    : minst;

const arbeidsgiverIderForTreff = (
  request: Request,
  treffId: string,
): string[] =>
  mockHentArbeidsgivereForTreff(request, treffId)
    .map((arbeidsgiver) => arbeidsgiver.arbeidsgiverTreffId)
    .filter((id): id is string => Boolean(id));

type Intervjupar = Pick<InteresseDTO, 'personTreffId' | 'arbeidsgiverTreffId'>;

const erSammePar = (venstre: Intervjupar, høyre: Intervjupar) =>
  venstre.personTreffId === høyre.personTreffId &&
  venstre.arbeidsgiverTreffId === høyre.arbeidsgiverTreffId;

const oppdaterPar = <T extends Intervjupar>(
  par: T[],
  nyttPar: T,
  valgt: boolean,
): T[] => {
  if (valgt) {
    return par.some((eksisterendePar) => erSammePar(eksisterendePar, nyttPar))
      ? par
      : [...par, nyttPar];
  }

  return par.filter((eksisterendePar) => !erSammePar(eksisterendePar, nyttPar));
};

const fjernPersonFraIntervjufordelinger = (
  intervjufordelinger: ArbeidsgiverIntervjufordelingDTO[],
  personTreffId: string,
  arbeidsgiverTreffId?: string,
): ArbeidsgiverIntervjufordelingDTO[] =>
  intervjufordelinger.map((fordeling) =>
    arbeidsgiverTreffId && fordeling.arbeidsgiverTreffId !== arbeidsgiverTreffId
      ? fordeling
      : {
          ...fordeling,
          inkludertePersonTreffIder: fordeling.inkludertePersonTreffIder.filter(
            (id) => id !== personTreffId,
          ),
          ekskludertePersonTreffIder:
            fordeling.ekskludertePersonTreffIder.filter(
              (id) => id !== personTreffId,
            ),
        },
  );

/**
 * Legger et nytt ønske bakerst blant de inkluderte hos arbeidsgiveren.
 */
const leggTilPersonSistInkludert = (
  intervjufordelinger: ArbeidsgiverIntervjufordelingDTO[],
  personTreffId: string,
  arbeidsgiverTreffId: string,
): ArbeidsgiverIntervjufordelingDTO[] =>
  intervjufordelinger.map((fordeling) =>
    fordeling.arbeidsgiverTreffId !== arbeidsgiverTreffId ||
    fordeling.inkludertePersonTreffIder.includes(personTreffId) ||
    fordeling.ekskludertePersonTreffIder.includes(personTreffId)
      ? fordeling
      : {
          ...fordeling,
          inkludertePersonTreffIder: [
            ...fordeling.inkludertePersonTreffIder,
            personTreffId,
          ],
        },
  );

const validerPar = (
  request: Request,
  treffId: string,
  treffgjennomforing: TreffgjennomforingDTO,
  par: Intervjupar,
) => {
  if (!par.personTreffId || !par.arbeidsgiverTreffId) {
    return HttpResponse.json({ feil: 'Ugyldig intervjupar.' }, { status: 400 });
  }
  if (!treffgjennomforing.oppmøte.includes(par.personTreffId)) {
    return HttpResponse.json(
      { feil: 'Jobbsøkeren er ikke registrert som møtt.' },
      { status: 409 },
    );
  }
  if (
    !arbeidsgiverIderForTreff(request, treffId).includes(
      par.arbeidsgiverTreffId,
    )
  ) {
    return HttpResponse.json(
      { feil: 'Arbeidsgiveren deltar ikke på treffet.' },
      { status: 409 },
    );
  }

  return null;
};

const hentTreffgjennomforing = (
  request: Request,
  treffId: string,
): TreffgjennomforingDTO =>
  treffgjennomforingStore.get(byggMswScopeKey(request, treffId)) ??
  lagTreffgjennomforingStartdata(
    treffId,
    arbeidsgiverIderForTreff(request, treffId).length,
  );

const lagre = (
  request: Request,
  treffId: string,
  treffgjennomforing: TreffgjennomforingDTO,
): TreffgjennomforingDTO => {
  treffgjennomforingStore.set(
    byggMswScopeKey(request, treffId),
    treffgjennomforing,
  );
  return treffgjennomforing;
};

export const treffgjennomforingMSWHandler = getMock(
  LES_STI,
  ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    return HttpResponse.json(hentTreffgjennomforing(request, treffId));
  },
);

export const oppmøteMSWHandler = putMock(
  `${MOTEDAG_STI}/oppmote`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const body = (await request.json()) as {
      personTreffId?: string;
      møtt?: boolean;
      bekreftSlettRegistreringer?: boolean;
    };
    const treffgjennomforing = hentTreffgjennomforing(request, treffId);
    const personTreffId = body.personTreffId;
    if (!personTreffId) return HttpResponse.json(treffgjennomforing);

    const oppmøte =
      typeof body.møtt === 'boolean'
        ? body.møtt
          ? Array.from(new Set([...treffgjennomforing.oppmøte, personTreffId]))
          : treffgjennomforing.oppmøte.filter((id) => id !== personTreffId)
        : toggleOppmøte(treffgjennomforing.oppmøte, personTreffId);

    const registreringer = tellRegistreringer(
      treffgjennomforing,
      personTreffId,
    );
    if (
      !oppmøte.includes(personTreffId) &&
      harRegistreringer(registreringer) &&
      body.bekreftSlettRegistreringer !== true
    ) {
      return HttpResponse.json(
        {
          feil: 'Jobbsøkeren har registreringer som slettes hvis oppmøtet fjernes.',
          hint: 'Bekreft med bekreftSlettRegistreringer=true.',
          registreringer,
        },
        { status: 409 },
      );
    }

    const rom =
      treffgjennomforing.rom.length > 0
        ? oppdaterRomEtterOppmøte(treffgjennomforing.rom, oppmøte)
        : treffgjennomforing.rom;
    const interesser = treffgjennomforing.interesser.filter((interesse) =>
      oppmøte.includes(interesse.personTreffId),
    );
    const intervjufordelinger = treffgjennomforing.intervjufordelinger.map(
      (fordeling) => ({
        ...fordeling,
        inkludertePersonTreffIder: fordeling.inkludertePersonTreffIder.filter(
          (personTreffId) => oppmøte.includes(personTreffId),
        ),
        ekskludertePersonTreffIder: fordeling.ekskludertePersonTreffIder.filter(
          (personTreffId) => oppmøte.includes(personTreffId),
        ),
      }),
    );
    const vurderinger = treffgjennomforing.vurderinger.filter((vurdering) =>
      oppmøte.includes(vurdering.personTreffId),
    );

    return HttpResponse.json(
      lagre(request, treffId, {
        ...treffgjennomforing,
        oppmøte,
        deltakernummer:
          treffId === WORKOP_TREFF_ID && oppmøte.includes(personTreffId)
            ? tildelDeltakernummer(
                treffgjennomforing.deltakernummer,
                personTreffId,
              )
            : treffgjennomforing.deltakernummer,
        rom,
        interesser,
        intervjufordelinger,
        vurderinger,
      }),
    );
  },
);

export const møteoppsettMSWHandler = putMock(
  `${MOTEDAG_STI}/moteoppsett`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const resultat = MøteoppsettSchema.safeParse(await request.json());
    const treffgjennomforing = hentTreffgjennomforing(request, treffId);

    if (!resultat.success) {
      return HttpResponse.json(
        { feil: 'Ugyldig møteoppsett.' },
        { status: 400 },
      );
    }

    if (treffgjennomforing.rom.length > 0) {
      return HttpResponse.json(
        lagre(request, treffId, {
          ...treffgjennomforing,
          starttidspunkt: resultat.data.starttidspunkt,
          varighetPerMøteMinutter: resultat.data.varighetPerMøteMinutter,
        }),
      );
    }

    const rom = fordelJobbsøkerePåRom(
      treffgjennomforing.oppmøte,
      treffgjennomforing.antallRom,
    );
    const arbeidsgiverRekkefølge = lagArbeidsgiverRotasjon(
      arbeidsgiverIderForTreff(request, treffId),
    );

    return HttpResponse.json(
      lagre(request, treffId, {
        ...treffgjennomforing,
        ...resultat.data,
        rom,
        arbeidsgiverRekkefølge,
        fase: senesteFase(treffgjennomforing.fase, 'ROM'),
      }),
    );
  },
);

const OppdaterRomfordelingSchema = z.object({
  rom: RomfordelingSchema,
});

export const romfordelingMSWHandler = putMock(
  `${MOTEDAG_STI}/romfordeling`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const treffgjennomforing = hentTreffgjennomforing(request, treffId);
    const resultat = OppdaterRomfordelingSchema.safeParse(await request.json());

    if (!resultat.success) {
      return HttpResponse.json(
        { feil: 'Ugyldig romfordeling.' },
        { status: 400 },
      );
    }

    const romnumre = resultat.data.rom.map(({ romnummer }) => romnummer);
    const gyldigeRomnumre =
      romnumre.length === treffgjennomforing.antallRom &&
      new Set(romnumre).size === treffgjennomforing.antallRom &&
      romnumre.every(
        (romnummer) =>
          Number.isInteger(romnummer) &&
          romnummer >= 1 &&
          romnummer <= treffgjennomforing.antallRom,
      );
    const forventedeJobbsøkere = [...treffgjennomforing.oppmøte].sort();
    const mottatteJobbsøkere = resultat.data.rom
      .flatMap(({ jobbsøkere }) => jobbsøkere)
      .sort();
    const gyldigeJobbsøkere =
      mottatteJobbsøkere.length === forventedeJobbsøkere.length &&
      new Set(mottatteJobbsøkere).size === mottatteJobbsøkere.length &&
      mottatteJobbsøkere.every(
        (personTreffId, indeks) =>
          personTreffId === forventedeJobbsøkere[indeks],
      );

    if (!gyldigeRomnumre || !gyldigeJobbsøkere) {
      return HttpResponse.json(
        {
          feil: 'Romfordelingen må inneholde alle fremmøtte én gang i et gyldig rom.',
        },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      lagre(request, treffId, {
        ...treffgjennomforing,
        rom: resultat.data.rom,
      }),
    );
  },
);

export const ønskerMSWHandler = putMock(
  `${MOTEDAG_STI}/interesse`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const body = (await request.json()) as InteresseDTO & {
      interessert?: boolean;
    };
    const treffgjennomforing = hentTreffgjennomforing(request, treffId);
    const par = {
      personTreffId: body.personTreffId,
      arbeidsgiverTreffId: body.arbeidsgiverTreffId,
    };
    const valideringsfeil = validerPar(
      request,
      treffId,
      treffgjennomforing,
      par,
    );
    if (valideringsfeil) return valideringsfeil;

    const interesser = oppdaterPar(
      treffgjennomforing.interesser,
      par,
      body.interessert === true,
    );
    const intervjufordelinger = body.interessert
      ? leggTilPersonSistInkludert(
          treffgjennomforing.intervjufordelinger,
          par.personTreffId,
          par.arbeidsgiverTreffId,
        )
      : fjernPersonFraIntervjufordelinger(
          treffgjennomforing.intervjufordelinger,
          par.personTreffId,
          par.arbeidsgiverTreffId,
        );
    return HttpResponse.json(
      lagre(request, treffId, {
        ...treffgjennomforing,
        interesser,
        intervjufordelinger,
        fase: senesteFase(treffgjennomforing.fase, 'INTERESSE'),
      }),
    );
  },
);

export const intervjufordelingMSWHandler = putMock(
  `${MOTEDAG_STI}/intervjufordeling`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const resultat = ArbeidsgiverIntervjufordelingSchema.safeParse(
      await request.json(),
    );
    if (!resultat.success) {
      return HttpResponse.json(
        { feil: 'Ugyldig intervjufordeling.' },
        { status: 400 },
      );
    }

    const fordeling = resultat.data;
    const treffgjennomforing = hentTreffgjennomforing(request, treffId);
    if (
      !arbeidsgiverIderForTreff(request, treffId).includes(
        fordeling.arbeidsgiverTreffId,
      )
    ) {
      return HttpResponse.json(
        { feil: 'Arbeidsgiveren deltar ikke på treffet.' },
        { status: 409 },
      );
    }

    const ønskedePersonTreffIder = treffgjennomforing.interesser
      .filter(
        (interesse) =>
          interesse.arbeidsgiverTreffId === fordeling.arbeidsgiverTreffId,
      )
      .map((interesse) => interesse.personTreffId);
    const fordeltePersonTreffIder = [
      ...fordeling.inkludertePersonTreffIder,
      ...fordeling.ekskludertePersonTreffIder,
    ];
    if (
      ønskedePersonTreffIder.length !== fordeltePersonTreffIder.length ||
      ønskedePersonTreffIder.some(
        (personTreffId) => !fordeltePersonTreffIder.includes(personTreffId),
      )
    ) {
      return HttpResponse.json(
        { feil: 'Fordelingen må inneholde alle registrerte ønsker.' },
        { status: 409 },
      );
    }
    if (
      fordeltePersonTreffIder.some(
        (personTreffId) => !treffgjennomforing.oppmøte.includes(personTreffId),
      )
    ) {
      return HttpResponse.json(
        { feil: 'Fordelingen inneholder en jobbsøker uten oppmøte.' },
        { status: 409 },
      );
    }

    const intervjufordelinger = [
      ...treffgjennomforing.intervjufordelinger.filter(
        (eksisterendeFordeling) =>
          eksisterendeFordeling.arbeidsgiverTreffId !==
          fordeling.arbeidsgiverTreffId,
      ),
      fordeling,
    ];
    return HttpResponse.json(
      lagre(request, treffId, {
        ...treffgjennomforing,
        intervjufordelinger,
        fase: senesteFase(treffgjennomforing.fase, 'FORDELING'),
      }),
    );
  },
);

export const fordelIntervjuerMSWHandler = postMock(
  `${MOTEDAG_STI}/intervjufordeling/fordel`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const treffgjennomforing = hentTreffgjennomforing(request, treffId);
    const intervjufordelinger = fordelIntervjuerForenklet(
      treffgjennomforing,
      arbeidsgiverIderForTreff(request, treffId),
    ).filter((fordeling) =>
      Boolean(
        fordeling.inkludertePersonTreffIder.length ||
        fordeling.ekskludertePersonTreffIder.length,
      ),
    );

    return HttpResponse.json(
      lagre(request, treffId, {
        ...treffgjennomforing,
        intervjufordelinger,
        fase: senesteFase(treffgjennomforing.fase, 'FORDELING'),
      }),
    );
  },
);

export const vurderingerMSWHandler = putMock(
  `${OPPFOLGING_STI}/vurderinger`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const resultat = VurderingSchema.safeParse(await request.json());
    if (!resultat.success) {
      return HttpResponse.json({ feil: 'Ugyldig vurdering.' }, { status: 400 });
    }

    const treffgjennomforing = hentTreffgjennomforing(request, treffId);
    const vurdering = resultat.data;
    const valideringsfeil = validerPar(
      request,
      treffId,
      treffgjennomforing,
      vurdering,
    );
    if (valideringsfeil) return valideringsfeil;

    const andreVurderinger = treffgjennomforing.vurderinger.filter(
      (eksisterendeVurdering) => !erSammePar(eksisterendeVurdering, vurdering),
    );
    const vurderinger = harRegistrertNoe(vurdering)
      ? [...andreVurderinger, vurdering]
      : andreVurderinger;

    return HttpResponse.json(
      lagre(request, treffId, {
        ...treffgjennomforing,
        vurderinger,
        fase: senesteFase(treffgjennomforing.fase, 'VURDERING'),
      }),
    );
  },
);
