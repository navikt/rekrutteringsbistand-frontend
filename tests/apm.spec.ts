import { skjermApmHendelse, skjermApmUrl } from '@/util/apm';
import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';

const urlTilfeller = [
  ['/kandidat/kandidat-hemmelig', '/kandidat/[kandidatId]'],
  [
    '/kandidat/kandidat-hemmelig/finn-stilling/stilling-123',
    '/kandidat/[kandidatId]/finn-stilling/stilling-123',
  ],
  [
    '/stilling/stilling-123/finn-kandidater/kandidat-hemmelig',
    '/stilling/stilling-123/finn-kandidater/[kandidatId]',
  ],
  [
    '/stilling/stilling-123/kandidatliste/kandidat-hemmelig',
    '/stilling/stilling-123/kandidatliste/[kandidatId]',
  ],
  [
    '/rekrutteringstreff/treff-123/finn-kandidater/kandidat-hemmelig',
    '/rekrutteringstreff/treff-123/finn-kandidater/[kandidatId]',
  ],
  [
    '/rekrutteringstreff/treff-123/person/person-hemmelig',
    '/rekrutteringstreff/treff-123/person/[personbrukerId]',
  ],
  [
    '/api/kandidat/veileder/kandidatlister/liste-123/kandidater/kandidat-hemmelig/status',
    '/api/kandidat/veileder/kandidatlister/liste-123/kandidater/[kandidatId]/status',
  ],
  [
    '/api/rekrutteringstreff/treff-123/jobbsoker/person-hemmelig/kandidatnummer',
    '/api/rekrutteringstreff/treff-123/jobbsoker/[personbrukerId]/kandidatnummer',
  ],
  ['/personbruker/person-hemmelig', '/personbruker/[personbrukerId]'],
  [
    '/api/rekrutteringstreff/treff-123/treffgjennomforing/romfordeling/person-hemmelig',
    '/api/rekrutteringstreff/treff-123/treffgjennomforing/romfordeling/[personbrukerId]',
  ],
  [
    '/api/rekrutteringstreff/treff-123/treffgjennomforing/romfordeling/fordel',
    '/api/rekrutteringstreff/treff-123/treffgjennomforing/romfordeling/fordel',
  ],
  ['/kandidat?visKandidatId=kandidat-hemmelig#person-hemmelig', '/kandidat'],
  ['/stilling/stilling-123', '/stilling/stilling-123'],
  ['/rekrutteringstreff/treff-123', '/rekrutteringstreff/treff-123'],
];

for (const [url, forventet] of urlTilfeller) {
  test(`skjermer ${url}`, () => {
    expect(skjermApmUrl(url)).toBe(forventet);
    expect(skjermApmUrl(`https://example.test${url}`)).toBe(
      `https://example.test${forventet}`,
    );
  });
}

test('skjermer kandidat-ID sist i absolutt kandidatliste-URL', () => {
  expect(
    skjermApmUrl(
      'https://rekrutteringsbistand.intern.dev.nav.no/stilling/00000000-0000-4000-8000-000000000001/kandidatliste/PAMtestkandidat',
    ),
  ).toBe(
    'https://rekrutteringsbistand.intern.dev.nav.no/stilling/00000000-0000-4000-8000-000000000001/kandidatliste/[kandidatId]',
  );
});

test('skjermer URL-er i metadata, route-events, feil, logger og traces', () => {
  const hendelse = {
    type: 'event',
    meta: { page: { url: 'https://example.test/kandidat/kandidat-hemmelig' } },
    payload: {
      name: 'apm-test',
      timestamp: '2026-10-06T00:00:00.000Z',
      attributes: {
        fromUrl: '/stilling/stilling-123/kandidatliste/kandidat-hemmelig',
        toRoute: '/rekrutteringstreff/treff-123/person/person-hemmelig',
      },
      message: 'Feil fra https://example.test/kandidat/kandidat-hemmelig',
      stacktrace: {
        frames: [
          { filename: 'https://example.test/kandidat/kandidat-hemmelig' },
        ],
      },
      resourceSpans: [
        {
          scopeSpans: [
            {
              spans: [
                {
                  attributes: [
                    {
                      key: 'http.url',
                      value: {
                        stringValue:
                          'https://example.test/api/personbruker/person-hemmelig',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  } as Parameters<typeof skjermApmHendelse>[0];

  const resultat = skjermApmHendelse(hendelse);
  const serialisert = JSON.stringify(resultat);
  expect(serialisert).not.toContain('kandidat-hemmelig');
  expect(serialisert).not.toContain('person-hemmelig');
  expect(serialisert).toContain('stilling-123');
  expect(serialisert).toContain('treff-123');
  expect(serialisert).toContain('[kandidatId]');
  expect(serialisert).toContain('[personbrukerId]');
});

const lagFeilhendelse = (value: string, context?: Record<string, string>) =>
  ({
    type: 'exception',
    meta: {},
    payload: {
      type: 'Error',
      value,
      timestamp: '2026-10-06T00:00:00.000Z',
      context,
    },
  }) as unknown as Parameters<typeof skjermApmHendelse>[0];

test('dropper syntetisk console.error-kopi av logger-objekt', () => {
  expect(
    skjermApmHendelse(
      lagFeilhendelse('console.error: {"feilkode":"abc","statuskode":400}'),
    ),
  ).toBeNull();
});

test('beholder ekte feil og fjerner loggtekst fra kontekst', () => {
  const resultat = skjermApmHendelse(
    lagFeilhendelse('Ugyldig forespørsel', {
      console_message: 'Feil for jobbsøker person-hemmelig',
      feilkode: 'abc',
    }),
  );
  expect(resultat).not.toBeNull();
  expect(JSON.stringify(resultat)).not.toContain('person-hemmelig');
  expect(JSON.stringify(resultat)).toContain('abc');
});

test('prefiks for syntetiske feil samsvarer med @nais/apm', () => {
  const kilde = readFileSync(
    require
      .resolve('@nais/apm/package.json')
      .replace('package.json', 'dist/console.js'),
    'utf8',
  );
  expect(kilde).toContain("CONSOLE_ERROR_PREFIX = 'console.error: '");
});
