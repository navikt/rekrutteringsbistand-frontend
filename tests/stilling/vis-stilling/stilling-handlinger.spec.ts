import { gotoApp } from '@/tests/gotoApp';
import { type Page, expect, test } from '@playwright/test';

/** Returnerer main-området på siden. */
function hoveddel(page: Page) {
  return page.locator('main');
}

/** Finn knapp i main – bruker .first() for å unngå strict mode (duplikater fra DynamiskDropdown måle-container o.l.). */
function knapp(page: Page, navn: string) {
  return hoveddel(page)
    .getByRole('button', { name: navn, exact: true })
    .first();
}

/**
 * Finn handlingsknapp – enten direkte synlig eller inne i overflow-dropdown.
 * DynamiskDropdown sin overflow-knapp har aria-label="Flere handlinger".
 */
async function finnHandlingsknapp(page: Page, knappNavn: string) {
  const direkteKnapp = knapp(page, knappNavn);

  // Vent til handlingene er rendret (enten direkte eller via overflow)
  const overflowKnapp = hoveddel(page)
    .getByRole('button', { name: 'Flere handlinger' })
    .first();

  try {
    await expect(direkteKnapp.or(overflowKnapp)).toBeVisible({
      timeout: 10000,
    });
  } catch {
    return direkteKnapp;
  }

  if (await direkteKnapp.isVisible()) return direkteKnapp;

  await overflowKnapp.click();
  return page.getByRole('button', { name: knappNavn, exact: true }).first();
}

// ────────────────────────────────────────────────────────
// 1. Eier – aktiv direktemeldt stilling (alle handlinger)
// ────────────────────────────────────────────────────────
test.describe('Handlinger – eier, aktiv direktemeldt stilling', () => {
  test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

  test('Viser alle eier-handlinger', async ({ page }) => {
    await gotoApp(page, '/stilling/minStilling');

    const forventedeKnapper = [
      'Rediger',
      'Pause',
      'Fullfør',
      'Forleng',
      'Dupliser',
      'Slett',
    ];

    for (const knappNavn of forventedeKnapper) {
      const knapp = await finnHandlingsknapp(page, knappNavn);
      await expect(knapp).toBeVisible();
    }
  });

  test('Viser ikke Ta over eierskap for eier', async ({ page }) => {
    await gotoApp(page, '/stilling/minStilling');
    await expect(knapp(page, 'Ta over eierskap')).toBeHidden();
  });
});

// ────────────────────────────────────────────────────────
// 2. Ikke eier – aktiv direktemeldt stilling
// ────────────────────────────────────────────────────────
test.describe('Handlinger – ikke eier, aktiv direktemeldt stilling', () => {
  test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

  test('Viser Ta over eierskap, Dupliser – skjuler Rediger, Slett, Fullfør', async ({
    page,
  }) => {
    // internStilling har ingen eksplisitt navIdent → ikke eier
    await gotoApp(page, '/stilling/internStilling');

    await expect(
      await finnHandlingsknapp(page, 'Ta over eierskap'),
    ).toBeVisible();
    await expect(await finnHandlingsknapp(page, 'Dupliser')).toBeVisible();

    // Eier-spesifikke knapper skal være skjult
    await expect(knapp(page, 'Rediger')).toBeHidden();
    await expect(knapp(page, 'Slett')).toBeHidden();
  });
});

// ────────────────────────────────────────────────────────
// 3. Jobbsøkerrettet rolle – ingen handlinger
// ────────────────────────────────────────────────────────
test.describe('Handlinger – jobbsøkerrettet rolle', () => {
  test.use({ storageState: 'tests/.auth/jobbsokerrettet.json' });

  test('Viser ingen StillingHandlinger-knapper for jobbsøkerrettet rolle', async ({
    page,
  }) => {
    await gotoApp(page, '/stilling/publisertStilling');

    // StillingHandlinger er skjult bak TilgangskontrollForInnhold (krever arbeidsgiverrettet)
    await expect(knapp(page, 'Rediger')).toBeHidden();
    await expect(knapp(page, 'Fullfør')).toBeHidden();
    await expect(knapp(page, 'Slett')).toBeHidden();
    // Merk: Pause-knapp fra PauseSøkeforslag i banner ER synlig (eget komponent, ikke StillingHandlinger)
  });
});

// ────────────────────────────────────────────────────────
// 4. Utkast – kun Rediger og Slett
// ────────────────────────────────────────────────────────
test.describe('Handlinger – utkast', () => {
  test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

  test('Viser kun Rediger og Slett for utkast', async ({ page }) => {
    await gotoApp(page, '/stilling/utkastStilling');

    await expect(knapp(page, 'Rediger')).toBeVisible();
    // Slett vises både i handlingsraden og i utkast-innholdet
    await expect(knapp(page, 'Slett')).toBeVisible();
  });

  test('Viser ikke Pause, Fullfør, Forleng, Dupliser for utkast', async ({
    page,
  }) => {
    await gotoApp(page, '/stilling/utkastStilling');

    await expect(knapp(page, 'Pause')).toBeHidden();
    await expect(knapp(page, 'Fullfør')).toBeHidden();
    await expect(knapp(page, 'Forleng')).toBeHidden();
    await expect(knapp(page, 'Dupliser')).toBeHidden();
  });
});

// ────────────────────────────────────────────────────────
// 5. Formidling (etterregistrering) – kun Slett
// ────────────────────────────────────────────────────────
test.describe('Handlinger – formidling (etterregistrering)', () => {
  test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

  test('Åpen formidling viser kun Slett', async ({ page }) => {
    await gotoApp(page, '/stilling/etterregistreringApen');

    const slettKnapp = await finnHandlingsknapp(page, 'Slett');
    await expect(slettKnapp).toBeVisible();
  });

  test('Åpen formidling viser ikke Rediger, Pause, Forleng, Dupliser i handlingsrad', async ({
    page,
  }) => {
    await gotoApp(page, '/stilling/etterregistreringApen');

    await expect(knapp(page, 'Rediger')).toBeHidden();
    await expect(knapp(page, 'Pause')).toBeHidden();
    await expect(knapp(page, 'Forleng')).toBeHidden();
    await expect(knapp(page, 'Dupliser')).toBeHidden();
    // Merk: Fullfør-knapp ER synlig – den kommer fra FullførEtterregistrering-banner, ikke StillingHandlinger
  });
});

// ────────────────────────────────────────────────────────
// 6. Ekstern/arbeidsplassen stilling – ArbeidsplassenHandlinger
// ────────────────────────────────────────────────────────
test.describe('Handlinger – ekstern stilling (arbeidsplassen)', () => {
  test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

  test('Viser Bruk til rekrutteringsoppdrag-knapp', async ({ page }) => {
    await gotoApp(page, '/stilling/eksternStilling');

    const knapp = await finnHandlingsknapp(
      page,
      'Bruk til rekrutteringsoppdrag',
    );
    await expect(knapp).toBeVisible();
  });

  test('Viser ikke direktemeldt-handlinger for ekstern stilling', async ({
    page,
  }) => {
    await gotoApp(page, '/stilling/eksternStilling');

    await expect(knapp(page, 'Rediger')).toBeHidden();
    await expect(knapp(page, 'Pause')).toBeHidden();
    await expect(knapp(page, 'Fullfør')).toBeHidden();
    await expect(knapp(page, 'Slett')).toBeHidden();
  });
});

// ────────────────────────────────────────────────────────
// 7. Min ekstern stilling (har stillingsinfo) – arbeidsplassen
// ────────────────────────────────────────────────────────
test.describe('Handlinger – min ekstern stilling (arbeidsplassen)', () => {
  test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

  test('Viser Fullfør oppdraget (har stillingsinfo, er eier)', async ({
    page,
  }) => {
    await gotoApp(page, '/stilling/minEksternStilling');

    const knapp = await finnHandlingsknapp(page, 'Fullfør oppdraget');
    await expect(knapp).toBeVisible();
  });

  test('Viser ikke Bruk til rekrutteringsoppdrag (har allerede stillingsinfo)', async ({
    page,
  }) => {
    await gotoApp(page, '/stilling/minEksternStilling');

    await expect(knapp(page, 'Bruk til rekrutteringsoppdrag')).toBeHidden();
  });
});

// ────────────────────────────────────────────────────────
// 7b. Ekstern stilling med stillingsinfo, ikke eier – Ta over eierskap
// ────────────────────────────────────────────────────────
test.describe('Handlinger – ekstern stilling med stillingsinfo, ikke eier', () => {
  test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

  test('Viser Ta over eierskap (har stillingsinfo, ikke eier)', async ({
    page,
  }) => {
    await gotoApp(page, '/stilling/eksternStillingMedInfo');

    const knapp = await finnHandlingsknapp(page, 'Ta over eierskap');
    await expect(knapp).toBeVisible();
  });

  test('Viser ikke Bruk til rekrutteringsoppdrag (har allerede stillingsinfo)', async ({
    page,
  }) => {
    await gotoApp(page, '/stilling/eksternStillingMedInfo');

    await expect(knapp(page, 'Bruk til rekrutteringsoppdrag')).toBeHidden();
  });
});

// ────────────────────────────────────────────────────────
// 8. Stengt for søkere – eier har Rediger men ingen Pause
// ────────────────────────────────────────────────────────
test.describe('Handlinger – stengt for søkere', () => {
  test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

  test('Eier ser Rediger-knapp', async ({ page }) => {
    await gotoApp(page, '/stilling/stengtStilling');

    const redigerKnapp = await finnHandlingsknapp(page, 'Rediger');
    await expect(redigerKnapp).toBeVisible();
  });

  test('Eier ser Fullfør-knapp (kan være i overflow)', async ({ page }) => {
    await gotoApp(page, '/stilling/stengtStilling');

    // Fullfør kan ligge i overflow-dropdown (DynamiskDropdown)
    const fullfør = await finnHandlingsknapp(page, 'Fullfør');
    await expect(fullfør).toBeVisible();
  });
});

// ────────────────────────────────────────────────────────
// 9. Utløpt stilling – eier har Rediger og Forleng
// ────────────────────────────────────────────────────────
test.describe('Handlinger – utløpt stilling', () => {
  test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

  test('Eier ser Rediger og Forleng', async ({ page }) => {
    await gotoApp(page, '/stilling/utloptStilling');

    const redigerKnapp = await finnHandlingsknapp(page, 'Rediger');
    await expect(redigerKnapp).toBeVisible();

    const forlengKnapp = await finnHandlingsknapp(page, 'Forleng');
    await expect(forlengKnapp).toBeVisible();
  });
});

// ────────────────────────────────────────────────────────
// 10. Fullført stilling – eier ser ikke Slett
// ────────────────────────────────────────────────────────
test.describe('Handlinger – fullført stilling', () => {
  test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

  test('Eier ser Dupliser', async ({ page }) => {
    await gotoApp(page, '/stilling/fullfortStilling');

    const dupliserKnapp = await finnHandlingsknapp(page, 'Dupliser');
    await expect(dupliserKnapp).toBeVisible();
  });
});

// ────────────────────────────────────────────────────────
// 11. Slettet stilling – ingen Slett-knapp (allerede slettet)
// ────────────────────────────────────────────────────────
test.describe('Handlinger – slettet stilling', () => {
  test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

  test('Slettet stilling viser ikke Slett-knapp', async ({ page }) => {
    await gotoApp(page, '/stilling/slettetStilling');
    await expect(knapp(page, 'Slett')).toBeHidden();
  });
});
