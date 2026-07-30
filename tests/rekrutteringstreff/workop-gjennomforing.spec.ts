import { PLAYWRIGHT_MSW_SCOPE_COOKIE } from '@/app/api/rekrutteringstreff/mswScope';
import { gotoApp } from '@/tests/gotoApp';
import type { Locator } from '@playwright/test';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// Layoutmålinger kan variere med brøkdeler av en piksel mellom ulike elementer
// og rendringsmiljøer. Én piksel skiller derfor reell feiljustering fra støy.
const forventSammeAkse = (faktisk: number, forventet: number) =>
  expect(Math.abs(faktisk - forventet)).toBeLessThanOrEqual(1);

// Nettleserens HTML5-dra-og-slipp er hendelsesdrevet, og et simulert slipp kan
// gå tapt under last uten at noe er galt i applikasjonen. Vi prøver derfor på
// nytt til det forventede utfallet er på plass. Har slippet allerede virket,
// stemmer utfallet med én gang og operasjonen gjentas ikke.
const draTil = async (
  håndtak: Locator,
  mål: Locator,
  forventUtfall: () => Promise<void>,
  målposisjon?: { x: number; y: number },
) => {
  await expect(async () => {
    await håndtak.dragTo(
      mål,
      målposisjon ? { targetPosition: målposisjon } : undefined,
    );
    await forventUtfall();
  }).toPass({ intervals: [300, 700, 1500], timeout: 20_000 });
};

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
    .filter({ hasText: 'Marius Etternavn01' });
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
  forventSammeAkse(oppmøteOverskriftY, arbeidsgivereOverskriftY);
  forventSammeAkse(jobbsøkerY, arbeidsgiverY);

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
    oppmøte.getByRole('listitem').filter({ hasText: 'Marius Etternavn01' }),
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
  const opprettMøteplan = page.getByRole('button', {
    name: 'Opprett møteplan',
  });
  await opprettMøteplan.click();
  await expect(page.getByText('Oppgi et gyldig starttidspunkt.')).toBeVisible();
  await expect(
    page.getByText('Varigheten må være minst 1 minutt.'),
  ).toBeVisible();
  await expect(page.getByText('Pausen kan ikke være negativ.')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Romfordeling' })).toHaveCount(
    0,
  );

  // Antall rom er avledet fra antall arbeidsgivere og oppgis ikke i skjemaet.
  await expect(page.getByLabel('Antall rom')).toHaveCount(0);

  await page.getByLabel('Starttidspunkt').fill('10:00');
  await page.getByLabel('Varighet per møte (min)').fill('6');
  await page.getByLabel('Pause mellom møter (min)').fill('4');

  await opprettMøteplan.click();

  const romfordeling = page.getByRole('region', { name: 'Romfordeling' });
  await expect(
    romfordeling.getByRole('region', { name: /^Rom [1-5]$/ }),
  ).toHaveCount(5);
  const rom1 = romfordeling.getByRole('region', { name: 'Rom 1' });
  await expect(rom1.getByRole('listitem')).toHaveCount(4);
  await expect(romfordeling.getByText('4 jobbsøkere')).toHaveCount(0);
  await expect(
    page.getByText(
      '5 runder fra 10:00 til 10:46. Hver arbeidsgiver besøker alle rom.',
    ),
  ).toBeVisible();

  const utskriftTilArbeidsgivereKnapp = page.getByRole('button', {
    name: 'Utskrift til arbeidsgivere',
  });
  const [utskriftsknappX, tilbakeX] = await Promise.all([
    utskriftTilArbeidsgivereKnapp.evaluate(
      (element) => element.getBoundingClientRect().x,
    ),
    page
      .getByRole('button', { name: 'Tilbake', exact: true })
      .evaluate((element) => element.getBoundingClientRect().x),
  ]);
  forventSammeAkse(utskriftsknappX, tilbakeX);

  const rotasjonsmatrise = page.getByRole('region', {
    name: 'Hvem er i hvilket rom',
  });
  await expect(
    rotasjonsmatrise.getByRole('row', { name: /10:00–10:06/ }),
  ).toBeVisible();
  await expect(rotasjonsmatrise.getByText('Pause og bytte av rom')).toHaveCount(
    4,
  );

  await utskriftTilArbeidsgivereKnapp.click();
  const arbeidsgiverutskrift = page.getByRole('dialog', {
    name: 'Utskrift til arbeidsgivere',
  });
  await expect(
    arbeidsgiverutskrift.getByRole('region', { name: / AS$/ }),
  ).toHaveCount(5);
  await expect(
    arbeidsgiverutskrift
      .getByRole('region', { name: 'Eksempelbakeriet AS' })
      .getByRole('row', { name: /10:00–10:06/ }),
  ).toHaveCount(1);
  // Arbeidsgiverne trenger bare tid og rom, ikke navn på jobbsøkerne.
  await expect(
    arbeidsgiverutskrift.getByRole('columnheader', { name: 'Jobbsøkere' }),
  ).toHaveCount(0);
  await expect(arbeidsgiverutskrift.getByText(/Etternavn\d/)).toHaveCount(0);
  await expect(
    arbeidsgiverutskrift.getByRole('button', { name: 'Skriv ut' }),
  ).toBeVisible();
  await arbeidsgiverutskrift
    .getByRole('button', { name: 'Lukk', exact: true })
    .last()
    .click();

  await page.getByRole('button', { name: 'Utskrift til jobbsøkere' }).click();
  const jobbsøkerutskrift = page.getByRole('dialog', {
    name: 'Utskrift til jobbsøkere',
  });
  await expect(
    jobbsøkerutskrift.getByRole('region', { name: /^Rom \d$/ }),
  ).toHaveCount(5);
  const rom1Utskrift = jobbsøkerutskrift.getByRole('region', { name: 'Rom 1' });
  await expect(rom1Utskrift.getByText('Jobbsøkere:')).toBeVisible();
  await expect(rom1Utskrift.getByText(/\d+ jobbsøkere/)).toHaveCount(0);
  await expect(rom1Utskrift.getByRole('listitem')).toHaveCount(4);
  await expect(
    rom1Utskrift.getByRole('row', { name: /10:00–10:06/ }),
  ).toHaveCount(1);
  await expect(
    jobbsøkerutskrift.getByRole('button', { name: 'Skriv ut' }),
  ).toBeVisible();
});

test('flytter jobbsøkere mellom rom og kan fordele alle på nytt', async ({
  page,
}) => {
  await gotoApp(page, '/rekrutteringstreff/workop');
  await page.getByRole('tab', { name: 'WorkOp-gjennomføring' }).click();
  await page.getByRole('button', { name: 'Opprett møteplan' }).click();

  const romfordeling = page.getByRole('region', { name: 'Romfordeling' });
  const hentFordeling = () =>
    Promise.all(
      [1, 2, 3, 4, 5].map((romnummer) =>
        romfordeling
          .getByRole('region', { name: `Rom ${romnummer}` })
          .getByRole('listitem')
          .allTextContents(),
      ),
    );
  await expect(
    romfordeling.getByRole('region', { name: 'Rom 1' }).getByRole('listitem'),
  ).toHaveCount(4);
  const opprinneligFordeling = await hentFordeling();

  await page.getByRole('button', { name: 'Tilbake', exact: true }).click();
  await expect(
    page.getByText('Møteplanen er opprettet', { exact: true }),
  ).toBeVisible();
  // Tidene kan justeres også etter at rommene er fordelt.
  await expect(page.getByLabel('Starttidspunkt')).toBeEditable();
  await expect(
    page.getByRole('button', { name: 'Lagre endringer' }),
  ).toHaveCount(0);
  await page.getByLabel('Starttidspunkt').fill('11:00');
  await page.getByRole('button', { name: 'Lagre endringer' }).click();
  // Lagringa skal beholde romfordelinga, bare tidene endres.
  await expect(
    page.getByRole('button', { name: 'Lagre endringer' }),
  ).toHaveCount(0);
  await expect(page.getByLabel('Starttidspunkt')).toHaveValue('11:00');
  await expect(
    page.getByRole('button', { name: 'Gå til romfordeling' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Balanser rommene' }),
  ).toHaveCount(0);
  await page.getByRole('button', { name: 'Gå til romfordeling' }).click();

  const rom1 = romfordeling.getByRole('region', { name: 'Rom 1' });
  const rom2 = romfordeling.getByRole('region', { name: 'Rom 2' });
  const rom3 = romfordeling.getByRole('region', { name: 'Rom 3' });
  const rom4 = romfordeling.getByRole('region', { name: 'Rom 4' });
  const personFraRom1 = opprinneligFordeling[0][0];
  const personFraRom2 = opprinneligFordeling[1][0];
  const romlagringsstatus = romfordeling.getByRole('status');
  let fortsettRomlagring = () => {};
  const ventPåRomlagring = new Promise<void>((resolve) => {
    fortsettRomlagring = resolve;
  });
  await page.route('**/motedag/romfordeling', async (route) => {
    await ventPåRomlagring;
    await route.continue();
  });

  await rom1
    .getByRole('listitem')
    .filter({ hasText: personFraRom1 })
    .getByRole('button', {
      name: `Flytt ${personFraRom1} til et annet rom`,
    })
    .click();
  const flyttMedMenyRespons = page.waitForResponse(
    (response) =>
      response.url().endsWith('/motedag/romfordeling') &&
      response.request().method() === 'PUT',
  );
  await page.getByRole('menuitem', { name: 'Rom 4', exact: true }).click();
  await expect(romlagringsstatus).toContainText('Lagrer …');
  await expect(
    page.getByRole('button', {
      name: 'Oppmøte og oppsett',
      exact: true,
    }),
  ).toHaveCount(0);
  fortsettRomlagring();
  expect((await flyttMedMenyRespons).ok()).toBeTruthy();
  await expect(
    page.getByRole('button', {
      name: 'Oppmøte og oppsett',
      exact: true,
    }),
  ).toBeVisible();
  await page.unroute('**/motedag/romfordeling');
  await expect(rom4.getByRole('listitem').last()).toContainText(personFraRom1);
  await expect(
    rom1.getByRole('listitem').filter({ hasText: personFraRom1 }),
  ).toHaveCount(0);

  const flyttMedDragRespons = page.waitForResponse(
    (response) =>
      response.url().endsWith('/motedag/romfordeling') &&
      response.request().method() === 'PUT',
  );
  await draTil(
    rom2
      .getByRole('listitem')
      .filter({ hasText: personFraRom2 })
      .locator('[draggable="true"]'),
    rom3,
    async () => {
      await expect(rom3.getByRole('listitem').last()).toContainText(
        personFraRom2,
        { timeout: 2_000 },
      );
    },
  );
  expect((await flyttMedDragRespons).ok()).toBeTruthy();

  const møteoppsettUrl = new URL(
    '/api/rekrutteringstreff/workop/motedag/moteoppsett',
    page.url(),
  ).toString();
  const oppsett = {
    antallRom: 5,
    starttidspunkt: '11:00',
    varighetPerMøteMinutter: 10,
    pauseMellomMøterMinutter: 5,
  };
  const fordelingFørOppsettendring = await hentFordeling();
  expect(
    (await page.request.put(møteoppsettUrl, { data: oppsett })).status(),
  ).toBe(200);
  // Nye tider skal ikke fordele rommene på nytt.
  expect(
    (
      await page.request.put(møteoppsettUrl, {
        data: { ...oppsett, starttidspunkt: '12:30' },
      })
    ).status(),
  ).toBe(200);
  expect(await hentFordeling()).toEqual(fordelingFørOppsettendring);

  const personSomIkkeSkalFlyttes = opprinneligFordeling[0][1];
  await page.route('**/motedag/romfordeling', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ feil: 'Testfeil' }),
    });
  });
  await rom1
    .getByRole('listitem')
    .filter({ hasText: personSomIkkeSkalFlyttes })
    .getByRole('button', {
      name: `Flytt ${personSomIkkeSkalFlyttes} til et annet rom`,
    })
    .click();
  await page.getByRole('menuitem', { name: 'Rom 4', exact: true }).click();
  await expect(
    page.getByText(
      `Kunne ikke flytte ${personSomIkkeSkalFlyttes}. Prøv igjen.`,
    ),
  ).toBeVisible();
  await expect(
    rom1.getByRole('listitem').filter({ hasText: personSomIkkeSkalFlyttes }),
  ).toBeVisible();
  await page.unroute('**/motedag/romfordeling');

  const manueltFordelt = await hentFordeling();
  await page.getByRole('button', { name: 'Fordel på nytt' }).click();
  const fordelPåNyttDialog = page.getByRole('dialog', {
    name: 'Fordele alle på nytt?',
  });
  await expect(
    fordelPåNyttDialog.getByText(/Alle manuelle romplasseringer erstattes/),
  ).toBeVisible();
  await fordelPåNyttDialog.getByRole('button', { name: 'Avbryt' }).click();
  expect(await hentFordeling()).toEqual(manueltFordelt);

  await page.getByRole('button', { name: 'Fordel på nytt' }).click();
  const omfordelingsrespons = page.waitForResponse(
    (response) =>
      response.url().endsWith('/motedag/romfordeling') &&
      response.request().method() === 'PUT',
  );
  await page
    .getByRole('dialog', { name: 'Fordele alle på nytt?' })
    .getByRole('button', { name: 'Fordel på nytt' })
    .click();
  expect((await omfordelingsrespons).ok()).toBeTruthy();
  await expect.poll(hentFordeling).toEqual(opprinneligFordeling);
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
    forventSammeAkse(
      await workOpOverskrift.evaluate(
        (element) => element.getBoundingClientRect().y,
      ),
      workOpOverskriftY,
    );
  };
  const stepper = page.getByRole('list', { name: 'WorkOp-gjennomføring' });
  await expect(stepper.getByText('Oppmøte og oppsett')).toBeVisible();
  await expect(stepper.getByText('Rom og rotasjon')).toBeVisible();
  await expect(stepper.getByText('Ønsker')).toBeVisible();
  await expect(stepper.getByText('Intervjufordeling')).toBeVisible();
  await expect(stepper.getByText('Registrering av status')).toBeVisible();

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
    name: /Marius Etternavn01 Eksempelbakeriet AS/,
  });
  const andreØnskeHosArbeidsgiver1 = page.getByRole('checkbox', {
    name: /Emilie Etternavn02 Eksempelbakeriet AS/,
  });
  const førsteØnskeHosArbeidsgiver2 = page.getByRole('checkbox', {
    name: /Marius Etternavn01 Prøvetorget Handel AS/,
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
    page.getByRole('row', { name: /Marius Etternavn01/ }),
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
    name: 'Intervjurekkefølge hos Eksempelbakeriet AS',
  });
  const arbeidsgiver2Liste = page.getByRole('list', {
    name: 'Intervjurekkefølge hos Prøvetorget Handel AS',
  });
  const arbeidsgiver2Kort = page.getByRole('region', {
    name: 'Prøvetorget Handel AS',
  });
  await expect(arbeidsgiver1Liste).toBeVisible();
  await expect(arbeidsgiver2Kort).toContainText('1 med · 0 ikke med');
  await expect(arbeidsgiver2Liste).not.toBeVisible();
  await arbeidsgiver2Kort.getByRole('button', { name: 'Vis mer' }).click();
  await expect(arbeidsgiver2Liste).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Fiktivfjell Transport AS', level: 4 }),
  ).toBeVisible();
  await expect(page.getByRole('checkbox')).toHaveCount(0);
  await expect(
    page.getByText('Slipp her for å plassere sist over sperrelinjen'),
  ).toHaveCount(0);

  // Rekkefølgen fordelingen gir er backends ansvar, og mocken har med vilje en
  // enklere algoritme. Her sjekker vi bare det frontend eier: nummereringen,
  // og at rekkefølgen faktisk lar seg endre.
  const førsteRad = arbeidsgiver1Liste.getByRole('listitem').nth(0);
  const andreRad = arbeidsgiver1Liste.getByRole('listitem').nth(1);
  await expect(førsteRad).toContainText('1.');
  await expect(andreRad).toContainText('2.');
  await expect(
    page
      .getByRole('list', {
        name: 'Ikke med på speedintervju hos Eksempelbakeriet AS',
      })
      .getByText('1.'),
  ).toHaveCount(0);
  const lagringsrespons = page.waitForResponse('**/motedag/intervjufordeling');
  await draTil(
    førsteRad.locator('[draggable="true"]'),
    andreRad,
    async () => {
      await expect(
        arbeidsgiver1Liste.getByRole('listitem').nth(0),
      ).toContainText('Marius Etternavn01', { timeout: 2_000 });
    },
    { x: 20, y: 1 },
  );
  const respons = await lagringsrespons;
  expect(
    respons.ok(),
    `Lagring feilet med ${respons.status()}: ${await respons.text()}`,
  ).toBeTruthy();
  await arbeidsgiver1Liste
    .getByRole('listitem')
    .first()
    .getByLabel('Plasskonflikt')
    .hover();
  await expect(page.getByRole('tooltip')).toHaveText(
    'Plass 1 også hos Prøvetorget Handel AS',
  );

  await page.getByRole('button', { name: 'Vis utskrift' }).click();
  const utskriftsdialog = page.getByRole('dialog', {
    name: 'Intervjufordeling – utskrift',
  });
  await expect(utskriftsdialog.getByText(/arbeidsgivere ·/)).toHaveCount(0);
  const arbeidsgiver1Utskrift = utskriftsdialog.getByRole('list', {
    name: 'Intervjurekkefølge for Eksempelbakeriet AS',
  });
  await expect(arbeidsgiver1Utskrift.getByRole('listitem')).toHaveCount(2);
  await expect(
    arbeidsgiver1Utskrift.getByRole('listitem').nth(0),
  ).toContainText('Marius Etternavn01');
  await expect(
    arbeidsgiver1Utskrift.getByRole('listitem').nth(1),
  ).toContainText('Emilie Etternavn02');
  const arbeidsgiver2Utskrift = utskriftsdialog.getByRole('list', {
    name: 'Intervjurekkefølge for Prøvetorget Handel AS',
  });
  await expect(arbeidsgiver2Utskrift.getByRole('listitem')).toHaveCount(1);
  await expect(arbeidsgiver2Utskrift).toContainText('Marius Etternavn01');
  await expect(
    utskriftsdialog.getByRole('heading', { name: 'Testfjord Verksted AS' }),
  ).toHaveCount(0);
  await expect(
    utskriftsdialog.getByRole('button', { name: 'Skriv ut' }),
  ).toBeVisible();
  await utskriftsdialog.getByRole('button', { name: 'Lukk' }).last().click();

  await page
    .getByRole('button', {
      name: 'Flytt Marius Etternavn01 ned hos Eksempelbakeriet AS',
    })
    .click();
  await expect(arbeidsgiver1Liste.getByRole('listitem').nth(1)).toContainText(
    'Marius Etternavn01',
  );
  await expect(page.getByLabel('Plasskonflikt')).toHaveCount(0);
  await page
    .getByRole('button', {
      name: 'Flytt Marius Etternavn01 under sperrelinjen hos Eksempelbakeriet AS',
    })
    .click();
  const ikkeMedHosArbeidsgiver1 = page.getByRole('list', {
    name: 'Ikke med på speedintervju hos Eksempelbakeriet AS',
  });
  await expect(ikkeMedHosArbeidsgiver1).toContainText('Marius Etternavn01');
  await expect(page.getByLabel('Plasskonflikt')).toHaveCount(0);

  const flyttOppRespons = page.waitForResponse('**/motedag/intervjufordeling');
  await draTil(
    ikkeMedHosArbeidsgiver1
      .getByRole('listitem')
      .first()
      .locator('[draggable="true"]'),
    arbeidsgiver1Liste.getByRole('listitem').first(),
    async () => {
      await expect(
        arbeidsgiver1Liste.getByRole('listitem').first(),
      ).toContainText('Marius Etternavn01', { timeout: 2_000 });
    },
    { x: 20, y: 1 },
  );
  expect((await flyttOppRespons).ok()).toBeTruthy();

  await page
    .getByRole('button', {
      name: 'Flytt Marius Etternavn01 ned hos Eksempelbakeriet AS',
    })
    .click();
  await expect(arbeidsgiver1Liste.getByRole('listitem').nth(1)).toContainText(
    'Marius Etternavn01',
  );
  await page
    .getByRole('button', {
      name: 'Flytt Marius Etternavn01 under sperrelinjen hos Eksempelbakeriet AS',
    })
    .click();
  await expect(ikkeMedHosArbeidsgiver1).toContainText('Marius Etternavn01');

  await page.getByRole('button', { name: 'Tilbake', exact: true }).click();
  await expect(
    page.getByRole('checkbox', {
      name: /Marius Etternavn01 Eksempelbakeriet AS/,
    }),
  ).toBeChecked();
  await page.getByRole('button', { name: 'Neste' }).click();
  await expect(
    page.getByRole('list', {
      name: 'Ikke med på speedintervju hos Eksempelbakeriet AS',
    }),
  ).toContainText('Marius Etternavn01');

  const arbeidsgiver1Knapp = page
    .getByRole('region', { name: 'Eksempelbakeriet AS' })
    .getByRole('button', { name: 'Vis mer' });
  await arbeidsgiver1Knapp.click();
  await expect(
    page.getByRole('list', {
      name: 'Intervjurekkefølge hos Eksempelbakeriet AS',
    }),
  ).not.toBeVisible();
  await arbeidsgiver1Knapp.click();
  await expect(
    page.getByRole('list', {
      name: 'Intervjurekkefølge hos Eksempelbakeriet AS',
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
      name: 'Flytt Marius Etternavn01 over sperrelinjen hos Eksempelbakeriet AS',
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
      name: 'Ikke med på speedintervju hos Eksempelbakeriet AS',
    }),
  ).toContainText('Marius Etternavn01');
  await page.unroute('**/motedag/intervjufordeling');

  await page.getByRole('button', { name: 'Neste' }).click();
  await expect(
    page.getByRole('heading', { name: 'Registrering av status', level: 3 }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'WorkOp-gjennomføring', level: 2 }),
  ).toBeInViewport();
  await forventLikToppavstand();
  const statusHosArbeidsgiver1 = page.getByRole('region', {
    name: 'Eksempelbakeriet AS',
  });
  const vurderingslagringsstatus = page
    .getByRole('region', { name: 'Registrering av status' })
    .getByRole('status');
  await expect(vurderingslagringsstatus).toContainText('Lagret');
  const mariusStatus = statusHosArbeidsgiver1
    .getByRole('listitem')
    .filter({ hasText: 'Marius Etternavn01' });
  const emilieStatus = statusHosArbeidsgiver1
    .getByRole('listitem')
    .filter({ hasText: 'Emilie Etternavn02' });

  await expect(mariusStatus.getByText('Ønsket speedintervju')).toBeVisible();
  await expect(
    mariusStatus.getByText('Satt opp til speedintervju'),
  ).toHaveCount(0);
  await expect(
    emilieStatus.getByText('Satt opp til speedintervju'),
  ).toBeVisible();
  await expect(statusHosArbeidsgiver1.getByText('Formidlet')).toHaveCount(2);
  const statusHosArbeidsgiver2 = page.getByRole('region', {
    name: 'Prøvetorget Handel AS',
  });
  // Bare det første kortet med jobbsøkere åpnes, slik at siden ikke blir
  // uleselig lang. Resten åpnes ved behov.
  const visMerArbeidsgiver2 = statusHosArbeidsgiver2.getByRole('button', {
    name: 'Vis mer',
  });
  await expect(visMerArbeidsgiver2).toHaveAttribute('aria-expanded', 'false');
  await visMerArbeidsgiver2.click();
  await expect(visMerArbeidsgiver2).toHaveAttribute('aria-expanded', 'true');
  await expect(
    statusHosArbeidsgiver2
      .getByRole('listitem')
      .filter({ hasText: 'Marius Etternavn01' }),
  ).toBeVisible();
  const tomtArbeidsgiverkort = page.getByRole('region', {
    name: 'Fiktivfjell Transport AS',
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
  await expect(
    vurdering.getByRole('option', { name: 'Ikke aktuell' }),
  ).toBeAttached();
  await expect(vurdering.getByRole('option', { name: 'Kladd' })).toHaveCount(0);
  const andreIntervju = mariusStatus.getByRole('checkbox', {
    name: '2. intervju',
  });
  const jobbtilbud = mariusStatus.getByRole('checkbox', {
    name: 'Jobbtilbud',
  });
  const formidlet = mariusStatus.getByRole('link', { name: 'Vis formidling' });
  const [jobbtilbudPosisjon, formidletPosisjon] = await Promise.all([
    jobbtilbud.boundingBox(),
    formidlet.boundingBox(),
  ]);
  expect(jobbtilbudPosisjon).not.toBeNull();
  expect(formidletPosisjon).not.toBeNull();
  expect(
    Math.abs(
      (jobbtilbudPosisjon?.y ?? 0) +
        (jobbtilbudPosisjon?.height ?? 0) / 2 -
        ((formidletPosisjon?.y ?? 0) + (formidletPosisjon?.height ?? 0) / 2),
    ),
  ).toBeLessThan(8);
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
  forventSammeAkse(
    await emilieStatus.evaluate((element) => element.getBoundingClientRect().y),
    emilieYFørLagring,
  );
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
  const lagringsfeilmelding =
    'Kunne ikke lagre vurderingen for Marius Etternavn01. Prøv igjen.';
  await expect(mariusStatus.getByText(lagringsfeilmelding)).toBeVisible();
  await expect(vurderingslagringsstatus).toContainText('Lagringsfeil');
  await expect(vurderingslagringsstatus).toContainText(lagringsfeilmelding);
  await expect(
    emilieStatus.getByText(/Kunne ikke lagre vurderingen/),
  ).toHaveCount(0);
  await expect(vurdering).toHaveValue('AKTUELL');
  await page.unroute('**/motedag/vurderinger');

  await formidlet.click();
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
    name: /Marius Etternavn01 Prøvetorget Handel AS/,
  });
  await ønske.click();
  await expect(ønske).toBeChecked();
  await page.getByRole('button', { name: 'Neste' }).click();
  await page.getByRole('button', { name: 'Neste' }).click();
  await expect(
    page
      .getByRole('region', { name: 'Eksempelbakeriet AS' })
      .getByText('Formidlet')
      .first(),
  ).toBeVisible();

  const arbeidsgiverkort = page.getByRole('region', {
    name: 'Prøvetorget Handel AS',
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
    .filter({ hasText: 'Marius Etternavn01' });
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
    .getByRole('button', { name: 'Registrering av status', exact: true })
    .click();
  await åpneArbeidsgiverkort();

  await expect(statusrad).toBeVisible();
  await expect(vurdering).toHaveValue('KANSKJE');
  await expect(statusrad.getByText('Ønsket speedintervju')).toHaveCount(0);
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
    name: /Marius Etternavn01 Eksempelbakeriet AS/,
  });
  await ønske.click();
  await expect(ønske).toBeChecked();
  await page.getByRole('button', { name: 'Neste' }).click();
  await page.getByRole('button', { name: 'Neste' }).click();

  await expect(
    page.getByText(
      'Fikk ikke hentet «Formidlet» fra Formidlinger. Du kan fortsatt registrere andre statuser.',
    ),
  ).toBeVisible();
  const statusrad = page
    .getByRole('region', { name: 'Eksempelbakeriet AS' })
    .getByRole('listitem')
    .filter({ hasText: 'Marius Etternavn01' });
  const vurdering = statusrad.getByRole('combobox', {
    name: 'Vurdering etter speedintervju',
  });
  await vurdering.selectOption('KANSKJE');
  await expect(vurdering).toHaveValue('KANSKJE');
});

test('krever bekreftelse når oppmøte fjernes for jobbsøker med registreringer', async ({
  page,
}) => {
  await gotoApp(page, '/rekrutteringstreff/workop');
  await page.getByRole('tab', { name: 'WorkOp-gjennomføring' }).click();
  await page.getByRole('button', { name: 'Opprett møteplan' }).click();
  await expect(
    page.getByRole('heading', { name: 'Romfordeling' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Neste' }).click();

  const ønskestatus = page
    .getByRole('region', { name: 'Ønsker' })
    .getByRole('status');
  await expect(ønskestatus).toContainText('Lagret');
  await page
    .getByRole('checkbox', { name: /Marius Etternavn01 Eksempelbakeriet AS/ })
    .click();
  await expect(ønskestatus).toContainText('Lagret');

  await page
    .getByRole('button', { name: 'Oppmøte og oppsett', exact: true })
    .click();
  const oppmøte = page.getByRole('region', { name: 'Oppmøte' });
  const marius = oppmøte
    .getByRole('listitem')
    .filter({ hasText: 'Marius Etternavn01' });
  await marius.getByRole('button', { name: 'Fjern oppmøte' }).click();

  const bekreftelse = page.getByRole('dialog');
  await expect(
    bekreftelse.getByRole('heading', {
      name: 'Fjerne oppmøtet for Marius Etternavn01?',
    }),
  ).toBeVisible();
  await expect(bekreftelse.getByRole('listitem')).toHaveText([
    '1 ønsket arbeidsgiver',
  ]);

  await bekreftelse.getByRole('button', { name: 'Avbryt' }).click();
  await expect(bekreftelse).toBeHidden();
  await expect(oppmøte.getByText('20 møtt av 30 påmeldte')).toBeVisible();

  await marius.getByRole('button', { name: 'Fjern oppmøte' }).click();
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Fjern oppmøtet' })
    .click();
  await expect(oppmøte.getByText('19 møtt av 30 påmeldte')).toBeVisible();
  await expect(marius).toHaveCount(0);
});

test('fjerner oppmøte uten bekreftelse når ingenting er registrert', async ({
  page,
}) => {
  await gotoApp(page, '/rekrutteringstreff/workop');
  await page.getByRole('tab', { name: 'WorkOp-gjennomføring' }).click();

  const oppmøte = page.getByRole('region', { name: 'Oppmøte' });
  await oppmøte
    .getByRole('listitem')
    .filter({ hasText: 'Marius Etternavn01' })
    .getByRole('button', { name: 'Fjern oppmøte' })
    .click();

  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(oppmøte.getByText('19 møtt av 30 påmeldte')).toBeVisible();
});

test('beholder tastaturfokus ved flytting og kunngjør riktig ved lagringsfeil', async ({
  page,
}) => {
  const fokusertEtikett = () =>
    page.evaluate(() => document.activeElement?.getAttribute('aria-label'));

  await gotoApp(page, '/rekrutteringstreff/workop');
  await page.getByRole('tab', { name: 'WorkOp-gjennomføring' }).click();
  await page.getByRole('button', { name: 'Opprett møteplan' }).click();

  const romfordeling = page.getByRole('region', { name: 'Romfordeling' });
  const rom1 = romfordeling.getByRole('region', { name: 'Rom 1' });
  const rom2 = romfordeling.getByRole('region', { name: 'Rom 2' });
  const flyttetNavn =
    (await rom1.getByRole('listitem').first().textContent()) ?? '';
  const flyttEtikett = `Flytt ${flyttetNavn} til et annet rom`;

  await rom1.getByRole('button', { name: flyttEtikett }).click();
  await page.getByRole('menuitem', { name: 'Rom 2', exact: true }).click();
  await expect(rom2.getByRole('listitem').last()).toContainText(flyttetNavn);
  await expect.poll(fokusertEtikett).toBe(flyttEtikett);

  await page.getByRole('button', { name: 'Neste' }).click();
  const ønskestatus = page
    .getByRole('region', { name: 'Ønsker' })
    .getByRole('status');
  await expect(ønskestatus).toContainText('Lagret');
  await page
    .getByRole('checkbox', { name: /Marius Etternavn01 Eksempelbakeriet AS/ })
    .click();
  await page
    .getByRole('checkbox', { name: /Emilie Etternavn02 Eksempelbakeriet AS/ })
    .click();
  await expect(ønskestatus).toContainText('Lagret');
  await page.getByRole('button', { name: 'Neste' }).click();

  const fordelingsstatus = page
    .getByRole('region', { name: 'Intervjufordeling' })
    .getByRole('status');
  await expect(fordelingsstatus).toContainText('Lagret');

  const nedEtikett = 'Flytt Marius Etternavn01 ned hos Eksempelbakeriet AS';
  await page.getByRole('button', { name: nedEtikett }).click();
  await expect(fordelingsstatus).toContainText('Lagret');
  await expect
    .poll(fokusertEtikett)
    .toMatch(/^Flytt Marius Etternavn01 (ned|under sperrelinjen)/);
  await expect(fordelingsstatus).toHaveText(
    /Marius Etternavn01 er flyttet til plass 2 hos Eksempelbakeriet AS\./,
  );

  await page.route('**/motedag/intervjufordeling', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ feil: 'Testfeil' }),
    });
  });
  await page
    .getByRole('button', {
      name: 'Flytt Emilie Etternavn02 ned hos Eksempelbakeriet AS',
    })
    .click();
  await expect(fordelingsstatus).toContainText('Lagringsfeil');
  await expect(fordelingsstatus).toHaveText(
    /Kunne ikke lagre alle endringene\./,
  );
  await expect(fordelingsstatus).not.toContainText('er flyttet');
  await page.unroute('**/motedag/intervjufordeling');
});

test('viser skrolleskygge i oppmøtelista', async ({ page }) => {
  await gotoApp(page, '/rekrutteringstreff/workop');
  await page.getByRole('tab', { name: 'WorkOp-gjennomføring' }).click();

  const oppmøte = page.getByRole('region', { name: 'Oppmøte' });
  const liste = oppmøte.getByRole('region', { name: 'Fremmøtte jobbsøkere' });
  await expect(liste).toHaveAttribute(
    'aria-describedby',
    'workop-oppmøte-skrollhjelp',
  );
  await expect(
    oppmøte.getByText('Lista kan blas nedover for å se flere jobbsøkere.'),
  ).toBeAttached();

  // Skyggen tegnes med bakgrunnsgradienter på selve skrollområdet, på samme måte
  // som i Aksel-modalen, og forsvinner av seg selv når du har skrollet helt ned.
  await expect(liste).toHaveCSS('background-image', /radial-gradient/);
  await expect(liste).toHaveCSS(
    'background-attachment',
    'local, local, scroll, scroll',
  );

  await liste.evaluate((el) => el.scrollTo(0, el.scrollHeight));
  await expect(liste).not.toHaveAttribute('aria-describedby');
});

test('oppsummerer treffet i steg 6', async ({ page }) => {
  await gotoApp(page, '/rekrutteringstreff/workop');
  await page.getByRole('tab', { name: 'WorkOp-gjennomføring' }).click();
  await page.getByRole('button', { name: 'Opprett møteplan' }).click();
  await page.getByRole('button', { name: 'Neste' }).click();

  await page
    .getByRole('checkbox', { name: /Marius Etternavn01 Eksempelbakeriet AS/ })
    .click();
  await page
    .getByRole('checkbox', { name: /Emilie Etternavn02 Eksempelbakeriet AS/ })
    .click();
  await page.getByRole('button', { name: 'Neste' }).click();
  await expect(
    page.getByRole('list', {
      name: 'Intervjurekkefølge hos Eksempelbakeriet AS',
    }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Neste' }).click();

  const registrering = page.getByRole('region', {
    name: 'Registrering av status',
  });
  await expect(registrering.getByRole('status')).toContainText('Lagret');
  const arbeidsgiver1 = page.getByRole('region', {
    name: 'Eksempelbakeriet AS',
  });
  const mariusRad = arbeidsgiver1
    .getByRole('listitem')
    .filter({ hasText: 'Marius Etternavn01' });
  const vurderingslagring = page.waitForResponse('**/motedag/vurderinger');
  await mariusRad
    .getByRole('combobox', { name: 'Vurdering etter speedintervju' })
    .selectOption('AKTUELL');
  expect((await vurderingslagring).ok()).toBeTruthy();
  const andreIntervjuLagring = page.waitForResponse('**/motedag/vurderinger');
  await mariusRad.getByRole('checkbox', { name: '2. intervju' }).check();
  expect((await andreIntervjuLagring).ok()).toBeTruthy();

  await page.getByRole('button', { name: 'Neste' }).click();

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
    page.getByRole('heading', { name: 'Registrering av status', level: 3 }),
  ).toBeVisible();
});

test('skjuler WorkOp-fanen når møtedagen ikke er tilgjengelig', async ({
  page,
}) => {
  await page.route('**/motedag', async (route) => {
    await route.fulfill({
      status: 403,
      json: { feil: 'Ingen tilgang til møtedagen.' },
    });
  });

  await gotoApp(page, '/rekrutteringstreff/workop');

  await expect(page.getByRole('tab', { name: 'Jobbsøkere' })).toBeVisible();
  await expect(
    page.getByRole('tab', { name: 'WorkOp-gjennomføring' }),
  ).toHaveCount(0);
});

test('låser stegnavigasjonen mens et ønske lagres', async ({ page }) => {
  let slippLagring!: () => void;
  const lagringHoldes = new Promise<void>((resolve) => {
    slippLagring = resolve;
  });
  const lagringErStartet = page.waitForRequest('**/motedag/onsker');

  await page.route('**/motedag/onsker', async (route) => {
    await lagringHoldes;
    await route.continue();
  });

  await gotoApp(page, '/rekrutteringstreff/workop');
  await page.getByRole('tab', { name: 'WorkOp-gjennomføring' }).click();
  await page.getByRole('button', { name: 'Opprett møteplan' }).click();
  await expect(
    page.getByRole('heading', { name: 'Romfordeling' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Neste' }).click();
  await expect(page.getByRole('heading', { name: 'Ønsker' })).toBeVisible();

  const tilbakeTilOppmøte = page.getByRole('button', {
    name: 'Oppmøte og oppsett',
    exact: true,
  });
  await expect(tilbakeTilOppmøte).toBeVisible();

  await page
    .getByRole('checkbox', { name: /Marius Etternavn01 Eksempelbakeriet AS/ })
    .click();
  await lagringErStartet;

  // Steget må ikke rives bort mens lagringen pågår, ellers forsvinner både
  // lagringen og en eventuell feilmelding sammen med steget.
  await expect(tilbakeTilOppmøte).toHaveCount(0);

  slippLagring();
  await expect(tilbakeTilOppmøte).toBeVisible();

  await page.unrouteAll({ behavior: 'ignoreErrors' });
});
