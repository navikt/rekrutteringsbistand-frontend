import { gotoApp } from '@/tests/gotoApp';
import { slåPåMørkModus } from '@/tests/mørkModus';
import { tilgjengelighetstest } from '@navikt/toi-next-frontend/a11y';
import { expect, test, type Page } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const stillingUrl = '**/api/stilling/rekrutteringsbistandstilling/jobbmesse';
const oppdaterStillingUrl = '**/api/stilling/oppdater-stilling';

const settOppRedigeringstest = async (
  page: Page,
  kategori: 'JOBBMESSE' | 'STILLING',
  publisert = false,
) => {
  await page.route(stillingUrl, async (route) => {
    const response = await route.fetch();
    const data = await response.json();

    data.stillingsinfo.stillingskategori = kategori;
    data.stilling = {
      ...data.stilling,
      status: publisert ? 'ACTIVE' : 'INACTIVE',
      administration: {
        ...data.stilling.administration,
        status: publisert ? 'DONE' : 'PENDING',
      },
      contactList: [
        {
          ...data.stilling.contactList?.[0],
          name: 'Testperson',
          email: 'testperson@nav.no',
          phone: '',
        },
      ],
      privacy: 'INTERNAL_NOT_SHOWN',
      published: publisert ? '2026-01-01T10:00:00.000Z' : null,
      expires: '2050-01-01T00:00:00.000Z',
      publishedByAdmin: publisert ? 'TestIdent' : null,
      firstPublished: publisert,
    };

    await route.fulfill({ response, json: data });
  });

  await page.route(oppdaterStillingUrl, async (route) => {
    await route.fulfill({ json: route.request().postDataJSON() });
  });
};

test.describe('Jobbmesse', () => {
  test('Utkast til jobbmesse kan ikke publiseres fra redigering', async ({
    page,
  }) => {
    await settOppRedigeringstest(page, 'JOBBMESSE');
    await gotoApp(page, '/stilling/jobbmesse/rediger');

    await expect(
      page.getByRole('heading', { name: 'Om jobben' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Forhåndsvis', exact: true }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Avbryt' })).toBeVisible();
    await expect(page.getByText(/12\/12/)).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Publiser', exact: true }),
    ).toHaveCount(0);
    await expect(
      page.getByRole('dialog', { name: 'Publiser stillingsoppdraget' }),
    ).toHaveCount(0);
  });

  test('Publisert jobbmesse kan ikke publiseres på nytt fra redigering', async ({
    page,
  }) => {
    await settOppRedigeringstest(page, 'JOBBMESSE', true);
    await gotoApp(page, '/stilling/jobbmesse/rediger');

    await expect(
      page.getByRole('button', { name: 'Forhåndsvis', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Publiser', exact: true }),
    ).toHaveCount(0);
    await expect(
      page.getByRole('dialog', { name: 'Publiser stillingsoppdraget' }),
    ).toHaveCount(0);
  });

  test('Komplett STILLING-utkast kan fortsatt publiseres', async ({ page }) => {
    await settOppRedigeringstest(page, 'STILLING');
    await gotoApp(page, '/stilling/jobbmesse/rediger');

    await expect(page.getByText(/13\/13/)).toBeVisible();
    const publiserKnapp = page.getByRole('button', {
      name: 'Publiser',
      exact: true,
    });
    await expect(publiserKnapp).toBeEnabled();
    await publiserKnapp.click();
    const dialog = page.getByRole('dialog', {
      name: 'Publiser stillingsoppdraget',
    });
    await expect(dialog).toBeVisible();

    const publiseringsforespørsel = page.waitForRequest((request) => {
      if (
        request.method() !== 'PUT' ||
        !request.url().includes('/api/stilling/oppdater-stilling')
      ) {
        return false;
      }

      const body = request.postDataJSON();
      return (
        body.stilling?.status === 'ACTIVE' &&
        body.stilling?.administration?.status === 'DONE' &&
        body.stilling?.firstPublished === true
      );
    });
    await dialog
      .getByRole('button', { name: 'Publiser oppdraget', exact: true })
      .click();

    const request = await publiseringsforespørsel;
    const body = request.postDataJSON();
    expect(body.stilling.status).toBe('ACTIVE');
    expect(body.stilling.administration.status).toBe('DONE');
    expect(body.stilling.firstPublished).toBe(true);
  });

  test.describe('Vis jobbmesse', () => {
    test.beforeEach(async ({ page }) => {
      await gotoApp(page, '/stilling/jobbmesse');
    });

    test('Viser Jobbmesse-tag', async ({ page }) => {
      await expect(page.getByText('Jobbmesse', { exact: true })).toBeVisible();
    });

    test('Viser jobbmesse-tittel', async ({ page }) => {
      await expect(
        page.getByRole('heading', { name: 'NAV Jobbmesse Lillestrøm' }),
      ).toBeVisible();
    });

    test('Viser Om stillingen-tab', async ({ page }) => {
      await expect(
        page.getByRole('tab', { name: 'Om stillingen' }),
      ).toBeVisible();
    });

    test('Viser Jobbsøkere-tab', async ({ page }) => {
      await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toBeVisible();
    });

    test('Skjuler CV-deling for jobbmesse', async ({ page }) => {
      await page.getByRole('tab', { name: /Jobbsøkere/ }).click();

      // "Spør om å dele CV" og "Del CV med arbeidsgiver" skal IKKE vises for jobbmesse
      await expect(page.getByText('Spør om å dele CV')).toBeHidden();
      await expect(page.getByText('Del CV med arbeidsgiver')).toBeHidden();
    });

    test('Kan ikke dupliseres', async ({ page }) => {
      const hoveddel = page.locator('main');
      const rediger = hoveddel.getByRole('button', { name: 'Rediger' }).first();
      const flereHandlinger = hoveddel.getByRole('button', {
        name: 'Flere handlinger',
      });
      await expect(rediger.or(flereHandlinger).first()).toBeVisible();
      if (await flereHandlinger.isVisible()) {
        await flereHandlinger.click();
      }

      await expect(page.getByRole('button', { name: 'Dupliser' })).toHaveCount(
        0,
      );
    });

    tilgjengelighetstest(test, { utvidet: true, mørkModus: slåPåMørkModus });
  });
});
