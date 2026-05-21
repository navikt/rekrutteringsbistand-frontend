import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Rekrutteringstreff – for få jobbsøkere svart ja', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/ingen-svart-ja');
  });

  test('Viser varselbanner under "Om treffet"-fanen', async ({ page }) => {
    await expect(
      page.getByText(
        'Det må være minimum 3 jobbsøkere som har takket ja for å gjennomføre rekrutteringstreffet.',
      ),
    ).toBeVisible();
  });

  test('Viser varselbanner under "Jobbsøkere"-fanen', async ({ page }) => {
    await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
    await expect(
      page.getByText(
        'Det må være minimum 3 jobbsøkere som har takket ja for å gjennomføre rekrutteringstreffet.',
      ),
    ).toBeVisible();
  });
});
