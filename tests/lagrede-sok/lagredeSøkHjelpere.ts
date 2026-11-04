import { LagredeSøkDomene } from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';
import { expect, type Page } from '@playwright/test';

/*
 * Mocken lagrer søkene per DEV-BRUKER-cookie. Hver test bruker sin egen mockbruker,
 * så testene kan kjøre parallelt mot samme server uten å påvirke hverandre.
 */

const PORT = process.env.PLAYWRIGHT_PORT || '1337';
export const endepunktFor = (domene: LagredeSøkDomene) =>
  `http://localhost:${PORT}/api/bruker/lagrede-sok/${domene}`;
export const endepunkt = endepunktFor(LagredeSøkDomene.REKRUTTERINGSTREFF);

export const brukEgenMockbruker = async (
  page: Page,
  prefiks = 'TEST-LAGREDE-SOK',
) => {
  await page.context().addCookies([
    {
      name: 'DEV-BRUKER',
      value: `${prefiks}-${crypto.randomUUID()}`,
      domain: 'localhost',
      path: '/',
    },
  ]);
};

export const opprettSøk = async (
  page: Page,
  navn: string,
  filter = '',
  fritekst: string[] = [],
  domene: LagredeSøkDomene = LagredeSøkDomene.REKRUTTERINGSTREFF,
) => {
  const respons = await page.request.post(endepunktFor(domene), {
    data: { navn, filter, fritekst },
  });
  // Proxyen normaliserer statuskoden, så 201 fra mocken kan komme fram som 200.
  expect(respons.ok()).toBe(true);
  return ((await respons.json()) as { id: string }).id;
};

// Første lagrede søk blir ikke standard. Tester som trenger et standardsøk, velger det eksplisitt.
export const opprettStandardsøk = async (
  page: Page,
  navn: string,
  filter = '',
  fritekst: string[] = [],
  domene: LagredeSøkDomene = LagredeSøkDomene.REKRUTTERINGSTREFF,
) => {
  const id = await opprettSøk(page, navn, filter, fritekst, domene);
  const respons = await page.request.put(
    `${endepunktFor(domene)}/${id}/standard`,
  );
  expect(respons.ok()).toBe(true);
};

export const tellLagringsforsøk = (
  page: Page,
  domene: LagredeSøkDomene = LagredeSøkDomene.REKRUTTERINGSTREFF,
) => {
  const teller = { antall: 0 };
  page.on('request', (request) => {
    if (request.method() === 'POST' && request.url() === endepunktFor(domene)) {
      teller.antall++;
    }
  });
  return teller;
};

// Sjekken ser bare på antall sifre, så et åpenbart falskt nummer holder.
export const syntetiskNummer = '12345678901';

export const åpneMeny = (page: Page) =>
  page.getByRole('button', { name: 'Lagrede søk' }).click();

export const åpneLagreDialog = async (page: Page) => {
  await page.getByRole('button', { name: 'Lagre søk' }).click();
  return page.getByRole('dialog', { name: 'Lagre søk' });
};
