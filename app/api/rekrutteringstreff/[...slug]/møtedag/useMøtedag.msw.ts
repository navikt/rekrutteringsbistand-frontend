import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { mockHentArbeidsgivereForTreff } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/arbeidsgivereMockBackend';
import {
  fordelJobbsøkerePåRom,
  lagArbeidsgiverRotasjon,
  oppdaterRomEtterOppmøte,
  toggleOppmøte,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/møtedagHjelpere';
import { lagMøtedagSeed } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/møtedagSeed';
import type {
  ArbeidsgiverIntervjufordelingDTO,
  MøtedagDTO,
  MøtedagFase,
  VurderingDTO,
  ØnskeDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { ArbeidsgiverIntervjufordelingSchema } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { byggMswScopeKey } from '@/app/api/rekrutteringstreff/mswScope';
import { møtedagStore } from '@/app/api/rekrutteringstreff/mswState';
import { getMock, putMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

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

  const seed = lagMøtedagSeed(
    treffId,
    arbeidsgiverIderForTreff(request, treffId).length,
  );
  møtedagStore.set(nøkkel, seed);
  return seed;
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
    const body = (await request.json()) as Partial<
      Pick<
        MøtedagDTO,
        | 'antallRom'
        | 'starttidspunkt'
        | 'varighetPerMøteMinutter'
        | 'pauseMellomMøterMinutter'
      >
    >;
    const møtedag = hentEllerSeed(request, treffId);

    const antallRom = body.antallRom ?? møtedag.antallRom;
    const starttidspunkt = body.starttidspunkt ?? møtedag.starttidspunkt;
    const varighetPerMøteMinutter =
      body.varighetPerMøteMinutter ?? møtedag.varighetPerMøteMinutter;
    const pauseMellomMøterMinutter =
      body.pauseMellomMøterMinutter ?? møtedag.pauseMellomMøterMinutter;

    const rom = fordelJobbsøkerePåRom(møtedag.oppmøte, antallRom);
    const arbeidsgiverRekkefølge = lagArbeidsgiverRotasjon(
      arbeidsgiverIderForTreff(request, treffId),
    );

    return HttpResponse.json(
      lagre(request, treffId, {
        ...møtedag,
        antallRom,
        starttidspunkt,
        varighetPerMøteMinutter,
        pauseMellomMøterMinutter,
        rom,
        arbeidsgiverRekkefølge,
        fase: senesteFase(møtedag.fase, 'ROM'),
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
    const vurderinger = body.ønsket
      ? møtedag.vurderinger
      : møtedag.vurderinger.filter((vurdering) => !erSammePar(vurdering, par));

    return HttpResponse.json(
      lagre(request, treffId, {
        ...møtedag,
        ønsker,
        intervjufordelinger,
        vurderinger,
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
    const inkluderte = new Set(fordeling.inkludertePersonTreffIder);
    const vurderinger = møtedag.vurderinger.filter(
      (vurdering) =>
        vurdering.arbeidsgiverTreffId !== fordeling.arbeidsgiverTreffId ||
        inkluderte.has(vurdering.personTreffId),
    );

    return HttpResponse.json(
      lagre(request, treffId, {
        ...møtedag,
        intervjufordelinger,
        vurderinger,
        fase: senesteFase(møtedag.fase, 'FORDELING'),
      }),
    );
  },
);

export const vurderingerMSWHandler = putMock(
  `${MOTEDAG_STI}/vurderinger`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const body = (await request.json()) as { vurderinger?: VurderingDTO[] };
    const møtedag = hentEllerSeed(request, treffId);

    return HttpResponse.json(
      lagre(request, treffId, {
        ...møtedag,
        vurderinger: body.vurderinger ?? møtedag.vurderinger,
        fase: senesteFase(møtedag.fase, 'VURDERING'),
      }),
    );
  },
);
