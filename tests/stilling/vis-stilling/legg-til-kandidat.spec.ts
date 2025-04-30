// import test, { expect } from '@playwright/test';

// test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// test.describe(`Legg til kandidat knapp `, () => {
//   test('Legg til kandidat', async ({ page }) => {
//     await page.goto('http://localhost:1337/stilling/minStilling');
//     await page.getByRole('button', { name: 'Legg til kandidater' }).click();
//     await page
//       .getByRole('textbox', { name: 'Fødselsnummer på kandidat' })
//       .click();
//     await page
//       .getByRole('textbox', { name: 'Fødselsnummer på kandidat' })
//       .fill('16828397900');
//     await expect(
//       page
//         .getByTestId('velg-kandidat-resultat')
//         .getByRole('button', { name: 'Legg til' }),
//     ).toBeVisible();
//   });

//   test('Usynlig kandidat', async ({ page }) => {
//     await page.goto('http://localhost:1337/stilling/minStilling');
//     await page.getByRole('button', { name: 'Legg til kandidater' }).click();
//     await page
//       .getByRole('textbox', { name: 'Fødselsnummer på kandidat' })
//       .click();
//     await page
//       .getByRole('textbox', { name: 'Fødselsnummer på kandidat' })
//       .fill('30081879652');
//     await expect(
//       page.getByRole('button', { name: 'Se hvorfor kandidaten ikke er' }),
//     ).toBeVisible();
//   });

//   test('Ikke tilgang til kandidat', async ({ page }) => {
//     await page.goto('http://localhost:1337/stilling/minStilling');
//     await page.getByRole('button', { name: 'Legg til kandidater' }).click();
//     await page
//       .getByRole('textbox', { name: 'Fødselsnummer på kandidat' })
//       .click();
//     await page
//       .getByRole('textbox', { name: 'Fødselsnummer på kandidat' })
//       .fill('26040282334');
//     await page.getByRole('dialog', { name: 'Legg til kandidater til' }).click();
//     await expect(
//       page.getByText(
//         'Tilgangen ble avvist fordi brukeren har adressebeskyttelse',
//       ),
//     ).toBeVisible();
//   });

//   test('Finner ikke kandidat', async ({ page }) => {
//     await page.goto('http://localhost:1337/stilling/minStilling');
//     await page.getByRole('button', { name: 'Legg til kandidater' }).click();
//     await page
//       .getByRole('textbox', { name: 'Fødselsnummer på kandidat' })
//       .click();
//     await page
//       .getByRole('textbox', { name: 'Fødselsnummer på kandidat' })
//       .fill('22034609946');
//     await expect(page.getByText('Finner ikke person knyttet')).toBeVisible();
//   });
// });
