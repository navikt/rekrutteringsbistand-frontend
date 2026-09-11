import { expect, test, åpneInteresse, åpneVurdering } from './oppsett';

test('blir på vurdering ved feil og låser redigering til oppsummeringen er klar', async ({
  page,
}) => {
  await åpneVurdering(page);
  const neste = page.getByRole('button').filter({ hasText: 'Neste' });
  const tilbake = page.getByRole('button', { name: 'Tilbake', exact: true });
  const vurdering = page.getByRole('combobox', { name: 'Vurdering' }).first();
  const feil = page.getByText('Kunne ikke åpne oppsummeringen. Prøv igjen.');
  await page.route('**/treffgjennomforing/steg', (route) =>
    route.fulfill({ status: 500, json: { feil: 'Testfeil' } }),
  );
  await neste.click();
  await expect(feil).toBeVisible();
  await expect(page).toHaveURL(/[?&]visSteg=5(?:&|$)/);
  await expect(neste).toBeEnabled();
  await expect(vurdering).toBeEnabled();
  await page.unroute('**/treffgjennomforing/steg');

  let slippLagring!: () => void;
  const vent = new Promise<void>((resolve) => {
    slippLagring = resolve;
  });
  await page.route('**/treffgjennomforing/steg', async (route) => {
    await vent;
    await route.continue();
  });
  try {
    await neste.click();
    await expect(neste).toBeDisabled();
    await expect(tilbake).toBeDisabled();
    await expect(vurdering).toBeDisabled();
    await expect(
      page.getByRole('button', { name: 'Oppmøte', exact: true }),
    ).toHaveCount(0);
    await expect(feil).toBeHidden();
    await expect(
      page.getByRole('heading', { name: 'Oppsummering', exact: true }),
    ).toHaveCount(0);
  } finally {
    slippLagring();
  }
  await expect(
    page.getByRole('heading', { name: 'Oppsummering', exact: true }),
  ).toBeVisible();
  await expect(page).toHaveURL(/[?&]visSteg=6(?:&|$)/);
  await page.reload();
  await expect(
    page.getByRole('heading', { name: 'Oppsummering', exact: true }),
  ).toBeVisible();
});

test('oppsummerer treffet i steg 6 med totalt antall påmeldte', async ({
  page,
}) => {
  await åpneInteresse(page);

  await page
    .getByRole('checkbox', { name: /Marius Etternavn01 Eksempelbakeriet AS/ })
    .click();
  await page
    .getByRole('checkbox', { name: /Emilie Etternavn02 Eksempelbakeriet AS/ })
    .click();
  await page.getByRole('button', { name: 'Neste', exact: true }).click();
  await expect(
    page.getByRole('list', {
      name: 'Intervjurekkefølge hos Eksempelbakeriet AS',
    }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Neste', exact: true }).click();

  const registrering = page.getByRole('region', {
    name: 'Vurdering og oppfølging',
  });
  await expect(registrering.locator('[data-autolagringsstatus]')).toContainText(
    'Lagret',
  );
  const arbeidsgiver1 = page.getByRole('region', {
    name: 'Eksempelbakeriet AS',
  });
  const mariusRad = arbeidsgiver1
    .getByRole('listitem')
    .filter({ hasText: 'Marius Etternavn01' });
  const vurderingslagring = page.waitForResponse('**/oppfolging/vurderinger');
  await mariusRad
    .getByRole('combobox', { name: 'Vurdering' })
    .selectOption('AKTUELL');
  expect((await vurderingslagring).ok()).toBeTruthy();
  const andreIntervjuLagring = page.waitForResponse(
    '**/oppfolging/vurderinger',
  );
  await mariusRad.getByRole('checkbox', { name: '2. intervju' }).check();
  expect((await andreIntervjuLagring).ok()).toBeTruthy();

  await page.getByRole('button', { name: 'Neste', exact: true }).click();

  const oppsummering = page.getByRole('region', { name: 'Oppsummering' });
  await expect(
    oppsummering.getByRole('heading', { name: 'Oppsummering', level: 3 }),
  ).toBeVisible();
  const nøkkeltall = oppsummering.getByRole('region', { name: 'Nøkkeltall' });
  await expect(
    nøkkeltall.getByRole('group', { name: 'Aktuelle kandidater: 1' }),
  ).toBeVisible();
  await expect(
    nøkkeltall.getByRole('group', { name: 'Til andre intervju: 1' }),
  ).toBeVisible();
  await expect(
    nøkkeltall.getByRole('group', { name: 'Ikke vurdert: 1' }),
  ).toBeVisible();
  await expect(nøkkeltall.getByText('Av 30 påmeldte')).toBeVisible();
  await expect(
    nøkkeltall.getByText('Fordelt på 5 arbeidsgivere'),
  ).toBeVisible();

  const perArbeidsgiver = oppsummering.getByRole('region', {
    name: 'Per arbeidsgiver',
  });
  await expect(
    perArbeidsgiver.getByRole('row', { name: /^Eksempelbakeriet AS / }),
  ).toContainText('1');
  await expect(perArbeidsgiver.getByRole('row', { name: / AS / })).toHaveCount(
    5,
  );

  await page.getByRole('button', { name: 'Tilbake', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'Vurdering og oppfølging', level: 3 }),
  ).toBeVisible();

  // Jobbsøkerlista pollerer, så et route-kall kan være underveis når testen
  // avsluttes. Uten dette feiler teardown på en request som aldri fullføres.
  await page.unrouteAll({ behavior: 'ignoreErrors' });
});
