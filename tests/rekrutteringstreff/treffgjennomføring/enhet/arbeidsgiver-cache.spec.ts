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
    metode: 'POST',
    endepunkt: nøkler[0],
    kjør: () => opprettArbeidsgiver(id, arbeidsgiver),
  },
  {
    navn: 'opprett med behov',
    metode: 'POST',
    endepunkt: nøkler[1],
    kjør: () => opprettArbeidsgiverMedBehov(id, arbeidsgiver),
  },
  {
    navn: 'slett',
    metode: 'DELETE',
    endepunkt: `${nøkler[0]}/TEST-ARBEIDSGIVER-CACHE`,
    kjør: () => slettArbeidsgiver(id, 'TEST-ARBEIDSGIVER-CACHE'),
  },
];

for (const { navn, metode, endepunkt, kjør } of mutasjoner) {
  test(`${navn} returnerer HTTP-svaret uten å oppdatere cache`, async () => {
    const kall: { url: string; metode?: string; body?: BodyInit | null }[] = [];
    globalThis.fetch = async (url, options) => {
      kall.push({
        url: String(url),
        metode: options?.method,
        body: options?.body,
      });
      return metode === 'DELETE'
        ? new Response(null, { status: 204 })
        : Response.json(arbeidsgiver, { status: 201 });
    };
    expect(await kjør()).toEqual(metode === 'DELETE' ? '' : arbeidsgiver);
    expect(kall).toEqual([
      {
        url: endepunkt,
        metode,
        body: metode === 'DELETE' ? undefined : JSON.stringify(arbeidsgiver),
      },
    ]);
    for (const nøkkel of nøkler) {
      expect(swr.cache.get(nøkkel)?.data).toEqual({ lagret: true });
    }
  });

  test(`${navn} beholder cache ved mislykket mutasjon`, async () => {
    globalThis.fetch = async () =>
      Response.json({ feil: 'Syntetisk konflikt' }, { status: 409 });
    await expect(kjør()).rejects.toMatchObject({ statuskode: 409 });
    for (const nøkkel of nøkler) {
      expect(swr.cache.get(nøkkel)?.data).toEqual({ lagret: true });
    }
  });
}
