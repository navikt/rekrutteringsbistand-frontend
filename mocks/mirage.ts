'use client';
import { createServer } from 'miragejs';
import { brukerMock } from './brukerMock';
import fylkeMock from './fylkeMock.json';
import { kandidatlisetMock } from './kandidatlisteMock';
import { kandidatSøkMock } from './kandidatsøkMock';
import kommuneMock from './kommuneMock.json';
import {
  forespørselOmDelingAvCVStatistikkMock,
  statistikkMock,
} from './statistikkMock';
import { stillingMal } from './stillingMock';

createServer({
  routes() {
    this.namespace = 'api';

    this.passthrough('/stillings-sok');

    this.get('/kandidat/veileder/stilling/*/kandidatlisteid', () => {
      return {
        kandidatlisteId: 'test-kandidatliste-id',
      };
    });
    this.get('/kandidat/veileder/kandidatlister/*/antallKandidater', () => {
      return {
        antallKandidater: 13,
      };
    });
    this.get('/kandidat/veileder/stilling/*/kandidatliste', () => {
      return kandidatlisetMock;
    });

    this.get('/stilling/geografi', () => {
      return {
        fylker: fylkeMock,
        kommuner: kommuneMock,
      };
    });

    this.post('/kandidat-sok/minebrukere', () => {
      return kandidatSøkMock;
    });

    this.get('/stilling/*', () => stillingMal);
    this.get('/bruker', () => brukerMock);
    this.get('/statistikk', () => statistikkMock);
    this.get(
      '/foresporsel-om-deling-av-cv/statistikk',
      () => forespørselOmDelingAvCVStatistikkMock,
    );
  },
});

export default function MirageServer(): null {
  return null;
}
