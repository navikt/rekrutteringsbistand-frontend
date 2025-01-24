import { expect, test } from '@playwright/test';
import { Roller } from '../../app/components/tilgangskontroll/roller';

export const testTilgangskontroll = (rolle: Roller) => {
  const ARBEIDSGIVERRETTET =
    rolle === Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET;
  const JOBBSOKERRETTET =
    rolle === Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET;
  const MODIA = rolle === Roller.AD_GRUPPE_MODIA_GENERELL_TILGANG;

  test.describe(`Tilgangskontroll for ${rolle}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:1337/');
    });

    test.describe('1. Forside', () => {
      test('Ser oversikt fanen', async ({ page }) => {
        if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET || MODIA) {
          await expect(
            page.getByRole('link', { name: 'Oversikt' }),
          ).toBeVisible();
        }
      });
      test('Hurtiglenker', async ({ page }) => {
        const element = page.getByTestId('forside-hurtiglenker');
        if (ARBEIDSGIVERRETTET) {
          await expect(element).toBeVisible();
        }
        if (JOBBSOKERRETTET || MODIA) {
          await expect(element).toBeHidden();
        }
      });
      test('Utfallsstatistikk', async ({ page }) => {
        const element = page.getByTestId('forside-utfallsstatistikk');
        if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET || MODIA) {
          await expect(element).toBeVisible();
        }
      });
      test('Forespørsler statistikk', async ({ page }) => {
        const element = page.getByTestId('forside-forespørsel-statistikk');
        if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET || MODIA) {
          await expect(element).toBeVisible();
        }
      });
    });

    test.describe('2. Stillingssøk', () => {
      test.beforeEach(async ({ page }) => {
        await page.getByRole('tab', { name: 'Stillinger' }).click();
      });

      test('Stillingssøk', async ({ page }) => {
        if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET || MODIA) {
          await expect(
            page.getByRole('tab', { name: 'Stillinger' }),
          ).toBeVisible();
        }
      });

      test('Alle stillinger fane', async ({ page }) => {
        const element = page.getByRole('tab', { name: 'Alle' });
        if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET || MODIA) {
          await expect(element).toBeVisible();
        }
      });

      test('Mine stillinger fane', async ({ page }) => {
        const element = page.getByRole('tab', { name: 'Mine stillinger' });
        if (ARBEIDSGIVERRETTET) {
          await expect(element).toBeVisible();
        }
        if (JOBBSOKERRETTET || MODIA) {
          await expect(element).toBeHidden();
        }
      });

      test('Opprett ny stilling knapp', async ({ page }) => {
        const element = page.getByRole('button', { name: 'Opprett ny' });
        if (ARBEIDSGIVERRETTET) {
          await expect(element).toBeVisible();
        }
        if (JOBBSOKERRETTET || MODIA) {
          await expect(element).toBeHidden();
        }
      });

      test('Statuser utover publisert', async ({ page }) => {
        const element = page.getByRole('tab', { name: 'Alle' });
        if (ARBEIDSGIVERRETTET) {
          await expect(element).toBeVisible();
        }
        if (JOBBSOKERRETTET || MODIA) {
          await expect(element).toBeHidden();
        }
      });
    });

    test.describe('3. Stilling', () => {
      test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:1337/stilling/internStilling');
      });

      test('Viser stilling side', async ({ page }) => {
        if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET || MODIA) {
          await expect(page.getByTestId('stilling-side')).toBeVisible();
        }
      });

      test('Viser finn kandidater knapp', async ({ page }) => {
        if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
          await expect(
            page.getByRole('button', { name: 'Finn kandidater' }),
          ).toBeVisible();
        }
        if (MODIA) {
          await expect(
            page.getByRole('button', { name: 'Finn kandidater' }),
          ).toBeHidden();
        }
      });
      test('Viser legg til kandidate knapp', async ({ page }) => {
        if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
          await expect(
            page.getByRole('button', { name: 'Legg til kandidat' }),
          ).toBeVisible();
        }
        if (MODIA) {
          await expect(
            page.getByRole('button', { name: 'Legg til kandidat' }),
          ).toBeHidden();
        }
      });

      test('Viser om stillingen', async ({ page }) => {
        if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET || MODIA) {
          await expect(
            page.getByRole('tab', { name: 'Om stillingen' }),
          ).toBeVisible();
        }
      });

      //TODO Fix eier / ikke eier mock
      test('Rediger, Dupliser og Avslutt knapp', async ({ page }) => {});
      test('Overta stillingen knapp', async ({ page }) => {});
      test('Viser kandidater fane', async ({ page }) => {});
    });
  });

  test.describe('4. Kandidatsøk', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:1337/kandidat-sok');
    });

    test('Viser kandidatsøk fane', async ({ page }) => {
      const kandidatSøkTab = page.getByRole('tab', { name: 'Kandidatsøk' });

      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
        await expect(kandidatSøkTab).toBeVisible();
      }

      if (MODIA) {
        await expect(kandidatSøkTab).toBeHidden();

        await expect(
          page.getByRole('heading', { name: 'Ikke tilgang' }),
        ).toBeVisible();
      }
    });
    test('Mine brukere fane', async ({ page }) => {
      const mineBrukereTab = page.getByRole('tab', { name: 'Mine brukere' });

      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
        await expect(mineBrukereTab).toBeVisible();
      }
      if (MODIA) {
        await expect(mineBrukereTab).toBeHidden();
      }
    });
    test('Mitt kontor fane', async ({ page }) => {
      const mittKontorTab = page.getByRole('tab', { name: 'Mitt kontor' });

      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
        await expect(mittKontorTab).toBeVisible();
      }
      if (MODIA) {
        await expect(mittKontorTab).toBeHidden();
      }
    });
    test('Mine kontor fane', async ({ page }) => {
      const mineKontorTab = page.getByRole('tab', { name: 'Mine kontor' });

      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
        await expect(mineKontorTab).toBeVisible();
      }
      if (MODIA) {
        await expect(mineKontorTab).toBeHidden();
      }
    });
    test('Valgte kontor fane', async ({ page }) => {
      const valgteKontorTab = page.getByRole('tab', {
        name: 'Valgte kontor',
      });

      if (ARBEIDSGIVERRETTET) {
        await expect(valgteKontorTab).toBeVisible();
      }
      if (JOBBSOKERRETTET || MODIA) {
        await expect(valgteKontorTab).toBeHidden();
      }
    });
    test('Allefane', async ({ page }) => {
      const alleFane = page.getByRole('tab', { name: 'Alle' });

      if (ARBEIDSGIVERRETTET) {
        await expect(alleFane).toBeVisible();
      }
      if (JOBBSOKERRETTET || MODIA) {
        await expect(alleFane).toBeHidden();
      }
    });
  });

  test.describe('5. Kandidat', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:1337/kandidat/PAM012t1avh27');
    });

    test('Viser kandidat side ', async ({ page }) => {
      const kandidatSide = page.getByTestId('kandidat-side');
      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
        await expect(kandidatSide).toBeVisible();
      }
      if (MODIA) {
        await expect(kandidatSide).toBeHidden();
      }
    });
    test('Viser aktivitetfanen inne på kandidat', async ({ page }) => {
      const aktivitetFane = page.getByRole('tab', { name: 'Aktivitet' });

      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
        await expect(aktivitetFane).toBeVisible();
      }
      if (MODIA) {
        await expect(aktivitetFane).toBeHidden();
      }
    });
  });

  test.describe('6. Formidlinger', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:1337/formidlinger');
    });

    test('Viser formidlinger', async ({ page }) => {
      const formidlinger = page.getByRole('tab', { name: 'Formidlinger' });

      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
        await expect(formidlinger).toBeVisible();
      }
      if (MODIA) {
        await expect(formidlinger).toBeHidden();
      }
    });
    test('Kan opprette formidling', async ({ page }) => {
      const etterFormidlingKnapp = page.getByRole('button', {
        name: 'Opprett etterregistrering',
      });
      if (ARBEIDSGIVERRETTET || JOBBSOKERRETTET) {
        await expect(etterFormidlingKnapp).toBeVisible();
      }
      if (MODIA) {
        await expect(etterFormidlingKnapp).toBeHidden();
      }
    });
  });
};
