import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { KandidatSøkAPI } from '../api-routes';
import { postApiWithSchemaEs } from '../fetcher';
import { kandidatsammendragMock } from './mocks/kandidatsammendragMock';

const kandidatsammendragEndepunkt = `${KandidatSøkAPI.internUrl}/api/kandidatsammendrag`;

export const kandidatsammendragSchema = z.object({
  orgenhet: z.string().nullable(),
  adresselinje1: z.string().nullable(),
  fornavn: z.string(),
  poststed: z.string().nullable(),
  fodselsdato: z.string(),
  etternavn: z.string(),
  epostadresse: z.string().nullable(),
  postnummer: z.string().nullable(),
  telefon: z.string().nullable(),
  veilederIdent: z.string().nullable(),
  veilederEpost: z.string().nullable(),
  veilederVisningsnavn: z.string().nullable(),
  arenaKandidatnr: z.string(),
  fodselsnummer: z.string(),
});

export type KandidatsammendragDTO = z.infer<typeof kandidatsammendragSchema>;

export interface KandidatsammendragProps {
  kandidatnr: string;
}

export const useKandidatsammendrag = (kandidatnr: string) =>
  useSWRImmutable(
    {
      url: kandidatsammendragEndepunkt,
      body: { kandidatnr },
    },
    (data) => {
      return postApiWithSchemaEs(kandidatsammendragSchema)(data);
    },
  );

export const kandidagsammendragMirage = (server: any) => {
  return server.post(kandidatsammendragEndepunkt, () => kandidatsammendragMock);
};
