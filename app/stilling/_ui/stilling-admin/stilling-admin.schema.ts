import { navnSchema } from '@/app/api/kandidat-sok/useKandidatNavn';
import {
  StillingSchemaDTO,
  StillingsinfoSchema,
} from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import z from 'zod';

const formidlingKandidaterSchema = navnSchema.extend({
  fnr: z.string(),
});

export const StillingAdminSchema = z
  .object({
    stillingsinfo: StillingsinfoSchema.nullable().optional(),
    stilling: StillingSchemaDTO.nullable().optional(),
    formidlingKandidater: z
      .array(formidlingKandidaterSchema)
      .default([])
      .optional()
      .nullable(),
  })
  .superRefine((data, ctx) => {
    // Valider kontaktpersoner dersom de finnes
    const contacts = data?.stilling?.contactList as
      | Array<{
          name?: string | null;
          title?: string | null;
          email?: string | null;
          phone?: string | null;
        }>
      | undefined;
    if (!contacts || contacts.length === 0) return;

    contacts.forEach((c, i) => {
      const nameOk = typeof c?.name === 'string' && c.name.trim().length > 0;
      const titleOk = typeof c?.title === 'string' && c.title.trim().length > 0;
      const emailOk = typeof c?.email === 'string' && c.email.trim().length > 0;
      const digits =
        typeof c?.phone === 'string' ? c.phone.replace(/\D/g, '') : '';
      const phoneOk = digits.length === 8; // 8 siffer

      if (!nameOk) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Navn er påkrevd',
          path: ['stilling', 'contactList', i, 'name'],
        });
      }
      if (!titleOk) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Tittel er påkrevd',
          path: ['stilling', 'contactList', i, 'title'],
        });
      }
      if (!emailOk && !phoneOk) {
        // Legg samme feilmelding på begge feltene for å gjøre det tydelig i UI
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Oppgi e-post eller et gyldig telefonnummer (8 siffer)',
          path: ['stilling', 'contactList', i, 'email'],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Oppgi e-post eller et gyldig telefonnummer (8 siffer)',
          path: ['stilling', 'contactList', i, 'phone'],
        });
      }
    });
  });
