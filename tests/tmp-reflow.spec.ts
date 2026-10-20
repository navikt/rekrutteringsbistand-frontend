import { gotoApp } from '@/tests/gotoApp';
import { test } from '@playwright/test';
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });
test('finn bredeste elementer', async ({ page }) => {
  await gotoApp(page, '/');
  await page.setViewportSize({ width: 320, height: 256 });
  await page.waitForTimeout(1500);
  const r = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const alle = [...document.querySelectorAll('body *')].map((e) => ({ e, r: e.getBoundingClientRect() })).filter(({ r }) => r.right > vw + 1 && r.width > 0);
    // Bare de ytterste: elementer som stikker ut uten at forelderen stikker like langt ut
    const rot = alle.filter(({ e, r }) => { const f = e.parentElement?.getBoundingClientRect(); return !f || f.right < r.right - 1; });
    const sti = (e: Element) => { const d: string[] = []; for (let x: Element | null = e; x && d.length < 6; x = x.parentElement) d.unshift(`${x.tagName.toLowerCase()}${x.id ? '#' + x.id : ''}.${String(x.className).split(' ').slice(0, 3).join('.')}`.slice(0, 60)); return d.join(' > '); };
    return { scroll: document.documentElement.scrollWidth, vw, rot: rot.slice(0, 8).map(({ e, r }) => `${Math.round(r.left)}→${Math.round(r.right)} (w ${Math.round(r.width)}, min ${getComputedStyle(e).minWidth}) ${sti(e)}`) };
  });
  console.log('REFLOW\n' + JSON.stringify(r, null, 1));
  await page.screenshot({ path: `${process.env.TMPDIR}/rekbis-320.png`, fullPage: false });
});
