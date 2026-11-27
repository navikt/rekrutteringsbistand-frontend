import { getAPI, postApi, putApi, deleteApi } from '@/app/api/fetcher';
import { opprettRekrutteringstreff } from '@/app/api/rekrutteringstreff/mutations';
import { opprettNyStilling } from '@/app/api/stilling/ny-stilling/opprettNyStilling';
import { oppdaterStilling } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { mockBaseStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/mocks/stillingMock';
import { kopierStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/kopier/[slug]/kopierStilling';
import { expect, test } from '@playwright/test';
import { ZodError } from 'zod';

const opprinneligFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = opprinneligFetch;
});

test('bevarer tomme API-svar som tom streng', async () => {
  globalThis.fetch = async () => new Response(null, { status: 204 });

  for (const kall of [
    () => getAPI('http://localhost/api/test'),
    () => postApi('http://localhost/api/test', {}),
    () => putApi('http://localhost/api/test', {}),
    () => deleteApi('http://localhost/api/test'),
  ]) {
    expect(await kall()).toBe('');
  }
});

test('returnerer JSON uendret fra den uvaliderte API-wrapperen', async () => {
  const svar = { data: { id: 'test-id' }, ekstra: ['a', null, 1] };
  globalThis.fetch = async () => Response.json(svar);

  expect(await getAPI('http://localhost/api/test')).toEqual(svar);
});

test('validerer opprettet stilling uten å endre forespørselen', async () => {
  const body = {
    kategori: 'STILLING',
    eierNavKontorEnhetId: '0000',
    rekrutteringstreffId: 'test-treff',
  };
  globalThis.fetch = async (_url, options) => {
    expect(options?.method).toBe('POST');
    expect(JSON.parse(String(options?.body))).toEqual(body);
    return Response.json(mockBaseStilling);
  };

  expect(await opprettNyStilling(body)).toEqual(mockBaseStilling);
});

test('avviser stillingssvar som mangler stillingen', async () => {
  globalThis.fetch = async () => Response.json({ status: 'ok' });

  await expect(opprettNyStilling({})).rejects.toBeInstanceOf(ZodError);
  await expect(oppdaterStilling(mockBaseStilling, {})).rejects.toBeInstanceOf(
    ZodError,
  );
});

test('bevarer vellykkede lagringer med kategori utenfor visningsskjemaet', async () => {
  const svar = {
    stilling: { uuid: 'test-stilling', versjon: 2, ekstra: 'behold' },
    stillingsinfo: { stillingskategori: 'ARBEIDSTRENING' },
  };
  globalThis.fetch = async () => Response.json(svar);

  expect(await opprettNyStilling({})).toEqual(svar);
  expect(await oppdaterStilling(mockBaseStilling, {})).toEqual(svar);
});

test('kopiering trenger ikke et stillingsobjekt i svaret', async () => {
  globalThis.fetch = async () => new Response(null, { status: 204 });

  expect(await kopierStilling('test-stilling')).toBe('');
});

test('krever treff-id og beholder øvrige felter ved opprettelse', async () => {
  const body = { tittel: 'Testtreff', opprettetAvNavkontorEnhetId: '0000' };
  const svar = { id: 'test-treff', tittel: body.tittel, status: 'UTKAST' };
  globalThis.fetch = async () => Response.json(svar);

  expect(await opprettRekrutteringstreff(body)).toEqual(svar);

  globalThis.fetch = async () => Response.json({ status: 'ok' });
  await expect(opprettRekrutteringstreff(body)).rejects.toBeInstanceOf(
    ZodError,
  );
});
