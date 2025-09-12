'use server';

import { postApi, putApi } from '@/app/api/fetcher';
import z from 'zod';

//TODO Type etter backend sitt schema:
const nyheterSchema = z.object({
  id: z.uuid().nullable().optional(),
  tittel: z.string(),
  innhold: z.string(),
});

export type NyheterProps = z.infer<typeof nyheterSchema>;

export const opprettNyhet = async (nyhet: NyheterProps) => {
  await postApi(`/api/bruker/nyheter`, nyhet);
};

export const oppdaterNyhet = async (nyhet: NyheterProps) => {
  await putApi(`/api/bruker/nyheter/${nyhet.id}`, nyhet);
};

export const slettNyhet = async (nyhetId: string) => {
  await putApi(`/api/bruker/nyheter/${nyhetId}`, null);
};