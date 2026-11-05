import { gotoApp } from '@/tests/gotoApp';
import { expect, test, type Page } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const meldingTittel = 'Fant ikke kandidatlisten';

async function mockKandidatlisteinfoMangler(page: Page) {
  await page.route(
    '**/api/kandidat/veileder/stilling/*/kandidatlisteinfo',
    (route) =>
      route.fulfill({ status: 404, json: { message: 'Fant ikke liste' } }),
  );
}

function ventPåAdvarsel(page: Page, komponent: string) {
  return page.waitForRequest(
    (request) =>
      request.url().includes('/api/logger') &&
      request.method() === 'POST' &&
      (request.postData() ?? '').includes('Kandidatliste-id mangler') &&
      (request.postData() ?? '').includes(komponent),
  );
}

test.describe('Kandidatliste-id mangler', () => {
  test('Viser fanen og feilmelding i listevisningen, og logger advarsel', async ({
    page,
  }) => {
    await mockKandidatlisteinfoMangler(page);
    const advarsel = ventPåAdvarsel(page, 'StillingVisning');

    await gotoApp(page, '/stilling/minStilling?stillingFane=kandidater');

    await expect(
      page.getByRole('tab', { name: 'Jobbsøkere (-)' }),
    ).toBeVisible();
    await expect(page.getByText(meldingTittel)).toBeVisible();
    await advarsel;
  });

  test('Viser feilmelding og logger advarsel i kandidatvisningen', async ({
    page,
  }) => {
    await mockKandidatlisteinfoMangler(page);
    const advarsel = ventPåAdvarsel(page, 'KandidatlisteContext');

    await gotoApp(page, '/stilling/minStilling/kandidatliste/TEST-KANDIDAT');

    await expect(page.getByText(meldingTittel)).toBeVisible();
    await advarsel;
  });

  test('Viser ikke feilmelding for ekstern stilling uten rekrutteringsoppdrag', async ({
    page,
  }) => {
    await mockKandidatlisteinfoMangler(page);

    await gotoApp(page, '/stilling/eksternStilling?stillingFane=kandidater');

    await expect(page.getByTestId('stilling-side')).toBeVisible();
    await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toBeHidden();
    await expect(page.getByText(meldingTittel)).toBeHidden();
  });
});
