import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { visMørkModus } from '@/tests/visMørkModus';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Stillingssøk – portefølje, filtre og resultater
// ────────────────────────────────────────────────────────
test.describe('Stillingssøk', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/stilling');
  });

  test('Viser portefølje-knapper', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Alle', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Mine', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Mitt kontor', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'arbeidsplassen.no' }),
    ).toBeVisible();
  });

  test('Kan bytte til Mine-portefølje', async ({ page }) => {
    await page.getByRole('button', { name: 'Mine', exact: true }).click();

    // Resultater skal fortsatt vises
    await expect(page.locator('main')).toBeVisible();
  });

  test('arbeidsplassen.no viser Med oppdrag-chip', async ({ page }) => {
    await page.getByRole('button', { name: 'arbeidsplassen.no' }).click();

    await expect(page.getByText('Med oppdrag')).toBeVisible();
  });

  test('Søkefelt i sidepanelet fungerer', async ({ page }) => {
    const sidepanel = page.getByLabel('Sidepanel');
    const søkefelt = sidepanel.getByRole('searchbox', {
      name: 'Søk i stillinger',
    });

    await søkefelt.fill('test');
    await søkefelt.press('Enter');

    // Resultater eller tom-tilstand skal vises
    await expect(page.locator('main')).toBeVisible();
  });

  test('Viser filtergrupper i sidepanelet', async ({ page }) => {
    const sidepanel = page.getByLabel('Sidepanel');

    await expect(sidepanel.getByText('Status')).toBeVisible();
    await expect(sidepanel.getByText('Område')).toBeVisible();
    await expect(sidepanel.getByText('Kategori')).toBeVisible();
  });

  test('Viser stillingskort i resultatlisten', async ({ page }) => {
    await expect(page.getByTestId('stillings-kort').first()).toBeVisible();
  });

  test('Standardsøk-knapper er synlige', async ({ page }) => {
    const sidepanel = page.getByLabel('Sidepanel');

    await expect(
      sidepanel.getByRole('button', { name: 'Bruk standardsøk' }),
    ).toBeVisible();
    await expect(
      sidepanel.getByRole('button', { name: 'Lagre nytt standardsøk' }),
    ).toBeVisible();
  });

  snapshotTest(test);
  visMørkModus('stillings-kort');
});
