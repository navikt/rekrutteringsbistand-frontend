import { PLAYWRIGHT_MSW_SCOPE_COOKIE } from '@/app/api/rekrutteringstreff/mswScope';
import { gotoApp } from '@/tests/gotoApp';
import type { Page } from '@playwright/test';
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

const åpneMøtedag = async (page: Page, treffId: string) => {
  await gotoApp(page, `/rekrutteringstreff/${treffId}`);
  await page.getByRole('tab', { name: 'Møtedag' }).click();
};

// Stepper tegner bare tilgjengelige steg som knapper, så vi leser listepunktene
// for å se hele rekka. Teksten inkluderer nummeret Stepper viser.
const stegnavn = (page: Page) =>
  page.getByRole('list', { name: 'Møtedag' }).getByRole('listitem');

const registrerOppmøte = async (page: Page, navnILista: string) => {
  await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
  const rad = page.getByRole('listitem').filter({ hasText: navnILista });
  await rad.getByRole('button', { name: 'Saksmeny' }).click();
  await page.getByRole('menuitem', { name: 'Registrer oppmøte' }).click();
  await expect(rad.getByText('Møtt', { exact: true })).toBeVisible();
  await page.getByRole('tab', { name: 'Møtedag' }).click();
};

test('viser bare de generelle stegene for et treff som ikke er WorkOp', async ({
  page,
}) => {
  await åpneMøtedag(page, 'publisert');

  // Rom og intervjufordeling forutsetter at deltakerne roterer mellom
  // arbeidsgivere. Uten den formen finnes ikke stegene.
  await expect(stegnavn(page)).toHaveText([
    '1Oppmøte',
    '2Interesse',
    '3Registrering av status',
    '4Oppsummering',
  ]);
});

test('viser alle stegene for en WorkOp', async ({ page }) => {
  await åpneMøtedag(page, 'workop');

  await expect(stegnavn(page)).toHaveText([
    '1Oppmøte',
    '2Rom og rotasjon',
    '3Interesse',
    '4Intervjufordeling',
    '5Registrering av status',
    '6Oppsummering',
  ]);
});

test('hopper over WorkOp-stegene når man går videre i et vanlig treff', async ({
  page,
}) => {
  await åpneMøtedag(page, 'publisert');
  await registrerOppmøte(page, 'Etternavn01');

  // Neste steg er interesse, ikke møteoppsett – og knappen skal si hvor den
  // faktisk fører.
  await page.getByRole('button', { name: 'Gå til interesse' }).click();

  await expect(page.locator('[aria-current="step"]')).toHaveText(/Interesse/);
  // Stegnummeret i URL-en er stegets egen identitet, ikke plassen i rekka. Det
  // gjør at en delt lenke peker på det samme steget uansett hvilken variant av
  // møtedagen mottakeren åpner.
  await expect
    .poll(() => new URL(page.url()).searchParams.get('visSteg'))
    .toBe('3');
});

test('sender et vanlig treff til nærmeste generelle steg når URL-en peker på et WorkOp-steg', async ({
  page,
}) => {
  await åpneMøtedag(page, 'publisert');
  // Med noen registrert som møtt ville steg 2 vært åpent på en WorkOp. Det er
  // nettopp det som gjør prøven skarp: lander vi på 2, har varianten ikke blitt
  // tatt hensyn til.
  await registrerOppmøte(page, 'Etternavn01');

  const url = new URL(page.url());
  url.searchParams.set('visSteg', '2');
  await page.goto(url.toString());

  // Steg 2 er rom og rotasjon, som ikke finnes her. Da lander vi på nærmeste
  // steg som faktisk finnes, framfor å vise en tom side.
  await expect(page.locator('[aria-current="step"]')).toHaveText(/Oppmøte/);
  await expect
    .poll(() => new URL(page.url()).searchParams.get('visSteg'))
    .toBeNull();
});

test('viser ikke deltakernummer i et vanlig treff', async ({ page }) => {
  await åpneMøtedag(page, 'publisert');
  await registrerOppmøte(page, 'Etternavn01');

  // Deltakernummeret er nummeret på det fysiske kortet som deles ut på en
  // WorkOp. Uten den kortbunken skal navnet stå alene.
  const oppmøtt = page
    .getByRole('list', { name: 'Fremmøtte jobbsøkere' })
    .getByRole('listitem')
    .first();
  await expect(oppmøtt).toContainText('Etternavn01');
  await expect(oppmøtt.getByText(/^\d+\.\s/)).toHaveCount(0);
});
