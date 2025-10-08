import { z } from 'zod';

export type StillingsDataDTO = z.infer<typeof StillingDataSchema>;
export type GeografiDTO = z.infer<typeof LocationSchema>;
export type ContactSchemaDTO = z.infer<typeof ContactSchema>;
export type CategorySchemaDTO = z.infer<typeof KategoriSchema>;
export type StillingsinfoDTO = z.infer<typeof StillingsinfoSchema>;

// Egendefinert
export const searchtagSchema = z.object({
  label: z.string(),
  score: z.number(),
});

export const propertiesSchema = z
  .object({
    jobarrangement: z.string().optional().nullable(),
    employerhomepage: z.string().optional().nullable(),
    facebookpage: z.string().optional().nullable(),
    linkedinpage: z.string().optional().nullable(),
    twitteraddress: z.string().optional().nullable(),
    jobpercentage: z.string().optional().nullable(),
    jobpercentagerange: z.string().optional().nullable(),
    extent: z.string().optional().nullable(),
    applicationdue: z.string().optional().nullable(),
    jobtitle: z.any().optional().nullable(),
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
    employerdescription: z.union([z.string().nullable().optional()]),
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
    salary: z.any().nullable().optional(),
    industry: z.string().optional().nullable(),
    starttime: z.string().optional().nullable(),
    tags: z.any().nullable().optional(),
    workhours: z.any().nullable().optional(),
    workday: z.any().nullable().optional(),
    applicationemail: z.string().nullish(),
  })
  .nullable();

/// ZOD Schema fra https://github.com/navikt/rekrutteringsbistand-stilling-api/blob/master/src/main/kotlin/no/nav/rekrutteringsbistand/api/stilling/domene.kt
const LocalDateTimeSchema = z.string(); // Assuming LocalDateTime is represented as a string in JSON

const AdministrationSchema = z.object({
  id: z.number().optional().nullable(),
  status: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  reportee: z.string().optional().nullable(),
  remarks: z.array(z.string()).optional().nullable(),
  navIdent: z.string().optional().nullable(),
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

export const LocationSchema = z.object({
  address: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  county: z.string().optional().nullable(),
  // countyCode: z.string().nullable(), // Filtreres bort backend
  municipal: z.string().optional().nullable(),
  municipalCode: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
});

const LocationListSchema = z.array(LocationSchema);
const ArbeidsgiverSchema = z.object({
  id: z.number().nullable(),
  uuid: z.string().nullable(),
  created: z.string().nullable(),
  createdBy: z.string().nullable(),
  updated: z.string().nullable(),
  updatedBy: z.string().nullable(),
  mediaList: z.array(MediaSchema).nullable(),
  contactList: z.array(ContactSchema).nullable(),
  location: LocationSchema.nullable(),
  locationList: z.array(LocationSchema).nullable(),
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
  annonsenr: z.string().optional().nullable(),
  uuid: z.string(),
  created: LocalDateTimeSchema,
  createdBy: z.string(),
  updated: LocalDateTimeSchema,
  updatedBy: z.string(),
  title: z.string(),
  status: z.string().optional().nullable(),
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
  location: LocationSchema.nullable(),
  locationList: LocationListSchema.nullable(),
  categoryList: z.array(KategoriSchema).nullable(),
  properties: propertiesSchema.nullable(),
  publishedByAdmin: z.string().nullable(),
  businessName: z.string().nullable(),
  firstPublished: z.boolean().nullable(),
  deactivatedByExpiry: z.boolean().nullable(),
  activationOnPublishingDate: z.boolean().nullable(),
  versjon: z.int().optional().nullable()
});

const StillingskategoriEnum = z.enum(['STILLING', 'JOBBMESSE', 'FORMIDLING']);

export const StillingsinfoSchema = z.object({
  stillingsid: z.string().optional(),
  stillingsinfoid: z.string().optional(),
  eierNavKontorEnhetId: z.string().optional().nullable(),
  eierNavident: z.string().optional().nullable(),
  eierNavn: z.string().optional().nullable(),
  stillingskategori: StillingskategoriEnum.optional().nullable(),
});

export const StillingDataSchema = z.object({
  stillingsinfo: StillingsinfoSchema.nullable().optional(),
  stilling: StillingSchemaDTO,
});
