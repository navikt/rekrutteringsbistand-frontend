import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Datovalidering i rekrutteringstreff redigering', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/utkast/rediger');
    await expect(
      page.getByRole('heading', { name: 'Sjekkliste' }),
    ).toBeVisible();
  });

  test('Viser feilmelding når fra-dato er tilbake i tid', async ({ page }) => {
    const datoInput = page.getByPlaceholder('dd.mm.åååå').first();
    await datoInput.click();
    await datoInput.pressSequentially('01.01.2020', { delay: 50 });
    await page.getByRole('heading', { name: 'Tid' }).click();
    await page.waitForTimeout(500);

    await expect(
      page.getByText('Dato kan ikke være tilbake i tid'),
    ).toBeVisible();
  });

  test('Sjekkliste markerer ikke Tidspunkt som oppfylt med dato tilbake i tid', async ({
    page,
  }) => {
    const datoInput = page.getByPlaceholder('dd.mm.åååå').first();
    await datoInput.fill('01.01.2020');
    await datoInput.blur();

    const tidspunktRad = page
      .getByLabel('Sidepanel')
      .getByText('Tidspunkt', { exact: true });
    await expect(tidspunktRad).not.toHaveClass(/line-through/);
  });

  test('Sjekkliste markerer Tidspunkt som oppfylt med fremtidig dato', async ({
    page,
  }) => {
    const datoInput = page.getByPlaceholder('dd.mm.åååå').first();
    await datoInput.click();
    await datoInput.pressSequentially('01.01.2028', { delay: 50 });
    await page.getByRole('heading', { name: 'Tid' }).click();

    await expect(
      page.getByText('Dato kan ikke være tilbake i tid'),
    ).not.toBeVisible();

    const tidspunktRad = page
      .getByLabel('Sidepanel')
      .getByText('Tidspunkt', { exact: true });
    await expect(tidspunktRad).toHaveClass(/line-through/);
  });

  test('Viser feilmelding når svarfrist-dato er tilbake i tid', async ({
    page,
  }) => {
    const datoInputs = page.getByPlaceholder('dd.mm.åååå');
    const svarfristDato = datoInputs.nth(1);
    await svarfristDato.fill('01.01.2020');
    await svarfristDato.blur();

    await expect(
      page.getByText('Dato kan ikke være tilbake i tid'),
    ).toBeVisible();
  });

  test('Sjekkliste markerer ikke Svarfrist som oppfylt med dato tilbake i tid', async ({
    page,
  }) => {
    const datoInputs = page.getByPlaceholder('dd.mm.åååå');
    const svarfristDato = datoInputs.nth(1);
    await svarfristDato.fill('01.01.2020');
    await svarfristDato.blur();

    const svarfristRad = page
      .getByLabel('Sidepanel')
      .getByText('Svarfrist', { exact: true });
    await expect(svarfristRad).not.toHaveClass(/line-through/);
  });

  test('Publiser-knapp er deaktivert når tidspunkt har passert', async ({
    page,
  }) => {
    const datoInput = page.getByPlaceholder('dd.mm.åååå').first();
    await datoInput.fill('01.01.2020');
    await datoInput.blur();

    const publiserKnapp = page.getByRole('button', {
      name: 'Publiser treffet',
    });
    await expect(publiserKnapp).toBeDisabled();
  });
});
