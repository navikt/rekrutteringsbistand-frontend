import {
  expect,
  lagringsstatus,
  test,
  åpneRomOgRotasjon,
  åpneTreffgjennomføring,
} from './oppsett';
import { gotoApp } from '@/tests/gotoApp';

test('rask av og på kølegges for samme person uten å miste siste valg', async ({
  page,
}) => {
  await åpneTreffgjennomføring(page);
  const valg = page
    .getByRole('region', { name: 'Oppmøte', exact: true })
    .getByRole('listitem')
    .filter({ hasText: 'Marius Etternavn01' })
    .getByRole('checkbox');
  let slippLagring!: () => void;
  const vent = new Promise<void>((resolve) => {
    slippLagring = resolve;
  });
  const valgTilServer: boolean[] = [];
  await page.route('**/treffgjennomforing/oppmote', async (route) => {
    valgTilServer.push(route.request().postDataJSON().møtt);
    if (valgTilServer.length === 1) await vent;
    await route.continue();
  });
  try {
    await valg.uncheck();
    await valg.check();
    await expect(valg).toBeChecked();
    await expect.poll(() => valgTilServer).toEqual([false]);
  } finally {
    slippLagring();
  }
  await expect(lagringsstatus(page, 'Oppmøte')).toContainText('Lagret');
  expect(valgTilServer).toEqual([false, true]);
  await expect(valg).toBeFocused();
  await page.reload();
  await expect(valg).toBeChecked();
});

test('oppdaterer oppmøte fra WorkOp-oversikten og viser oppmøtestatus i jobbsøkerlisten', async ({
  page,
}) => {
  await åpneTreffgjennomføring(page);

  const oppmøte = page.getByRole('region', { name: 'Oppmøte' });
  const mariusOppmøte = oppmøte
    .getByRole('listitem')
    .filter({ hasText: 'Marius Etternavn01' });
  const arbeidsgivere = page.getByRole('region', { name: 'Arbeidsgivere' });

  await expect(oppmøte.getByText('20 møtt av 30 påmeldte')).toBeVisible();
  await expect(arbeidsgivere.getByText('5 arbeidsgivere deltar')).toBeVisible();

  const mariusCheckbox = mariusOppmøte.getByRole('checkbox');
  await expect(mariusCheckbox).toBeChecked();
  await mariusCheckbox.uncheck();

  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(oppmøte.getByText('19 møtt av 30 påmeldte')).toBeVisible();
  await expect(mariusCheckbox).not.toBeChecked();

  await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
  const mariusRad = page
    .locator('li')
    .filter({ hasText: 'Etternavn01, Marius' });
  await expect(mariusRad.getByText('Møtt opp', { exact: true })).toHaveCount(0);

  await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
  await expect(oppmøte.getByText('19 møtt av 30 påmeldte')).toBeVisible();
  await mariusOppmøte.getByRole('checkbox').check();
  await expect(oppmøte.getByText('20 møtt av 30 påmeldte')).toBeVisible();
  await expect(mariusOppmøte.getByRole('checkbox')).toBeChecked();

  await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
  await expect(mariusRad.getByText('Møtt opp', { exact: true })).toBeVisible();
});

test('har ingen oppmøtehandlinger i jobbsøkerlisten', async ({ page }) => {
  await gotoApp(page, '/rekrutteringstreff/workop');
  await page.getByRole('tab', { name: /Jobbsøkere/ }).click();

  await page.getByRole('button', { name: 'Saksmeny' }).first().click();
  await expect(
    page.getByRole('menuitem', { name: /Registrer oppmøte|Fjern oppmøte/ }),
  ).toHaveCount(0);
  await page.keyboard.press('Escape');
  const valgbare = page.getByRole('checkbox', {
    name: /Velg kandidat/,
    disabled: false,
  });
  await valgbare.nth(0).check();
  await valgbare.nth(1).check();
  await expect(
    page.getByRole('button', { name: /Marker som møtt|Fjern oppmøte/ }),
  ).toHaveCount(0);
});

test('blokkerer fjerning av oppmøte for jobbsøker med registreringer', async ({
  page,
}) => {
  await åpneRomOgRotasjon(page);
  await page.getByRole('button', { name: 'Neste', exact: true }).click();

  const interessestatus = page
    .getByRole('region', { name: 'Interesse' })
    .locator('[data-autolagringsstatus]');
  await expect(interessestatus).toContainText('Lagret');
  await page
    .getByRole('checkbox', { name: /Marius Etternavn01 Eksempelbakeriet AS/ })
    .click();
  await expect(interessestatus).toContainText('Lagret');

  await page.getByRole('button', { name: 'Oppmøte', exact: true }).click();
  const oppmøte = page.getByRole('region', { name: 'Oppmøte' });
  const marius = oppmøte
    .getByRole('listitem')
    .filter({ hasText: 'Marius Etternavn01' });
  const mariusCheckbox = marius.getByRole('checkbox');

  await expect(mariusCheckbox).toBeDisabled();
  await expect(mariusCheckbox).toBeChecked();
  await expect(oppmøte.getByText('20 møtt av 30 påmeldte')).toBeVisible();

  await marius.locator('span[tabindex="0"]').hover();
  await expect(
    page.getByText(
      'Kan ikke fjerne oppmøte fordi jobbsøkeren har 1 registrert interesse (steg 3). Nullstill disse først.',
    ),
  ).toBeVisible();
});

test('beholder oppmøtet ved lagringsfeil og tillater et nytt forsøk', async ({
  page,
}) => {
  await åpneTreffgjennomføring(page);
  const oppmøte = page.getByRole('region', { name: 'Oppmøte' });
  const rad = oppmøte
    .getByRole('listitem')
    .filter({ hasText: 'Marius Etternavn01' });
  const neste = page.getByRole('button', { name: 'Gå til rom og rotasjon' });
  let slippLagring!: () => void;
  const vent = new Promise<void>((resolve) => {
    slippLagring = resolve;
  });
  await page.route('**/treffgjennomforing/oppmote', async (route) => {
    await vent;
    await route.fulfill({ status: 500, json: { feil: 'Testfeil' } });
  });
  try {
    await rad.getByRole('checkbox').click();
    await expect(neste).toBeDisabled();
  } finally {
    slippLagring();
  }
  await expect(
    rad.getByText(/Vi kunne ikke bekrefte oppmøteendringen/),
  ).toBeVisible();
  await expect(neste).toBeEnabled();
  await expect(rad.getByRole('checkbox')).toBeChecked();
  await expect(oppmøte.getByText('20 møtt av 30 påmeldte')).toBeVisible();
  await page.unroute('**/treffgjennomforing/oppmote');
  await rad.getByRole('checkbox').click();
  await expect(oppmøte.getByText('19 møtt av 30 påmeldte')).toBeVisible();
  await page.reload();
  await expect(oppmøte.getByText('19 møtt av 30 påmeldte')).toBeVisible();
  await expect(rad.getByRole('checkbox')).not.toBeChecked();
});

test('lar ikke svaret endres så lenge jobbsøkeren er registrert som møtt', async ({
  page,
}) => {
  await gotoApp(page, '/rekrutteringstreff/workop');
  await page.getByRole('tab', { name: /Jobbsøkere/ }).click();

  const endreSvarValg = page.getByRole('menuitem', { name: 'Endre svar' });
  const endreSvarSperret = page.locator('[id="Endre svar-deaktivert"]');

  const åpneSaksmeny = async (navn: string) => {
    await page
      .locator('li')
      .filter({ hasText: navn })
      .getByRole('button', { name: 'Saksmeny' })
      .click();
  };

  // Jonathan har svart ja og er møtt
  await åpneSaksmeny('Etternavn05, Jonathan');
  await expect(endreSvarValg).toHaveCount(0);
  await expect(endreSvarSperret).toBeVisible();
  await page.keyboard.press('Escape');

  // Fjern oppmøtet i Treffgjennomføring
  await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
  const oppmøte = page.getByRole('region', { name: 'Oppmøte' });
  const jonathanOppmøte = oppmøte
    .getByRole('listitem')
    .filter({ hasText: 'Jonathan Etternavn05' });
  await jonathanOppmøte.getByRole('checkbox').uncheck();
  await expect(oppmøte.getByText('19 møtt av 30 påmeldte')).toBeVisible();

  // Jonathan har svart ja, så svaret skal kunne endres når oppmøtet er fjernet
  await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
  await åpneSaksmeny('Etternavn05, Jonathan');
  await expect(endreSvarValg).toBeVisible();
});
