import test from '@playwright/test';

// Bruker arbeidsgiverrettet tilgang
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test('Vis etterregistrering', async ({ page }) => {
  await page.goto('http://localhost:1337/');
  await page.getByRole('button', { name: 'Etterregistrering' }).click();
  await page.getByRole('button', { name: 'Opprett etterregistrering' }).click();
});
