'use client';

import { tilbakemeldingerMock } from './mocks/tilbakemeldingerMock';
import {
  SendTilbakemeldingDTO,
  tilbakemeldingerSchema,
  TilbakemeldingDTO,
} from './typer';
import { postApi } from '@/app/api/fetcher';
import { useSWRGet } from '@/app/api/useSWRGet';
import { http, HttpResponse } from 'msw';

const tilbakemeldingerEndepunkt = '/api/dashboard/tilbakemeldinger';

export const useTilbakemeldinger = () =>
  useSWRGet(tilbakemeldingerEndepunkt, tilbakemeldingerSchema, {
    nonImmutable: true,
  });

export const sendTilbakemelding = async (dto: SendTilbakemeldingDTO) =>
  postApi(tilbakemeldingerEndepunkt, dto);

export const tilbakemeldingerMSWHandler = [
  http.get(tilbakemeldingerEndepunkt, () => {
    return HttpResponse.json(tilbakemeldingerMock);
  }),
  http.post(tilbakemeldingerEndepunkt, () => {
    return HttpResponse.json({ ok: true }, { status: 201 });
  }),
];
