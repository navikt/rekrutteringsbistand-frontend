import { decoratorMock } from '@/app/api/modia/decorator/mocks/dekoratørMock';
import { rekrutteringstreffMock } from '@/app/api/rekrutteringstreff/[...slug]/rekrutteringstreffMock';
import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

for (const erRegistrertEier of [false, true]) {
  const knappNavn = erRegistrertEier
    ? 'Fjern meg som eier'
    : 'Legg meg til som medeier';

  const dialogNavn = erRegistrertEier
    ? 'Vil du fjerne deg som eier av rekrutteringstreffet?'
    : 'Bli medeier av dette treffet?';

  test(`${knappNavn} følger knappelisten uten henteløkke eller dupliserte dialoger`, async ({
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
    if (!erRegistrertEier) {
      treff.eierOgKontor = treff.eierOgKontor.filter(
        (eier) => eier.navIdent !== decoratorMock.ident,
      );
    }
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
    await page.waitForLoadState('networkidle');
    const eierKnapp = page.getByRole('button', { name: knappNavn });
    await expect(eierKnapp).toBeVisible();
    const eierPlassering = await eierKnapp.boundingBox();
    const avlysPlassering = await page
      .getByRole('button', { name: 'Avlys', exact: true })
      .boundingBox();
    if (!eierPlassering || !avlysPlassering) {
      throw new Error('Kunne ikke måle plasseringen til knappene i headeren');
    }
    expect(eierPlassering.x).toBeGreaterThanOrEqual(
      avlysPlassering.x + avlysPlassering.width,
    );
    await page.getByRole('button', { name: 'Avlys', exact: true }).focus();
    await page.keyboard.press('Tab');
    await expect(eierKnapp).toBeFocused();
    await eierKnapp.click();
    const dialog = page.getByRole('dialog', { name: dialogNavn });
    await expect(dialog).toBeVisible();
    await page.waitForLoadState('networkidle');
    antallTreffKall = 0;

    const henteløkke = page.waitForRequest(
      (request) =>
        new URL(request.url()).pathname ===
          '/api/rekrutteringstreff/publisert' && antallTreffKall > 2,
      { timeout: 2000 },
    );
    await page.setViewportSize({ width: 1312, height: 1080 });
    await expect(henteløkke).rejects.toThrow(/Timeout/);
    expect(antallTreffKall).toBeLessThanOrEqual(2);
    await expect(dialog).toBeVisible();
    await expect(
      page.getByRole('dialog', { name: dialogNavn, includeHidden: true }),
    ).toHaveCount(1);
    await dialog.getByRole('button', { name: 'Avbryt', exact: true }).click();
    await expect(dialog).not.toBeVisible();
    const menyKnapp = page.getByRole('button', { name: 'Flere handlinger' });
    const tittel = page.getByRole('heading', {
      name: treff.tittel,
      exact: true,
    });
    const delingslenkerKnapp = page.getByRole('button', {
      name: 'Del',
      exact: true,
    });
    await expect(delingslenkerKnapp).toBeVisible();
    const delingslenkePlassering = await delingslenkerKnapp.boundingBox();
    const tittelPlassering = await tittel.boundingBox();
    if (!delingslenkePlassering || !tittelPlassering) {
      throw new Error(
        'Kunne ikke måle plasseringen til tittelen og deleknappen',
      );
    }
    expect(delingslenkePlassering.x).toBeGreaterThanOrEqual(
      tittelPlassering.x + tittelPlassering.width,
    );
    expect(
      Math.abs(
        delingslenkePlassering.y +
          delingslenkePlassering.height / 2 -
          (tittelPlassering.y + tittelPlassering.height / 2),
      ),
    ).toBeLessThan(8);

    await delingslenkerKnapp.click();
    const kollegaLenkeKnapp = page.getByRole('button', {
      name: 'Delingslenke – kollega',
      exact: true,
    });
    const jobbsøkerLenkeKnapp = page.getByRole('button', {
      name: 'Delingslenke – jobbsøker',
      exact: true,
    });
    await expect(kollegaLenkeKnapp).toBeVisible();
    await expect(jobbsøkerLenkeKnapp).toBeVisible();
    await expect(kollegaLenkeKnapp.locator('svg')).toHaveCount(1);
    await expect(jobbsøkerLenkeKnapp.locator('svg')).toHaveCount(1);
    await context.grantPermissions(['clipboard-read', 'clipboard-write'], {
      origin: new URL(page.url()).origin,
    });
    const baseUrl = new URL(page.url()).origin;
    await kollegaLenkeKnapp.click();
    await expect
      .poll(() => page.evaluate(() => navigator.clipboard.readText()))
      .toBe(`${baseUrl}/rekrutteringstreff/publisert`);
    await jobbsøkerLenkeKnapp.click();
    await expect
      .poll(() => page.evaluate(() => navigator.clipboard.readText()))
      .toBe(
        'https://rekrutteringstreff-bruker.intern.dev.nav.no/rekrutteringstreff/publisert',
      );
    await page.keyboard.press('Escape');
    await expect(delingslenkerKnapp).toHaveAttribute('aria-expanded', 'false');

    if (await menyKnapp.isVisible()) {
      await menyKnapp.click();
    }
    await expect(eierKnapp).toBeVisible();
    await expect(eierKnapp).toHaveCount(1);
    if (!erRegistrertEier) {
      await expect(eierKnapp.getByText(knappNavn, { exact: true })).toHaveCSS(
        'text-align',
        'left',
      );
    }
    await eierKnapp.click();
    await expect(dialog).toBeVisible();
    await page.setViewportSize({ width: 1900, height: 1080 });
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'Avbryt', exact: true }).click();
    await expect(dialog).not.toBeVisible();
  });
}
