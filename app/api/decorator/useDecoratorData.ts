import { getAPIwithSchema } from '../fetcher';
import { decoratorSchema } from './decorator.dto';
import { decoratorMock } from './mocks/dekoratørMock';
import useSWRImmutable from 'swr/immutable';

const decoratorEndepunkt = '/api/decorator';

export const useDecoratorData = () =>
  useSWRImmutable(decoratorEndepunkt, getAPIwithSchema(decoratorSchema));

export const decoratorDataMirage = (server: any) =>
  server.get(decoratorEndepunkt, () => {
    const bruker = localStorage.getItem('DEV-BRUKER') || 'TestIdent';
    return { ...decoratorMock, ident: bruker };
  });
