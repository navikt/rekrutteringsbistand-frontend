'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { z } from 'zod';

// Kontrakt for WorkOp-møtedag (oppmøte, romfordeling, ønsker, vurdering).
// Speiler den framtidige backend-formen, men serves foreløpig av MSW-mock.

export const MøtedagFaseSchema = z.enum([
  'OPPMØTE',
  'ROM',
  'ØNSKER',
  'FORDELING',
  'VURDERING',
]);

export const SpeedintervjuVurderingSchema = z.enum([
  'AKTUELL',
  'KANSKJE',
  'KLADD',
]);

export const RomSchema = z.object({
  romnummer: z.number(),
  jobbsøkere: z.array(z.string()),
});

export const ArbeidsgiverRotasjonSchema = z.object({
  arbeidsgiverTreffId: z.string(),
  startPosisjon: z.number(),
});

export const ØnskeSchema = z.object({
  personTreffId: z.string(),
  arbeidsgiverTreffId: z.string(),
});

export const SpeedintervjuTildelingSchema = z.object({
  personTreffId: z.string(),
  arbeidsgiverTreffId: z.string(),
});

export const VurderingSchema = z.object({
  personTreffId: z.string(),
  arbeidsgiverTreffId: z.string(),
  vurdering: SpeedintervjuVurderingSchema,
});

export const MøtedagSchema = z.object({
  rekrutteringstreffId: z.string(),
  fase: MøtedagFaseSchema,
  antallRom: z.number(),
  starttidspunkt: z.string(),
  varighetPerMøteMinutter: z.number(),
  pauseMellomMøterMinutter: z.number(),
  oppmøte: z.array(z.string()),
  rom: z.array(RomSchema),
  arbeidsgiverRekkefølge: z.array(ArbeidsgiverRotasjonSchema),
  ønsker: z.array(ØnskeSchema),
  tildelinger: z.array(SpeedintervjuTildelingSchema),
  vurderinger: z.array(VurderingSchema),
});

export type MøtedagFase = z.infer<typeof MøtedagFaseSchema>;
export type SpeedintervjuVurdering = z.infer<
  typeof SpeedintervjuVurderingSchema
>;
export type RomDTO = z.infer<typeof RomSchema>;
export type ArbeidsgiverRotasjonDTO = z.infer<
  typeof ArbeidsgiverRotasjonSchema
>;
export type ØnskeDTO = z.infer<typeof ØnskeSchema>;
export type SpeedintervjuTildelingDTO = z.infer<
  typeof SpeedintervjuTildelingSchema
>;
export type VurderingDTO = z.infer<typeof VurderingSchema>;
export type MøtedagDTO = z.infer<typeof MøtedagSchema>;

export const møtedagEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/motedag`;

export const useMøtedag = (id: string | undefined) =>
  useSWRGet(id ? møtedagEndepunkt(id) : null, MøtedagSchema);
