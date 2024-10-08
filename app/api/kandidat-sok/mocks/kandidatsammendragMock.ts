import { KandidatsammendragDTO } from '../useKandidatsammendrag';

const kandidatsammendragMockData: KandidatsammendragDTO = {
  orgenhet: '0321',
  adresselinje1: 'Bølerlia 70',
  veilederVisningsnavn: null,
  fornavn: 'Ufruktbar',
  poststed: 'Oslo',
  fodselsdato: '1983-02-16',
  etternavn: 'Behandling',
  epostadresse: 'noreply@nav.no',
  postnummer: '0689',
  telefon: '+4799999999',
  arenaKandidatnr: 'PAM0vddi923l',
  veilederIdent: 'z993098',
  fodselsnummer: '16828397900',
  veilederEpost: null,
};

export const kandidatsammendragMock = {
  hits: {
    hits: [
      {
        _source: kandidatsammendragMockData,
      },
    ],
  },
};
