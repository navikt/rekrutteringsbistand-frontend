import { medJobbsøkerliste } from './jobbsøkerdata';
import { expect, lagringsstatus, test } from './oppsett';
import { gotoApp } from '@/tests/gotoApp';

test('sletting i jobbsøkerfanen oppdaterer en allerede besøkt gjennomføring', async ({
  page,
}) => {
  await medJobbsøkerliste(page, 25, { antallMøtt: 0 });
  await gotoApp(page, '/rekrutteringstreff/workop?visSteg=1');
  await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
  const oppmøte = page.getByRole('region', { name: 'Oppmøte', exact: true });
  await expect(oppmøte.getByRole('checkbox')).toHaveCount(25);
  await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
  const person = page
    .getByRole('listitem')
    .filter({ hasText: 'Syntetisk-001, Testperson' });
  await person.getByRole('button', { name: 'Saksmeny' }).click();
  await page.getByRole('menuitem', { name: 'Slett Slett' }).click();
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Slett', exact: true })
    .click();
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(person).toHaveCount(0);
  await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
  await expect(oppmøte.getByRole('checkbox')).toHaveCount(24);
  await expect(oppmøte.getByText('0 møtt av 24 påmeldte')).toBeVisible();
  await expect(oppmøte.getByText(/Syntetisk-001/)).toHaveCount(0);
});

for (const antall of [25, 100, 101, 201]) {
  test(`${antall} jobbsøkere hentes sidevis og pagineres bare over 100`, async ({
    page,
  }) => {
    const { søkeforespørsler } = await medJobbsøkerliste(page, antall);
    await gotoApp(page, '/rekrutteringstreff/workop?visSteg=1');
    await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
    const oppmøte = page.getByRole('region', { name: 'Oppmøte' });
    await expect(
      oppmøte.getByText(`${antall} møtt av ${antall} påmeldte`),
    ).toBeVisible();
    await expect(oppmøte.getByRole('checkbox')).toHaveCount(
      Math.min(100, antall),
    );
    expect(søkeforespørsler.every((søk) => søk.side === 1)).toBeTruthy();
    expect(søkeforespørsler.some((søk) => søk.status?.length)).toBeFalsy();
    const nesteSide = oppmøte
      .getByRole('button', { name: 'Neste side' })
      .first();
    if (antall <= 100) {
      await expect(nesteSide).toHaveCount(0);
      return;
    }
    await nesteSide.click();
    await expect(oppmøte.getByRole('listitem').first()).toContainText(
      'Syntetisk-101',
    );
    const valg = oppmøte.getByRole('checkbox').first();
    await valg.uncheck();
    await expect(lagringsstatus(page, 'Oppmøte')).toContainText('Lagret');
    await oppmøte.getByRole('button', { name: 'Forrige side' }).first().click();
    await expect(oppmøte.getByRole('listitem').first()).toContainText(
      'Syntetisk-001',
    );
    await nesteSide.click();
    await expect(valg).not.toBeChecked();
    await valg.check();
    await expect(lagringsstatus(page, 'Oppmøte')).toContainText('Lagret');
    await page.reload();
    await expect(
      oppmøte.getByText(`${antall} møtt av ${antall} påmeldte`),
    ).toBeVisible();
  });
}

test('senere steg henter alle fremmøtte, også de som har fått jobb, men ikke øvrige jobbsøkere', async ({
  page,
}) => {
  const { søkeforespørsler } = await medJobbsøkerliste(page, 350, {
    antallMøtt: 201,
    antallFåttJobb: 1,
  });
  await gotoApp(page, '/rekrutteringstreff/workop?visSteg=3');
  await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
  await expect(
    page
      .getByRole('region', { name: 'Interesse', exact: true })
      .getByText('201. Testperson Syntetisk-201'),
  ).toBeVisible();
  const interesse = page.getByRole('region', {
    name: 'Interesse',
    exact: true,
  });
  await expect(
    interesse.getByText('1. Testperson Syntetisk-001'),
  ).toBeVisible();
  await expect(interesse.getByText(/Syntetisk-202/)).toHaveCount(0);
  expect(
    søkeforespørsler
      .filter((søk) => søk.status?.length)
      .map((søk) => ({ side: søk.side, status: søk.status })),
  ).toEqual(
    [1, 2, 3].map((side) => ({
      side,
      status: ['MØTT_OPP', 'FÅTT_JOBB'],
    })),
  );
  await gotoApp(page, '/rekrutteringstreff/workop?visSteg=6');
  await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
  await expect(
    page
      .getByRole('region', { name: 'Nøkkeltall' })
      .getByText('Av 350 påmeldte'),
  ).toBeVisible();
});

for (const feil of [
  'hentefeil',
  'tom side',
  'feil sidenummer',
  'endret totaltall',
  'overlapp',
  'ugyldig respons',
  'manglende statusfordeling',
  'ikke-fremmøtt rad',
] as const) {
  test(`viser ikke delvis fremmøtteliste ved ${feil}, og lar brukeren hente på nytt`, async ({
    page,
  }) => {
    const { søkRespons } = await medJobbsøkerliste(page, 201);
    let feilPåAndreSide = true;
    await page.route('**/workop/jobbsoker/sok', async (route) => {
      const { side, status } = route.request().postDataJSON();
      if (side !== 2 || !feilPåAndreSide) return route.fallback();
      const data = søkRespons(side, 100, status);
      if (feil === 'hentefeil')
        return route.fulfill({ status: 500, json: { feil: 'Syntetisk feil' } });
      if (feil === 'tom side') data.jobbsøkere = [];
      if (feil === 'feil sidenummer') data.side = 1;
      if (feil === 'endret totaltall') data.totalt = 202;
      if (feil === 'overlapp') data.jobbsøkere = søkRespons(1).jobbsøkere;
      if (feil === 'ugyldig respons')
        return route.fulfill({ json: { syntetisk: 'Ugyldig respons' } });
      if (feil === 'manglende statusfordeling')
        return route.fulfill({
          json: { ...data, antallPerStatus: undefined },
        });
      if (feil === 'ikke-fremmøtt rad') {
        data.jobbsøkere = data.jobbsøkere.map((person, indeks) =>
          indeks === 0 ? { ...person, status: 'INVITERT' } : person,
        );
      }
      await route.fulfill({ json: data });
    });
    await gotoApp(page, '/rekrutteringstreff/workop?visSteg=3');
    await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
    await expect(
      page.getByText('Kunne ikke hente komplett datagrunnlag'),
    ).toBeVisible();
    await expect(
      page.getByRole('region', { name: 'Interesse', exact: true }),
    ).toHaveCount(0);
    feilPåAndreSide = false;
    await page
      .getByRole('button', { name: 'Hent på nytt', exact: true })
      .click();
    await expect(
      page
        .getByRole('region', { name: 'Interesse', exact: true })
        .getByText('201. Testperson Syntetisk-201'),
    ).toBeVisible();
  });
}

test('feil på en ubesøkt oppmøteside blokkerer ikke første side', async ({
  page,
}) => {
  await medJobbsøkerliste(page, 201);
  let andreSideFeiler = true;
  await page.route('**/workop/jobbsoker/sok', async (route) => {
    if (route.request().postDataJSON().side === 2 && andreSideFeiler) {
      return route.fulfill({
        status: 500,
        json: { feil: 'Syntetisk hentefeil' },
      });
    }
    await route.fallback();
  });
  await gotoApp(page, '/rekrutteringstreff/workop?visSteg=1');
  await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
  const oppmøte = page.getByRole('region', { name: 'Oppmøte', exact: true });
  await expect(oppmøte.getByRole('checkbox')).toHaveCount(100);
  await oppmøte.getByRole('button', { name: 'Neste side' }).first().click();
  await expect(
    page.getByText('Kunne ikke hente komplett datagrunnlag'),
  ).toBeVisible();
  andreSideFeiler = false;
  await page.getByRole('button', { name: 'Hent på nytt', exact: true }).click();
  await expect(oppmøte.getByRole('listitem').first()).toContainText(
    'Syntetisk-101',
  );
});

test('sidebytte beholder oppmøtekøen og feil på riktig rad', async ({
  page,
}) => {
  await medJobbsøkerliste(page, 201);
  await gotoApp(page, '/rekrutteringstreff/workop?visSteg=1');
  await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
  const oppmøte = page.getByRole('region', { name: 'Oppmøte', exact: true });
  let slippFørste!: () => void;
  const vent = new Promise<void>((resolve) => {
    slippFørste = resolve;
  });
  const lagredePersoner: string[] = [];
  await page.route('**/treffgjennomforing/oppmote', async (route) => {
    lagredePersoner.push(route.request().postDataJSON().personTreffId);
    if (lagredePersoner.length === 1) {
      await vent;
      await route.fulfill({
        status: 500,
        json: { feil: 'Syntetisk skrivefeil' },
      });
    } else {
      await route.fallback();
    }
  });
  try {
    await oppmøte.getByRole('checkbox').first().uncheck();
    await expect.poll(() => lagredePersoner).toEqual(['test-person-001']);
    await oppmøte.getByRole('button', { name: 'Neste side' }).first().click();
    await expect(oppmøte.getByRole('listitem').first()).toContainText(
      'Syntetisk-101',
    );
    await oppmøte.getByRole('checkbox').first().uncheck();
    await expect(lagringsstatus(page, 'Oppmøte')).toContainText('Lagrer');
    expect(lagredePersoner).toEqual(['test-person-001']);
  } finally {
    slippFørste();
  }
  await expect(
    page.getByRole('button', { name: 'Gå til rom og rotasjon' }),
  ).toBeEnabled();
  expect(lagredePersoner).toEqual(['test-person-001', 'test-person-101']);
  await expect(oppmøte.getByRole('checkbox').first()).not.toBeChecked();
  await expect(oppmøte.getByText(/Vi kunne ikke bekrefte/)).toHaveCount(0);
  await oppmøte.getByRole('button', { name: 'Forrige side' }).first().click();
  const førsteRad = oppmøte.getByRole('listitem').first();
  await expect(førsteRad).toContainText('Syntetisk-001');
  await expect(førsteRad.getByRole('checkbox')).toBeChecked();
  await expect(førsteRad.getByText(/Vi kunne ikke bekrefte/)).toBeVisible();
});

test('oppmøte ugyldiggjør fremmøttecache uten å hente den før neste steg', async ({
  page,
}) => {
  const { søkeforespørsler } = await medJobbsøkerliste(page, 201, {
    antallMøtt: 10,
  });
  await gotoApp(page, '/rekrutteringstreff/workop?visSteg=3');
  await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
  const interesse = page.getByRole('region', {
    name: 'Interesse',
    exact: true,
  });
  await expect(
    interesse.getByText('1. Testperson Syntetisk-001'),
  ).toBeVisible();
  const antallFremmøttesøk = () =>
    søkeforespørsler.filter((søk) => søk.status?.length).length;
  const søkFørOppmøte = antallFremmøttesøk();
  await page.getByRole('button', { name: 'Oppmøte', exact: true }).click();
  const oppmøte = page.getByRole('region', { name: 'Oppmøte', exact: true });
  await oppmøte.getByRole('checkbox').first().uncheck();
  await expect(lagringsstatus(page, 'Oppmøte')).toContainText('Lagret');
  await oppmøte.getByRole('button', { name: 'Neste side' }).first().click();
  await expect(oppmøte.getByRole('listitem').first()).toContainText(
    'Syntetisk-101',
  );
  await oppmøte.getByRole('checkbox').first().check();
  await expect(lagringsstatus(page, 'Oppmøte')).toContainText('Lagret');
  expect(antallFremmøttesøk()).toBe(søkFørOppmøte);
  await page.getByRole('button', { name: 'Interesse', exact: true }).click();
  await expect(
    interesse.getByText('101. Testperson Syntetisk-101'),
  ).toBeVisible();
  await expect(
    interesse.getByText('1. Testperson Syntetisk-001', { exact: true }),
  ).toHaveCount(0);
  expect(antallFremmøttesøk()).toBeGreaterThan(søkFørOppmøte);
});
