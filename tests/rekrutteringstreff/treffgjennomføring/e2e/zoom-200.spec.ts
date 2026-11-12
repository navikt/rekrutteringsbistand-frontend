import {
  expect,
  LANGT_ARBEIDSGIVERNAVN,
  medLangtArbeidsgivernavn,
  test,
  åpneInteresse,
  åpneRomOgRotasjon,
  åpneTreffgjennomføring,
} from './oppsett';
import type { Locator, Page } from '@playwright/test';

/**
 * 200 % zoom på en 1440 × 1080-skjerm tilsvarer 720 × 540 CSS-piksler.
 * WCAG 1.4.4 Resize Text krever at innhold og funksjonalitet er i behold.
 */
test.use({ viewport: { width: 720, height: 540 } });

/** 200 % zoom på skjermer fra 1024 til 1440 piksler gir 512–720 CSS-piksler. */
const SMALE_BREDDER = [720, 512];

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

const dokumentbredder = (page: Parameters<typeof åpneTreffgjennomføring>[0]) =>
  page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    klient: document.documentElement.clientWidth,
  }));

test('stegvelgeren er tilgjengelig når sidepanelet kollapser', async ({
  page,
}) => {
  await åpneTreffgjennomføring(page);

  // Sidepanelet er skjult ved denne bredden, så triggeren må ta over.
  await expect(page.locator('aside[aria-label="Sidepanel"]')).toBeHidden();
  const trigger = page.getByRole('button', { name: /Steg \d+ av \d+/ });
  await expect(trigger).toBeVisible();

  await trigger.click();
  const panel = page.getByRole('dialog');
  await expect(panel).toBeVisible();
  await expect(panel.getByRole('button', { name: 'Oppmøte' })).toBeVisible();
  await expect(
    panel.getByRole('button', { name: 'Rom og rotasjon' }),
  ).toBeVisible();
});

test('stegvelgeren kan rulles med tastatur', async ({ page }) => {
  // 200 % zoom på en lav skjerm, slik at stegvelgeren ikke får plass.
  await page.setViewportSize({ width: 720, height: 320 });
  await åpneTreffgjennomføring(page);

  await page.getByRole('button', { name: /Steg \d+ av \d+/ }).press('Enter');
  const panel = page.getByRole('dialog');
  const rulleområde = panel.locator('[class*="overflow-y-auto"]');
  await expect(rulleområde).toBeVisible();
  await expect
    .poll(() => rulleområde.evaluate((el) => el.scrollHeight > el.clientHeight))
    .toBe(true);

  await panel
    .getByRole('heading', { name: 'Treffgjennomføring og oppfølging' })
    .last()
    .click();
  await expect(rulleområde).toBeFocused();

  await page.keyboard.press('ArrowDown');
  await expect
    .poll(() => rulleområde.evaluate((el) => el.scrollTop))
    .toBeGreaterThan(0);
});

test('fast sidepanel kan rulles med tastatur etter klikk i panelet', async ({
  page,
}) => {
  // Bredt nok til fast sidepanel, men for lavt til at hele stegvelgeren får plass.
  await page.setViewportSize({ width: 1440, height: 500 });
  await åpneTreffgjennomføring(page);

  const panel = page.locator('aside[aria-label="Sidepanel"]');
  const rulleområde = panel.locator('.scroll-container');
  await expect(rulleområde).toBeVisible();
  await expect
    .poll(() => rulleområde.evaluate((el) => el.scrollHeight > el.clientHeight))
    .toBe(true);

  await panel
    .getByRole('heading', { name: 'Treffgjennomføring og oppfølging' })
    .click();
  await expect(rulleområde).toBeFocused();

  await page.keyboard.press('ArrowDown');
  await expect
    .poll(() => rulleområde.evaluate((el) => el.scrollTop))
    .toBeGreaterThan(0);
});

test('stegvelgeren lukkes når man velger et steg', async ({ page }) => {
  await åpneInteresse(page);

  await page.getByRole('button', { name: /Steg \d+ av \d+/ }).click();
  const panel = page.getByRole('dialog');
  await panel.getByRole('button', { name: 'Oppmøte' }).click();

  await expect(panel).toBeHidden();
  await expect(page.getByRole('region', { name: 'Oppmøte' })).toBeVisible();

  await page.unrouteAll({ behavior: 'ignoreErrors' });
});

test('stegvelger-knappen vises ikke når sidepanelet har plass', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1080 });
  await åpneTreffgjennomføring(page);

  await expect(page.locator('aside[aria-label="Sidepanel"]')).toBeVisible();
  await expect(
    page.getByRole('button', { name: /Steg \d+ av \d+/ }),
  ).toBeHidden();
});

test('enten fast sidepanel eller stegvelger-knappen er synlig når bredden endres', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1080 });
  await åpneTreffgjennomføring(page);
  const fastPanel = page.locator('aside[aria-label="Sidepanel"]');
  const knapp = page.getByRole('button', { name: /Steg \d+ av \d+/ });

  // Gradvis zoom inn og ut på samme side, tett rundt brekkpunktet på 45 rem.
  const mangler: number[] = [];
  for (const bredde of [
    1440, 1024, 800, 760, 730, 720, 710, 680, 512, 400, 720, 760, 1440,
  ]) {
    await page.setViewportSize({ width: bredde, height: 540 });
    await page.waitForTimeout(50);
    if (!(await fastPanel.isVisible()) && !(await knapp.isVisible()))
      mangler.push(bredde);
  }
  expect(mangler).toEqual([]);
});

test('stegvelgeren gir fokus tilbake til knappen ved Escape og lukkeknappen', async ({
  page,
}) => {
  await åpneTreffgjennomføring(page);
  const knapp = page.getByRole('button', { name: /Steg \d+ av \d+/ });
  const panel = page.getByRole('dialog');

  await knapp.focus();
  await page.keyboard.press('Enter');
  await expect(panel).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(panel).toBeHidden();
  await expect(knapp).toBeFocused();

  await knapp.click();
  await panel.getByRole('button', { name: 'Close' }).click();
  await expect(panel).toBeHidden();
  await expect(knapp).toBeFocused();
});

test('aktiv fane står helt synlig i fanerada', async ({ page }) => {
  await åpneTreffgjennomføring(page);

  const aktivFane = page.getByRole('tab', { selected: true });
  await expect(aktivFane).toHaveText(/Treffgjennomføring/);
  // Pilknappene kommer etter første måling og gjør rada smalere.
  await expect(
    page.locator('.aksel-tabs__scroll-button').first(),
  ).toBeAttached();

  await expect(async () => {
    const utenfor = await aktivFane.evaluate((fane) => {
      const liste = fane.closest('[role="tablist"]')!.getBoundingClientRect();
      const r = fane.getBoundingClientRect();
      return Math.max(liste.left - r.left, r.right - liste.right, 0);
    });
    expect(utenfor).toBeLessThanOrEqual(1);
  }).toPass();
});

test('steginnholdet flyter om uten horisontal rulling av sida', async ({
  page,
}) => {
  await åpneTreffgjennomføring(page);
  const oppmøte = await dokumentbredder(page);
  expect(oppmøte.scroll).toBeLessThanOrEqual(oppmøte.klient);

  await åpneInteresse(page);
  const interesse = await dokumentbredder(page);
  expect(interesse.scroll).toBeLessThanOrEqual(interesse.klient);

  // Steg 5 hadde et grid med 34rem minstebredde som sprengte kolonna.
  await page
    .getByRole('checkbox', { name: /Marius Etternavn01 Eksempelbakeriet AS/ })
    .check();
  await page.getByRole('button', { name: 'Neste', exact: true }).click();
  await expect(
    page.getByRole('region', { name: 'Intervjufordeling' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Neste', exact: true }).click();
  await expect(
    page.getByRole('region', { name: 'Vurdering og oppfølging' }),
  ).toBeVisible();

  const vurdering = await page.evaluate(() => {
    const panel = document.querySelector('.aksel-tabs__tabpanel');
    return panel
      ? { scroll: panel.scrollWidth, klient: panel.clientWidth }
      : null;
  });
  expect(vurdering).not.toBeNull();
  expect(vurdering!.scroll).toBeLessThanOrEqual(vurdering!.klient + 1);

  await page.unrouteAll({ behavior: 'ignoreErrors' });
});

for (const bredde of SMALE_BREDDER)
  test(`arbeidsgiverne i oppmøtesteget holder seg inne i kortene ved ${bredde} px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: bredde, height: 540 });
    await medLangtArbeidsgivernavn(page);
    await åpneTreffgjennomføring(page);

    const kort = page
      .locator('section[aria-labelledby$="-arbeidsgivere-heading"]')
      .getByRole('listitem');
    await expect(kort.first()).toBeVisible();

    const avvik = await kort.evaluateAll((alle) =>
      alle.flatMap((li, indeks) => {
        const ramme = li.getBoundingClientRect();
        const feil: string[] = [];
        if (li.scrollWidth > li.clientWidth + 1)
          feil.push(`kort ${indeks} flyter ut horisontalt`);
        for (const barn of li.children) {
          const r = barn.getBoundingClientRect();
          if (r.left < ramme.left - 1 || r.right > ramme.right + 1)
            feil.push(`innhold i kort ${indeks} går utenfor kortet`);
        }
        const neste = alle[indeks + 1]?.getBoundingClientRect();
        if (neste && neste.top < ramme.bottom - 1)
          feil.push(`kort ${indeks} overlapper neste kort`);
        return feil;
      }),
    );
    expect(avvik).toEqual([]);

    await page.unrouteAll({ behavior: 'ignoreErrors' });
  });

test('interessematrisa beholder rad- og kolonneoverskrifter ved rulling', async ({
  page,
}) => {
  await åpneInteresse(page);

  const resultat = await page.evaluate(() => {
    const boks = document.querySelector('main [class*="overflow-auto"]');
    if (!boks) return null;
    boks.scrollLeft = boks.scrollWidth;
    boks.scrollTop = boks.scrollHeight;
    const rad = boks.querySelector('tbody tr th');
    const kolonner = boks.querySelector('thead');
    if (!rad || !kolonner) return null;
    const boksRect = boks.getBoundingClientRect();
    return {
      venstrekant: Math.round(rad.getBoundingClientRect().left - boksRect.left),
      toppkant: Math.round(kolonner.getBoundingClientRect().top - boksRect.top),
      posisjon: getComputedStyle(rad).position,
    };
  });

  expect(resultat).not.toBeNull();
  expect(resultat!.posisjon).toBe('sticky');
  // Jobbsøkernavnet skal ligge i venstrekanten av rullefeltet, ikke utenfor.
  expect(Math.abs(resultat!.venstrekant)).toBeLessThanOrEqual(2);
  // Arbeidsgivernavnene skal ligge i overkanten, ikke rulle ut av syne.
  expect(Math.abs(resultat!.toppkant)).toBeLessThanOrEqual(2);

  await page.unrouteAll({ behavior: 'ignoreErrors' });
});

test('interessematrisa viser skygge i kanten der innhold er skjult', async ({
  page,
}) => {
  await åpneInteresse(page);
  const felt = page
    .getByRole('table', { name: /Hvilke arbeidsgivere/ })
    .locator('xpath=..');
  const høyre = page.locator('[data-rulleskygge="høyre"]');

  await expect(felt).not.toHaveAttribute('data-skjult-venstre');
  await expect(høyre).toHaveCSS('opacity', '1');

  await felt.evaluate((f) => (f.scrollLeft = f.scrollWidth));

  await expect(felt).toHaveAttribute('data-skjult-venstre');
  await expect(høyre).toHaveCSS('opacity', '0');
  // Venstre skygge er ::after på navnecella, rett til høyre for kolonnen.
  await expect
    .poll(() =>
      felt
        .locator('tbody th')
        .first()
        .evaluate((th) => {
          const skygge = getComputedStyle(th, '::after');
          return `${skygge.opacity} ${skygge.width} ${skygge.height !== '0px'}`;
        }),
    )
    .toBe('1 12px true');

  await page.unrouteAll({ behavior: 'ignoreErrors' });
});

test('avkrysninger som ruller inn under navnene er dekket og får ikke fokus der', async ({
  page,
}) => {
  await åpneInteresse(page);
  const tabell = page.getByRole('table', { name: /Hvilke arbeidsgivere/ });
  const rad = tabell.getByRole('row').nth(2);
  const første = rad.getByRole('checkbox').first();
  await første.scrollIntoViewIfNeeded();
  await tabell.locator('xpath=..').evaluate((felt) => (felt.scrollLeft = 120));

  const dekketAvNavnet = await første.evaluate((boks) => {
    const r = boks.getBoundingClientRect();
    const øverst = document.elementFromPoint(
      r.x + r.width / 2,
      r.y + r.height / 2,
    );
    return !!øverst?.closest('th[scope="row"]');
  });
  expect(dekketAvNavnet).toBe(true);

  // Nettleseren regner boksen som synlig og ruller ikke uten scroll-padding.
  await rad
    .getByRole('checkbox')
    .nth(1)
    .evaluate((boks: HTMLElement) => boks.focus({ preventScroll: true }));
  await page.keyboard.press('Shift+Tab');
  await expect(første).toBeFocused();

  const avstand = await første.evaluate((boks) => {
    const navn = boks.closest('tr')!.querySelector('th')!;
    return (
      boks.getBoundingClientRect().left - navn.getBoundingClientRect().right
    );
  });
  expect(avstand).toBeGreaterThanOrEqual(0);

  await page.unrouteAll({ behavior: 'ignoreErrors' });
});

const LANGT_ETTERNAVN = 'Etternavnmedekstralangdobbeltnavn-Eksempelsen';

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

for (const bredde of SMALE_BREDDER)
  test(`interessematrisa viser navnet og avkrysningen for hvert fokusstopp ved ${bredde} px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: bredde, height: 540 });
    await medLangeJobbsøkernavn(page);
    await åpneInteresse(page);

    const tabell = page.getByRole('table', { name: /Hvilke arbeidsgivere/ });
    await tabell.getByRole('checkbox').first().focus();

    const avvik: string[] = [];
    for (let i = 0; i < 40; i++) {
      const fokusert = page.locator(':focus');
      if (!(await fokusert.evaluate((el) => !!el.closest('table')))) break;

      const rad = await fokusert.evaluate((el) =>
        el.closest('tr')?.querySelector('th')?.textContent?.trim().slice(0, 30),
      );
      const navnecelle = fokusert.locator(
        'xpath=ancestor::tr/th[@scope="row"]',
      );
      if (!(await erSynligIMidten(navnecelle)))
        avvik.push(`navnet er ikke synlig i rad «${rad}»`);
      if (!(await erSynligIMidten(fokusert)))
        avvik.push(`avkrysningen er dekket i rad «${rad}»`);

      await page.keyboard.press('Tab');
    }
    expect(avvik).toEqual([]);

    await page.unrouteAll({ behavior: 'ignoreErrors' });
  });

test('dra-håndtakene oppfyller minstekravet til klikkflate', async ({
  page,
}) => {
  await åpneTreffgjennomføring(page);
  await page.getByRole('button', { name: 'Gå til rom og rotasjon' }).click();
  await page.getByRole('button', { name: 'Opprett møteplan' }).click();
  await expect(
    page.getByRole('heading', { name: 'Romfordeling' }),
  ).toBeVisible();

  const forSmå = await page.evaluate(
    () =>
      [...document.querySelectorAll('main [draggable="true"]')].filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && (r.width < 24 || r.height < 24);
      }).length,
  );

  expect(forSmå).toBe(0);

  await page.unrouteAll({ behavior: 'ignoreErrors' });
});

test('rotasjonsmatrisa viser hele arbeidsgivernavnet uten egne tabulatorstopp', async ({
  page,
}) => {
  await medLangtArbeidsgivernavn(page);
  await åpneRomOgRotasjon(page);
  const matrise = page.getByRole('table', {
    name: 'Arbeidsgivernes rotasjonsplan per runde og rom',
  });
  await expect(matrise.getByText(LANGT_ARBEIDSGIVERNAVN).first()).toBeVisible();

  // Navnet brytes over flere linjer i stedet for å avkortes med «…».
  const avkortede = await matrise
    .locator('td span')
    .evaluateAll((spenn) =>
      spenn
        .filter((s) => s.scrollWidth > s.clientWidth + 1)
        .map((s) => s.textContent),
    );
  expect(avkortede).toEqual([]);
  await expect(matrise.locator('[tabindex]')).toHaveCount(0);

  // Fokus går fra siste utskriftsknapp og ut av matrisa, ikke gjennom cellene.
  await page.getByRole('button', { name: 'Utskrift til jobbsøkere' }).focus();
  await page.keyboard.press('Tab');
  const fokusIMatrisa = await matrise.evaluate((tabell) =>
    tabell.contains(document.activeElement),
  );
  expect(fokusIMatrisa).toBe(false);

  await page.unrouteAll({ behavior: 'ignoreErrors' });
});
