import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { rekrutteringstreffMock } from '@/app/api/rekrutteringstreff/[...slug]/rekrutteringstreffMock';
import { treffOverrides } from '@/app/api/rekrutteringstreff/mswState';
import { deleteMock, getMock, postMock, putMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

// --- Treff CRUD ---

export const opprettRekrutteringstreffMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}`,
  () =>
    HttpResponse.json({
      id: '1231-1234-1234-1234',
      tittel: 'Treff uten navn',
    }),
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

export const leggTilMegSomEierMSWHandler = putMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/eiere/meg`,
  () => new HttpResponse(null, { status: 200 }),
);

// --- Statushendelser ---

const tekniskHendelsePathMap: Record<string, string> = {
  PUBLISER: 'publiser',
  GJENÅPN: 'gjenapn',
  FULLFØR: 'fullfor',
  AVLYS: 'avlys',
  AVPUBLISER: 'avpubliser',
};

export const statusHendelserMSWHandlers = Object.values(
  tekniskHendelsePathMap,
).map((hendelsePath) =>
  postMock(
    `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/${hendelsePath}`,
    () => HttpResponse.json({}),
  ),
);
