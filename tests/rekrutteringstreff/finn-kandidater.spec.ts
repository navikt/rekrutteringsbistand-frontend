import { PLAYWRIGHT_MSW_SCOPE_COOKIE } from '@/app/api/rekrutteringstreff/mswScope';
import { gotoApp } from '@/tests/gotoApp';
import { slåPåMørkModus } from '@/tests/mørkModus';
import { snapshotTest } from '@/tests/snapshotTest';
import { tilgjengelighetstest } from '@navikt/toi-next-frontend/a11y';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Finn kandidater for rekrutteringstreff', () => {
  test.beforeEach(async ({ page, context }, testInfo) => {
    // Egen mock-tilstand per test, så lagrede jobbsøkere ikke deaktiverer kandidater i andre tester
    await context.addCookies([
      {
        name: PLAYWRIGHT_MSW_SCOPE_COOKIE,
        value: encodeURIComponent(`${testInfo.testId}-${crypto.randomUUID()}`),
        domain: 'localhost',
        path: '/',
      },
    ]);
    await context.addInitScript(() =>
      sessionStorage.removeItem('markerte-kandidater'),
    );
    await gotoApp(page, '/rekrutteringstreff/publisert/finn-kandidater');
  });

  test('Viser kandidatkort med checkbox i søkeresultatet', async ({ page }) => {
    await expect(
      page.getByRole('checkbox', { name: /^Velg kandidat / }).first(),
    ).toBeVisible();
  });

  test('Kan markere en enkelt kandidat med checkbox', async ({ page }) => {
    const checkbox = page
      .getByRole('checkbox', { name: /^Velg kandidat /, disabled: false })
      .first();
    await expect(checkbox).toBeVisible();
    await expect(checkbox).not.toBeChecked();

    await checkbox.check();

    await expect(checkbox).toBeChecked();
    await expect(
      page.getByRole('button', { name: '1 markert', exact: true }),
    ).toBeVisible();
  });

  test('Kan fjerne markering fra en kandidat', async ({ page }) => {
    const checkbox = page
      .getByRole('checkbox', { name: /^Velg kandidat /, disabled: false })
      .first();
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    await checkbox.uncheck();

    await expect(checkbox).not.toBeChecked();
  });

  test('Kan markere flere kandidater', async ({ page }) => {
    const checkboxer = page.getByRole('checkbox', {
      name: /^Velg kandidat /,
      disabled: false,
    });
    await expect(checkboxer.first()).toBeVisible();

    await checkboxer.nth(0).check();
    await expect(checkboxer.nth(0)).toBeChecked();

    await checkboxer.nth(1).check();
    await expect(checkboxer.nth(1)).toBeChecked();
    await expect(
      page.getByRole('button', { name: '2 markert', exact: true }),
    ).toBeVisible();
  });

  test('Massemarkering supplerer enkeltvalg og kan tømmes igjen', async ({
    page,
  }) => {
    const valgbare = page.getByRole('checkbox', {
      name: /^Velg kandidat /,
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
    const fjernAlle = page.getByRole('checkbox', {
      name: `Fjern markerte (${antall})`,
      exact: true,
    });
    await expect(fjernAlle).toBeChecked();
    await expect(fjernAlle).toHaveJSProperty('indeterminate', false);
    await expect(
      page.getByRole('checkbox', {
        name: /^Velg kandidat /,
        disabled: false,
        checked: true,
      }),
    ).toHaveCount(antall);
    await expect(
      page.getByRole('button', { name: `${antall} markert`, exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Legg til jobbsøkere', exact: true }),
    ).toBeEnabled();

    await fjernAlle.uncheck();
    await expect(
      page.getByRole('checkbox', {
        name: /^Velg kandidat /,
        disabled: false,
        checked: true,
      }),
    ).toHaveCount(0);
    await expect(
      page.getByRole('button', { name: 'Legg til jobbsøkere', exact: true }),
    ).toBeDisabled();
    await expect(
      page.getByRole('button', { name: /^\d+ markert$/ }),
    ).toHaveCount(0);
  });

  test('Legg til-knapp er deaktivert uten markerte kandidater', async ({
    page,
  }) => {
    const knapp = page.getByRole('button', {
      name: 'Legg til jobbsøkere',
    });
    await expect(knapp).toBeVisible();
    await expect(knapp).toBeDisabled();
  });

  test('Legg til-knapp aktiveres når kandidater er markert', async ({
    page,
  }) => {
    const knapp = page.getByRole('button', {
      name: 'Legg til jobbsøkere',
    });
    await expect(knapp).toBeDisabled();

    const kandidat = page
      .getByRole('checkbox', { name: /^Velg kandidat /, disabled: false })
      .first();
    await kandidat.check();
    await expect(kandidat).toBeChecked();
    await expect(
      page.getByRole('button', { name: '1 markert', exact: true }),
    ).toBeVisible();

    await expect(knapp).toBeEnabled();
  });

  test('Kan lagre markerte kandidater i rekrutteringstreff', async ({
    page,
  }) => {
    const kandidat = page
      .getByRole('checkbox', { name: /^Velg kandidat /, disabled: false })
      .first();
    await kandidat.check();
    await expect(kandidat).toBeChecked();
    await expect(
      page.getByRole('button', { name: '1 markert', exact: true }),
    ).toBeVisible();

    const knapp = page.getByRole('button', {
      name: 'Legg til jobbsøkere',
    });
    await expect(knapp).toBeEnabled();
    await knapp.click();

    await expect(page.getByText('lagret i rekrutteringstreff')).toBeVisible();
  });

  snapshotTest(test);
  tilgjengelighetstest(test, { utvidet: true, mørkModus: slåPåMørkModus });
});
