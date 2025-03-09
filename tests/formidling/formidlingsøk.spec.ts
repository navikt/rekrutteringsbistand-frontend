import test, { expect } from '@playwright/test';

// Bruker arbeidsgiverrettet tilgang
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test('Vis formidlinger', async ({ page }) => {
  await page.goto('http://localhost:1337/');
  await page.getByRole('tab', { name: 'Etterregistrering' }).click();
  await expect(
    page.getByRole('button', { name: 'Opprett etterregistrering' }),
  ).toBeVisible();
  await page.goto('http://localhost:1337/formidling');
  await expect(
    page.getByRole('tab', { name: 'Mine etterregistreringer' }),
  ).toBeVisible();
});
