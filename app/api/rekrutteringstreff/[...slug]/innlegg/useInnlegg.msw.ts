import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { innleggMock } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/innleggMock';
import type { InnleggDTO } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg';
import {
  erNyopprettetUtkast,
  innleggStore,
} from '@/app/api/rekrutteringstreff/mswState';
import { getMock, postMock, putMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

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
