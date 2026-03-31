import { getSingleKandidatDataSchema } from '@/app/api/kandidat-sok/mocks/kandidat.mock';
import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const REKRUTTERINGSTREFF_ID = 'publisert-finn-kandidater';

async function hentLagretJobbsøker(
  page: import('@playwright/test').Page,
  søketekst: string,
) {
  return page.evaluate(
    async ({ rekrutteringstreffId, fritekst }) => {
      const response = await fetch(
        `/api/rekrutteringstreff/${rekrutteringstreffId}/jobbsoker?side=1&antallPerSide=25&fritekst=${encodeURIComponent(fritekst)}`,
      );

      if (!response.ok) {
        throw new Error(`Uventet status ${response.status}`);
      }

      const result = await response.json();
      return result.jobbsøkere[0] ?? null;
    },
    {
      rekrutteringstreffId: REKRUTTERINGSTREFF_ID,
      fritekst: søketekst,
    },
  );
}

test.describe('Finn kandidater for rekrutteringstreff', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.addInitScript(() =>
      sessionStorage.removeItem('markerte-kandidater'),
    );
    await gotoApp(
      page,
      `/rekrutteringstreff/${REKRUTTERINGSTREFF_ID}/finn-kandidater`,
    );
  });

  test('Viser kandidatkort med checkbox i søkeresultatet', async ({ page }) => {
    await expect(
      page.getByRole('checkbox', { name: 'Checkbox' }).first(),
    ).toBeVisible();
  });

  test('Kan markere en enkelt kandidat med checkbox', async ({ page }) => {
    const checkbox = page.getByRole('checkbox', { name: 'Checkbox' }).first();
    await expect(checkbox).toBeVisible();
    await expect(checkbox).not.toBeChecked();

    await checkbox.check();

    await expect(checkbox).toBeChecked();
    await expect(
      page.getByRole('checkbox', { name: /1 markert/ }),
    ).toBeVisible();
  });

  test('Kan fjerne markering fra en kandidat', async ({ page }) => {
    const checkbox = page.getByRole('checkbox', { name: 'Checkbox' }).first();
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    await checkbox.uncheck();

    await expect(checkbox).not.toBeChecked();
  });

  test('Kan markere flere kandidater', async ({ page }) => {
    const checkboxer = page.getByRole('checkbox', { name: 'Checkbox' });
    await expect(checkboxer.first()).toBeVisible();

    await checkboxer.nth(0).check();
    await expect(checkboxer.nth(0)).toBeChecked();
    await expect(
      page.getByRole('checkbox', { name: /1 markert/ }),
    ).toBeVisible();

    await checkboxer.nth(1).check();
    await expect(checkboxer.nth(1)).toBeChecked();
    await expect(
      page.getByRole('checkbox', { name: /2 markert/ }),
    ).toBeVisible();
  });

  test('Marker alle på siden markerer alle kandidater', async ({ page }) => {
    await expect(
      page.getByRole('checkbox', { name: 'Checkbox' }).first(),
    ).toBeVisible();

    await page.getByRole('checkbox', { name: 'Marker alle på siden' }).click();

    await expect(
      page.getByRole('checkbox', { name: /Fjern markerte/ }),
    ).toBeVisible();
  });

  test('Legg til-knapp er deaktivert uten markerte kandidater', async ({
    page,
  }) => {
    const knapp = page.getByRole('button', {
      name: 'Legg til jobbsøkere og fullfør',
    });
    await expect(knapp).toBeVisible();
    await expect(knapp).toBeDisabled();
  });

  test('Legg til-knapp aktiveres når kandidater er markert', async ({
    page,
  }) => {
    const knapp = page.getByRole('button', {
      name: 'Legg til jobbsøkere og fullfør',
    });
    await expect(knapp).toBeDisabled();

    await page.getByRole('checkbox', { name: 'Checkbox' }).first().check();

    await expect(knapp).toBeEnabled();
  });

  test('Kan lagre markerte kandidater i rekrutteringstreff', async ({
    page,
  }) => {
    await page.getByRole('checkbox', { name: 'Checkbox' }).first().check();

    const knapp = page.getByRole('button', {
      name: 'Legg til jobbsøkere og fullfør',
    });
    await expect(knapp).toBeEnabled();
    await knapp.click();

    await expect(page.getByText('lagret i rekrutteringstreff')).toBeVisible();
  });

  test('Kandidatvisning sender alle søkefelter til backend ved lagring', async ({
    page,
  }) => {
    const kandidat = getSingleKandidatDataSchema(2);

    await page
      .getByTestId('kandidatkort-lenke-kandidat-arenaKandidatnr-2')
      .click();

    await page
      .getByText('Legg til jobbsøker i rekrutteringstreff', { exact: false })
      .click();

    await expect(page.getByText('lagret i rekrutteringstreff')).toBeVisible();

    const lagretJobbsøker = await hentLagretJobbsøker(
      page,
      kandidat.mobiltelefon ?? kandidat.telefon ?? kandidat.fornavn ?? '',
    );

    expect(lagretJobbsøker).toEqual(
      expect.objectContaining({
        fornavn: kandidat.fornavn ?? null,
        etternavn: kandidat.etternavn ?? null,
        navkontor: kandidat.navkontor ?? null,
        veilederNavn: kandidat.veilederVisningsnavn ?? null,
        veilederNavident: kandidat.veilederIdent ?? null,
        innsatsgruppe: kandidat.innsatsgruppe ?? null,
        fylke: kandidat.fylkeNavn ?? null,
        kommune: kandidat.kommuneNavn ?? null,
        poststed: kandidat.poststed ?? null,
        telefonnummer: kandidat.mobiltelefon ?? kandidat.telefon ?? null,
      }),
    );
  });

  test('Markert kandidat sender opprettelsesdata med nullverdier intakt', async ({
    page,
  }) => {
    const kandidat = getSingleKandidatDataSchema(2);

    const kandidatkort = page
      .getByTestId('kandidatkort-lenke-kandidat-arenaKandidatnr-2')
      .locator('xpath=ancestor::a[1]');

    await kandidatkort.getByRole('checkbox', { name: 'Checkbox' }).check();

    const knapp = page.getByRole('button', {
      name: 'Legg til jobbsøkere og fullfør',
    });
    await expect(knapp).toBeEnabled();
    await knapp.click();

    await expect(page.getByText('lagret i rekrutteringstreff')).toBeVisible();

    const lagretJobbsøker = await hentLagretJobbsøker(
      page,
      `${kandidat.fornavn ?? ''} ${kandidat.etternavn ?? ''}`.trim(),
    );

    expect(lagretJobbsøker).toEqual(
      expect.objectContaining({
        fornavn: kandidat.fornavn ?? null,
        etternavn: kandidat.etternavn ?? null,
        navkontor: null,
        veilederNavn: null,
        veilederNavident: null,
        innsatsgruppe: kandidat.innsatsgruppe ?? null,
        fylke: null,
        kommune: kandidat.kommuneNavn ?? null,
        poststed: kandidat.poststed ?? null,
        telefonnummer: null,
      }),
    );
  });

  snapshotTest(test);
});
