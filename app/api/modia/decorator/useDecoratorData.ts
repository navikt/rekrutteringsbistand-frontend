import { ModiaDecoratorAPI } from '../../api-routes';
import { getAPIwithSchema } from '../../fetcher';
import { decoratorMock } from './mocks/dekoratørMock';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

export type DecoratorDTO = z.infer<typeof decoratorSchema>;

export const decoratorSchema = z.object({
  enheter: z.array(z.object({ enhetId: z.string(), navn: z.string() })),
  ident: z.string(),
  navn: z.string(),
  fornavn: z.string(),
  etternavn: z.string(),
});

const decoratorEndepunkt = `${ModiaDecoratorAPI.internUrl}/decorator`;

export const useDecoratorData = () =>
  useSWRImmutable(decoratorEndepunkt, getAPIwithSchema(decoratorSchema));

export const decoratorDataMirage = (server: any) =>
  server.get(decoratorEndepunkt, () => {
    const bruker = localStorage.getItem('DEV-BRUKER') || 'TestIdent';
    return { ...decoratorMock, ident: bruker };
  });
