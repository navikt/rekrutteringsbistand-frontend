'use client';

import { PamOntologiAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

const pamEndepunkt = (søkeord: string) =>
  PamOntologiAPI.internUrl + `/kompetansenavn?q=${søkeord}`;

export const JanzzKompetanseSchema = z.object({
  konseptId: z.number(),
  styrk08: z.string(),
  styrk08Label: z.string(),
  esco: z.string(),
  escoLabel: z.string(),
  label: z.string(),
  undertype: z.string(),
});

export const kompetanseTreffSchema = z.array(JanzzKompetanseSchema);

export const useKompetanse = (søkeOrd?: string) =>
  useSWRGet(søkeOrd ? pamEndepunkt(søkeOrd) : null, kompetanseTreffSchema);

export const kompetanseMSWHandler = http.get(
  PamOntologiAPI.internUrl + `/kompetansenavn`,
  () =>
    HttpResponse.json([
      {
        konseptId: 175819,
        styrk08: '',
        styrk08Label: '',
        esco: '',
        escoLabel: '',
        label: 'Gracenote',
        undertype: '',
      },
      {
        konseptId: 216011,
        styrk08: '',
        styrk08Label: '',
        esco: '',
        escoLabel: '',
        label: 'Fange dyr i feller',
        undertype: '',
      },
      {
        konseptId: 109237,
        styrk08: '',
        styrk08Label: '',
        esco: '',
        escoLabel: '',
        label: 'Sauehold',
        undertype: '',
      },
      {
        konseptId: 109437,
        styrk08: '',
        styrk08Label: '',
        esco: '',
        escoLabel: '',
        label: 'Test av returvare',
        undertype: '',
      },
    ]),
);
