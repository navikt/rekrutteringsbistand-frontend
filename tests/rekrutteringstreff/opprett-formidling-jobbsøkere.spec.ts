import { gotoApp } from '@/tests/gotoApp';
import { type Locator, type Page, expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const REKRUTTERINGSTREFF_ID = 'publisert-paginering';

async function åpneFormidlingModal(
  page: Page,
  rekrutteringstreffId = REKRUTTERINGSTREFF_ID,
) {
  await gotoApp(page, `/rekrutteringstreff/${rekrutteringstreffId}`);
  await page.getByRole('button', { name: 'Opprett etterregistrering' }).click();

  const modal = page.getByRole('dialog', {
    name: 'Opprett etterregistrering',
  });
  await expect(modal).toBeVisible();
  return modal;
}

async function fyllUtSteg2MedGyldigeVerdier(modal: Locator) {
  // Yrkestittel — skriv minst to bokstaver, velg første treff fra mocken
  const yrkestittel = modal.getByLabel(
    'Velg yrkestittel (Janzz yrkesontologi)',
  );
  await yrkestittel.fill('tester');
  await modal.getByRole('option', { name: 'Tester', exact: true }).click();

  // Sektor
  await modal.getByRole('radio', { name: 'Privat' }).click();

  // Ansettelsesform
  await modal.getByLabel('Ansettelsesform').selectOption({ label: 'Fast' });

  // Omfang
  await modal.getByRole('radio', { name: 'Heltid (100%)' }).click();

  // Sted — legg til en kommune
  await modal
    .getByRole('button', { name: 'Legg til land, fylke eller kommune' })
    .click();
  const stedCombobox = modal.locator('input[role="combobox"]').last();
  await stedCombobox.fill('oslo');
  await modal.getByRole('option', { name: 'Oslo (kommune)' }).click();
}

async function gåTilJobbsøkersteg(
  page: Page,
  rekrutteringstreffId = REKRUTTERINGSTREFF_ID,
) {
  const modal = await åpneFormidlingModal(page, rekrutteringstreffId);

  await expect(
    modal.getByRole('heading', { name: 'Velg arbeidsgiver (1 av 4)' }),
  ).toBeVisible();
  // Steg 1 → 2
  await modal.getByRole('button', { name: 'Neste' }).click();
  await expect(
    modal.getByRole('heading', { name: 'Fyll inn informasjon (2 av 4)' }),
  ).toBeVisible();

  // Steg 2 → 3 (krever gyldig utfylling)
  await fyllUtSteg2MedGyldigeVerdier(modal);
  await modal.getByRole('button', { name: 'Neste' }).click();
  await expect(
    modal.getByRole('heading', { name: 'Velg jobbsøkere (3 av 4)' }),
  ).toBeVisible();

  return modal;
}

function søkefelt(modal: Locator) {
  return modal.getByRole('searchbox', {
    name: 'Søk etter navn eller fødselsnummer',
  });
}

async function forventJobbsøkerSynlig(modal: Locator, navn: string) {
  await expect(modal.getByText(navn, { exact: true })).toBeVisible();
}

async function forventJobbsøkerIkkeSynlig(modal: Locator, navn: string) {
  await expect(modal.getByText(navn, { exact: true })).not.toBeVisible();
}

test.describe('Opprett formidling fra treff - tidlige steg', () => {
  test('steg 1 forhåndsvelger eneste arbeidsgiver og lar bruker gå videre', async ({
    page,
  }) => {
    const modal = await åpneFormidlingModal(page);

    await expect(
      modal.getByRole('heading', { name: 'Velg arbeidsgiver (1 av 4)' }),
    ).toBeVisible();
    await expect(modal.getByRole('button', { name: 'Neste' })).toBeEnabled();
  });

  test('steg 2 har Neste deaktivert til skjemaet er gyldig utfylt', async ({
    page,
  }) => {
    const modal = await åpneFormidlingModal(page);
    await modal.getByRole('button', { name: 'Neste' }).click();
    await expect(
      modal.getByRole('heading', { name: 'Fyll inn informasjon (2 av 4)' }),
    ).toBeVisible();

    const neste = modal.getByRole('button', { name: 'Neste' });
    await expect(neste).toBeDisabled();

    await fyllUtSteg2MedGyldigeVerdier(modal);
    await expect(neste).toBeEnabled();
  });
});

test.describe('Opprett formidling fra treff - jobbsøkere', () => {
  test('henter jobbsøkere fra formidling-endepunktet', async ({ page }) => {
    const modal = await gåTilJobbsøkersteg(page);

    await expect(modal.getByText('0 valgt av 30')).toBeVisible();
    await forventJobbsøkerSynlig(modal, 'Etternavn01, Marius');
    await forventJobbsøkerSynlig(modal, 'Etternavn02, Emilie');
  });

  test('kan filtrere jobbsøkere på navn', async ({ page }) => {
    const modal = await gåTilJobbsøkersteg(page);

    await søkefelt(modal).fill('Marius');

    await expect(modal.getByText('0 valgt av 1')).toBeVisible();
    await forventJobbsøkerSynlig(modal, 'Etternavn01, Marius');
    await forventJobbsøkerIkkeSynlig(modal, 'Etternavn02, Emilie');
  });

  test('kan filtrere jobbsøkere på fødselsnummer', async ({ page }) => {
    const modal = await gåTilJobbsøkersteg(page);

    await søkefelt(modal).fill('12345670001');

    await expect(modal.getByText('0 valgt av 1')).toBeVisible();
    await forventJobbsøkerSynlig(modal, 'Etternavn02, Emilie');
    await forventJobbsøkerIkkeSynlig(modal, 'Etternavn01, Marius');
  });

  test('viser tomtilstand når filteret ikke matcher noen jobbsøkere', async ({
    page,
  }) => {
    const modal = await gåTilJobbsøkersteg(page);

    await søkefelt(modal).fill('finnesikke');

    await expect(modal.getByText('0 valgt av 0')).toBeVisible();
    await expect(
      modal.getByText('Ingen jobbsøkere matcher søket.'),
    ).toBeVisible();
  });

  test('kan bla i jobbsøkerlisten og filter nullstiller til første side', async ({
    page,
  }) => {
    const modal = await gåTilJobbsøkersteg(page);

    await expect(modal.getByText('0 valgt av 30')).toBeVisible();
    await modal
      .getByRole('navigation')
      .getByRole('button', { name: 'Neste', exact: true })
      .click();
    await forventJobbsøkerSynlig(modal, 'Etternavn30, Tormod');
    await forventJobbsøkerIkkeSynlig(modal, 'Etternavn01, Marius');

    await søkefelt(modal).fill('Marius');

    await expect(modal.getByText('0 valgt av 1')).toBeVisible();
    await forventJobbsøkerSynlig(modal, 'Etternavn01, Marius');
    await forventJobbsøkerIkkeSynlig(modal, 'Etternavn30, Tormod');
  });
});

test.describe('Opprett formidling fra treff - ikke-eier', () => {
  test.use({ storageState: 'tests/.auth/jobbsokerrettet.json' });

  test('henter kun egne jobbsøkere for jobbsøkerrettet ikke-eier', async ({
    page,
  }) => {
    const modal = await gåTilJobbsøkersteg(page, 'ikke-eier-publisert');

    await expect(modal.getByText('0 valgt av 3')).toBeVisible();
    await forventJobbsøkerSynlig(modal, 'Etternavn01, Marius');
    await forventJobbsøkerSynlig(modal, 'Etternavn02, Emilie');
    await forventJobbsøkerSynlig(modal, 'Etternavn11, Lars');
    await forventJobbsøkerIkkeSynlig(modal, 'Etternavn03, Oscar');
  });
});
