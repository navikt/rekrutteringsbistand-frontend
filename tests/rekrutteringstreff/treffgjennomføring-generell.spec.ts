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

const åpneTreffgjennomføring = async (page: Page, treffId: string) => {
  await gotoApp(page, `/rekrutteringstreff/${treffId}`);
  await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
};

const stegnavn = (page: Page) =>
  page.getByRole('list', { name: 'Treffgjennomføring' }).getByRole('listitem');

const registrerOppmøte = async (page: Page, navnILista: string) => {
  await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
  const rad = page.getByRole('listitem').filter({ hasText: navnILista });
  await rad.getByRole('button', { name: 'Saksmeny' }).click();
  await page.getByRole('menuitem', { name: 'Registrer oppmøte' }).click();
  await expect(rad.getByText('Møtt opp', { exact: true })).toBeVisible();
  await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
};

test('viser bare de generelle stegene for et treff som ikke er WorkOp', async ({
  page,
}) => {
  await åpneTreffgjennomføring(page, 'publisert');

  await expect(stegnavn(page)).toHaveText([
    '1Oppmøte',
    '2Interesse',
    '3Registrering av status',
    '4Oppsummering',
  ]);
});

test('viser alle stegene for en WorkOp', async ({ page }) => {
  await åpneTreffgjennomføring(page, 'workop');

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
  let antallFordelingskall = 0;
  page.on('request', (request) => {
    if (
      request.url().endsWith('/treffgjennomforing/intervjufordeling/fordel')
    ) {
      antallFordelingskall += 1;
    }
  });

  await åpneTreffgjennomføring(page, 'publisert');
  await registrerOppmøte(page, 'Etternavn01');

  await page.getByRole('button', { name: 'Gå til interesse' }).click();

  await expect(page.locator('[aria-current="step"]')).toHaveText(/Interesse/);
  await expect
    .poll(() => new URL(page.url()).searchParams.get('visSteg'))
    .toBe('3');

  const interesse = page.getByRole('region', { name: 'Interesse' });
  await interesse.getByRole('checkbox').first().check();
  await expect(interesse.locator('[data-autolagringsstatus]')).toContainText(
    'Lagret',
  );
  await page.getByRole('button', { name: 'Neste', exact: true }).click();

  await expect(page.locator('[aria-current="step"]')).toHaveText(
    /Registrering av status/,
  );
  expect(antallFordelingskall).toBe(0);
});

test('sender et vanlig treff til nærmeste generelle steg når URL-en peker på et WorkOp-steg', async ({
  page,
}) => {
  await åpneTreffgjennomføring(page, 'publisert');
  await registrerOppmøte(page, 'Etternavn01');

  const url = new URL(page.url());
  url.searchParams.set('visSteg', '2');
  await page.goto(url.toString());

  await expect(page.locator('[aria-current="step"]')).toHaveText(/Oppmøte/);
  await expect
    .poll(() => new URL(page.url()).searchParams.get('visSteg'))
    .toBeNull();
});

test('viser ikke deltakernummer i et vanlig treff', async ({ page }) => {
  await åpneTreffgjennomføring(page, 'publisert');
  await registrerOppmøte(page, 'Etternavn01');

  const oppmøtt = page
    .getByRole('list', { name: 'Fremmøtte jobbsøkere' })
    .getByRole('listitem')
    .first();
  await expect(oppmøtt).toContainText('Etternavn01');
  await expect(oppmøtt.getByText(/^\d+\.\s/)).toHaveCount(0);
});
