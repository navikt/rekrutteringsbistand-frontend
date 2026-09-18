import type { KandidatsokKandidat } from '@/app/api/kandidat-sok/useKandidatsøk';
import { gotoApp } from '@/tests/gotoApp';
import { expect, test, type Page } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const kandidater: KandidatsokKandidat[] = Array.from(
  { length: 27 },
  (_, index) => ({
    arenaKandidatnr: `TEST-MARKERING-${index + 1}`,
    fornavn: 'Testperson',
    etternavn: `Eksempel${String(index + 1).padStart(2, '0')}`,
    fodselsnummer: `TEST-FNR-${index + 1}`,
    innsatsgruppe: 'STANDARD_INNSATS',
    yrkeJobbonskerObj: [],
    geografiJobbonsker: [],
  }),
);

async function mockKandidatsøk(page: Page, tomt = false) {
  await page.route('**/api/kandidat-sok/kandidatsok/**', (route) => {
    const side = Number(
      new URL(route.request().url()).searchParams.get('side'),
    );
    return route.fulfill({
      json: {
        kandidater: tomt ? [] : kandidater.slice((side - 1) * 25, side * 25),
        navigering: {
          kandidatnumre: tomt ? [] : kandidater.map((k) => k.arenaKandidatnr),
        },
        antallTotalt: tomt ? 0 : kandidater.length,
      },
    });
  });
}

test.describe('Kandidatsøk – marker alle på siden', () => {
  test('Legger til resten uten duplikater og tømmer også tidligere sider med tastaturet', async ({
    page,
  }) => {
    await mockKandidatsøk(page);
    await gotoApp(page, '/kandidat');

    const rader = page.getByRole('checkbox', { name: 'Checkbox', exact: true });
    await expect(rader).toHaveCount(25);
    await rader.first().check();
    const delvis = page.getByRole('checkbox', {
      name: 'Marker alle på siden (1 markert)',
      exact: true,
    });
    await expect(delvis).not.toBeChecked();
    await expect(delvis).toHaveJSProperty('indeterminate', false);
    await delvis.focus();
    await page.keyboard.press('Space');

    await expect(
      page.getByRole('checkbox', { name: 'Fjern markerte (25)', exact: true }),
    ).toBeChecked();
    await expect(
      page.getByRole('checkbox', { name: 'Checkbox', checked: true }),
    ).toHaveCount(25);
    await expect(
      page.getByRole('button', { name: 'Lagre i kandidatliste', exact: true }),
    ).toBeEnabled();

    await page.getByRole('button', { name: 'Neste side' }).click();
    await expect(rader).toHaveCount(2);
    await expect(
      page.getByRole('checkbox', { name: 'Checkbox', checked: true }),
    ).toHaveCount(0);
    await page
      .getByRole('checkbox', {
        name: 'Marker alle på siden (25 markert)',
        exact: true,
      })
      .check();
    await expect(
      page.getByRole('checkbox', { name: 'Checkbox', checked: true }),
    ).toHaveCount(2);
    await page.getByRole('button', { name: '27 markert', exact: true }).click();
    const popover = page.getByRole('dialog');
    await expect(
      popover.getByRole('heading', { name: 'Markerte kandidater (27)' }),
    ).toBeVisible();
    await expect(
      popover.getByRole('button', { name: 'Fjern kandidat' }),
    ).toHaveCount(27);
    await expect(
      popover.getByText('Eksempel01, Testperson', { exact: true }),
    ).toHaveCount(1);
    await expect(
      popover.getByText('Eksempel27, Testperson', { exact: true }),
    ).toHaveCount(1);
    await page.keyboard.press('Escape');

    await page.getByRole('button', { name: 'Forrige side' }).click();
    await expect(rader).toHaveCount(25);
    const fjernAlle = page.getByRole('checkbox', {
      name: 'Fjern markerte (27)',
      exact: true,
    });
    await expect(fjernAlle).toBeChecked();
    await expect(fjernAlle).toHaveJSProperty('indeterminate', false);
    await fjernAlle.focus();
    await page.keyboard.press('Space');
    await expect(
      page.getByRole('checkbox', { name: 'Checkbox', checked: true }),
    ).toHaveCount(0);
    await expect(
      page.getByRole('button', { name: /^\d+ markert$/ }),
    ).toHaveCount(0);

    await page.getByRole('button', { name: 'Neste side' }).click();
    await expect(rader).toHaveCount(2);
    await expect(rader.nth(0)).not.toBeChecked();
    await expect(rader.nth(1)).not.toBeChecked();
    await expect(
      page.getByRole('checkbox', { name: 'Marker alle på siden', exact: true }),
    ).not.toBeChecked();
  });

  test('Tomt søkeresultat kan ikke massemarkeres', async ({ page }) => {
    await mockKandidatsøk(page, true);
    await gotoApp(page, '/kandidat');

    const markerAlle = page.getByRole('checkbox', {
      name: 'Marker alle på siden',
      exact: true,
    });
    await expect(markerAlle).toBeDisabled();
    await expect(markerAlle).not.toBeChecked();
    await expect(markerAlle).toHaveJSProperty('indeterminate', false);
    await expect(page.getByRole('checkbox', { name: 'Checkbox' })).toHaveCount(
      0,
    );
    await expect(
      page.getByRole('button', { name: /^\d+ markert$/ }),
    ).toHaveCount(0);
  });
});
