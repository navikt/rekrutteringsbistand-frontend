import { expect, lagringsstatus, test, åpneRomOgRotasjon } from './oppsett';
import { TreffgjennomføringSchema } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import { gotoApp } from '@/tests/gotoApp';
import type { Page } from '@playwright/test';

const rom = (page: Page, nummer: number) =>
  page
    .getByRole('region', { name: 'Romfordeling' })
    .getByRole('region', { name: `Rom ${nummer}`, exact: true });

const ventPåGjennomføring = (page: Page) =>
  page.waitForResponse(
    (respons) =>
      respons.request().method() === 'GET' &&
      respons.url().endsWith('/treffgjennomforing-og-oppfolging'),
  );

const tellOppfriskninger = (page: Page) => {
  const kall: string[] = [];
  page.on('request', (request) => {
    if (
      request.method() === 'GET' &&
      /\/(arbeidsgiver|arbeidsgiver-med-behov|treffgjennomforing-og-oppfolging)$/.test(
        request.url(),
      )
    ) {
      kall.push(request.url());
    }
  });
  return kall;
};

const fyllNyArbeidsgiver = async (page: Page) => {
  await page.getByRole('button', { name: 'Legg til arbeidsgiver' }).click();
  const dialog = page.getByRole('dialog', { name: /Legg til arbeidsgivere/ });
  await dialog.getByLabel('Finn arbeidsgiver').fill('test');
  await dialog.getByRole('option', { name: /TEST PLUTSELIG KATT/ }).click();
  await dialog.getByLabel('Antall stillinger').fill('2');
  await dialog.getByLabel('Hva arbeidsgiver leter etter').fill('ko');
  await dialog
    .getByRole('option', { name: /\(yrkestittel\)|\(kompetanse\)/i })
    .first()
    .click();
  await dialog.getByRole('combobox', { name: 'Språk' }).click();
  await dialog.getByRole('option', { name: 'Norsk', exact: true }).click();
  await page.keyboard.press('Escape');
  await dialog.getByLabel('Ansettelsesform').click();
  await dialog.getByRole('option', { name: 'Fast', exact: true }).click();
  await page.keyboard.press('Escape');
  return dialog;
};

test('ny arbeidsgiver med behov gir tomt rom i en allerede lastet møteplan', async ({
  page,
}) => {
  await åpneRomOgRotasjon(page);
  const førsteRom = await rom(page, 1).getByRole('listitem').allTextContents();
  await page.getByRole('tab', { name: /Arbeidsgivere/ }).click();
  const dialog = await fyllNyArbeidsgiver(page);
  const oppfriskninger = tellOppfriskninger(page);
  const gjennomføring = ventPåGjennomføring(page);
  await dialog.getByRole('button', { name: 'Legg til', exact: true }).click();
  const oppdatert = TreffgjennomføringSchema.parse(
    await (await gjennomføring).json(),
  );
  expect(oppdatert.antallRom).toBe(6);
  expect(oppdatert.rom[5]).toEqual({ romnummer: 6, jobbsøkere: [] });
  await expect(dialog).toBeHidden();
  await expect(
    page.getByRole('heading', { name: 'TEST PLUTSELIG KATT' }),
  ).toBeVisible();
  expect(oppfriskninger).toHaveLength(3);
  expect(new Set(oppfriskninger).size).toBe(3);

  await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
  await expect(rom(page, 6)).toBeVisible();
  await expect(rom(page, 6).getByRole('listitem')).toHaveCount(0);
  await expect(rom(page, 1).getByRole('listitem')).toHaveText(førsteRom);
  await expect(
    page
      .getByRole('region', { name: 'Hvem er i hvilket rom' })
      .getByRole('columnheader', { name: 'Rom 6', exact: true }),
  ).toBeVisible();
});

test('sletting av tomt mellomrom oppdaterer romnummer og deltakere etter fanebytte', async ({
  page,
}) => {
  await åpneRomOgRotasjon(page);
  const tredjeRom = await rom(page, 3).getByRole('listitem').allTextContents();
  const flytteknapper = rom(page, 2).getByRole('button', {
    name: /^Flytt .* til et annet rom$/,
  });
  const antall = await flytteknapper.count();
  expect(antall).toBeGreaterThan(0);
  for (let indeks = 0; indeks < antall; indeks++) {
    await flytteknapper.first().click();
    await page.getByRole('menuitem', { name: 'Rom 1', exact: true }).click();
    await expect(lagringsstatus(page, 'Romfordeling')).toContainText('Lagret');
    await expect(flytteknapper).toHaveCount(antall - indeks - 1);
  }
  await page.getByRole('tab', { name: /Arbeidsgivere/ }).click();
  await page.getByRole('button', { name: 'Slett', exact: true }).nth(1).click();
  const dialog = page.getByRole('dialog', { name: 'Slett arbeidsgiver' });
  const oppfriskninger = tellOppfriskninger(page);
  const gjennomføring = ventPåGjennomføring(page);
  await dialog.getByRole('button', { name: 'Slett', exact: true }).click();
  const oppdatert = TreffgjennomføringSchema.parse(
    await (await gjennomføring).json(),
  );
  expect(oppdatert.antallRom).toBe(4);
  expect(oppdatert.rom.map(({ romnummer }) => romnummer)).toEqual([1, 2, 3, 4]);
  expect(
    oppdatert.arbeidsgiverRekkefølge.map(
      ({ førsteRomnummer }) => førsteRomnummer,
    ),
  ).toEqual([1, 2, 3, 4]);
  await expect(dialog).toBeHidden();
  await expect(
    page.getByRole('button', { name: 'Slett', exact: true }),
  ).toHaveCount(4);
  expect(oppfriskninger).toHaveLength(3);
  expect(new Set(oppfriskninger).size).toBe(3);

  await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
  await expect(rom(page, 4)).toBeVisible();
  await expect(rom(page, 5)).toHaveCount(0);
  await expect(rom(page, 2).getByRole('listitem')).toHaveText(tredjeRom);
  const rotasjon = page.getByRole('region', { name: 'Hvem er i hvilket rom' });
  await expect(
    rotasjon.getByRole('columnheader', { name: 'Rom 4', exact: true }),
  ).toBeVisible();
  await expect(
    rotasjon.getByRole('columnheader', { name: 'Rom 5', exact: true }),
  ).toHaveCount(0);
});

test('arbeidsgiverpanelet oppdaterer tillegg og sletting uten å hente ubrukt gjennomføring', async ({
  page,
}) => {
  const gjennomføringskall: string[] = [];
  page.on('request', (request) => {
    if (request.url().endsWith('/treffgjennomforing-og-oppfolging')) {
      gjennomføringskall.push(request.url());
    }
  });
  await gotoApp(page, '/rekrutteringstreff/utkast/rediger');
  const dialog = await fyllNyArbeidsgiver(page);
  await dialog.getByRole('button', { name: 'Legg til', exact: true }).click();
  await expect(dialog).toBeHidden();
  const fjern = page.getByRole('button', { name: 'Fjern TEST PLUTSELIG KATT' });
  await expect(fjern).toBeVisible();
  await fjern.click();
  const slettedialog = page.getByRole('dialog', { name: 'Slett arbeidsgiver' });
  await slettedialog
    .getByRole('button', { name: 'Slett', exact: true })
    .click();
  await expect(slettedialog).toBeHidden();
  await expect(fjern).toHaveCount(0);
  await expect(
    page.getByRole('heading', { name: 'Testbedrift AS', exact: true }),
  ).toBeVisible();
  expect(gjennomføringskall).toEqual([]);
});

test('mislykket tillegg beholder dialogen og den lastede møteplanen', async ({
  page,
}) => {
  const uhåndterteFeil: string[] = [];
  page.on('pageerror', (error) => uhåndterteFeil.push(error.message));
  await åpneRomOgRotasjon(page);
  await page.getByRole('tab', { name: /Arbeidsgivere/ }).click();
  const dialog = await fyllNyArbeidsgiver(page);
  await page.route('**/arbeidsgiver-med-behov', (route) =>
    route.request().method() === 'POST'
      ? route.fulfill({ status: 500, body: 'TEKNISK_TESTFEIL' })
      : route.continue(),
  );
  await dialog.getByRole('button', { name: 'Legg til', exact: true }).click();
  await expect(dialog.getByRole('alert')).toContainText(
    'Kunne ikke legge til arbeidsgiveren. Prøv igjen senere.',
  );
  await expect(dialog).not.toContainText('TEKNISK_TESTFEIL');
  await dialog.getByRole('button', { name: 'Avbryt', exact: true }).click();
  await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
  await expect(rom(page, 5)).toBeVisible();
  await expect(rom(page, 6)).toHaveCount(0);
  expect(uhåndterteFeil).toEqual([]);
});

test('MSW blokkerer sletting av arbeidsgiver med deltakere i rommet', async ({
  page,
}) => {
  await åpneRomOgRotasjon(page);
  await page.getByRole('tab', { name: /Arbeidsgivere/ }).click();
  await page
    .getByRole('button', { name: 'Slett', exact: true })
    .first()
    .click();
  const dialog = page.getByRole('dialog', { name: 'Slett arbeidsgiver' });
  const svar = page.waitForResponse(
    (respons) =>
      respons.request().method() === 'DELETE' &&
      respons.url().includes('/arbeidsgiver/'),
  );
  await dialog.getByRole('button', { name: 'Slett', exact: true }).click();
  expect((await svar).status()).toBe(409);
  await expect(dialog.getByRole('alert')).toContainText(
    'Arbeidsgiveren har deltakere i rommet eller registreringer i treffgjennomføringen.',
  );
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Avbryt' }).click();
  await expect(
    page.getByText('Eksempelbakeriet AS', { exact: true }),
  ).toBeVisible();
});

test('slettedialog viser korte meldinger uten å tolke backenddetaljer', async ({
  page,
}) => {
  await åpneRomOgRotasjon(page);
  await page.getByRole('tab', { name: /Arbeidsgivere/ }).click();
  await page
    .getByRole('button', { name: 'Slett', exact: true })
    .first()
    .click();
  const dialog = page.getByRole('dialog', { name: 'Slett arbeidsgiver' });
  let status = 409;
  await page.route('**/arbeidsgiver/*', (route) =>
    route.request().method() === 'DELETE'
      ? route.fulfill({
          status,
          contentType: 'text/plain',
          body: 'TEKNISK_TESTFEIL',
        })
      : route.continue(),
  );

  await dialog.getByRole('button', { name: 'Slett', exact: true }).click();
  await expect(dialog.getByRole('alert')).toContainText(
    'Flytt deltakerne og fjern registreringene',
  );
  await expect(dialog).not.toContainText('TEKNISK_TESTFEIL');

  status = 500;
  await dialog.getByRole('button', { name: 'Slett', exact: true }).click();
  await expect(dialog.getByRole('alert')).toContainText(
    'Kunne ikke slette arbeidsgiveren. Prøv igjen senere.',
  );
  await expect(dialog).not.toContainText('TEKNISK_TESTFEIL');
});
