import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Fullført banner – besatt/ikke-besatt × låst/ikke-låst
// ────────────────────────────────────────────────────────
test.describe('Fullført banner', () => {
  test('Besatt + Låst – viser "Her traff du blink" og "Registreringen er låst", uten Gjenåpne-knapp', async ({
    page,
  }) => {
    await gotoApp(page, '/stilling/fullfortBesattLast');

    await expect(page.getByText('Oppdrag fullført')).toBeVisible({
      timeout: 15000,
    });
    await expect(page.getByText('Her traff du blink')).toBeVisible();
    await expect(page.getByText('Registreringen er låst')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Gjenåpne' })).toBeHidden();
  });

  test('Ikke besatt + Ikke låst – viser "Ingen napp" og "Låses om", med Gjenåpne-knapp', async ({
    page,
  }) => {
    await gotoApp(page, '/stilling/fullfortIkkeBesattIkkeLast');

    await expect(page.getByText('Oppdrag fullført')).toBeVisible({
      timeout: 15000,
    });
    await expect(page.getByText('Ingen napp denne gangen')).toBeVisible();
    await expect(page.getByText('Låses om')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Gjenåpne' })).toBeVisible();
  });

  test('Ikke besatt + Låst – viser "Ingen napp" og "Registreringen er låst", uten Gjenåpne-knapp', async ({
    page,
  }) => {
    await gotoApp(page, '/stilling/fullfortIkkeBesattLast');

    await expect(page.getByText('Oppdrag fullført')).toBeVisible({
      timeout: 15000,
    });
    await expect(page.getByText('Ingen napp denne gangen')).toBeVisible();
    await expect(page.getByText('Registreringen er låst')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Gjenåpne' })).toBeHidden();
  });
});
