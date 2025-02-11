import { z } from 'zod';

export type IGeografi = {
  address: string | null;
  postalCode: string | null;
  county: string | null;
  country: string | null;
  municipal: string | null;
  municipalCode?: string | null;

  city: string | null;
};

export const geografiSchema = z.object({
  address: z.string().nullable(),
  postalCode: z.string().nullable(),
  county: z.string().nullable(),
  country: z.string().nullable(),
  municipal: z.string().nullable(),
  municipalCode: z.string().optional().nullable(),

  city: z.string().nullable(),
});
