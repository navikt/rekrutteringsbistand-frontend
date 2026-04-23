'use client';

import { PamOntologiAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { z } from 'zod';

const pamEndepunkt = (søkeord: string) =>
  PamOntologiAPI.internUrl + `/samledeKvalifikasjoner?q=${søkeord}`;

export const SamletKvalifikasjonKategoriSchema = z.enum([
  'YRKESTITTEL',
  'KOMPETANSE',
  'AUTORISASJON',
  'FAGDOKUMENTASJON',
  'FORERKORT',
]);

export const SamletKvalifikasjonSchema = z.object({
  konseptId: z.number().nullable(),
  styrk08: z.string(),
  styrk08Label: z.string(),
  esco: z.string(),
  escoLabel: z.string(),
  label: z.string(),
  undertype: z.string(),
  kategori: SamletKvalifikasjonKategoriSchema,
});

export const samledeKvalifikasjonerSchema = z.array(SamletKvalifikasjonSchema);

export type SamletKvalifikasjonKategori = z.infer<
  typeof SamletKvalifikasjonKategoriSchema
>;
export type SamletKvalifikasjonDTO = z.infer<typeof SamletKvalifikasjonSchema>;

export const useSamledeKvalifikasjoner = (søkeOrd?: string) =>
  useSWRGet(
    søkeOrd && søkeOrd.trim().length >= 2 ? pamEndepunkt(søkeOrd) : null,
    samledeKvalifikasjonerSchema,
  );
