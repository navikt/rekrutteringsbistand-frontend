import { z } from 'zod';
import { StillingPropertiesSchema } from './stillingPropertiesSchema.zod';

export type StillingSchemaDTO = z.infer<typeof StillingSchema>;
const ContactSchema = z.object({
  name: z.string(),
  role: z.string(),
  title: z.string(),
  email: z.string(),
  phone: z.string(),
});

const AdministrationSchema = z.object({
  status: z.string(),
  remarks: z.array(z.string()),
  comments: z.string(),
  reportee: z.string(),
  navIdent: z.string(),
});

const EmployerSchema = z.object({
  name: z.string(),
  publicName: z.string(),
  orgnr: z.string().nullable(),
  parentOrgnr: z.string().nullable(),
  orgform: z.string(),
});

const StyrkCategorySchema = z.object({
  styrkCode: z.string(),
  name: z.string(),
});

const LocationSchema = z.object({
  address: z.string().nullable(),
  postalCode: z.string().nullable(),
  city: z.string().nullable(),
  county: z.string().nullable(),
  countyCode: z.string().nullable(),
  municipal: z.string().nullable(),
  municipalCode: z.string().nullable(),
  latitue: z.string().nullable(), // Note: 'latitue' might be a typo for 'latitude'
  longitude: z.string().nullable(),
  country: z.string(),
});

export const StillingSchema = z.object({
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
  employer: EmployerSchema.optional().nullable(),
  categories: z.array(StyrkCategorySchema),
  source: z.string(),
  medium: z.string(),
  businessName: z.string().nullable(),
  locations: z.array(LocationSchema),
  reference: z.string(),
  administration: AdministrationSchema.optional(),
  properties: StillingPropertiesSchema.optional(),
  contacts: z.array(ContactSchema),
});
