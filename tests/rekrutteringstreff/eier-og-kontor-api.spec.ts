import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/mutations';
import { oppdaterRekrutteringstreffMock } from '@/app/api/rekrutteringstreff/[...slug]/oppdaterRekrutteringstreffMock';
import { rekrutteringstreffMock } from '@/app/api/rekrutteringstreff/[...slug]/rekrutteringstreffMock';
import { RekrutteringstreffBaseSchema } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import {
  alleSokTreff,
  byggSokRespons,
} from '@/app/api/rekrutteringstreff/sok/rekrutteringstreffSokMock';
import { RekrutteringstreffSokResponsSchema } from '@/app/api/rekrutteringstreff/sok/useRekrutteringstreffSok';
import {
  erEierAvTreff,
  harKontorPåTreff,
} from '@/app/rekrutteringstreff/_utils/eiere';
import { eierOgKontorTilfeller } from '@/tests/rekrutteringstreff/eierOgKontorTestdata';
import { expect, test } from '@playwright/test';

const sokRespons = byggSokRespons({ side: 1, antallPerSide: 100 });

for (const { beskrivelse, eierOgKontor, erEier } of eierOgKontorTilfeller) {
  test(`leseresponser bevarer ${beskrivelse}`, () => {
    const detalj = RekrutteringstreffBaseSchema.parse({
      ...rekrutteringstreffMock('publisert'),
      eierOgKontor,
      eiere: ['GammelEier'],
      kontorer: ['9999'],
    });
    const sok = RekrutteringstreffSokResponsSchema.parse({
      ...sokRespons,
      treff: [
        {
          ...sokRespons.treff[0],
          eierOgKontor,
          eiere: ['GammelEier'],
          kontorer: ['9999'],
        },
      ],
    });

    for (const treff of [detalj, sok.treff[0]]) {
      expect(treff.eierOgKontor).toEqual(eierOgKontor);
      expect(treff).not.toHaveProperty('eiere');
      expect(treff).not.toHaveProperty('kontorer');
      expect(erEierAvTreff(treff.eierOgKontor, 'TestIdent')).toBe(erEier);
    }
  });
}

test('kontorsjekken håndterer felles kontor, manglende kontor og tom liste', () => {
  const { eierOgKontor } = eierOgKontorTilfeller[0];
  expect(harKontorPåTreff(eierOgKontor, '0315')).toBe(true);
  expect(harKontorPåTreff(eierOgKontor, '0402')).toBe(true);
  expect(harKontorPåTreff(eierOgKontor, '9999')).toBe(false);
  expect(harKontorPåTreff(eierOgKontor, '031')).toBe(false);
  expect(harKontorPåTreff([], '0315')).toBe(false);
  expect(erEierAvTreff([], 'TestIdent')).toBe(false);
});

test('begge skjemaer krever entallsfeltet og alle feltene på hver eier', () => {
  for (const eierOgKontor of [
    undefined,
    null,
    ['A123456'],
    [{ navIdent: 'A123456', kontorEnhetId: '0315' }],
    [{ navIdent: 'A123456', eierNavn: null }],
    [{ navIdent: 'A123456', eierNavn: null, kontorEnhetId: 315 }],
  ]) {
    const eierfelt = {
      eierOgKontor,
      eierOgKontorer: eierOgKontorTilfeller[0].eierOgKontor,
      eiere: ['A123456'],
      kontorer: ['0315'],
    };
    expect(
      RekrutteringstreffBaseSchema.safeParse({
        ...rekrutteringstreffMock('publisert'),
        ...eierfelt,
      }).success,
    ).toBe(false);
    expect(
      RekrutteringstreffSokResponsSchema.safeParse({
        ...sokRespons,
        treff: [{ ...sokRespons.treff[0], ...eierfelt }],
      }).success,
    ).toBe(false);
  }
});

test('detalj- og søkemocker følger leseskjemaene', () => {
  expect(RekrutteringstreffSokResponsSchema.safeParse(sokRespons).success).toBe(
    true,
  );
  for (const { id } of alleSokTreff) {
    expect(
      RekrutteringstreffBaseSchema.safeParse(rekrutteringstreffMock(id))
        .success,
    ).toBe(true);
  }
  const sokTreff = alleSokTreff.find((treff) => treff.id === 'mock-sok-1')!;
  expect(rekrutteringstreffMock(sokTreff.id).eierOgKontor).toEqual(
    sokTreff.eierOgKontor,
  );
});

test('oppdatering beholder request-format og leser eierOgKontor i responsen', async () => {
  const originalFetch = globalThis.fetch;
  const respons = {
    ...oppdaterRekrutteringstreffMock('publisert'),
    eierOgKontor: eierOgKontorTilfeller[0].eierOgKontor,
  };
  const kall: { url: string; init?: RequestInit }[] = [];
  globalThis.fetch = async (input, init) => {
    kall.push({ url: String(input), init });
    return Response.json({
      ...respons,
      eiere: ['GammelEier'],
      kontorer: ['9999'],
    });
  };
  try {
    expect(
      await oppdaterRekrutteringstreff('publisert', {
        tittel: 'Oppdatert tittel',
      }),
    ).toEqual(respons);
    expect(kall).toHaveLength(1);
    expect(kall[0].url).toBe('/api/rekrutteringstreff/publisert');
    expect(kall[0].init?.method).toBe('PUT');
    expect(JSON.parse(String(kall[0].init?.body))).toEqual({
      tittel: 'Oppdatert tittel',
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('søkemock filtrerer eierskap og kontorer fra den nye strukturen', () => {
  const params = { side: 1, antallPerSide: 100 };
  expect(byggSokRespons({ ...params, visning: 'mine' }).treff).toEqual(
    sokRespons.treff.filter((treff) =>
      treff.eierOgKontor.some((eier) => eier.navIdent === 'TestIdent'),
    ),
  );
  for (const kontor of ['0315', '0402']) {
    expect(
      byggSokRespons({
        ...params,
        visning: 'valgte_kontorer',
        kontorer: [kontor],
      }).treff,
    ).toEqual(
      sokRespons.treff.filter((treff) =>
        treff.eierOgKontor.some((eier) => eier.kontorEnhetId === kontor),
      ),
    );
  }
});
