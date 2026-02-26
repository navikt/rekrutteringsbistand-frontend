import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Etterregistrering-liste (/etterregistrering)
// ────────────────────────────────────────────────────────
test.describe('Etterregistrering-liste', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/etterregistrering');
  });

  test('Viser brødsmulesti med Etterregistrering', async ({ page }) => {
    await expect(
      page.getByLabel('Brødsmulesti').getByText('Etterregistrering'),
    ).toBeVisible();
  });

  test('Viser portefølje-knapper uten arbeidsplassen.no', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Alle', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Mine', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Mitt kontor', exact: true }),
    ).toBeVisible();

    // Formidlinger skal IKKE vise arbeidsplassen.no-knappen
    await expect(
      page.getByRole('button', { name: 'arbeidsplassen.no' }),
    ).not.toBeVisible();
  });

  test('Viser filter i sidepanelet', async ({ page }) => {
    const sidepanel = page.getByLabel('Sidepanel');

    await expect(
      sidepanel.getByRole('searchbox', { name: 'Søk i stillinger' }),
    ).toBeVisible();
    await expect(sidepanel.getByText('Sorter')).toBeVisible();

    // Etterregistreringer har IKKE Status- og Kategori-filter
    await expect(sidepanel.getByText('Status')).not.toBeVisible();
    await expect(sidepanel.getByText('Kategori')).not.toBeVisible();
  });

  test('Viser Opprett etterregistrering-knapp', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Opprett etterregistrering' }),
    ).toBeVisible();
  });

  test('Viser etterregistrering-kort i resultatlisten', async ({ page }) => {
    await expect(page.getByTestId('stillings-kort').first()).toBeVisible();
  });

  snapshotTest();
});
