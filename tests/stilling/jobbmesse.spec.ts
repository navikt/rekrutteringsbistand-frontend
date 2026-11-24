import { gotoApp } from '@/tests/gotoApp';
import { slåPåMørkModus } from '@/tests/mørkModus';
import { tilgjengelighetstest } from '@navikt/toi-next-frontend/a11y';
import { expect, test, type Page } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const stillingUrl = '**/api/stilling/rekrutteringsbistandstilling/jobbmesse';
const oppdaterStillingUrl = '**/api/stilling/oppdater-stilling';
const kandidatStatusUrl = '**/api/kandidat/veileder/kandidatlister/*/status';

const settOppStillingstest = async (
  page: Page,
  seed:
    'utloptStilling' | 'fullfortIkkeBesattIkkeLast' | 'bannerApneSokeforslag',
  kategori: 'JOBBMESSE' | 'STILLING',
) => {
  await page.route(
    `**/api/stilling/rekrutteringsbistandstilling/${seed}`,
    async (route) => {
      const response = await route.fetch();
      const data = await response.json();
      data.stillingsinfo.stillingskategori = kategori;
      await route.fulfill({ response, json: data });
    },
  );

  await page.route(oppdaterStillingUrl, async (route) => {
    await route.fulfill({ json: route.request().postDataJSON() });
  });
  await page.route(kandidatStatusUrl, async (route) => {
    await route.fulfill({ status: 200, json: { status: 'ok' } });
  });
};

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
  test.afterEach(async ({ page }) => {
    await page.unrouteAll({ behavior: 'wait' });
  });

  for (const kategori of ['JOBBMESSE', 'STILLING'] as const) {
    test(`${kategori}: Forleng er bare tilgjengelig for utløpt STILLING`, async ({
      page,
    }) => {
      await settOppStillingstest(page, 'utloptStilling', kategori);
      await gotoApp(page, '/stilling/utloptStilling');

      await expect(
        page.getByRole('tab', { name: /Om stillingen/i }),
      ).toBeVisible();

      await expect(
        page.getByText('Utløpt - Stengt for søkere', { exact: true }),
      ).toBeVisible();

      const hoveddel = page.locator('main');
      const forlengKnapp = hoveddel.getByRole('button', {
        name: 'Forleng',
        exact: true,
      });
      const rediger = hoveddel.getByRole('button', { name: 'Rediger' });
      const flereHandlinger = hoveddel.getByRole('button', {
        name: 'Flere handlinger',
      });

      if (kategori === 'JOBBMESSE') {
        await expect(
          page.getByText('Jobbmesse', { exact: true }),
        ).toBeVisible();
        await expect(
          page.getByRole('heading', {
            name: 'Siste visningsdato er passert',
          }),
        ).toHaveCount(0);
        await expect(rediger.or(flereHandlinger).first()).toBeVisible();
        if (await flereHandlinger.isVisible()) {
          await flereHandlinger.click();
        }
        await expect(forlengKnapp).toHaveCount(0);
        return;
      }

      await expect(
        page.getByRole('heading', { name: 'Siste visningsdato er passert' }),
      ).toBeVisible();
      const førsteForlengKnapp = forlengKnapp.first();
      if (!(await førsteForlengKnapp.isVisible())) {
        await expect(rediger.or(flereHandlinger).first()).toBeVisible();
        if (await flereHandlinger.isVisible()) {
          await flereHandlinger.click();
        }
      }
      await expect(førsteForlengKnapp).toBeVisible();
      await førsteForlengKnapp.click();
      await expect(
        page.getByRole('heading', { name: 'Forlenge oppdraget' }),
      ).toBeVisible();

      const visningsdatoInput = page.getByRole('textbox', {
        name: 'Siste visningsdato',
      });
      await visningsdatoInput.fill('01.01.2050');
      await page.getByRole('checkbox', { name: 'Etter avtale' }).check();
      await page.getByRole('checkbox', { name: 'Snarest' }).check();

      const oppdateringsforespørsel = page.waitForRequest((request) => {
        if (
          request.method() !== 'PUT' ||
          !request.url().includes('/api/stilling/oppdater-stilling')
        ) {
          return false;
        }
        const body = request.postDataJSON();
        return (
          body.stilling?.status === 'ACTIVE' &&
          body.stilling?.administration?.status === 'DONE'
        );
      });
      await page.getByRole('button', { name: 'Publiser' }).click();
      const request = await oppdateringsforespørsel;
      const body = request.postDataJSON();
      expect(body.stilling.status).toBe('ACTIVE');
      expect(body.stilling.administration.status).toBe('DONE');
    });

    test(`${kategori}: Gjenåpne er bare tilgjengelig for fullført STILLING`, async ({
      page,
    }) => {
      await settOppStillingstest(page, 'fullfortIkkeBesattIkkeLast', kategori);
      await gotoApp(page, '/stilling/fullfortIkkeBesattIkkeLast');

      await expect(
        page.getByRole('tab', { name: /Om stillingen/i }),
      ).toBeVisible();
      await expect(page.getByText('Fullført', { exact: true })).toBeVisible();
      const fullfortBanner = page.getByRole('heading', {
        name: 'Oppdrag fullført',
      });

      const gjenåpneKnapp = page
        .locator('main')
        .getByRole('button', { name: 'Gjenåpne', exact: true });
      if (kategori === 'JOBBMESSE') {
        await expect(
          page.getByText('Jobbmesse', { exact: true }),
        ).toBeVisible();
        await expect(fullfortBanner).toHaveCount(0);
        await expect(gjenåpneKnapp).toHaveCount(0);
        await expect(page.getByText(/Du kan gjenåpne fram til/)).toHaveCount(0);
        return;
      }

      await expect(fullfortBanner).toBeVisible();
      await expect(gjenåpneKnapp).toBeVisible();
      await gjenåpneKnapp.click();
      const dialog = page.getByRole('dialog', {
        name: 'Gjenåpne stillingsoppdrag',
      });
      await expect(dialog).toBeVisible();

      const oppdateringsforespørsel = page.waitForRequest((request) => {
        if (
          request.method() !== 'PUT' ||
          !request.url().includes('/api/stilling/oppdater-stilling')
        ) {
          return false;
        }
        return request.postDataJSON().stilling?.status === 'ACTIVE';
      });
      await dialog
        .getByRole('button', { name: 'Gjenåpne', exact: true })
        .click();
      const request = await oppdateringsforespørsel;
      expect(request.postDataJSON().stilling.status).toBe('ACTIVE');
    });

    test(`${kategori}: Søkerforslag kan bare åpnes for STILLING`, async ({
      page,
    }) => {
      await settOppStillingstest(page, 'bannerApneSokeforslag', kategori);
      await gotoApp(page, '/stilling/bannerApneSokeforslag');

      await expect(
        page.getByRole('tab', { name: /Om stillingen/i }),
      ).toBeVisible();
      await expect(
        page.getByText('Stengt for søkere', { exact: true }),
      ).toBeVisible();

      const heading = page.getByRole('heading', {
        name: 'Du mottar ikke søkerforslag',
      });
      const slåPåKnapp = page.getByRole('button', {
        name: 'Slå på søkerforslag',
        exact: true,
      });

      if (kategori === 'JOBBMESSE') {
        await expect(
          page.getByText('Jobbmesse', { exact: true }),
        ).toBeVisible();
        await expect(heading).toHaveCount(0);
        await expect(slåPåKnapp).toHaveCount(0);
        await expect(
          page.getByRole('button', {
            name: 'Åpne søkerforslag',
            exact: true,
          }),
        ).toHaveCount(0);
        return;
      }

      await expect(heading).toBeVisible();
      await expect(slåPåKnapp).toBeVisible();
      await slåPåKnapp.click();
      const dialog = page.getByRole('dialog', { name: 'Åpne søkerforslag' });
      await expect(dialog).toBeVisible();

      const oppdateringsforespørsel = page.waitForRequest((request) => {
        if (
          request.method() !== 'PUT' ||
          !request.url().includes('/api/stilling/oppdater-stilling')
        ) {
          return false;
        }
        const body = request.postDataJSON();
        return (
          body.stilling?.status === 'ACTIVE' &&
          body.stilling?.administration?.status === 'DONE'
        );
      });
      await dialog
        .getByRole('button', { name: 'Åpne søkerforslag', exact: true })
        .click();
      const request = await oppdateringsforespørsel;
      const body = request.postDataJSON();
      expect(body.stilling.status).toBe('ACTIVE');
      expect(body.stilling.administration.status).toBe('DONE');
    });
  }

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
