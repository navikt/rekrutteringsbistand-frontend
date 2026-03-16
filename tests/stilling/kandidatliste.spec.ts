import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Kandidatliste – visning inne i stilling
// ────────────────────────────────────────────────────────
test.describe('Kandidatliste', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/stilling/minStilling');
    await page.getByRole('tab', { name: 'Jobbsøkere (300)' }).click();
  });

  test('Viser kandidater i listen', async ({ page }) => {
    await expect(page.getByTestId('stillings-kort').first()).toBeVisible();
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

  snapshotTest(test);
});

// ────────────────────────────────────────────────────────
// Kandidatliste – paginering
// ────────────────────────────────────────────────────────
test.describe('Kandidatliste paginering', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/stilling/minStilling');
    await page.getByRole('tab', { name: 'Jobbsøkere (300)' }).click();
  });

  test('Viser pagineringsinfo med riktig tekst', async ({ page }) => {
    await expect(page.getByText('1-25 av 300')).toBeVisible();
  });

  test('Forrige side-knapp er deaktivert på første side', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Forrige side' }),
    ).toBeDisabled();
  });

  test('Navigerer til neste side', async ({ page }) => {
    await page.getByRole('button', { name: 'Neste side' }).click();
    await expect(page.getByText('26-50 av 300')).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Forrige side' }),
    ).toBeEnabled();
  });

  test('Navigerer tilbake til forrige side', async ({ page }) => {
    await page.getByRole('button', { name: 'Neste side' }).click();
    await expect(page.getByText('26-50 av 300')).toBeVisible();

    await page.getByRole('button', { name: 'Forrige side' }).click();
    await expect(page.getByText('1-25 av 300')).toBeVisible();
  });

  test('Endrer antall per side', async ({ page }) => {
    await page.getByLabel('Antall per side').selectOption('50');
    await expect(page.getByText('1-50 av 300')).toBeVisible();
  });

  test('Endrer antall per side tilbakestiller til side 1', async ({ page }) => {
    await page.getByRole('button', { name: 'Neste side' }).click();
    await expect(page.getByText('26-50 av 300')).toBeVisible();

    await page.getByLabel('Antall per side').selectOption('50');
    await expect(page.getByText('1-50 av 300')).toBeVisible();
  });

  test('Oppdaterer URL med sideparameter', async ({ page }) => {
    await page.getByRole('button', { name: 'Neste side' }).click();
    await expect(page).toHaveURL(/side=2/);
  });

  test('Oppdaterer URL med antall-parameter', async ({ page }) => {
    await page.getByLabel('Antall per side').selectOption('50');
    await expect(page).toHaveURL(/kandidatlisteAntall=50/);
  });
});
