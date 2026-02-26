import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Vis stilling fra kandidatkontekst
// Rute: /kandidat/[kandidatNr]/finn-stilling/[stillingsId]
// ────────────────────────────────────────────────────────
test.describe('Stilling fra kandidat', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/kandidat/PAM012t1avh27/finn-stilling/minStilling');
  });

  test('Viser Om stillingen-tab', async ({ page }) => {
    await expect(
      page.getByRole('tab', { name: 'Om stillingen' }),
    ).toBeVisible();
  });

  test('Viser Jobbsøkere-tab', async ({ page }) => {
    await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toBeVisible();
  });

  test('Viser stillingsinnhold', async ({ page }) => {
    await expect(page.getByTestId('stilling-side')).toBeVisible();
  });

  test('Viser kandidathandlinger', async ({ page }) => {
    await expect(page.getByText('Finn og foreslå jobbsøkere')).toBeVisible();
  });

  snapshotTest();
});
