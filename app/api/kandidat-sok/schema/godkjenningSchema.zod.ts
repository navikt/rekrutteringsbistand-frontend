import { z } from 'zod';

const GodkjenningSchema = z.object({
  tittel: z.string().nullable().optional(),
  utsteder: z.string().nullable().optional(),
  gjennomfoert: z.string().nullable().optional(), // Date as ISO string
  utloeper: z.string().nullable().optional(), // Date as ISO string
  konseptId: z.string().nullable().optional(),
});

export type GodkjenningSchemaDTO = z.infer<typeof GodkjenningSchema>;
export { GodkjenningSchema };
