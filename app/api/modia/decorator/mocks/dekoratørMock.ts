import { DecoratorDTO } from '@/app/api/modia/decorator/useDecoratorData';

export const decoratorMock: DecoratorDTO = {
  enheter: [
    {
      enhetId: '1337',
      navn: 'NAV Test',
    },
    {
      enhetId: '1001',
      navn: 'NAV Kristiansand',
    },
  ],
  ident: 'TestIdent',
  navn: 'Fornavn Etternavn',
  fornavn: 'Fornavn',
  etternavn: 'Etternavn',
};
