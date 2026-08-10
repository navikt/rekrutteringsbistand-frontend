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
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/møtedagHjelpere';
import {
  ArbeidsgiverIntervjufordelingSchema,
  harRegistrertNoe,
  MøteoppsettSchema,
  RomfordelingSchema,
  VurderingSchema,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import type {
  ArbeidsgiverIntervjufordelingDTO,
  MøtedagDTO,
  MøtedagFase,
  InteresseDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { byggMswScopeKey } from '@/app/api/rekrutteringstreff/mswScope';
import { møtedagStore } from '@/app/api/rekrutteringstreff/mswState';
import { getMock, postMock, putMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';
import { z } from 'zod';

const LES_STI = `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/motedag-og-oppfolging`;
const MOTEDAG_STI = `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/motedag`;
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

const lagMøtedagStartdata = (
  rekrutteringstreffId: string,
  antallArbeidsgivere: number,
): MøtedagDTO => {
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

const FASE_REKKEFØLGE: MøtedagFase[] = [
  'OPPMØTE',
  'ROM',
  'INTERESSE',
  'FORDELING',
  'VURDERING',
];

const senesteFase = (
  nåværende: MøtedagFase,
  minst: MøtedagFase,
): MøtedagFase =>
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
  møtedag: MøtedagDTO,
  par: Intervjupar,
) => {
  if (!par.personTreffId || !par.arbeidsgiverTreffId) {
    return HttpResponse.json({ feil: 'Ugyldig intervjupar.' }, { status: 400 });
  }
  if (!møtedag.oppmøte.includes(par.personTreffId)) {
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

const hentMøtedag = (request: Request, treffId: string): MøtedagDTO =>
  møtedagStore.get(byggMswScopeKey(request, treffId)) ??
  lagMøtedagStartdata(
    treffId,
    arbeidsgiverIderForTreff(request, treffId).length,
  );

const lagre = (
  request: Request,
  treffId: string,
  møtedag: MøtedagDTO,
): MøtedagDTO => {
  møtedagStore.set(byggMswScopeKey(request, treffId), møtedag);
  return møtedag;
};

export const møtedagMSWHandler = getMock(LES_STI, ({ params, request }) => {
  const treffId = params.rekrutteringstreffId as string;
  return HttpResponse.json(hentMøtedag(request, treffId));
});

export const oppmøteMSWHandler = putMock(
  `${MOTEDAG_STI}/oppmote`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const body = (await request.json()) as {
      personTreffId?: string;
      møtt?: boolean;
      bekreftSlettRegistreringer?: boolean;
    };
    const møtedag = hentMøtedag(request, treffId);
    const personTreffId = body.personTreffId;
    if (!personTreffId) return HttpResponse.json(møtedag);

    const oppmøte =
      typeof body.møtt === 'boolean'
        ? body.møtt
          ? Array.from(new Set([...møtedag.oppmøte, personTreffId]))
          : møtedag.oppmøte.filter((id) => id !== personTreffId)
        : toggleOppmøte(møtedag.oppmøte, personTreffId);

    const registreringer = tellRegistreringer(møtedag, personTreffId);
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
      møtedag.rom.length > 0
        ? oppdaterRomEtterOppmøte(møtedag.rom, oppmøte)
        : møtedag.rom;
    const interesser = møtedag.interesser.filter((interesse) =>
      oppmøte.includes(interesse.personTreffId),
    );
    const intervjufordelinger = møtedag.intervjufordelinger.map(
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
    const vurderinger = møtedag.vurderinger.filter((vurdering) =>
      oppmøte.includes(vurdering.personTreffId),
    );

    return HttpResponse.json(
      lagre(request, treffId, {
        ...møtedag,
        oppmøte,
        deltakernummer:
          treffId === WORKOP_TREFF_ID && oppmøte.includes(personTreffId)
            ? tildelDeltakernummer(møtedag.deltakernummer, personTreffId)
            : møtedag.deltakernummer,
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
    const møtedag = hentMøtedag(request, treffId);

    if (!resultat.success) {
      return HttpResponse.json(
        { feil: 'Ugyldig møteoppsett.' },
        { status: 400 },
      );
    }

    if (møtedag.rom.length > 0) {
      return HttpResponse.json(
        lagre(request, treffId, {
          ...møtedag,
          starttidspunkt: resultat.data.starttidspunkt,
          varighetPerMøteMinutter: resultat.data.varighetPerMøteMinutter,
        }),
      );
    }

    const rom = fordelJobbsøkerePåRom(møtedag.oppmøte, møtedag.antallRom);
    const arbeidsgiverRekkefølge = lagArbeidsgiverRotasjon(
      arbeidsgiverIderForTreff(request, treffId),
    );

    return HttpResponse.json(
      lagre(request, treffId, {
        ...møtedag,
        ...resultat.data,
        rom,
        arbeidsgiverRekkefølge,
        fase: senesteFase(møtedag.fase, 'ROM'),
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
    const møtedag = hentMøtedag(request, treffId);
    const resultat = OppdaterRomfordelingSchema.safeParse(await request.json());

    if (!resultat.success) {
      return HttpResponse.json(
        { feil: 'Ugyldig romfordeling.' },
        { status: 400 },
      );
    }

    const romnumre = resultat.data.rom.map(({ romnummer }) => romnummer);
    const gyldigeRomnumre =
      romnumre.length === møtedag.antallRom &&
      new Set(romnumre).size === møtedag.antallRom &&
      romnumre.every(
        (romnummer) =>
          Number.isInteger(romnummer) &&
          romnummer >= 1 &&
          romnummer <= møtedag.antallRom,
      );
    const forventedeJobbsøkere = [...møtedag.oppmøte].sort();
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
        ...møtedag,
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
    const møtedag = hentMøtedag(request, treffId);
    const par = {
      personTreffId: body.personTreffId,
      arbeidsgiverTreffId: body.arbeidsgiverTreffId,
    };
    const valideringsfeil = validerPar(request, treffId, møtedag, par);
    if (valideringsfeil) return valideringsfeil;

    const interesser = oppdaterPar(
      møtedag.interesser,
      par,
      body.interessert === true,
    );
    const intervjufordelinger = body.interessert
      ? leggTilPersonSistInkludert(
          møtedag.intervjufordelinger,
          par.personTreffId,
          par.arbeidsgiverTreffId,
        )
      : fjernPersonFraIntervjufordelinger(
          møtedag.intervjufordelinger,
          par.personTreffId,
          par.arbeidsgiverTreffId,
        );
    return HttpResponse.json(
      lagre(request, treffId, {
        ...møtedag,
        interesser,
        intervjufordelinger,
        fase: senesteFase(møtedag.fase, 'INTERESSE'),
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
    const møtedag = hentMøtedag(request, treffId);
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

    const ønskedePersonTreffIder = møtedag.interesser
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
        (personTreffId) => !møtedag.oppmøte.includes(personTreffId),
      )
    ) {
      return HttpResponse.json(
        { feil: 'Fordelingen inneholder en jobbsøker uten oppmøte.' },
        { status: 409 },
      );
    }

    const intervjufordelinger = [
      ...møtedag.intervjufordelinger.filter(
        (eksisterendeFordeling) =>
          eksisterendeFordeling.arbeidsgiverTreffId !==
          fordeling.arbeidsgiverTreffId,
      ),
      fordeling,
    ];
    return HttpResponse.json(
      lagre(request, treffId, {
        ...møtedag,
        intervjufordelinger,
        fase: senesteFase(møtedag.fase, 'FORDELING'),
      }),
    );
  },
);

export const fordelIntervjuerMSWHandler = postMock(
  `${MOTEDAG_STI}/intervjufordeling/fordel`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const møtedag = hentMøtedag(request, treffId);
    const intervjufordelinger = fordelIntervjuerForenklet(
      møtedag,
      arbeidsgiverIderForTreff(request, treffId),
    ).filter((fordeling) =>
      Boolean(
        fordeling.inkludertePersonTreffIder.length ||
        fordeling.ekskludertePersonTreffIder.length,
      ),
    );

    return HttpResponse.json(
      lagre(request, treffId, {
        ...møtedag,
        intervjufordelinger,
        fase: senesteFase(møtedag.fase, 'FORDELING'),
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

    const møtedag = hentMøtedag(request, treffId);
    const vurdering = resultat.data;
    const valideringsfeil = validerPar(request, treffId, møtedag, vurdering);
    if (valideringsfeil) return valideringsfeil;

    const andreVurderinger = møtedag.vurderinger.filter(
      (eksisterendeVurdering) => !erSammePar(eksisterendeVurdering, vurdering),
    );
    const vurderinger = harRegistrertNoe(vurdering)
      ? [...andreVurderinger, vurdering]
      : andreVurderinger;

    return HttpResponse.json(
      lagre(request, treffId, {
        ...møtedag,
        vurderinger,
        fase: senesteFase(møtedag.fase, 'VURDERING'),
      }),
    );
  },
);
