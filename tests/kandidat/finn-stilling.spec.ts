import { KandidatStillingssøkDTO } from '@/app/api/kandidat-sok/useKandidatStillingssøk';
import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Finn stilling for kandidat
// ────────────────────────────────────────────────────────
test.describe('Finn stilling for kandidat', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/bruker/innstillinger', async (route) => {
      if (route.request().method() !== 'GET') return route.fallback();
      const respons = await route.fetch();
      await route.fulfill({
        response: respons,
        json: { ...(await respons.json()), windowMode: false },
      });
    });
  });

  test('Beholder eksisterende filtre og viser søket etter ett tilbake-trykk', async ({
    page,
  }) => {
    await gotoApp(
      page,
      '/kandidat/kandidat-arenaKandidatnr-2/finn-stilling?fylker=46&kommuner=4601&statuser=Fullført&sortering=publiseringsdato',
    );

    const søkefelt = page.getByRole('searchbox', {
      name: 'Søk i stillinger',
    });
    const stillingskort = page.getByTestId('stillings-kort').first();
    await expect(søkefelt).toBeVisible();
    await expect(stillingskort).toBeVisible();
    const søkeUrl = page.url();

    await stillingskort.getByRole('link').first().click();
    await expect(page.getByTestId('stilling-side')).toBeVisible();
    await expect(page).toHaveURL(/\/finn-stilling\/[^/?]+/);

    await page.goBack();

    await expect(page).toHaveURL(søkeUrl);
    await expect(søkefelt).toBeVisible();
    await expect(stillingskort).toBeVisible();
    await expect(page.getByTitle('Laster...')).toHaveCount(0);
    await expect(
      page.getByRole('checkbox', { name: /^Fullført \(/ }),
    ).toBeChecked();
  });

  test('Setter kandidatens jobbønsker ved første åpning uten filtre', async ({
    page,
  }) => {
    const jobbønsker: KandidatStillingssøkDTO = {
      yrkeJobbonskerObj: [
        {
          styrkBeskrivelse: 'Sykepleier',
          sokeTitler: ['Sykepleier'],
          primaertJobbonske: true,
          styrkKode: null,
        },
      ],
      geografiJobbonsker: [
        { geografiKodeTekst: 'Bergen', geografiKode: 'Bergen.NO46.4601' },
      ],
      kommunenummerstring: '0301',
      kommuneNavn: 'Oslo',
    };
    await page.route('**/kandidat-stillingssok', (route) =>
      route.fulfill({
        json: { hits: { hits: [{ _source: jobbønsker }] } },
      }),
    );

    await gotoApp(page, '/kandidat/kandidat-arenaKandidatnr-2/finn-stilling');

    await expect(page.getByTestId('stillings-kort').first()).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Sykepleier' }),
    ).toBeVisible();
    await expect(page).toHaveURL(/fylker=46/);
    await expect(page).toHaveURL(/kommuner=4601/);
    await expect(
      page.getByRole('checkbox', { name: /^Åpen for søkere \(/ }),
    ).toBeChecked();

    const søkeUrl = page.url();
    await page
      .getByTestId('stillings-kort')
      .first()
      .getByRole('link')
      .first()
      .click();
    await expect(page.getByTestId('stilling-side')).toBeVisible();

    await page.goBack();

    await expect(page).toHaveURL(søkeUrl);
    await expect(
      page.getByRole('searchbox', { name: 'Søk i stillinger' }),
    ).toBeVisible();
    await expect(page.getByTestId('stillings-kort').first()).toBeVisible();
  });

  test('Viser stillingssøk-filter i sidepanelet', async ({ page }) => {
    await gotoApp(page, '/kandidat/kandidat-arenaKandidatnr-2/finn-stilling');

    // Sidepanelet skal inneholde søkefelt og filtergrupper
    const sidepanel = page.getByLabel('Sidepanel');
    await expect(
      sidepanel.getByRole('searchbox', { name: 'Søk i stillinger' }),
    ).toBeVisible();
    await expect(sidepanel.getByText('Status')).toBeVisible();
  });

  test('Viser stillingskort i søkeresultatet', async ({ page }) => {
    await gotoApp(page, '/kandidat/kandidat-arenaKandidatnr-2/finn-stilling');

    // MSW returnerer mock-stillinger – sjekk at resultater vises
    await expect(page.locator('main')).toBeVisible();

    // Det bør finnes lenker til stillinger i resultatet
    await expect(page.locator('main').getByRole('link').first()).toBeVisible();
  });

  test('Viser brødsmulesti med kandidat-kontekst', async ({ page }) => {
    await gotoApp(page, '/kandidat/kandidat-arenaKandidatnr-2/finn-stilling');

    await expect(
      page.getByRole('navigation', { name: 'Brødsmulesti' }),
    ).toBeVisible();
  });
});
