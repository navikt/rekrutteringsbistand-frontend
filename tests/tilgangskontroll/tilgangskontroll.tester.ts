import { Roller } from '@/components/tilgangskontroll/roller';
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

  test.describe(`Tilgangskontroll for ${rolleNavn(rolle)}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:1337/');
      await expect(page.getByRole('button', { name: 'Oversikt' })).toBeVisible({
        timeout: 15000,
      });
    });

    test('1. Forside', async ({ page }) => {
      // Ser oversikt fanen
      await expect(
        page.getByRole('button', { name: 'Oversikt' }),
      ).toBeVisible();

      // Utfallsstatistikk
      const utfallsstatistikk = page.getByTestId('forside-utfallsstatistikk');
      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET || MODIA) {
        await expect(utfallsstatistikk).toBeVisible();
      }

      // Forespørsler statistikk
      const forespørslerStatistikk = page.getByTestId(
        'forside-forespørsel-statistikk',
      );
      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET || MODIA) {
        await expect(forespørslerStatistikk).toBeVisible();
      }
    });

    test('2. Stillingssøk', async ({ page }) => {
      await page.getByRole('button', { name: 'Stillingsoppdrag' }).click();

      await page.waitForURL('**/stilling**');

      // Alle stillinger fane
      const alleStillingerFane = page.getByRole('button', {
        name: 'Alle oppdrag',
      });
      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET || MODIA) {
        await expect(alleStillingerFane).toBeVisible();
      }

      // Mine stillinger fane
      const mineStillingerFane = page.getByRole('button', {
        name: 'Mine',
      });
      if (ARBEIDSGIVERRETTET) {
        await expect(mineStillingerFane).toBeVisible();
      }
      if (JOBBSOKERRETTET || MODIA) {
        await expect(mineStillingerFane).toBeHidden();
      }

      // Filtre
      await page.goto(
        'http://localhost:1337/stilling?publisert=intern&statuser=publisert%2Cutl%C3%B8pt%2Cstoppet&fylker=33&kommuner=3301',
      );

      if (ARBEIDSGIVERRETTET) {
        await page.getByRole('button', { name: 'Filtrer' }).click();
        await expect(page.getByText('Status')).toBeVisible();
      }
      if (JOBBSOKERRETTET || MODIA) {
        await page.getByRole('button', { name: 'Filtrer' }).click();
        await expect(page.getByText('Status')).toBeHidden();
      }

      await expect(page.getByText('Område')).toBeVisible();
      await expect(
        page.getByText('Inkludering', { exact: true }),
      ).toBeVisible();

      await expect(page.getByText('Kategori')).toBeVisible();
    });

    test('3. Stilling', async ({ page }) => {
      await page.goto('http://localhost:1337/stilling/internStilling');

      // Viser stilling side
      await expect(page.getByTestId('stilling-side')).toBeVisible();

      // Viser finn kandidater knapp
      const finnKandidaterKnapp = page.getByRole('button', {
        name: 'Finn kandidater',
      });

      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
        await expect(finnKandidaterKnapp).toBeVisible();
      }
      if (MODIA) {
        await expect(finnKandidaterKnapp).toBeHidden();
      }

      // Viser legg til kandidate knapp
      const leggTilKandidatKnapp = page.getByRole('button', {
        name: 'Legg til kandidat',
      });
      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
        await expect(leggTilKandidatKnapp).toBeVisible();
      }
      if (MODIA) {
        await expect(leggTilKandidatKnapp).toBeHidden();
      }

      // Viser om stillingen
      const omStillingFane = page.getByRole('tab', { name: 'Om stillingen' });
      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET || MODIA) {
        await expect(omStillingFane).toBeVisible();
      }
    });

    test('3.1 Min Stilling', async ({ page }) => {
      await page.goto('http://localhost:1337/stilling/minStilling');

      const redigerKnapp = page.getByRole('button', { name: 'Rediger' });
      const dupliserKnapp = page.getByRole('button', { name: 'Dupliser' });
      const avpubliserKnapp = page.getByRole('button', { name: 'Avpubliser' });
      const ferdigstillKnapp = page.getByRole('button', {
        name: 'Ferdigstill',
      });

      if (ARBEIDSGIVERRETTET) {
        await expect(redigerKnapp).toBeVisible();
        await expect(dupliserKnapp).toBeVisible();
        await expect(avpubliserKnapp).toBeVisible();
        await expect(ferdigstillKnapp).toBeVisible();
      } else {
        await expect(redigerKnapp).toBeHidden();
        await expect(dupliserKnapp).toBeHidden();
        await expect(avpubliserKnapp).toBeHidden();
        await expect(ferdigstillKnapp).toBeHidden();
      }

      if (ARBEIDSGIVERRETTET) {
        await expect(
          page.getByRole('tab', { name: 'Kandidater (10)' }),
        ).toBeVisible();
      }
    });

    test('4. Kandidatsøk', async ({ page }) => {
      await page.goto('http://localhost:1337/kandidat');

      // Viser kandidatsøk fane
      const kandidatSøkTab = page.getByRole('button', { name: 'Jobbsøkere' });

      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
        await expect(kandidatSøkTab).toBeVisible();
      }

      if (MODIA) {
        await expect(kandidatSøkTab).toBeHidden();

        await expect(
          page.getByRole('heading', { name: 'Ikke tilgang' }),
        ).toBeVisible();
      }

      // Mine brukere fane
      const mineBrukereTab = page.getByRole('button', { name: 'Mine brukere' });
      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
        await expect(mineBrukereTab).toBeVisible();
      }
      if (MODIA) {
        await expect(mineBrukereTab).toBeHidden();
      }

      // Mitt kontor fane
      const mittKontorTab = page.getByRole('button', { name: 'Mitt kontor' });
      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
        await expect(mittKontorTab).toBeVisible();
      }
      if (MODIA) {
        await expect(mittKontorTab).toBeHidden();
      }

      // Mine kontor fane
      const mineKontorTab = page.getByRole('button', { name: 'Mine kontor' });

      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
        await expect(mineKontorTab).toBeVisible();
      }
      if (MODIA) {
        await expect(mineKontorTab).toBeHidden();
      }

      // Valgte kontor fane
      const valgteKontorTab = page.getByRole('button', {
        name: 'Valgte kontor',
      });
      if (ARBEIDSGIVERRETTET) {
        await expect(valgteKontorTab).toBeVisible();
      }
      if (JOBBSOKERRETTET || MODIA) {
        await expect(valgteKontorTab).toBeHidden();
      }

      // Alle fane
      const alleFane = page.getByRole('button', { name: 'Alle' });
      if (ARBEIDSGIVERRETTET) {
        await expect(alleFane).toBeVisible();
      }
      if (JOBBSOKERRETTET || MODIA) {
        await expect(alleFane).toBeHidden();
      }
    });

    test('5. Kandidat', async ({ page }) => {
      await page.goto(
        'http://localhost:1337/kandidat?visKandidatnr=PAM012t1avh27',
      );
      // Viser kandidat side
      const oversiktFane = page.getByRole('tab', { name: 'Oversikt' });
      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
        await expect(oversiktFane).toBeVisible();
      }
      if (MODIA) {
        await expect(oversiktFane).toBeHidden();
      }

      // Viser aktivitetfanen inne på kandidat
      const aktivitetFane = page.getByRole('tab', { name: 'Aktivitet' });
      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
        await expect(aktivitetFane).toBeVisible();
      }
      if (MODIA) {
        await expect(aktivitetFane).toBeHidden();
      }
    });

    test('6. Formidlinger', async ({ page }) => {
      await page.goto('http://localhost:1337/etterregistrering');

      // Viser formidlinger
      const formidlinger = await page.getByRole('heading', {
        name: 'Etterregistreringer',
      });
      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
        await expect(formidlinger).toBeVisible();
      }
      if (MODIA) {
        await expect(formidlinger).toBeHidden();
      }

      // Kan opprette formidling
      const etterFormidlingKnapp = page.getByRole('button', {
        name: 'Opprett etterregistrering',
      });
      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
        await page
          .getByRole('button', { name: 'Opprett', exact: true })
          .click();
        await expect(
          page.getByRole('menuitem', { name: 'Etterregistrering' }),
        ).toBeVisible();
      }
      if (MODIA) {
        await expect(
          page.getByRole('button', { name: 'Opprett' }),
        ).toBeHidden();
      }
    });
  });
};
