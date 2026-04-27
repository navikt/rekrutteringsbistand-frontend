import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, Page, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const REKRUTTERINGSTREFF_ID = 'publisert-paginering';
const ALLE_JOBBSØKERE = /1-25 av 30/;
const SISTE_SIDE = /26-30 av 30/;
const ALLE_PÅ_EN_SIDE = /1-30 av 30/;
const LAGT_TIL_FILTER = /1-11 av 11/;

async function gåTilJobbsøkereFane(page: Page) {
  await gotoApp(page, `/rekrutteringstreff/${REKRUTTERINGSTREFF_ID}`);
  await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
  await expect(page.getByText(ALLE_JOBBSØKERE)).toBeVisible();
}

async function gåDirekteTilJobbsøkereFane(page: Page, query = '') {
  await gotoApp(
    page,
    `/rekrutteringstreff/${REKRUTTERINGSTREFF_ID}?visFane=jobbsøkere${query ? `&${query}` : ''}`,
  );
  await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toHaveAttribute(
    'aria-selected',
    'true',
  );
}

async function forventQueryParam(
  page: Page,
  navn: string,
  verdi: string | null,
) {
  await expect
    .poll(() => new URL(page.url()).searchParams.get(navn))
    .toBe(verdi);
}

async function åpneFilterDropdown(page: Page, filterNavn: string) {
  const knapp = page
    .getByRole('button', { name: filterNavn, exact: true })
    .first();
  await knapp.click();
  await expect(knapp).toHaveAttribute('aria-expanded', 'true');
}

async function velgFilterCheckbox(page: Page, navn: string) {
  await page.getByRole('checkbox', { name: navn }).click();
}

async function lukkDropdown(page: Page, filterNavn: string) {
  const knapp = page.getByRole('button', { name: filterNavn }).first();
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
    const statusKnapp = page
      .getByRole('button', {
        name: 'Status',
      })
      .first();

    await statusKnapp.click();
    await expect(statusKnapp).toHaveAttribute('aria-expanded', 'true');

    const statusGruppe = page.getByRole('group', { name: 'Status' });
    await statusGruppe.getByRole('checkbox', { name: /^Lagt til/ }).check();

    await expect(statusKnapp).toHaveAttribute('aria-expanded', 'true');
    await expect(
      statusGruppe.getByRole('checkbox', { name: 'Invitert' }),
    ).toBeVisible();

    await statusGruppe.getByRole('checkbox', { name: /^Invitert/ }).check();
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

  snapshotTest(test);
});

test.describe('Fritekst og øvrig filtrering av jobbsøkere', () => {
  test.beforeEach(async ({ page }) => {
    await gåTilJobbsøkereFane(page);
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

  test('Markerte jobbsøkere nullstilles ved filtrering', async ({ page }) => {
    await page
      .getByRole('checkbox', { name: /Velg kandidat Etternavn02, Emilie/ })
      .check();
    await expect(
      page.getByRole('button', { name: 'Inviter (1)' }),
    ).toBeVisible();

    await åpneFilterDropdown(page, 'Status');
    await velgFilterCheckbox(page, 'Lagt til');
    await lukkDropdown(page, 'Status');

    await expect(
      page.getByRole('button', { name: 'Inviter (0)' }),
    ).toBeVisible();
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

  test('Ny sorteringskolonne bruker standardretning', async ({ page }) => {
    await sorteringsknapp(page, 'Navn').click();
    await sorteringsknapp(page, 'Navn').click();

    await expect(førsteJobbsøkerCheckbox(page)).toHaveAccessibleName(
      /Etternavn01, Marius/,
    );

    await sorteringsknapp(page, 'Lagt til').click();

    await expect(førsteJobbsøkerCheckbox(page)).toHaveAccessibleName(
      /Etternavn30, Tormod/,
    );
  });

  test('Kan veksle mellom synkende og stigende sortering på Lagt til', async ({
    page,
  }) => {
    await sorteringsknapp(page, 'Lagt til').click();

    await expect(førsteJobbsøkerCheckbox(page)).toHaveAccessibleName(
      /Etternavn30, Tormod/,
    );

    await sorteringsknapp(page, 'Lagt til').click();

    await expect(førsteJobbsøkerCheckbox(page)).toHaveAccessibleName(
      /Etternavn01, Marius/,
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

  test('Markerte jobbsøkere beholdes ved sidebytte', async ({ page }) => {
    await page
      .getByRole('checkbox', { name: /Velg kandidat Etternavn02, Emilie/ })
      .check();
    await expect(
      page.getByRole('button', { name: 'Inviter (1)' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Neste side' }).click();

    await expect(
      page.getByRole('button', { name: 'Inviter (1)' }),
    ).toBeVisible();
  });
});

test.describe('URL-synk av jobbsøkere', () => {
  test('Skriver filter, sortering og paginering til URL-en', async ({
    page,
  }) => {
    await gåTilJobbsøkereFane(page);

    await forventQueryParam(page, 'visFane', 'jobbsøkere');

    await sorteringsknapp(page, 'Lagt til').click();
    await forventQueryParam(page, 'sortering', 'lagt-til');

    await page.getByRole('button', { name: 'Neste side' }).click();
    await forventQueryParam(page, 'side', '2');

    await page.getByLabel('Antall per side').selectOption('50');
    await forventQueryParam(page, 'antallPerSide', '50');
    await forventQueryParam(page, 'side', null);

    await åpneFilterDropdown(page, 'Status');
    await velgFilterCheckbox(page, 'Lagt til');
    await lukkDropdown(page, 'Status');
    await forventQueryParam(page, 'status', 'LAGT_TIL');
  });

  test('Laster filter og antall per side fra URL ved innlasting', async ({
    page,
  }) => {
    await gåDirekteTilJobbsøkereFane(page, 'fritekst=Marius&antallPerSide=50');

    await expect(page.getByPlaceholder('Søk i jobbsøkerne')).toHaveValue(
      'Marius',
    );
    await expect(page.getByLabel('Antall per side')).toHaveValue('50');
    await expect(page.getByText('Etternavn01, Marius').first()).toBeVisible();
    await expect(page.getByText('Etternavn02, Emilie')).not.toBeVisible();
    await expect(filterChip(page, 'Marius')).toBeVisible();
  });

  test('Laster sortering, paginering og status fra URL ved innlasting', async ({
    page,
  }) => {
    await gåDirekteTilJobbsøkereFane(page, 'sortering=lagt-til&side=2');

    await expect(page.getByText(SISTE_SIDE)).toBeVisible();
    await expect(førsteJobbsøkerCheckbox(page)).toHaveAccessibleName(
      /Etternavn05, Jonathan/,
    );

    await gåDirekteTilJobbsøkereFane(
      page,
      'status=LAGT_TIL&sortering=lagt-til&retning=asc&antallPerSide=50',
    );

    await expect(page.getByText(LAGT_TIL_FILTER)).toBeVisible();
    await expect(page.getByLabel('Antall per side')).toHaveValue('50');
    await expect(førsteJobbsøkerCheckbox(page)).toHaveAccessibleName(
      /Etternavn01, Marius/,
    );
    await expect(filterChip(page, 'Lagt til')).toBeVisible();
  });
});
