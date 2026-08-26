import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Legg til jobbsøker – fødselsnummer-dialog på treffets forside (eier)
// ────────────────────────────────────────────────────────
test.describe('Legg til jobbsøker – fødselsnummer-dialog (rekrutteringstreff)', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
    await page.getByText('Legg til jobbsøkere', { exact: true }).click();
  });

  test('Finner synlig jobbsøker med gyldig fødselsnummer', async ({ page }) => {
    await page
      .getByRole('textbox', { name: 'Fødselsnummer på jobbsøker' })
      .fill('16828397900');

    await expect(
      page
        .getByTestId('velg-kandidat-resultat')
        .getByRole('button', { name: 'Legg til' }),
    ).toBeVisible();
  });

  test('Kan ikke legge til usynlig jobbsøker', async ({ page }) => {
    await page
      .getByRole('textbox', { name: 'Fødselsnummer på jobbsøker' })
      .fill('30081879652');

    await expect(
      page.getByText('Jobbsøkeren er ikke synlig', { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(
        'Denne jobbsøkeren er ikke synlig og kan ikke legges til i rekrutteringstreffet.',
      ),
    ).toBeVisible();
    await expect(
      page.getByRole('button', {
        name: 'Registrer at personen har fått jobben',
      }),
    ).toHaveCount(0);
  });

  test('Legger til synlig jobbsøker og viser bekreftelse', async ({ page }) => {
    await page
      .getByRole('textbox', { name: 'Fødselsnummer på jobbsøker' })
      .fill('16828397900');

    await page
      .getByTestId('velg-kandidat-resultat')
      .getByRole('button', { name: 'Legg til' })
      .click();

    await page
      .getByRole('button', { name: 'Legg til jobbsøker', exact: true })
      .click();

    await expect(
      page.getByText('Jobbsøkere ble lagt til i rekrutteringstreffet'),
    ).toBeVisible();
  });
});
