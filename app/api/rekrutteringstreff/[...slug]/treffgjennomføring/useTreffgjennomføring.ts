import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { z } from 'zod';

const TreffgjennomføringFaseSchema = z.enum([
  'OPPMØTE',
  'ROM',
  'INTERESSE',
  'FORDELING',
  'VURDERING',
]);

const VurderingsvalgSchema = z.enum(['AKTUELL', 'KANSKJE', 'IKKE_AKTUELL']);

const RomSchema = z.object({
  romnummer: z.number().int().min(1),
  jobbsøkere: z.array(z.string()),
});

const DeltakernummerSchema = z.object({
  personTreffId: z.string(),
  nummer: z.number().int().min(1),
});

export const RomfordelingSchema = z.array(RomSchema);

const KLOKKESLETT_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

export const MøteoppsettSchema = z.object({
  starttidspunkt: z.string().regex(KLOKKESLETT_REGEX),
  varighetPerMøteMinutter: z.number().int().min(1),
});

const ArbeidsgiverRotasjonSchema = z.object({
  arbeidsgiverTreffId: z.string(),
  startPosisjon: z.number(),
});

const InteresseSchema = z.object({
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

const DATO_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export const VurderingSchema = z.object({
  personTreffId: z.string(),
  arbeidsgiverTreffId: z.string(),
  vurdering: VurderingsvalgSchema.nullable()
    .optional()
    .default(null)
    .catch(null),
  notater: z.array(z.string()).optional().default([]).catch([]),
  andregangsintervju: z.boolean().optional().default(false),
  andregangsintervjuDato: z
    .string()
    .regex(DATO_REGEX)
    .nullable()
    .optional()
    .default(null)
    .catch(null),
  jobbtilbud: z.boolean().optional().default(false),
});

export const TreffgjennomføringSchema = z.object({
  rekrutteringstreffId: z.string(),
  fase: TreffgjennomføringFaseSchema,
  antallRom: z.number().int().min(1),
  starttidspunkt: z.string().regex(KLOKKESLETT_REGEX),
  varighetPerMøteMinutter: z.number(),
  oppmøte: z.array(z.string()),

  deltakernummer: z
    .array(DeltakernummerSchema)
    .optional()
    .default([])
    .catch([]),
  rom: RomfordelingSchema,
  arbeidsgiverRekkefølge: z.array(ArbeidsgiverRotasjonSchema),
  interesser: z.array(InteresseSchema),
  intervjufordelinger: z.array(ArbeidsgiverIntervjufordelingSchema),
  vurderinger: z.array(VurderingSchema),
});

export type TreffgjennomføringFase = z.infer<
  typeof TreffgjennomføringFaseSchema
>;
export type MøteoppsettDTO = z.infer<typeof MøteoppsettSchema>;
export type Vurderingsvalg = z.infer<typeof VurderingsvalgSchema>;
export type RomDTO = z.infer<typeof RomSchema>;
export type DeltakernummerDTO = z.infer<typeof DeltakernummerSchema>;
export type ArbeidsgiverRotasjonDTO = z.infer<
  typeof ArbeidsgiverRotasjonSchema
>;
export type InteresseDTO = z.infer<typeof InteresseSchema>;
export type ArbeidsgiverIntervjufordelingDTO = z.infer<
  typeof ArbeidsgiverIntervjufordelingSchema
>;
export type VurderingDTO = z.infer<typeof VurderingSchema>;
export type TreffgjennomføringDTO = z.infer<typeof TreffgjennomføringSchema>;

export const harRegistrertNoe = (vurdering: VurderingDTO) =>
  vurdering.vurdering !== null ||
  vurdering.notater.length > 0 ||
  vurdering.andregangsintervju ||
  vurdering.andregangsintervjuDato !== null ||
  vurdering.jobbtilbud;

export const treffgjennomføringEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/treffgjennomforing-og-oppfolging`;

export const treffgjennomføringOppdaterEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/treffgjennomforing`;

export const oppfølgingOppdaterEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/oppfolging`;

export const useTreffgjennomføring = (id: string | undefined) =>
  useSWRGet(
    id ? treffgjennomføringEndepunkt(id) : null,
    TreffgjennomføringSchema,
  );
