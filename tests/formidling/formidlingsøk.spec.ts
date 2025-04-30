// import test, { expect } from '@playwright/test';

// // Bruker arbeidsgiverrettet tilgang
// test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// test('Vis etterregistrering', async ({ page }) => {
//   await page.goto('http://localhost:1337/');
//   await page.getByRole('button', { name: 'Etterregistrering' }).click();
//   await page.getByRole('button', { name: 'Opprett' }).click();
//   await expect(
//     page.getByRole('menuitem', { name: 'Etterregistrering' }),
//   ).toBeVisible();
//   await expect(
//     page.getByRole('tab', { name: 'Mine etterregistreringer' }),
//   ).toBeVisible();
// });
