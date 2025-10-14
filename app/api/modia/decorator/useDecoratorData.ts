import { decoratorMock } from './mocks/dekoratørMock';
import { ModiaDecoratorAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import { http, HttpResponse } from 'msw';
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

export const decoratorDataMSWHandler = http.get(decoratorEndepunkt, () => {
  const bruker =
    (typeof window !== 'undefined' && localStorage.getItem('DEV-BRUKER')) ||
    'TestIdent';
  return HttpResponse.json({ ...decoratorMock, ident: bruker });
});
