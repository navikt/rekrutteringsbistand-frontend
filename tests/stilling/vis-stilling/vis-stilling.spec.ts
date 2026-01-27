import { gotoApp } from '@/tests/gotoApp';
import { visMørkModus } from '@/tests/visMørkModus';
import { expect, test } from '@playwright/test';

// Bruker arbeidsgiverrettet tilgang
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

/**
 * Hjelpefunksjon for å finne en handlingsknapp som kan være synlig direkte
 * eller skjult i dropdown-menyen (basert på tilgjengelig plass).
 */
async function finnHandlingsknapp(
  page: import('@playwright/test').Page,
  knappNavn: string,
) {
  const direkteKnapp = page.getByRole('button', { name: knappNavn });

  // Sjekk om knappen er synlig direkte
  if (await direkteKnapp.isVisible()) {
    return direkteKnapp;
  }

  // Prøv å åpne dropdown og finn knappen der
  const elipsisButtons = page.locator(
    'button:has(svg[class*="MenuElipsisHorizontal"])',
  );
  if ((await elipsisButtons.count()) > 0) {
    await elipsisButtons.first().click();
    return page.getByRole('button', { name: knappNavn });
  }

  return direkteKnapp;
}

test.describe(`Stilling test`, () => {
  test('Min stilling - grunnleggende innhold', async ({ page }) => {
    await gotoApp(page, '/stilling/minStilling');

    await page.getByRole('tab', { name: 'Om stillingen' }).click();
    await expect(
      page.getByRole('tab', { name: 'Om stillingen' }),
    ).toBeVisible();
    await expect(
      page.getByRole('tab', { name: 'Jobbsøkere (10)' }),
    ).toBeVisible();
    await expect(page.getByText('Finn og foreslå jobbsøkere')).toBeVisible();
    await expect(
      page.getByText('Legg til jobbsøkere', { exact: true }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Skriv ut' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Om jobben' }),
    ).toBeVisible();
  });

  test('Min stilling - handlingsknapper', async ({ page }) => {
    await gotoApp(page, '/stilling/minStilling');

    // Verifiser at alle handlingsknapper finnes (enten synlig eller i dropdown)
    // Merk: "Overta" vises kun for ikke-eiere, så den er ikke med her
    const handlingsknapper = [
      'Rediger',
      'Pause',
      'Fullfør',
      'Forleng',
      'Dupliser',
      'Slett',
    ];

    for (const knappNavn of handlingsknapper) {
      const knapp = await finnHandlingsknapp(page, knappNavn);
      await expect(knapp).toBeVisible();
    }
  });

  test('Ikke min stilling', async ({ page }) => {
    await gotoApp(page, '/stilling/123');

    await page.getByRole('tab', { name: 'Om stillingen' }).click();
    await expect(
      page.getByRole('tab', { name: 'Om stillingen' }),
    ).toBeVisible();

    await expect(page.getByText('Finn og foreslå jobbsøkere')).toBeVisible();
    await expect(
      page.getByText('Legg til jobbsøkere', { exact: true }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Skriv ut' })).toBeVisible();

    await expect(page.getByText('Organisasjonsnummer')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Om jobben' }),
    ).toBeVisible();

    // Skal ikke ha tilgang til eier-handlinger
    await expect(
      page.getByRole('tab', { name: 'Jobbsøkere', exact: true }),
    ).toBeHidden();
    await expect(page.getByRole('button', { name: 'Rediger' })).toBeHidden();
  });

  test.describe(`Min stilling i mørk modus`, () => {
    test.beforeEach(async ({ page }) => {
      await gotoApp(page, '/stilling/minStilling');
      await expect(
        page.getByRole('tab', { name: 'Om stillingen' }),
      ).toBeVisible({ timeout: 15000 });
    });

    visMørkModus('om-stillingen');
  });
});
