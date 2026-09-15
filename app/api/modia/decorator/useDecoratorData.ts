import { decoratorMock } from './mocks/dekoratørMock';
import { ModiaDecoratorAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';
import { z } from 'zod';

export type DecoratorDTO = z.infer<typeof decoratorSchema>;

export const decoratorSchema = z.object({
  enheter: z.array(z.object({ enhetId: z.string(), navn: z.string() })),
  ident: z.string(),
  navn: z.string(),
  fornavn: z.string(),
  etternavn: z.string(),
});

// Manglende navnedeler skal ikke stoppe handlinger som bare trenger ident og rolle.
export const decoratorResponsSchema = decoratorSchema.extend({
  fornavn: z
    .string()
    .nullish()
    .transform((navn) => navn ?? ''),
  etternavn: z
    .string()
    .nullish()
    .transform((navn) => navn ?? ''),
});

const decoratorEndepunkt = `${ModiaDecoratorAPI.internUrl}/decorator`;

export const useDecoratorData = () =>
  useSWRGet(decoratorEndepunkt, decoratorResponsSchema);

export const decoratorDataMSWHandler = getMock(
  decoratorEndepunkt,
  ({ cookies }) => {
    const bruker = cookies['DEV-BRUKER'] || 'TestIdent';
    return HttpResponse.json({ ...decoratorMock, ident: bruker });
  },
);
