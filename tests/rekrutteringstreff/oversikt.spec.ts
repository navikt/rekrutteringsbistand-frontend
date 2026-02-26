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
      page.getByRole('heading', { name: 'Rekrutteringstreff i Kristiansand' }),
    ).toBeVisible();
  });

  test('Viser statustag på kort', async ({ page }) => {
    await expect(page.getByText('Publisert').first()).toBeVisible();
    await expect(page.getByText('Utkast').first()).toBeVisible();
  });

  test('Viser treff med ulike statuser', async ({ page }) => {
    await expect(page.getByText('Rekrutteringstreff – utkast')).toBeVisible();
    await expect(
      page.getByText('Rekrutteringstreff i Kristiansand'),
    ).toBeVisible();
    await expect(
      page.getByText('Gjennomført treff – restaurant og hotell'),
    ).toBeVisible();
    await expect(
      page.getByText('Avlyst treff – transport og logistikk'),
    ).toBeVisible();
  });

  test('Viser antall arbeidsgivere og jobbsøkere på kort', async ({ page }) => {
    await expect(
      page.getByText('Antall arbeidsgivere: 5').first(),
    ).toBeVisible();
    await expect(page.getByText('Antall jobbsøkere: 12').first()).toBeVisible();
  });

  test('Viser opprettet-av informasjon på kort', async ({ page }) => {
    await expect(page.getByText('Opprettet av A123456').first()).toBeVisible();
  });

  snapshotTest();
});
