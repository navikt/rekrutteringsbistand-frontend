import { navnSchema } from '@/app/api/kandidat-sok/useKandidatNavn';
import { decoratorSchema } from '@/app/api/modia/decorator/useDecoratorData';
import {
  StillingSchemaDTO,
  StillingsinfoSchema,
} from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import z from 'zod';
import { validerEpost } from '@/util/validerEpost';
import { validerTelefonnummer } from '@/util/validerTelefonnummer';

const formidlingKandidaterSchema = navnSchema.extend({
  fnr: z.string(),
});

export const StillingAdminSchema = z
  .object({
    stillingsinfo: StillingsinfoSchema.nullable().optional(),
    stilling: StillingSchemaDTO.nullable().optional(),
    brukerData: decoratorSchema.nullable().optional(),
    navKontorEnhet: z.string().nullable().optional(),
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
      const email = c?.email?.trim() ?? '';
      const telefonnummer = c?.phone?.trim() ?? '';
      const nameOk = typeof c?.name === 'string' && c.name.trim().length > 0;
      const titleOk = typeof c?.title === 'string' && c.title.trim().length > 0;
      const emailOk = email.length > 0;
      const phoneOk = telefonnummer.length > 0;

      if (!nameOk) {
        ctx.addIssue({
          code: 'custom',
          message: 'Navn er påkrevd',
          path: ['stilling', 'contactList', i, 'name'],
        });
      }
      if (!titleOk) {
        ctx.addIssue({
          code: 'custom',
          message: 'Tittel er påkrevd',
          path: ['stilling', 'contactList', i, 'title'],
        });
      }
      if (!emailOk && !phoneOk) {
        // Legg samme feilmelding på begge feltene for å gjøre det tydelig i UI
        ctx.addIssue({
          code: 'custom',
          message: 'Oppgi e-post eller et gyldig telefonnummer (8 siffer)',
          path: ['stilling', 'contactList', i, 'email'],
        });
        ctx.addIssue({
          code: 'custom',
          message: 'Oppgi e-post eller et gyldig telefonnummer (8 siffer)',
          path: ['stilling', 'contactList', i, 'phone'],
        });
      }
      if (emailOk) {
        const epostValidering = validerEpost(email);
        if (!epostValidering.erGodkjent) {
          ctx.addIssue({
            code: 'custom',
            message: epostValidering.feilmelding,
            path: ['stilling', 'contactList', i, 'email'],
          });
        }
      }
      if (phoneOk) {
        const tlfValidering = validerTelefonnummer(telefonnummer);
        if (!tlfValidering.erGodkjent) {
          ctx.addIssue({
            code: 'custom',
            message: tlfValidering.feilmelding,
            path: ['stilling', 'contactList', i, 'phone'],
          });
        }
      }
    });
  });
