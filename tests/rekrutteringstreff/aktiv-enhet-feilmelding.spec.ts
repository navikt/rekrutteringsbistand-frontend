import { getAPI } from '@/app/api/fetcher';
import { expect, test } from '@playwright/test';

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test('viser forklaring når aktiv enhet mangler', async () => {
  globalThis.fetch = async () =>
    Response.json(
      {
        feilkode: 'AKTIV_ENHET_MANGLER',
        feil: 'Aktiv enhet mangler. Velg Nav-kontor og prøv igjen.',
      },
      { status: 403 },
    );

  await expect(
    getAPI('/api/rekrutteringstreff/statistikk/fatt-jobben', {
      skjulFeilmelding: true,
    }),
  ).rejects.toMatchObject({
    statuskode: 403,
    message: 'Aktiv enhet mangler. Velg Nav-kontor og prøv igjen.',
  });
});

test('andre tilgangsfeil beholder eksisterende feilmelding', async () => {
  globalThis.fetch = async () =>
    Response.json({ feil: 'Ingen tilgang' }, { status: 403 });

  await expect(
    getAPI('/api/rekrutteringstreff', { skjulFeilmelding: true }),
  ).rejects.toMatchObject({
    statuskode: 403,
    message: 'Ingen tilgang',
  });
});

test('tekniske feil vises ikke som manglende aktiv enhet', async () => {
  globalThis.fetch = async () =>
    Response.json(
      { feil: 'Klarte ikke å hente aktiv enhet fra Modia. Prøv igjen senere.' },
      { status: 502 },
    );

  await expect(
    getAPI('/api/rekrutteringstreff', { skjulFeilmelding: true }),
  ).rejects.toMatchObject({
    statuskode: 502,
    message: 'Serverfeil',
  });
});
