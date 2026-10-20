import { gotoApp } from '@/tests/gotoApp';
import { expect, type Page, test } from '@playwright/test';

/*
 * Mocken lagrer søkene per DEV-BRUKER-cookie. Hver test bruker sin egen mockbruker,
 * så testene kan kjøre parallelt mot samme server uten å påvirke hverandre.
 */

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const PORT = process.env.PLAYWRIGHT_PORT || '1337';
const endepunkt = `http://localhost:${PORT}/api/bruker/standardsok/rekrutteringstreff`;

const brukEgenMockbruker = async (page: Page, prefiks = 'TEST-LAGREDE-SOK') => {
  await page.context().addCookies([
    {
      name: 'DEV-BRUKER',
      value: `${prefiks}-${crypto.randomUUID()}`,
      domain: 'localhost',
      path: '/',
    },
  ]);
};

const opprettSøk = async (
  page: Page,
  navn: string,
  filter = '',
  fritekst: string[] = [],
) => {
  const respons = await page.request.post(endepunkt, {
    data: { navn, filter, fritekst },
  });
  expect(respons.status()).toBe(201);
};

/** Syntetisk nummer (måned + 80) med gyldige kontrollsifre, laget når testen kjører. */
const syntetiskFødselsnummer = () => {
  const kontroll = (sifre: number[], vekter: number[]) => {
    const rest =
      11 - (vekter.reduce((sum, vekt, i) => sum + vekt * sifre[i], 0) % 11);
    return rest === 11 ? 0 : rest === 10 ? null : rest;
  };
  for (let individ = 0; individ < 500; individ++) {
    const ni = `158690${String(individ).padStart(3, '0')}`;
    const sifre = [...ni].map(Number);
    const k1 = kontroll(sifre, [3, 7, 6, 1, 8, 9, 4, 5, 2]);
    if (k1 === null) continue;
    const k2 = kontroll([...sifre, k1], [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]);
    if (k2 === null) continue;
    return `${ni}${k1}${k2}`;
  }
  throw new Error('Fant ikke syntetisk nummer');
};

const åpneMeny = (page: Page) =>
  page.getByRole('button', { name: 'Lagrede søk' }).click();

const åpneLagreDialog = async (page: Page) => {
  await page.getByRole('button', { name: 'Lagre søk' }).click();
  return page.getByRole('dialog', { name: 'Lagre søk' });
};

test.describe('Lagrede søk i rekrutteringstreff', () => {
  test('Menylenken i sidemenyen ber om standardsøket', async ({ page }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/rekrutteringstreff');
    await expect(
      page.getByRole('link', { name: 'Rekrutteringstreff', exact: true }),
    ).toHaveAttribute('href', '/rekrutteringstreff?brukStandardsok=true');
  });

  test('Uten lagrede søk er menyen tom og lagring krever filter eller søkeord', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/rekrutteringstreff');

    await expect(page.getByRole('button', { name: 'Lagre søk' })).toBeDisabled();
    await åpneMeny(page);
    await expect(
      page.getByRole('menuitem', { name: 'Du har ingen lagrede søk' }),
    ).toBeVisible();
  });

  test('Lagrer filtre og søkeord, og bruker søket igjen uten fritekst i URL-en', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/rekrutteringstreff');

    await page.getByRole('radio', { name: 'Eldste' }).click();
    const søkefelt = page.getByRole('searchbox', { name: 'Søk i treff' });
    await søkefelt.fill('kokk');
    await søkefelt.press('Enter');

    const dialog = await åpneLagreDialog(page);
    await dialog
      .getByRole('textbox', { name: 'Navn på søket' })
      .fill('Eldste kokketreff');
    await dialog.getByRole('button', { name: 'Lagre', exact: true }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByText('Søket er lagret.')).toBeVisible();

    await gotoApp(page, '/rekrutteringstreff');
    await expect(
      page.getByRole('radio', { name: 'Sist oppdaterte' }),
    ).toBeChecked();

    await åpneMeny(page);
    await page.getByRole('menuitem', { name: /Eldste kokketreff/ }).click();

    await expect(page.getByRole('radio', { name: 'Eldste' })).toBeChecked();
    await expect(page).toHaveURL(/sortering=eldste/);
    await expect(page.getByText('kokk', { exact: true }).first()).toBeVisible();
    expect(page.url()).not.toContain('kokk');
  });

  test('Fjerner fødselsnummer fra navnet før lagring', async ({ page }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/rekrutteringstreff?sortering=nyeste');
    const nummer = syntetiskFødselsnummer();

    const dialog = await åpneLagreDialog(page);
    await dialog
      .getByRole('textbox', { name: 'Navn på søket' })
      .fill(`Treff ${nummer}`);
    await dialog.getByRole('button', { name: 'Lagre', exact: true }).click();

    await expect(
      page.getByText(
        'Søket er lagret. Fødselsnummer ble fjernet fra navnet eller søkeordene.',
      ),
    ).toBeVisible();
    await åpneMeny(page);
    const menypunkt = page.getByRole('menuitem', { name: /Treff/ });
    await expect(menypunkt).toBeVisible();
    await expect(menypunkt).not.toContainText(nummer);
  });

  test('Lagre som nytt er deaktivert når det finnes ti søk', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    for (let i = 1; i <= 10; i++) {
      await opprettSøk(page, `Søk ${i}`, 'sortering=nyeste');
    }
    await gotoApp(page, '/rekrutteringstreff?sortering=eldste');

    const dialog = await åpneLagreDialog(page);
    await expect(
      dialog.getByRole('radio', { name: /Lagre som nytt søk/ }),
    ).toBeDisabled();
    await expect(
      dialog.getByRole('radio', { name: 'Erstatt et lagret søk' }),
    ).toBeChecked();
  });

  test('Erstatter søket som er i bruk', async ({ page }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Gammelt søk', 'sortering=nyeste');
    await gotoApp(page, '/rekrutteringstreff');

    await åpneMeny(page);
    await page.getByRole('menuitem', { name: /Gammelt søk/ }).click();
    await page.getByRole('radio', { name: 'Eldste' }).click();

    const dialog = await åpneLagreDialog(page);
    await expect(
      dialog.getByRole('radio', { name: 'Erstatt et lagret søk' }),
    ).toBeChecked();
    await dialog
      .getByRole('textbox', { name: 'Navn på søket' })
      .fill('Oppdatert søk');
    await dialog.getByRole('button', { name: 'Lagre', exact: true }).click();
    await expect(dialog).toBeHidden();

    await åpneMeny(page);
    await expect(
      page.getByRole('menuitem', { name: /Oppdatert søk/ }),
    ).toBeVisible();
    await expect(page.getByRole('menuitem', { name: /Gammelt søk/ })).toHaveCount(
      0,
    );
  });

  test('Administrer søk: gjør til standard og slett med bekreftelse', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Første', 'sortering=nyeste');
    await opprettSøk(page, 'Andre', 'sortering=eldste');
    await gotoApp(page, '/rekrutteringstreff');

    await åpneMeny(page);
    await page.getByRole('menuitem', { name: 'Administrer søk' }).click();
    const dialog = page.getByRole('dialog', {
      name: 'Administrer søk (2 av 10)',
    });
    await expect(dialog).toBeVisible();

    await dialog
      .getByRole('button', { name: 'Gjør til standard: Andre' })
      .click();
    await expect(
      dialog.getByRole('button', { name: 'Gjør til standard: Første' }),
    ).toBeVisible();

    await dialog.getByRole('button', { name: 'Slett: Første' }).click();
    const bekreft = page.getByRole('dialog', { name: 'Slett lagret søk' });
    await expect(bekreft.getByText('Vil du slette «Første»?')).toBeVisible();
    await bekreft.getByRole('button', { name: 'Slett', exact: true }).click();

    await expect(
      page.getByRole('dialog', { name: 'Administrer søk (1 av 10)' }),
    ).toBeVisible();
  });

  test('Menylenken bruker standardsøket med filtre og søkeord', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Mitt standardsøk', 'sortering=eldste', ['lager']);

    await gotoApp(page, '/rekrutteringstreff?brukStandardsok=true');

    await expect(page.getByRole('radio', { name: 'Eldste' })).toBeChecked();
    await expect(page.getByText('lager', { exact: true }).first()).toBeVisible();
    await expect(page).not.toHaveURL(/brukStandardsok/);
  });

  test('Menylenken gir vanlig søk når veilederen ikke har standardsøk', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);

    await gotoApp(page, '/rekrutteringstreff?brukStandardsok=true');

    await expect(
      page.getByRole('radio', { name: 'Sist oppdaterte' }),
    ).toBeChecked();
    await expect(page).not.toHaveURL(/brukStandardsok/);
  });

  test('Viser merknad for søk som snart slettes, og den forsvinner når søket brukes', async ({
    page,
  }) => {
    await brukEgenMockbruker(page, 'MED-EKSEMPELDATA');
    await gotoApp(page, '/rekrutteringstreff');

    await åpneMeny(page);
    const snartSlettet = page.getByRole('menuitem', {
      name: /Fullførte i fjor/,
    });
    await expect(snartSlettet).toContainText('Slettes');
    await snartSlettet.click();
    await expect(page).toHaveURL(/sortering=eldste/);

    await åpneMeny(page);
    await expect(
      page.getByRole('menuitem', { name: /Fullførte i fjor/ }),
    ).not.toContainText('Slettes');
  });
});
