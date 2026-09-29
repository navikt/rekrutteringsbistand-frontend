import { expect, test, åpneInteresse, åpneTreffgjennomføring } from './oppsett';

/**
 * 200 % zoom på en 1440 × 1080-skjerm tilsvarer 720 × 540 CSS-piksler.
 * WCAG 1.4.4 Resize Text krever at innhold og funksjonalitet er i behold.
 */
test.use({ viewport: { width: 720, height: 540 } });

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
