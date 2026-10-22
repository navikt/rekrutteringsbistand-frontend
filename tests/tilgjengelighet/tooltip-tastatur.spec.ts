import { PLAYWRIGHT_MSW_SCOPE_COOKIE } from '@/app/api/rekrutteringstreff/mswScope';
import { gotoApp } from '@/tests/gotoApp';
import { sjekkPekerfølsomtInnhold } from '@navikt/toi-next-frontend/a11y';
import {
  expect,
  test as grunntest,
  type Locator,
  type Page,
} from '@playwright/test';

const test = grunntest.extend({
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

const sisteArbeidsgiverTekst =
  'Treffet må alltid ha en arbeidsgiver som deltar. Legg til en ny arbeidsgiver først.';

// Tabber fra toppen av siden til utløseren, så vi vet at den er i tabulatorrekkefølgen.
const tabTil = async (page: Page, utløser: Locator) => {
  await page.locator('body').focus();
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press('Tab');
    if (await utløser.evaluate((e) => e === document.activeElement)) return;
  }
  throw new Error('Fant ikke utløseren med Tab');
};

const sjekkTooltipMedTastatur = async (
  page: Page,
  utløser: Locator,
  tekst: string,
) => {
  await page.mouse.move(0, 0);
  await tabTil(page, utløser);
  await expect(utløser).toBeFocused();
  // Filtrerer på tekst fordi tooltipen til en utløser vi tabbet forbi kan henge igjen et øyeblikk.
  const tooltip = page.getByRole('tooltip').filter({ hasText: tekst });
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveText(tekst);
  await page.keyboard.press('Escape');
  await expect(tooltip).toBeHidden();
  await expect(utløser).toBeFocused();
};

test.describe('Tooltip kan åpnes med tastatur', { tag: '@a11y' }, () => {
  test('eierne av treffet (2.1.1, 1.4.13)', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
    const eier = page
      .getByRole('list', { name: 'Eiere' })
      .getByRole('img')
      .first();
    await expect(eier).toBeVisible();
    const tekst = await eier.getAttribute('aria-label');
    expect(tekst).toBeTruthy();

    await sjekkTooltipMedTastatur(page, eier, tekst!);
    await sjekkPekerfølsomtInnhold(page, eier);
  });

  test('Slett når siste arbeidsgiver ikke kan slettes (2.1.1, 1.4.13)', async ({
    page,
  }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
    await page.getByRole('tab', { name: /Arbeidsgivere/ }).click();
    const slett = page.getByRole('button', { name: 'Slett', exact: true });
    await expect(slett).toHaveCount(1);
    await expect(slett).toHaveAttribute('aria-disabled', 'true');

    await sjekkTooltipMedTastatur(page, slett, sisteArbeidsgiverTekst);
    await sjekkPekerfølsomtInnhold(page, slett);

    await slett.focus();
    await page.keyboard.press('Enter');
    await expect(
      page.getByRole('dialog', { name: 'Slett arbeidsgiver' }),
    ).toBeHidden();
  });

  test('Fjern arbeidsgiver i redigering når den er den siste (2.1.1, 1.4.13)', async ({
    page,
  }) => {
    await gotoApp(page, '/rekrutteringstreff/utkast/rediger');
    const fjern = page.getByRole('button', { name: 'Fjern Testbedrift AS' });
    await expect(fjern).toHaveCount(1);
    await expect(fjern).toHaveAttribute('aria-disabled', 'true');

    await sjekkTooltipMedTastatur(page, fjern, sisteArbeidsgiverTekst);
    await sjekkPekerfølsomtInnhold(page, fjern);

    await fjern.focus();
    await page.keyboard.press('Enter');
    await expect(
      page.getByRole('dialog', { name: 'Slett arbeidsgiver' }),
    ).toBeHidden();
  });

  test('deaktiverte valg i saksmenyen til en jobbsøker (2.1.1, 1.4.13)', async ({
    page,
  }) => {
    await gotoApp(page, '/rekrutteringstreff/workop');
    await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
    const saksmeny = page
      .locator('li')
      .filter({ hasText: 'Etternavn05, Jonathan' })
      .getByRole('button', { name: 'Saksmeny' });

    await saksmeny.focus();
    await page.keyboard.press('Enter');
    const meny = page.getByRole('menu');
    await expect(meny).toBeVisible();

    const valg = [
      {
        punkt: meny.getByRole('menuitem', { name: 'Endre svar' }),
        årsak: 'Fjern oppmøtet under Treffgjennomføring før du endrer svaret',
      },
      {
        punkt: meny.getByRole('menuitem', { name: 'Slett Slett' }),
        årsak: 'Kan ikke slette jobbsøker som har møtt opp',
      },
    ];

    // ArrowDown skal stoppe på hvert valg, også de deaktiverte.
    for (const { punkt, årsak } of valg) {
      await page.keyboard.press('ArrowDown');
      await expect(punkt).toBeFocused();
      await expect(punkt).toHaveAttribute('aria-disabled', 'true');
      await expect(punkt).toHaveAccessibleDescription(årsak);
      await expect(
        page.getByRole('tooltip').filter({ hasText: årsak }),
      ).toBeVisible();

      await page.keyboard.press('Enter');
      await expect(meny).toBeVisible();
      await expect(punkt).toBeFocused();
      await expect(page.getByRole('dialog')).toHaveCount(0);
    }
  });
});
