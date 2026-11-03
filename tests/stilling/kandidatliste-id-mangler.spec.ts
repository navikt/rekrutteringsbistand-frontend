import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test('Viser feilmelding og logger advarsel når kandidatliste-id mangler', async ({
  page,
}) => {
  await page.route(
    '**/api/kandidat/veileder/stilling/*/kandidatlisteinfo',
    (route) =>
      route.fulfill({ status: 404, json: { message: 'Fant ikke liste' } }),
  );

  const advarselLogget = page.waitForRequest(
    (request) =>
      request.url().includes('/api/logger') &&
      request.method() === 'POST' &&
      (request.postData() ?? '').includes('Kandidatliste-id mangler'),
  );

  await gotoApp(page, '/stilling/minStilling/kandidatliste/TEST-KANDIDAT');

  await expect(page.getByText('Fant ikke kandidatlisten')).toBeVisible();
  await expect(
    page.getByText(
      'Vi klarte ikke å hente kandidatlisten til dette stillingsoppdraget.',
      { exact: false },
    ),
  ).toBeVisible();

  const logg = await advarselLogget;
  expect(logg.postData()).toContain('KandidatlisteContext');
});
