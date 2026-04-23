'use client';

import { PamOntologiAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { z } from 'zod';

const pamEndepunkt = (søkeord: string) =>
  PamOntologiAPI.internUrl + `/personligeEgenskaper?q=${søkeord}`;

export const PersonligEgenskapSchema = z.object({
  konseptId: z.number(),
  styrk08: z.string(),
  styrk08Label: z.string().optional(),
  esco: z.string(),
  escoLabel: z.string(),
  label: z.string(),
  undertype: z.string(),
});

export const personligeEgenskaperSchema = z.array(PersonligEgenskapSchema);

export type PersonligEgenskapDTO = z.infer<typeof PersonligEgenskapSchema>;

export const usePersonligeEgenskaper = (søkeOrd?: string) =>
  useSWRGet(
    søkeOrd && søkeOrd.trim().length >= 2 ? pamEndepunkt(søkeOrd) : null,
    personligeEgenskaperSchema,
  );
