import type { EierOgKontor } from '@/app/api/rekrutteringstreff/eierOgKontor';

export const eierOgKontorTilfeller: {
  beskrivelse: string;
  eierOgKontor: EierOgKontor[];
  erEier: boolean;
}[] = [
  {
    beskrivelse: 'flere eiere med felles kontor, like navn og null navn',
    eierOgKontor: [
      { navIdent: 'A123456', eierNavn: 'Kari Testesen', kontorEnhetId: '0315' },
      { navIdent: 'B654321', eierNavn: null, kontorEnhetId: '0402' },
      {
        navIdent: 'TestIdent',
        eierNavn: 'Kari Testesen',
        kontorEnhetId: '0315',
      },
    ],
    erEier: true,
  },
  {
    beskrivelse: 'en eier uten navn',
    eierOgKontor: [
      { navIdent: 'TestIdent', eierNavn: null, kontorEnhetId: '0315' },
    ],
    erEier: true,
  },
  {
    beskrivelse: 'eiernavn lik innlogget Nav-ident gir ikke eierskap',
    eierOgKontor: [
      { navIdent: 'X999999', eierNavn: 'TestIdent', kontorEnhetId: '0315' },
    ],
    erEier: false,
  },
  {
    beskrivelse: 'tom eierliste',
    eierOgKontor: [],
    erEier: false,
  },
];
