'use client';

import { PamOntologiBegrepSchema } from '../schema';
import { PamOntologiAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { z } from 'zod';

const pamEndepunkt = (søkeord: string) =>
  PamOntologiAPI.internUrl + `/stillingsTittel?q=${søkeord}`;

export const JanzzTittelSchema = PamOntologiBegrepSchema;

export const stillingsTittelTreffSchema = z.array(PamOntologiBegrepSchema);

export type JanzzTittelDTO = z.infer<typeof JanzzTittelSchema>;

export const useStillingsTittel = (søkeOrd?: string) =>
  useSWRGet(søkeOrd ? pamEndepunkt(søkeOrd) : null, stillingsTittelTreffSchema);
