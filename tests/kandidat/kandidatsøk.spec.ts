import { gotoApp } from '@/tests/gotoApp';
import { slåPåMørkModus } from '@/tests/mørkModus';
import { tilgjengelighetstest } from '@navikt/toi-next-frontend/a11y';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Kandidatsøk (/kandidat) – utvidet dekning
// ────────────────────────────────────────────────────────
test.describe('Kandidatsøk', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.addInitScript(() =>
      sessionStorage.removeItem('markerte-kandidater'),
    );
    await gotoApp(page, '/kandidat');
  });

  test('Viser brødsmulesti med Jobbsøkere', async ({ page }) => {
    await expect(
      page.getByLabel('Brødsmulesti').getByText('Jobbsøkere'),
    ).toBeVisible();
  });

  test('Viser alle portefølje-knapper', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Alle kontorer' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Mine brukere' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Mitt kontor' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Mine kontorer' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Velg kontor' }),
    ).toBeVisible();
  });

  test('Kan bytte til Alle kontorer-portefølje', async ({ page }) => {
    await page.getByRole('button', { name: 'Alle kontorer' }).click();

    // Kandidatkort skal vises
    await expect(
      page.getByRole('checkbox', { name: 'Marker alle på siden' }),
    ).toBeVisible();
  });

  test('Viser kandidatsøk-filter i sidepanelet', async ({ page }) => {
    const sidepanel = page.getByLabel('Sidepanel');

    await expect(sidepanel).toBeVisible();
  });

  test('Viser kandidatkort med innhold', async ({ page }) => {
    // Sjekk at minst ett kandidatkort med heading (navn) vises
    const kandidatKort = page.getByTestId(
      'kandidatkort-lenke-kandidat-arenaKandidatnr-2',
    );
    await expect(kandidatKort).toBeVisible();
  });

  test('Kan markere alle og se Lagre-knapp', async ({ page }) => {
    await page.getByRole('checkbox', { name: 'Marker alle på siden' }).check();

    await expect(
      page.getByRole('button', { name: 'Lagre i kandidatliste' }),
    ).toBeVisible();
  });

  test('Lagre i kandidatliste åpner dialog', async ({ page }) => {
    await page.getByRole('checkbox', { name: 'Marker alle på siden' }).check();

    const lagreKnapp = page.getByRole('button', {
      name: 'Lagre i kandidatliste',
    });
    await expect(lagreKnapp).toBeEnabled();
    await lagreKnapp.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible({ timeout: 10000 });

    const avbrytKnapp = dialog.getByRole('button', { name: 'Avbryt' });
    await expect(avbrytKnapp).toBeVisible();
    await avbrytKnapp.click();
  });

  test('Kan åpne kandidat via kandidatkort', async ({ page }) => {
    await page
      .getByTestId('kandidatkort-lenke-kandidat-arenaKandidatnr-2')
      .click();

    // WindowView åpner jobbsøker-visning
    await expect(
      page.getByRole('link', { name: 'Finn jobb', exact: true }),
    ).toBeVisible();
  });

  test.describe('Sidevisning', () => {
    test.beforeEach(async ({ page }) => {
      await page.route('**/api/bruker/innstillinger', async (route) => {
        if (route.request().method() !== 'GET') return route.fallback();
        const respons = await route.fetch();
        await route.fulfill({
          response: respons,
          json: { ...(await respons.json()), windowMode: true },
        });
      });
      await gotoApp(page, '/kandidat');
    });

    const visKandidatId = (url: string) =>
      new URL(url).searchParams.get('visKandidatId');

    test('Vinduet forblir lukket når det lukkes rett etter «Neste kandidat»', async ({
      page,
    }) => {
      const lukkVindu = page.getByRole('button', { name: 'Lukk vindu' });

      await page
        .getByTestId('kandidatkort-lenke-kandidat-arenaKandidatnr-2')
        .click();
      await expect(lukkVindu).toBeVisible();
      const nesteKandidat = page.getByRole('button', {
        name: 'Neste kandidat',
      });
      await expect(nesteKandidat).toBeEnabled();

      // Klikk begge i samme tick, slik at lukkingen skjer før en eventuell oppdatering i kø er skrevet.
      const nesteHandle = await nesteKandidat.elementHandle();
      const lukkHandle = await lukkVindu.elementHandle();
      await page.evaluate(
        ([neste, lukk]) => {
          (neste as HTMLButtonElement).click();
          (lukk as HTMLButtonElement).click();
        },
        [nesteHandle, lukkHandle],
      );

      await expect(lukkVindu).toBeHidden();
      await page.waitForTimeout(500);
      await expect(lukkVindu).toBeHidden();
      expect(visKandidatId(page.url())).toBeNull();
    });

    test('«Neste kandidat» går fra riktig kandidat etter lukking og ny åpning', async ({
      page,
    }) => {
      const lukkVindu = page.getByRole('button', { name: 'Lukk vindu' });
      const nesteKandidat = page.getByRole('button', {
        name: 'Neste kandidat',
      });
      const kandidatkort = page.getByTestId(
        'kandidatkort-lenke-kandidat-arenaKandidatnr-2',
      );

      await kandidatkort.click();
      await expect(page).toHaveURL(/visKandidatId=/);
      const kandidatA = visKandidatId(page.url());
      await expect(nesteKandidat).toBeEnabled();

      await nesteKandidat.click();
      await expect.poll(() => visKandidatId(page.url())).not.toBe(kandidatA);
      const kandidatB = visKandidatId(page.url());

      await lukkVindu.click();
      await expect(lukkVindu).toBeHidden();

      await kandidatkort.click();
      await expect.poll(() => visKandidatId(page.url())).toBe(kandidatA);
      await expect(nesteKandidat).toBeEnabled();

      await nesteKandidat.click();
      await expect.poll(() => visKandidatId(page.url())).toBe(kandidatB);
    });
  });

  tilgjengelighetstest(test, { utvidet: true, mørkModus: slåPåMørkModus });
});
