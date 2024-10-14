import { z } from 'zod';

const PerioderMedInaktivitetSchema = z.object({
  startdatoForInnevarendeInaktivePeriode: z.string().nullable().optional(), // Date as ISO string
  sluttdatoerForInaktivePerioderPaToArEllerMer: z
    .array(z.string())
    .nullable()
    .optional(),
});

export { PerioderMedInaktivitetSchema };
