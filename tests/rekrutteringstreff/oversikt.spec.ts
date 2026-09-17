import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Rekrutteringstreff oversikt', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff');
  });

  test('Viser "Nytt rekrutteringstreff"-knapp', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Nytt rekrutteringstreff' }),
    ).toBeVisible();
  });

  test('Viser rekrutteringstreff-kort i listen', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        name: 'Jobbtreff for unge under 30 #28',
        exact: true,
      }),
    ).toBeVisible();
  });

  test('Viser statustag på kort', async ({ page }) => {
    await expect(page.getByText('Publisert').first()).toBeVisible();
    await expect(page.getByText('Utkast').first()).toBeVisible();
  });

  test('Viser treff med ulike statuser', async ({ page }) => {
    await expect(page.getByText('Treff uten navn').first()).toBeVisible();
    await expect(
      page.getByText('Rekruttering innen renhold #27'),
    ).toBeVisible();
    await expect(page.getByText('IT-rekruttering vår 2026 #24')).toBeVisible();
  });

  test('Viser eierinformasjon på kort', async ({ page }) => {
    await expect(
      page.getByRole('img', { name: /^X999999 · / }).first(),
    ).toBeVisible();
  });

  test('Viser 2 eiere og 2 kontorer på søk-kortet', async ({ page }) => {
    const kort = page.getByTestId('stillings-kort').filter({
      has: page.getByRole('heading', {
        name: 'Jobbtreff for unge under 30 #28',
        exact: true,
      }),
    });
    await expect(kort.getByRole('img')).toHaveCount(2);
    await expect(
      kort.getByRole('img', {
        name: 'TestIdent · Fornavn Etternavn · Nav Grünerløkka',
        exact: true,
      }),
    ).toHaveText('FE');
    await expect(
      kort.getByRole('img', {
        name: 'C654321 · Nav Sagene',
        exact: true,
      }),
    ).toHaveText('C');
    await expect(
      kort.getByText('Nav Grünerløkka, Nav Sagene', { exact: true }),
    ).toBeVisible();
  });

  test('Viser antall arbeidsgivere og jobbsøkere på kort', async ({ page }) => {
    await expect(page.getByText('Arbeidsgivere: 3').first()).toBeVisible();
    await expect(page.getByText('Jobbsøkere: 9').first()).toBeVisible();
  });

  snapshotTest(test);
});
