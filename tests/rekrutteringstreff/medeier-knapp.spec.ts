import { decoratorMock } from '@/app/api/modia/decorator/mocks/dekoratørMock';
import { rekrutteringstreffMock } from '@/app/api/rekrutteringstreff/[...slug]/rekrutteringstreffMock';
import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test('medeierknappen utløser ikke en henteløkke når headeren får mindre plass', async ({
  page,
  context,
}) => {
  await context.addCookies([
    {
      name: 'DEV-ROLLE',
      value: 'AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER',
      domain: 'localhost',
      path: '/',
    },
  ]);
  const treff = rekrutteringstreffMock('publisert');
  treff.eierOgKontor = treff.eierOgKontor.filter(
    (eier) => eier.navIdent !== decoratorMock.ident,
  );
  let antallTreffKall = 0;
  await page.route('**/api/modia/decorator', (route) =>
    route.fulfill({ json: decoratorMock }),
  );
  await page.route('**/api/rekrutteringstreff/publisert', (route) => {
    antallTreffKall++;
    return route.fulfill({ json: treff });
  });
  await page.setViewportSize({ width: 1900, height: 1080 });
  await gotoApp(page, '/rekrutteringstreff/publisert');
  await expect(
    page.getByRole('button', { name: 'Legg til meg som medeier' }),
  ).toBeVisible();
  await page.waitForLoadState('networkidle');
  antallTreffKall = 0;

  const henteløkke = page.waitForRequest(
    (request) =>
      new URL(request.url()).pathname === '/api/rekrutteringstreff/publisert' &&
      antallTreffKall > 2,
    { timeout: 2000 },
  );
  await page.setViewportSize({ width: 1312, height: 1080 });
  await expect(henteløkke).rejects.toThrow(/Timeout/);
  expect(antallTreffKall).toBeLessThanOrEqual(2);
  await expect(
    page.getByRole('button', { name: 'Legg til meg som medeier' }),
  ).toBeVisible();
});
