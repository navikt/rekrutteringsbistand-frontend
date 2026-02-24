import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('KI-validering og sjekkliste for rekrutteringstreff', () => {
  test('Sjekkliste viser Navn som oppfylt når tittel er uendret', async ({
    page,
  }) => {
    await gotoApp(page, '/rekrutteringstreff/utkast');

    await expect(
      page.getByRole('heading', { name: 'Sjekkliste' }),
    ).toBeVisible();

    const navnRad = page.getByText('Navn', { exact: true });
    await expect(navnRad).toHaveClass(/line-through/);
  });

  test('Sjekkliste viser Introduksjon som oppfylt når innlegg er uendret', async ({
    page,
  }) => {
    await gotoApp(page, '/rekrutteringstreff/utkast');

    await expect(
      page.getByRole('heading', { name: 'Sjekkliste' }),
    ).toBeVisible();

    const introduksjonRad = page
      .getByLabel('Sidepanel')
      .getByText('Introduksjon', { exact: true });
    await expect(introduksjonRad).toHaveClass(/line-through/);
  });

  test('Sjekkliste viser Navn som ikke oppfylt etter redigering uten KI-sjekk', async ({
    page,
  }) => {
    await gotoApp(page, '/rekrutteringstreff/utkast');

    await expect(
      page.getByRole('heading', { name: 'Sjekkliste' }),
    ).toBeVisible();

    const tittelInput = page.getByLabel('Navn på treffet');
    await tittelInput.clear();
    await tittelInput.fill('Endret tittel');

    const navnRad = page.getByText('Navn', { exact: true });
    await expect(navnRad).not.toHaveClass(/line-through/);
  });

  test('Sjekkliste viser Navn som ikke oppfylt når KI finner brudd på retningslinjer', async ({
    page,
  }) => {
    await gotoApp(page, '/rekrutteringstreff/utkast');

    const tittelInput = page.getByLabel('Navn på treffet');
    await tittelInput.clear();
    await tittelInput.fill('Dårlig tittel');

    await page.locator('#tittel-ki-sjekk-knapp').click();

    await expect(
      page.getByRole('region', { name: 'Analyse av tittel' }),
    ).toBeVisible();

    const navnRad = page.getByText('Navn', { exact: true });
    await expect(navnRad).not.toHaveClass(/line-through/);
  });

  test('Sjekkliste viser Navn som oppfylt etter Lagre likevel', async ({
    page,
  }) => {
    await gotoApp(page, '/rekrutteringstreff/utkast');

    const tittelInput = page.getByLabel('Navn på treffet');
    await tittelInput.clear();
    await tittelInput.fill('Likevel godkjent tittel');

    await page.locator('#tittel-ki-sjekk-knapp').click();

    await expect(
      page.getByRole('region', { name: 'Analyse av tittel' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Lagre likevel' }).first().click();

    const navnRad = page.getByText('Navn', { exact: true });
    await expect(navnRad).toHaveClass(/line-through/);
  });

  test('Sjekkliste viser Navn som ikke oppfylt igjen etter ny redigering', async ({
    page,
  }) => {
    await gotoApp(page, '/rekrutteringstreff/utkast');

    const tittelInput = page.getByLabel('Navn på treffet');
    await tittelInput.clear();
    await tittelInput.fill('Første endring');

    await page.locator('#tittel-ki-sjekk-knapp').click();

    await expect(
      page.getByRole('region', { name: 'Analyse av tittel' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Lagre likevel' }).first().click();

    const navnRad = page.getByText('Navn', { exact: true });
    await expect(navnRad).toHaveClass(/line-through/);

    await tittelInput.clear();
    await tittelInput.fill('Andre endring');

    await expect(navnRad).not.toHaveClass(/line-through/);
  });
});
