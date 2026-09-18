import { decoratorMock } from '@/app/api/modia/decorator/mocks/dekoratørMock';
import { rekrutteringstreffMock } from '@/app/api/rekrutteringstreff/[...slug]/rekrutteringstreffMock';
import type { EierOgKontor } from '@/app/api/rekrutteringstreff/eierOgKontor';
import { testbrukere } from '@/app/api/rekrutteringstreff/eierOgKontorMock';
import { gotoApp } from '@/tests/gotoApp';
import { expect, type Page, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const treffId = 'fjern-eier-test';
const knappNavn = 'Fjern meg som eier';

async function mockTreff(
  page: Page,
  eiere: EierOgKontor[] = [testbrukere.innlogget, testbrukere.anna],
) {
  const treff = {
    ...rekrutteringstreffMock('publisert'),
    id: treffId,
    eierOgKontor: [...eiere],
  };
  await page.route('**/api/modia/decorator', (route) =>
    route.fulfill({ json: decoratorMock }),
  );
  await page.route(`**/api/rekrutteringstreff/${treffId}`, (route) =>
    route.fulfill({ json: treff }),
  );
  return treff;
}

test('fjerner eieren først etter bekreftelse og oppdaterer tilgangen', async ({
  page,
}) => {
  const treff = await mockTreff(page);
  let antallSlettinger = 0;
  await page.route(`**/${treffId}/eiere/*`, async (route) => {
    antallSlettinger++;
    expect(route.request().method()).toBe('DELETE');
    expect(new URL(route.request().url()).pathname).toBe(
      `/api/rekrutteringstreff/${treffId}/eiere/${decoratorMock.ident}`,
    );
    treff.eierOgKontor = [testbrukere.anna];
    await route.fulfill({ status: 204 });
  });

  await gotoApp(page, `/rekrutteringstreff/${treffId}`);
  await page.getByRole('button', { name: knappNavn }).click();
  const dialog = page.getByRole('dialog', {
    name: 'Vil du fjerne deg som eier av rekrutteringstreffet?',
  });
  await expect(dialog).toBeVisible();
  expect(antallSlettinger).toBe(0);
  await dialog.getByRole('button', { name: 'Fjern meg', exact: true }).click();

  await expect(
    page.getByText('Du er ikke lenger eier av treffet.'),
  ).toBeVisible();
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole('button', { name: knappNavn })).toHaveCount(0);
  await expect(
    page.getByRole('button', { name: 'Legg til meg som medeier' }),
  ).toBeVisible();
  await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toHaveCount(0);
  expect(antallSlettinger).toBe(1);
});

test('avbryt lukker dialogen uten å fjerne eierskap', async ({ page }) => {
  await mockTreff(page);
  const slettinger: string[] = [];
  page.on('request', (request) => {
    if (request.method() === 'DELETE') slettinger.push(request.url());
  });
  await gotoApp(page, `/rekrutteringstreff/${treffId}`);
  const knapp = page.getByRole('button', { name: knappNavn });
  await knapp.click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('button', { name: 'Avbryt', exact: true }).click();

  await expect(dialog).not.toBeVisible();
  await expect(knapp).toBeEnabled();
  expect(slettinger).toEqual([]);
});

test('eneste eier får deaktivert knapp med forklaring', async ({ page }) => {
  await mockTreff(page, [testbrukere.innlogget]);
  await gotoApp(page, `/rekrutteringstreff/${treffId}`);
  const knapp = page.getByRole('button', { name: knappNavn });
  await expect(knapp).toBeDisabled();
  await knapp.hover();
  await expect(page.getByRole('tooltip')).toHaveText(
    'Rekrutteringstreffet må ha minst én eier',
  );
});

test('viser feilmelding og beholder eierskap når sletting feiler', async ({
  page,
}) => {
  await mockTreff(page);
  await page.route(`**/${treffId}/eiere/*`, (route) =>
    route.fulfill({ status: 500, json: { feil: 'Sletting avvist' } }),
  );
  await gotoApp(page, `/rekrutteringstreff/${treffId}`);
  await page.getByRole('button', { name: knappNavn }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('button', { name: 'Fjern meg', exact: true }).click();

  await expect(dialog.getByRole('alert')).toContainText(
    'Klarte ikke å fjerne deg som eier. Prøv igjen.',
  );
  await expect(
    dialog.getByRole('button', { name: 'Fjern meg', exact: true }),
  ).toBeEnabled();
  await dialog.getByRole('button', { name: 'Avbryt', exact: true }).click();
  await expect(page.getByRole('button', { name: knappNavn })).toBeEnabled();
});
