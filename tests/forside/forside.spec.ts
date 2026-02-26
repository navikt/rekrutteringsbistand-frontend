import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { visMørkModus } from '@/tests/visMørkModus';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Forside', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/');
  });

  test('Viser navigasjonsknapper i sidebaren', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Oversikt' })).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Stillingsoppdrag' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Jobbsøkere' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Etterregistrering' }),
    ).toBeVisible();
  });

  test('Viser periodefilter', async ({ page }) => {
    await expect(page.getByLabel('Periode')).toBeVisible();
  });

  test('Viser utfallsstatistikk', async ({ page }) => {
    await expect(page.getByTestId('forside-utfallsstatistikk')).toBeVisible();
  });

  test('Viser forespørsel-statistikk', async ({ page }) => {
    await expect(
      page.getByTestId('forside-forespørsel-statistikk'),
    ).toBeVisible();
  });

  snapshotTest();
  visMørkModus('forside-forespørsel-statistikk');
});
