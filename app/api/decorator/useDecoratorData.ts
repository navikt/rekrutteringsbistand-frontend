import useSWRImmutable from 'swr/immutable';
import { getAPIwithSchema } from '../fetcher';
import { decoratorSchema } from './decorator.dto';
import { decoratorMock } from './mocks/dekoratørMock';

const decoratorEndepunkt = '/api/decorator';

export const useDecoratorData = () =>
  useSWRImmutable(decoratorEndepunkt, getAPIwithSchema(decoratorSchema));

export const decoratorDataMirage = (server: any) =>
  server.get(decoratorEndepunkt, () => decoratorMock);
