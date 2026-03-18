import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, Locator, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Rik tekst-editor', () => {
  let seksjon: Locator;

  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/stilling/minStilling/rediger');
    const heading = page.getByRole('heading', { name: 'Om jobben' });
    await expect(heading).toBeVisible();
    seksjon = heading.locator('..');
  });

  test('Viser toolbar-knapper', async () => {
    await expect(seksjon.getByRole('button', { name: 'Bold' })).toBeVisible();
    await expect(seksjon.getByRole('button', { name: 'Italic' })).toBeVisible();
    await expect(seksjon.getByRole('button', { name: 'List' })).toBeVisible();
    await expect(seksjon.getByRole('button', { name: 'Undo' })).toBeVisible();
    await expect(seksjon.getByRole('button', { name: 'Redo' })).toBeVisible();
  });

  test('Kan skrive tekst i editoren', async ({ page }) => {
    const editor = seksjon.locator('.tiptap');
    await editor.click();
    await page.keyboard.type('Testtekst');
    await expect(editor).toContainText('Testtekst');
  });

  test('Bold-knapp mister ikke fokus fra editor', async ({ page }) => {
    const editor = seksjon.locator('.tiptap');
    await editor.click();
    await page.keyboard.type('fet tekst');

    await page.keyboard.down('Shift');
    for (let i = 0; i < 'fet tekst'.length; i++) {
      await page.keyboard.press('ArrowLeft');
    }
    await page.keyboard.up('Shift');

    const boldKnapp = seksjon.getByRole('button', { name: 'Bold' });
    await boldKnapp.click();

    await expect(boldKnapp).toHaveAttribute('aria-pressed', 'true', {
      timeout: 10000,
    });
    await expect(editor).toBeFocused();
  });

  test('Italic-knapp mister ikke fokus fra editor', async ({ page }) => {
    const editor = seksjon.locator('.tiptap');
    await editor.click();
    await page.keyboard.type('kursiv tekst');

    await page.keyboard.down('Shift');
    for (let i = 0; i < 'kursiv tekst'.length; i++) {
      await page.keyboard.press('ArrowLeft');
    }
    await page.keyboard.up('Shift');

    await seksjon.getByRole('button', { name: 'Italic' }).click();

    await expect(
      seksjon.getByRole('button', { name: 'Italic' }),
    ).toHaveAttribute('aria-pressed', 'true');
    await expect(editor).toBeFocused();
  });

  test('List-knapp mister ikke fokus fra editor', async ({ page }) => {
    const editor = seksjon.locator('.tiptap');
    await editor.click();
    await page.keyboard.type('listeelement');

    await seksjon.getByRole('button', { name: 'List' }).click();

    await expect(seksjon.getByRole('button', { name: 'List' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(editor).toBeFocused();
    await expect(editor.locator('ul li')).toContainText('listeelement');
  });

  test('List-knapp kan toggles av og på', async ({ page }) => {
    const editor = seksjon.locator('.tiptap');
    const listeKnapp = seksjon.getByRole('button', { name: 'List' });
    await editor.click();
    await page.keyboard.type('punkt');

    await listeKnapp.click();
    await expect(listeKnapp).toHaveAttribute('aria-pressed', 'true');
    await expect(editor.locator('ul li')).toBeVisible();

    await listeKnapp.click();
    await expect(listeKnapp).toHaveAttribute('aria-pressed', 'false');
    await expect(editor.locator('ul li')).not.toBeVisible();
  });

  test('Undo reverserer siste endring', async ({ page }) => {
    const editor = seksjon.locator('.tiptap');
    await editor.click();
    await page.keyboard.type('angre dette');

    await seksjon.getByRole('button', { name: 'Undo' }).click();
    await expect(editor).not.toContainText('angre dette');
    await expect(editor).toBeFocused();
  });

  test('Redo gjentar angret endring', async ({ page }) => {
    const editor = seksjon.locator('.tiptap');
    await editor.click();
    await page.keyboard.type('gjenopprett');

    await seksjon.getByRole('button', { name: 'Undo' }).click();
    await expect(editor).not.toContainText('gjenopprett');

    await seksjon.getByRole('button', { name: 'Redo' }).click();
    await expect(editor).toContainText('gjenopprett');
    await expect(editor).toBeFocused();
  });

  snapshotTest(test);
});
