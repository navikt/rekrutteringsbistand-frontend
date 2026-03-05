'use client';

import { PamOntologiAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { z } from 'zod';

const pamEndepunkt = (søkeord: string) =>
  PamOntologiAPI.internUrl + `/stillingsTittel?q=${søkeord}`;

export const JanzzTittelSchema = z.object({
  konseptId: z.number(),
  styrk08: z.string(),
  styrk08Label: z.string().optional(),
  esco: z.string(),
  escoLabel: z.string(),
  label: z.string(),
  undertype: z.string(),
});

export const stillingsTittelTreffSchema = z.array(JanzzTittelSchema);

export type JanzzTittelDTO = z.infer<typeof JanzzTittelSchema>;

export const useStillingsTittel = (søkeOrd?: string) =>
  useSWRGet(søkeOrd ? pamEndepunkt(søkeOrd) : null, stillingsTittelTreffSchema);
