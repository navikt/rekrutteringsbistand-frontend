import { z } from 'zod';

export const fylkeSchema = z.object({
  code: z.string(),
  name: z.string(),
  capitalizedName: z.string(),
});

export const kommuneSchema = z.object({
  code: z.string(),
  name: z.string(),
  countyCode: z.string(),
  capitalizedName: z.string(),
});

export const landSchema = z.object({
  alpha2Code: z.string(),
  alpha3Code: z.string(),
  name: z.string(),
  code: z.string(),
  capitalizedName: z.string(),
});
