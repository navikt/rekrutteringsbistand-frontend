import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Innstillinger – fargemodus og visningsmodus
// ────────────────────────────────────────────────────────
test.describe('Innstillinger', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/instillinger');
  });

  test('Viser Instillinger-tittel uten brødsmulesti', async ({ page }) => {
    const hoveddel = page.locator('main');
    await expect(hoveddel.getByText('Instillinger')).toBeVisible();
    // Brødsmulesti er skjult (skjulBrødsmuler=true)
    await expect(page.getByLabel('Brødsmulesti')).toBeHidden();
  });

  test('Viser Fargemodus-seksjon', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Fargemodus' }),
    ).toBeVisible();
    await expect(
      page.getByText('Velg hvilken fargemodus du ønsker å bruke.'),
    ).toBeVisible();
  });

  test('Viser radioknapper for fargemodus', async ({ page }) => {
    await expect(page.getByRole('radio', { name: 'Lys modus' })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Mørk modus' })).toBeVisible();
  });

  test('Viser Visningsmodus-seksjon', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Visningsmodus' }),
    ).toBeVisible();
    await expect(
      page.getByText('Velg hvordan nytt innhold skal åpne seg.'),
    ).toBeVisible();
  });

  test('Viser radioknapper for visningsmodus', async ({ page }) => {
    await expect(page.getByRole('radio', { name: 'Full side' })).toBeVisible();
    await expect(
      page.getByRole('radio', { name: 'Sidevisning' }),
    ).toBeVisible();
  });

  test('Kan bytte til mørk modus', async ({ page }) => {
    await page.getByRole('radio', { name: 'Mørk modus' }).click();

    await expect(page.getByRole('radio', { name: 'Mørk modus' })).toBeChecked();
  });

  test('Kan bytte visningsmodus', async ({ page }) => {
    await page.getByRole('radio', { name: 'Sidevisning' }).click();

    await expect(
      page.getByRole('radio', { name: 'Sidevisning' }),
    ).toBeChecked();
  });

  snapshotTest(test);
});
