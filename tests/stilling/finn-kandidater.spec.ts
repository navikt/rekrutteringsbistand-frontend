import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Finn kandidater for stilling
// ────────────────────────────────────────────────────────
test.describe('Finn kandidater for stilling', () => {
  test('Viser kandidatsøk-filter i sidepanelet', async ({ page }) => {
    await gotoApp(page, '/stilling/minStilling/finn-kandidater');

    // Filterpanelet skal inneholde søkefelt og filtergrupper
    await expect(
      page.getByRole('button', { name: 'Mitt kontor' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Alle kontorer' }),
    ).toBeVisible();
  });

  test('Viser kandidatkort i søkeresultatet', async ({ page }) => {
    await gotoApp(page, '/stilling/minStilling/finn-kandidater');

    // Sjekk at checkbox-en for markering vises (finnes i hvert kandidatkort)
    await expect(
      page.getByRole('checkbox', { name: 'Checkbox' }).first(),
    ).toBeVisible();
  });

  test('Kan markere kandidater og legge til i kandidatliste', async ({
    page,
  }) => {
    await gotoApp(page, '/stilling/minStilling/finn-kandidater');

    // Vent til kandidatkort er lastet
    await expect(
      page.getByRole('checkbox', { name: 'Checkbox' }).first(),
    ).toBeVisible();

    // Marker alle på siden
    await page.getByRole('checkbox', { name: 'Marker alle på siden' }).check();

    // Legg til-knappen skal bli synlig
    await expect(
      page.getByRole('button', { name: 'Legg til markerte kandidater' }),
    ).toBeVisible();
  });

  test('Kan åpne kandidat i sidepanel', async ({ page }) => {
    await gotoApp(page, '/stilling/minStilling/finn-kandidater');

    // Klikk på første kandidatkort-heading
    await page
      .getByTestId('kandidatkort-lenke-kandidat-arenaKandidatnr-2')
      .click();

    // WindowView åpner jobbsøker-visning med CV-info
    await expect(
      page.getByRole('link', { name: 'Finn jobb', exact: true }),
    ).toBeVisible();
  });

  test('Viser feilmelding for stilling uten kandidatliste', async ({
    page,
  }) => {
    // eksternStilling har ingen stillingsinfo/kandidatlisteId
    await gotoApp(page, '/stilling/eksternStilling/finn-kandidater');

    await expect(
      page.getByText('Du kan ikke foreslå kandidater til stillingen'),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Kopier delingslenke' }),
    ).toBeVisible();
  });
});
