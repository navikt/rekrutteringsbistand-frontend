'use client';

import { nyheterSchema } from './[...slug]/nyhet-admin';
import { BrukerAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { z } from 'zod';

const hentNyheterEndepunkt = `${BrukerAPI.internUrl}/nyheter`;

// Schema for array av nyheter
const nyheterArraySchema = z.array(nyheterSchema);

export type NyheterArrayDTO = z.infer<typeof nyheterArraySchema>;

export const useNyheter = () =>
  useSWRGet(hentNyheterEndepunkt, nyheterArraySchema);
