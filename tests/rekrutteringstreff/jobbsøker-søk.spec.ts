import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const gåTilJobbsøkere = async (
  page: import('@playwright/test').Page,
  treffId = 'publisert',
) => {
  await gotoApp(page, `/rekrutteringstreff/${treffId}`);
  await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
};

const filterTrigger = (page: import('@playwright/test').Page, navn: string) =>
  page.locator('[aria-haspopup="menu"]', { hasText: navn });

const åpneFilter = async (
  page: import('@playwright/test').Page,
  navn: string,
) => {
  await filterTrigger(page, navn).click();
};

test.describe('Jobbsøkersøk – UI-elementer', () => {
  test.beforeEach(async ({ page }) => {
    await gåTilJobbsøkere(page);
  });

  test('Viser søkefelt med placeholder', async ({ page }) => {
    await expect(
      page.getByPlaceholder('Søk på navn, veileder eller sted...'),
    ).toBeVisible();
  });

  test('Viser status-chips for alle statuser', async ({ page }) => {
    await åpneFilter(page, 'Status');

    for (const label of ['Lagt til', 'Invitert', 'Svart ja', 'Svart nei']) {
      await expect(page.getByRole('checkbox', { name: label })).toBeVisible();
    }
  });

  test('Viser sorteringsknapper for tilgjengelige felt', async ({ page }) => {
    await expect(page.getByTestId('jobbsokere-sort-navn')).toBeVisible();
    await expect(
      page.getByTestId('jobbsokere-sort-invitert_dato'),
    ).toBeVisible();
    await expect(page.getByTestId('jobbsokere-sort-status')).toBeVisible();
  });

  test('Viser filterknapper for alle filtertyper', async ({ page }) => {
    for (const filter of ['Status', 'Nav-kontor', 'Sted', 'Innsatsgruppe']) {
      await expect(filterTrigger(page, filter)).toBeVisible();
    }
  });

  test('Viser totalantall jobbsøkere', async ({ page }) => {
    await expect(page.getByText('30 jobbsøkere')).toBeVisible();
  });
});

test.describe('Jobbsøkersøk – filtrering', () => {
  test.beforeEach(async ({ page }) => {
    await gåTilJobbsøkere(page);
  });

  test('Filtrere på status SVART_JA viser kun de som har svart ja', async ({
    page,
  }) => {
    await åpneFilter(page, 'Status');
    await page.getByRole('checkbox', { name: 'Svart ja' }).click();

    await expect(page.getByText('Jonathan Huseby').first()).toBeVisible();
    await expect(page.getByText('Anders Holm').first()).toBeVisible();
    await expect(page.getByText('7 jobbsøkere (filtrert)')).toBeVisible();

    await expect(page.getByText('Marius Johnsen')).not.toBeVisible();
    await expect(page.getByText('Lise Andersen')).not.toBeVisible();
  });

  test('Filtrere på status LAGT_TIL viser kun de som er lagt til', async ({
    page,
  }) => {
    await åpneFilter(page, 'Status');
    await page.getByRole('checkbox', { name: 'Lagt til' }).click();

    await expect(page.getByText('Marius Johnsen').first()).toBeVisible();
    await expect(page.getByText('Emilie Berg').first()).toBeVisible();
    await expect(page.getByText('Oscar Haugen').first()).toBeVisible();
    await expect(page.getByText('9 jobbsøkere (filtrert)')).toBeVisible();
  });

  test('Kombinere flere statusfiltre', async ({ page }) => {
    åpneFilter(page, 'Status');
    await page.getByRole('checkbox', { name: 'Lagt til' }).click();
    await åpneFilter(page, 'Status');
    await page.getByRole('checkbox', { name: 'Svart nei' }).click();

    await expect(page.getByText('15 jobbsøkere (filtrert)')).toBeVisible();
    await expect(page.getByText('Marius Johnsen').first()).toBeVisible();
    await expect(page.getByText('Lise Andersen').first()).toBeVisible();
  });

  test('Filtrere på navkontor via combobox', async ({ page }) => {
    await åpneFilter(page, 'Nav-kontor');
    const navkontor = page.getByRole('combobox', { name: 'Nav-kontor' });
    await navkontor.fill('Nav Majorstuen');
    await page.getByRole('option', { name: 'Nav Majorstuen' }).click();

    await expect(page.getByText('Oscar Haugen').first()).toBeVisible();
    await expect(page.getByText('1 jobbsøker (filtrert)')).toBeVisible();
    await expect(page.getByText('Marius Johnsen')).not.toBeVisible();
  });

  test('Filtrere på sted via combobox', async ({ page }) => {
    await åpneFilter(page, 'Sted');
    const sted = page.getByRole('combobox', { name: 'Sted' });
    await sted.fill('Kongsberg');
    await page.getByRole('option', { name: 'Kongsberg (kommune)' }).click();

    await expect(page.getByText('Jonathan Huseby').first()).toBeVisible();
    await expect(page.getByText('1 jobbsøker (filtrert)')).toBeVisible();
    await expect(page.getByText('Marius Johnsen')).not.toBeVisible();
  });

  test('Filtrere på innsatsgruppe via combobox', async ({ page }) => {
    await åpneFilter(page, 'Innsatsgruppe');
    const innsatsgruppe = page.getByRole('combobox', {
      name: 'Innsatsgruppe',
    });
    await innsatsgruppe.fill('Standard');
    await page.getByRole('option', { name: 'Standard innsats' }).click();

    await expect(page.getByText('(filtrert)')).toBeVisible();
    await expect(page.getByText('Marius Johnsen').first()).toBeVisible();
  });

  test('Viser valgte filtre som tabs', async ({ page }) => {
    await åpneFilter(page, 'Status');
    await page.getByRole('checkbox', { name: 'Svart ja' }).click();

    await expect(page.getByText('Fjern alle filtre')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Svart ja' })).toBeVisible();
  });

  test('Fjerne statusfilter viser alle igjen', async ({ page }) => {
    await åpneFilter(page, 'Status');
    await page.getByRole('checkbox', { name: 'Svart ja' }).click();
    await expect(page.getByText('7 jobbsøkere (filtrert)')).toBeVisible();

    await page.getByRole('button', { name: 'Svart ja' }).click();
    await expect(page.getByText('30 jobbsøkere')).toBeVisible();
  });

  test('Tomt filterresultat viser melding', async ({ page }) => {
    const søkefelt = page.getByPlaceholder(
      'Søk på navn, veileder eller sted...',
    );
    await søkefelt.fill('IngenTreffHer123');
    await søkefelt.press('Enter');

    await expect(
      page.getByText('Ingen jobbsøkere matcher filteret'),
    ).toBeVisible();
  });
});

test.describe('Jobbsøkersøk – fritekst', () => {
  test.beforeEach(async ({ page }) => {
    await gåTilJobbsøkere(page);
  });

  test('Søk på navn filtrerer resultater', async ({ page }) => {
    const søkefelt = page.getByPlaceholder(
      'Søk på navn, veileder eller sted...',
    );
    await søkefelt.fill('Marius');
    await søkefelt.press('Enter');

    await expect(page.getByText('Marius Johnsen').first()).toBeVisible();
    await expect(page.getByText('1 jobbsøker (filtrert)')).toBeVisible();
    await expect(page.getByText('Håkon Pettersen')).not.toBeVisible();
  });

  test('Søk på poststed filtrerer resultater', async ({ page }) => {
    const søkefelt = page.getByPlaceholder(
      'Søk på navn, veileder eller sted...',
    );
    await søkefelt.fill('Sandvika');
    await søkefelt.press('Enter');

    await expect(page.getByText('Marius Johnsen').first()).toBeVisible();
    await expect(page.getByText('1 jobbsøker (filtrert)')).toBeVisible();
  });

  test('Tømme søkefelt fjerner fritekstfilter', async ({ page }) => {
    const søkefelt = page.getByPlaceholder(
      'Søk på navn, veileder eller sted...',
    );
    await søkefelt.fill('Marius');
    await søkefelt.press('Enter');
    await expect(page.getByText('1 jobbsøker (filtrert)')).toBeVisible();

    await page.getByRole('button', { name: 'Tøm' }).click();
    await expect(page.getByText('30 jobbsøkere')).toBeVisible();
  });

  test('Kombinere fritekst og statusfilter', async ({ page }) => {
    await åpneFilter(page, 'Status');
    await page.getByRole('checkbox', { name: 'Invitert' }).click();

    const søkefelt = page.getByPlaceholder(
      'Søk på navn, veileder eller sted...',
    );
    await søkefelt.fill('Stor');
    await søkefelt.press('Enter');

    await expect(page.getByText('Stor Test').first()).toBeVisible();
    await expect(page.getByText('1 jobbsøker (filtrert)')).toBeVisible();
  });

  test('Søk på veiledernavn filtrerer resultater', async ({ page }) => {
    const søkefelt = page.getByPlaceholder(
      'Søk på navn, veileder eller sted...',
    );
    await søkefelt.fill('Fredrik Agboola');
    await søkefelt.press('Enter');

    await expect(page.getByText('Marius Johnsen').first()).toBeVisible();
    await expect(page.getByText('(filtrert)')).toBeVisible();
  });

  test('Søk på veileder-ident filtrerer resultater', async ({ page }) => {
    const søkefelt = page.getByPlaceholder(
      'Søk på navn, veileder eller sted...',
    );
    await søkefelt.fill('L174111');
    await søkefelt.press('Enter');

    await expect(page.getByText('Marius Johnsen').first()).toBeVisible();
    await expect(page.getByText('(filtrert)')).toBeVisible();
  });
});

test.describe('Jobbsøkersøk – sortering', () => {
  test.beforeEach(async ({ page }) => {
    await gåTilJobbsøkere(page);
  });

  test('Standard sortering er navn', async ({ page }) => {
    await expect(page.getByTestId('jobbsokere-sort-navn')).toContainText(
      'Navn',
    );
  });

  test('Sortering på navn viser alfabetisk rekkefølge', async ({ page }) => {
    const kortNavn = page.locator('[data-testid^="kandidatkort-lenke-"]');
    const førsteNavn = await kortNavn.first().textContent();
    const sisteNavn = await kortNavn.nth(1).textContent();
    expect(førsteNavn!.localeCompare(sisteNavn!)).toBeLessThanOrEqual(0);
  });

  test('Kan endre sortering til status', async ({ page }) => {
    await page.getByTestId('jobbsokere-sort-status').click();

    await expect(page.getByTestId('jobbsokere-sort-status')).toBeVisible();
  });

  test('Kan endre sortering til invitert dato', async ({ page }) => {
    await page.getByTestId('jobbsokere-sort-invitert_dato').click();

    await expect(
      page.getByTestId('jobbsokere-sort-invitert_dato'),
    ).toBeVisible();
  });

  test('Endring av sortering oppdaterer listen', async ({ page }) => {
    const førsteNavnFørSortering = await page
      .locator('[data-testid^="kandidatkort-lenke-"]')
      .first()
      .textContent();

    await page.getByTestId('jobbsokere-sort-status').click();

    await page.waitForTimeout(500);
    const førsteNavnEtterSortering = await page
      .locator('[data-testid^="kandidatkort-lenke-"]')
      .first()
      .textContent();
    expect(førsteNavnFørSortering).not.toEqual(førsteNavnEtterSortering);
  });
});

test.describe('Jobbsøkersøk – paginering', () => {
  test.beforeEach(async ({ page }) => {
    await gåTilJobbsøkere(page, 'mange');
  });

  test('Viser paginering ved mer enn 20 jobbsøkere', async ({ page }) => {
    await expect(page.getByText('1-20 av 30')).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Neste side' }),
    ).toBeVisible();
  });

  test('Side 1 viser maks 20 jobbsøkere', async ({ page }) => {
    await expect(page.getByText('30 jobbsøkere')).toBeVisible();

    const jobbsøkerkort = page.getByRole('checkbox', {
      name: /Velg kandidat/,
    });
    await expect(jobbsøkerkort).toHaveCount(20);
  });

  test('Navigere til side 2 viser resterende jobbsøkere', async ({ page }) => {
    await page.getByRole('button', { name: 'Neste side' }).click();

    await expect(page.getByText('21-30 av 30')).toBeVisible();

    const jobbsøkerkort = page.getByRole('checkbox', {
      name: /Velg kandidat/,
    });
    await expect(jobbsøkerkort).toHaveCount(10);
  });

  test('Filtrering tilbakestiller til side 1', async ({ page }) => {
    await page.getByRole('button', { name: 'Neste side' }).click();
    const jobbsøkerkort = page.getByRole('checkbox', {
      name: /Velg kandidat/,
    });
    await expect(jobbsøkerkort).toHaveCount(10);

    await åpneFilter(page, 'Status');
    await page.getByRole('checkbox', { name: 'Lagt til' }).click();

    await expect(page.getByText('(filtrert)')).toBeVisible();
    await expect(page.getByText('8 jobbsøkere (filtrert)')).toBeVisible();
  });

  test('Paginering skjules når filtrert resultat er under en side', async ({
    page,
  }) => {
    await åpneFilter(page, 'Status');
    await page.getByRole('checkbox', { name: 'Svart nei' }).click();

    await expect(page.getByText('1-7 av 7')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Neste side' })).toHaveCount(
      0,
    );
  });
});
