import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Avlys rekrutteringstreff', () => {
  test('Åpner avlys-modal', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
    await page.getByRole('button', { name: 'Avlys' }).click();
    const modal = page.getByRole('dialog', { name: 'Avlys treffet' });
    await expect(
      modal.getByRole('heading', { name: 'Avlys treffet' }),
    ).toBeVisible();
    await expect(
      modal.getByText('Deltakere får ikke lenger tilgang til innholdet'),
    ).toBeVisible();
  });

  test('Avlys-modal har bekreft og avbryt-knapper', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
    await page.getByRole('button', { name: 'Avlys' }).click();
    await expect(
      page.getByRole('button', { name: 'Avlys treffet' }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Avbryt' })).toBeVisible();
  });

  test('Kan lukke avlys-modal med Avbryt', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
    await page.getByRole('button', { name: 'Avlys' }).click();
    await expect(
      page.getByRole('heading', { name: 'Avlys treffet' }),
    ).toBeVisible();
    await page
      .getByRole('dialog', { name: 'Avlys treffet' })
      .getByRole('button', { name: 'Avbryt' })
      .click();
    await expect(
      page.getByRole('heading', { name: 'Avlys treffet' }),
    ).not.toBeVisible();
  });

  test('beholder avlys-dialogen når handlingsknappene flyttes til menyen', async ({
    page,
  }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
    await page.getByRole('button', { name: 'Avlys', exact: true }).click();
    const dialog = page.getByRole('dialog', { name: 'Avlys treffet' });
    await expect(dialog).toBeVisible();

    await page.setViewportSize({ width: 680, height: 1080 });
    const flereHandlinger = page.getByRole('button', {
      name: 'Flere handlinger',
      includeHidden: true,
    });
    await expect(flereHandlinger).toBeVisible();
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'Avbryt' }).click();
    await expect(dialog).toBeHidden();

    await flereHandlinger.click();
    await page.getByRole('button', { name: 'Avlys', exact: true }).click();
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });
});

test.describe('Gjenåpne rekrutteringstreff', () => {
  test('Åpner gjenåpne-modal', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/avlyst');
    await page.getByRole('button', { name: 'Gjenåpne' }).click();
    const modal = page.getByRole('dialog', {
      name: 'Gjenåpne rekrutteringstreffet?',
    });
    await expect(
      modal.getByRole('heading', { name: 'Gjenåpne rekrutteringstreffet?' }),
    ).toBeVisible();
    await expect(modal.getByText('Treffet blir aktivt igjen')).toBeVisible();
  });

  test('Gjenåpne-modal har bekreft og avbryt-knapper', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/avlyst');
    await page.getByRole('button', { name: 'Gjenåpne' }).click();
    const modal = page.getByRole('dialog', {
      name: 'Gjenåpne rekrutteringstreffet?',
    });
    await expect(modal.getByRole('button', { name: 'Gjenåpne' })).toBeVisible();
    await expect(modal.getByRole('button', { name: 'Avbryt' })).toBeVisible();
  });

  test('Kan lukke gjenåpne-modal med Avbryt', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/avlyst');
    await page.getByRole('button', { name: 'Gjenåpne' }).click();
    await expect(
      page.getByRole('heading', { name: 'Gjenåpne rekrutteringstreffet?' }),
    ).toBeVisible();
    await page
      .getByRole('dialog', { name: 'Gjenåpne rekrutteringstreffet?' })
      .getByRole('button', { name: 'Avbryt' })
      .click();
    await expect(
      page.getByRole('heading', { name: 'Gjenåpne rekrutteringstreffet?' }),
    ).not.toBeVisible();
  });
});

test.describe('Fullfør rekrutteringstreff', () => {
  test('Fullfør-knapp er synlig for publisert treff', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
    await expect(page.getByRole('button', { name: 'Fullfør' })).toBeVisible();
  });

  test('Fullfør-knapp er aktivert når tilTid har passert', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert-tidspunkt-passert');
    const fullførKnapp = page.getByRole('button', { name: 'Fullfør' });
    const flereHandlinger = page.getByRole('button', {
      name: 'Flere handlinger',
    });
    await expect(fullførKnapp.or(flereHandlinger).first()).toBeVisible();
    if (!(await fullførKnapp.isVisible())) {
      await flereHandlinger.click();
    }
    await expect(fullførKnapp).toBeVisible();
    await expect(fullførKnapp).toBeEnabled();
  });
});

test.describe('Slett rekrutteringstreff fra redigering', () => {
  test('Åpner slette-modal fra redigering', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/utkast/rediger');
    await page.getByRole('button', { name: 'Slett' }).click();
    await expect(
      page.getByRole('heading', { name: 'Slett treffet' }),
    ).toBeVisible();
  });

  test('Slette-modal inneholder informasjon om konsekvenser', async ({
    page,
  }) => {
    await gotoApp(page, '/rekrutteringstreff/utkast/rediger');
    await page.getByRole('button', { name: 'Slett' }).click();
    const modal = page.getByRole('dialog', { name: 'Slett treffet' });
    await expect(
      modal.getByText('forsvinner treffet fra treff-oversikten'),
    ).toBeVisible();
    await expect(
      modal.getByText('kan du ikke lenger gjennopprette treffet'),
    ).toBeVisible();
  });
});
