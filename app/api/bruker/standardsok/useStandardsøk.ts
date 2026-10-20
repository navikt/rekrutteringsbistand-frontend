'use client';

import { BrukerAPI } from '@/app/api/api-routes';
import {
  type LagreStandardsøkDTO,
  type StandardsøkDomene,
  standardsøkSchema,
} from '@/app/api/bruker/standardsok/standardsøkTyper';
import { deleteApi, postApi, putApi } from '@/app/api/fetcher';
import { useSWRGet } from '@/app/api/useSWRGet';
import { z } from 'zod';

export const standardsøkEndepunkt = (domene: StandardsøkDomene) =>
  `${BrukerAPI.internUrl}/standardsok/${domene}`;

export const useStandardsøk = (domene: StandardsøkDomene) =>
  useSWRGet(standardsøkEndepunkt(domene), z.array(standardsøkSchema), {
    nonImmutable: true,
  });

export const opprettStandardsøk = async (
  domene: StandardsøkDomene,
  søk: LagreStandardsøkDTO,
) =>
  standardsøkSchema.parse(
    await postApi(standardsøkEndepunkt(domene), { ...søk }, {
      skjulFeilmelding: [400, 409],
    }),
  );

export const erstattStandardsøk = async (
  domene: StandardsøkDomene,
  id: string,
  søk: LagreStandardsøkDTO,
) =>
  standardsøkSchema.parse(
    await putApi(`${standardsøkEndepunkt(domene)}/${id}`, { ...søk }, {
      skjulFeilmelding: [400, 404],
    }),
  );

export const settSomStandardsøk = async (
  domene: StandardsøkDomene,
  id: string,
) =>
  putApi(`${standardsøkEndepunkt(domene)}/${id}/standard`, {}, {
    skjulFeilmelding: [404],
  });

export const slettStandardsøk = async (domene: StandardsøkDomene, id: string) =>
  deleteApi(`${standardsøkEndepunkt(domene)}/${id}`, undefined, {
    skjulFeilmelding: [404],
  });

/** Fornyer fristen og gir 404 hvis søket er utløpt eller slettet. Kalles før søket tas i bruk. */
export const registrerBrukAvStandardsøk = async (
  domene: StandardsøkDomene,
  id: string,
) =>
  standardsøkSchema.parse(
    await postApi(`${standardsøkEndepunkt(domene)}/${id}/bruk`, {}, {
      skjulFeilmelding: [404],
    }),
  );
