import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const kiValideringsfeil = (feilkode: string) => ({
  type: 'about:blank',
  title: 'KiValideringsException',
  status: 422,
  detail: 'Teksten har blitt endret etter KI-valideringen.',
  instance: '/api/rekrutteringstreff/utkast',
  timestamp: '2026-10-21T10:00:00',
  feilkode,
});

test.describe('Lagring av rekrutteringstreff med valideringsfeil (422)', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/rekrutteringstreff/utkast/ki/valider', (route) =>
      route.fulfill({
        json: {
          loggId: '11111111-1111-1111-1111-111111111111',
          bryterRetningslinjer: false,
          begrunnelse: '',
          validertTekst: 'Ny tittel',
        },
      }),
    );
  });

  test('viser melding om at teksten må sjekkes på nytt ved KI_TEKST_ENDRET', async ({
    page,
  }) => {
    await page.route('**/api/rekrutteringstreff/utkast', (route) =>
      route.request().method() === 'PUT'
        ? route.fulfill({
            status: 422,
            json: kiValideringsfeil('KI_TEKST_ENDRET'),
          })
        : route.fallback(),
    );

    await gotoApp(page, '/rekrutteringstreff/utkast/rediger');

    const tittelInput = page.getByLabel('Navn på treffet');
    await tittelInput.clear();
    await tittelInput.fill('Ny tittel');
    await page.locator('#tittel-ki-sjekk-knapp').click();

    await expect(
      page.getByRole('alert').filter({
        hasText:
          'Teksten er endret etter KI-sjekken. Sjekk teksten på nytt før du lagrer.',
      }),
    ).toBeVisible();
    await expect(page.getByText('Ukjent feil')).toHaveCount(0);
    await expect(page.locator('#tittel-ki-sjekk-knapp')).toBeEnabled();
  });

  test('viser generell melding ved 422 uten kjent feilkode', async ({
    page,
  }) => {
    await page.route('**/api/rekrutteringstreff/utkast', (route) =>
      route.request().method() === 'PUT'
        ? route.fulfill({ status: 422, body: '' })
        : route.fallback(),
    );

    await gotoApp(page, '/rekrutteringstreff/utkast/rediger');

    const tittelInput = page.getByLabel('Navn på treffet');
    await tittelInput.clear();
    await tittelInput.fill('Ny tittel');
    await page.locator('#tittel-ki-sjekk-knapp').click();

    await expect(
      page.getByRole('alert').filter({
        hasText: 'Endringene ble avvist fordi noe i skjemaet ikke er gyldig.',
      }),
    ).toBeVisible();
  });
});
