import { PLAYWRIGHT_MSW_SCOPE_COOKIE } from '@/app/api/rekrutteringstreff/mswScope';
import { gotoApp } from '@/tests/gotoApp';
import { expect, test, type Page } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

interface Utskriftsmåling {
  klikk: number;
  printKalt: number;
  antallLenker: number;
  antallStilblokker: number;
  skriftfamilie: string;
  relativeUrler: number;
}

/**
 * react-to-print venter med å skrive ut til hvert kopierte <link>-stilark har
 * meldt fra at det er lastet, uten noen tidsgrense. Testen måler derfor både at
 * utskrifta faktisk starter, og at utskriftsdokumentet ikke inneholder
 * <link>-elementer som kan blokkere den.
 */
const overvåkUtskrift = async (page: Page) => {
  await page.addInitScript(() => {
    const måling = {
      klikk: -1,
      printKalt: -1,
      antallLenker: -1,
      antallStilblokker: -1,
      skriftfamilie: '',
      relativeUrler: -1,
    };
    (window as unknown as Record<string, unknown>).__utskriftsmåling = måling;

    const start = () => {
      new MutationObserver((endringer) => {
        for (const endring of endringer) {
          endring.addedNodes.forEach((node) => {
            if ((node as HTMLElement).id !== 'printWindow') return;
            const iframe = node as HTMLIFrameElement;
            const overstyrPrint = () => {
              const vindu = iframe.contentWindow;
              if (!vindu) return false;
              vindu.print = () => {
                const dok = iframe.contentDocument;
                måling.antallLenker = dok
                  ? dok.querySelectorAll('link').length
                  : -1;
                måling.antallStilblokker = dok
                  ? dok.querySelectorAll('style').length
                  : -1;
                const overskrift = dok?.querySelector('h1, h2, h3');
                måling.skriftfamilie = overskrift
                  ? getComputedStyle(overskrift).fontFamily
                  : '';
                const stiltekst = Array.from(
                  dok?.querySelectorAll('style') ?? [],
                )
                  .map((stil) => stil.textContent ?? '')
                  .join('');
                måling.relativeUrler = (
                  stiltekst.match(/url\((['"]?)\.{1,2}\//g) ?? []
                ).length;
                måling.printKalt = performance.now();
              };
              return true;
            };
            overstyrPrint();
            const intervall = setInterval(() => {
              if (måling.printKalt > 0) clearInterval(intervall);
              else overstyrPrint();
            }, 10);
            iframe.addEventListener('load', overstyrPrint);
          });
        }
      }).observe(document.documentElement, {
        childList: true,
        subtree: true,
      });

      document.addEventListener(
        'click',
        (hendelse) => {
          const knapp = (hendelse.target as HTMLElement | null)?.closest(
            'button',
          );
          if (knapp?.textContent?.includes('Skriv ut')) {
            måling.klikk = performance.now();
          }
        },
        true,
      );
    };

    if (document.documentElement) start();
    else {
      document.addEventListener('readystatechange', function når() {
        if (!document.documentElement) return;
        document.removeEventListener('readystatechange', når);
        start();
      });
    }
  });
};

const hentMåling = async (page: Page) => {
  await page.waitForFunction(
    () =>
      (window as unknown as { __utskriftsmåling: Utskriftsmåling })
        .__utskriftsmåling.printKalt > 0,
    undefined,
    { timeout: 15_000 },
  );
  return page.evaluate(() => {
    const måling = (window as unknown as { __utskriftsmåling: Utskriftsmåling })
      .__utskriftsmåling;
    return {
      millisekunder: måling.printKalt - måling.klikk,
      antallLenker: måling.antallLenker,
      antallStilblokker: måling.antallStilblokker,
      skriftfamilie: måling.skriftfamilie,
      relativeUrler: måling.relativeUrler,
    };
  });
};

const forventRaskOgStiletUtskrift = (måling: {
  millisekunder: number;
  antallLenker: number;
  antallStilblokker: number;
  skriftfamilie: string;
  relativeUrler: number;
}) => {
  expect(måling.antallLenker).toBe(0);
  expect(måling.antallStilblokker).toBeGreaterThan(0);
  expect(måling.millisekunder).toBeLessThan(5000);
  // Stilene skal følge med selv om <link>-elementene ikke kopieres.
  expect(måling.skriftfamilie).toContain('Source Sans');
  // Relative url(...) ville pekt feil når reglene flyttes ut av stilarket sitt.
  expect(måling.relativeUrler).toBe(0);
};

test.beforeEach(async ({ page }, testInfo) => {
  await page.context().addCookies([
    {
      name: PLAYWRIGHT_MSW_SCOPE_COOKIE,
      value: encodeURIComponent(`${testInfo.testId}-${crypto.randomUUID()}`),
      domain: 'localhost',
      path: '/',
    },
  ]);
  await overvåkUtskrift(page);
});

test('starter utskrifta til arbeidsgivere uten å vente på stilark', async ({
  page,
}) => {
  await gotoApp(page, '/rekrutteringstreff/workop');
  await page.getByRole('tab', { name: 'WorkOp-gjennomføring' }).click();
  await page.getByRole('button', { name: 'Opprett møteplan' }).click();
  await expect(
    page.getByRole('heading', { name: 'Romfordeling' }),
  ).toBeVisible();

  await page
    .getByRole('button', { name: 'Utskrift til arbeidsgivere' })
    .click();
  await page
    .getByRole('dialog', { name: 'Utskrift til arbeidsgivere' })
    .getByRole('button', { name: 'Skriv ut' })
    .click();

  forventRaskOgStiletUtskrift(await hentMåling(page));
});

test('starter utskrifta av intervjufordelinga uten å vente på stilark', async ({
  page,
}) => {
  await gotoApp(page, '/rekrutteringstreff/workop');
  await page.getByRole('tab', { name: 'WorkOp-gjennomføring' }).click();
  await page.getByRole('button', { name: 'Opprett møteplan' }).click();
  await page.getByRole('button', { name: 'Neste' }).click();
  const ønske = page.getByRole('checkbox', {
    name: /Marius Etternavn01 Eksempelbakeriet AS/,
  });
  await ønske.click();
  await expect(ønske).toBeChecked();
  await page.getByRole('button', { name: 'Neste' }).click();

  await page.getByRole('button', { name: 'Vis utskrift' }).click();
  await page
    .getByRole('dialog', { name: 'Intervjufordeling – utskrift' })
    .getByRole('button', { name: 'Skriv ut' })
    .click();

  forventRaskOgStiletUtskrift(await hentMåling(page));
});
