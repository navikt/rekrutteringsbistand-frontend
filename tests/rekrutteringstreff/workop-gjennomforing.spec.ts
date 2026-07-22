import { PLAYWRIGHT_MSW_SCOPE_COOKIE } from '@/app/api/rekrutteringstreff/mswScope';
import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.beforeEach(async ({ page }, testInfo) => {
  await page.context().addCookies([
    {
      name: PLAYWRIGHT_MSW_SCOPE_COOKIE,
      value: encodeURIComponent(testInfo.testId),
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

  await expect(oppmøte.getByText('20 møtt av 30 påmeldte')).toBeVisible();
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
  await expect(romfordeling.getByText('5 jobbsøkere')).toHaveCount(4);
  await expect(
    page.getByText(
      '5 runder fra 10:00 til 10:46. Hver arbeidsgiver besøker alle rom.',
    ),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Vis rotasjonsplan' }).click();
  const rotasjonsplan = page.getByRole('dialog', { name: 'Rotasjonsplan' });
  await expect(
    rotasjonsplan.getByRole('row', { name: /10:00–10:06/ }),
  ).toBeVisible();
  await expect(rotasjonsplan.getByText('Pause og bytte av rom')).toHaveCount(4);
  await expect(
    rotasjonsplan.getByRole('button', { name: 'Skriv ut' }),
  ).toBeVisible();
});

test('registrerer ønsker og fordeler speedintervju i femstegsflyten', async ({
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

  const førsteØnske = page.getByRole('checkbox', {
    name: /Etternavn01, Marius Arbeidsgiver 1/,
  });
  await førsteØnske.click();
  await expect(førsteØnske).toBeChecked();
  await expect(
    page.getByRole('row', { name: /Etternavn01, Marius/ }),
  ).toContainText('1');
  await page.getByRole('button', { name: 'Neste' }).click();

  const førsteJobbsøkerRad = page.getByRole('row', {
    name: /Etternavn01, Marius/,
  });
  const intervjufordeling = page.getByRole('table', {
    name: 'Faktisk fordeling av speedintervjuer mellom jobbsøkere og arbeidsgivere',
  });
  await expect(intervjufordeling.getByRole('row')).toHaveCount(2);
  await expect(førsteJobbsøkerRad.getByText('Ikke ønsket')).toHaveCount(4);
  const førsteTildeling = page.getByRole('checkbox', {
    name: /Etternavn01, Marius Arbeidsgiver 1/,
  });
  await førsteTildeling.click();
  await expect(førsteTildeling).toBeChecked();
  await expect(
    page.getByRole('columnheader', {
      name: /Arbeidsgiver 1 1 tildelt/,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('row', { name: /Etternavn01, Marius/ }),
  ).toContainText('1');

  await page.getByRole('button', { name: 'Neste' }).click();
  await expect(
    page.getByText(
      'Vurderingsmatrisen bygges i neste fase. Intervjutildelingene er klare som grunnlag.',
    ),
  ).toBeVisible();
  await expect(page.getByRole('combobox')).toHaveCount(0);
});
