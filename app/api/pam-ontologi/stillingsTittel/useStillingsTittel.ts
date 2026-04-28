'use client';

import { PamOntologiAPI } from '@/app/api/api-routes';
import { PamOntologiBegrepSchema } from '@/app/api/pam-ontologi/schema';
import { useSWRGet } from '@/app/api/useSWRGet';
import { z } from 'zod';

const pamEndepunkt = (søkeord: string) =>
  PamOntologiAPI.internUrl + `/stillingsTittel?q=${søkeord}`;

export const JanzzTittelSchema = PamOntologiBegrepSchema;

export const stillingsTittelTreffSchema = z.array(JanzzTittelSchema);

export type JanzzTittelDTO = z.infer<typeof JanzzTittelSchema>;

export const useStillingsTittel = (søkeOrd?: string) =>
  useSWRGet(søkeOrd ? pamEndepunkt(søkeOrd) : null, stillingsTittelTreffSchema);
