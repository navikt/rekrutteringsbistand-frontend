import { z } from 'zod';
import { stillingSourceSchema, stillingsSøkDTOSchema } from './zod';

export type StillingsDTO = z.infer<typeof stillingSourceSchema>;
export type StillingsSøkDTO = z.infer<typeof stillingsSøkDTOSchema>;
