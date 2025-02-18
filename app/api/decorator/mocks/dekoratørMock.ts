import { DecoratorDTO } from '../decorator.dto';

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
