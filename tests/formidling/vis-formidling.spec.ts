import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Vis formidling (etterregistrering)
// ────────────────────────────────────────────────────────
test.describe('Vis formidling', () => {
  test('Viser Jobbsøkere-tab for eier', async ({ page }) => {
    await gotoApp(page, '/etterregistrering/etterregistrering');

    await expect(
      page.getByRole('tab', { name: 'Om stillingen' }),
    ).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Jobbsøkere' })).toBeVisible();
  });

  test('Kan klikke på Jobbsøkere-tab', async ({ page }) => {
    await gotoApp(page, '/etterregistrering/etterregistrering');

    await page.getByRole('tab', { name: 'Jobbsøkere' }).click();

    // Kandidatliste-innhold skal lastes
    await expect(page.locator('main')).toBeVisible();
  });

  test('Fullført formidling viser riktig banner', async ({ page }) => {
    // etterregistrering har status STOPPED → "Registreringen er fullført"
    await gotoApp(page, '/etterregistrering/etterregistrering');

    await expect(page.getByText('Registreringen er fullført')).toBeVisible();
  });

  test('Åpen formidling viser riktig banner', async ({ page }) => {
    // etterregistreringApen har status ACTIVE → "Etterregistrering pågår"
    await gotoApp(page, '/etterregistrering/etterregistreringApen');

    await expect(page.getByText('Etterregistrering pågår')).toBeVisible();
  });

  test('Åpen formidling har Fullfør-knapp', async ({ page }) => {
    await gotoApp(page, '/etterregistrering/etterregistreringApen');

    await expect(page.getByRole('button', { name: 'Fullfør' })).toBeVisible();
  });

  test('Om stillingen viser innholdsdetaljer', async ({ page }) => {
    await gotoApp(page, '/etterregistrering/etterregistrering');

    await page.getByRole('tab', { name: 'Om stillingen' }).click();

    // OmStillingen skal vise stillingsinfo-seksjoner
    await expect(page.locator('main')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Om arbeidsgiveren' }),
    ).toBeVisible();
  });
});
