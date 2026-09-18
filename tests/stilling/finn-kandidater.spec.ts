import type { KandidatlisteKandidaterResponseDTO } from '@/app/api/kandidat/schema.zod';
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

    const valgbare = page.getByRole('checkbox', {
      name: 'Checkbox',
      exact: true,
      disabled: false,
    });
    await expect(valgbare.first()).toBeVisible();
    const antall = await valgbare.count();
    await valgbare.first().check();
    await page
      .getByRole('checkbox', {
        name: 'Marker alle på siden (1 markert)',
        exact: true,
      })
      .check();
    await expect(
      page.getByRole('checkbox', {
        name: `Fjern markerte (${antall})`,
        exact: true,
      }),
    ).toBeChecked();
    await expect(
      page.getByRole('checkbox', {
        name: 'Checkbox',
        disabled: false,
        checked: true,
      }),
    ).toHaveCount(antall);
    await expect(
      page.getByRole('button', { name: `${antall} markert`, exact: true }),
    ).toBeVisible();

    // Legg til-knappen skal bli synlig
    await expect(
      page.getByRole('button', { name: 'Legg til markerte kandidater' }),
    ).toBeEnabled();
  });

  test('Kan åpne kandidat i sidepanel', async ({ page }) => {
    await gotoApp(page, '/stilling/minStilling/finn-kandidater');

    // Klikk på første kandidatkort-heading
    await page
      .getByTestId('kandidatkort-lenke-kandidat-arenaKandidatnr-2')
      .click();

    // WindowView åpner jobbsøker-visning med legg til-knapp for kandidatliste
    await expect(
      page.getByRole('button', { name: 'Legg til jobbsøker i kandidatliste' }),
    ).toBeVisible();
  });

  test('Massevalg utelater allerede tillagte kandidater og lar dem forbli avkrysset', async ({
    page,
  }) => {
    await page.route(
      '**/api/kandidat/veileder/stilling/*/kandidater?*',
      async (route) => {
        const response = await route.fetch();
        const data: KandidatlisteKandidaterResponseDTO = await response.json();
        const person = data.kandidatPersoner.find((p) => p.kandidat !== null);
        if (!person?.kandidat) {
          throw new Error('Testdata må inneholde en synlig kandidat');
        }
        await route.fulfill({
          response,
          json: {
            ...data,
            kandidatPersoner: [
              {
                ...person,
                kandidat: {
                  ...person.kandidat,
                  kandidatnr: 'kandidat-arenaKandidatnr-2',
                },
              },
            ],
            totaltAntallKandidater: 1,
          },
        });
      },
    );
    await gotoApp(page, '/stilling/minStilling/finn-kandidater');

    const alleredeLagtTil = page
      .getByTestId('stillings-kort')
      .filter({
        has: page.getByTestId('kandidatkort-lenke-kandidat-arenaKandidatnr-2'),
      })
      .getByRole('checkbox', { name: 'Checkbox', exact: true });
    await expect(alleredeLagtTil).toBeDisabled();
    await expect(alleredeLagtTil).toBeChecked();
    await expect(
      page.getByRole('button', { name: /^\d+ markert$/ }),
    ).toHaveCount(0);

    const valgbare = page.getByRole('checkbox', {
      name: 'Checkbox',
      exact: true,
      disabled: false,
    });
    await expect(valgbare.first()).toBeVisible();
    const antall = await valgbare.count();
    await page
      .getByRole('checkbox', { name: 'Marker alle på siden', exact: true })
      .check();
    const fjernAlle = page.getByRole('checkbox', {
      name: `Fjern markerte (${antall})`,
      exact: true,
    });
    await expect(fjernAlle).toBeChecked();
    await expect(fjernAlle).toHaveJSProperty('indeterminate', false);
    await expect(
      page.getByRole('checkbox', {
        name: 'Checkbox',
        disabled: false,
        checked: true,
      }),
    ).toHaveCount(antall);
    await page
      .getByRole('button', { name: `${antall} markert`, exact: true })
      .click();
    await expect(
      page.getByRole('dialog').getByRole('button', { name: 'Fjern kandidat' }),
    ).toHaveCount(antall);
    await page.keyboard.press('Escape');

    await fjernAlle.uncheck();
    await expect(alleredeLagtTil).toBeDisabled();
    await expect(alleredeLagtTil).toBeChecked();
    await expect(
      page.getByRole('checkbox', {
        name: 'Checkbox',
        disabled: false,
        checked: true,
      }),
    ).toHaveCount(0);
    await expect(
      page.getByRole('button', { name: /^\d+ markert$/ }),
    ).toHaveCount(0);
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
