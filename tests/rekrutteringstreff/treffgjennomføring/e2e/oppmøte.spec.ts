import {
  expect,
  test,
  åpneInteresse,
  åpneRomOgRotasjon,
  åpneTreffgjennomføring,
} from './oppsett';
import { gotoApp } from '@/tests/gotoApp';

test('oppdaterer oppmøte fra WorkOp-oversikten og jobbsøkerlisten', async ({
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
  await mariusOppmøte.getByRole('button', { name: 'Fjern oppmøte' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(oppmøte.getByText('19 møtt av 30 påmeldte')).toBeVisible();
  await expect(mariusOppmøte).toHaveCount(0);

  await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
  const mariusRad = page
    .locator('li')
    .filter({ hasText: 'Etternavn01, Marius' });
  await expect(mariusRad.getByText('Møtt opp', { exact: true })).toHaveCount(0);
  await mariusRad.getByRole('button', { name: 'Saksmeny' }).click();
  await page.getByRole('menuitem', { name: 'Registrer oppmøte' }).click();
  await expect(mariusRad.getByText('Møtt opp', { exact: true })).toBeVisible();

  await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
  await expect(oppmøte.getByText('20 møtt av 30 påmeldte')).toBeVisible();
  await expect(
    oppmøte.getByRole('listitem').filter({ hasText: 'Marius Etternavn01' }),
  ).toBeVisible();
});

test('skjuler oppmøtehandlinger når treffgjennomføringen ikke er tilgjengelig', async ({
  page,
}) => {
  await page.route('**/treffgjennomforing-og-oppfolging', async (route) => {
    await route.fulfill({ status: 404, json: { melding: 'Ikke funnet' } });
  });

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
  await expect(
    page.getByRole('heading', { name: 'Romfordeling' }),
  ).toBeVisible();
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
  await marius.getByRole('button', { name: 'Fjern oppmøte' }).click();

  const blokkert = page.getByRole('dialog');
  await expect(
    blokkert.getByRole('heading', {
      name: 'Kan ikke fjerne oppmøtet for 1. Marius Etternavn01',
    }),
  ).toBeVisible();
  await expect(blokkert.getByRole('listitem')).toHaveText([
    '1 registrert interesse (steg 3)',
  ]);

  await blokkert.getByRole('button', { name: 'Lukk' }).last().click();
  await expect(blokkert).toBeHidden();
  await expect(oppmøte.getByText('20 møtt av 30 påmeldte')).toBeVisible();
  await expect(marius).toHaveCount(1);
});

test('beholder oppmøtet ved lagringsfeil og tillater et nytt forsøk', async ({
  page,
}) => {
  await åpneTreffgjennomføring(page);
  const oppmøte = page.getByRole('region', { name: 'Oppmøte' });
  const rad = oppmøte
    .getByRole('listitem')
    .filter({ hasText: 'Marius Etternavn01' });
  await page.route('**/treffgjennomforing/oppmote', (route) =>
    route.fulfill({ status: 500, json: { feil: 'Testfeil' } }),
  );
  await rad.getByRole('button', { name: 'Fjern oppmøte' }).click();
  await expect(page.getByText(/Kunne ikke fjerne oppmøtet/)).toBeVisible();
  await expect(rad).toBeVisible();
  await expect(oppmøte.getByText('20 møtt av 30 påmeldte')).toBeVisible();
  await page.unroute('**/treffgjennomforing/oppmote');
  await rad.getByRole('button', { name: 'Fjern oppmøte' }).click();
  await expect(oppmøte.getByText('19 møtt av 30 påmeldte')).toBeVisible();
  await page.reload();
  await expect(oppmøte.getByText('19 møtt av 30 påmeldte')).toBeVisible();
  await expect(rad).toHaveCount(0);
});

test('markerer flere valgte jobbsøkere som møtt i én handling', async ({
  page,
}) => {
  await gotoApp(page, '/rekrutteringstreff/workop');
  await page.getByRole('tab', { name: /Jobbsøkere/ }).click();

  // De 20 første er allerede møtt i mocken, så vi tar to som ikke er det.
  const førsteUmøtte = page
    .locator('li')
    .filter({ hasText: 'Etternavn21, ' })
    .first();
  const andreUmøtte = page
    .locator('li')
    .filter({ hasText: 'Etternavn22, ' })
    .first();
  await expect(førsteUmøtte.getByText('Møtt opp', { exact: true })).toHaveCount(
    0,
  );

  // Avkrysningen er ikke låst til svarstatus på WorkOp-treff, fordi alle kan
  // markeres som møtt.
  await førsteUmøtte.getByRole('checkbox').check();
  await andreUmøtte.getByRole('checkbox').check();

  const markerMøtt = page.getByRole('button', { name: /Marker som møtt/ });
  await expect(markerMøtt).toContainText('(2)');
  await markerMøtt.click();

  await expect(
    førsteUmøtte.getByText('Møtt opp', { exact: true }),
  ).toBeVisible();
  await expect(
    andreUmøtte.getByText('Møtt opp', { exact: true }),
  ).toBeVisible();
  // Valget tømmes når registreringen er gjort.
  await expect(førsteUmøtte.getByRole('checkbox')).not.toBeChecked();

  await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
  await expect(
    page.getByRole('region', { name: 'Oppmøte' }).getByText('22 møtt av 30'),
  ).toBeVisible();
});

test('fjerner oppmøte bare for de valgte som ikke har registreringer', async ({
  page,
}) => {
  await åpneInteresse(page);
  const interessestatus = page
    .getByRole('region', { name: 'Interesse' })
    .locator('[data-autolagringsstatus]');
  await expect(interessestatus).toContainText('Lagret');
  // Bare Marius får interesse, så bare han er blokkert for fjerning.
  await page
    .getByRole('checkbox', { name: /Marius Etternavn01 Eksempelbakeriet AS/ })
    .check();
  await expect(interessestatus).toContainText('Lagret');

  await page.getByRole('tab', { name: /Jobbsøkere/ }).click();

  const første = page
    .locator('li')
    .filter({ hasText: 'Etternavn01, ' })
    .first();
  const andre = page.locator('li').filter({ hasText: 'Etternavn02, ' }).first();
  await expect(første.getByText('Møtt opp', { exact: true })).toBeVisible();

  await første.getByRole('checkbox').check();
  await andre.getByRole('checkbox').check();

  const fjernOppmøte = page.getByRole('button', { name: /Fjern oppmøte/ });
  await expect(fjernOppmøte).toContainText('(1)');
  await expect(
    page.getByText(
      '1 valgt jobbsøker har registreringer i treffgjennomføringen, og oppmøtet kan ikke fjernes før de er ryddet.',
    ),
  ).toBeVisible();

  await fjernOppmøte.click();

  await expect(andre.getByText('Møtt opp', { exact: true })).toHaveCount(0);
  await expect(første.getByText('Møtt opp', { exact: true })).toBeVisible();

  await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
  await page.getByRole('button', { name: 'Oppmøte', exact: true }).click();
  await expect(
    page.getByRole('region', { name: 'Oppmøte' }).getByText('19 møtt av 30'),
  ).toBeVisible();
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

  // Marius er lagt til, men aldri invitert.
  await åpneSaksmeny('Etternavn01, Marius');
  await expect(endreSvarValg).toHaveCount(0);
  await expect(endreSvarSperret).toBeVisible();
  await page.getByRole('menuitem', { name: 'Fjern oppmøte' }).click();

  await åpneSaksmeny('Etternavn01, Marius');
  await expect(endreSvarValg).toHaveCount(0);
  await page.keyboard.press('Escape');

  // Jonathan har svart ja, så svaret skal kunne endres når oppmøtet er borte.
  await åpneSaksmeny('Etternavn05, Jonathan');
  await expect(endreSvarValg).toHaveCount(0);
  await page.getByRole('menuitem', { name: 'Fjern oppmøte' }).click();

  await åpneSaksmeny('Etternavn05, Jonathan');
  await expect(endreSvarValg).toBeVisible();
});
