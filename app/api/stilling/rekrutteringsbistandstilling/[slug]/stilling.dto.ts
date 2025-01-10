import { z } from 'zod';

export type StillingsDataDTO = z.infer<typeof StillingDataSchema>;
export type GeografiDTO = z.infer<typeof GeografiSchema>;
export type GeografiListDTO = z.infer<typeof GeografiListSchema>;
export type ContactSchemaDTO = z.infer<typeof ContactSchema>;
export type CategorySchemaDTO = z.infer<typeof KategoriSchema>;

// Egendefinert
export const searchtagSchema = z.object({
  label: z.string(),
  score: z.number(),
});

export const propertiesSchema = z
  .object({
    jobpercentage: z.string().optional().nullable(),
    jobpercentagerange: z.string().optional().nullable(),
    extent: z.string().optional().nullable(),
    applicationdue: z.union([z.string(), z.boolean()]).optional().nullable(), // TODO Husk å endre til string?,
    jobtitle: z.any(),
    keywords: z.string().optional().nullable(),
    positioncount: z.union([
      z.number().optional().nullable(),
      z.string().optional().nullable(),
    ]),
    engagementtype: z.string().optional().nullable(),
    classification_styrk08_score: z.union([
      z.number().optional().nullable(),
      z.string().optional().nullable(),
    ]),
    employerdescription: z.union([
      z.string().nullable().optional(),
      z.number().nullable().optional(),
    ]),
    adtext: z.string().optional().nullable(),
    classification_styrk08_code: z.any().optional().nullable(),
    sourceurl: z.string().optional().nullable(),
    searchtags: z.union([
      z.array(searchtagSchema).optional().nullable(),
      z.any(),
      z.string().optional().nullable(),
    ]),
    applicationurl: z.string().optional().nullable(),
    classification_esco_code: z.string().optional().nullable(),
    classification_input_source: z.string().optional().nullable(),
    sector: z.string().optional().nullable(),
    // workLanguage: z.string().optional().nullable(),
    employerhomepage: z.string().optional().nullable(),
    salary: z.any(),
    industry: z.string().optional().nullable(),
    starttime: z.union([z.string(), z.boolean()]).optional().nullable(),
    tags: z.any().nullable(),
    workhours: z.any().nullable(),
    workday: z.any().nullable(),
  })
  .nullable();

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

export const GeografiSchema = z.object({
  address: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable(),
  county: z.string().optional().nullable(),
  municipal: z.string().optional().nullable(),
  municipalCode: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
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
  properties: propertiesSchema.nullable(),
  name: z.string().nullable(),
  orgnr: z.string().nullable(),
  status: z.string().nullable(),
  parentOrgnr: z.string().nullable(),
  publicName: z.string().nullable(),
  deactivated: LocalDateTimeSchema.nullable(),
  orgform: z.string().nullable(),
  employees: z.number().nullable(),
});

export const KategoriSchema = z.object({
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
  location: GeografiSchema.nullable(),
  locationList: GeografiListSchema.nullable(),
  categoryList: z.array(KategoriSchema).nullable(),
  properties: propertiesSchema.nullable(),
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
