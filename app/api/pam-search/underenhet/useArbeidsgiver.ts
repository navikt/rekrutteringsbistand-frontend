'use client';

import { PamSearchAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { z } from 'zod';

const finnArbeidsgiverEndepunkt = (søkeord: string) => {
  return PamSearchAPI.internUrl + `/underenhet?q=${søkeord}`;
};

const ArbeidsgiverAdresseSchema = z
  .object({
    land: z.string(),
    landkode: z.string(),
    kommune: z.string(),
    kommunenummer: z.string(),
    poststed: z.string(),
    postnummer: z.string(),
    adresse: z.string(),
  })
  .nullable();

export const NæringskodeSchema = z.object({
  kode: z.string(),
  beskrivelse: z.string(),
});

export const ArbeidsgiverSchema = z.object({
  organisasjonsnummer: z.string(),
  navn: z.string(),
  organisasjonsform: z.string(),
  antallAnsatte: z.number().optional().nullable(),
  overordnetEnhet: z.string().optional().nullable(),
  adresse: ArbeidsgiverAdresseSchema.optional(),
  naringskoder: z.array(NæringskodeSchema).optional().nullable(),
});
const ArbeidsgiverSchemaDTO = z.array(ArbeidsgiverSchema);

export type NæringskodeDTO = z.infer<typeof NæringskodeSchema>;
export type ArbeidsgiverDTO = z.infer<typeof ArbeidsgiverSchema>;
export type ArbeidsgiverAdresseDTO = z.infer<typeof ArbeidsgiverAdresseSchema>;

export const useFinnArbeidsgiver = (søkeord?: string) =>
  useSWRGet(
    søkeord ? finnArbeidsgiverEndepunkt(søkeord) : null,
    ArbeidsgiverSchemaDTO,
    { elastic: true },
  );
