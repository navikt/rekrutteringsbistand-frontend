import { postApi, putApi } from '@/app/api/fetcher';
import z from 'zod';

//TODO Type etter backend sitt schema:
const nyheterSchema = z.object({
  tittel: z.string(),
  id: z.string(),
  dato: z.string(),
});

export type NyheterProps = z.infer<typeof nyheterSchema>;

export const oppdaterNyhet = async (nyhet: NyheterProps) => {
  await putApi(`/api/bruker/nyheter/${nyhet.id}`, nyhet);
};

export const opprettNyhet = async (nyhet: NyheterProps) => {
  await postApi(`/api/bruker/nyheter/${nyhet.id}`, nyhet);
};
