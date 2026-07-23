import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { z } from 'zod';

// Kontrakt for WorkOp-møtedag (oppmøte, romfordeling, ønsker, fordeling, vurdering).
// Speiler den framtidige backend-formen, men serves foreløpig av MSW-mock.
const MøtedagFaseSchema = z.enum([
  'OPPMØTE',
  'ROM',
  'ØNSKER',
  'FORDELING',
  'VURDERING',
]);

const SpeedintervjuVurderingSchema = z.enum(['AKTUELL', 'KANSKJE', 'KLADD']);

const RomSchema = z.object({
  romnummer: z.number(),
  jobbsøkere: z.array(z.string()),
});

const ArbeidsgiverRotasjonSchema = z.object({
  arbeidsgiverTreffId: z.string(),
  startPosisjon: z.number(),
});

const ØnskeSchema = z.object({
  personTreffId: z.string(),
  arbeidsgiverTreffId: z.string(),
});

const UnikPersonTreffIdListeSchema = z
  .array(z.string())
  .refine((ider) => new Set(ider).size === ider.length, {
    message: 'En jobbsøker kan bare forekomme én gang i listen.',
  });

export const ArbeidsgiverIntervjufordelingSchema = z
  .object({
    arbeidsgiverTreffId: z.string(),
    inkludertePersonTreffIder: UnikPersonTreffIdListeSchema,
    ekskludertePersonTreffIder: UnikPersonTreffIdListeSchema,
  })
  .superRefine((fordeling, context) => {
    const inkluderte = new Set(fordeling.inkludertePersonTreffIder);
    fordeling.ekskludertePersonTreffIder.forEach((personTreffId, indeks) => {
      if (inkluderte.has(personTreffId)) {
        context.addIssue({
          code: 'custom',
          message: 'En jobbsøker kan ikke være både inkludert og ekskludert.',
          path: ['ekskludertePersonTreffIder', indeks],
        });
      }
    });
  });

export const VurderingSchema = z.object({
  personTreffId: z.string(),
  arbeidsgiverTreffId: z.string(),
  vurdering: SpeedintervjuVurderingSchema.nullable().optional().default(null),
  andreIntervju: z.boolean().optional().default(false),
  jobbtilbud: z.boolean().optional().default(false),
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
  intervjufordelinger: z.array(ArbeidsgiverIntervjufordelingSchema),
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
export type ArbeidsgiverIntervjufordelingDTO = z.infer<
  typeof ArbeidsgiverIntervjufordelingSchema
>;
export type VurderingDTO = z.infer<typeof VurderingSchema>;
export type MøtedagDTO = z.infer<typeof MøtedagSchema>;

export const møtedagEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/motedag`;

export const useMøtedag = (id: string | undefined) =>
  useSWRGet(id ? møtedagEndepunkt(id) : null, MøtedagSchema);
