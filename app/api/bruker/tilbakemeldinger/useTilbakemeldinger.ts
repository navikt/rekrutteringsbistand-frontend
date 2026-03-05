'use client';

import {
  OppdaterTilbakemeldingDTO,
  SendTilbakemeldingDTO,
  tilbakemeldingerSchema,
} from './typer';
import { deleteApi, postApi, putApi } from '@/app/api/fetcher';
import { useSWRGet } from '@/app/api/useSWRGet';

const tilbakemeldingerEndepunkt = '/api/bruker/tilbakemeldinger';

export const useTilbakemeldinger = (
  side: number = 1,
  visAlle: boolean = false,
) =>
  useSWRGet(
    `${tilbakemeldingerEndepunkt}?side=${side}&visAlle=${visAlle}`,
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
