import { expect, test } from '@/tests/fixtures';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Legg til kandidat – fødselsnummer-søk
// ────────────────────────────────────────────────────────
test.describe('Legg til kandidat', () => {
  test.beforeEach(async ({ page, gotoApp }) => {
    await gotoApp('/stilling/minStilling');
    await page.getByText('Legg til jobbsøkere', { exact: true }).click();
  });

  test('Finner kandidat med gyldig fødselsnummer', async ({ page }) => {
    await page
      .getByRole('textbox', { name: 'Fødselsnummer på jobbsøker' })
      .fill('16828397900');

    await expect(
      page
        .getByTestId('velg-kandidat-resultat')
        .getByRole('button', { name: 'Legg til' }),
    ).toBeVisible();
  });

  test('Viser advarsel for usynlig kandidat', async ({ page }) => {
    await page
      .getByRole('textbox', { name: 'Fødselsnummer på jobbsøker' })
      .fill('30081879652');

    await expect(
      page.getByRole('button', { name: 'Se hvorfor jobbsøker ikke er' }),
    ).toBeVisible();
  });

  test('Kan registrere at usynlig kandidat har fått jobben', async ({
    page,
  }) => {
    await page
      .getByRole('textbox', { name: 'Fødselsnummer på jobbsøker' })
      .fill('30081879652');

    await expect(page.getByText('Jobbsøkeren er ikke synlig')).toBeVisible();

    const registrerKnapp = page.getByRole('button', {
      name: 'Registrer at personen har fått jobben',
    });
    await expect(registrerKnapp).toBeVisible();
    await registrerKnapp.click();

    await expect(
      page.getByText('Usynlig Kandidat (30081879652)'),
    ).toBeVisible();

    await expect(page.getByText('Fått jobben')).toBeVisible();
  });

  test('Viser feilmelding ved manglende tilgang', async ({ page }) => {
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

  test('Viser feilmelding når kandidat ikke finnes', async ({ page }) => {
    await page
      .getByRole('textbox', { name: 'Fødselsnummer på jobbsøker' })
      .fill('22034609946');

    await expect(page.getByText('Finner ikke person knyttet')).toBeVisible();
  });
});
