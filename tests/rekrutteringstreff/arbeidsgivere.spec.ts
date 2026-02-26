import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Arbeidsgivere-fane', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
    await page.getByRole('tab', { name: /Arbeidsgivere/ }).click();
  });

  test('Viser "Legg til arbeidsgiver"-knapp', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Legg til arbeidsgiver' }),
    ).toBeVisible();
  });

  test('Viser minst én arbeidsgiver i listen', async ({ page }) => {
    const listeElementer = page.getByRole('tabpanel').locator('ul > li');
    await expect(listeElementer.first()).toBeVisible();
  });

  test('Slett-knapp er deaktivert når det kun er én arbeidsgiver', async ({
    page,
  }) => {
    const slettKnapper = page.getByRole('button', { name: 'Slett' });
    const antall = await slettKnapper.count();
    if (antall === 1) {
      await expect(slettKnapper.first()).toBeDisabled();
    }
  });

  snapshotTest(test);
});
