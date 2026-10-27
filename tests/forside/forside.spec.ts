import { gotoApp } from '@/tests/gotoApp';
import { slåPåMørkModus } from '@/tests/mørkModus';
import { snapshotTest } from '@/tests/snapshotTest';
import { tilgjengelighetstest } from '@navikt/toi-next-frontend/a11y';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Forside', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/');
    await expect(page.getByRole('main')).toBeVisible();
  });

  test.afterEach(async ({ page }) => {
    await page.unrouteAll({ behavior: 'wait' });
  });

  test('Viser navigasjonsknapper i sidebaren', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Oversikt' })).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Stillingsoppdrag' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Jobbsøkere' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Etterregistrering' }),
    ).toBeVisible();
  });

  test('Viser melding om utilgjengelig statistikk', async ({ page }) => {
    await expect(
      page.getByText('Statistikken er midlertidig utilgjengelig', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('Skjuler statistikk og periodefilter', async ({ page }) => {
    await expect(page.getByLabel('Periode')).toHaveCount(0);
    await expect(page.getByTestId('forside-utfallsstatistikk')).toHaveCount(0);
    await expect(
      page.getByTestId('forside-forespørsel-statistikk'),
    ).toHaveCount(0);
  });

  test(
    'Hopp-lenken flytter fokus til hovedinnholdet',
    { tag: '@a11y' },
    async ({ page }) => {
      await page.keyboard.press('Tab');
      await expect(
        page.getByRole('link', { name: 'Hopp til hovedinnhold' }),
      ).toBeFocused();

      await page.keyboard.press('Enter');
      await expect(page.getByRole('main')).toBeFocused();
    },
  );

  snapshotTest(test);
  tilgjengelighetstest(test, {
    utvidet: true,
    mørkModus: slåPåMørkModus,
    // Uten tab-stopp i hovedinnholdet går neste Tab rundt til starten.
    // Testen over sjekker fokus etter Enter i stedet.
    hoppTilHovedinnhold: false,
  });
  test('Viser mørk modus', async ({ page }) => {
    await slåPåMørkModus(page);

    await expect(
      page.getByText('Statistikken er midlertidig utilgjengelig', {
        exact: true,
      }),
    ).toBeVisible();
  });
});
