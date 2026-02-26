import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Hendelser-fane', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
    await page.getByRole('tab', { name: 'Hendelser' }).click();
  });

  test('Viser kolonneoverskrifter', async ({ page }) => {
    await expect(page.getByText('Hendelse').first()).toBeVisible();
    await expect(page.getByText('Ressurs').first()).toBeVisible();
    await expect(page.getByText('Tidspunkt').first()).toBeVisible();
    await expect(page.getByText('Utført av').first()).toBeVisible();
    await expect(page.getByText('Gjelder').first()).toBeVisible();
  });

  test('Viser hendelsesrader', async ({ page }) => {
    await expect(page.getByText('Rekrutteringstreff').first()).toBeVisible();
    await expect(page.getByText('Jobbsøker').first()).toBeVisible();
    await expect(page.getByText('Arbeidsgiver').first()).toBeVisible();
  });

  test('Viser aktør-identifikasjon i hendelseslisten', async ({ page }) => {
    await expect(page.getByText('A123456').first()).toBeVisible();
  });

  test('Viser subjektnavn for hendelser', async ({ page }) => {
    await expect(page.getByText('Ola Nordmann').first()).toBeVisible();
    await expect(page.getByText('NAV OSLO AS').first()).toBeVisible();
  });
});
