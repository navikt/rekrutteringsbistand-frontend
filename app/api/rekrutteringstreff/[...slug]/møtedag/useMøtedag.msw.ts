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
  MøtedagDTO,
  MøtedagFase,
  VurderingDTO,
  ØnskeDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { byggMswScopeKey } from '@/app/api/rekrutteringstreff/mswScope';
import { møtedagStore } from '@/app/api/rekrutteringstreff/mswState';
import { getMock, putMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

const MOTEDAG_STI = `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/motedag`;

const FASE_REKKEFØLGE: MøtedagFase[] = [
  'OPPMØTE',
  'ROM',
  'ØNSKER',
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

    return HttpResponse.json(
      lagre(request, treffId, { ...møtedag, oppmøte, rom }),
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
    const body = (await request.json()) as { ønsker?: ØnskeDTO[] };
    const møtedag = hentEllerSeed(request, treffId);

    return HttpResponse.json(
      lagre(request, treffId, {
        ...møtedag,
        ønsker: body.ønsker ?? møtedag.ønsker,
        fase: senesteFase(møtedag.fase, 'ØNSKER'),
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
