import { z } from 'zod';

const AnsettelsesformJobbonskerSchema = z.object({
  ansettelsesformKode: z.string().nullable().optional(),
  ansettelsesformKodeTekst: z.string().nullable().optional(),
});

export { AnsettelsesformJobbonskerSchema };
