import { decoratorMock } from '@/app/api/modia/decorator/mocks/dekoratørMock';
import { decoratorResponsSchema } from '@/app/api/modia/decorator/useDecoratorData';
import { leggTilMegSomEier } from '@/app/api/rekrutteringstreff/[...slug]/eiere/mutations';
import {
  OpprettRekrutteringstreffSchema,
  opprettRekrutteringstreff,
} from '@/app/api/rekrutteringstreff/mutations';
import { RekrutteringstreffKategori } from '@/app/rekrutteringstreff/_types/constants';
import { formaterAnsattNavn } from '@/util/ansattNavn';
import { expect, test } from '@playwright/test';

const tilfeller = [
  {
    beskrivelse: 'navn',
    navn: '  Kari Testesen  ',
    forventet: 'Kari Testesen',
  },
  { beskrivelse: 'manglende navn', navn: undefined, forventet: undefined },
  { beskrivelse: 'tomt navn', navn: '', forventet: undefined },
  { beskrivelse: 'blankt navn', navn: ' \t ', forventet: undefined },
];

for (const { beskrivelse, navn, forventet } of tilfeller) {
  test(`POST og PUT med ${beskrivelse} bevarer kontrakten`, async () => {
    const originalFetch = globalThis.fetch;
    const kall: { url: string; init?: RequestInit }[] = [];
    globalThis.fetch = async (input, init) => {
      kall.push({ url: String(input), init });
      return init?.method === 'POST'
        ? Response.json({ id: 'treff-id' }, { status: 201 })
        : new Response(null, { status: 200 });
    };

    try {
      const dto = OpprettRekrutteringstreffSchema.parse({
        tittel: 'Eksisterende tittel',
        kategori: RekrutteringstreffKategori.REKRUTTERINGSTREFF,
        opprettetAvNavkontorEnhetId: '0315',
        eierNavn: navn,
      });
      expect(await opprettRekrutteringstreff(dto)).toEqual({ id: 'treff-id' });
      expect(await leggTilMegSomEier('treff-id', navn)).toBeUndefined();

      const navnefelt = forventet ? { eierNavn: forventet } : {};
      expect(kall).toHaveLength(2);
      expect(kall[0].url).toBe('/api/rekrutteringstreff');
      expect(kall[0].init?.method).toBe('POST');
      expect(JSON.parse(String(kall[0].init?.body))).toEqual({
        tittel: 'Eksisterende tittel',
        kategori: RekrutteringstreffKategori.REKRUTTERINGSTREFF,
        opprettetAvNavkontorEnhetId: '0315',
        ...(navn !== undefined ? { eierNavn: navn } : {}),
      });
      expect(kall[1].url).toBe('/api/rekrutteringstreff/treff-id/eiere/meg');
      expect(kall[1].init?.method).toBe('PUT');
      expect(JSON.parse(String(kall[1].init?.body))).toEqual(navnefelt);
      for (const { init } of kall) {
        expect(new Headers(init?.headers).get('Content-Type')).toBe(
          'application/json',
        );
        expect(init?.credentials).toBe('include');
      }
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
}

test('ansattnavn formateres uten plassholder eller fallback til ident eller name', () => {
  expect(formaterAnsattNavn()).toBeUndefined();
  expect(formaterAnsattNavn({})).toBeUndefined();
  expect(
    formaterAnsattNavn({ fornavn: null, etternavn: null }),
  ).toBeUndefined();
  expect(formaterAnsattNavn({ fornavn: ' ', etternavn: '\t' })).toBeUndefined();
  expect(
    formaterAnsattNavn({ fornavn: ' Kari ', etternavn: ' Testesen ' }),
  ).toBe('Kari Testesen');
  expect(formaterAnsattNavn({ fornavn: 'Kari' })).toBe('Kari');
  const bruker = {
    fornavn: '',
    etternavn: '',
    ident: 'Z999999',
    name: 'JWT-navn',
  };
  expect(formaterAnsattNavn(bruker)).toBeUndefined();
});

test('manglende navnedeler fra Modia blokkerer ikke brukerdata', () => {
  for (const verdi of [undefined, null]) {
    const bruker = decoratorResponsSchema.parse({
      ...decoratorMock,
      fornavn: verdi,
      etternavn: verdi,
    });
    expect(formaterAnsattNavn(bruker)).toBeUndefined();
    expect(bruker.ident).toBe(decoratorMock.ident);
    expect(bruker.enheter).toEqual(decoratorMock.enheter);
  }
});
