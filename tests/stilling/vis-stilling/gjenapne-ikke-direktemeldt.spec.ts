import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Gjenåpne – ekstern (arbeidsplassen, ikke DIR) stilling
// Stillinger som ikke er direktemeldt skal IKKE oppdateres av oss –
// kun kandidatlisten skal endres.
// ────────────────────────────────────────────────────────
test.describe('Gjenåpne – ekstern stilling (ikke DIR)', () => {
  test('Kaller setKandidatlisteStatus, men IKKE oppdaterStilling', async ({
    page,
  }) => {
    let statusKallMottatt = false;
    let statusKallBody: Record<string, unknown> | null = null;
    let oppdaterStillingKallMottatt = false;

    await page.route(
      '**/api/kandidat/veileder/kandidatlister/*/status',
      async (route) => {
        statusKallMottatt = true;
        const postData = route.request().postData();
        if (postData) {
          statusKallBody = JSON.parse(postData);
        }
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ status: 'ok' }),
        });
      },
    );

    await page.route('**/api/stilling/oppdater-stilling', async (route) => {
      oppdaterStillingKallMottatt = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}),
      });
    });

    await gotoApp(page, '/stilling/fullfortEksternIkkeBesattIkkeLast');

    await expect(page.getByText('Oppdrag fullført')).toBeVisible({
      timeout: 15000,
    });

    const gjenåpneKnapp = page.getByRole('button', {
      name: 'Gjenåpne',
      exact: true,
    });
    await gjenåpneKnapp.click();

    // Bekreft i modal
    await expect(
      page.getByRole('heading', { name: 'Gjenåpne stillingsoppdrag' }),
    ).toBeVisible();

    // Sjekkboksen for å publisere på arbeidsplassen skal IKKE vises for
    // ikke-DIR stillinger – stillingen oppdateres ikke i det hele tatt.
    await expect(
      page.getByRole('checkbox', {
        name: /Publiser stillingsoppdraget offentlig på arbeidsplassen/i,
      }),
    ).toBeHidden();

    await page
      .getByRole('dialog')
      .getByRole('button', { name: 'Gjenåpne', exact: true })
      .click();

    await expect
      .poll(() => statusKallMottatt, {
        message: 'setKandidatlisteStatus ble ikke kalt',
        timeout: 15000,
      })
      .toBe(true);

    expect(statusKallBody).toEqual({ status: 'ÅPEN' });
    expect(oppdaterStillingKallMottatt).toBe(false);
  });
});

// ────────────────────────────────────────────────────────
// Gjenåpne – direktemeldt (DIR) stilling – kontrolltest
// Bekrefter at oppdaterStilling FORTSATT kalles for DIR-stillinger.
// ────────────────────────────────────────────────────────
test.describe('Gjenåpne – direktemeldt stilling (DIR)', () => {
  test('Kaller både setKandidatlisteStatus og oppdaterStilling', async ({
    page,
  }) => {
    let statusKallMottatt = false;
    let oppdaterStillingKallMottatt = false;

    await page.route(
      '**/api/kandidat/veileder/kandidatlister/*/status',
      async (route) => {
        statusKallMottatt = true;
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ status: 'ok' }),
        });
      },
    );

    await page.route('**/api/stilling/oppdater-stilling', async (route) => {
      oppdaterStillingKallMottatt = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}),
      });
    });

    await gotoApp(page, '/stilling/fullfortIkkeBesattIkkeLast');

    await expect(page.getByText('Oppdrag fullført')).toBeVisible({
      timeout: 15000,
    });

    const gjenåpneKnapp = page.getByRole('button', {
      name: 'Gjenåpne',
      exact: true,
    });
    await gjenåpneKnapp.click();

    await expect(
      page.getByRole('heading', { name: 'Gjenåpne stillingsoppdrag' }),
    ).toBeVisible();

    await page
      .getByRole('dialog')
      .getByRole('button', { name: 'Gjenåpne', exact: true })
      .click();

    await expect
      .poll(() => statusKallMottatt, {
        message: 'setKandidatlisteStatus ble ikke kalt',
        timeout: 15000,
      })
      .toBe(true);
    await expect
      .poll(() => oppdaterStillingKallMottatt, {
        message: 'oppdaterStilling ble ikke kalt for DIR-stilling',
        timeout: 15000,
      })
      .toBe(true);
  });
});

// ────────────────────────────────────────────────────────
// Fullfør etterregistrering – direktemeldt (DIR) formidling
// Etterregistreringer er normalt DIR-stillinger; bekreft at både
// kandidatliste-status og stilling oppdateres.
// ────────────────────────────────────────────────────────
test.describe('Fullfør etterregistrering – direktemeldt (DIR)', () => {
  test('Kaller både setKandidatlisteStatus og oppdaterStilling', async ({
    page,
  }) => {
    let statusKallMottatt = false;
    let oppdaterStillingKallMottatt = false;

    await page.route(
      '**/api/kandidat/veileder/kandidatlister/*/status',
      async (route) => {
        statusKallMottatt = true;
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ status: 'ok' }),
        });
      },
    );

    await page.route('**/api/stilling/oppdater-stilling', async (route) => {
      oppdaterStillingKallMottatt = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}),
      });
    });

    await gotoApp(page, '/stilling/etterregistreringApen');

    await expect(page.getByText('Etterregistrering pågår')).toBeVisible({
      timeout: 15000,
    });

    const fullførKnapp = page.getByRole('button', { name: 'Fullfør' }).first();
    await fullførKnapp.click();

    await expect
      .poll(() => statusKallMottatt, {
        message: 'setKandidatlisteStatus ble ikke kalt',
        timeout: 15000,
      })
      .toBe(true);
    await expect
      .poll(() => oppdaterStillingKallMottatt, {
        message: 'oppdaterStilling ble ikke kalt for DIR-etterregistrering',
        timeout: 15000,
      })
      .toBe(true);
  });
});
