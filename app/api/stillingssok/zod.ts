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
  address: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  county: z.string().optional(),
  countyCode: z.string().nullable(),
  municipal: z.string().optional(),
  municipalCode: z.string().optional(),
  latitue: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
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

export const propertiesSchema = z.object({
  extent: z.string().optional(),
  applicationdue: z.string().optional(),
  jobtitle: z.any(),
  keywords: z.string().optional(),
  positioncount: z.number().optional(),
  engagementtype: z.string().optional(),
  classification_styrk08_score: z.number().optional(),
  employerdescription: z.string().optional(),
  adtext: z.string(),
  classification_styrk08_code: z.number().optional(),
  sourceurl: z.string().optional(),
  searchtags: z.array(searchtagSchema).optional(),
  applicationurl: z.string().optional(),
  classification_esco_code: z.string().optional(),
  classification_input_source: z.string().optional(),
  sector: z.string().optional(),
  workLanguage: z.array(z.string()).optional(),
  employerhomepage: z.string().optional(),
  salary: z.any(),
  industry: z.string().optional(),
  starttime: z.string().optional(),
});

export const stillingSchema = z.object({
  title: z.string(),
  uuid: z.string(),
  annonsenr: z.string(),
  status: z.string(),
  privacy: z.string(),
  published: z.string(),
  publishedByAdmin: z.string(),
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
  properties: propertiesSchema,
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
