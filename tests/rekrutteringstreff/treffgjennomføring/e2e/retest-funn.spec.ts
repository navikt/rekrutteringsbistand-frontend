import {
  expect,
  test,
  åpneInteresse,
  åpneRomOgRotasjon,
  åpneTreffgjennomføring,
} from './oppsett';
import { gotoApp } from '@/tests/gotoApp';
import type { Locator, Page } from '@playwright/test';

/**
 * Funn fra UU-testingen av treffgjennomføring (re-test 20.10.26).
 * 200 % zoom på skjermer fra 1024 til 1440 piksler tilsvarer 512–720 CSS-piksler.
 */
const ZOOM_200_BREDDER = [720, 640, 512];

const LANGT_ARBEIDSGIVERNAVN =
  'Eksempelbakeriet Avdeling for Langtidsprøving og Testproduksjon AS';
const LANGT_ETTERNAVN = 'Etternavnmedekstralangdobbeltnavn-Eksempelsen';
const NAVN_UTEN_MELLOMROM = 'TESTARBEIDSGIVERUTENMELLOMROM';

const medLangtArbeidsgivernavn = (page: Page) =>
  page.route('**/workop/arbeidsgiver', async (route) => {
    if (route.request().method() !== 'GET') return route.fallback();
    const svar = await route.fetch();
    const arbeidsgivere = await svar.json();
    arbeidsgivere[0].navn = LANGT_ARBEIDSGIVERNAVN;
    await route.fulfill({ response: svar, json: arbeidsgivere });
  });

/** Gir annenhver jobbsøker et langt etternavn, så både korte og avkortede navn testes. */
const medLangeJobbsøkernavn = (page: Page) =>
  page.route(
    '**/workop/treffgjennomforing-og-oppfolging/jobbsokere',
    async (route) => {
      const svar = await route.fetch();
      const json = await svar.json();
      json.jobbsøkere = json.jobbsøkere.map(
        (person: { etternavn: string | null }, indeks: number) =>
          indeks % 2 === 1
            ? { ...person, etternavn: `${person.etternavn}${LANGT_ETTERNAVN}` }
            : person,
      );
      await route.fulfill({ response: svar, json });
    },
  );

/** Er midten av elementet synlig og ikke dekket av noe annet? */
const erSynligIMidten = (lokator: Locator) =>
  lokator.evaluate((el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return false;
    const øverst = document.elementFromPoint(
      r.x + r.width / 2,
      r.y + r.height / 2,
    );
    return !!øverst && (el === øverst || el.contains(øverst));
  });

test.describe('1: arbeidsgiverlisten ved 200 % zoom', () => {
  for (const bredde of ZOOM_200_BREDDER) {
    test(`kortene holder innholdet innenfor kanten ved ${bredde} px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: bredde, height: 540 });
      await medLangtArbeidsgivernavn(page);
      await åpneTreffgjennomføring(page);

      const liste = page
        .getByRole('region', { name: 'Arbeidsgivere' })
        .or(page.locator('section[aria-labelledby$="-arbeidsgivere-heading"]'))
        .getByRole('listitem');
      await expect(liste.first()).toBeVisible();

      const avvik = await liste.evaluateAll((kort) =>
        kort.flatMap((li, indeks) => {
          const ramme = li.getBoundingClientRect();
          const feil: string[] = [];
          if (li.scrollWidth > li.clientWidth + 1)
            feil.push(`kort ${indeks} flyter ut horisontalt`);
          for (const barn of li.children) {
            const r = barn.getBoundingClientRect();
            if (r.left < ramme.left - 1 || r.right > ramme.right + 1)
              feil.push(`innhold i kort ${indeks} går utenfor kortet`);
          }
          const neste = kort[indeks + 1]?.getBoundingClientRect();
          if (neste && neste.top < ramme.bottom - 1)
            feil.push(`kort ${indeks} overlapper neste kort`);
          return feil;
        }),
      );
      expect(avvik).toEqual([]);

      await page.unrouteAll({ behavior: 'ignoreErrors' });
    });
  }

  // Skjermbildet fra testeren viser fanen Arbeidsgivere: status og handlinger
  // havnet på ulik plass i hvert kort, og «Rediger behov» brøt over to linjer.
  const målArbeidsgiverkort = (page: Page) =>
    page
      .getByRole('tabpanel')
      .getByRole('heading', { level: 3 })
      .evaluateAll((overskrifter) =>
        overskrifter.map((h) => {
          let kort = h.parentElement!;
          while (!kort.querySelector('.aksel-tag')) kort = kort.parentElement!;
          const tag = kort.querySelector('.aksel-tag')!.getBoundingClientRect();
          const knapper = [...kort.querySelectorAll('button')].filter((b) =>
            b.textContent?.trim(),
          );
          const brutteKnapper = knapper
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
          const hode = h.getBoundingClientRect();
          return {
            navn: h.textContent,
            tagVenstre: Math.round(tag.left),
            tagUnderOverskrift: tag.top >= hode.bottom - 1,
            brutteKnapper,
          };
        }),
      );

  const åpneArbeidsgiverfanen = async (page: Page, treff: string) => {
    await gotoApp(page, `/rekrutteringstreff/${treff}`);
    await page.getByRole('tab', { name: /Arbeidsgivere/ }).click();
    await expect(
      page.getByRole('tabpanel').getByRole('heading', { level: 3 }).first(),
    ).toBeVisible();
  };

  // «workop» har arbeidsgivere uten behov, «publisert» har «Rediger behov».
  for (const treff of ['workop', 'publisert'])
    for (const bredde of ZOOM_200_BREDDER) {
      test(`fanen Arbeidsgivere i ${treff}: status og handlinger står likt i alle kort ved ${bredde} px`, async ({
        page,
      }) => {
        await page.setViewportSize({ width: bredde, height: 540 });
        await åpneArbeidsgiverfanen(page, treff);

        const kort = await målArbeidsgiverkort(page);
        expect(kort.length).toBeGreaterThan(treff === 'workop' ? 1 : 0);
        expect(new Set(kort.map((k) => k.tagVenstre)).size).toBe(1);
        expect(kort.flatMap((k) => k.brutteKnapper)).toEqual([]);
      });
    }

  test('fanen Arbeidsgivere: status og handlinger står ved siden av navnet på bred skjerm', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1080 });
    await åpneArbeidsgiverfanen(page, 'workop');

    const kort = await målArbeidsgiverkort(page);
    expect(kort.length).toBeGreaterThan(1);
    expect(kort.filter((k) => k.tagUnderOverskrift)).toEqual([]);
    expect(new Set(kort.map((k) => k.tagVenstre)).size).toBe(1);
    expect(kort.flatMap((k) => k.brutteKnapper)).toEqual([]);
  });

  // Navn uten mellomrom kan ikke brytes på ordgrenser og ble klippet av kortet.
  for (const bredde of [...ZOOM_200_BREDDER, 1440])
    test(`fanen Arbeidsgivere: navn uten mellomrom holder seg inne i kortet ved ${bredde} px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: bredde, height: 540 });
      await page.route('**/workop/arbeidsgiver', async (route) => {
        if (route.request().method() !== 'GET') return route.fallback();
        const svar = await route.fetch();
        const arbeidsgivere = await svar.json();
        arbeidsgivere[0].navn = NAVN_UTEN_MELLOMROM;
        await route.fulfill({ response: svar, json: arbeidsgivere });
      });
      await åpneArbeidsgiverfanen(page, 'workop');

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
        const linjer = [...tekst.getClientRects()];
        return {
          tekstHøyre: Math.max(...linjer.map((r) => r.right)),
          overskriftHøyre: h.getBoundingClientRect().right,
          kortHøyre: kort.right,
        };
      });
      expect(mål.tekstHøyre).toBeLessThanOrEqual(mål.overskriftHøyre + 1);
      expect(mål.tekstHøyre).toBeLessThanOrEqual(mål.kortHøyre + 1);

      await page.unrouteAll({ behavior: 'ignoreErrors' });
    });
});

test.describe('2: tabulatorrekkefølgen etter utskriftsknappene', () => {
  for (const bredde of [1440, ...ZOOM_200_BREDDER]) {
    test(`fokus hopper ikke til statiske arbeidsgivernavn ved ${bredde} px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: bredde, height: 540 });
      await medLangtArbeidsgivernavn(page);
      await åpneRomOgRotasjon(page);

      await page
        .getByRole('button', { name: 'Utskrift til jobbsøkere' })
        .focus();
      const fokusstopp: string[] = [];
      for (let i = 0; i < 4; i++) {
        await page.keyboard.press('Tab');
        fokusstopp.push(
          await page.evaluate(() => {
            const el = document.activeElement as HTMLElement | null;
            if (!el || el === document.body) return 'ok';
            const interaktiv = el.matches(
              'button, a[href], input, select, textarea, [role="tab"], [role="button"], [role="link"]',
            );
            // Rullbare felt skal kunne nås med tastatur, så de er gyldige stopp.
            const rullefelt =
              el.scrollWidth > el.clientWidth ||
              el.scrollHeight > el.clientHeight;
            const statisk = el.closest('td, th, [id$="-arbeidsgiver"]');
            return (interaktiv || rullefelt) && !statisk
              ? 'ok'
              : `statisk: ${el.tagName} «${el.textContent?.trim().slice(0, 40)}»`;
          }),
        );
      }
      expect(fokusstopp.filter((f) => f !== 'ok')).toEqual([]);

      await page.unrouteAll({ behavior: 'ignoreErrors' });
    });
  }

  test('utskriftsdialogen holder fokus på knapper og rullefeltet', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 720, height: 540 });
    await medLangtArbeidsgivernavn(page);
    await åpneRomOgRotasjon(page);
    await page.getByRole('button', { name: 'Utskrift til jobbsøkere' }).click();
    const dialog = page.getByRole('dialog', {
      name: 'Utskrift til jobbsøkere',
    });
    await expect(dialog).toBeVisible();
    await expect(dialog).toBeFocused();

    const stopp: string[] = [];
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
      stopp.push(
        await page.evaluate(() => {
          const el = document.activeElement as HTMLElement;
          if (!el.closest('[role="dialog"]')) return 'utenfor dialogen';
          if (el.tagName === 'BUTTON') return 'ok';
          return el.scrollHeight > el.clientHeight
            ? 'ok'
            : `${el.tagName} «${el.textContent?.trim().slice(0, 30)}»`;
        }),
      );
    }
    expect(stopp.filter((s) => s !== 'ok')).toEqual([]);
  });
});

test.describe('3: navnet på jobbsøkeren ved tabbing i interessetabellen', () => {
  for (const bredde of ZOOM_200_BREDDER) {
    test(`navnet og avkrysningen er synlige for hvert fokusstopp ved ${bredde} px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: bredde, height: 540 });
      await medLangeJobbsøkernavn(page);
      await åpneInteresse(page);

      const tabell = page.getByRole('table', { name: /Hvilke arbeidsgivere/ });
      const første = tabell.getByRole('checkbox').first();
      await første.focus();

      const avvik: string[] = [];
      for (let i = 0; i < 40; i++) {
        const fokusert = page.locator(':focus');
        const iTabellen = await fokusert.evaluate(
          (el) => !!el.closest('table'),
        );
        if (!iTabellen) break;

        const navnecelle = fokusert.locator(
          'xpath=ancestor::tr/th[@scope="row"]',
        );
        const beskrivelse = await fokusert.evaluate(
          (el) =>
            `${el.tagName} i rad «${el.closest('tr')?.querySelector('th')?.textContent?.trim().slice(0, 30)}»`,
        );
        if (!(await erSynligIMidten(navnecelle)))
          avvik.push(`navnet er ikke synlig: ${beskrivelse}`);
        if (!(await erSynligIMidten(fokusert)))
          avvik.push(`fokusert element er dekket: ${beskrivelse}`);

        await page.keyboard.press('Tab');
      }
      expect(avvik).toEqual([]);

      await page.unrouteAll({ behavior: 'ignoreErrors' });
    });
  }
});

test.describe('5: begrunnelse for deaktiverte menyvalg med tastatur', () => {
  const åpneSaksmeny = async (page: Page) => {
    await gotoApp(page, '/rekrutteringstreff/workop');
    await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
    const saksmeny = page
      .locator('li')
      .filter({ hasText: 'Etternavn05, Jonathan' })
      .getByRole('button', { name: 'Saksmeny' });
    await saksmeny.focus();
    await page.keyboard.press('Enter');
    const meny = page.getByRole('menu');
    await expect(meny).toBeVisible();
    return { saksmeny, meny };
  };

  test('ArrowUp når også de deaktiverte valgene og viser begrunnelsen', async ({
    page,
  }) => {
    const { meny } = await åpneSaksmeny(page);
    const slett = meny.getByRole('menuitem', { name: 'Slett Slett' });
    const endreSvar = meny.getByRole('menuitem', { name: 'Endre svar' });

    // Fra toppen går ArrowUp rundt til siste valg.
    await page.keyboard.press('ArrowUp');
    await expect(slett).toBeFocused();
    await expect(
      page
        .getByRole('tooltip')
        .filter({ hasText: 'Kan ikke slette jobbsøker som har møtt opp' }),
    ).toBeVisible();

    await page.keyboard.press('ArrowUp');
    await expect(endreSvar).toBeFocused();
    await expect(
      page.getByRole('tooltip').filter({
        hasText: 'Fjern oppmøtet under Treffgjennomføring før du endrer svaret',
      }),
    ).toBeVisible();
  });

  test('Escape lukker tooltip og meny og gir fokus tilbake til saksmenyknappen', async ({
    page,
  }) => {
    const { saksmeny, meny } = await åpneSaksmeny(page);
    await page.keyboard.press('ArrowDown');
    await expect(
      meny.getByRole('menuitem', { name: 'Endre svar' }),
    ).toBeFocused();
    // Første Escape kan lukke tooltipen (WCAG 1.4.13), neste lukker menyen.
    await expect(async () => {
      await page.keyboard.press('Escape');
      await expect(meny).toBeHidden({ timeout: 500 });
    }).toPass({ timeout: 3000 });
    await expect(saksmeny).toBeFocused();
  });

  test('klikk og mellomrom utfører ikke deaktiverte valg', async ({ page }) => {
    const { meny } = await åpneSaksmeny(page);
    const slett = meny.getByRole('menuitem', { name: 'Slett Slett' });
    // aria-disabled gjør at Playwright venter på et aktivt element, så klikket tvinges.
    await slett.click({ force: true });
    await expect(page.getByRole('dialog')).toHaveCount(0);

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press(' ');
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });
});

test.describe('6: knappen som åpner stegvelgeren', () => {
  const stegvelgerTilgjengelig = async (page: Page) => {
    const fast = await page
      .locator('aside[aria-label="Sidepanel"]')
      .isVisible();
    const knapp = await page
      .getByRole('button', { name: /Steg \d+ av \d+/ })
      .isVisible();
    return { fast, knapp };
  };

  test('enten fast sidepanel eller knapp er synlig for alle bredder', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1080 });
    await åpneTreffgjennomføring(page);

    const mangler: number[] = [];
    // Simulerer at brukeren zoomer gradvis inn og ut på samme side.
    const bredder = [
      ...Array.from({ length: 27 }, (_, i) => 1440 - i * 40),
      ...Array.from({ length: 27 }, (_, i) => 400 + i * 40),
    ];
    for (const bredde of bredder) {
      await page.setViewportSize({ width: bredde, height: 540 });
      await page.waitForTimeout(50);
      const { fast, knapp } = await stegvelgerTilgjengelig(page);
      if (!fast && !knapp) mangler.push(bredde);
    }
    expect(mangler).toEqual([]);
  });

  test('knappen kan nås med tastatur, åpner panelet og får fokus tilbake', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 720, height: 540 });
    await åpneTreffgjennomføring(page);
    const knapp = page.getByRole('button', { name: /Steg \d+ av \d+/ });

    await page.locator('body').focus();
    let funnet = false;
    for (let i = 0; i < 80 && !funnet; i++) {
      await page.keyboard.press('Tab');
      funnet = await knapp.evaluate((el) => el === document.activeElement);
    }
    expect(funnet).toBe(true);

    await page.keyboard.press('Enter');
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(knapp).toBeFocused();
  });

  test('lukkeknappen gir fokus tilbake til knappen', async ({ page }) => {
    await page.setViewportSize({ width: 720, height: 540 });
    await åpneTreffgjennomføring(page);
    const knapp = page.getByRole('button', { name: /Steg \d+ av \d+/ });

    await knapp.click();
    const panel = page.getByRole('dialog');
    await panel.getByRole('button', { name: 'Close' }).click();
    await expect(panel).toBeHidden();
    await expect(knapp).toBeFocused();
  });
});

test.describe('7: lange arbeidsgivernavn i romfordelingen', () => {
  for (const bredde of [800, 1024, 1280, 1440, 1920]) {
    test(`jobbsøkerlistene starter på samme høyde i hver rad ved ${bredde} px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: bredde, height: 1080 });
      await medLangtArbeidsgivernavn(page);
      await åpneRomOgRotasjon(page);

      const kort = page.locator('main section[aria-labelledby*="-rom-"]');
      await expect(kort.first()).toBeVisible();

      const målinger = await kort.evaluateAll((seksjoner) =>
        seksjoner.map((s) => {
          const liste = s.querySelector('ul') ?? s.lastElementChild!;
          return {
            rom: s.querySelector('h4')?.textContent,
            topp: Math.round(s.getBoundingClientRect().top),
            listestart: Math.round(liste.getBoundingClientRect().top),
          };
        }),
      );

      const rader = new Map<number, typeof målinger>();
      for (const m of målinger) {
        rader.set(m.topp, [...(rader.get(m.topp) ?? []), m]);
      }
      const skjeve = [...rader.values()]
        .filter((rad) => rad.length > 1)
        .filter((rad) => {
          const starter = rad.map((m) => m.listestart);
          return Math.max(...starter) - Math.min(...starter) > 1;
        })
        .map((rad) =>
          rad.map((m) => `${m.rom}: ${m.listestart - m.topp}`).join(', '),
        );
      expect(skjeve).toEqual([]);

      // Innholdet skal holde seg inne i sitt eget kort, ellers dekker det nabokortet.
      const overløp = await kort.evaluateAll((seksjoner) =>
        seksjoner.flatMap((s) => {
          const kant = s.getBoundingClientRect();
          return [...s.querySelectorAll('li, p, h4')]
            .filter((el) => el.getBoundingClientRect().right > kant.right + 1)
            .map(
              (el) => `${s.querySelector('h4')?.textContent}: ${el.tagName}`,
            );
        }),
      );
      expect(overløp).toEqual([]);

      await page.unrouteAll({ behavior: 'ignoreErrors' });
    });
  }
});
