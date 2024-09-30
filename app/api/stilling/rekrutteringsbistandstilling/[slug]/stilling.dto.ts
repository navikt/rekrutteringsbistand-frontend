import { z } from 'zod';

export type StillingsDataDTO = z.infer<typeof StillingDataSchema>;
export type GeografiDTO = z.infer<typeof GeografiSchema>;
export type GeografiListDTO = z.infer<typeof GeografiListSchema>;

/// ZOD Schema fra https://github.com/navikt/rekrutteringsbistand-stilling-api/blob/master/src/main/kotlin/no/nav/rekrutteringsbistand/api/stilling/domene.kt
const LocalDateTimeSchema = z.string(); // Assuming LocalDateTime is represented as a string in JSON

const AdministrationSchema = z.object({
  id: z.number().nullable(),
  status: z.string().nullable(),
  comments: z.string().nullable(),
  reportee: z.string().nullable(),
  remarks: z.array(z.string()).nullable(),
  navIdent: z.string().nullable(),
});

const MediaSchema = z.object({
  mediaLink: z.string().nullable(),
  filename: z.string().nullable(),
});

const ContactSchema = z.object({
  name: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  // role: z.string().nullable(),
  title: z.string().nullable(),
});

const GeografiSchema = z.object({
  address: z.string().nullable(),
  postalCode: z.string().nullable(),
  county: z.string().nullable(),
  municipal: z.string().nullable(),
  municipalCode: z.string().nullable(),
  city: z.string().nullable(),
  country: z.string().nullable(),
  latitude: z.string().nullable(),
  longitude: z.string().nullable(),
});

const GeografiListSchema = z.array(GeografiSchema);
const ArbeidsgiverSchema = z.object({
  id: z.number().nullable(),
  uuid: z.string().nullable(),
  created: z.string().nullable(),
  createdBy: z.string().nullable(),
  updated: z.string().nullable(),
  updatedBy: z.string().nullable(),
  mediaList: z.array(MediaSchema).nullable(),
  contactList: z.array(ContactSchema).nullable(),
  location: GeografiSchema.nullable(),
  locationList: z.array(GeografiSchema).nullable(),
  properties: z.record(z.string()).nullable(),
  name: z.string().nullable(),
  orgnr: z.string().nullable(),
  status: z.string().nullable(),
  parentOrgnr: z.string().nullable(),
  publicName: z.string().nullable(),
  deactivated: LocalDateTimeSchema.nullable(),
  orgform: z.string().nullable(),
  employees: z.number().nullable(),
});

const KategoriSchema = z.object({
  id: z.number().nullable(),
  code: z.string().nullable(),
  categoryType: z.string().nullable(),
  name: z.string().nullable(),
  description: z.string().nullable(),
  parentId: z.number().nullable(),
});

export const StillingSchemaDTO = z.object({
  id: z.number(),
  uuid: z.string(),
  created: LocalDateTimeSchema,
  createdBy: z.string(),
  updated: LocalDateTimeSchema,
  updatedBy: z.string(),
  title: z.string(),
  status: z.string(),
  administration: AdministrationSchema.nullable(),
  mediaList: z.array(MediaSchema).nullable(),
  contactList: z.array(ContactSchema).nullable(),
  privacy: z.string().nullable(),
  source: z.string().nullable(),
  medium: z.string().nullable(),
  reference: z.string().nullable(),
  published: LocalDateTimeSchema.nullable(),
  expires: LocalDateTimeSchema.nullable(),
  employer: ArbeidsgiverSchema.nullable(),
  location: GeografiSchema,
  locationList: GeografiListSchema,
  categoryList: z.array(KategoriSchema).nullable(),
  properties: z.record(z.string()).nullable(),
  publishedByAdmin: z.string().nullable(),
  businessName: z.string().nullable(),
  firstPublished: z.boolean().nullable(),
  deactivatedByExpiry: z.boolean().nullable(),
  activationOnPublishingDate: z.boolean().nullable(),
});

const StillingskategoriEnum = z.enum(['STILLING', 'JOBBMESSE', 'FORMIDLING']);

const StillingsinfoDto = z.object({
  stillingsid: z.string(),
  stillingsinfoid: z.string(),
  eierNavident: z.string().nullable(),
  eierNavn: z.string().nullable(),
  stillingskategori: StillingskategoriEnum.nullable(),
});

export const StillingDataSchema = z.object({
  stillingsinfo: StillingsinfoDto.nullable(),
  stilling: StillingSchemaDTO,
});
