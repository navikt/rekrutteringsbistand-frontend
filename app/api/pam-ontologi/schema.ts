import { z } from 'zod';

export const PamOntologiBegrepSchema = z.object({
  konseptId: z.number().nullable(),
  styrk08: z.string(),
  styrk08Label: z.string().optional(),
  esco: z.string(),
  escoLabel: z.string(),
  label: z.string(),
  undertype: z.string(),
});

export type PamOntologiBegrepDTO = z.infer<typeof PamOntologiBegrepSchema>;
