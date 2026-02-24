import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

// Bruker arbeidsgiverrettet tilgang (erEier via TestIdent)
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('StillingsBanner – visningsstatuser', () => {
  // ────────────────────────────────────────────────────────
  // VisningsStatus.ApenForSokere → PauseSøkeforslag-knapp
  // ────────────────────────────────────────────────────────
  test.describe('Åpen for søkere (publisert intern)', () => {
    test('Viser Pause-knapp i banner', async ({ page }) => {
      await gotoApp(page, '/stilling/publisertStilling');

      const main = page.locator('main');
      await expect(
        main.getByRole('button', { name: 'Pause', exact: true }).first(),
      ).toBeVisible();
    });

    test('Viser ikke Slå på søkerforslag-banner', async ({ page }) => {
      await gotoApp(page, '/stilling/publisertStilling');

      const main = page.locator('main');
      await expect(
        main.getByRole('heading', { name: 'Du mottar ikke søkerforslag' }),
      ).toBeHidden();
    });
  });

  test.describe('Åpen for søkere (publisert på arbeidsplassen)', () => {
    test('Viser Pause-knapp i banner', async ({ page }) => {
      await gotoApp(page, '/stilling/publisertEksternStilling');

      const main = page.locator('main');
      await expect(
        main.getByRole('button', { name: 'Pause', exact: true }).first(),
      ).toBeVisible();
    });
  });

  // ────────────────────────────────────────────────────────
  // VisningsStatus.StengtForSokere → ÅpneSøkeforslagBanner
  // ────────────────────────────────────────────────────────
  test.describe('Stengt for søkere', () => {
    test('Viser "Du mottar ikke søkerforslag"-banner med Slå på søkerforslag-knapp', async ({
      page,
    }) => {
      await gotoApp(page, '/stilling/stengtStilling');

      const main = page.locator('main');
      await expect(
        main.getByRole('heading', { name: 'Du mottar ikke søkerforslag' }),
      ).toBeVisible();
      await expect(
        main.getByRole('button', { name: 'Slå på søkerforslag' }).first(),
      ).toBeVisible();
    });

    test('Slå på søkerforslag åpner bekreftelsesdialog', async ({ page }) => {
      await gotoApp(page, '/stilling/stengtStilling');

      const main = page.locator('main');
      await main
        .getByRole('button', { name: 'Slå på søkerforslag' })
        .first()
        .click();

      await expect(
        page.getByRole('heading', { name: 'Åpne søkerforslag' }),
      ).toBeVisible();
      await expect(
        page.getByRole('button', { name: 'Åpne søkerforslag' }),
      ).toBeVisible();
      await expect(page.getByRole('button', { name: 'Avbryt' })).toBeVisible();
    });
  });

  test.describe('Stengt for søkere (banner-mock)', () => {
    test('Viser ÅpneSøkeforslag-banner', async ({ page }) => {
      await gotoApp(page, '/stilling/bannerApneSokeforslag');

      const main = page.locator('main');
      await expect(
        main.getByRole('heading', { name: 'Du mottar ikke søkerforslag' }),
      ).toBeVisible();
      await expect(
        main.getByRole('button', { name: 'Slå på søkerforslag' }).first(),
      ).toBeVisible();
    });
  });

  // ────────────────────────────────────────────────────────
  // VisningsStatus.UtloptStengtForSokere → ForlengOppdragBanner
  // ────────────────────────────────────────────────────────
  test.describe('Utløpt – stengt for søkere', () => {
    test('Viser "Siste visningsdato er passert"-banner', async ({ page }) => {
      await gotoApp(page, '/stilling/utloptStilling');

      await expect(
        page.getByText('Siste visningsdato er passert'),
      ).toBeVisible();
    });
  });

  test.describe('Utløpt – forleng oppdrag (banner-mock)', () => {
    test('Viser ForlengOppdrag-banner', async ({ page }) => {
      await gotoApp(page, '/stilling/bannerForlengOppdrag');

      await expect(
        page.getByText('Siste visningsdato er passert'),
      ).toBeVisible();
    });
  });

  test.describe('Utløpt ekstern stilling (arbeidsplassen.no)', () => {
    test('Viser ikke Forleng-banner for utløpt stilling fra arbeidsplassen.no', async ({
      page,
    }) => {
      await gotoApp(page, '/stilling/utloptEksternStilling');

      await expect(
        page.getByText('Siste visningsdato er passert'),
      ).toBeHidden();
    });
  });

  // ────────────────────────────────────────────────────────
  // VisningsStatus.Fullfort → GjenåpneBanner
  // ────────────────────────────────────────────────────────
  test.describe('Fullført stilling', () => {
    test('Viser "Oppdrag fullført"-banner', async ({ page }) => {
      await gotoApp(page, '/stilling/fullfortStilling');

      await expect(page.getByText('Oppdrag fullført')).toBeVisible({
        timeout: 15000,
      });
    });
  });

  // ────────────────────────────────────────────────────────
  // VisningsStatus.IkkePublisert → ingen banner
  // ────────────────────────────────────────────────────────
  test.describe('Ikke publisert (utkast)', () => {
    test('Viser ingen banner', async ({ page }) => {
      await gotoApp(page, '/stilling/utkastStilling');

      await expect(page.getByText('Oppdrag fullført')).toBeHidden();
      await expect(page.getByText('Du mottar ikke søkerforslag')).toBeHidden();
      await expect(
        page.getByText('Siste visningsdato er passert'),
      ).toBeHidden();
      await expect(page.getByText('Etterregistrering pågår')).toBeHidden();
    });
  });

  test.describe('Ikke publisert (tom stilling)', () => {
    test('Viser ingen banner', async ({ page }) => {
      await gotoApp(page, '/stilling/ikkePublisertStilling');

      await expect(page.getByText('Oppdrag fullført')).toBeHidden();
      await expect(page.getByText('Du mottar ikke søkerforslag')).toBeHidden();
      await expect(
        page.getByText('Siste visningsdato er passert'),
      ).toBeHidden();
    });
  });

  // ────────────────────────────────────────────────────────
  // VisningsStatus.Slettet → ingen banner
  // ────────────────────────────────────────────────────────
  test.describe('Slettet stilling', () => {
    test('Viser ingen banner', async ({ page }) => {
      await gotoApp(page, '/stilling/slettetStilling');

      await expect(page.getByText('Oppdrag fullført')).toBeHidden();
      await expect(page.getByText('Du mottar ikke søkerforslag')).toBeHidden();
      await expect(
        page.getByText('Siste visningsdato er passert'),
      ).toBeHidden();
    });
  });
});

// ────────────────────────────────────────────────────────
// Formidling/etterregistrering – egen logikk i StillingsBanner
// ────────────────────────────────────────────────────────
test.describe('StillingsBanner – formidling (etterregistrering)', () => {
  test('Åpen formidling viser "Etterregistrering pågår"-banner med Fullfør-knapp', async ({
    page,
  }) => {
    await gotoApp(page, '/stilling/etterregistreringApen');

    await expect(page.getByText('Etterregistrering pågår')).toBeVisible({
      timeout: 15000,
    });
    await expect(page.getByRole('button', { name: 'Fullfør' })).toBeVisible();
  });

  test('Stoppet formidling viser GjenåpneBanner', async ({ page }) => {
    await gotoApp(page, '/stilling/etterregistrering');

    await expect(page.getByText('Registreringen er fullført')).toBeVisible({
      timeout: 15000,
    });
  });
});

// ────────────────────────────────────────────────────────
// Arbeidsplassen-stilling – publiseringsinfo
// ────────────────────────────────────────────────────────
test.describe('StillingsBanner – arbeidsplassen', () => {
  test('Ekstern stilling (arbeidsplassen) viser Pause-knapp', async ({
    page,
  }) => {
    await gotoApp(page, '/stilling/publisertEksternStilling');

    const main = page.locator('main');
    await expect(
      main.getByRole('button', { name: 'Pause', exact: true }).first(),
    ).toBeVisible();
  });

  test('Intern stilling viser Pause-knapp', async ({ page }) => {
    await gotoApp(page, '/stilling/publisertStilling');

    const main = page.locator('main');
    await expect(
      main.getByRole('button', { name: 'Pause', exact: true }).first(),
    ).toBeVisible();
  });
});
