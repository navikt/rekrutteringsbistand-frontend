import { Roller } from '@/components/tilgangskontroll/roller';
import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

export const testTilgangskontroll = (rolle: Roller) => {
  const ARBEIDSGIVERRETTET =
    rolle === Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET;
  const JOBBSOKERRETTET =
    rolle === Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET;
  const MODIA = rolle === Roller.AD_GRUPPE_MODIA_GENERELL_TILGANG;

  const rolleNavn = (rolle: Roller): string => {
    switch (rolle) {
      case Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET:
        return 'Arbeidsgiverrettet';
      case Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET:
        return 'Jobbsøkerrettet';
      case Roller.AD_GRUPPE_MODIA_GENERELL_TILGANG:
        return 'Modia';
      default:
        return 'UKJENT ROLLE!';
    }
  };

  // ────────────────────────────────────────────────────────
  // Tilgangskontroll – verifiser synlighet per rolle
  // ────────────────────────────────────────────────────────
  test.describe(`Tilgangskontroll for ${rolleNavn(rolle)}`, () => {
    test('Forside – viser statistikk', async ({ page }) => {
      await gotoApp(page, '/');

      await expect(
        page.getByRole('button', { name: 'Oversikt' }),
      ).toBeVisible();

      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET || MODIA) {
        await expect(
          page.getByTestId('forside-utfallsstatistikk'),
        ).toBeVisible();
        await expect(
          page.getByTestId('forside-forespørsel-statistikk'),
        ).toBeVisible();
      }
    });

    test('Stillingssøk – portefølje og filtre', async ({ page }) => {
      await gotoApp(page, '/');
      await page.getByRole('button', { name: 'Stillingsoppdrag' }).click();
      await page.waitForURL('**/stilling**');

      // Alle stillinger – synlig for alle roller
      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET || MODIA) {
        await expect(page.getByRole('button', { name: 'Alle' })).toBeVisible();
      }

      // Mine stillinger – kun arbeidsgiverrettet
      if (ARBEIDSGIVERRETTET) {
        await expect(page.getByRole('button', { name: 'Mine' })).toBeVisible();
      }
      if (JOBBSOKERRETTET || MODIA) {
        await expect(page.getByRole('button', { name: 'Mine' })).toBeHidden();
      }

      // Filtre
      await gotoApp(
        page,
        '/stilling?publisert=intern&statuser=publisert%2Cutl%C3%B8pt%2Cstoppet&fylker=33&kommuner=3301',
      );

      await expect(page.getByText('Område')).toBeVisible();
      await expect(page.getByText('Kategori')).toBeVisible();
    });

    test('Stilling – kandidathandlinger synlighet', async ({ page }) => {
      await gotoApp(page, '/stilling/internStilling');

      await expect(page.getByTestId('stilling-side')).toBeVisible();

      const finnKandidaterKnapp = page.getByText('Finn og foreslå jobbsøkere');
      const leggTilKandidatKnapp = page.getByText('Legg til jobbsøkere', {
        exact: true,
      });

      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
        await expect(finnKandidaterKnapp).toBeVisible();
        await expect(leggTilKandidatKnapp).toBeVisible();
      }
      if (MODIA) {
        await expect(finnKandidaterKnapp).toBeHidden();
        await expect(leggTilKandidatKnapp).toBeHidden();
      }

      // Om stillingen-tab synlig for alle
      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET || MODIA) {
        await expect(
          page.getByRole('tab', { name: 'Om stillingen' }),
        ).toBeVisible();
      }
    });

    test('Min stilling – eier-handlinger', async ({ page }) => {
      await gotoApp(page, '/stilling/minStilling');

      if (ARBEIDSGIVERRETTET) {
        // Sjekk at Rediger finnes (enten synlig eller i overflow-meny)
        const hoveddel = page.locator('main');
        const redigerKnapp = hoveddel
          .getByRole('button', { name: 'Rediger' })
          .first();

        if (!(await redigerKnapp.isVisible())) {
          const overflowKnapp = hoveddel.getByRole('button', {
            name: 'Flere handlinger',
          });
          if (await overflowKnapp.isVisible()) {
            await overflowKnapp.click();
          }
        }

        await expect(
          page.getByRole('button', { name: 'Rediger' }),
        ).toBeVisible();

        await expect(
          page.getByRole('tab', { name: 'Jobbsøkere (300)' }),
        ).toBeVisible();
      }

      if (JOBBSOKERRETTET || MODIA) {
        await expect(
          page.getByRole('button', { name: 'Rediger' }),
        ).toBeHidden();
      }
    });

    test('Kandidatsøk – faner og tilgang', async ({ page }) => {
      await gotoApp(page, '/kandidat');

      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
        await expect(
          page.getByRole('button', { name: 'Jobbsøkere' }),
        ).toBeVisible();
        await expect(
          page.getByRole('button', { name: 'Mine brukere' }),
        ).toBeVisible();
        await expect(
          page.getByRole('button', { name: 'Mitt kontor' }),
        ).toBeVisible();
        await expect(
          page.getByRole('button', { name: 'Mine kontor' }),
        ).toBeVisible();
      }

      if (MODIA) {
        await expect(
          page.getByRole('button', { name: 'Jobbsøkere' }),
        ).toBeHidden();
        await expect(
          page.getByRole('heading', { name: 'Ikke tilgang' }),
        ).toBeVisible();
        await expect(
          page.getByRole('button', { name: 'Mine brukere' }),
        ).toBeHidden();
        await expect(
          page.getByRole('button', { name: 'Mitt kontor' }),
        ).toBeHidden();
        await expect(
          page.getByRole('button', { name: 'Mine kontor' }),
        ).toBeHidden();
      }

      // Valgte kontor og Alle – kun arbeidsgiverrettet
      if (ARBEIDSGIVERRETTET) {
        await expect(
          page.getByRole('button', { name: 'Valgte kontor' }),
        ).toBeVisible();
        await expect(page.getByRole('button', { name: 'Alle' })).toBeVisible();
      }
      if (JOBBSOKERRETTET || MODIA) {
        await expect(
          page.getByRole('button', { name: 'Valgte kontor' }),
        ).toBeHidden();
        await expect(page.getByRole('button', { name: 'Alle' })).toBeHidden();
      }
    });

    test('Kandidat – tilgangskontroll', async ({ page }) => {
      await gotoApp(page, '/kandidat/PAM012t1avh27');

      const ikkeTilgang = page.getByText('Ikke tilgang');

      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
        await expect(ikkeTilgang).toBeHidden();
      }
      if (MODIA) {
        await expect(ikkeTilgang).toBeVisible();
      }
    });

    test('Formidlinger – tilgang og opprett', async ({ page }) => {
      await gotoApp(page, '/etterregistrering');

      const formidlinger = page
        .getByLabel('Brødsmulesti')
        .getByText('Etterregistrering');

      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
        await expect(formidlinger).toBeVisible();

        await page
          .getByRole('button', { name: 'Opprett', exact: true })
          .click();
        await expect(
          page.getByRole('menuitem', { name: 'Etterregistrering' }),
        ).toBeVisible();
      }
      if (MODIA) {
        await expect(formidlinger).toBeHidden();
        await expect(
          page.getByRole('button', { name: 'Opprett' }),
        ).toBeHidden();
      }
    });

    test('Rekrutteringstreff – oversikt tilgjengelig', async ({ page }) => {
      await gotoApp(page, '/rekrutteringstreff');

      if (ARBEIDSGIVERRETTET) {
        await expect(
          page.getByRole('button', { name: 'Nytt rekrutteringstreff' }),
        ).toBeVisible();
      }

      if (JOBBSOKERRETTET || MODIA) {
        await expect(
          page.getByRole('button', { name: 'Nytt rekrutteringstreff' }),
        ).toBeHidden();
      }
    });
  });
};
