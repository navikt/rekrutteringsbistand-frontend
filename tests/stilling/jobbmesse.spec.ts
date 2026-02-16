import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Jobbmesse – opprett, rediger og visning
// ────────────────────────────────────────────────────────
// Hjelpefunksjon for å åpne Opprett-menyen
async function åpneOpprettMeny(page: import('@playwright/test').Page) {
  await page.getByRole('button', { name: 'Opprett', exact: true }).click();
}

test.describe('Jobbmesse', () => {
  test.describe('Opprett jobbmesse via meny', () => {
    test('Opprett-menyen viser Jobbmesse-valg', async ({ page }) => {
      await gotoApp(page, '/');
      await åpneOpprettMeny(page);

      await expect(
        page.getByRole('menuitem', { name: 'Jobbmesse' }),
      ).toBeVisible();
    });

    test('Klikk på Jobbmesse navigerer til redigeringsside', async ({
      page,
    }) => {
      await gotoApp(page, '/');
      await åpneOpprettMeny(page);
      await page.getByRole('menuitem', { name: 'Jobbmesse' }).click();

      await page.waitForURL(/\/stilling\/.*\/rediger/, { timeout: 10000 });
      await expect(page.locator('main')).toBeVisible();
    });

    test('Redigeringssiden viser stilling-moduler', async ({ page }) => {
      await gotoApp(page, '/');
      await åpneOpprettMeny(page);
      await page.getByRole('menuitem', { name: 'Jobbmesse' }).click();

      await page.waitForURL(/\/stilling\/.*\/rediger/, { timeout: 10000 });

      // Sjekk at sentrale moduler vises
      await expect(page.getByRole('button', { name: 'Avbryt' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Slett' })).toBeVisible();
    });
  });

  test.describe('Vis jobbmesse', () => {
    test.beforeEach(async ({ page }) => {
      await gotoApp(page, '/stilling/jobbmesse');
    });

    test('Viser Jobbmesse-tag', async ({ page }) => {
      await expect(page.getByText('Jobbmesse', { exact: true })).toBeVisible();
    });

    test('Viser jobbmesse-tittel', async ({ page }) => {
      await expect(
        page.getByRole('heading', { name: 'NAV Jobbmesse Lillestrøm' }),
      ).toBeVisible();
    });

    test('Viser Om stillingen-tab', async ({ page }) => {
      await expect(
        page.getByRole('tab', { name: 'Om stillingen' }),
      ).toBeVisible();
    });

    test('Viser Jobbsøkere-tab', async ({ page }) => {
      await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toBeVisible();
    });

    test('Skjuler CV-deling for jobbmesse', async ({ page }) => {
      await page.getByRole('tab', { name: /Jobbsøkere/ }).click();

      // "Spør om å dele CV" og "Del CV med arbeidsgiver" skal IKKE vises for jobbmesse
      await expect(page.getByText('Spør om å dele CV')).toBeHidden();
      await expect(page.getByText('Del CV med arbeidsgiver')).toBeHidden();

      // "Send tips" skal fortsatt vises
      await expect(page.getByText('Send tips')).toBeVisible();
    });
  });
});
