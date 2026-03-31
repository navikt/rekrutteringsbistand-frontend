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
  const knapp = page.getByRole('button', { name: filterNavn, exact: true });
  await knapp.click();
  await expect(knapp).toHaveAttribute('aria-expanded', 'true');
}

async function velgFilterCheckbox(page: Page, navn: string) {
  await page.getByRole('checkbox', { name: navn }).click();
}

async function lukkDropdown(page: Page, filterNavn: string) {
  const knapp = page.getByRole('button', { name: filterNavn, exact: true });
  await page.keyboard.press('Escape');
  await expect(knapp).toHaveAttribute('aria-expanded', 'false');
}

function førsteJobbsøkerCheckbox(page: Page) {
  return page.getByRole('checkbox', { name: /Velg kandidat/ }).first();
}

function sorteringsknapp(page: Page, navn: string) {
  return page.getByRole('button', { name: navn, exact: true });
}

function filterChip(page: Page, tekst: string) {
  return page.getByRole('button', { name: tekst }).first();
}

test.describe('Statusfiltrering av jobbsøkere', () => {
  test.beforeEach(async ({ page }) => {
    await gåTilJobbsøkereFane(page);
  });

  test('Kan filtrere på status via Status-dropdown', async ({ page }) => {
    await åpneFilterDropdown(page, 'Status');
    await velgFilterCheckbox(page, 'Lagt til');
    await lukkDropdown(page, 'Status');

    await expect(page.getByText('Etternavn01, Marius').first()).toBeVisible();
    await expect(page.getByText('Etternavn02, Emilie').first()).toBeVisible();

    await expect(page.getByText('Etternavn04, Håkon')).not.toBeVisible();
    await expect(page.getByText('Etternavn05, Jonathan')).not.toBeVisible();
  });

  test('Kan filtrere på flere statuser samtidig', async ({ page }) => {
    await åpneFilterDropdown(page, 'Status');
    await velgFilterCheckbox(page, 'Lagt til');
    await velgFilterCheckbox(page, 'Invitert');
    await lukkDropdown(page, 'Status');

    await expect(page.getByText('Etternavn01, Marius').first()).toBeVisible();
    await expect(page.getByText('Etternavn04, Håkon').first()).toBeVisible();

    await expect(page.getByText('Etternavn05, Jonathan')).not.toBeVisible();
    await expect(page.getByText('Etternavn06, Lise')).not.toBeVisible();
  });

  test('Statusfilter holder seg åpent når man velger flere verdier', async ({
    page,
  }) => {
    const statusKnapp = page.getByRole('button', {
      name: 'Status',
      exact: true,
    });

    await statusKnapp.click();
    await expect(statusKnapp).toHaveAttribute('aria-expanded', 'true');

    const statusGruppe = page.getByRole('group', { name: 'Status' });
    await statusGruppe.getByText('Lagt til', { exact: true }).click();

    await expect(statusKnapp).toHaveAttribute('aria-expanded', 'true');
    await expect(
      statusGruppe.getByRole('checkbox', { name: 'Invitert' }),
    ).toBeVisible();

    await statusGruppe.getByText('Invitert', { exact: true }).click();
    await expect(statusKnapp).toHaveAttribute('aria-expanded', 'true');
  });

  test('Kan fjerne filter ved å klikke på chip', async ({ page }) => {
    await åpneFilterDropdown(page, 'Status');
    await velgFilterCheckbox(page, 'Lagt til');
    await lukkDropdown(page, 'Status');

    const chip = filterChip(page, 'Lagt til');
    await expect(chip).toBeVisible();

    await chip.click();

    await expect(page.getByText(ALLE_JOBBSØKERE)).toBeVisible();
  });
});

test.describe('Fritekst og øvrig filtrering av jobbsøkere', () => {
  test.beforeEach(async ({ page }) => {
    await gåTilJobbsøkereFane(page);
  });

  test('Kan filtrere på innsatsgruppe', async ({ page }) => {
    await åpneFilterDropdown(page, 'Innsatsgruppe');
    await velgFilterCheckbox(page, 'Varig tilpasset innsats');
    await lukkDropdown(page, 'Innsatsgruppe');

    await expect(page.getByText('Etternavn05, Jonathan').first()).toBeVisible();
    await expect(page.getByText('Etternavn11, Lars').first()).toBeVisible();

    await expect(page.getByText('Etternavn01, Marius')).not.toBeVisible();
  });

  test('Kan bruke fritekst-søk', async ({ page }) => {
    const søkefelt = page.getByPlaceholder('Søk i jobbsøkerne');
    await søkefelt.fill('Marius');
    await søkefelt.press('Enter');

    await expect(page.getByText('Etternavn01, Marius').first()).toBeVisible();
    await expect(page.getByText('Etternavn02, Emilie')).not.toBeVisible();
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
    await expect(page.getByText('Etternavn01, Marius').first()).toBeVisible();
    await expect(page.getByText('Etternavn02, Emilie')).not.toBeVisible();

    await søkefelt.press('Escape');
    await expect(page.getByText(ALLE_JOBBSØKERE)).toBeVisible();
  });

  test('Filtrering nullstiller til side 1', async ({ page }) => {
    await page.getByRole('button', { name: 'Neste side' }).click();
    await expect(page.getByText(SISTE_SIDE)).toBeVisible();

    await åpneFilterDropdown(page, 'Status');
    await velgFilterCheckbox(page, 'Lagt til');
    await lukkDropdown(page, 'Status');

    await expect(
      page.getByRole('button', { name: 'Forrige side' }),
    ).toBeDisabled();
  });

  test('Kan kombinere status- og innsatsgruppe-filter', async ({ page }) => {
    await åpneFilterDropdown(page, 'Status');
    await velgFilterCheckbox(page, 'Lagt til');
    await lukkDropdown(page, 'Status');

    await åpneFilterDropdown(page, 'Innsatsgruppe');
    await velgFilterCheckbox(page, 'Standardinnsats');
    await lukkDropdown(page, 'Innsatsgruppe');

    await expect(page.getByText('Etternavn01, Marius').first()).toBeVisible();
    await expect(page.getByText('Etternavn02, Emilie')).not.toBeVisible();
  });
});

test.describe('Sortering av jobbsøkere', () => {
  test.beforeEach(async ({ page }) => {
    await gåTilJobbsøkereFane(page);
  });

  test('Standard sortering er etter navn', async ({ page }) => {
    await expect(førsteJobbsøkerCheckbox(page)).toHaveAccessibleName(
      /Etternavn01, Marius/,
    );
  });

  test('Kan veksle mellom stigende og synkende sortering på navn', async ({
    page,
  }) => {
    await sorteringsknapp(page, 'Navn').click();

    await expect(førsteJobbsøkerCheckbox(page)).toHaveAccessibleName(
      /Etternavn30, Tormod/,
    );

    await sorteringsknapp(page, 'Navn').click();

    await expect(førsteJobbsøkerCheckbox(page)).toHaveAccessibleName(
      /Etternavn01, Marius/,
    );
  });

  test('Ny sorteringskolonne starter med stigende sortering', async ({
    page,
  }) => {
    await sorteringsknapp(page, 'Navn').click();

    await expect(førsteJobbsøkerCheckbox(page)).toHaveAccessibleName(
      /Etternavn30, Tormod/,
    );

    await sorteringsknapp(page, 'Lagt til').click();

    await expect(førsteJobbsøkerCheckbox(page)).toHaveAccessibleName(
      /Etternavn01, Marius/,
    );
  });

  test('Kan veksle mellom stigende og synkende sortering på Lagt til', async ({
    page,
  }) => {
    await sorteringsknapp(page, 'Lagt til').click();
    await sorteringsknapp(page, 'Lagt til').click();

    await expect(førsteJobbsøkerCheckbox(page)).toHaveAccessibleName(
      /Etternavn30, Tormod/,
    );
  });

  test('Sortering nullstiller til side 1', async ({ page }) => {
    await page.getByRole('button', { name: 'Neste side' }).click();
    await expect(page.getByText(SISTE_SIDE)).toBeVisible();

    await sorteringsknapp(page, 'Navn').click();
    await expect(page.getByText(ALLE_JOBBSØKERE)).toBeVisible();
  });
});

test.describe('Paginering av jobbsøkere', () => {
  test.beforeEach(async ({ page }) => {
    await gåTilJobbsøkereFane(page);
  });

  test('Kan navigere til neste side', async ({ page }) => {
    await page.getByRole('button', { name: 'Neste side' }).click();

    await expect(page.getByText(SISTE_SIDE)).toBeVisible();
    await expect(page.getByText('Etternavn26, Henrik').first()).toBeVisible();
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
      .getByRole('checkbox', { name: /Velg kandidat Etternavn02, Emilie/ })
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
