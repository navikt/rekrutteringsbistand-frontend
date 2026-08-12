import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { mockHentArbeidsgivereForTreff } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/arbeidsgivereMockBackend';
import { rekrutteringstreffMock } from '@/app/api/rekrutteringstreff/[...slug]/rekrutteringstreffMock';
import {
  fordelIntervjuerForenklet,
  fordelJobbsøkerePåRom,
  harRegistreringer,
  lagArbeidsgiverRotasjon,
  oppdaterRomEtterOppmøte,
  tellRegistreringer,
  tildelDeltakernummer,
  toggleOppmøte,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringHjelpere';
import {
  ArbeidsgiverIntervjufordelingSchema,
  harRegistrertNoe,
  MøteoppsettSchema,
  RomfordelingSchema,
  VurderingSchema,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import type {
  ArbeidsgiverIntervjufordelingDTO,
  TreffgjennomføringDTO,
  TreffgjennomføringFase,
  InteresseDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import { byggMswScopeKey } from '@/app/api/rekrutteringstreff/mswScope';
import { treffgjennomføringStore } from '@/app/api/rekrutteringstreff/mswState';
import { RekrutteringstreffKategori } from '@/app/rekrutteringstreff/_types/constants';
import { getMock, postMock, putMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

const TREFFGJENNOMFØRING_OG_OPPFOLGING_STI = `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/treffgjennomforing-og-oppfolging`;
const TREFFGJENNOMFØRING_STI = `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/treffgjennomforing`;
const OPPFOLGING_STI = `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/oppfolging`;

const WORKOP_TREFF_ID = 'workop';
const STANDARD_STARTTIDSPUNKT = '10:00';
const STANDARD_VARIGHET_MINUTTER = 10;
const ANTALL_FREMMØTTE = 20;

const erWorkOp = (rekrutteringstreffId: string) =>
  rekrutteringstreffMock(rekrutteringstreffId).kategori ===
  RekrutteringstreffKategori.WORKOP;

const validerWorkOp = (rekrutteringstreffId: string) =>
  erWorkOp(rekrutteringstreffId)
    ? null
    : HttpResponse.json(
        { feil: 'Endepunktet er bare tilgjengelig for WorkOp-treff.' },
        { status: 400 },
      );

const lagFremmøttePersonTreffIder = () =>
  Array.from(
    { length: ANTALL_FREMMØTTE },
    (_, indeks) => `mock-js-${String(indeks + 1).padStart(3, '0')}`,
  );

const lagTreffgjennomføringStartdata = (
  rekrutteringstreffId: string,
  antallArbeidsgivere: number,
): TreffgjennomføringDTO => {
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

const FASE_REKKEFØLGE: TreffgjennomføringFase[] = [
  'OPPMØTE',
  'ROM',
  'INTERESSE',
  'FORDELING',
  'VURDERING',
];

const senesteFase = (
  nåværende: TreffgjennomføringFase,
  minst: TreffgjennomføringFase,
): TreffgjennomføringFase =>
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
  treffgjennomføring: TreffgjennomføringDTO,
  par: Intervjupar,
) => {
  if (!par.personTreffId || !par.arbeidsgiverTreffId) {
    return HttpResponse.json({ feil: 'Ugyldig intervjupar.' }, { status: 400 });
  }
  if (!treffgjennomføring.oppmøte.includes(par.personTreffId)) {
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

export const hentTreffgjennomføring = (
  request: Request,
  treffId: string,
): TreffgjennomføringDTO =>
  treffgjennomføringStore.get(byggMswScopeKey(request, treffId)) ??
  lagTreffgjennomføringStartdata(
    treffId,
    arbeidsgiverIderForTreff(request, treffId).length,
  );

const lagre = (
  request: Request,
  treffId: string,
  treffgjennomføring: TreffgjennomføringDTO,
): TreffgjennomføringDTO => {
  treffgjennomføringStore.set(
    byggMswScopeKey(request, treffId),
    treffgjennomføring,
  );
  return treffgjennomføring;
};

export const treffgjennomføringMSWHandler = getMock(
  TREFFGJENNOMFØRING_OG_OPPFOLGING_STI,
  ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    return HttpResponse.json(hentTreffgjennomføring(request, treffId));
  },
);

export const oppmøteMSWHandler = putMock(
  `${TREFFGJENNOMFØRING_STI}/oppmote`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const body = (await request.json()) as {
      personTreffId?: string;
      møtt?: boolean;
      bekreftSlettRegistreringer?: boolean;
    };
    const treffgjennomføring = hentTreffgjennomføring(request, treffId);
    const personTreffId = body.personTreffId;
    if (!personTreffId) return HttpResponse.json(treffgjennomføring);

    const oppmøte =
      typeof body.møtt === 'boolean'
        ? body.møtt
          ? Array.from(new Set([...treffgjennomføring.oppmøte, personTreffId]))
          : treffgjennomføring.oppmøte.filter((id) => id !== personTreffId)
        : toggleOppmøte(treffgjennomføring.oppmøte, personTreffId);

    const registreringer = tellRegistreringer(
      treffgjennomføring,
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
      treffgjennomføring.rom.length > 0
        ? oppdaterRomEtterOppmøte(treffgjennomføring.rom, oppmøte)
        : treffgjennomføring.rom;
    const interesser = treffgjennomføring.interesser.filter((interesse) =>
      oppmøte.includes(interesse.personTreffId),
    );
    const intervjufordelinger = treffgjennomføring.intervjufordelinger.map(
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
    const vurderinger = treffgjennomføring.vurderinger.filter((vurdering) =>
      oppmøte.includes(vurdering.personTreffId),
    );

    return HttpResponse.json(
      lagre(request, treffId, {
        ...treffgjennomføring,
        oppmøte,
        deltakernummer:
          erWorkOp(treffId) && oppmøte.includes(personTreffId)
            ? tildelDeltakernummer(
                treffgjennomføring.deltakernummer,
                personTreffId,
              )
            : treffgjennomføring.deltakernummer,
        rom,
        interesser,
        intervjufordelinger,
        vurderinger,
      }),
    );
  },
);

export const møteoppsettMSWHandler = putMock(
  `${TREFFGJENNOMFØRING_STI}/moteoppsett`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const workOpFeil = validerWorkOp(treffId);
    if (workOpFeil) return workOpFeil;

    const resultat = MøteoppsettSchema.safeParse(await request.json());
    const treffgjennomføring = hentTreffgjennomføring(request, treffId);

    if (!resultat.success) {
      return HttpResponse.json(
        { feil: 'Ugyldig møteoppsett.' },
        { status: 400 },
      );
    }

    if (treffgjennomføring.rom.length > 0) {
      return HttpResponse.json(
        lagre(request, treffId, {
          ...treffgjennomføring,
          starttidspunkt: resultat.data.starttidspunkt,
          varighetPerMøteMinutter: resultat.data.varighetPerMøteMinutter,
        }),
      );
    }

    const rom = fordelJobbsøkerePåRom(
      treffgjennomføring.oppmøte,
      treffgjennomføring.antallRom,
    );
    const arbeidsgiverRekkefølge = lagArbeidsgiverRotasjon(
      arbeidsgiverIderForTreff(request, treffId),
    );

    return HttpResponse.json(
      lagre(request, treffId, {
        ...treffgjennomføring,
        ...resultat.data,
        rom,
        arbeidsgiverRekkefølge,
        fase: senesteFase(treffgjennomføring.fase, 'ROM'),
      }),
    );
  },
);

export const romfordelingMSWHandler = putMock(
  `${TREFFGJENNOMFØRING_STI}/romfordeling`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const workOpFeil = validerWorkOp(treffId);
    if (workOpFeil) return workOpFeil;

    const treffgjennomføring = hentTreffgjennomføring(request, treffId);
    const resultat = RomfordelingSchema.safeParse(await request.json());

    if (!resultat.success) {
      return HttpResponse.json(
        { feil: 'Ugyldig romfordeling.' },
        { status: 400 },
      );
    }

    const romnumre = resultat.data.map(({ romnummer }) => romnummer);
    const gyldigeRomnumre =
      romnumre.length === treffgjennomføring.antallRom &&
      new Set(romnumre).size === treffgjennomføring.antallRom &&
      romnumre.every(
        (romnummer) =>
          Number.isInteger(romnummer) &&
          romnummer >= 1 &&
          romnummer <= treffgjennomføring.antallRom,
      );
    const forventedeJobbsøkere = [...treffgjennomføring.oppmøte].sort();
    const mottatteJobbsøkere = resultat.data
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
        ...treffgjennomføring,
        rom: resultat.data,
      }),
    );
  },
);

export const interesseMSWHandler = putMock(
  `${TREFFGJENNOMFØRING_STI}/interesse`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const body = (await request.json()) as InteresseDTO & {
      interessert?: boolean;
    };
    const treffgjennomføring = hentTreffgjennomføring(request, treffId);
    const par = {
      personTreffId: body.personTreffId,
      arbeidsgiverTreffId: body.arbeidsgiverTreffId,
    };
    const valideringsfeil = validerPar(
      request,
      treffId,
      treffgjennomføring,
      par,
    );
    if (valideringsfeil) return valideringsfeil;

    const interesser = oppdaterPar(
      treffgjennomføring.interesser,
      par,
      body.interessert === true,
    );
    const intervjufordelinger = body.interessert
      ? leggTilPersonSistInkludert(
          treffgjennomføring.intervjufordelinger,
          par.personTreffId,
          par.arbeidsgiverTreffId,
        )
      : fjernPersonFraIntervjufordelinger(
          treffgjennomføring.intervjufordelinger,
          par.personTreffId,
          par.arbeidsgiverTreffId,
        );
    return HttpResponse.json(
      lagre(request, treffId, {
        ...treffgjennomføring,
        interesser,
        intervjufordelinger,
        fase: senesteFase(treffgjennomføring.fase, 'INTERESSE'),
      }),
    );
  },
);

export const intervjufordelingMSWHandler = putMock(
  `${TREFFGJENNOMFØRING_STI}/intervjufordeling`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const workOpFeil = validerWorkOp(treffId);
    if (workOpFeil) return workOpFeil;

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
    const treffgjennomføring = hentTreffgjennomføring(request, treffId);
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

    const interessertePersonTreffIder = treffgjennomføring.interesser
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
      interessertePersonTreffIder.length !== fordeltePersonTreffIder.length ||
      interessertePersonTreffIder.some(
        (personTreffId) => !fordeltePersonTreffIder.includes(personTreffId),
      )
    ) {
      return HttpResponse.json(
        { feil: 'Fordelingen må inneholde alle registrerte interesser.' },
        { status: 409 },
      );
    }
    if (
      fordeltePersonTreffIder.some(
        (personTreffId) => !treffgjennomføring.oppmøte.includes(personTreffId),
      )
    ) {
      return HttpResponse.json(
        { feil: 'Fordelingen inneholder en jobbsøker uten oppmøte.' },
        { status: 409 },
      );
    }

    const intervjufordelinger = [
      ...treffgjennomføring.intervjufordelinger.filter(
        (eksisterendeFordeling) =>
          eksisterendeFordeling.arbeidsgiverTreffId !==
          fordeling.arbeidsgiverTreffId,
      ),
      fordeling,
    ];
    return HttpResponse.json(
      lagre(request, treffId, {
        ...treffgjennomføring,
        intervjufordelinger,
        fase: senesteFase(treffgjennomføring.fase, 'FORDELING'),
      }),
    );
  },
);

export const fordelIntervjuerMSWHandler = postMock(
  `${TREFFGJENNOMFØRING_STI}/intervjufordeling/fordel`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const workOpFeil = validerWorkOp(treffId);
    if (workOpFeil) return workOpFeil;

    const treffgjennomføring = hentTreffgjennomføring(request, treffId);
    const intervjufordelinger = fordelIntervjuerForenklet(
      treffgjennomføring,
      arbeidsgiverIderForTreff(request, treffId),
    ).filter((fordeling) =>
      Boolean(
        fordeling.inkludertePersonTreffIder.length ||
        fordeling.ekskludertePersonTreffIder.length,
      ),
    );

    return HttpResponse.json(
      lagre(request, treffId, {
        ...treffgjennomføring,
        intervjufordelinger,
        fase: senesteFase(treffgjennomføring.fase, 'FORDELING'),
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

    const treffgjennomføring = hentTreffgjennomføring(request, treffId);
    const vurdering = resultat.data;
    const valideringsfeil = validerPar(
      request,
      treffId,
      treffgjennomføring,
      vurdering,
    );
    if (valideringsfeil) return valideringsfeil;

    const andreVurderinger = treffgjennomføring.vurderinger.filter(
      (eksisterendeVurdering) => !erSammePar(eksisterendeVurdering, vurdering),
    );
    const vurderinger = harRegistrertNoe(vurdering)
      ? [...andreVurderinger, vurdering]
      : andreVurderinger;

    return HttpResponse.json(
      lagre(request, treffId, {
        ...treffgjennomføring,
        vurderinger,
        fase: senesteFase(treffgjennomføring.fase, 'VURDERING'),
      }),
    );
  },
);
