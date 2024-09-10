import { z } from 'zod';

export const shardsSchema = z.object({
  total: z.number(),
  successful: z.number(),
  skipped: z.number(),
  failed: z.number(),
});

export const totalSchema = z.object({
  value: z.number(),
  relation: z.string(),
});

export const locationSchema = z.object({
  address: z.string().optional().nullable().nullable(),
  postalCode: z.string().optional().nullable().nullable(),
  city: z.string().optional().nullable().nullable(),
  county: z.string().optional().nullable().nullable(),
  countyCode: z.string().nullable().nullable(),
  municipal: z.string().optional().nullable().nullable(),
  municipalCode: z.string().optional().nullable().nullable(),
  latitue: z.string().optional().nullable().nullable(),
  longitude: z.string().optional().nullable().nullable(),
  country: z.string(),
});

export const administrationSchema = z.object({
  status: z.string(),
  remarks: z.array(z.any()),
  comments: z.string(),
  reportee: z.string(),
  navIdent: z.string(),
});

export const searchtagSchema = z.object({
  label: z.string(),
  score: z.number(),
});

export const contactSchema = z.object({
  name: z.string(),
  role: z.string(),
  title: z.string(),
  email: z.string(),
  phone: z.string(),
});

export const propertiesSchema = z
  .object({
    extent: z.string().optional().nullable(),
    applicationdue: z.string().optional().nullable(),
    jobtitle: z.any(),
    keywords: z.string().optional().nullable(),
    positioncount: z.number().optional().nullable(),
    engagementtype: z.string().optional().nullable(),
    classification_styrk08_score: z.number().optional().nullable(),
    employerdescription: z.string().optional().nullable(),
    adtext: z.string(),
    classification_styrk08_code: z.any().optional().nullable(),
    sourceurl: z.string().optional().nullable(),
    searchtags: z.array(searchtagSchema).optional().nullable(),
    applicationurl: z.string().optional().nullable(),
    classification_esco_code: z.string().optional().nullable(),
    classification_input_source: z.string().optional().nullable(),
    sector: z.string().optional().nullable(),
    // workLanguage: z.string().optional().nullable(),
    employerhomepage: z.string().optional().nullable(),
    salary: z.any(),
    industry: z.string().optional().nullable(),
    starttime: z.string().optional().nullable(),
    tags: z.any().nullable(),
  })
  .nullable();

export const stillingSchema = z.object({
  title: z.string(),
  uuid: z.string(),
  annonsenr: z.string(),
  status: z.string(),
  privacy: z.string(),
  published: z.string(),
  publishedByAdmin: z.string().nullable(), //TODO skal denne være nullable?
  expires: z.string(),
  created: z.string(),
  updated: z.string(),
  employer: z.any(),
  categories: z.array(z.any()),
  source: z.string(),
  medium: z.string(),
  businessName: z.string(),
  locations: z.array(locationSchema),
  reference: z.string(),
  administration: administrationSchema,
  properties: propertiesSchema.nullable(),
  contacts: z.array(contactSchema),
  styrkEllerTittel: z.string(),
});

export const stillingSourceSchema = z.object({
  stilling: stillingSchema,
  stillingsinfo: z.any(),
});

export const hitSchema = z.object({
  _index: z.string(),
  _type: z.string(),
  _id: z.string(),
  _score: z.any(),
  _source: stillingSourceSchema,
  sort: z.array(z.number()),
});

export const hitsSchema = z.object({
  total: totalSchema,
  max_score: z.any(),
  hits: z.array(hitSchema),
});

export const stillingsSøkDTOSchema = z.object({
  took: z.number(),
  timed_out: z.boolean(),
  _shards: shardsSchema,
  hits: hitsSchema,
});
