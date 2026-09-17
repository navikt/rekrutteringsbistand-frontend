import type { EierOgKontor } from '@/app/api/rekrutteringstreff/eierOgKontor';

export const testbrukere = {
  innlogget: {
    navIdent: 'TestIdent',
    eierNavn: 'Fornavn Etternavn',
    kontorEnhetId: '0318',
  },
  anna: {
    navIdent: 'A123456',
    eierNavn: 'Anna Hansen',
    kontorEnhetId: '0318',
  },
  bjørn: {
    navIdent: 'B654321',
    eierNavn: 'Bjørn Berg',
    kontorEnhetId: '0318',
  },
  utenNavn: {
    navIdent: 'C654321',
    eierNavn: null,
    kontorEnhetId: '0318',
  },
  hedvig: {
    navIdent: 'X999999',
    eierNavn: 'Hedvig Nilsen',
    kontorEnhetId: '0318',
  },
  innlogget0315: {
    navIdent: 'TestIdent',
    eierNavn: 'Fornavn Etternavn',
    kontorEnhetId: '0315',
  },
  anna0315: {
    navIdent: 'A123456',
    eierNavn: 'Anna Hansen',
    kontorEnhetId: '0315',
  },
  bjørn0220: {
    navIdent: 'B654321',
    eierNavn: 'Bjørn Berg',
    kontorEnhetId: '0220',
  },
  utenNavn0314: {
    navIdent: 'C654321',
    eierNavn: null,
    kontorEnhetId: '0314',
  },
  hedvig0402: {
    navIdent: 'X999999',
    eierNavn: 'Hedvig Nilsen',
    kontorEnhetId: '0402',
  },
  emil1002: {
    navIdent: 'E123456',
    eierNavn: 'Emil Larsen',
    kontorEnhetId: '1002',
  },
  hedvig0315: {
    navIdent: 'X999999',
    eierNavn: 'Hedvig Nilsen',
    kontorEnhetId: '0315',
  },
  hedvig1001: {
    navIdent: 'X999999',
    eierNavn: 'Hedvig Nilsen',
    kontorEnhetId: '1001',
  },
} satisfies Record<string, EierOgKontor>;
