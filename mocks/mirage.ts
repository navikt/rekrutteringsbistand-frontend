'use client';
import { createServer } from 'miragejs';
import { brukerMock } from './brukerMock';
import fylkeMock from './fylkeMock.json';
import kommuneMock from './kommuneMock.json';
import {
  forespørselOmDelingAvCVStatistikkMock,
  statistikkMock,
} from './statistikkMock';
import { stillingMock } from './stillingMock';

createServer({
  routes() {
    this.namespace = 'api';

    this.passthrough('/stillingssok');

    this.get('stilling/geografi', () => {
      return {
        fylker: fylkeMock,
        kommuner: kommuneMock,
      };
    });

    this.get('/stilling/*', () => stillingMock);
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
