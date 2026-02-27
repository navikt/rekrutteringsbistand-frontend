import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Vis kandidat – navigasjon og innhold
// ────────────────────────────────────────────────────────
test.describe('Vis kandidat', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/');
    await page.getByRole('button', { name: 'Jobbsøkere' }).click();
    await page
      .getByTestId('kandidatkort-lenke-kandidat-arenaKandidatnr-2')
      .click();
  });

  test('Viser handlingsknapper', async ({ page }) => {
    await expect(page.getByText('Finn jobb')).toBeVisible();
    await expect(page.getByText('Gå til aktivitetsplanen')).toBeVisible();
  });

  test('Viser Aktivitet-tab', async ({ page }) => {
    await expect(page.getByRole('tab', { name: 'Aktivitet' })).toBeVisible();
  });

  test('Viser profilkvalitet', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Profilkvalitet' }),
    ).toBeVisible();
  });

  test('Viser kandidatinformasjon', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Ønsker' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Utdanning' }),
    ).toBeVisible();
  });

  snapshotTest(test);
});
