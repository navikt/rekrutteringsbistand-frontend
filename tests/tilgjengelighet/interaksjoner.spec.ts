import { behovMetadataMock } from '@/app/api/rekrutteringstreff/arbeidsgiver-behov-metadata/useBehovMetadata';
import { PLAYWRIGHT_MSW_SCOPE_COOKIE } from '@/app/api/rekrutteringstreff/mswScope';
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
  test.describe('Rekrutteringstreff', () => {
    test.beforeEach(async ({ page }, testInfo) => {
      // Egen mock-tilstand per test, slik at endringer ikke lekker mellom tester.
      await page.context().addCookies([
        {
          name: PLAYWRIGHT_MSW_SCOPE_COOKIE,
          value: encodeURIComponent(testInfo.testId),
          domain: 'localhost',
          path: '/',
        },
      ]);
      await page.route(
        '**/api/rekrutteringstreff/arbeidsgiver-behov-metadata',
        (route) =>
          route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(behovMetadataMock),
          }),
      );
      await gotoApp(page, '/rekrutteringstreff/publisert');
      await expect(
        page.getByRole('button', { name: 'Legg til arbeidsgiver' }),
      ).toBeVisible({ timeout: 25000 });
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
      await dialog
        .getByRole('option', { name: /TEST PLUTSELIG KATT/i })
        .click();

      await sjekkSkjemafeil(
        page,
        dialog.getByRole('button', { name: 'Legg til', exact: true }),
        { forventFokus: true },
      );
    });

    test('dialogen for å redigere behov (2.1.2, 2.4.3, 4.1.2)', async ({
      page,
    }) => {
      await page.getByRole('tab', { name: /Arbeidsgivere/ }).click();
      await sjekkDialog(
        page,
        page.getByRole('button', { name: /^Rediger behov for / }).first(),
      );
    });

    test('feil i skjemaet for å redigere behov (3.3.1)', async ({ page }) => {
      await page.getByRole('tab', { name: /Arbeidsgivere/ }).click();
      await page
        .getByRole('button', { name: /^Rediger behov for / })
        .first()
        .click();
      const dialog = page.getByRole('dialog', { name: /Rediger behov/i });
      const antall = dialog.getByLabel('Antall stillinger');
      // Vent til eksisterende behov er fylt inn, ellers overskrives feltet.
      await expect(antall).toHaveValue('3');
      await antall.clear();

      await sjekkSkjemafeil(
        page,
        dialog.getByRole('button', { name: 'Lagre' }),
        {
          forventFokus: true,
        },
      );
    });

    test('dialogen for å slette arbeidsgiver (2.1.2, 2.4.3, 4.1.2)', async ({
      page,
    }) => {
      // Slett er deaktivert når treffet bare har én arbeidsgiver, så vi bruker
      // et treff med flere.
      await gotoApp(page, '/rekrutteringstreff/workop');
      await page.getByRole('tab', { name: /Arbeidsgivere/ }).click();
      const slett = page
        .getByRole('button', { name: 'Slett', exact: true })
        .first();
      await expect(slett).toBeEnabled();

      await sjekkDialog(page, slett);
    });

    test('hjelpeteksten når siste arbeidsgiver ikke kan slettes (1.4.13)', async ({
      page,
    }) => {
      await page.getByRole('tab', { name: /Arbeidsgivere/ }).click();
      const slett = page.getByRole('button', { name: 'Slett', exact: true });
      await expect(slett).toHaveCount(1);
      await expect(slett).toHaveAttribute('aria-disabled', 'true');

      await sjekkPekerfølsomtInnhold(page, slett);
    });

    test('hjelpeteksten på eierne av treffet (1.4.13)', async ({ page }) => {
      await sjekkPekerfølsomtInnhold(
        page,
        page.getByRole('list', { name: 'Eiere' }).getByRole('img').first(),
      );
    });
  });

  test.describe('Jobbsøkere', () => {
    test.beforeEach(async ({ page, context }) => {
      await context.addInitScript(() =>
        sessionStorage.removeItem('markerte-kandidater'),
      );
      await gotoApp(page, '/kandidat');
      await page
        .getByRole('checkbox', { name: /^Velg kandidat / })
        .first()
        .check();
    });

    test('dialogen for å lagre i kandidatliste (2.1.2, 2.4.3, 4.1.2)', async ({
      page,
    }) => {
      await sjekkDialog(
        page,
        page.getByRole('button', {
          name: 'Lagre i kandidatliste',
          exact: true,
        }),
      );
    });

    test('dialogen for å lagre i rekrutteringstreff (2.1.2, 2.4.3, 4.1.2)', async ({
      page,
    }) => {
      await sjekkDialog(
        page,
        page.getByRole('button', {
          name: 'Lagre i rekrutteringstreff',
          exact: true,
        }),
      );
    });
  });
});
