// Tillatt dyp relativ import for test fixtures
// eslint-disable-next-line import/no-restricted-paths
import { test, expect } from '../../fixtures';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe(`Legg til kandidat knapp `, () => {
  test('Legg til kandidat', async ({ page, gotoApp }) => {
    await gotoApp('/stilling/minStilling');
    await page
      .locator('span')
      .filter({ hasText: 'Legg til jobbsøkere' })
      .click();
    await page
      .getByRole('textbox', { name: 'Fødselsnummer på jobbsøker' })
      .click();
    await page
      .getByRole('textbox', { name: 'Fødselsnummer på jobbsøker' })
      .fill('16828397900');
    await expect(
      page
        .getByTestId('velg-kandidat-resultat')
        .getByRole('button', { name: 'Legg til' }),
    ).toBeVisible();
  });

  test('Usynlig kandidat', async ({ page, gotoApp }) => {
    await gotoApp('/stilling/minStilling');
    await page
      .locator('span')
      .filter({ hasText: 'Legg til jobbsøkere' })
      .click();
    await page
      .getByRole('textbox', { name: 'Fødselsnummer på jobbsøker' })
      .click();
    await page
      .getByRole('textbox', { name: 'Fødselsnummer på jobbsøker' })
      .fill('30081879652');
    await expect(
      page.getByRole('button', { name: 'Se hvorfor kandidaten ikke er' }),
    ).toBeVisible();
  });

  test('Ikke tilgang til kandidat', async ({ page, gotoApp }) => {
    await gotoApp('/stilling/minStilling');
    await page
      .locator('span')
      .filter({ hasText: 'Legg til jobbsøkere' })
      .click();
    await page
      .getByRole('textbox', { name: 'Fødselsnummer på jobbsøker' })
      .click();
    await page
      .getByRole('textbox', { name: 'Fødselsnummer på jobbsøker' })
      .fill('26040282334');
    await page.getByRole('dialog', { name: 'Legg til jobbsøker' }).click();
    await expect(
      page.getByText(
        'Tilgangen ble avvist fordi brukeren har adressebeskyttelse',
      ),
    ).toBeVisible();
  });

  test('Finner ikke kandidat', async ({ page, gotoApp }) => {
    await gotoApp('/stilling/minStilling');
    await page
      .locator('span')
      .filter({ hasText: 'Legg til jobbsøkere' })
      .click();
    await page
      .getByRole('textbox', { name: 'Fødselsnummer på jobbsøker' })
      .click();
    await page
      .getByRole('textbox', { name: 'Fødselsnummer på jobbsøker' })
      .fill('22034609946');
    await expect(page.getByText('Finner ikke person knyttet')).toBeVisible();
  });
});
