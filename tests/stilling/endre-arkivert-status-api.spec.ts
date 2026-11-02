import { endreArkivertStatus } from '@/app/api/kandidat/endreArkivertStatus';
import { logger } from '@navikt/next-logger';
import { expect, test } from '@playwright/test';
import { mock } from 'node:test';

const opprinneligFetch = globalThis.fetch;
const feillogger: unknown[][] = [];

test.beforeEach(() => {
  feillogger.length = 0;
  mock.method(logger, 'error', (...args: unknown[]) => {
    feillogger.push(args);
  });
});

test.afterEach(() => {
  globalThis.fetch = opprinneligFetch;
  mock.restoreAll();
});

for (const arkivert of [true, false]) {
  test(`sender arkivert=${arkivert} og Nav-kontor`, async () => {
    globalThis.fetch = async (url, options) => {
      expect(String(url)).toBe(
        '/api/kandidat/veileder/kandidatlister/TEST-LISTE/kandidater/TEST-KANDIDAT/arkivert',
      );
      expect(options?.method).toBe('PUT');
      expect(JSON.parse(String(options?.body))).toEqual({
        arkivert,
        navKontor: 'TEST-KONTOR',
      });
      return new Response(null, { status: 204 });
    };

    expect(
      await endreArkivertStatus(
        'TEST-LISTE',
        'TEST-KANDIDAT',
        arkivert,
        'TEST-KONTOR',
      ),
    ).toBe('oppdatert');
    expect(feillogger).toHaveLength(0);
  });
}

for (const format of ['tekst', 'json']) {
  test(`logger ikke forventet 400 med ${format}-svar`, async () => {
    const message =
      'Kandidat TEST-KANDIDAT finnes ikke i arbeidsgivers kandidatliste';
    globalThis.fetch = async () =>
      format === 'tekst'
        ? new Response(message, { status: 400 })
        : Response.json({ message }, { status: 400 });

    expect(await endreArkivertStatus('TEST-LISTE', 'TEST-KANDIDAT', true)).toBe(
      'finnes-ikke',
    );
    expect(feillogger).toHaveLength(0);
  });
}

for (const { status, message } of [
  { status: 400, message: 'En annen ugyldig forespørsel' },
  { status: 500, message: 'Serverfeil' },
  {
    status: 500,
    message: 'Kandidat TEST-KANDIDAT finnes ikke i arbeidsgivers kandidatliste',
  },
]) {
  test(`logger og avviser ${status}: ${message}`, async () => {
    globalThis.fetch = async () => Response.json({ message }, { status });

    await expect(
      endreArkivertStatus('TEST-LISTE', 'TEST-KANDIDAT', true),
    ).rejects.toMatchObject({
      statuskode: status,
      skjulLogger: false,
      details: JSON.stringify({ message }),
    });
    expect(feillogger).toHaveLength(1);
  });
}
