import { expect, test, åpneInteresse, åpneTreffgjennomføring } from './oppsett';
import { gotoApp } from '@/tests/gotoApp';

test('skjuler WorkOp-fanen når treffgjennomføringen ikke er tilgjengelig', async ({
  page,
}) => {
  await page.route('**/treffgjennomforing-og-oppfolging', async (route) => {
    await route.fulfill({
      status: 403,
      json: { feil: 'Ingen tilgang til treffgjennomføringen.' },
    });
  });

  await gotoApp(page, '/rekrutteringstreff/workop');

  await expect(page.getByRole('tab', { name: 'Jobbsøkere' })).toBeVisible();
  await expect(
    page.getByRole('tab', { name: 'Treffgjennomføring' }),
  ).toHaveCount(0);
});

test('holder aktivt steg i URL-en', async ({ page }) => {
  await åpneTreffgjennomføring(page);

  const aktivtSteg = page.locator('[aria-current="step"]');

  await expect(aktivtSteg).toHaveText(/Oppmøte/);

  await page.getByRole('button', { name: 'Gå til rom og rotasjon' }).click();
  await page.getByRole('button', { name: 'Opprett møteplan' }).click();
  await page.getByRole('button', { name: 'Neste', exact: true }).click();
  await expect(aktivtSteg).toHaveText(/Interesse/);
  await expect
    .poll(() => new URL(page.url()).searchParams.get('visSteg'))
    .toBe('3');

  // Steg 1 er utgangspunktet, og skal ikke ligge igjen i URL-en når man går
  // tilbake dit.
  await page.getByRole('button', { name: /Oppmøte/ }).click();
  await expect(aktivtSteg).toHaveText(/Oppmøte/);
  await expect
    .poll(() => new URL(page.url()).searchParams.get('visSteg'))
    .toBeNull();

  // Stegvelgeren skal skrive til URL-en på samme måte som Neste-knappen.
  await page.getByRole('button', { name: /Interesse/ }).click();
  await expect(aktivtSteg).toHaveText(/Interesse/);
  await expect
    .poll(() => new URL(page.url()).searchParams.get('visSteg'))
    .toBe('3');

  // Steget skal overleve en oppfriskning. Midt i et treff er det forskjellen
  // på å miste plassen sin og å fortsette der man var.
  await page.reload();
  await expect(aktivtSteg).toHaveText(/Interesse/);

  // En delt lenke kan peke på et steg treffet ikke har kommet til. Da skal man
  // havne på nærmeste steg som finnes, ikke på en tom side. Ingen interesser er
  // registrert ennå, så veien stopper ved steg 4.
  const url = new URL(page.url());
  url.searchParams.set('visSteg', '7');
  await page.goto(url.toString());
  await expect(aktivtSteg).toHaveText(/Interesse/);
  // Adressen rettes opp, slik at den viser det man faktisk ser på.
  await expect
    .poll(() => new URL(page.url()).searchParams.get('visSteg'))
    .toBe('3');

  // Tull i adressefeltet skal ikke velte siden.
  url.searchParams.set('visSteg', 'tull');
  await page.goto(url.toString());
  await expect(aktivtSteg).toHaveText(/Oppmøte/);
});

test('holder oppsummeringen tilgjengelig etter at man har vært innom den', async ({
  page,
}) => {
  await åpneInteresse(page);

  await page
    .getByRole('checkbox', { name: /Marius Etternavn01 Eksempelbakeriet AS/ })
    .click();
  await page.getByRole('button', { name: 'Neste', exact: true }).click();
  await page.getByRole('button', { name: 'Neste', exact: true }).click();

  const stegoppdatering = page.waitForResponse('**/treffgjennomforing/steg');
  await page.getByRole('button', { name: 'Neste', exact: true }).click();
  expect((await stegoppdatering).ok()).toBeTruthy();

  const aktivtSteg = page.locator('[aria-current="step"]');
  await expect(aktivtSteg).toHaveText(/Oppsummering/);

  // Oppsummeringen skal fortsatt være åpen når man har vært innom den, også
  // etter en tur innom de tidligere stegene.
  await page.getByRole('button', { name: /Oppmøte/ }).click();
  await expect(aktivtSteg).toHaveText(/Oppmøte/);
  await page.getByRole('button', { name: /Oppsummering/ }).click();
  await expect(aktivtSteg).toHaveText(/Oppsummering/);
  await expect(
    page
      .getByRole('region', { name: 'Oppsummering' })
      .getByRole('heading', { name: 'Oppsummering', level: 3 }),
  ).toBeVisible();

  await page.getByRole('button', { name: /Vurdering og oppfølging/ }).click();
  await expect(aktivtSteg).toHaveText(/Vurdering og oppfølging/);
  await page.getByRole('button', { name: /Oppsummering/ }).click();
  await expect(aktivtSteg).toHaveText(/Oppsummering/);
});
