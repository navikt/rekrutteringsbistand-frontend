import { BrukerAPI } from '@/app/api/api-routes';
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
  await putApi(`${BrukerAPI.internUrl}/nyheter/${nyhet.nyhetId}`, nyhet);
};

export const opprettNyhet = async (nyhet: OpprettNyhetDTO) => {
  await postApi(`${BrukerAPI.internUrl}/nyheter`, nyhet);
};

export const slettNyhet = async (nyhetId: string) => {
  await putApi(`${BrukerAPI.internUrl}/nyheter/slett/${nyhetId}`, {});
};

export const hentNyheter = async (): Promise<NyheterDTO[]> => {
  return await getAPI(`${BrukerAPI.internUrl}/nyheter`);
};
