import {
  expect,
  registrerOppmøte,
  test,
  åpneTreffgjennomføring,
} from './oppsett';
import type { Page } from '@playwright/test';

const stegnavn = (page: Page) =>
  page.getByRole('list', { name: 'Treffgjennomføring' }).getByRole('listitem');

test('viser bare de generelle stegene for et treff som ikke er WorkOp', async ({
  page,
}) => {
  await åpneTreffgjennomføring(page, 'publisert');

  await expect(stegnavn(page)).toHaveText([
    '1Oppmøte',
    '2Interesse',
    '3Vurdering og oppfølging',
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
    '5Vurdering og oppfølging',
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
    /Vurdering og oppfølging/,
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
