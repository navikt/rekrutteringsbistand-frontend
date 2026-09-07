import {
  draTil,
  expect,
  lagringsstatus,
  test,
  åpneRomOgRotasjon,
  åpneTreffgjennomføring,
} from './oppsett';
import { TreffgjennomføringSchema } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import type { Page } from '@playwright/test';

const rom = (page: Page, romnummer: number) =>
  page
    .getByRole('region', { name: 'Romfordeling' })
    .getByRole('region', { name: `Rom ${romnummer}`, exact: true });

const hentFordeling = (page: Page) =>
  Promise.all(
    [1, 2, 3, 4, 5].map((nummer) =>
      rom(page, nummer).getByRole('listitem').allTextContents(),
    ),
  );

const flyttMedMeny = async (page: Page, navn: string, målrom: number) => {
  await page
    .getByRole('button', {
      name: `Flytt ${navn} til et annet rom`,
      exact: true,
    })
    .click();
  await page
    .getByRole('menuitem', { name: `Rom ${målrom}`, exact: true })
    .click();
};

test('validerer møteoppsettet før rom og tidsplan opprettes', async ({
  page,
}) => {
  await åpneTreffgjennomføring(page);
  await page.getByRole('button', { name: 'Gå til rom og rotasjon' }).click();
  await page.getByLabel('Starttidspunkt').fill('');
  await page.getByLabel('Varighet per møte (min)').fill('0');
  await page.getByRole('button', { name: 'Opprett møteplan' }).click();
  await expect(page.getByText('Oppgi et gyldig starttidspunkt.')).toBeVisible();
  await expect(
    page.getByText('Varigheten må være minst 1 minutt.'),
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Romfordeling' })).toHaveCount(
    0,
  );

  await page.getByLabel('Starttidspunkt').fill('10:00');
  await page.getByLabel('Varighet per møte (min)').fill('6');
  const opprett = page
    .getByRole('button')
    .filter({ hasText: 'Opprett møteplan' });
  let slippLagring!: () => void;
  const vent = new Promise<void>((resolve) => {
    slippLagring = resolve;
  });
  await page.route('**/treffgjennomforing/moteoppsett', async (route) => {
    await vent;
    await route.continue();
  });
  try {
    await opprett.click();
    await expect(opprett).toBeDisabled();
    await expect(page.getByLabel('Starttidspunkt')).toBeDisabled();
    await expect(page.getByLabel('Varighet per møte (min)')).toBeDisabled();
  } finally {
    slippLagring();
  }
  await expect(
    page.getByText(
      '5 runder fra 10:00 til 10:30. Hver arbeidsgiver besøker alle rom.',
    ),
  ).toBeVisible();
  await expect(
    page
      .getByRole('region', { name: 'Hvem er i hvilket rom' })
      .getByRole('row', { name: /10:00–10:06/ }),
  ).toBeVisible();
  expect((await hentFordeling(page)).flat()).toHaveLength(20);
});

test('låser romhandlinger, utskrift og navigasjon mens møteoppsettet lagres', async ({
  page,
}) => {
  await åpneRomOgRotasjon(page);
  await page.getByRole('button', { name: 'Rediger møteoppsett' }).click();
  await page.getByLabel('Starttidspunkt').fill('11:30');
  let slippLagring!: () => void;
  const vent = new Promise<void>((resolve) => {
    slippLagring = resolve;
  });
  await page.route('**/treffgjennomforing/moteoppsett', async (route) => {
    await vent;
    await route.continue();
  });
  try {
    await page.getByRole('button', { name: 'Lagre endringer' }).click();
    await expect(
      page.getByRole('button').filter({ hasText: 'Lagre endringer' }),
    ).toBeDisabled();
    await expect(
      page.getByRole('button', { name: 'Neste', exact: true }),
    ).toBeDisabled();
    await expect(
      page.getByRole('button', { name: 'Tilbake', exact: true }),
    ).toBeDisabled();
    await expect(
      page.getByRole('button', { name: 'Oppmøte', exact: true }),
    ).toHaveCount(0);
    await expect(
      page.getByRole('button', { name: /^Flytt .* til et annet rom$/ }).first(),
    ).toBeDisabled();
    await expect(
      page
        .getByRole('region', { name: 'Romfordeling' })
        .locator('[draggable="true"]'),
    ).toHaveCount(0);
    await expect(
      page.getByRole('button', { name: 'Fordel på nytt', exact: true }),
    ).toBeDisabled();
    await expect(
      page.getByRole('button', { name: 'Utskrift til arbeidsgivere' }),
    ).toBeDisabled();
    await expect(page.getByLabel('Starttidspunkt')).toBeDisabled();
    await expect(page.getByLabel('Varighet per møte (min)')).toBeDisabled();
  } finally {
    slippLagring();
  }
  await expect(
    page.getByText('Møtene starter 11:30', { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Neste', exact: true }),
  ).toBeEnabled();
  await expect(
    page.getByRole('button', { name: 'Oppmøte', exact: true }),
  ).toBeVisible();
});

test('beholder manuelle romplasseringer når møteoppsettet endres', async ({
  page,
}) => {
  await åpneRomOgRotasjon(page);
  const navn = await rom(page, 1).getByRole('listitem').first().innerText();
  await flyttMedMeny(page, navn, 2);
  await expect(lagringsstatus(page, 'Romfordeling')).toContainText('Lagret');
  const fordeling = await hentFordeling(page);

  await page.getByRole('button', { name: 'Rediger møteoppsett' }).click();
  await page.getByLabel('Starttidspunkt').fill('11:00');
  await page.getByRole('button', { name: 'Lagre endringer' }).click();
  await expect(
    page.getByText('Møtene starter 11:00', { exact: false }),
  ).toBeVisible();
  expect(await hentFordeling(page)).toEqual(fordeling);
  await page.reload();
  await expect(
    page.getByText('Møtene starter 11:00', { exact: false }),
  ).toBeVisible();
  expect(await hentFordeling(page)).toEqual(fordeling);
});

test('avbryter redigering uten å endre tidene og gir tastaturfokus tilbake', async ({
  page,
}) => {
  await åpneRomOgRotasjon(page);
  const rediger = page.getByRole('button', { name: 'Rediger møteoppsett' });
  await rediger.click();
  await expect(page.getByLabel('Starttidspunkt')).toBeFocused();
  await page.getByLabel('Starttidspunkt').fill('13:30');
  await page.getByRole('button', { name: 'Avbryt' }).click();
  await expect(
    page.getByText('Møtene starter 10:00', { exact: false }),
  ).toBeVisible();
  await expect(rediger).toBeFocused();
  await rediger.click();
  await expect(page.getByLabel('Starttidspunkt')).toHaveValue('10:00');
});

test('beholder møteoppsettet i skjemaet ved feil og lar brukeren lagre på nytt', async ({
  page,
}) => {
  await åpneRomOgRotasjon(page);
  await page.getByRole('button', { name: 'Rediger møteoppsett' }).click();
  await page.getByLabel('Starttidspunkt').fill('12:30');
  await page.route('**/treffgjennomforing/moteoppsett', (route) =>
    route.fulfill({ status: 500, json: { feil: 'Testfeil' } }),
  );
  await page.getByRole('button', { name: 'Lagre endringer' }).click();
  await expect(
    page.getByText('Kunne ikke lagre møteoppsettet. Prøv igjen.'),
  ).toBeVisible();
  await expect(page.getByLabel('Starttidspunkt')).toHaveValue('12:30');
  await page.unroute('**/treffgjennomforing/moteoppsett');
  await page.getByRole('button', { name: 'Lagre endringer' }).click();
  await expect(
    page.getByText('Møtene starter 12:30', { exact: false }),
  ).toBeVisible();
});

test('flytter med meny og dra-og-slipp, og sperrer navigasjon mens det lagres', async ({
  page,
}) => {
  await åpneRomOgRotasjon(page);
  await page.getByRole('button', { name: 'Rediger møteoppsett' }).click();
  const navn = await rom(page, 1).getByRole('listitem').first().innerText();
  const status = lagringsstatus(page, 'Romfordeling');
  let slippLagring!: () => void;
  const vent = new Promise<void>((resolve) => {
    slippLagring = resolve;
  });
  await page.route('**/treffgjennomforing/romfordeling', async (route) => {
    await vent;
    await route.continue();
  });
  try {
    await flyttMedMeny(page, navn, 2);
    await expect(status).toContainText('Lagrer');
    await expect(
      page.getByRole('button', { name: 'Lagre endringer' }),
    ).toBeDisabled();
    await expect(page.getByLabel('Starttidspunkt')).toBeDisabled();
    await expect(
      page.getByRole('button', { name: 'Oppmøte', exact: true }),
    ).toHaveCount(0);
  } finally {
    slippLagring();
  }
  await expect(status).toContainText('Lagret');
  await expect(
    page.getByRole('button', { name: `Flytt ${navn} til et annet rom` }),
  ).toBeFocused();
  await expect(
    page.getByRole('button', { name: 'Oppmøte', exact: true }),
  ).toBeVisible();
  await page.unroute('**/treffgjennomforing/romfordeling');
  await expect(
    page.getByRole('button', { name: 'Lagre endringer' }),
  ).toBeEnabled();
  await page.getByRole('button', { name: 'Avbryt', exact: true }).click();

  await draTil(
    rom(page, 2)
      .getByRole('listitem')
      .filter({ hasText: navn })
      .locator('[draggable="true"]'),
    rom(page, 3),
    async () => {
      await expect(rom(page, 3).getByRole('listitem').last()).toContainText(
        navn,
      );
    },
  );
  await expect(status).toContainText('Lagret');
  await page.reload();
  await expect(rom(page, 3).getByRole('listitem').last()).toContainText(navn);
});

test('tilbakestiller romflytting ved lagringsfeil', async ({ page }) => {
  await åpneRomOgRotasjon(page);
  const navn = await rom(page, 1).getByRole('listitem').first().innerText();
  await page.route('**/treffgjennomforing/romfordeling', (route) =>
    route.fulfill({ status: 500, json: { feil: 'Testfeil' } }),
  );
  await flyttMedMeny(page, navn, 2);
  await expect(
    page.getByText(`Kunne ikke flytte ${navn}. Prøv igjen.`),
  ).toBeVisible();
  await expect(
    rom(page, 1).getByRole('listitem').filter({ hasText: navn }),
  ).toBeVisible();
  await expect(
    rom(page, 2).getByRole('listitem').filter({ hasText: navn }),
  ).toHaveCount(0);
});

test('ber om bekreftelse før manuelle romplasseringer erstattes', async ({
  page,
}) => {
  await åpneRomOgRotasjon(page);
  const opprinnelig = await hentFordeling(page);
  await flyttMedMeny(page, opprinnelig[0][0], 2);
  await expect(lagringsstatus(page, 'Romfordeling')).toContainText('Lagret');
  const manueltFordelt = await hentFordeling(page);
  const dialog = page.getByRole('dialog', { name: 'Fordele alle på nytt?' });

  await page
    .getByRole('button', { name: 'Fordel på nytt', exact: true })
    .click();
  await dialog.getByRole('button', { name: 'Avbryt' }).click();
  expect(await hentFordeling(page)).toEqual(manueltFordelt);
  await page
    .getByRole('button', { name: 'Fordel på nytt', exact: true })
    .click();
  const omfordelingssvar = page.waitForResponse(
    '**/treffgjennomforing/romfordeling/fordel',
  );
  await dialog
    .getByRole('button', { name: 'Fordel på nytt', exact: true })
    .click();
  const nyFordeling = TreffgjennomføringSchema.parse(
    await (await omfordelingssvar).json(),
  );
  await expect(dialog).toBeHidden();
  for (const { romnummer, jobbsøkere } of nyFordeling.rom) {
    await expect(rom(page, romnummer).getByRole('listitem')).toHaveCount(
      jobbsøkere.length,
    );
  }
  expect((await hentFordeling(page)).flat().sort()).toEqual(
    opprinnelig.flat().sort(),
  );
});
