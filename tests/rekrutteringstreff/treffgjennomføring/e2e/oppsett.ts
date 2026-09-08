import { PLAYWRIGHT_MSW_SCOPE_COOKIE } from '@/app/api/rekrutteringstreff/mswScope';
import { gotoApp } from '@/tests/gotoApp';
import {
  expect,
  test as grunntest,
  type Locator,
  type Page,
} from '@playwright/test';

export { expect };

export const test = grunntest.extend({
  storageState: 'tests/.auth/arbeigsgiverrettet.json',
  page: async ({ page }, bruk, testInfo) => {
    await page.context().addCookies([
      {
        name: PLAYWRIGHT_MSW_SCOPE_COOKIE,
        value: encodeURIComponent(`${testInfo.testId}-${crypto.randomUUID()}`),
        domain: 'localhost',
        path: '/',
      },
    ]);
    await bruk(page);
  },
});

export const lagringsstatus = (page: Page, steg: string) =>
  page
    .getByRole('region', { name: steg, exact: true })
    .locator('[data-autolagringsstatus]');

export const åpneTreffgjennomføring = async (
  page: Page,
  treffId: string = 'workop',
) => {
  await gotoApp(page, `/rekrutteringstreff/${treffId}`);
  await page.getByRole('tab', { name: 'Treffgjennomføring' }).click();
};

export const åpneRomOgRotasjon = async (page: Page) => {
  await åpneTreffgjennomføring(page);
  await page.getByRole('button', { name: 'Gå til rom og rotasjon' }).click();
  await page.getByRole('button', { name: 'Opprett møteplan' }).click();
  await expect(
    page.getByRole('heading', { name: 'Romfordeling' }),
  ).toBeVisible();
};

export const åpneInteresse = async (page: Page) => {
  await åpneRomOgRotasjon(page);
  await page.getByRole('button', { name: 'Neste', exact: true }).click();
  await expect(lagringsstatus(page, 'Interesse')).toContainText('Lagret');
};

export const åpneIntervjufordeling = async (
  page: Page,
  interesser = [
    'Marius Etternavn01 Eksempelbakeriet AS',
    'Emilie Etternavn02 Eksempelbakeriet AS',
  ],
) => {
  await åpneInteresse(page);
  for (const interesse of interesser) {
    await page.getByRole('checkbox', { name: new RegExp(interesse) }).check();
  }
  await expect(lagringsstatus(page, 'Interesse')).toContainText('Lagret');
  await page.getByRole('button', { name: 'Neste', exact: true }).click();
  await expect(lagringsstatus(page, 'Intervjufordeling')).toContainText(
    'Lagret',
  );
};

export const åpneVurdering = async (page: Page) => {
  await åpneIntervjufordeling(page);
  await page.getByRole('button', { name: 'Neste', exact: true }).click();
  await expect(page).toHaveURL(/[?&]visSteg=5(?:&|$)/);
  await expect(lagringsstatus(page, 'Vurdering og oppfølging')).toContainText(
    'Lagret',
  );
};

export const registrerOppmøte = async (page: Page, navnILista: string) => {
  const oppmøteKnapp = page.getByRole('button', {
    name: 'Oppmøte',
    exact: true,
  });
  if (await oppmøteKnapp.isVisible()) {
    await oppmøteKnapp.click();
  }
  const oppmøte = page.getByRole('region', { name: 'Oppmøte' });
  const søketekst = navnILista.includes(',')
    ? navnILista.split(',')[0].trim()
    : navnILista.trim();
  const rad = oppmøte.getByRole('listitem').filter({ hasText: søketekst });
  const checkbox = rad.getByRole('checkbox');
  if (!(await checkbox.isChecked())) {
    await checkbox.check();
  }
};

export const draTil = async (
  håndtak: Locator,
  mål: Locator,
  forventUtfall: () => Promise<void>,
  målposisjon?: { x: number; y: number },
) => {
  await expect(async () => {
    await håndtak.dragTo(
      mål,
      målposisjon ? { targetPosition: målposisjon } : undefined,
    );
    await forventUtfall();
  }).toPass({ intervals: [300, 700, 1500], timeout: 20_000 });
};
