import { getAPI, postApi, putApi } from '@/app/api/fetcher';
import z from 'zod';

export const nyheterSchema = z.object({
  nyhetId: z.string(),
  tittel: z.string(),
  innhold: z.string(),
  opprettetDato: z.string().datetime(),
});

export const opprettNyheteSchema = z.object({
  tittel: z.string(),
  innhold: z.string(),
});

export type NyheterDTO = z.infer<typeof nyheterSchema>;
export type OpprettNyhetDTO = z.infer<typeof opprettNyheteSchema>;

export const oppdaterNyhet = async (nyhet: NyheterDTO) => {
  await putApi(`/api/nyheter/${nyhet.nyhetId}`, nyhet);
};

export const opprettNyhet = async (nyhet: OpprettNyhetDTO) => {
  await postApi(`/api/nyheter`, nyhet);
};

export const slettNyhet = async (nyhetId: string) => {
  await putApi(`/api/nyheter/slett/${nyhetId}`, {});
};

export const hentNyheter = async (): Promise<NyheterDTO[]> => {
  return await getAPI(`/api/nyheter`);
};
