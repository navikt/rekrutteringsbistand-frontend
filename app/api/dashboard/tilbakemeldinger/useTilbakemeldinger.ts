'use client';

import { tilbakemeldingerMock } from './mocks/tilbakemeldingerMock';
import { tilbakemeldingerSchema, TilbakemeldingDTO } from './typer';
import { useSWRGet } from '@/app/api/useSWRGet';
import { http, HttpResponse } from 'msw';

const tilbakemeldingerEndepunkt = '/api/dashboard/tilbakemeldinger';

export const useTilbakemeldinger = () =>
  useSWRGet(tilbakemeldingerEndepunkt, tilbakemeldingerSchema, {
    nonImmutable: true,
  });

export const tilbakemeldingerMSWHandler = http.get(
  tilbakemeldingerEndepunkt,
  () => {
    return HttpResponse.json(tilbakemeldingerMock);
  },
);
