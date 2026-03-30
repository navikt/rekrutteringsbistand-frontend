import { gotoApp } from '@/tests/gotoApp';
import { expect, test, Page } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const REKRUTTERINGSTREFF_ID = 'publisert-paginering';
const ALLE_JOBBSØKERE = /1-25 av 30/;
const SISTE_SIDE = /26-30 av 30/;
const ALLE_PÅ_EN_SIDE = /1-30 av 30/;

async function gåTilJobbsøkereFane(page: Page) {
  await gotoApp(page, `/rekrutteringstreff/${REKRUTTERINGSTREFF_ID}`);
  await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
  await expect(page.getByText(ALLE_JOBBSØKERE)).toBeVisible();
}

async function åpneFilterDropdown(page: Page, filterNavn: string) {
  await page.getByRole('button', { name: filterNavn, exact: true }).click();
}

async function velgFilterCheckbox(page: Page, navn: string) {
  await page.getByRole('checkbox', { name: navn }).click();
}

async function lukkDropdown(page: Page) {
  await page.keyboard.press('Escape');
}

function førsteJobbsøkerCheckbox(page: Page) {
  return page.getByRole('checkbox', { name: /Velg kandidat/ }).first();
}

function sorteringsknapp(page: Page, navn: string) {
  return page.getByRole('button', { name: navn, exact: true });
}

function filterChip(page: Page, tekst: string) {
  return page.locator('.aksel-chips__chip', { hasText: tekst }).first();
}

test.describe('Filtrering av jobbsøkere', () => {
  test.beforeEach(async ({ page }) => {
    await gåTilJobbsøkereFane(page);
  });

  test('Kan filtrere på status via Status-dropdown', async ({ page }) => {
    await åpneFilterDropdown(page, 'Status');
    await velgFilterCheckbox(page, 'Lagt til');
    await lukkDropdown(page);

    await expect(page.getByText('Marius Johnsen').first()).toBeVisible();
    await expect(page.getByText('Emilie Berg').first()).toBeVisible();

    await expect(page.getByText('Håkon Pettersen')).not.toBeVisible();
    await expect(page.getByText('Jonathan Huseby')).not.toBeVisible();
  });

  test('Kan filtrere på flere statuser samtidig', async ({ page }) => {
    await åpneFilterDropdown(page, 'Status');
    await velgFilterCheckbox(page, 'Lagt til');
    await velgFilterCheckbox(page, 'Invitert');
    await lukkDropdown(page);

    await expect(page.getByText('Marius Johnsen').first()).toBeVisible();
    await expect(page.getByText('Håkon Pettersen').first()).toBeVisible();

    await expect(page.getByText('Jonathan Huseby')).not.toBeVisible();
    await expect(page.getByText('Lise Andersen')).not.toBeVisible();
  });

  test('Viser filter-chip når status er valgt', async ({ page }) => {
    await åpneFilterDropdown(page, 'Status');
    await velgFilterCheckbox(page, 'Svart ja');
    await lukkDropdown(page);

    await expect(filterChip(page, 'Svart ja')).toBeVisible();
  });

  test('Kan fjerne filter ved å klikke på chip', async ({ page }) => {
    await åpneFilterDropdown(page, 'Status');
    await velgFilterCheckbox(page, 'Lagt til');
    await lukkDropdown(page);

    const chip = filterChip(page, 'Lagt til');
    await expect(chip).toBeVisible();

    await chip.click();

    await expect(page.getByText(ALLE_JOBBSØKERE)).toBeVisible();
  });

  test('Kan filtrere på innsatsgruppe', async ({ page }) => {
    await åpneFilterDropdown(page, 'Innsatsgruppe');
    await velgFilterCheckbox(page, 'Varig tilpasset innsats');
    await lukkDropdown(page);

    await expect(page.getByText('Jonathan Huseby').first()).toBeVisible();
    await expect(page.getByText('Lars Eriksen').first()).toBeVisible();

    await expect(page.getByText('Marius Johnsen')).not.toBeVisible();
  });

  test('Kan bruke fritekst-søk', async ({ page }) => {
    const søkefelt = page.getByPlaceholder('Søk i jobbsøkerne');
    await søkefelt.fill('Marius');
    await søkefelt.press('Enter');

    await expect(page.getByText('Marius Johnsen').first()).toBeVisible();
    await expect(page.getByText('Emilie Berg')).not.toBeVisible();
  });

  test('Fritekst-søk viser chip som kan fjernes', async ({ page }) => {
    const søkefelt = page.getByPlaceholder('Søk i jobbsøkerne');
    await søkefelt.fill('Marius');
    await søkefelt.press('Enter');

    const chip = filterChip(page, 'Marius');
    await expect(chip).toBeVisible();

    await chip.click();
    await expect(page.getByText(ALLE_JOBBSØKERE)).toBeVisible();
  });

  test('Escape i søkefelt tømmer fritekst', async ({ page }) => {
    const søkefelt = page.getByPlaceholder('Søk i jobbsøkerne');
    await søkefelt.fill('Marius');
    await søkefelt.press('Enter');
    await expect(page.getByText('Marius Johnsen').first()).toBeVisible();
    await expect(page.getByText('Emilie Berg')).not.toBeVisible();

    await søkefelt.press('Escape');
    await expect(page.getByText(ALLE_JOBBSØKERE)).toBeVisible();
  });

  test('Filtrering nullstiller til side 1', async ({ page }) => {
    await page.getByRole('button', { name: 'Neste side' }).click();
    await expect(page.getByText(SISTE_SIDE)).toBeVisible();

    await åpneFilterDropdown(page, 'Status');
    await velgFilterCheckbox(page, 'Lagt til');
    await lukkDropdown(page);

    await expect(page.getByText('1-')).toBeVisible();
  });

  test('Kan kombinere status- og innsatsgruppe-filter', async ({ page }) => {
    await åpneFilterDropdown(page, 'Status');
    await velgFilterCheckbox(page, 'Lagt til');
    await lukkDropdown(page);

    await åpneFilterDropdown(page, 'Innsatsgruppe');
    await velgFilterCheckbox(page, 'Standardinnsats');
    await lukkDropdown(page);

    await expect(page.getByText('Marius Johnsen').first()).toBeVisible();
    await expect(page.getByText('Emilie Berg')).not.toBeVisible();
  });
});

test.describe('Sortering av jobbsøkere', () => {
  test.beforeEach(async ({ page }) => {
    await gåTilJobbsøkereFane(page);
  });

  test('Standard sortering er etter navn', async ({ page }) => {
    await expect(førsteJobbsøkerCheckbox(page)).toHaveAccessibleName(
      /Lise Andersen/,
    );
  });

  test('Kan sortere etter "Lagt til"-dato', async ({ page }) => {
    await sorteringsknapp(page, 'Lagt til').click();

    await expect(førsteJobbsøkerCheckbox(page)).toHaveAccessibleName(
      /Tormod Røe/,
    );
  });

  test('Kan bytte tilbake til navn-sortering', async ({ page }) => {
    await sorteringsknapp(page, 'Lagt til').click();
    await expect(førsteJobbsøkerCheckbox(page)).toHaveAccessibleName(
      /Tormod Røe/,
    );

    await sorteringsknapp(page, 'Navn').click();
    await expect(førsteJobbsøkerCheckbox(page)).toHaveAccessibleName(
      /Lise Andersen/,
    );
  });

  test('Sortering nullstiller til side 1', async ({ page }) => {
    await page.getByRole('button', { name: 'Neste side' }).click();
    await expect(page.getByText(SISTE_SIDE)).toBeVisible();

    await sorteringsknapp(page, 'Lagt til').click();
    await expect(page.getByText(ALLE_JOBBSØKERE)).toBeVisible();
  });
});

test.describe('Paginering av jobbsøkere', () => {
  test.beforeEach(async ({ page }) => {
    await gåTilJobbsøkereFane(page);
  });

  test('Viser paginerings-info', async ({ page }) => {
    await expect(page.getByText(ALLE_JOBBSØKERE)).toBeVisible();
  });

  test('Kan navigere til neste side', async ({ page }) => {
    await page.getByRole('button', { name: 'Neste side' }).click();

    await expect(page.getByText(SISTE_SIDE)).toBeVisible();
    await expect(page.getByText('Agnes Solberg').first()).toBeVisible();
  });

  test('Kan navigere tilbake til forrige side', async ({ page }) => {
    await page.getByRole('button', { name: 'Neste side' }).click();
    await expect(page.getByText(SISTE_SIDE)).toBeVisible();

    await page.getByRole('button', { name: 'Forrige side' }).click();
    await expect(page.getByText(ALLE_JOBBSØKERE)).toBeVisible();
  });

  test('Forrige-knappen er deaktivert på første side', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Forrige side' }),
    ).toBeDisabled();
  });

  test('Neste-knappen er deaktivert på siste side', async ({ page }) => {
    await page.getByRole('button', { name: 'Neste side' }).click();
    await expect(
      page.getByRole('button', { name: 'Neste side' }),
    ).toBeDisabled();
  });

  test('Kan endre antall per side', async ({ page }) => {
    await page.getByLabel('Antall per side').selectOption('50');

    await expect(page.getByText(ALLE_PÅ_EN_SIDE)).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Neste side' }),
    ).toBeDisabled();
  });

  test('Endring av antall per side nullstiller til side 1', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Neste side' }).click();
    await expect(page.getByText(SISTE_SIDE)).toBeVisible();

    await page.getByLabel('Antall per side').selectOption('50');
    await expect(page.getByText(ALLE_PÅ_EN_SIDE)).toBeVisible();
  });

  test('Markerte jobbsøkere nullstilles ved sidebytte', async ({ page }) => {
    await page
      .getByRole('checkbox', { name: /Velg kandidat Emilie Berg/ })
      .check();
    await expect(
      page.getByRole('button', { name: 'Inviter (1)' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Neste side' }).click();

    await expect(
      page.getByRole('button', { name: 'Inviter (0)' }),
    ).toBeVisible();
  });
});
