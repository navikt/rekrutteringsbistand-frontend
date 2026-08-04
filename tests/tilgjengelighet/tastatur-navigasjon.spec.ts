import { gotoApp } from '@/tests/gotoApp';
import { Page, expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

async function gåTilJobbsøkereFane(page: Page) {
  await gotoApp(page, '/rekrutteringstreff/publisert');
  await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
  await expect(page.getByText('Etternavn01, Marius').first()).toBeVisible();
}

test.describe('Tastaturnavigasjon - hopp til hovedinnhold', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/');
  });

  test('Første Tab gir fokus til "Hopp til hovedinnhold"-lenken', async ({
    page,
  }) => {
    await page.evaluate(() => document.body.focus());
    await page.keyboard.press('Tab');

    const fokusert = await page.evaluate(() => ({
      tekst: document.activeElement?.textContent?.trim(),
      href: document.activeElement?.getAttribute('href'),
    }));

    expect(fokusert.tekst).toBe('Hopp til hovedinnhold');
    expect(fokusert.href).toBe('#maincontent');
  });

  test('Enter på skip-lenken flytter fokus til hovedinnholdet', async ({
    page,
  }) => {
    const skipLenke = page.getByRole('link', { name: 'Hopp til hovedinnhold' });

    await expect
      .poll(() =>
        skipLenke.evaluate((el) => {
          el.focus();
          (el as HTMLElement).click();
          return document.activeElement?.id;
        }),
      )
      .toBe('maincontent');

    const fokusert = await page.evaluate(() => ({
      id: document.activeElement?.id,
      tag: document.activeElement?.tagName,
    }));
    expect(fokusert).toEqual({ id: 'maincontent', tag: 'MAIN' });
  });
});

test.describe('Tastaturnavigasjon - sidemeny', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/');
  });

  test('Hvert menyvalg er ett tab-stopp (ingen dobbel fokus)', async ({
    page,
  }) => {
    const oversikt = page.getByRole('button', { name: 'Oversikt' });
    await expect(oversikt).toBeVisible();

    // Menyvalget skal være én lenke med knapperolle - ikke to nestede elementer
    const antallFokuserbare = await oversikt.evaluate((el) => {
      const indre = el.querySelectorAll(
        'a[href], button, input, [tabindex]:not([tabindex="-1"])',
      );
      return indre.length;
    });

    expect(antallFokuserbare).toBe(0);
    await expect(oversikt).toHaveAttribute('href', '/');
  });

  test('Menyvalg kan fokuseres og aktiveres med Enter', async ({ page }) => {
    const stillinger = page.getByRole('button', { name: 'Stillingsoppdrag' });
    await stillinger.focus();
    await expect(stillinger).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/stilling/);
  });
});

test.describe('Tastaturnavigasjon - faner', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
    await expect(page.getByRole('tab', { name: 'Om treffet' })).toBeVisible();
  });

  test('Piltast høyre flytter fokus til neste fane', async ({ page }) => {
    const omTreffet = page.getByRole('tab', { name: 'Om treffet' });
    await omTreffet.focus();
    await expect(omTreffet).toBeFocused();

    await page.keyboard.press('ArrowRight');

    await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toBeFocused();
  });

  test('Piltast venstre flytter fokus til forrige fane', async ({ page }) => {
    const jobbsøkere = page.getByRole('tab', { name: /Jobbsøkere/ });
    await jobbsøkere.focus();
    await expect(jobbsøkere).toBeFocused();

    await page.keyboard.press('ArrowLeft');

    await expect(page.getByRole('tab', { name: 'Om treffet' })).toBeFocused();
  });

  test('Enter aktiverer fanen som har fokus', async ({ page }) => {
    const omTreffet = page.getByRole('tab', { name: 'Om treffet' });
    await omTreffet.focus();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');

    await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  test('Fanepanelet er ikke et eget tab-stopp (ingen fokus på hele området)', async ({
    page,
  }) => {
    const synligPanel = page.locator('[role="tabpanel"]:not([hidden])').first();
    await expect(synligPanel).toHaveAttribute('tabindex', '-1');
  });
});

test.describe('Tastaturnavigasjon - jobbsøkerliste', () => {
  test.beforeEach(async ({ page }) => {
    await gåTilJobbsøkereFane(page);
  });

  test('Jobbsøkernavnet er en ekte lenke', async ({ page }) => {
    const rad = page
      .locator('li')
      .filter({ hasText: 'Etternavn01, Marius' })
      .first();

    const navnLenke = rad.getByRole('link', { name: 'Etternavn01, Marius' });
    await expect(navnLenke).toBeVisible();
    await expect(navnLenke).toHaveAttribute('href', /.+/);
  });

  test('Hver rad har separate tab-stopp for avkrysning, navn og saksmeny', async ({
    page,
  }) => {
    const rad = page
      .locator('li')
      .filter({ hasText: 'Etternavn01, Marius' })
      .first();

    const fokuserbare = await rad.evaluate((li) =>
      Array.from(
        li.querySelectorAll(
          'a[href], button, input, [tabindex]:not([tabindex="-1"])',
        ),
      ).map((el) => ({
        tag: el.tagName,
        type: el.getAttribute('type'),
        navn:
          el.getAttribute('aria-label') || el.textContent?.trim()?.slice(0, 30),
      })),
    );

    expect(fokuserbare).toHaveLength(3);
    expect(fokuserbare[0].type).toBe('checkbox');
    expect(fokuserbare[1].tag).toBe('A');
    expect(fokuserbare[2].navn).toContain('Saksmeny');
  });

  test('Avkrysningsboksen kan hukes av med mellomrom uten å åpne jobbsøkeren', async ({
    page,
  }) => {
    const rad = page
      .locator('li')
      .filter({ hasText: 'Etternavn01, Marius' })
      .first();

    const checkbox = rad.getByRole('checkbox');
    await checkbox.focus();
    await page.keyboard.press('Space');

    await expect(checkbox).toBeChecked();
    await expect(page).toHaveURL(/\/rekrutteringstreff\/publisert/);
  });
});
