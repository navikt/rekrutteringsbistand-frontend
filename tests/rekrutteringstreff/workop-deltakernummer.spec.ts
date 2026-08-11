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

const åpneWorkOp = async (page: Page) => {
  await gotoApp(page, '/rekrutteringstreff/workop');
  await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
};

const registrerOppmøte = async (page: Page, navnILista: string) => {
  await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
  const rad = page.locator('li').filter({ hasText: navnILista });
  await rad.getByRole('button', { name: 'Saksmeny' }).click();
  await page.getByRole('menuitem', { name: 'Registrer oppmøte' }).click();
  await expect(rad.getByText('Møtt', { exact: true })).toBeVisible();
  await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
};

test('gir neste ledige deltakernummer når en ny jobbsøker registreres møtt', async ({
  page,
}) => {
  await åpneWorkOp(page);
  const oppmøte = page.getByRole('region', { name: 'Oppmøte' });
  await expect(oppmøte.getByText('20 møtt av 30 påmeldte')).toBeVisible();

  // Startdataene har delt ut 1–20, så den neste i døra skal få kort nummer 21.
  await registrerOppmøte(page, 'Etternavn21, Jakob');

  await expect(oppmøte.getByText('21 møtt av 30 påmeldte')).toBeVisible();
  await expect(
    oppmøte.getByRole('listitem').filter({ hasText: 'Jakob Etternavn21' }),
  ).toContainText('21. Jakob Etternavn21');
});

test('beholder deltakernummeret når oppmøtet fjernes og gis tilbake til samme person', async ({
  page,
}) => {
  await åpneWorkOp(page);
  const oppmøte = page.getByRole('region', { name: 'Oppmøte' });
  const marius = oppmøte
    .getByRole('listitem')
    .filter({ hasText: 'Marius Etternavn01' });
  await expect(marius).toContainText('1. Marius Etternavn01');

  await marius.getByRole('button', { name: 'Fjern oppmøte' }).click();
  await expect(oppmøte.getByText('19 møtt av 30 påmeldte')).toBeVisible();

  // Nummeret står på et fysisk kort som allerede er delt ut. Det skal derfor
  // ikke gjenbrukes av neste person i køen mens Marius er borte.
  await registrerOppmøte(page, 'Etternavn21, Jakob');
  await expect(
    oppmøte.getByRole('listitem').filter({ hasText: 'Jakob Etternavn21' }),
  ).toContainText('21. Jakob Etternavn21');

  await registrerOppmøte(page, 'Etternavn01, Marius');
  await expect(marius).toContainText('1. Marius Etternavn01');
});

test('viser deltakernummeret sammen med navnet gjennom hele gjennomføringen', async ({
  page,
}) => {
  await åpneWorkOp(page);

  const oppmøte = page.getByRole('region', { name: 'Oppmøte' });
  // Lista skal lese som en kortbunke, altså fortløpende fra 1.
  await expect(oppmøte.getByRole('listitem').first()).toContainText(
    '1. Marius Etternavn01',
  );
  await expect(oppmøte.getByRole('listitem').nth(1)).toContainText(
    '2. Emilie Etternavn02',
  );

  await page.getByRole('button', { name: 'Gå til rom og rotasjon' }).click();
  await page.getByRole('button', { name: 'Opprett møteplan' }).click();
  await expect(
    page.getByRole('heading', { name: 'Romfordeling' }),
  ).toBeVisible();
  await expect(page.getByText('1. Marius Etternavn01').first()).toBeVisible();

  await page.getByRole('button', { name: 'Neste', exact: true }).click();
  const interessestatus = page
    .getByRole('region', { name: 'Interesse' })
    .locator('[data-autolagringsstatus]');
  await expect(interessestatus).toContainText('Lagret');
  await expect(
    page.getByRole('checkbox', {
      name: /1\. Marius Etternavn01 Eksempelbakeriet AS/,
    }),
  ).toBeVisible();
  await page
    .getByRole('checkbox', {
      name: /1\. Marius Etternavn01 Eksempelbakeriet AS/,
    })
    .click();
  await expect(interessestatus).toContainText('Lagret');

  await page.getByRole('button', { name: 'Neste', exact: true }).click();
  const fordelingsrad = page
    .getByRole('region', { name: 'Eksempelbakeriet AS' })
    .getByRole('listitem')
    .filter({ hasText: 'Marius Etternavn01' });
  await expect(fordelingsrad).toContainText('1. Marius Etternavn01');
  // Plassen i rekkefølgen leses av rekkefølgen på lista. Raden skal vise
  // deltakernummeret alene, uten et plassnummer ved siden av.
  await expect(fordelingsrad).toHaveText(/^\d+\. \D/);
  await expect(page.locator('[data-plass]')).toHaveCount(0);

  await page.getByRole('button', { name: 'Neste', exact: true }).click();
  await expect(
    page
      .getByRole('region', { name: 'Eksempelbakeriet AS' })
      .getByRole('listitem')
      .filter({ hasText: 'Marius Etternavn01' }),
  ).toContainText('1. Marius Etternavn01');
});

test('viser innsatsbehov i registrering av status, men ikke ukjente koder', async ({
  page,
}) => {
  await åpneWorkOp(page);
  // Jakob mangler innsatsgruppe i mockdataene og er ikke møtt fra start.
  await registrerOppmøte(page, 'Etternavn21, Jakob');
  await page.getByRole('button', { name: 'Gå til rom og rotasjon' }).click();
  await page.getByRole('button', { name: 'Opprett møteplan' }).click();
  await expect(
    page.getByRole('heading', { name: 'Romfordeling' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Neste', exact: true }).click();

  const interessestatus = page
    .getByRole('region', { name: 'Interesse' })
    .locator('[data-autolagringsstatus]');
  await expect(interessestatus).toContainText('Lagret');
  for (const navn of ['1. Marius Etternavn01', '21. Jakob Etternavn21']) {
    await page
      .getByRole('checkbox', {
        name: new RegExp(`${navn.replace('.', '\\.')} Eksempelbakeriet AS`),
      })
      .click();
    await expect(interessestatus).toContainText('Lagret');
  }

  await page.getByRole('button', { name: 'Neste', exact: true }).click();
  await page.getByRole('button', { name: 'Neste', exact: true }).click();

  const statusliste = page
    .getByRole('region', { name: 'Eksempelbakeriet AS' })
    .getByRole('listitem');
  // Marius har STANDARD_INNSATS i mockdataene.
  await expect(
    statusliste.filter({ hasText: 'Marius Etternavn01' }),
  ).toContainText('Gode muligheter');
  // Jakob mangler innsatsgruppe, og da skal ingen merkelapp vises framfor at
  // en rå kode eller en tom etikett havner på skjermen.
  await expect(
    statusliste.filter({ hasText: 'Jakob Etternavn21' }),
  ).not.toContainText('Gode muligheter');
});
