'use client';

import { BrukerAPI } from '@/app/api/api-routes';
import {
  type LagreSøkDTO,
  type LagredeSøkDomene,
  lagretSøkSchema,
} from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';
import { deleteApi, postApi, putApi } from '@/app/api/fetcher';
import { useSWRGet } from '@/app/api/useSWRGet';
import { z } from 'zod';

const lagredeSøkEndepunkt = (domene: LagredeSøkDomene) =>
  `${BrukerAPI.internUrl}/lagrede-sok/${domene}`;

export const useHentLagredeSøk = (domene: LagredeSøkDomene) =>
  useSWRGet(lagredeSøkEndepunkt(domene), z.array(lagretSøkSchema), {
    nonImmutable: true,
  });

export const opprettLagretSøk = async (
  domene: LagredeSøkDomene,
  søk: LagreSøkDTO,
) =>
  lagretSøkSchema.parse(
    await postApi(lagredeSøkEndepunkt(domene), søk, {
      skjulFeilmelding: [400, 409],
    }),
  );

export const erstattLagretSøk = async (
  domene: LagredeSøkDomene,
  id: string,
  søk: LagreSøkDTO,
) =>
  lagretSøkSchema.parse(
    await putApi(`${lagredeSøkEndepunkt(domene)}/${id}`, søk, {
      skjulFeilmelding: [400, 404],
    }),
  );

/** Flytter standardvalget til søket med `id`, eller til vanlig søk med `null`. */
export const velgStandard = async (
  domene: LagredeSøkDomene,
  id: string | null,
) =>
  putApi(
    `${lagredeSøkEndepunkt(domene)}/standard`,
    { id },
    {
      skjulFeilmelding: [404],
    },
  );

export const slettLagretSøk = async (domene: LagredeSøkDomene, id: string) =>
  deleteApi(`${lagredeSøkEndepunkt(domene)}/${id}`, undefined, {
    skjulFeilmelding: [404],
  });

/** Fornyer fristen og gir 404 hvis søket er utløpt eller slettet. Kalles før søket tas i bruk. */
export const registrerBrukAvLagretSøk = async (
  domene: LagredeSøkDomene,
  id: string,
) =>
  lagretSøkSchema.parse(
    await postApi(
      `${lagredeSøkEndepunkt(domene)}/${id}/bruk`,
      {},
      {
        skjulFeilmelding: [404],
      },
    ),
  );
