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

  await page.getByLabel('Starttidspunkt').fill('');
  await page.getByLabel('Varighet per møte (min)').fill('0');
  await page.getByLabel('Pause mellom møter (min)').fill('-1');
  await page.getByLabel('Antall rom').fill('0');
  const opprettMøteplan = page.getByRole('button', {
    name: 'Opprett møteplan',
  });
  await opprettMøteplan.click();
  await expect(page.getByText('Oppgi et gyldig starttidspunkt.')).toBeVisible();
  await expect(
    page.getByText('Varigheten må være minst 1 minutt.'),
  ).toBeVisible();
  await expect(page.getByText('Pausen kan ikke være negativ.')).toBeVisible();
  await expect(page.getByText('Det må være minst 1 rom.')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Romfordeling' })).toHaveCount(
    0,
  );

  await page.getByLabel('Starttidspunkt').fill('10:00');
  await page.getByLabel('Varighet per møte (min)').fill('6');
  await page.getByLabel('Pause mellom møter (min)').fill('4');
  await page.getByLabel('Antall rom').fill('4');
  await expect(
    page.getByText(
      'Færre rom enn arbeidsgivere – noen arbeidsgivere venter mellom rundene og roterer inn senere.',
    ),
  ).toBeVisible();

  await opprettMøteplan.click();

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

test('viser lagret møteplan uten å endre den og balanserer med færrest mulig flyttinger', async ({
  page,
}) => {
  await gotoApp(page, '/rekrutteringstreff/workop');
  await page.getByRole('tab', { name: 'WorkOp-gjennomføring' }).click();
  await page.getByLabel('Antall rom').fill('4');
  await page.getByRole('button', { name: 'Opprett møteplan' }).click();

  const romfordeling = page.getByRole('region', { name: 'Romfordeling' });
  const hentFordeling = () =>
    Promise.all(
      [1, 2, 3, 4].map((romnummer) =>
        romfordeling
          .getByRole('region', { name: `Rom ${romnummer}` })
          .getByRole('listitem')
          .allTextContents(),
      ),
    );
  await expect(
    romfordeling.getByRole('region', { name: 'Rom 1' }).getByRole('listitem'),
  ).toHaveCount(5);
  const opprinneligFordeling = await hentFordeling();
  const personerSomGår = opprinneligFordeling[0].slice(0, 2);

  await page.getByRole('button', { name: 'Tilbake', exact: true }).click();
  await expect(page.getByText('Møteplanen er opprettet')).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Vis møteplan' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Balanser rommene' }),
  ).toBeVisible();

  await page.getByLabel('Antall rom').fill('3');
  await page.getByRole('button', { name: 'Balanser rommene' }).click();
  const endreAntallRomDialog = page.getByRole('dialog', {
    name: 'Balanser rommene?',
  });
  await expect(
    endreAntallRomDialog.getByText(
      'Du endrer antall rom fra 4 til 3. Da kan flere deltakere måtte bytte rom.',
    ),
  ).toBeVisible();
  await endreAntallRomDialog.getByRole('button', { name: 'Avbryt' }).click();
  await page.getByRole('button', { name: 'Vis møteplan' }).click();
  await expect(
    romfordeling.getByRole('region', { name: /^Rom [1-4]$/ }),
  ).toHaveCount(4);

  await page.getByRole('button', { name: 'Tilbake', exact: true }).click();
  await expect(page.getByLabel('Antall rom')).toHaveValue('4');
  const oppmøte = page.getByRole('region', { name: 'Oppmøte' });
  for (const [indeks, navn] of personerSomGår.entries()) {
    const personrad = oppmøte.getByRole('listitem').filter({ hasText: navn });
    const oppmøterespons = page.waitForResponse('**/motedag/oppmote');
    await personrad.getByRole('button', { name: 'Fjern oppmøte' }).click();
    const oppdatertMøtedag = (await (await oppmøterespons).json()) as {
      oppmøte: string[];
    };
    expect(oppdatertMøtedag.oppmøte).toHaveLength(19 - indeks);
    await expect(personrad).toHaveCount(0);
    await expect(
      oppmøte.getByText(`${19 - indeks} møtt av 30 påmeldte`),
    ).toBeVisible();
  }
  await expect(
    page.getByText('18 møtt · 4 rom · 5 arbeidsgivere'),
  ).toBeVisible();

  await page
    .getByRole('button', { name: 'Rom og rotasjon', exact: true })
    .click();
  await expect(
    page.getByText('18 møtt · 4 rom · 5 arbeidsgivere'),
  ).toBeVisible();
  const fordelingFørBalansering = await hentFordeling();
  expect(fordelingFørBalansering.map((personer) => personer.length)).toEqual([
    3, 5, 5, 5,
  ]);

  await page.getByRole('button', { name: 'Tilbake', exact: true }).click();
  await page.getByRole('button', { name: 'Balanser rommene' }).click();
  const bekreftBalansering = page.getByRole('dialog', {
    name: 'Balanser rommene?',
  });
  await expect(
    bekreftBalansering.getByText(
      /Bare det minste antallet deltakere som trengs/,
    ),
  ).toBeVisible();
  await bekreftBalansering.getByRole('button', { name: 'Avbryt' }).click();

  await page.getByRole('button', { name: 'Vis møteplan' }).click();
  expect((await hentFordeling()).map((personer) => personer.length)).toEqual([
    3, 5, 5, 5,
  ]);

  await page.getByRole('button', { name: 'Tilbake', exact: true }).click();
  await page.getByRole('button', { name: 'Balanser rommene' }).click();
  await page
    .getByRole('dialog', { name: 'Balanser rommene?' })
    .getByRole('button', { name: 'Balanser rommene' })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Romfordeling' }),
  ).toBeVisible();

  const fordelingEtterBalansering = await hentFordeling();
  expect(fordelingEtterBalansering.map((personer) => personer.length)).toEqual([
    4, 5, 5, 4,
  ]);
  const romFør = new Map(
    fordelingFørBalansering.flatMap((personer, romindeks) =>
      personer.map((person) => [person, romindeks + 1] as const),
    ),
  );
  const romEtter = new Map(
    fordelingEtterBalansering.flatMap((personer, romindeks) =>
      personer.map((person) => [person, romindeks + 1] as const),
    ),
  );
  expect(
    [...romFør].filter(
      ([person, tidligereRom]) => romEtter.get(person) !== tidligereRom,
    ),
  ).toHaveLength(1);
});

test('registrerer ønsker og lager rekkefølge for speedintervju', async ({
  page,
}) => {
  await gotoApp(page, '/rekrutteringstreff/workop');

  await page.getByRole('tab', { name: 'WorkOp-gjennomføring' }).click();
  await expect(
    page.getByText('20 møtt · 5 rom · 5 arbeidsgivere'),
  ).toBeVisible();
  const workOpOverskrift = page.getByRole('heading', {
    name: 'WorkOp-gjennomføring',
    level: 2,
  });
  const workOpOverskriftY = await workOpOverskrift.evaluate(
    (element) => element.getBoundingClientRect().y,
  );
  const forventLikToppavstand = async () => {
    expect(
      await workOpOverskrift.evaluate(
        (element) => element.getBoundingClientRect().y,
      ),
    ).toBeCloseTo(workOpOverskriftY, 0);
  };
  const stepper = page.getByRole('list', { name: 'WorkOp-gjennomføring' });
  await expect(stepper.getByText('Oppmøte og oppsett')).toBeVisible();
  await expect(stepper.getByText('Rom og rotasjon')).toBeVisible();
  await expect(stepper.getByText('Ønsker')).toBeVisible();
  await expect(stepper.getByText('Intervjufordeling')).toBeVisible();
  await expect(stepper.getByText('Status og oppfølging')).toBeVisible();

  await page.getByRole('button', { name: 'Opprett møteplan' }).click();
  await expect(
    page.getByRole('heading', { name: 'Romfordeling' }),
  ).toBeVisible();
  await forventLikToppavstand();
  await page.getByRole('button', { name: 'Neste' }).click();
  const ønskelagringsstatus = page
    .getByRole('region', { name: 'Ønsker' })
    .getByRole('status');
  await expect(ønskelagringsstatus).toContainText('Lagret');
  await forventLikToppavstand();

  const førsteØnskeHosArbeidsgiver1 = page.getByRole('checkbox', {
    name: /Etternavn01, Marius Arbeidsgiver 1/,
  });
  const andreØnskeHosArbeidsgiver1 = page.getByRole('checkbox', {
    name: /Etternavn02, Emilie Arbeidsgiver 1/,
  });
  const førsteØnskeHosArbeidsgiver2 = page.getByRole('checkbox', {
    name: /Etternavn01, Marius Arbeidsgiver 2/,
  });
  const sendteØnsker: Array<{
    personTreffId: string;
    arbeidsgiverTreffId: string;
    ønsket: boolean;
  }> = [];
  let fortsettFørsteØnskelagring = () => {};
  const ventPåFørsteØnskelagring = new Promise<void>((resolve) => {
    fortsettFørsteØnskelagring = resolve;
  });
  await page.route('**/motedag/onsker', async (route) => {
    sendteØnsker.push(
      route.request().postDataJSON() as (typeof sendteØnsker)[number],
    );
    if (sendteØnsker.length === 1) {
      await ventPåFørsteØnskelagring;
    }
    if (sendteØnsker.length === 2) {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ feil: 'Testfeil' }),
      });
      return;
    }
    await route.continue();
  });

  await førsteØnskeHosArbeidsgiver1.click();
  await expect.poll(() => sendteØnsker.length).toBe(1);
  await expect(ønskelagringsstatus).toContainText('Lagrer …');
  await expect(andreØnskeHosArbeidsgiver1).toBeEnabled();
  await andreØnskeHosArbeidsgiver1.click();
  await expect(førsteØnskeHosArbeidsgiver2).toBeEnabled();
  await førsteØnskeHosArbeidsgiver2.click();
  await expect(førsteØnskeHosArbeidsgiver1).toBeChecked();
  await expect(andreØnskeHosArbeidsgiver1).toBeChecked();
  await expect(førsteØnskeHosArbeidsgiver2).toBeChecked();
  await expect(
    page.getByRole('row', { name: /Etternavn01, Marius/ }),
  ).toContainText('2');
  await expect(
    page.getByRole('columnheader', { name: 'Totalt' }),
  ).toBeInViewport();
  const nesteFraØnsker = page.getByRole('button', { name: 'Neste' });
  await nesteFraØnsker.click();
  await expect(andreØnskeHosArbeidsgiver1).toBeDisabled();
  await expect(
    page.getByRole('heading', { name: 'Ønsker', level: 3 }),
  ).toBeVisible();

  fortsettFørsteØnskelagring();
  await expect.poll(() => sendteØnsker.length).toBe(3);
  await expect(
    page.getByText(
      'Ett eller flere ønsker kunne ikke lagres og ble tilbakestilt. Prøv igjen.',
    ),
  ).toBeVisible();
  await expect(ønskelagringsstatus).toContainText('Lagringsfeil');
  await expect(førsteØnskeHosArbeidsgiver1).toBeChecked();
  await expect(andreØnskeHosArbeidsgiver1).not.toBeChecked();
  await expect(førsteØnskeHosArbeidsgiver2).toBeChecked();
  await andreØnskeHosArbeidsgiver1.click();
  await expect(andreØnskeHosArbeidsgiver1).toBeChecked();
  await nesteFraØnsker.click();
  await expect(
    page.getByRole('heading', { name: 'Intervjufordeling', level: 3 }),
  ).toBeVisible();
  const fordelingslagringsstatus = page
    .getByRole('region', { name: 'Intervjufordeling' })
    .getByRole('status');
  await expect(fordelingslagringsstatus).toContainText('Lagret');
  await expect(
    page.getByRole('heading', { name: 'WorkOp-gjennomføring', level: 2 }),
  ).toBeInViewport();
  await forventLikToppavstand();
  await expect.poll(() => sendteØnsker.length).toBe(4);
  expect(sendteØnsker.map(({ ønsket }) => ønsket)).toEqual([
    true,
    true,
    true,
    true,
  ]);
  await page.unroute('**/motedag/onsker');

  const arbeidsgiver1Liste = page.getByRole('list', {
    name: 'Intervjurekkefølge hos Arbeidsgiver 1',
  });
  const arbeidsgiver2Liste = page.getByRole('list', {
    name: 'Intervjurekkefølge hos Arbeidsgiver 2',
  });
  const arbeidsgiver2Kort = page.getByRole('region', {
    name: 'Arbeidsgiver 2',
  });
  await expect(arbeidsgiver1Liste).toBeVisible();
  await expect(arbeidsgiver2Kort).toContainText('1 med · 0 ikke med');
  await expect(arbeidsgiver2Liste).not.toBeVisible();
  await arbeidsgiver2Kort.getByRole('button', { name: 'Vis mer' }).click();
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
  await expect(fordelingslagringsstatus).toContainText('Lagringsfeil');
  await expect(
    page.getByRole('list', {
      name: 'Ikke med på speedintervju hos Arbeidsgiver 1',
    }),
  ).toContainText('Etternavn01, Marius');
  await page.unroute('**/motedag/intervjufordeling');

  await page.getByRole('button', { name: 'Neste' }).click();
  await expect(
    page.getByRole('heading', { name: 'Status og oppfølging', level: 3 }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'WorkOp-gjennomføring', level: 2 }),
  ).toBeInViewport();
  await forventLikToppavstand();
  const statusHosArbeidsgiver1 = page.getByRole('region', {
    name: 'Arbeidsgiver 1',
  });
  const vurderingslagringsstatus = page
    .getByRole('region', { name: 'Status og oppfølging' })
    .getByRole('status');
  await expect(vurderingslagringsstatus).toContainText('Lagret');
  const mariusStatus = statusHosArbeidsgiver1
    .getByRole('listitem')
    .filter({ hasText: 'Etternavn01, Marius' });
  const emilieStatus = statusHosArbeidsgiver1
    .getByRole('listitem')
    .filter({ hasText: 'Etternavn02, Emilie' });

  await expect(mariusStatus.getByText('Ønsket intervju')).toBeVisible();
  await expect(
    mariusStatus.getByText('Satt opp til speedintervju'),
  ).toHaveCount(0);
  await expect(
    emilieStatus.getByText('Satt opp til speedintervju'),
  ).toBeVisible();
  await expect(statusHosArbeidsgiver1.getByText('Fått jobben')).toHaveCount(2);
  const tomtArbeidsgiverkort = page.getByRole('region', {
    name: 'Arbeidsgiver 5',
  });
  await expect(tomtArbeidsgiverkort).toContainText('0 jobbsøkere');
  await expect(
    tomtArbeidsgiverkort.getByText(
      'Ingen jobbsøkere med status hos denne arbeidsgiveren.',
    ),
  ).not.toBeVisible();

  const vurdering = mariusStatus.getByRole('combobox', {
    name: 'Vurdering etter speedintervju',
  });
  const andreIntervju = mariusStatus.getByRole('checkbox', {
    name: '2. intervju',
  });
  const jobbtilbud = mariusStatus.getByRole('checkbox', {
    name: 'Jobbtilbud',
  });
  const emilieVurdering = emilieStatus.getByRole('combobox', {
    name: 'Vurdering etter speedintervju',
  });
  const sendteVurderinger: Array<{
    vurdering: string | null;
    andreIntervju: boolean;
    jobbtilbud: boolean;
  }> = [];
  let fortsettFørsteLagring = () => {};
  const ventPåFørsteLagring = new Promise<void>((resolve) => {
    fortsettFørsteLagring = resolve;
  });
  await page.route('**/motedag/vurderinger', async (route) => {
    const vurdering = route.request().postDataJSON() as {
      vurdering: string | null;
      andreIntervju: boolean;
      jobbtilbud: boolean;
    };
    sendteVurderinger.push({
      vurdering: vurdering.vurdering,
      andreIntervju: vurdering.andreIntervju,
      jobbtilbud: vurdering.jobbtilbud,
    });
    if (sendteVurderinger.length === 1) {
      await ventPåFørsteLagring;
    }
    await route.continue();
  });

  const emilieYFørLagring = await emilieStatus.evaluate(
    (element) => element.getBoundingClientRect().y,
  );
  await vurdering.selectOption('AKTUELL');
  await expect(vurdering).toHaveValue('AKTUELL');
  await expect(vurderingslagringsstatus).toContainText('Lagrer …');
  expect(
    await emilieStatus.evaluate((element) => element.getBoundingClientRect().y),
  ).toBeCloseTo(emilieYFørLagring, 0);
  await expect(andreIntervju).toBeEnabled();
  await andreIntervju.check();
  await expect(andreIntervju).toBeChecked();
  await expect(jobbtilbud).toBeEnabled();
  await jobbtilbud.check();
  await expect(jobbtilbud).toBeChecked();
  await emilieVurdering.selectOption('KANSKJE');
  await expect(emilieVurdering).toHaveValue('KANSKJE');

  await expect.poll(() => sendteVurderinger.length).toBe(1);
  await expect(
    page.getByRole('button', { name: 'Tilbake', exact: true }),
  ).toBeDisabled();
  fortsettFørsteLagring();
  await expect.poll(() => sendteVurderinger.length).toBe(4);
  await expect(
    page.getByRole('button', { name: 'Tilbake', exact: true }),
  ).toBeEnabled();
  await expect(vurderingslagringsstatus).toContainText('Lagret');
  expect(sendteVurderinger).toEqual([
    {
      vurdering: 'AKTUELL',
      andreIntervju: false,
      jobbtilbud: false,
    },
    {
      vurdering: 'AKTUELL',
      andreIntervju: true,
      jobbtilbud: false,
    },
    {
      vurdering: 'AKTUELL',
      andreIntervju: true,
      jobbtilbud: true,
    },
    {
      vurdering: 'KANSKJE',
      andreIntervju: false,
      jobbtilbud: false,
    },
  ]);
  await page.unroute('**/motedag/vurderinger');

  await page.getByRole('button', { name: 'Tilbake', exact: true }).click();
  await page.getByRole('button', { name: 'Neste' }).click();
  await expect(vurdering).toHaveValue('AKTUELL');
  await expect(andreIntervju).toBeChecked();
  await expect(jobbtilbud).toBeChecked();
  await expect(emilieVurdering).toHaveValue('KANSKJE');

  await page.route('**/motedag/vurderinger', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ feil: 'Testfeil' }),
    });
  });
  await vurdering.selectOption('KANSKJE');
  await expect(
    mariusStatus.getByText('Kunne ikke lagre vurderingen. Prøv igjen.'),
  ).toBeVisible();
  await expect(vurderingslagringsstatus).toContainText('Lagringsfeil');
  await expect(
    emilieStatus.getByText('Kunne ikke lagre vurderingen. Prøv igjen.'),
  ).toHaveCount(0);
  await expect(vurdering).toHaveValue('AKTUELL');
  await page.unroute('**/motedag/vurderinger');

  await mariusStatus.getByRole('link', { name: 'Se formidling' }).click();
  await expect(page).toHaveURL(
    /visFane=formidlinger.*formidlingArbeidsgivere=TEST-ORG-WORKOP-1/,
  );
  await expect(page.getByRole('tab', { name: /Formidlinger/ })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(
    page.getByText('Etternavn01, Marius', { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText('Etternavn02, Emilie', { exact: true }),
  ).toBeVisible();
  await expect(page.getByText('Testetternavn formidling')).toHaveCount(0);
});

test('beholder vurderingen når ønske og speedintervjuplass fjernes', async ({
  page,
}) => {
  await gotoApp(page, '/rekrutteringstreff/workop');
  await page.getByRole('tab', { name: 'WorkOp-gjennomføring' }).click();
  await page.getByRole('button', { name: 'Opprett møteplan' }).click();
  await page.getByRole('button', { name: 'Neste' }).click();

  const ønske = page.getByRole('checkbox', {
    name: /Etternavn01, Marius Arbeidsgiver 2/,
  });
  await ønske.click();
  await expect(ønske).toBeChecked();
  await page.getByRole('button', { name: 'Neste' }).click();
  await page.getByRole('button', { name: 'Neste' }).click();
  await expect(
    page
      .getByRole('region', { name: 'Arbeidsgiver 1' })
      .getByText('Fått jobben')
      .first(),
  ).toBeVisible();

  const arbeidsgiverkort = page.getByRole('region', {
    name: 'Arbeidsgiver 2',
  });
  const åpneArbeidsgiverkort = async () => {
    const knapp = arbeidsgiverkort.getByRole('button', { name: 'Vis mer' });
    if ((await knapp.getAttribute('aria-expanded')) !== 'true') {
      await knapp.click();
    }
  };
  await åpneArbeidsgiverkort();
  const statusrad = arbeidsgiverkort
    .getByRole('listitem')
    .filter({ hasText: 'Etternavn01, Marius' });
  const vurdering = statusrad.getByRole('combobox', {
    name: 'Vurdering etter speedintervju',
  });
  await vurdering.selectOption('KANSKJE');
  await expect(vurdering).toHaveValue('KANSKJE');
  await expect(
    page.getByRole('button', { name: 'Tilbake', exact: true }),
  ).toBeEnabled();

  await page.getByRole('button', { name: 'Tilbake', exact: true }).click();
  await page.getByRole('button', { name: 'Tilbake', exact: true }).click();
  await ønske.click();
  await expect(ønske).not.toBeChecked();
  await page
    .getByRole('button', { name: 'Status og oppfølging', exact: true })
    .click();
  await åpneArbeidsgiverkort();

  await expect(statusrad).toBeVisible();
  await expect(vurdering).toHaveValue('KANSKJE');
  await expect(statusrad.getByText('Ønsket intervju')).toHaveCount(0);
  await expect(statusrad.getByText('Satt opp til speedintervju')).toHaveCount(
    0,
  );

  const nullstillingsrespons = page.waitForResponse('**/motedag/vurderinger');
  await vurdering.selectOption('');
  expect((await nullstillingsrespons).ok()).toBeTruthy();
  await expect(statusrad).toHaveCount(0);
  await expect(arbeidsgiverkort.getByText('0 jobbsøkere')).toBeVisible();
});

test('lar status registreres når Formidlinger ikke kan hentes', async ({
  page,
}) => {
  await page.route('**/formidling/liste/alle**', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ feil: 'Testfeil' }),
    });
  });
  await gotoApp(page, '/rekrutteringstreff/workop');
  await page.getByRole('tab', { name: 'WorkOp-gjennomføring' }).click();
  await page.getByRole('button', { name: 'Opprett møteplan' }).click();
  await page.getByRole('button', { name: 'Neste' }).click();
  const ønske = page.getByRole('checkbox', {
    name: /Etternavn01, Marius Arbeidsgiver 1/,
  });
  await ønske.click();
  await expect(ønske).toBeChecked();
  await page.getByRole('button', { name: 'Neste' }).click();
  await page.getByRole('button', { name: 'Neste' }).click();

  await expect(
    page.getByText(
      'Fikk ikke hentet «Fått jobben» fra Formidlinger. Du kan fortsatt registrere andre statuser.',
    ),
  ).toBeVisible();
  const statusrad = page
    .getByRole('region', { name: 'Arbeidsgiver 1' })
    .getByRole('listitem')
    .filter({ hasText: 'Etternavn01, Marius' });
  const vurdering = statusrad.getByRole('combobox', {
    name: 'Vurdering etter speedintervju',
  });
  await vurdering.selectOption('KANSKJE');
  await expect(vurdering).toHaveValue('KANSKJE');
});
