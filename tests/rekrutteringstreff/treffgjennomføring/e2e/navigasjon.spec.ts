import {
  expect,
  lagringsstatus,
  test,
  åpneInteresse,
  åpneTreffgjennomføring,
} from './oppsett';
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

for (const navigerMed of ['knapp', 'indikator', 'lenke'] as const) {
  test(`husker åpnet vurdering etter sletting og oppfriskning via ${navigerMed}`, async ({
    page,
  }) => {
    await åpneInteresse(page);
    const interesse = page
      .getByRole('region', { name: 'Interesse', exact: true })
      .getByRole('checkbox')
      .first();
    await interesse.check();
    await expect(lagringsstatus(page, 'Interesse')).toContainText('Lagret');
    let antallFordelinger = 0;
    let antallStegskrivinger = 0;
    page.on('request', (request) => {
      if (request.url().endsWith('/intervjufordeling/fordel'))
        antallFordelinger++;
      if (request.url().endsWith('/treffgjennomforing/steg'))
        antallStegskrivinger++;
    });

    if (navigerMed === 'knapp') {
      await page.getByRole('button', { name: 'Neste', exact: true }).click();
      await expect(page).toHaveURL(/[?&]visSteg=4(?:&|$)/);
      await page.getByRole('button', { name: 'Neste', exact: true }).click();
    } else if (navigerMed === 'indikator') {
      await page
        .getByRole('button', { name: 'Vurdering og oppfølging', exact: true })
        .click();
    } else {
      const url = new URL(page.url());
      url.searchParams.set('visSteg', '5');
      await page.goto(url.toString());
    }
    await expect(page).toHaveURL(/[?&]visSteg=5(?:&|$)/);
    await expect(
      page.getByRole('button', { name: 'Oppsummering', exact: true }),
    ).toBeEnabled();
    expect(antallFordelinger).toBe(1);
    const skrivingerFørGjenbesøk = antallStegskrivinger;

    await page.getByRole('button', { name: 'Interesse', exact: true }).click();
    await interesse.uncheck();
    await expect(lagringsstatus(page, 'Interesse')).toContainText('Lagret');
    await page.getByRole('button', { name: 'Oppmøte', exact: true }).click();
    const oppmøte = page.getByRole('region', { name: 'Oppmøte', exact: true });
    await expect(oppmøte.getByRole('checkbox').first()).toBeVisible();
    for (const valg of await oppmøte.getByRole('checkbox').all()) {
      await valg.uncheck();
    }
    await expect(lagringsstatus(page, 'Oppmøte')).toContainText('Lagret');
    await expect(oppmøte.getByText(/^0 møtt av /)).toBeVisible();
    await page.reload();
    await expect(oppmøte.getByText(/^0 møtt av /)).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Gå til rom og rotasjon' }),
    ).toBeEnabled();
    await page.getByRole('button', { name: 'Gå til rom og rotasjon' }).click();
    await expect(page).toHaveURL(/[?&]visSteg=2(?:&|$)/);
    for (const steg of [3, 4, 5]) {
      await page.getByRole('button', { name: 'Neste', exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`[?&]visSteg=${steg}(?:&|$)`));
    }
    expect(antallFordelinger).toBe(1);
    expect(antallStegskrivinger).toBe(skrivingerFørGjenbesøk);
    await expect(
      page.getByRole('button', { name: 'Oppsummering', exact: true }),
    ).toBeEnabled();
    await page
      .getByRole('button', { name: 'Oppsummering', exact: true })
      .click();
    await expect(page).toHaveURL(/[?&]visSteg=6(?:&|$)/);
  });
}

test('indikatoren blir på gjeldende steg ved lagringsfeil og kan prøves igjen', async ({
  page,
}) => {
  await åpneTreffgjennomføring(page);
  await page.route('**/treffgjennomforing/steg', (route) =>
    route.fulfill({ status: 500, json: { feil: 'Testfeil' } }),
  );
  await page
    .getByRole('button', { name: 'Rom og rotasjon', exact: true })
    .click();
  await expect(
    page.getByText('Kunne ikke åpne steget. Prøv igjen.'),
  ).toBeVisible();
  await expect(page.locator('[aria-current="step"]')).toHaveText(/Oppmøte/);
  await page.unroute('**/treffgjennomforing/steg');
  await page.getByRole('button', { name: 'Prøv igjen', exact: true }).click();
  await expect(page).toHaveURL(/[?&]visSteg=2(?:&|$)/);
});

test('beholder lagret førstegangsfordeling når lagring av vurderingssteget feiler', async ({
  page,
}) => {
  await åpneInteresse(page);
  await page
    .getByRole('region', { name: 'Interesse', exact: true })
    .getByRole('checkbox')
    .first()
    .check();
  await expect(lagringsstatus(page, 'Interesse')).toContainText('Lagret');
  let antallFordelinger = 0;
  page.on('request', (request) => {
    if (request.url().endsWith('/intervjufordeling/fordel'))
      antallFordelinger++;
  });
  await page.route('**/treffgjennomforing/steg', (route) =>
    route.fulfill({ status: 500, json: { feil: 'Testfeil' } }),
  );
  await page
    .getByRole('button', { name: 'Vurdering og oppfølging', exact: true })
    .click();
  await expect(
    page.getByText('Kunne ikke åpne steget. Prøv igjen.'),
  ).toBeVisible();
  await expect(page).toHaveURL(/[?&]visSteg=3(?:&|$)/);
  expect(antallFordelinger).toBe(1);
  await page.unroute('**/treffgjennomforing/steg');
  await page.getByRole('button', { name: 'Prøv igjen', exact: true }).click();
  await expect(page).toHaveURL(/[?&]visSteg=5(?:&|$)/);
  expect(antallFordelinger).toBe(1);
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
