import { gotoApp } from '@/tests/gotoApp';
import {
  sjekkDialog,
  sjekkPekerfølsomtInnhold,
  sjekkSkjemafeil,
} from '@navikt/toi-next-frontend/a11y';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// Interaksjoner som axe ikke ser fordi de bare finnes etter en handling.
test.describe('Tilgjengelighet i interaksjoner', { tag: '@a11y' }, () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
    await expect(
      page.getByRole('button', { name: 'Legg til arbeidsgiver' }),
    ).toBeVisible();
  });

  test('dialogen for å legge til arbeidsgiver (2.1.2, 2.4.3, 4.1.2)', async ({
    page,
  }) => {
    await sjekkDialog(
      page,
      page.getByRole('button', { name: 'Legg til arbeidsgiver' }),
    );
  });

  test('feil i skjemaet for å legge til arbeidsgiver (3.3.1)', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Legg til arbeidsgiver' }).click();
    const dialog = page.getByRole('dialog', {
      name: /Legg til arbeidsgivere/i,
    });
    await dialog.getByLabel('Finn arbeidsgiver').fill('test');
    await dialog.getByRole('option', { name: /TEST PLUTSELIG KATT/i }).click();

    await sjekkSkjemafeil(
      page,
      dialog.getByRole('button', { name: 'Legg til', exact: true }),
      { forventFokus: true },
    );
  });

  test('hjelpeteksten på knappen for delingslenke (1.4.13)', async ({
    page,
  }) => {
    await sjekkPekerfølsomtInnhold(
      page,
      page.getByRole('button', { name: 'Kopier intern delingslenke' }),
    );
  });
});
