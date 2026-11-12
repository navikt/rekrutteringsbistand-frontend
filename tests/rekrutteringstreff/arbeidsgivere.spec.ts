import { gotoApp } from '@/tests/gotoApp';
import { slåPåMørkModus } from '@/tests/mørkModus';
import { tilgjengelighetstest } from '@navikt/toi-next-frontend/a11y';
import { expect, test, type Page } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Arbeidsgivere-fane', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
    await page.getByRole('tab', { name: /Arbeidsgivere/ }).click();
  });

  test('Viser "Legg til arbeidsgiver"-knapp', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Legg til arbeidsgiver' }),
    ).toBeVisible();
  });

  test('Viser minst én arbeidsgiver i listen', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Testbedrift AS' }),
    ).toBeVisible();
  });

  test('Slett-knapp er deaktivert når det kun er én arbeidsgiver', async ({
    page,
  }) => {
    const slettKnapper = page.getByRole('button', { name: 'Slett' });
    const antall = await slettKnapper.count();
    if (antall === 1) {
      await expect(slettKnapper.first()).toBeDisabled();
    }
  });

  tilgjengelighetstest(test, { utvidet: true, mørkModus: slåPåMørkModus });
});

// 200 % zoom på skjermer fra 1024 til 1440 piksler gir 512–720 CSS-piksler.
test.describe('Arbeidsgiverkort ved ulike bredder', () => {
  const målKort = (page: Page) =>
    page
      .getByRole('tabpanel')
      .getByRole('heading', { level: 3 })
      .evaluateAll((overskrifter) =>
        overskrifter.map((h) => {
          let kort = h.parentElement!;
          while (!kort.querySelector('.aksel-tag')) kort = kort.parentElement!;
          const tag = kort.querySelector('.aksel-tag')!.getBoundingClientRect();
          const brutteKnapper = [...kort.querySelectorAll('button')]
            .filter((b) => b.textContent?.trim())
            .filter((b) => {
              const tekster = document.createTreeWalker(
                b,
                NodeFilter.SHOW_TEXT,
              );
              const topper: number[] = [];
              while (tekster.nextNode()) {
                const tekst = document.createRange();
                tekst.selectNodeContents(tekster.currentNode);
                for (const r of tekst.getClientRects()) topper.push(r.top);
              }
              return Math.max(...topper) - Math.min(...topper) > 4;
            })
            .map((b) => b.textContent?.trim());
          return {
            tagVenstre: Math.round(tag.left),
            tagUnderOverskrift: tag.top >= h.getBoundingClientRect().bottom - 1,
            brutteKnapper,
          };
        }),
      );

  const åpneFanen = async (page: Page, treff: string) => {
    await gotoApp(page, `/rekrutteringstreff/${treff}`);
    await page.getByRole('tab', { name: /Arbeidsgivere/ }).click();
    await expect(
      page.getByRole('tabpanel').getByRole('heading', { level: 3 }).first(),
    ).toBeVisible();
  };

  // «workop» har arbeidsgivere uten behov, «publisert» har «Rediger behov».
  for (const treff of ['workop', 'publisert'])
    for (const bredde of [720, 512])
      test(`${treff}: status og handlinger står likt i alle kort ved ${bredde} px`, async ({
        page,
      }) => {
        await page.setViewportSize({ width: bredde, height: 540 });
        await åpneFanen(page, treff);

        const kort = await målKort(page);
        expect(kort.length).toBeGreaterThan(0);
        expect(new Set(kort.map((k) => k.tagVenstre)).size).toBe(1);
        expect(kort.flatMap((k) => k.brutteKnapper)).toEqual([]);
      });

  test('status og handlinger står ved siden av navnet på bred skjerm', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1080 });
    await åpneFanen(page, 'workop');

    const kort = await målKort(page);
    expect(kort.length).toBeGreaterThan(1);
    expect(kort.filter((k) => k.tagUnderOverskrift)).toEqual([]);
    expect(new Set(kort.map((k) => k.tagVenstre)).size).toBe(1);
    expect(kort.flatMap((k) => k.brutteKnapper)).toEqual([]);
  });

  // Navn uten mellomrom kan ikke brytes på ordgrenser og ble klippet av kortet.
  for (const bredde of [512, 1440])
    test(`navn uten mellomrom holder seg inne i kortet ved ${bredde} px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: bredde, height: 540 });
      await page.route('**/workop/arbeidsgiver', async (route) => {
        if (route.request().method() !== 'GET') return route.fallback();
        const svar = await route.fetch();
        const arbeidsgivere = await svar.json();
        arbeidsgivere[0].navn = 'TESTARBEIDSGIVERUTENMELLOMROM';
        await route.fulfill({ response: svar, json: arbeidsgivere });
      });
      await åpneFanen(page, 'workop');

      const overskrift = page
        .getByRole('tabpanel')
        .getByRole('heading', { level: 3, name: /utenmellomrom/i });
      await expect(overskrift).toBeVisible();

      const mål = await overskrift.evaluate((h) => {
        const kort = h
          .closest('[class~="@container"]')!
          .getBoundingClientRect();
        const tekst = document.createRange();
        tekst.selectNodeContents(h);
        return {
          tekstHøyre: Math.max(
            ...[...tekst.getClientRects()].map((r) => r.right),
          ),
          overskriftHøyre: h.getBoundingClientRect().right,
          kortHøyre: kort.right,
        };
      });
      expect(mål.tekstHøyre).toBeLessThanOrEqual(mål.overskriftHøyre + 1);
      expect(mål.tekstHøyre).toBeLessThanOrEqual(mål.kortHøyre + 1);

      await page.unrouteAll({ behavior: 'ignoreErrors' });
    });
});
