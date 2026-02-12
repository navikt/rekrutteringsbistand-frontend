import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Finn stilling for kandidat
// ────────────────────────────────────────────────────────
test.describe('Finn stilling for kandidat', () => {
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
