import { gotoApp } from '@/tests/gotoApp';
import { slåPåMørkModus } from '@/tests/mørkModus';
import { snapshotTest } from '@/tests/snapshotTest';
import { tilgjengelighetstest } from '@navikt/toi-next-frontend/a11y';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Forside', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/');
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

  snapshotTest(test);
  tilgjengelighetstest(test, { utvidet: true, mørkModus: slåPåMørkModus });
  test('Viser mørk modus', async ({ page }) => {
    await slåPåMørkModus(page);

    await expect(
      page.getByText('Statistikken er midlertidig utilgjengelig', {
        exact: true,
      }),
    ).toBeVisible();
  });
});
