import { PLAYWRIGHT_MSW_SCOPE_COOKIE } from '@/app/api/rekrutteringstreff/mswScope';
import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.beforeEach(async ({ page }, testInfo) => {
  await page.context().addCookies([
    {
      name: PLAYWRIGHT_MSW_SCOPE_COOKIE,
      value: encodeURIComponent(`${testInfo.testId}-${crypto.randomUUID()}`),
      domain: 'localhost',
      path: '/',
    },
  ]);
});

test('oppdaterer oppmøte fra WorkOp-oversikten og jobbsøkerlisten', async ({
  page,
}) => {
  await gotoApp(page, '/rekrutteringstreff/workop');
  await page.getByRole('tab', { name: 'WorkOp-gjennomføring' }).click();

  const oppmøte = page.getByRole('region', { name: 'Oppmøte' });
  const mariusOppmøte = oppmøte
    .getByRole('listitem')
    .filter({ hasText: 'Etternavn01, Marius' });
  const arbeidsgivere = page.getByRole('region', { name: 'Arbeidsgivere' });

  await expect(oppmøte.getByText('20 møtt av 30 påmeldte')).toBeVisible();
  await expect(arbeidsgivere.getByText('5 arbeidsgivere deltar')).toBeVisible();
  const [
    oppmøteOverskriftY,
    arbeidsgivereOverskriftY,
    jobbsøkerY,
    arbeidsgiverY,
  ] = await Promise.all([
    oppmøte
      .getByRole('heading', { name: 'Oppmøte' })
      .evaluate((element) => element.getBoundingClientRect().y),
    arbeidsgivere
      .getByRole('heading', { name: 'Arbeidsgivere' })
      .evaluate((element) => element.getBoundingClientRect().y),
    oppmøte
      .getByRole('listitem')
      .first()
      .evaluate((element) => element.getBoundingClientRect().y),
    arbeidsgivere
      .getByRole('listitem')
      .first()
      .evaluate((element) => element.getBoundingClientRect().y),
  ]);
  expect(oppmøteOverskriftY).toBeCloseTo(arbeidsgivereOverskriftY, 0);
  expect(jobbsøkerY).toBeCloseTo(arbeidsgiverY, 0);

  await mariusOppmøte.getByRole('button', { name: 'Fjern oppmøte' }).click();
  await expect(oppmøte.getByText('19 møtt av 30 påmeldte')).toBeVisible();
  await expect(mariusOppmøte).toHaveCount(0);

  await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
  const mariusRad = page
    .locator('li')
    .filter({ hasText: 'Etternavn01, Marius' });
  await expect(mariusRad.getByText('Møtt', { exact: true })).toHaveCount(0);
  await mariusRad.getByRole('button', { name: 'Saksmeny' }).click();
  await page.getByRole('menuitem', { name: 'Registrer oppmøte' }).click();
  await expect(mariusRad.getByText('Møtt', { exact: true })).toBeVisible();

  await page.getByRole('tab', { name: 'WorkOp-gjennomføring' }).click();
  await expect(oppmøte.getByText('20 møtt av 30 påmeldte')).toBeVisible();
  await expect(
    oppmøte.getByRole('listitem').filter({ hasText: 'Etternavn01, Marius' }),
  ).toBeVisible();
});

test('bygger romfordeling og rotasjonsplan fra møteoppsettet', async ({
  page,
}) => {
  await gotoApp(page, '/rekrutteringstreff/workop');
  await page.getByRole('tab', { name: 'WorkOp-gjennomføring' }).click();

  await page.getByLabel('Starttidspunkt').fill('10:00');
  await page.getByLabel('Varighet per møte (min)').fill('6');
  await page.getByLabel('Pause mellom møter (min)').fill('4');
  await page.getByLabel('Antall rom').fill('4');
  await expect(
    page.getByText(
      'Færre rom enn arbeidsgivere – noen arbeidsgivere venter mellom rundene og roterer inn senere.',
    ),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Sett opp møteplan' }).click();

  const romfordeling = page.getByRole('region', { name: 'Romfordeling' });
  await expect(
    romfordeling.getByRole('region', { name: /^Rom [1-4]$/ }),
  ).toHaveCount(4);
  const rom1 = romfordeling.getByRole('region', { name: 'Rom 1' });
  await expect(rom1.getByRole('listitem')).toHaveCount(5);
  await expect(romfordeling.getByText('5 jobbsøkere')).toHaveCount(0);
  await expect(
    page.getByText(
      '5 runder fra 10:00 til 10:46. Hver arbeidsgiver besøker alle rom.',
    ),
  ).toBeVisible();

  const visRotasjonsplanKnapp = page.getByRole('button', {
    name: 'Vis rotasjonsplan',
  });
  const [visRotasjonsplanX, tilbakeX] = await Promise.all([
    visRotasjonsplanKnapp.evaluate(
      (element) => element.getBoundingClientRect().x,
    ),
    page
      .getByRole('button', { name: 'Tilbake', exact: true })
      .evaluate((element) => element.getBoundingClientRect().x),
  ]);
  expect(visRotasjonsplanX).toBeCloseTo(tilbakeX, 0);

  await visRotasjonsplanKnapp.click();
  const rotasjonsplan = page.getByRole('dialog', { name: 'Rotasjonsplan' });
  await expect(
    rotasjonsplan.getByRole('row', { name: /10:00–10:06/ }),
  ).toBeVisible();
  await expect(rotasjonsplan.getByText('Pause og bytte av rom')).toHaveCount(4);
  await expect(
    rotasjonsplan.getByRole('button', { name: 'Skriv ut' }),
  ).toBeVisible();
});

test('registrerer ønsker og lager rekkefølge for speedintervju', async ({
  page,
}) => {
  await gotoApp(page, '/rekrutteringstreff/workop');

  await page.getByRole('tab', { name: 'WorkOp-gjennomføring' }).click();
  await expect(
    page.getByText('20 møtt · 5 rom · 5 arbeidsgivere'),
  ).toBeVisible();
  const stepper = page.getByRole('list', { name: 'WorkOp-gjennomføring' });
  await expect(stepper.getByText('Oppmøte og oppsett')).toBeVisible();
  await expect(stepper.getByText('Rom og rotasjon')).toBeVisible();
  await expect(stepper.getByText('Ønsker')).toBeVisible();
  await expect(stepper.getByText('Intervjufordeling')).toBeVisible();
  await expect(stepper.getByText('Vurdering')).toBeVisible();

  await page.getByRole('button', { name: 'Sett opp møteplan' }).click();
  await expect(
    page.getByRole('heading', { name: 'Romfordeling' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Neste' }).click();

  const førsteØnskeHosArbeidsgiver1 = page.getByRole('checkbox', {
    name: /Etternavn01, Marius Arbeidsgiver 1/,
  });
  const andreØnskeHosArbeidsgiver1 = page.getByRole('checkbox', {
    name: /Etternavn02, Emilie Arbeidsgiver 1/,
  });
  const førsteØnskeHosArbeidsgiver2 = page.getByRole('checkbox', {
    name: /Etternavn01, Marius Arbeidsgiver 2/,
  });
  await førsteØnskeHosArbeidsgiver1.click();
  await andreØnskeHosArbeidsgiver1.click();
  await førsteØnskeHosArbeidsgiver2.click();
  await expect(førsteØnskeHosArbeidsgiver1).toBeChecked();
  await expect(andreØnskeHosArbeidsgiver1).toBeChecked();
  await expect(førsteØnskeHosArbeidsgiver2).toBeChecked();
  await expect(
    page.getByRole('row', { name: /Etternavn01, Marius/ }),
  ).toContainText('2');
  await page.getByRole('button', { name: 'Neste' }).click();

  const arbeidsgiver1Liste = page.getByRole('list', {
    name: 'Intervjurekkefølge hos Arbeidsgiver 1',
  });
  const arbeidsgiver2Liste = page.getByRole('list', {
    name: 'Intervjurekkefølge hos Arbeidsgiver 2',
  });
  await expect(arbeidsgiver1Liste).toBeVisible();
  await expect(arbeidsgiver2Liste).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Arbeidsgiver 5', level: 4 }),
  ).toBeVisible();
  await expect(page.getByRole('checkbox')).toHaveCount(0);
  await expect(
    page.getByText('Slipp her for å plassere sist over sperrelinjen'),
  ).toHaveCount(0);
  await expect(page.getByLabel('Plasskonflikt')).toHaveCount(0);

  const førsteRad = arbeidsgiver1Liste.getByRole('listitem').nth(0);
  const andreRad = arbeidsgiver1Liste.getByRole('listitem').nth(1);
  await expect(førsteRad).toContainText('Etternavn02, Emilie');
  await expect(andreRad).toContainText('Etternavn01, Marius');
  const lagringsrespons = page.waitForResponse('**/motedag/intervjufordeling');
  await førsteRad.locator('[draggable="true"]').dragTo(andreRad, {
    targetPosition: { x: 20, y: 1 },
  });
  const respons = await lagringsrespons;
  expect(
    respons.ok(),
    `Lagring feilet med ${respons.status()}: ${await respons.text()}`,
  ).toBeTruthy();
  await expect(arbeidsgiver1Liste.getByRole('listitem').nth(0)).toContainText(
    'Etternavn01, Marius',
  );
  await arbeidsgiver1Liste
    .getByRole('listitem')
    .first()
    .getByLabel('Plasskonflikt')
    .hover();
  await expect(page.getByRole('tooltip')).toHaveText(
    'Plass 1 også hos Arbeidsgiver 2',
  );

  await page
    .getByRole('button', {
      name: 'Flytt Etternavn01, Marius ned hos Arbeidsgiver 1',
    })
    .click();
  await expect(arbeidsgiver1Liste.getByRole('listitem').nth(1)).toContainText(
    'Etternavn01, Marius',
  );
  await expect(page.getByLabel('Plasskonflikt')).toHaveCount(0);
  await page
    .getByRole('button', {
      name: 'Flytt Etternavn01, Marius under sperrelinjen hos Arbeidsgiver 1',
    })
    .click();
  const ikkeMedHosArbeidsgiver1 = page.getByRole('list', {
    name: 'Ikke med på speedintervju hos Arbeidsgiver 1',
  });
  await expect(ikkeMedHosArbeidsgiver1).toContainText('Etternavn01, Marius');
  await expect(page.getByLabel('Plasskonflikt')).toHaveCount(0);

  const flyttOppRespons = page.waitForResponse('**/motedag/intervjufordeling');
  await ikkeMedHosArbeidsgiver1
    .getByRole('listitem')
    .first()
    .locator('[draggable="true"]')
    .dragTo(arbeidsgiver1Liste.getByRole('listitem').first(), {
      targetPosition: { x: 20, y: 1 },
    });
  expect((await flyttOppRespons).ok()).toBeTruthy();
  await expect(arbeidsgiver1Liste.getByRole('listitem').first()).toContainText(
    'Etternavn01, Marius',
  );

  await page
    .getByRole('button', {
      name: 'Flytt Etternavn01, Marius ned hos Arbeidsgiver 1',
    })
    .click();
  await expect(arbeidsgiver1Liste.getByRole('listitem').nth(1)).toContainText(
    'Etternavn01, Marius',
  );
  await page
    .getByRole('button', {
      name: 'Flytt Etternavn01, Marius under sperrelinjen hos Arbeidsgiver 1',
    })
    .click();
  await expect(ikkeMedHosArbeidsgiver1).toContainText('Etternavn01, Marius');

  await page.getByRole('button', { name: 'Tilbake', exact: true }).click();
  await expect(
    page.getByRole('checkbox', {
      name: /Etternavn01, Marius Arbeidsgiver 1/,
    }),
  ).toBeChecked();
  await page.getByRole('button', { name: 'Neste' }).click();
  await expect(
    page.getByRole('list', {
      name: 'Ikke med på speedintervju hos Arbeidsgiver 1',
    }),
  ).toContainText('Etternavn01, Marius');

  const arbeidsgiver1Knapp = page
    .getByRole('region', { name: 'Arbeidsgiver 1' })
    .getByRole('button', { name: 'Vis mer' });
  await arbeidsgiver1Knapp.click();
  await expect(
    page.getByRole('list', {
      name: 'Intervjurekkefølge hos Arbeidsgiver 1',
    }),
  ).not.toBeVisible();
  await arbeidsgiver1Knapp.click();
  await expect(
    page.getByRole('list', {
      name: 'Intervjurekkefølge hos Arbeidsgiver 1',
    }),
  ).toBeVisible();

  await page.route('**/motedag/intervjufordeling', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ feil: 'Testfeil' }),
    });
  });
  await page
    .getByRole('button', {
      name: 'Flytt Etternavn01, Marius over sperrelinjen hos Arbeidsgiver 1',
    })
    .click();
  await expect(
    page.getByText(
      'Kunne ikke lagre intervjufordelingen. Flyttingen ble tilbakestilt. Prøv igjen.',
    ),
  ).toBeVisible();
  await expect(
    page.getByRole('list', {
      name: 'Ikke med på speedintervju hos Arbeidsgiver 1',
    }),
  ).toContainText('Etternavn01, Marius');
  await page.unroute('**/motedag/intervjufordeling');

  await page.getByRole('button', { name: 'Neste' }).click();
  await expect(
    page.getByText(
      'Vurderingsmatrisen bygges i neste fase. Intervjutildelingene er klare som grunnlag.',
    ),
  ).toBeVisible();
  await expect(
    page
      .getByRole('tabpanel', { name: 'WorkOp-gjennomføring' })
      .getByRole('combobox'),
  ).toHaveCount(0);
});
