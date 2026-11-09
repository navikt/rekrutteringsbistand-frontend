import { GET } from '@/app/api/pam-geografi/postdata/[postnummer]/route';
import { expect, test } from '@playwright/test';

const opprinneligFetch = globalThis.fetch;

const hentPostdata = (postnummer: string) =>
  GET(new Request(`http://localhost/api/pam-geografi/postdata/${postnummer}`), {
    params: Promise.resolve({ postnummer }),
  });

test.afterEach(() => {
  globalThis.fetch = opprinneligFetch;
});

test('returnerer postdata for et kjent postnummer', async () => {
  const postdata = {
    postkode: '4604',
    by: 'KRISTIANSAND S',
    kommune: {
      kommunenummer: '4204',
      navn: 'KRISTIANSAND',
      fylkesnummer: '42',
      korrigertNavn: 'Kristiansand',
    },
    fylke: {
      fylkesnummer: '42',
      navn: 'AGDER',
      korrigertNavn: 'Agder',
    },
    korrigertNavnBy: 'Kristiansand S',
  };
  globalThis.fetch = async (url, options) => {
    expect(String(url)).toMatch(
      /\/(?:rest|api\/pam-geografi)\/postdata\/4604$/,
    );
    expect(options?.headers).toHaveProperty('Nav-CallId');
    return Response.json(postdata);
  };

  const response = await hentPostdata('4604');

  expect(response.status).toBe(200);
  expect(await response.json()).toEqual(postdata);
});

for (const body of [null, 'Not found', '{"message":"Not found"}']) {
  test(`returnerer ingen treff for ukjent postnummer med 404 og ${body === null ? 'tomt svar' : body}`, async () => {
    globalThis.fetch = async () => new Response(body, { status: 404 });

    const response = await hentPostdata('0000');

    expect(response.status).toBe(200);
    expect(await response.json()).toBeNull();
  });
}

for (const status of [400, 401, 403, 429, 500, 502, 503]) {
  for (const body of [null, 'Feil fra geografitjenesten']) {
    test(`bevarer ${status} med ${body === null ? 'tomt svar' : 'tekst'} fra geografitjenesten`, async () => {
      globalThis.fetch = async () =>
        new Response(body, {
          status,
          headers: { 'Content-Type': 'text/plain' },
        });

      const response = await hentPostdata('4604');

      expect(response.status).toBe(status);
      expect(response.headers.get('Content-Type')).toBe('text/plain');
      expect(await response.text()).toBe(body ?? '');
    });
  }
}

test('bevarer JSON-feilsvar fra geografitjenesten', async () => {
  const feil = { message: 'Tjenesten er utilgjengelig' };
  globalThis.fetch = async () => Response.json(feil, { status: 503 });

  const response = await hentPostdata('4604');

  expect(response.status).toBe(503);
  expect(response.headers.get('Content-Type')).toContain('application/json');
  expect(await response.json()).toEqual(feil);
});

test('skjuler ikke nettverksfeil som ukjent postnummer', async () => {
  const feil = new TypeError('fetch failed');
  globalThis.fetch = async () => {
    throw feil;
  };

  await expect(hentPostdata('4604')).rejects.toBe(feil);
});

test('skjuler ikke ugyldig JSON i et vellykket svar', async () => {
  globalThis.fetch = async () => new Response('Ugyldig JSON');

  await expect(hentPostdata('4604')).rejects.toBeInstanceOf(SyntaxError);
});
