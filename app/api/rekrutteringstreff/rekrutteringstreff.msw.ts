import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { alleHendelserMock } from '@/app/api/rekrutteringstreff/[...slug]/allehendelser/alleHendelserMock';
import { arbeidsgiverHendelserMock } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/arbeidsgiverHendelserMock';
import { arbeidsgivereMock } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/arbeidsgivereMock';
import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { innleggMock } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/innleggMock';
import type { InnleggDTO } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg';
import { jobbsøkerHendelserMock } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/jobbsøkerHendelserMock';
import {
  jobbsøkereAvlystMock,
  jobbsøkereFullførtMock,
  jobbsøkereIngenSvartJaMock,
  jobbsøkereMock,
  jobbsøkereTomtMock,
  jobbsøkereUtkastMock,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/jobbsøkereMock';
import { rekrutteringstreffMock } from '@/app/api/rekrutteringstreff/[...slug]/rekrutteringstreffMock';
import { kiLoggMock } from '@/app/api/rekrutteringstreff/kiValidering/kiLoggMock';
import { validerRekrutteringstreffMock } from '@/app/api/rekrutteringstreff/kiValidering/validerRekrutteringstreffMock';
import { rekrutteringstreffMittKontorMock } from '@/app/api/rekrutteringstreff/mittkontor/useRekrutteringstreffMittKontorMock';
import { rekrutteringstreffOversiktMock } from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversiktMock';
import {
  alleSokTreff,
  byggSokRespons,
} from '@/app/api/rekrutteringstreff/sok/rekrutteringstreffSokMock';
import type {
  Sortering,
  Visning,
} from '@/app/api/rekrutteringstreff/sok/useRekrutteringstreffSok';
import { deleteMock, getMock, postMock, putMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

const treffOverrides = new Map<string, Partial<Record<string, unknown>>>();
const innleggStore = new Map<string, InnleggDTO[]>();
const arbeidsgiverStore = new Map<string, ArbeidsgiverDTO[]>();

type JobbsøkereResponseDTO = {
  jobbsøkere: Array<Record<string, unknown>>;
  antallSynlige: number;
  antallSkjulte: number;
  antallSlettede: number;
};

const tekniskHendelsePathMap: Record<string, string> = {
  PUBLISER: 'publiser',
  GJENÅPN: 'gjenapn',
  FULLFØR: 'fullfor',
  AVLYS: 'avlys',
  AVPUBLISER: 'avpubliser',
};

const kiBase = (
  id: string | ':rekrutteringstreffId' = ':rekrutteringstreffId',
) => `${RekrutteringstreffAPI.internUrl}/${id}/ki`;

const kiLoggEndepunkt = (
  id: string | ':rekrutteringstreffId' = ':rekrutteringstreffId',
) => `${kiBase(id)}/logg`;

const manuellEndepunkt = (
  rekrutteringstreffId:
    | string
    | ':rekrutteringstreffId' = ':rekrutteringstreffId',
  id: string | ':id' = ':id',
) => `${kiLoggEndepunkt(rekrutteringstreffId)}/${id}/manuell`;

const lagretEndepunkt = (
  rekrutteringstreffId:
    | string
    | ':rekrutteringstreffId' = ':rekrutteringstreffId',
  id: string | ':id' = ':id',
) => `${kiLoggEndepunkt(rekrutteringstreffId)}/${id}/lagret`;

const validerRekrutteringstreffEndepunkt = (id: string | ':id' = ':id') =>
  `${RekrutteringstreffAPI.internUrl}/${id}/ki/valider`;

export const alleHendelserMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/allehendelser`,
  () => HttpResponse.json(alleHendelserMock()),
);

export const opprettArbeidsgiverMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver`,
  async ({ params, request }) => {
    const id = params.rekrutteringstreffId as string;
    const body = (await request.json()) as Record<string, unknown>;
    const nyArbeidsgiver = {
      arbeidsgiverTreffId: `ag-treff-${Date.now()}`,
      organisasjonsnummer: (body.organisasjonsnummer as string) ?? '999999999',
      navn: (body.navn as string) ?? 'Ny bedrift',
      status: 'AKTIV',
      gateadresse: null,
      postnummer: null,
      poststed: null,
    };
    const eksisterende = arbeidsgiverStore.get(id) ?? [];
    arbeidsgiverStore.set(id, [...eksisterende, nyArbeidsgiver]);
    return HttpResponse.json(nyArbeidsgiver);
  },
);

export const slettArbeidsgiverMSWHandler = deleteMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver/:arbeidsgiverId`,
  ({ params }) => {
    const treffId = params.rekrutteringstreffId as string;
    const agId = params.arbeidsgiverId as string;
    const eksisterende = arbeidsgiverStore.get(treffId) ?? [];
    arbeidsgiverStore.set(
      treffId,
      eksisterende.filter((a) => a.arbeidsgiverTreffId !== agId),
    );
    return new HttpResponse(null, { status: 204 });
  },
);

export const arbeidsgiverHendelserMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver/hendelser`,
  () => HttpResponse.json(arbeidsgiverHendelserMock()),
);

const erNyopprettetUtkast = (id: string) =>
  id === '1231-1234-1234-1234' ||
  alleSokTreff.some((t) => t.id === id && t.status === 'utkast');

export const rekrutteringstreffArbeidsgivereMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver`,
  ({ params }) => {
    const id = params.rekrutteringstreffId as string;
    const stored = arbeidsgiverStore.get(id);
    if (stored !== undefined) return HttpResponse.json(stored);
    if (erNyopprettetUtkast(id)) return HttpResponse.json([]);
    return HttpResponse.json(arbeidsgivereMock());
  },
);

export const innleggMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/innlegg`,
  ({ params }) => {
    const id = params.rekrutteringstreffId as string;
    const stored = innleggStore.get(id);
    if (stored !== undefined) return HttpResponse.json(stored);
    if (erNyopprettetUtkast(id)) return HttpResponse.json([]);
    return HttpResponse.json(innleggMock);
  },
);

export const opprettInnleggMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/innlegg`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const body = (await request.json()) as Record<string, unknown>;
    const nyttInnlegg: InnleggDTO = {
      ...innleggMock[0],
      id: `innlegg-${Date.now()}`,
      treffId,
      tittel: (body.tittel as string) ?? 'Om treffet',
      htmlContent: (body.htmlContent as string) ?? '',
    };
    innleggStore.set(treffId, [nyttInnlegg]);
    return HttpResponse.json(nyttInnlegg);
  },
);

export const oppdaterInnleggMSWHandler = putMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/innlegg/:innleggId`,
  async ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const body = (await request.json()) as Record<string, unknown>;
    const eksisterende = innleggStore.get(treffId) ?? innleggMock;
    const oppdatert = eksisterende.map((i) =>
      i.id === params.innleggId
        ? {
            ...i,
            htmlContent: (body.htmlContent as string) ?? i.htmlContent,
            tittel: (body.tittel as string) ?? i.tittel,
          }
        : i,
    );
    innleggStore.set(treffId, oppdatert);
    return HttpResponse.json(
      oppdatert.find((i) => i.id === params.innleggId) ?? oppdatert[0],
    );
  },
);

export const jobbsøkerSlettMSWHandler = deleteMock(
  `${RekrutteringstreffAPI.internUrl}/:id1/jobbsoker/:id2/slett`,
  () => HttpResponse.json({ success: true }),
);

export const opprettJobbsøkereMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:id/jobbsoker`,
  () => HttpResponse.json({}),
);

export const jobbsøkerHendelserMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker/hendelser`,
  () => HttpResponse.json(jobbsøkerHendelserMock()),
);

export const jobbsøkereMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker`,
  ({ params }) => {
    const id = params.rekrutteringstreffId as string;
    const mockPerTreffId: Record<string, () => JobbsøkereResponseDTO> = {
      utkast: jobbsøkereUtkastMock,
      avlyst: jobbsøkereAvlystMock,
      fullfort: jobbsøkereFullførtMock,
      slettet: jobbsøkereTomtMock,
      'ingen-svart-ja': jobbsøkereIngenSvartJaMock,
    };
    const mockFn = mockPerTreffId[id] ?? jobbsøkereMock;
    return HttpResponse.json(mockFn());
  },
);

export const oppdaterRekrutteringstreffMSWHandler = putMock(
  `${RekrutteringstreffAPI.internUrl}/:id`,
  async ({ params, request }) => {
    const id = params.id as string;
    const body = (await request.json()) as Record<string, unknown>;
    const base = rekrutteringstreffMock(id);
    const prev = treffOverrides.get(id) ?? {};
    const merged = { ...base, ...prev, ...body };
    treffOverrides.set(id, merged);
    return HttpResponse.json(merged);
  },
);

export const slettRekrutteringstreffMSWHandler = deleteMock(
  `${RekrutteringstreffAPI.internUrl}/:id`,
  () => new HttpResponse(null, { status: 204 }),
);

export const statusHendelserMSWHandlers = Object.values(
  tekniskHendelsePathMap,
).map((hendelsePath) =>
  postMock(
    `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/${hendelsePath}`,
    () => HttpResponse.json({}),
  ),
);

export const rekrutteringstreffMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:id`,
  ({ params }) => {
    const id = params.id as string;
    const base = rekrutteringstreffMock(id);
    const overrides = treffOverrides.get(id);
    return HttpResponse.json(overrides ? { ...base, ...overrides } : base);
  },
);

export const kandidatnummerMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker/:personTreffId/kandidatnummer`,
  () => HttpResponse.json({ kandidatnummer: 'PAM0123ABCDE' }),
);

export const listKiLoggMSWHandler = getMock(
  kiLoggEndepunkt(':rekrutteringstreffId'),
  () => HttpResponse.json(kiLoggMock),
);

export const oppdaterKiLoggManuellMSWHandler = putMock(
  manuellEndepunkt(':rekrutteringstreffId', ':id'),
  () => new HttpResponse(null, { status: 204 }),
);

export const oppdaterKiLoggLagretMSWHandler = putMock(
  lagretEndepunkt(':rekrutteringstreffId', ':id'),
  () => new HttpResponse(null, { status: 204 }),
);

export const validerRekrutteringstreffMSWHandler = postMock(
  validerRekrutteringstreffEndepunkt(':id'),
  () => HttpResponse.json(validerRekrutteringstreffMock()),
);

export const rekrutteringstreffSokMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/sok`,
  ({ request }) => {
    const url = new URL(request.url);
    const visning = url.searchParams.get('visning') ?? undefined;
    const statuser = url.searchParams.get('statuser');
    const kontorer = url.searchParams.get('kontorer');
    const sortering = url.searchParams.get('sortering') ?? undefined;
    const parsedSide = parseInt(url.searchParams.get('side') ?? '', 10);
    const side = Number.isNaN(parsedSide) ? 1 : parsedSide;
    const parsedAntallPerSide = parseInt(
      url.searchParams.get('antallPerSide') ?? '',
      10,
    );
    const antallPerSide = Number.isNaN(parsedAntallPerSide)
      ? 20
      : parsedAntallPerSide;
    return HttpResponse.json(
      byggSokRespons({
        visning: visning as Visning | undefined,
        statuser: statuser?.split(',').filter(Boolean),
        kontorer: kontorer?.split(',').filter(Boolean),
        sortering: sortering as Sortering | undefined,
        side,
        antallPerSide,
      }),
    );
  },
);

export const rekrutteringstreffMittKontorMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/mittkontor`,
  () => HttpResponse.json(rekrutteringstreffMittKontorMock),
);

export const opprettRekrutteringstreffMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}`,
  () =>
    HttpResponse.json({
      id: '1231-1234-1234-1234',
      tittel: 'Treff uten navn',
    }),
);

export const rekrutteringstreffOversiktMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}`,
  () => HttpResponse.json(rekrutteringstreffOversiktMock),
);

export const leggTilMegSomEierMSWHandler = putMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/eiere/meg`,
  () => new HttpResponse(null, { status: 200 }),
);
