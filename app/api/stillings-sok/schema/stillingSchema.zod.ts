import { ESStillingPropertiesSchema } from './stillingPropertiesSchema.zod';
import { LocationSchema } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { z } from 'zod';

export type ESStillingSchemaDTO = z.infer<typeof ESStillingSchema>;
const ContactSchema = z.object({
  name: z.string(),
  role: z.string(),
  title: z.string(),
  email: z.string(),
  phone: z.string(),
});

const ESAdministrationSchema = z.object({
  status: z.string(),
  remarks: z.array(z.string()),
  comments: z.string(),
  reportee: z.string(),
  navIdent: z.string(),
});

const ESEmployerSchema = z.object({
  name: z.string(),
  publicName: z.string(),
  orgnr: z.string().nullable(),
  parentOrgnr: z.string().nullable(),
  orgform: z.string(),
});

const ESStyrkCategorySchema = z.object({
  styrkCode: z.string(),
  name: z.string(),
});

export const ESStillingSchema = z.object({
  tittel: z.string(),
  uuid: z.string(),
  annonsenr: z.string().nullable(),
  status: z.string(),
  privacy: z.string(),
  published: z.string().nullable(),
  publishedByAdmin: z.string().nullable(),
  expires: z.string().nullable(),
  created: z.string(),
  updated: z.string(),
  employer: ESEmployerSchema.optional().nullable(),
  categories: z.array(ESStyrkCategorySchema),
  source: z.string(),
  medium: z.string(),
  businessName: z.string().nullable(),
  locations: z.array(LocationSchema),
  reference: z.string(),
  administration: ESAdministrationSchema.optional(),
  properties: ESStillingPropertiesSchema.optional(),
  contacts: z.array(ContactSchema),
});
