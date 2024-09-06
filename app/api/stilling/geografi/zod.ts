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
