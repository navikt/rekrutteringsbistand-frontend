import { expect, test } from '@playwright/test';

// Bruker arbeidsgiverrettet tilgang for å teste forsiden
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe(`Forside test`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:1337/');
  });

  test('Viser alle navigerings tabs', async ({ page }) => {
    await expect(page.getByRole('tab', { name: 'Oversikt' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Stillinger' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Kandidatsøk' })).toBeVisible();
    await expect(
      page.getByRole('tab', { name: 'Etterregistrering' }),
    ).toBeVisible();
  });

  test('Viser hurtiglenker', async ({ page }) => {
    await expect(page.getByTestId('forside-hurtiglenker')).toBeVisible();
  });

  test('Viser periodevelger', async ({ page }) => {
    await expect(page.getByLabel('Periode')).toBeVisible();
  });

  test('Viser utfallsstatistikk', async ({ page }) => {
    await expect(page.getByTestId('forside-utfallsstatistikk')).toBeVisible();
  });

  test('Viser forespørsel statistikk', async ({ page }) => {
    await expect(
      page.getByTestId('forside-forespørsel-statistikk'),
    ).toBeVisible();
  });

  // Skjermbilde av forsiden
  test('Skjermbilde av forsiden', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'tests/forside/forside.png' });
  });

  test('Viser mørk modus', async ({ page }) => {
    await expect(
      page.getByRole('checkbox', { name: 'Mørk modus' }),
    ).toBeVisible();

    await page.getByRole('checkbox', { name: 'Mørk modus' }).click();
    await expect(
      page.getByRole('checkbox', { name: 'Mørk modus' }),
    ).toBeChecked();

    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'tests/forside/forside-mork-modus.png' });
  });
});
