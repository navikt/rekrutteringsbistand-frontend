import { filtrerApmHendelse } from '@/util/apm';
import { expect, test } from '@playwright/test';

test('filtrerer automatisk rapporterte chunkfeil fra APM', () => {
  for (const payload of [
    {
      type: 'Error',
      value:
        'Failed to load chunk /_next/static/chunks/1pstezan3liz3.js from module 242581',
    },
    { type: 'ChunkLoadError', value: 'Kunne ikke laste kodefil' },
    { type: 'Error', value: 'Loading CSS chunk 7 failed.' },
    {
      type: 'Error',
      value: 'Annen innpakking',
      originalError: new Error(
        'Failed to load chunk /_next/static/chunks/a.js',
      ),
    },
  ]) {
    expect(filtrerApmHendelse({ type: 'exception', payload })).toBeNull();
  }
});

test('beholder andre feil og vanlige hendelser', () => {
  for (const hendelse of [
    {
      type: 'exception',
      payload: { type: 'TypeError', value: 'Uventet feil' },
    },
    {
      type: 'exception',
      payload: {
        type: 'TypeError',
        value: 'Failed to fetch',
        stacktrace: { frames: [{ filename: '/_next/static/chunks/app.js' }] },
      },
    },
    { type: 'log', payload: { message: 'Chunkfeil oppdaget' } },
    { type: 'event', payload: { name: 'sidevisning' } },
  ]) {
    expect(filtrerApmHendelse(hendelse)).toBe(hendelse);
  }
});

test('beholder felles APM-filtrering', () => {
  expect(
    filtrerApmHendelse({
      type: 'exception',
      payload: { value: 'Script error.' },
    }),
  ).toBeNull();
});
