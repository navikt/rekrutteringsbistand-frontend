import { z } from 'zod';

const ESSearchTagSchema = z.object({
  label: z.string(),
  score: z.number(),
});

const ESOntologyJobtitleSchema = z.object({
  konseptId: z.number(),
  label: z.string(),
  styrk08: z.string(),
});

export const ESStillingPropertiesSchema = z.object({
  adtext: z.string().nullish(),
  sourceurl: z.string().nullish(),
  applicationdue: z.string().nullish(),
  applicationemail: z.string().nullish(),
  applicationmail: z.string().nullish(),
  applicationlabel: z.union([z.string(), z.number()]).nullish(),
  applicationurl: z.string().nullish(),
  employer: z.string().nullish(),
  employerdescription: z.union([z.string(), z.number()]).nullish(),
  employerhomepage: z.string().nullish(),
  engagementtype: z.string().nullish(),
  extent: z.string().nullish(),
  occupation: z.string().nullish(),
  positioncount: z.number().nullish(),
  salary: z.number().nullish(),
  starttime: z.string().nullish(),
  role: z.string().nullish(),
  sector: z.string().nullish(),
  location: z.string().nullish(),
  externalref: z.union([z.string(), z.number()]).nullish(),
  jobtitle: z.string().nullish(),
  keywords: z.string().nullish().nullable(),
  sourcecreated: z.string().nullish(),
  sourceupdated: z.string().nullish(),
  logomain: z.string().nullish(),
  logolisting: z.string().nullish(),
  author: z.string().nullish(),
  address: z.union([z.string(), z.number()]).nullish(),
  industry: z.string().nullish(),
  nace2: z.any().nullish(),
  searchtags: z.array(ESSearchTagSchema).nullish(),
  searchtagsai: z.array(z.string()).nullish(),
  classification_styrk08_score: z.number().nullish(),
  classification_input_source: z.string().nullish(),
  classification_styrk08_code: z.union([z.number(), z.string()]).nullish(),
  classification_esco_code: z.string().nullish(),
  categories: z.array(z.any()).nullish(), // Replace with specific schema if known
  euresflagg: z.union([z.string(), z.boolean()]).nullish(),
  hasInterestform: z.union([z.string(), z.boolean(), z.number()]).nullish(),
  remote: z.string().nullish(),
  workLanguage: z.union([z.string(), z.array(z.string())]).nullish(),
  finnSource: z.string().nullish(),
  adtextFormat: z.string().nullish(),
  tags: z.array(z.string()).nullish(),
  ontologyJobtitle: ESOntologyJobtitleSchema.nullish(),
  workschedule: z.union([z.string(), z.array(z.string())]).nullish(),
  workhours: z.union([z.string(), z.array(z.string())]).nullish(),
  workday: z.union([z.string(), z.array(z.string())]).nullish(),
  facebookpage: z.string().nullish(),
  contactperson: z.string().nullish(),
  contactpersontitle: z.string().nullish(),
  contactpersonemail: z.string().nullish(),
  contactpersonphone: z.string().nullish(),
  linkedinpage: z.string().nullish(),
  jobpercentage: z.union([z.string(), z.number()]).nullish(),
  jobpercentagerange: z.string().nullish(),
  jobarrangement: z.string().nullish(),
  twitteraddress: z.string().nullish(),
  admintags: z.string().nullish(),
  arbeidsplassenoccupation: z.string().nullish(),
  needDriversLicense: z.boolean().nullish(),
  experience: z.string().nullish(),
  copyOfExistingAd: z.string().nullish(),
  under18: z.string().nullish(),
  education: z.array(z.string()).nullish(),
  certificate: z.string().nullish(),
  expertise: z.string().nullish(),
  practice: z.string().nullish(),
  hardrequirements: z.any().nullish(), // Replace with specific schema if known
  softrequirements: z.any().nullish(), // Replace with specific schema if known
  personalattributes: z.any().nullish(), // Replace with specific schema if known
  _approvedby: z.string().nullish(),
  _noorgnr: z.union([z.string(), z.boolean()]).nullish(),
  _providerid: z.union([z.string(), z.number()]).nullish(),
  _versionid: z.number().nullish(),
  _score: z.any().nullish(),
  _scoretotal: z.number().nullish(),
});
