import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { rekrutteringstreffMock } from '@/app/api/rekrutteringstreff/[...slug]/rekrutteringstreffMock';
import { EierOgKontorSchema } from '@/app/api/rekrutteringstreff/eierOgKontor';
import { treffOverrides } from '@/app/api/rekrutteringstreff/mswState';
import { deleteMock, getMock, postMock, putMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

// --- Treff CRUD ---

export const opprettRekrutteringstreffMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}`,
  async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as Record<
      string,
      unknown
    >;
    const id = '1231-1234-1234-1234';
    const base = rekrutteringstreffMock(id);
    const prev = treffOverrides.get(id) ?? {};
    const merged = { ...base, ...prev, ...body, id };
    treffOverrides.set(id, merged);
    return HttpResponse.json({
      id,
      tittel: (body.tittel as string) ?? 'Treff uten navn',
    });
  },
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

export const fjernEierMSWHandler = deleteMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/eiere/:navIdent`,
  ({ params }) => {
    const id = String(params.rekrutteringstreffId);
    const navIdent = String(params.navIdent);
    const base = rekrutteringstreffMock(id);
    const prev = treffOverrides.get(id) ?? {};
    const eiere = EierOgKontorSchema.array().parse(
      prev.eierOgKontor ?? base.eierOgKontor,
    );
    if (!eiere.some((eier) => eier.navIdent === navIdent)) {
      return HttpResponse.json(
        { feil: 'Eieren finnes ikke' },
        { status: 404 },
      );
    }
    const gjenværendeEiere = eiere.filter((eier) => eier.navIdent !== navIdent);
    if (gjenværendeEiere.length === 0) {
      return HttpResponse.json(
        { feil: 'Rekrutteringstreffet må ha minst én eier' },
        { status: 409 },
      );
    }
    treffOverrides.set(id, { ...prev, eierOgKontor: gjenværendeEiere });
    return new HttpResponse(null, { status: 204 });
  },
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
