import {
  expect,
  lagringsstatus,
  test,
  åpneIntervjufordeling,
  åpneRomOgRotasjon,
} from './oppsett';
import type { Locator, Page } from '@playwright/test';

declare global {
  interface Window {
    rapporterTreffutskrift: (tekst: string) => Promise<void>;
  }
}

const fangUtskrift = async (page: Page) => {
  const utskrifter: string[] = [];
  await page.exposeFunction('rapporterTreffutskrift', (tekst: string) => {
    utskrifter.push(tekst);
  });
  // Init-scriptet kjøres også i nye utskriftsrammer. Vi fanger window.print,
  // ikke ramme-ID eller intern struktur fra utskriftsbiblioteket.
  await page.addInitScript(() => {
    window.print = () => {
      void window.rapporterTreffutskrift(document.body.textContent ?? '');
    };
  });
  return async () => {
    await expect.poll(() => utskrifter.length, { timeout: 15_000 }).toBe(1);
    return utskrifter[0];
  };
};

const skrivUtUtenNyeStilark = async (
  page: Page,
  dialog: Locator,
  hentUtskrift: () => Promise<string>,
) => {
  let slippStilark!: () => void;
  const vent = new Promise<void>((resolve) => {
    slippStilark = resolve;
  });
  await page.route('**/*.css*', async (route) => {
    await vent;
    await route.continue();
  });
  try {
    await dialog.getByRole('button', { name: 'Skriv ut' }).click();
    return await hentUtskrift();
  } finally {
    slippStilark();
    await page.unrouteAll({ behavior: 'wait' });
  }
};

test('skriver ut arbeidsgivernes tidsplan uten jobbsøkernavn eller venting på stilark', async ({
  page,
}) => {
  const hentUtskrift = await fangUtskrift(page);
  await åpneRomOgRotasjon(page);
  await page
    .getByRole('button', { name: 'Utskrift til arbeidsgivere' })
    .click();
  const dialog = page.getByRole('dialog', {
    name: 'Utskrift til arbeidsgivere',
  });
  await expect(dialog.getByRole('region', { name: / AS$/ })).toHaveCount(5);
  await expect(
    dialog
      .getByRole('region', { name: 'Eksempelbakeriet AS' })
      .getByRole('row', { name: /10:00–/ }),
  ).toBeVisible();
  const tekst = await skrivUtUtenNyeStilark(page, dialog, hentUtskrift);
  expect(tekst).toContain('Eksempelbakeriet AS');
  expect(tekst).toContain('10:00–');
  expect(tekst).not.toMatch(/Etternavn\d|Marius|Emilie/);
});

test('skriver ut romplanen med deltakernummer og initialer, ikke fulle navn', async ({
  page,
}) => {
  const hentUtskrift = await fangUtskrift(page);
  await åpneRomOgRotasjon(page);
  await page.getByRole('button', { name: 'Utskrift til jobbsøkere' }).click();
  const dialog = page.getByRole('dialog', { name: 'Utskrift til jobbsøkere' });
  await expect(dialog.getByRole('region', { name: /^Rom \d$/ })).toHaveCount(5);
  const tekst = await skrivUtUtenNyeStilark(page, dialog, hentUtskrift);
  expect(tekst).toContain('Rom 1');
  expect(tekst).toContain('Eksempelbakeriet AS');
  expect(tekst).toContain('1. ME');
  expect(tekst).not.toMatch(/Etternavn\d|Marius|Emilie/);
});

test('skriver bare ut inkluderte intervjuer med initialer og deltakernummer', async ({
  page,
}) => {
  const hentUtskrift = await fangUtskrift(page);
  await åpneIntervjufordeling(page);
  await page
    .getByRole('button', {
      name: 'Flytt 1. Marius Etternavn01 ned hos Eksempelbakeriet AS',
    })
    .click();
  await expect(lagringsstatus(page, 'Intervjufordeling')).toContainText(
    'Lagret',
  );
  await page
    .getByRole('button', {
      name: 'Flytt 1. Marius Etternavn01 under sperrelinjen hos Eksempelbakeriet AS',
    })
    .click();
  await expect(lagringsstatus(page, 'Intervjufordeling')).toContainText(
    'Lagret',
  );
  await page.getByRole('button', { name: 'Vis utskrift' }).click();
  const dialog = page.getByRole('dialog', {
    name: 'Intervjufordeling – utskrift',
  });
  await expect(dialog.getByRole('listitem')).toHaveCount(1);
  const tekst = await skrivUtUtenNyeStilark(page, dialog, hentUtskrift);
  expect(tekst).toContain('Eksempelbakeriet AS');
  expect(tekst).toContain('2. EE');
  expect(tekst).not.toContain('1. ME');
  expect(tekst).not.toContain('Testfjord Verksted AS');
  expect(tekst).not.toMatch(/Etternavn\d|Marius|Emilie/);
});
