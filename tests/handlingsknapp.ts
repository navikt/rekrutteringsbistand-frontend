import { Page, expect } from '@playwright/test';

/**
 * DynamiskDropdown beregner flere ganger etter montering hvilke handlingsknapper
 * som vises direkte og hvilke som legges i «Flere handlinger». Hjelperne prøver
 * på nytt dersom knappene flyttes mens testen interagerer med dem.
 */
function locatorer(page: Page, navn: string) {
  return {
    knapp: page.getByRole('button', { name: navn, exact: true }),
    flereHandlinger: page.getByRole('button', { name: 'Flere handlinger' }),
  };
}

export async function visHandlingsknapp(page: Page, navn: string) {
  const { knapp, flereHandlinger } = locatorer(page, navn);
  await expect(async () => {
    if (!(await knapp.isVisible())) {
      await flereHandlinger.click({ timeout: 2000 });
    }
    await expect(knapp).toBeVisible({ timeout: 2000 });
  }).toPass({ timeout: 15000 });
  return knapp;
}

export async function klikkHandlingsknapp(page: Page, navn: string) {
  const { knapp, flereHandlinger } = locatorer(page, navn);
  await expect(async () => {
    if (!(await knapp.isVisible())) {
      await flereHandlinger.click({ timeout: 2000 });
    }
    await knapp.click({ timeout: 2000 });
  }).toPass({ timeout: 15000 });
}
