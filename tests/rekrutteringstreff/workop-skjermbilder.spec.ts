import { PLAYWRIGHT_MSW_SCOPE_COOKIE } from '@/app/api/rekrutteringstreff/mswScope';
import { gotoApp } from '@/tests/gotoApp';
import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

// Genererer skjermbilder av WorkOp-gjennomføringen for designgjennomgang.
// Kjøres manuelt: pnpm exec playwright test workop-skjermbilder --project=chromium-desktop
// Merk: har du «pnpm dev» kjørende, gjenbruker Playwright den serveren, og
// topplinja blir en annen enn i testmodus. Sett PLAYWRIGHT_PORT til en ledig
// port for å få en ren testmodus-server.

const UTMAPPE = join(
  process.cwd(),
  '..',
  'workop-designgjennomgang',
  'skjermbilder',
);

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const BREDDE = 1440;
const STANDARDHØYDE = 1080;
const MAKSHØYDE = 6000;

// Modalkroppen klipper innholdet mot viewporthøyden. Vi fjerner den grensa, så
// et elementbilde av dialogen får med hele dokumentet i én omgang.
//
// Samme grep på sidenivå-containeren fungerer *ikke*: både NavDekoratør og
// Sidepanel er «sticky top-0», og mister forankringa når dokumentet selv blir
// scroller. Topplinja havner da midt i bildet. Derfor vokser vi fortsatt
// viewporten for helsidebildene.
const åpneModalklipping = (page: Page) =>
  page.addStyleTag({
    content: `.aksel-modal, .aksel-modal__body { max-height: none !important; }`,
  });

// Innholdet ligger i en scroll-container med høyde «100vh - trim», så fullPage
// alene kutter alt under folden. Vi vokser derfor viewporten til containeren
// ikke har mer å scrolle. Containeren vokser med viewporten, så vi gjentar til
// høyden stabiliserer seg.
const lagre = async (page: Page, filnavn: string) => {
  await page.waitForTimeout(400);
  const scrollContainer = page
    .locator('.scroll-container')
    .filter({
      has: page.getByRole('heading', { name: 'WorkOp-gjennomføring' }),
    })
    .first();

  let høyde = STANDARDHØYDE;
  for (let forsøk = 0; forsøk < 5; forsøk += 1) {
    const skjultInnhold = await scrollContainer.evaluate(
      (element) => element.scrollHeight - element.clientHeight,
    );
    if (skjultInnhold <= 1 || høyde >= MAKSHØYDE) break;
    høyde = Math.min(høyde + skjultInnhold + 24, MAKSHØYDE);
    await page.setViewportSize({ width: BREDDE, height: høyde });
    await page.waitForTimeout(400);
  }

  await page.screenshot({
    path: join(UTMAPPE, `${filnavn}.png`),
    fullPage: true,
    scale: 'css',
  });
  await page.setViewportSize({ width: BREDDE, height: STANDARDHØYDE });
  await page.waitForTimeout(200);
};

// Utskriftene vises i en modal. Vi tar bilde av selve dialogen, som fanger hele
// elementet også når det er høyere enn viewporten.
const lagreDialog = async (page: Page, dialognavn: string, filnavn: string) => {
  const dialog = page.getByRole('dialog', { name: dialognavn });
  await expect(dialog).toBeVisible();
  await page.waitForTimeout(300);

  await dialog.screenshot({
    path: join(UTMAPPE, `${filnavn}.png`),
    scale: 'css',
  });
  // Modalen har flere «Lukk»-knapper, så Escape er den entydige veien ut.
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
};

test.beforeEach(async ({ page }, testInfo) => {
  await mkdir(UTMAPPE, { recursive: true });
  await page.context().addCookies([
    {
      name: PLAYWRIGHT_MSW_SCOPE_COOKIE,
      value: encodeURIComponent(`${testInfo.testId}-${crypto.randomUUID()}`),
      domain: 'localhost',
      path: '/',
    },
  ]);
});

test('genererer skjermbilder for alle seks WorkOp-steg', async ({ page }) => {
  test.skip(
    Boolean(process.env.CI),
    'Genererer dokumentasjon på forespørsel, og er ingen test av applikasjonen.',
  );
  test.setTimeout(180_000);

  await gotoApp(page, '/rekrutteringstreff/workop');
  await page.getByRole('tab', { name: 'WorkOp-gjennomføring' }).click();
  await åpneModalklipping(page);

  // Steg 1 – Oppmøte og oppsett
  const oppmøte = page.getByRole('region', { name: 'Oppmøte' });
  await expect(oppmøte.getByText('20 møtt av 30 påmeldte')).toBeVisible();
  await lagre(page, '01-oppmote-og-oppsett');

  // Steg 2 – Rom og rotasjon
  await page.getByRole('button', { name: 'Opprett møteplan' }).click();
  await expect(
    page.getByRole('heading', { name: 'Romfordeling', level: 3 }),
  ).toBeVisible();
  await lagre(page, '02-rom-og-rotasjon');

  // Utskriftene fra steg 2
  await page
    .getByRole('button', { name: 'Utskrift til arbeidsgivere' })
    .click();
  await lagreDialog(
    page,
    'Utskrift til arbeidsgivere',
    '02a-utskrift-arbeidsgivere',
  );

  await page.getByRole('button', { name: 'Utskrift til jobbsøkere' }).click();
  await lagreDialog(page, 'Utskrift til jobbsøkere', '02b-utskrift-jobbsokere');

  // Steg 3 – Ønsker
  await page.getByRole('button', { name: 'Neste' }).click();
  const ønsker = page.getByRole('region', { name: 'Ønsker' });
  await expect(
    ønsker.getByRole('heading', { name: 'Ønsker', level: 3 }),
  ).toBeVisible();

  // Mockdataen har ingen ønsker fra før. Vi krysser av et spredt, forutsigbart
  // mønster slik at de neste stegene viser realistiske mengder data.
  const rader = ønsker.getByRole('row');
  const antallRader = (await rader.count()) - 1;
  for (let radnummer = 0; radnummer < antallRader; radnummer += 1) {
    const rad = rader.nth(radnummer + 1);
    const kolonner = [radnummer % 5, (radnummer + 2) % 5];
    if (radnummer % 3 === 0) kolonner.push((radnummer + 4) % 5);
    for (const kolonne of kolonner) {
      await rad.getByRole('checkbox').nth(kolonne).click();
    }
  }
  await expect(ønsker.getByRole('status')).toContainText('Lagret');
  await lagre(page, '03-onsker');

  // Steg 4 – Intervjufordeling
  await page.getByRole('button', { name: 'Neste' }).click();
  await expect(
    page.getByRole('list', {
      name: 'Intervjurekkefølge hos Eksempelbakeriet AS',
    }),
  ).toBeVisible();
  await lagre(page, '04-intervjufordeling');

  // Utskrifta fra steg 4
  await page.getByRole('button', { name: 'Vis utskrift' }).click();
  await lagreDialog(
    page,
    'Intervjufordeling – utskrift',
    '04a-utskrift-intervjufordeling',
  );

  // Steg 5 – Registrering av status
  await page.getByRole('button', { name: 'Neste' }).click();
  const registrering = page.getByRole('region', {
    name: 'Registrering av status',
  });
  await expect(registrering.getByRole('status')).toContainText('Lagret');

  // Varierte vurderinger gir oppsummeringa i steg 6 realistiske nøkkeltall.
  const vurderinger = registrering.getByRole('combobox', {
    name: 'Vurdering etter speedintervju',
  });
  const vurderingsverdier = ['AKTUELL', 'KANSKJE', 'IKKE_AKTUELL', 'AKTUELL'];
  const antallVurderinger = await vurderinger.count();
  for (let i = 0; i < antallVurderinger; i += 1) {
    const lagring = page.waitForResponse('**/motedag/vurderinger');
    await vurderinger.nth(i).selectOption(vurderingsverdier[i % 4]);
    expect((await lagring).ok()).toBeTruthy();
  }
  const andreIntervju = registrering.getByRole('checkbox', {
    name: /^2\. intervju/,
  });
  const jobbtilbud = registrering.getByRole('checkbox', {
    name: /^Jobbtilbud/,
  });
  for (let i = 0; i < antallVurderinger; i += 4) {
    const lagring = page.waitForResponse('**/motedag/vurderinger');
    await andreIntervju.nth(i).check();
    expect((await lagring).ok()).toBeTruthy();
  }
  for (let i = 0; i < antallVurderinger; i += 8) {
    const lagring = page.waitForResponse('**/motedag/vurderinger');
    await jobbtilbud.nth(i).check();
    expect((await lagring).ok()).toBeTruthy();
  }
  // Alle arbeidsgiverkort er åpne som standard, noe som gir et uleselig langt
  // bilde. Vi lar det første stå åpent og kollapser resten.
  const statuskort = registrering.locator(
    '.aksel-expansioncard__header-button',
  );
  const antallKort = await statuskort.count();
  for (let i = 1; i < antallKort; i += 1) {
    await statuskort.nth(i).click();
  }
  await lagre(page, '05-registrering-av-status');

  // Steg 6 – Oppsummering
  await page.getByRole('button', { name: 'Neste' }).click();
  const oppsummering = page.getByRole('region', { name: 'Oppsummering' });
  await expect(
    oppsummering.getByRole('heading', { name: 'Oppsummering', level: 3 }),
  ).toBeVisible();
  await lagre(page, '06-oppsummering');
});
