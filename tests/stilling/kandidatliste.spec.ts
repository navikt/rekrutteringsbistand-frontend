import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Kandidatliste – visning inne i stilling
// ────────────────────────────────────────────────────────
test.describe('Kandidatliste', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/stilling/minStilling');
    await page.getByRole('tab', { name: 'Jobbsøkere (10)' }).click();
  });

  test('Viser kandidater i listen', async ({ page }) => {
    // Kandidatkortene har kandidatnavn synlige
    await expect(page.getByText('Pettersen, Anders')).toBeVisible();
  });

  test('Viser søkefelt for kandidatfiltrering', async ({ page }) => {
    await expect(page.getByPlaceholder('Søk i kandidatene')).toBeVisible();
  });

  test('Viser filter for hendelse og intern status', async ({ page }) => {
    await expect(
      page.getByText('Hendelse', { exact: true }).first(),
    ).toBeVisible();
    await expect(page.getByText('Intern status').first()).toBeVisible();
  });

  test('Viser Vis slettede-bryter', async ({ page }) => {
    await expect(page.getByText('Vis slettede')).toBeVisible();
  });

  test('Viser handlingsknapper for kandidater', async ({ page }) => {
    await expect(page.getByText('Spør om å dele CV')).toBeVisible();
    await expect(page.getByText('Del CV med arbeidsgiver')).toBeVisible();
    await expect(page.getByText('Send tips')).toBeVisible();
  });

  test('Viser sorterbare kolonneoverskrifter', async ({ page }) => {
    const main = page.locator('main');
    await expect(main.getByRole('button', { name: 'Navn' })).toBeVisible();
    await expect(main.getByRole('button', { name: 'Lagt til' })).toBeVisible();
    await expect(
      main.getByRole('button', { name: 'Siste hendelse' }),
    ).toBeVisible();
  });

  test('Viser usynlig kandidat', async ({ page }) => {
    await expect(page.getByText('Usynlig kandidat')).toBeVisible();
  });

  test('Kan markere alle kandidater', async ({ page }) => {
    const checkbox = page.getByRole('checkbox').first();

    await checkbox.check();

    await expect(checkbox).toBeChecked();
  });
});
