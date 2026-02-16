'use client';

import { tilbakemeldingerMock } from './mocks/tilbakemeldingerMock';
import {
  OppdaterTilbakemeldingDTO,
  SendTilbakemeldingDTO,
  TilbakemeldingDTO,
  tilbakemeldingerSchema,
  tilbakemeldingSchema,
} from './typer';
import { deleteApi, postApi, putApi } from '@/app/api/fetcher';
import { useSWRGet } from '@/app/api/useSWRGet';
import { http, HttpResponse } from 'msw';

const tilbakemeldingerEndepunkt = '/api/bruker/tilbakemeldinger';

export const useTilbakemeldinger = (side: number = 1) =>
  useSWRGet(
    `${tilbakemeldingerEndepunkt}?side=${side}`,
    tilbakemeldingerSchema,
    {
      nonImmutable: true,
    },
  );

export const sendTilbakemelding = async (dto: SendTilbakemeldingDTO) =>
  postApi(tilbakemeldingerEndepunkt, dto);

export const oppdaterTilbakemelding = async (
  id: string,
  dto: OppdaterTilbakemeldingDTO,
) => putApi(`${tilbakemeldingerEndepunkt}/${id}`, dto);

export const slettTilbakemelding = async (id: string) =>
  deleteApi(`${tilbakemeldingerEndepunkt}/${id}`);

export const tilbakemeldingerMSWHandler = [
  http.get(tilbakemeldingerEndepunkt, ({ request }) => {
    const url = new URL(request.url);
    const side = Number(url.searchParams.get('side') ?? '1');
    const perSide = 20;
    const start = (side - 1) * perSide;
    const paginert = tilbakemeldingerMock.slice(start, start + perSide);
    return HttpResponse.json({
      tilbakemeldinger: paginert,
      side,
      totalSider: Math.ceil(tilbakemeldingerMock.length / perSide),
      totaltAntall: tilbakemeldingerMock.length,
    });
  }),
  http.post(tilbakemeldingerEndepunkt, async ({ request }) => {
    const body = (await request.json()) as SendTilbakemeldingDTO;
    const nyTilbakemelding: TilbakemeldingDTO = {
      id: crypto.randomUUID(),
      navn: body.navn,
      tilbakemelding: body.tilbakemelding,
      dato: new Date().toISOString(),
      status: 'NY' as TilbakemeldingDTO['status'],
      trelloLenke: null,
      kategori: body.kategori,
      url: '/',
    };
    tilbakemeldingerMock.push(nyTilbakemelding);
    return HttpResponse.json(nyTilbakemelding, { status: 201 });
  }),
  http.put(
    `${tilbakemeldingerEndepunkt}/:uuid`,
    async ({ params, request }) => {
      const { uuid } = params;
      const body = (await request.json()) as OppdaterTilbakemeldingDTO;
      const indeks = tilbakemeldingerMock.findIndex((t) => t.id === uuid);
      if (indeks === -1) {
        return HttpResponse.json(
          { beskrivelse: 'Ikke funnet' },
          { status: 404 },
        );
      }
      const oppdatert = { ...tilbakemeldingerMock[indeks], ...body };
      const validert = tilbakemeldingSchema.parse(oppdatert);
      tilbakemeldingerMock[indeks] = validert;
      return HttpResponse.json(validert);
    },
  ),
  http.delete(`${tilbakemeldingerEndepunkt}/:uuid`, ({ params }) => {
    const { uuid } = params;
    const indeks = tilbakemeldingerMock.findIndex((t) => t.id === uuid);
    if (indeks !== -1) {
      tilbakemeldingerMock.splice(indeks, 1);
    }
    return new HttpResponse(null, { status: 200 });
  }),
];
