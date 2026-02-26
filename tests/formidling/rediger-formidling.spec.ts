import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Rediger formidling (etterregistrering)
// ────────────────────────────────────────────────────────
test.describe('Rediger formidling', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/etterregistrering/etterregistreringApen/rediger');
  });

  test('Viser brødsmulesti med rediger', async ({ page }) => {
    await expect(
      page.getByLabel('Brødsmulesti').getByText('rediger'),
    ).toBeVisible();
  });

  test('Viser kandidater-modul', async ({ page }) => {
    await expect(
      page.getByText('Vi må vite hvilke kandidater du ønsker å formidle'),
    ).toBeVisible();
  });

  test('Viser formidling-moduler', async ({ page }) => {
    const moduler = [
      'Om virksomheten',
      'Sektor',
      'Ansettelsesform',
      'Omfang',
      'Sted',
    ];

    for (const modul of moduler) {
      await expect(
        page.getByText(modul, { exact: true }).first(),
      ).toBeVisible();
    }
  });

  test('Viser Slett-knapp men ikke Avbryt', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Slett' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Avbryt' })).toBeHidden();
  });

  test('Slett-knapp åpner bekreftelsesmodal', async ({ page }) => {
    await page.getByRole('button', { name: 'Slett' }).click();

    await expect(page.getByRole('dialog')).toBeVisible();
  });

  snapshotTest();
});
