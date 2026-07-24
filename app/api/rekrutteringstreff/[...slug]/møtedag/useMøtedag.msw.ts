import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { mockHentArbeidsgivereForTreff } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/arbeidsgivereMockBackend';
import {
  fordelJobbsøkerePåRom,
  lagArbeidsgiverRotasjon,
  oppdaterRomEtterOppmøte,
  toggleOppmøte,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/møtedagHjelpere';
import { lagMøtedagStartdata } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/møtedagStartdata';
import {
  ArbeidsgiverIntervjufordelingSchema,
  MøteoppsettSchema,
  RomfordelingSchema,
  VurderingSchema,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import type {
  ArbeidsgiverIntervjufordelingDTO,
  MøtedagDTO,
  MøtedagFase,
  ØnskeDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { byggMswScopeKey } from '@/app/api/rekrutteringstreff/mswScope';
import { møtedagStore } from '@/app/api/rekrutteringstreff/mswState';
import { getMock, putMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';
import { z } from 'zod';

const MOTEDAG_STI = `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/motedag`;

const FASE_REKKEFØLGE: MøtedagFase[] = [
  'OPPMØTE',
  'ROM',
  'ØNSKER',
  'FORDELING',
  'VURDERING',
];

// Møtedagen kan redigeres etter at forutsetningene finnes, men fasen (hvor langt
// man er kommet) skal ikke gå bakover når man justerer et tidligere steg.
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

type Intervjupar = Pick<ØnskeDTO, 'personTreffId' | 'arbeidsgiverTreffId'>;

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

const hentEllerSeed = (request: Request, treffId: string): MøtedagDTO => {
  const nøkkel = byggMswScopeKey(request, treffId);
  const eksisterende = møtedagStore.get(nøkkel);
  if (eksisterende) return eksisterende;

  const startdata = lagMøtedagStartdata(
    treffId,
    arbeidsgiverIderForTreff(request, treffId).length,
  );
  møtedagStore.set(nøkkel, startdata);
  return startdata;
};

const lagre = (
  request: Request,
  treffId: string,
  møtedag: MøtedagDTO,
): MøtedagDTO => {
  møtedagStore.set(byggMswScopeKey(request, treffId), møtedag);
  return møtedag;
};

export const møtedagMSWHandler = getMock(MOTEDAG_STI, ({ params, request }) => {
  const treffId = params.rekrutteringstreffId as string;
  return HttpResponse.json(hentEllerSeed(request, treffId));
});

export const oppmøteMSWHandler = putMock(
  `${MOTEDAG_STI}/oppmote`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const body = (await request.json()) as {
      personTreffId?: string;
      møtt?: boolean;
    };
    const møtedag = hentEllerSeed(request, treffId);
    const personTreffId = body.personTreffId;
    if (!personTreffId) return HttpResponse.json(møtedag);

    const oppmøte =
      typeof body.møtt === 'boolean'
        ? body.møtt
          ? Array.from(new Set([...møtedag.oppmøte, personTreffId]))
          : møtedag.oppmøte.filter((id) => id !== personTreffId)
        : toggleOppmøte(møtedag.oppmøte, personTreffId);

    const rom =
      møtedag.rom.length > 0
        ? oppdaterRomEtterOppmøte(møtedag.rom, oppmøte)
        : møtedag.rom;
    const ønsker = møtedag.ønsker.filter((ønske) =>
      oppmøte.includes(ønske.personTreffId),
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
        rom,
        ønsker,
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
    const møtedag = hentEllerSeed(request, treffId);

    if (!resultat.success) {
      return HttpResponse.json(
        { feil: 'Ugyldig møteoppsett. Det kan være maks 9 rom.' },
        { status: 400 },
      );
    }

    if (møtedag.rom.length > 0) {
      const erUendretOppsett =
        møtedag.antallRom === resultat.data.antallRom &&
        møtedag.starttidspunkt === resultat.data.starttidspunkt &&
        møtedag.varighetPerMøteMinutter ===
          resultat.data.varighetPerMøteMinutter &&
        møtedag.pauseMellomMøterMinutter ===
          resultat.data.pauseMellomMøterMinutter;

      if (erUendretOppsett) {
        return HttpResponse.json(møtedag);
      }

      return HttpResponse.json(
        {
          feil: 'Møteoppsettet er allerede opprettet og kan ikke overskrives.',
        },
        { status: 409 },
      );
    }

    const rom = fordelJobbsøkerePåRom(møtedag.oppmøte, resultat.data.antallRom);
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
    const møtedag = hentEllerSeed(request, treffId);
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
  `${MOTEDAG_STI}/onsker`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const body = (await request.json()) as ØnskeDTO & { ønsket?: boolean };
    const møtedag = hentEllerSeed(request, treffId);
    const par = {
      personTreffId: body.personTreffId,
      arbeidsgiverTreffId: body.arbeidsgiverTreffId,
    };
    const valideringsfeil = validerPar(request, treffId, møtedag, par);
    if (valideringsfeil) return valideringsfeil;

    const ønsker = oppdaterPar(møtedag.ønsker, par, body.ønsket === true);
    const intervjufordelinger = body.ønsket
      ? møtedag.intervjufordelinger
      : fjernPersonFraIntervjufordelinger(
          møtedag.intervjufordelinger,
          par.personTreffId,
          par.arbeidsgiverTreffId,
        );
    return HttpResponse.json(
      lagre(request, treffId, {
        ...møtedag,
        ønsker,
        intervjufordelinger,
        fase: senesteFase(møtedag.fase, 'ØNSKER'),
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
    const møtedag = hentEllerSeed(request, treffId);
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

    const ønskedePersonTreffIder = møtedag.ønsker
      .filter(
        (ønske) => ønske.arbeidsgiverTreffId === fordeling.arbeidsgiverTreffId,
      )
      .map((ønske) => ønske.personTreffId);
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

export const vurderingerMSWHandler = putMock(
  `${MOTEDAG_STI}/vurderinger`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const resultat = VurderingSchema.safeParse(await request.json());
    if (!resultat.success) {
      return HttpResponse.json({ feil: 'Ugyldig vurdering.' }, { status: 400 });
    }

    const møtedag = hentEllerSeed(request, treffId);
    const vurdering = resultat.data;
    const valideringsfeil = validerPar(request, treffId, møtedag, vurdering);
    if (valideringsfeil) return valideringsfeil;

    const andreVurderinger = møtedag.vurderinger.filter(
      (eksisterendeVurdering) => !erSammePar(eksisterendeVurdering, vurdering),
    );
    const erTomVurdering =
      vurdering.vurdering === null &&
      !vurdering.andreIntervju &&
      !vurdering.jobbtilbud;
    const vurderinger = erTomVurdering
      ? andreVurderinger
      : [...andreVurderinger, vurdering];

    return HttpResponse.json(
      lagre(request, treffId, {
        ...møtedag,
        vurderinger,
        fase: senesteFase(møtedag.fase, 'VURDERING'),
      }),
    );
  },
);
