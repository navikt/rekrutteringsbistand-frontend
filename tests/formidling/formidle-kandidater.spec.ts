import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Formidle kandidater – LeggTilKandidater i etterregistrering (formidling)
// ────────────────────────────────────────────────────────
test.describe('Formidle kandidater – legg til (etterregistrering)', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/etterregistrering/etterregistreringApen/rediger');
  });

  test('Viser kandidater-modul med fødselsnummer-søk', async ({ page }) => {
    await expect(
      page.getByText('Vi må vite hvilke kandidater du ønsker å formidle'),
    ).toBeVisible();
    await expect(
      page.getByRole('textbox', { name: 'Fødselsnummer på jobbsøker' }),
    ).toBeVisible();
  });

  test('Finner synlig kandidat med gyldig fødselsnummer', async ({ page }) => {
    await page
      .getByRole('textbox', { name: 'Fødselsnummer på jobbsøker' })
      .fill('16828397900');

    await expect(
      page
        .getByTestId('velg-kandidat-resultat')
        .getByRole('button', { name: 'Legg til' }),
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

    const utvalgtRad = page
      .getByText('Usynlig Kandidat (30081879652)')
      .locator('..');
    await expect(utvalgtRad).toBeVisible();
    await expect(utvalgtRad.getByText('Fått jobben')).toBeVisible();
  });
});
