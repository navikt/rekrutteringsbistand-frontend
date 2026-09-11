import {
  opprettArbeidsgiver,
  slettArbeidsgiver,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/mutations';
import { arbeidsgiverHendelserEndepunkt } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgiverHendelser';
import { rekrutteringstreffArbeidsgivereEndepunkt } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import {
  arbeidsgivereMedBehovEndepunkt,
  opprettArbeidsgiverMedBehov,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import { oppdaterArbeidsgiverCache } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useOppdaterArbeidsgivere';
import { treffgjennomføringEndepunkt } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringEndepunkter';
import { RekbisError } from '@/util/rekbisError';
import { expect, test } from '@playwright/test';
import { SWRConfig } from 'swr';

const id = 'TEST-TREFF-CACHE';
const swr = SWRConfig.defaultValue;
const nøkler = [
  rekrutteringstreffArbeidsgivereEndepunkt(id),
  arbeidsgivereMedBehovEndepunkt(id),
  arbeidsgiverHendelserEndepunkt(id),
  treffgjennomføringEndepunkt(id),
];
const annenNøkkel = treffgjennomføringEndepunkt('TEST-ANNET-TREFF');
const opprinneligFetch = globalThis.fetch;

test.beforeEach(() => {
  for (const nøkkel of [...nøkler, annenNøkkel]) {
    // SWR beholder både data og originalnøkkel når en hook avmonteres.
    const tilstand = { data: { lagret: true }, _k: nøkkel };
    swr.cache.set(nøkkel, tilstand);
  }
});

test.afterEach(() => {
  for (const nøkkel of [...nøkler, annenNøkkel]) swr.cache.delete(nøkkel);
  globalThis.fetch = opprinneligFetch;
  Reflect.deleteProperty(globalThis, 'window');
});

test('tømmer alle berørte inaktive cacher, men ikke andre treff', async () => {
  await oppdaterArbeidsgiverCache(id, swr);
  for (const nøkkel of nøkler) {
    expect(swr.cache.get(nøkkel)?.data).toBeUndefined();
  }
  expect(swr.cache.get(annenNøkkel)?.data).toEqual({ lagret: true });
});

for (const tilgang of ['produksjon', 401, 403] as const) {
  test(`revaliderer ikke gjennomføring uten tilgang: ${tilgang}`, async () => {
    if (tilgang === 'produksjon') {
      Object.defineProperty(globalThis, 'window', {
        configurable: true,
        value: { location: { hostname: 'rekrutteringsbistand.intern.nav.no' } },
      });
    } else {
      const nøkkel = treffgjennomføringEndepunkt(id);
      swr.cache.set(nøkkel, {
        ...swr.cache.get(nøkkel),
        error: new RekbisError({
          message: 'Syntetisk tilgangsfeil',
          statuskode: tilgang,
          skjulLogger: true,
        }),
      });
    }
    await oppdaterArbeidsgiverCache(id, swr);
    expect(swr.cache.get(treffgjennomføringEndepunkt(id))?.data).toEqual({
      lagret: true,
    });
    for (const nøkkel of nøkler.slice(0, 3)) {
      expect(swr.cache.get(nøkkel)?.data).toBeUndefined();
    }
  });
}

const arbeidsgiver = {
  organisasjonsnummer: 'TEST-ORG-CACHE',
  navn: 'Fiktiv cachebedrift',
  næringskoder: [],
  gateadresse: null,
  postnummer: null,
  poststed: null,
  behov: {
    samledeKvalifikasjoner: [],
    arbeidssprak: ['Norsk'],
    antall: 1,
    ansettelsesformer: ['Fast'],
    personligeEgenskaper: [],
  },
};

const mutasjoner = [
  {
    navn: 'opprett uten behov',
    kjør: (oppdater: () => Promise<void>) =>
      opprettArbeidsgiver(id, arbeidsgiver, oppdater),
  },
  {
    navn: 'opprett med behov',
    kjør: (oppdater: () => Promise<void>) =>
      opprettArbeidsgiverMedBehov(id, arbeidsgiver, oppdater),
  },
  {
    navn: 'slett',
    kjør: (oppdater: () => Promise<void>) =>
      slettArbeidsgiver(id, 'TEST-ARBEIDSGIVER-CACHE', oppdater),
  },
];

for (const { navn, kjør } of mutasjoner) {
  test(`${navn} venter på vellykket mutasjon og cacheoppdatering`, async () => {
    const rekkefølge: string[] = [];
    globalThis.fetch = async () => {
      rekkefølge.push('lagret');
      return Response.json(arbeidsgiver);
    };
    await kjør(async () => {
      await oppdaterArbeidsgiverCache(id, swr);
      rekkefølge.push('oppdatert');
    });
    rekkefølge.push('ferdig');
    expect(rekkefølge).toEqual(['lagret', 'oppdatert', 'ferdig']);
    expect(
      swr.cache.get(treffgjennomføringEndepunkt(id))?.data,
    ).toBeUndefined();
  });

  test(`${navn} beholder cache ved mislykket mutasjon`, async () => {
    globalThis.fetch = async () =>
      Response.json({ feil: 'Syntetisk konflikt' }, { status: 409 });
    await expect(
      kjør(() => oppdaterArbeidsgiverCache(id, swr)),
    ).rejects.toMatchObject({ statuskode: 409 });
    for (const nøkkel of nøkler) {
      expect(swr.cache.get(nøkkel)?.data).toEqual({ lagret: true });
    }
  });

  test(`${navn} skjuler ikke feil fra cacheoppdateringen`, async () => {
    globalThis.fetch = async () => Response.json(arbeidsgiver);
    await expect(
      kjør(async () => {
        throw new Error('Syntetisk cachefeil');
      }),
    ).rejects.toThrow('Syntetisk cachefeil');
  });
}
