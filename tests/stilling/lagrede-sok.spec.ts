import {
  brukEgenMockbruker,
  endepunktFor,
  opprettSøk,
  opprettStandardsøk,
  åpneLagreDialog,
  åpneMeny,
} from '../rekrutteringstreff/lagredeSøkHjelpere';
import { LagredeSøkDomene } from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';
import {
  byggLagretSøkFilter,
  normaliserLagretSøkFilter,
  tolkLagretSøkFilter,
} from '@/app/stilling/_util/lagredeSøkFilter';
import { gotoApp } from '@/tests/gotoApp';
import { expect, test, type Page } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const STILLING = LagredeSøkDomene.STILLING;

const søkefelt = (page: Page) =>
  page.getByRole('searchbox', { name: 'Søk i stillinger' });

const søkEtter = async (page: Page, ord: string) => {
  await søkefelt(page).fill(ord);
  await søkefelt(page).press('Enter');
};

const åpenForSøkere = (page: Page) =>
  page.getByRole('checkbox', { name: /Åpen for søkere/ });

test.describe('Serialisering av filtre i lagrede søk for stilling', () => {
  const standard = {
    portefølje: 'intern',
    sortering: 'publiseringsdato',
    statuser: ['Åpen for søkere'],
    kategori: [],
    inkludering: [],
    inkluderingUnderkategori: [],
    fylker: [],
    kommuner: [],
  };

  test('standardvisningen gir tomt filter', () => {
    expect(byggLagretSøkFilter(standard)).toBe('');
    expect(tolkLagretSøkFilter('')).toEqual(standard);
  });

  test('ingen valgte statuser lagres som en tom parameter', () => {
    expect(byggLagretSøkFilter({ ...standard, statuser: [] })).toBe(
      'statuser=',
    );
    expect(tolkLagretSøkFilter('statuser=').statuser).toEqual([]);
  });

  test('sorterer nøkler og verdier og tar bare med verdier bruker-api tar imot', () => {
    expect(
      byggLagretSøkFilter({
        portefølje: 'visMine',
        sortering: 'utløpsdato',
        statuser: ['Fullført', 'Slettet', 'Åpen for søkere', 'Fullført'],
        kategori: ['STILLING', 'UKJENT'],
        inkludering: ['INKLUDERING'],
        inkluderingUnderkategori: ['INKLUDERING__FYSISK'],
        fylker: ['46', '03', '3'],
        kommuner: ['4601', '0301x'],
      }),
    ).toBe(
      'fylker=03%2C46&inkludering=INKLUDERING&inkluderingUnderkategori=INKLUDERING__FYSISK' +
        '&kommuner=4601&portefolje=visMine&sortering=utl%C3%B8psdato' +
        '&statuser=Fullf%C3%B8rt%2C%C3%85pen+for+s%C3%B8kere&stillingskategori=STILLING',
    );
  });

  test('et filter i en annen rekkefølge og med parametere som ikke lagres, får samme form', () => {
    expect(
      normaliserLagretSøkFilter(
        '?publisert=intern&side=2&fylker=03&sortering=publiseringsdato',
      ),
    ).toBe('fylker=03');
  });
});

test.describe('Lagrede søk i stillingssøket', () => {
  test('Menylenken «Stillingsoppdrag» ber om standardsøket', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/stilling');
    await expect(
      page.locator('a[aria-label="Stillingsoppdrag"]'),
    ).toHaveAttribute('href', '/stilling?brukStandardsok=true');
  });

  test('Uten lagrede søk er vanlig søk standard, og lagring krever filter eller søkeord', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/stilling');

    await expect(åpenForSøkere(page)).toBeChecked();
    await expect(
      page.getByRole('button', { name: 'Lagre søk' }),
    ).toBeDisabled();
    await åpneMeny(page);
    const vanligSøk = page.getByRole('menuitemradio', { name: /Vanlig søk/ });
    await expect(vanligSøk).toBeChecked();
    await expect(vanligSøk).toContainText('Standard');
    await page.keyboard.press('Escape');
  });

  test('Lagrer filtre og søkeord, men ikke side, publisert og utenOppdrag', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/stilling?side=2&publisert=intern&utenOppdrag=true');

    await page.getByRole('radio', { name: 'Utløpsdato' }).click();
    await søkEtter(page, 'lager');
    await expect(
      page.getByRole('button', { name: 'Lager slett' }),
    ).toBeVisible();

    const lagret = page.waitForRequest(
      (request) =>
        request.method() === 'POST' && request.url() === endepunktFor(STILLING),
    );
    const dialog = await åpneLagreDialog(page);
    await dialog
      .getByRole('textbox', { name: 'Navn på søket' })
      .fill('Lager etter utløp');
    await dialog.getByRole('button', { name: 'Lagre', exact: true }).click();
    expect((await lagret).postDataJSON()).toEqual({
      navn: 'Lager etter utløp',
      filter: 'sortering=utl%C3%B8psdato',
      fritekst: ['lager'],
    });
    await expect(page.getByText('Søket er lagret.')).toBeVisible();
    await expect(page.getByText('Lagret søk:')).toContainText(
      'Lager etter utløp',
    );
  });

  test('Et lagret søk setter filtrene og søkeordene, og vanlig søk setter dem tilbake', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(
      page,
      'Mine fullførte',
      'portefolje=visMine&statuser=Fullf%C3%B8rt',
      ['lager'],
      STILLING,
    );
    await gotoApp(page, '/stilling?side=2');

    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Mine fullførte/ }).click();

    await expect(
      page.getByRole('checkbox', { name: /Fullført/ }),
    ).toBeChecked();
    await expect(åpenForSøkere(page)).not.toBeChecked();
    await expect(
      page.getByRole('button', { name: 'Lager slett' }),
    ).toBeVisible();
    await expect(page).toHaveURL(/portefolje=visMine/);
    await expect(page).not.toHaveURL(/side=/);
    expect(page.url()).not.toContain('lager');

    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Vanlig søk/ }).click();

    await expect(page).toHaveURL(/\/stilling$/);
    await expect(åpenForSøkere(page)).toBeChecked();
    await expect(page.getByRole('button', { name: 'Lager slett' })).toHaveCount(
      0,
    );
    await expect(page.getByText('Lagret søk:')).toHaveCount(0);
  });

  test('Menylenken bruker standardsøket med filtre og søkeord', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(
      page,
      'Mitt standardsøk',
      'sortering=utl%C3%B8psdato',
      ['lager'],
      STILLING,
    );

    await gotoApp(page, '/stilling?brukStandardsok=true');

    await expect(page.getByRole('radio', { name: 'Utløpsdato' })).toBeChecked();
    await expect(
      page.getByRole('button', { name: 'Lager slett' }),
    ).toBeVisible();
    await expect(page.getByText('Lagret søk:')).toContainText(
      'Mitt standardsøk',
    );
    await expect(page).not.toHaveURL(/brukStandardsok/);
  });

  test('Standardsøket brukes ikke når siden åpnes uten menylenken', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(
      page,
      'Mitt standardsøk',
      'sortering=utl%C3%B8psdato',
      [],
      STILLING,
    );

    await gotoApp(page, '/stilling');

    await expect(
      page.getByRole('radio', { name: 'Publiseringsdato' }),
    ).toBeChecked();
    await expect(page.getByText('Lagret søk:')).toHaveCount(0);
  });

  test('Fjern alle filtre fjerner søkeord og statuser, men beholder porteføljen', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(
      page,
      '/stilling?portefolje=visMine&sortering=utl%C3%B8psdato',
    );
    await søkEtter(page, 'lager');
    await expect(
      page.getByRole('button', { name: 'Lager slett' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Fjern alle filtre' }).click();

    await expect(page.getByRole('button', { name: 'Lager slett' })).toHaveCount(
      0,
    );
    await expect(
      page.getByRole('radio', { name: 'Publiseringsdato' }),
    ).toBeChecked();
    await expect(åpenForSøkere(page)).not.toBeChecked();
    await expect(page).toHaveURL(/portefolje=visMine/);
  });
});

test.describe('Stillingssøket er uendret etter en stilling', () => {
  test('søkeordene står når veilederen går tilbake', async ({ page }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/stilling?sortering=utl%C3%B8psdato');
    await søkEtter(page, 'lager');
    const lager = page.getByRole('button', { name: 'Lager slett' });
    await expect(lager).toBeVisible();
    const søkeUrl = page.url();

    await page
      .getByTestId('stillings-kort')
      .first()
      .getByRole('link')
      .first()
      .click();
    await expect(page).not.toHaveURL(søkeUrl);
    await page.goBack();

    await expect(page).toHaveURL(søkeUrl);
    await expect(page.getByRole('radio', { name: 'Utløpsdato' })).toBeChecked();
    await expect(lager).toBeVisible();
  });

  test('brødsmulen «Stillingsoppdrag» bruker standardsøket, som menylenken', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(
      page,
      'Mitt standardsøk',
      'sortering=utl%C3%B8psdato',
      [],
      STILLING,
    );
    await gotoApp(page, '/stilling?sortering=mestRelevant');

    await page
      .getByTestId('stillings-kort')
      .first()
      .getByRole('link')
      .first()
      .click();
    const brødsmule = page
      .getByRole('navigation', { name: 'Brødsmulesti' })
      .getByRole('link', { name: 'Stillingsoppdrag' });
    await expect(brødsmule).toHaveAttribute(
      'href',
      '/stilling?brukStandardsok=true',
    );
    await brødsmule.click();

    await expect(page.getByText('Lagret søk:')).toContainText(
      'Mitt standardsøk',
    );
    await expect(page.getByRole('radio', { name: 'Utløpsdato' })).toBeChecked();
    await expect(page).not.toHaveURL(/brukStandardsok/);
  });
});

test.describe('Sider uten lagrede søk', () => {
  test('etterregistreringen har ikke lagrede søk eller standardsøk', async ({
    page,
  }) => {
    let hentetLagredeSøk = false;
    page.on('request', (request) => {
      if (request.url().includes('/api/bruker/lagrede-sok/')) {
        hentetLagredeSøk = true;
      }
    });
    await brukEgenMockbruker(page);
    await gotoApp(page, '/etterregistrering');

    await expect(
      page.getByRole('searchbox', { name: 'Søk i stillinger' }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Lagrede søk' })).toHaveCount(
      0,
    );
    await expect(page.getByRole('button', { name: 'Lagre søk' })).toHaveCount(
      0,
    );
    await expect(
      page.getByRole('button', { name: 'Bruk standardsøk' }),
    ).toHaveCount(0);
    expect(hentetLagredeSøk).toBe(false);
  });

  test('jobbsøkerens stillingssøk har ikke lagrede søk', async ({ page }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/kandidat/kandidat-arenaKandidatnr-2/finn-stilling');

    await expect(
      page.getByRole('searchbox', { name: 'Søk i stillinger' }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Lagrede søk' })).toHaveCount(
      0,
    );
  });
});
